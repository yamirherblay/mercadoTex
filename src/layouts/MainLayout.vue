<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="row items-center">
          <q-img src="/logo.png" alt="MercadoTexas" style="width:28px;height:28px" class="q-mr-sm" />
          <span>MercadoTexas</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="shopping_cart" @click="showCart = true">
          <q-badge color="red" text-color="white" floating v-if="cart.count">{{ cart.count }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar><q-icon name="home"/></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/categorias">
          <q-item-section avatar><q-icon name="category"/></q-item-section>
          <q-item-section>Categorías</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about">
          <q-item-section avatar><q-icon name="info"/></q-item-section>
          <q-item-section>Quiénes somos</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/contact">
          <q-item-section avatar><q-icon name="contact_support"/></q-item-section>
          <q-item-section>Contacto</q-item-section>
        </q-item>

        <q-separator class="q-my-sm"/>
        <filter-panel />

        <q-separator class="q-my-sm"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-white bg-primary">
      <div class="row q-pa-md items-center justify-between">
        <div>© {{ new Date().getFullYear() }} MercadoTexas</div>
        <div class="row items-center">
          <q-icon name="call" class="q-mr-xs"/> <span>+53 5 000 0000</span>
        </div>
      </div>
    </q-footer>

    <cart-modal v-model="showCart" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from 'src/stores/cart';
import CartModal from 'src/components/CartModal.vue';

const leftDrawerOpen = ref(false);
const showCart = ref(false);
const cart = useCartStore();

function toggleLeftDrawer() { leftDrawerOpen.value = !leftDrawerOpen.value; }
</script>
