<template>
  <q-dialog v-model="modelValue">
    <q-card style="min-width: 340px; max-width: 640px; width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Carrito</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator/>
      <q-card-section>
        <div v-if="!cart.items.length" class="text-grey">Tu carrito está vacío</div>
        <q-list v-else bordered separator>
          <q-item v-for="it in cart.items" :key="it.product.id">
            <q-item-section avatar>
              <q-img :src="it.product.image || '/images/placeholder.svg'" style="width:58px;height:58px"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ it.product.name }}</q-item-label>
              <q-item-label caption>{{ currency(it.product.price) }}</q-item-label>
              <div class="row items-center q-gutter-sm q-mt-xs">
                <q-btn dense round icon="remove" @click="dec(it.product.id)"/>
                <q-input dense outlined v-model.number="buffer[it.product.id]" type="number" style="width:70px" @blur="apply(it.product.id)"/>
                <q-btn dense round icon="add" @click="inc(it.product.id)"/>
              </div>
            </q-item-section>
            <q-item-section side top>
              <div class="text-weight-bold">{{ currency(it.product.price * it.quantity) }}</div>
              <q-btn flat dense icon="delete" color="negative" @click="cart.remove(it.product.id)"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section class="row items-center justify-between q-gutter-sm">
        <div class="text-subtitle1">Total: {{ currency(cart.total) }}</div>
        <div class="row q-gutter-sm">
          <q-btn color="positive" icon="whatsapp" :disable="!cart.items.length" @click="buyWhatsApp">Comprar por WhatsApp</q-btn>
          <q-btn color="primary" :to="{ name: 'checkout' }" :disable="!cart.items.length" v-close-popup>Finalizar compra</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCartStore } from 'src/stores/cart';

const cart = useCartStore();

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

const modelValue = ref<boolean>(props.modelValue);
watch(() => props.modelValue, v => modelValue.value = v);
watch(modelValue, v => emit('update:modelValue', v));

const buffer = ref<Record<string, number>>({});
watch(() => cart.items, (items) => {
  const next: Record<string, number> = {};
  items.forEach(it => { next[it.product.id] = it.quantity; });
  buffer.value = next;
}, { deep: true, immediate: true });

function inc(id: string) { const q = (buffer.value[id] || 1) + 1; buffer.value[id] = q; cart.setQuantity(id, q); }
function dec(id: string) { const q = Math.max(1, (buffer.value[id] || 1) - 1); buffer.value[id] = q; cart.setQuantity(id, q); }
function apply(id: string) { const q = Math.max(1, buffer.value[id] || 1); cart.setQuantity(id, q); }

const WHATSAPP_NUMBER = '14328882324';
function buyWhatsApp() {
  if (!cart.items.length) return;
  const lines: string[] = [];
  lines.push('Pedido MercadoTexas:');
  cart.items.forEach((it, idx) => {
    lines.push(`${idx + 1}. ${it.product.name} x${it.quantity} — ${currency(it.product.price)} c/u = ${currency(it.product.price * it.quantity)}`);
  });
  lines.push(`Total: ${currency(cart.total)}`);
  const text = encodeURIComponent(lines.join('\n'));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, '_blank');
}

function currency(n: number) { return new Intl.NumberFormat('es-CU', { style: 'currency', currency: 'CUP' }).format(n); }
</script>
