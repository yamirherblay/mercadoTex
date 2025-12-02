<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary" elevated color="white">
      <q-toolbar>
        <q-toolbar-title class="row items-center q-mr-md">
          <q-img src="/logo.png" alt="MercadoTexas" style="width:28px;height:28px" class="q-mr-sm" />
          <span>MercadoTexas</span>
        </q-toolbar-title>
        <!-- Desktop navigation (hidden on small screens) -->
        <div class="row items-center gt-sm">
          <q-btn flat dense label="Home" to="/" icon="home" class="gt-xs" />
          <q-btn flat dense label="Tienda" to="/tienda" icon="store" class="gt-xs" />
          <q-btn flat dense label="Quiénes somos" to="/about" icon="info" class="gt-xs" />
          <q-btn flat dense label="Contacto" to="/contact" icon="contact_support" class="gt-xs"  />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Mobile drawer menu (opens via edge swipe) - present across the whole system -->
    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered swipeable class="lt-md">
      <q-list padding>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/tienda">
          <q-item-section avatar><q-icon name="store" /></q-item-section>
          <q-item-section>Tienda</q-item-section>
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
        <q-item class="text-center">
          <q-item-section>MERCADO VARIADO TEXAS</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Drawer state (edge-swipe control on mobile)
const leftDrawerOpen = ref(false);
</script>
<style lang="scss" scoped>

</style>
