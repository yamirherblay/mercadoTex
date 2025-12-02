import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { User } from './types';

const AUTH_KEY = 'mercadotexas_auth_v1';
const USERS_KEY = 'mercadotexas_users_v1';

function loadUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) {
    try { return JSON.parse(raw) as User[]; } catch { /* ignore */ }
  }
  const seed: User[] = [
    { id: 'u-admin', email: 'admin@mtx.cu', password: 'admin123', fullName: 'Administrador', isAdmin: true },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seed));
  return seed;
}

export const useAuthStore = defineStore('auth', () => {
  const users = ref<User[]>(loadUsers());
  const sessionRaw = localStorage.getItem(AUTH_KEY);
  const currentUser = ref<User | null>(sessionRaw ? (JSON.parse(sessionRaw) as User) : null);

  const isAuthenticated = computed<boolean>(() => !!currentUser.value);
  const isAdmin = computed<boolean>(() => !!currentUser.value?.isAdmin);

  function saveUsers() { localStorage.setItem(USERS_KEY, JSON.stringify(users.value)); }

  function register(u: { email: string; password: string; fullName?: string; }): User {
    if (users.value.some(x => x.email === u.email)) throw new Error('Email ya registrado');
    const nu: User = { id: 'u-' + Date.now(), ...u, isAdmin: false };
    users.value.push(nu); saveUsers();
    return nu;
  }

  function login(email: string, password: string) {
    const u = users.value.find(x => x.email === email && x.password === password);
    if (!u) throw new Error('Credenciales inválidas');
    currentUser.value = { ...u };
  }

  function logout() { currentUser.value = null; }

  function updateProfile(patch: Partial<User>) {
    if (!currentUser.value) return;
    const idx = users.value.findIndex(u => u.id === currentUser.value!.id);
    if (idx >= 0) {
      users.value[idx] = { ...users.value[idx], ...patch };
      currentUser.value = { ...users.value[idx] };
      saveUsers();
    }
  }

  watch(currentUser, (v) => {
    if (v) localStorage.setItem(AUTH_KEY, JSON.stringify(v));
    else localStorage.removeItem(AUTH_KEY);
  }, { deep: true });

  return { users, currentUser, isAuthenticated, isAdmin, register, login, logout, updateProfile };
});
