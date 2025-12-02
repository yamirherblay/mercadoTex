import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/CleanLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'tienda', name: 'tienda', component: () => import('pages/TiendaPage.vue') },
      { path: 'about', name: 'about', component: () => import('pages/BlankPage.vue') },
      { path: 'contact', name: 'contact', component: () => import('pages/ContactPage.vue') },
    ],
  },
  // Catch-all route goes to the same blank page for now
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/BlankPage.vue'),
  },
];

export default routes;
