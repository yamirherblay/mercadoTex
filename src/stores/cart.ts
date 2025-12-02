import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { CartItem, Product, OrderContact, OrderRecord } from './types';

const STORAGE_KEY = 'mercadotexas_cart_v1';
const ORDERS_KEY = 'mercadotexas_orders_v1';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  // load persisted cart
  try {
    const persisted = localStorage.getItem(STORAGE_KEY);
    if (persisted) items.value = JSON.parse(persisted) as CartItem[];
  } catch {}

  watch(items, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }, { deep: true });

  const count = computed(() => items.value.reduce((s, it) => s + it.quantity, 0));
  const total = computed(() => items.value.reduce((s, it) => s + it.product.price * it.quantity, 0));

  function add(product: Product, qty = 1) {
    const found = items.value.find(it => it.product.id === product.id);
    if (found) found.quantity += qty; else items.value.push({ product, quantity: Math.max(1, qty) });
  }
  function remove(productId: string) {
    items.value = items.value.filter(it => it.product.id !== productId);
  }
  function setQuantity(productId: string, qty: number) {
    const it = items.value.find(i => i.product.id === productId);
    if (!it) return;
    it.quantity = Math.max(1, qty);
  }
  function clear() { items.value = []; }

  async function submitOrder(contact: OrderContact): Promise<OrderRecord> {
    const order: OrderRecord = {
      id: 'ORD-' + Date.now(),
      items: items.value,
      total: total.value,
      contact,
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]') as OrderRecord[];
      existing.push(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(existing));
    } catch {
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order]));
    }
    clear();
    return order;
  }

  return { items, count, total, add, remove, setQuantity, clear, submitOrder };
});
