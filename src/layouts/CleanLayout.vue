<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary" elevated color="white">
      <q-toolbar>
        <q-toolbar-title class="row items-center q-mr-md">
          <q-btn flat class="lt-md" @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />

          <span>Mercado Variado Texas</span>
        </q-toolbar-title>
        <!-- Desktop navigation (hidden on small screens) -->
        <div class="row items-center gt-sm q-gutter-sm">
          <q-btn flat dense label="" to="/" icon="home" class="gt-xs" />
          <q-btn flat dense label="Tienda" to="/tienda" icon="store" class="gt-xs" />
          <q-btn flat dense label="Quiénes somos" to="/about" icon="info" class="gt-xs" />
          <q-btn flat dense label="Contacto" to="/contact" icon="contact_support" class="gt-xs"  />
        </div>
        <q-space />
        <!-- Cart button -->
        <q-btn flat round dense icon="shopping_cart" @click="showCart = true">
          <q-badge color="red" text-color="white" floating v-if="cart.count">{{ cart.count }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Mobile drawer menu (opens via edge swipe) - present across the whole system -->
    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered swipeable class="lt-md">
      <q-list padding>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/clothStore">
          <q-item-section avatar><q-icon name="store" /></q-item-section>
          <q-item-section>Sabrina's Fashion</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/tienda">
          <q-item-section avatar><q-icon name="store" /></q-item-section>
          <q-item-section>Mercado</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about">
          <q-item-section avatar><q-icon name="info" /></q-item-section>
          <q-item-section>Quiénes somos</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/contact">
          <q-item-section avatar><q-icon name="contact_support" /></q-item-section>
          <q-item-section>Contacto</q-item-section>
        </q-item>
        <q-separator />
        <q-item class="text-center justify-center">
          <q-item-section >
            <q-img src="/images/logo.png" alt="MercadoTexas" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Cart modal -->
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
</script>
<style lang="scss" scoped>

</style>
