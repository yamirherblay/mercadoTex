<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Finalizar compra</div>
    <div class="row q-col-gutter-xl">
      <div class="col-12 col-md-7">
        <q-form @submit.prevent="submit">
          <q-input v-model="form.fullName" label="Nombre y apellidos" outlined dense class="q-mb-sm" :rules="[val => !!val || 'Requerido']"/>
          <q-input v-model="form.phone" label="Teléfono" outlined dense class="q-mb-sm" :rules="[val => !!val || 'Requerido']"/>
          <q-input v-model="form.address" label="Dirección" outlined dense class="q-mb-sm" :rules="[val => !!val || 'Requerido']"/>
          <q-input v-model="form.refs" label="Referencias" outlined dense type="textarea" class="q-mb-md"/>
          <q-btn color="primary" label="Enviar orden" type="submit" :disable="!cart.items.length"/>
        </q-form>
      </div>

      <div class="col-12 col-md-5">
        <q-card>
          <q-card-section class="text-subtitle1">Resumen del carrito</q-card-section>
          <q-separator/>
          <q-list bordered separator>
            <q-item v-for="it in cart.items" :key="it.product.id">
              <q-item-section>{{ it.product.name }} (x{{ it.quantity }})</q-item-section>
              <q-item-section side>{{ currency(it.product.price * it.quantity) }}</q-item-section>
            </q-item>
          </q-list>
          <q-card-section class="row items-center justify-between">
            <div class="text-weight-bold">Total</div>
            <div class="text-weight-bold">{{ currency(cart.total) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section class="text-h6">¡Orden enviada!</q-card-section>
        <q-card-section>
          Gracias por su compra. El administrador se comunicará por WhatsApp o teléfono para coordinar la entrega y pago.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" v-close-popup @click="$router.push({ name: 'home' })"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useCartStore } from 'src/stores/cart';

const cart = useCartStore();
const dialog = ref<boolean>(false);

const form = reactive({ fullName: '', phone: '', address: '', refs: '' });

async function submit() {
  if (!cart.items.length) return;
  const order = await cart.submitOrder({
    fullName: form.fullName,
    phone: form.phone,
    address: form.address,
    refs: form.refs,
  });
  console.log('Orden enviada:', order);
  dialog.value = true;
}

function currency(n: number) { return new Intl.NumberFormat('es-CU', { style: 'currency', currency: 'CUP' }).format(n); }
</script>
