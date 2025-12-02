<template>
  <div>
    <q-item-label header>Filtros</q-item-label>
    <div class="q-pa-sm">
      <q-select v-model="state.category" :options="catOptions" label="Categoría" dense outlined emit-value map-options class="q-mb-sm"/>
      <q-range v-model="state.price" :min="0" :max="maxPrice" dense class="q-mb-sm"/>
      <div class="text-caption text-grey-7 q-mb-sm">Precio: {{ state.price.min }} - {{ state.price.max }}</div>
      <q-btn outline color="primary" label="Aplicar" @click="apply" class="full-width"/>
      <q-btn flat color="primary" label="Limpiar" @click="reset" class="full-width q-mt-xs"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useProductStore } from 'src/stores/products';
import { useRouter } from 'vue-router';

const ps = useProductStore();
const router = useRouter();

const state = reactive<{ category: string; price: { min: number; max: number } }>({ category: '', price: { min: 0, max: 1000 } });
const catOptions = computed(() => ps.categories.map(c => ({ label: c.name, value: c.id })));
const maxPrice = computed(() => Math.max(1000, ...ps.products.map(p => p.price)));

function apply() {
  const q: Record<string, string | number> = {};
  if (state.category) q.cat = state.category;
  if (state.price) { q.pmin = state.price.min; q.pmax = state.price.max; }
  router.push({ name: 'categories', query: q });
}
function reset() { state.category = ''; state.price = { min: 0, max: maxPrice.value }; apply(); }
</script>
