import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, Category } from './types';

const CUSTOM_PRODUCTS_KEY = 'mercadotexas_products_custom_v1';

function loadCustom(): Product[] {
  try { return JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY) || '[]') as Product[]; } catch { return []; }
}
function saveCustom(arr: Product[]) {
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(arr));
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const categories = ref<Category[]>([]);
  const loaded = ref<boolean>(false);
  const customProducts = ref<Product[]>(loadCustom());

  async function load() {
    if (loaded.value) return;
    const [prodRes, catRes] = await Promise.all([
      fetch('/data/products.json'),
      fetch('/data/categories.json'),
    ]);
    const baseProducts = (await prodRes.json()) as Product[];
    categories.value = (await catRes.json()) as Category[];
    products.value = baseProducts.map(p => ({ ...p, _base: true })).concat(customProducts.value);
    loaded.value = true;
  }

  function addProduct(p: Product) {
    if (!p.id || !p.name || p.price == null || !p.categoryId) throw new Error('Campos obligatorios faltantes');
    if (products.value.some(x => x.id === p.id)) throw new Error('ID de producto ya existe');
    const toAdd: Product = { ...p };
    customProducts.value.push(toAdd);
    saveCustom(customProducts.value);
    products.value.push(toAdd);
  }

  function removeCustomProduct(id: string) {
    customProducts.value = customProducts.value.filter(p => p.id !== id);
    saveCustom(customProducts.value);
    products.value = products.value.filter(p => p.id !== id);
  }

  const byCategory = (categoryId: string) => computed(() => products.value.filter(p => p.categoryId === categoryId));

  function search(term: string): Product[] {
    const t = term.trim().toLowerCase();
    if (!t) return products.value;
    return products.value.filter(p =>
      p.name.toLowerCase().includes(t) ||
      (p.shortDescription ? p.shortDescription.toLowerCase().includes(t) : false) ||
      (p.description ? p.description.toLowerCase().includes(t) : false)
    );
  }

  function getById(id: string) { return products.value.find(p => p.id === id); }

  return { products, categories, loaded, load, byCategory, search, getById, addProduct, removeCustomProduct };
});
