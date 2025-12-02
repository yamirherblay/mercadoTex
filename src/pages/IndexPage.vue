<template>
  <q-page class="column">

    <!-- Hero Section -->
    <section class="q-pa-xl text-white hero-section">
      <div class="column items-center text-center">
        <div class="text-h3 text-weight-bold q-mb-sm">Descubre lo mejor en nuestra tienda</div>
        <div class="text-subtitle1 q-mb-lg">Ofertas irresistibles y productos seleccionados para ti</div>
        <q-btn color="primary" size="lg" label="Ir a la Tienda" to="/tienda" unelevated />
      </div>
    </section>

    <!-- Qué ofrecemos (categorías) -->
    <section class="q-pa-lg bg-secundary-light">
      <div class="text-h5 text-center q-mb-md">¿Qué ofrecemos?</div>
      <div class="q-gutter-md">
        <div class="row q-col-gutter-md items-center justify-evenly">
            <q-card
              v-for="cat in categories"
              :key="cat.key"
              flat
              class="category-card cursor-pointer">
              <q-card-section class="column items-center text-center ">
                <q-img
                  :src="cat.image"
                  class="category-img"
                  :ratio="1"
                />
                <div class="text-subtitle2 q-mt-sm">{{ cat.label }}</div>
              </q-card-section>
            </q-card>

        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary text-white q-pa-md">
      <div class="row items-center justify-between">
        <div>© {{ new Date().getFullYear() }} MercadoTexas</div>
        <div class="row items-center">
          <q-icon name="call" class="q-mr-xs" /> <span>+53 5 000 0000</span>
        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Category = { key: string; label: string; image: string };

const categories = ref<Category[]>([
  { key: 'ropa', label: 'Ropa', image: 'src/assets/images/tiendaRopa.jpg' },
  { key: 'hogar', label: 'Hogar', image: 'src/assets/images/productosHogar.png' },
  { key: 'ferreteria', label: 'Electrónica', image: 'src/assets/images/ferreteria.png' },
  { key: 'carnicos', label: 'Cárnicos', image: 'src/assets/images/carnicos.webp' },
  { key: 'confituras', label: 'Confituras', image: 'src/assets/images/confituras.webp' },
  { key: 'belleza', label: 'Belleza', image: 'src/assets/images/cosmeticos.png' },
]);

</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.25)),
    url('src/assets/images/fondo.jpg') center/cover no-repeat fixed;
  filter: blur(8px);
  z-index: 0;
}

.hero-section > * {
  position: relative;
  z-index: 1;
}
.category-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.category-card {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  justify-content: space-between;
}
.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}
</style>
