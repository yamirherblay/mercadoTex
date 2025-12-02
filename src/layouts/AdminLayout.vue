<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="left = !left" />
        <q-toolbar-title>Admin</q-toolbar-title>
        <q-btn flat dense round icon="store" @click="$router.push({ name: 'home' })" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple @click="$router.push({ name: 'admin' })">
          <q-item-section avatar><q-icon name="dashboard"/></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="$router.push({ name: 'home' })">
          <q-item-section avatar><q-icon name="store"/></q-item-section>
          <q-item-section>Tienda</q-item-section>
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
const left = ref(false);
</script>
