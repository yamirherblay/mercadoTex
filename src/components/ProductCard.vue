<template>
  <q-card class="my-card">
    <q-img :src="product.image || '/images/placeholder.svg'" :alt="product.name" ratio="4/3" />
    <q-card-section>
      <div class="text-subtitle1">{{ product.name }}</div>
      <div v-if="product.shortDescription" class="text-caption text-grey-7">{{ product.shortDescription }}</div>
      <div class="text-h6 q-mt-sm">{{ currency(product.price) }}</div>
    </q-card-section>
    <q-card-actions align="between">
      <q-btn color="primary" label="Agregar al carrito" @click="addToCart" />
      <q-btn flat label="Ver" :to="{ name: 'product', params: { id: product.id } }" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useCartStore } from 'src/stores/cart';
import type { Product } from 'src/stores/types';

const props = defineProps<{ product: Product }>();
const cart = useCartStore();

function addToCart() { cart.add(props.product, 1); }
function currency(n: number) { return new Intl.NumberFormat('es-CU', { style: 'currency', currency: 'CUP' }).format(n); }
</script>

<style scoped>
.my-card { max-width: 320px; width: 100%; }
</style>
