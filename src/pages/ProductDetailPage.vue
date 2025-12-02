<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-6">
        <q-img :src="product?.image || '/images/placeholder.png'" :alt="product?.name" ratio="4/3"/>
      </div>
      <div class="col-12 col-md-6">
        <div class="text-h5">{{ product?.name }}</div>
        <div class="text-h6 q-mt-sm">{{ currency(product?.price || 0) }}</div>
        <div class="q-mt-md">{{ product?.description }}</div>

        <div class="row items-center q-gutter-sm q-mt-lg">
          <q-input type="number" outlined dense v-model.number="qty" style="width:100px"/>
          <q-btn color="primary" label="Agregar al carrito" @click="add"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from 'src/stores/products';
import { useCartStore } from 'src/stores/cart';

const route = useRoute();
const ps = useProductStore();
const cart = useCartStore();

const product = computed(() => ps.getById(String(route.params.id)));
const qty = ref<number>(1);

function add() { if (product.value) cart.add(product.value, Math.max(1, qty.value)); }
function currency(n: number) { return new Intl.NumberFormat('es-CU', { style: 'currency', currency: 'CUP' }).format(n); }

onMounted(ps.load);
</script>
