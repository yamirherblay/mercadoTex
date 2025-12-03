<template>
  <q-page class="q-pa-md tienda-page">
    <!-- Categorías: barra horizontal con scroll fino y atractivo -->
    <section class="q-mb-md">
      <q-scroll-area class="cat-scroll rounded-borders" :horizontal="true" :thumb-style="thumbStyle" :bar-style="barStyle">
        <div class="row no-wrap q-gutter-sm items-center">
          <q-chip
            v-for="cat in categories"
            :key="cat.key"
            clickable
            :color="selectedCategory === cat.key ? 'primary' : 'grey-3'"
            :text-color="selectedCategory === cat.key ? 'white' : 'dark'"
            class="q-px-md q-py-xs text-weight-medium"
            @click="selectCategory(cat.key)"
          >
            <q-avatar v-if="cat.image" size="24px">
              <img :src="cat.image" :alt="cat.label" />
            </q-avatar>
            <span class="q-ml-xs">{{ cat.label }}</span>
          </q-chip>
        </div>
      </q-scroll-area>
    </section>

    <!-- Grid de productos -->
    <section>
      <div class="row q-col-gutter-md">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-6 col-sm-4 col-md-3 col-lg-2"
        >
          <q-card flat bordered class="product-card column full-height">
            <q-img :src="product.image" :ratio="1" spinner-color="primary" class="product-image" />

            <q-card-section class="q-pb-none">
              <div class="text-subtitle2 ellipsis-2-lines" :title="product.name">{{ product.name }}</div>
              <div class="text-primary text-weight-bold">{{ formatPrice(product.price) }}</div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="between" class="q-pa-sm">
              <div class="row items-center">
                <q-btn size="sm" round flat icon="remove" @click="decQty(product?.id)" />
                <q-input
                  v-model.number="qty[product.id]"
                  type="number"
                  dense
                  outlined
                  class="qty-input q-mx-xs"
                  :min="1"
                  :max="99"
                  @update:model-value="onQtyInput(product?.id)"
                />
                <q-btn size="sm" round flat icon="add" @click="incQty(product.id)" />
              </div>
              <q-btn color="primary" class="justify-end" unelevated size="sm" icon="shopping_cart" label="Añadir" @click="addToCart(product)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="q-mt-xl text-grey text-center">
        No hay productos para esta categoría.
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type Category = { key: string; label: string; image?: string }

type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const categories = ref<Category[]>([
  { key: 'all', label: 'Todas' },
  { key: 'ropa', label: 'Ropa', image: 'src/assets/images/tiendaRopa.jpg' },
  { key: 'hogar', label: 'Hogar', image: 'src/assets/images/productosHogar.png' },
  { key: 'ferreteria', label: 'Ferretería', image: 'src/assets/images/ferreteria.png' },
  { key: 'carnicos', label: 'Cárnicos', image: 'src/assets/images/carnicos.webp' },
  { key: 'confituras', label: 'Confituras', image: 'src/assets/images/confituras.webp' },
  { key: 'belleza', label: 'Belleza', image: 'src/assets/images/cosmeticos.png' },
])

const products = ref<Product[]>([
  { id: 1, name: 'Camiseta básica', price: 12.99, image: 'src/assets/images/tiendaRopa.jpg', category: 'ropa' },
  { id: 2, name: 'Jeans clásicos', price: 29.9, image: 'src/assets/images/tiendaRopa.jpg', category: 'ropa' },
  { id: 3, name: 'Juego de sábanas', price: 24.5, image: 'src/assets/images/productosHogar.png', category: 'hogar' },
  { id: 4, name: 'Destornillador multipunta', price: 8.75, image: 'src/assets/images/ferreteria.png', category: 'ferreteria' },
  { id: 5, name: 'Pechuga de pollo (1kg)', price: 6.9, image: 'src/assets/images/carnicos.webp', category: 'carnicos' },
  { id: 6, name: 'Mermelada de fresa', price: 3.8, image: 'src/assets/images/confituras.webp', category: 'confituras' },
  { id: 7, name: 'Kit de cosméticos', price: 18.0, image: 'src/assets/images/cosmeticos.png', category: 'belleza' },
  { id: 8, name: 'Cesta de básicos', price: 14.99, image: 'src/assets/images/cestaProductoBasicos.png', category: 'hogar' },
])

const selectedCategory = ref<string>('all')

const qty = reactive<Record<string, number>>({})
products.value.forEach(p => (qty[p.id] = 1))

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})

function selectCategory(key: string) {
  selectedCategory.value = key
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value)
}

function incQty(id: number) {
  qty[id] = Math.min((qty[id] || 1) + 1, 99)
}

function decQty(id: number) {
  qty[id] = Math.max((qty[id] || 1) - 1, 1)
}

function onQtyInput(id: number) {
  if (Number.isNaN(qty[id] as number)) qty[id] = 1
  qty[id] = Math.min(1)
}

function addToCart(product: Product) {
  // Placeholder: aquí se integraría con el carrito real si existe
  // Por ahora, mostramos una simple notificación del navegador
  console.log('entramos a addToCart', product, qty[product.id])
}

const thumbStyle = {
  right: '2px',
  borderRadius: '4px',
  backgroundColor: 'rgba(0,0,0,0.25)',
  width: '4px',
  height: '4px',
}

const barStyle = {
  right: '2px',
  borderRadius: '4px',
  backgroundColor: 'rgba(0,0,0,0.08)',
  width: '4px',
  height: '4px',
}
</script>

<style scoped>
.tienda-page {
  /* espacio bajo el header ya viene del padding */
}

.cat-scroll {
  height: 56px;
  padding: 6px 4px;
  background: #f5f5f5;
  border: 1px solid rgba(0,0,0,0.05);
}

.product-card {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.product-image {
  background-color: #fafafa;
}

.qty-input {
  width: 64px;
}

/* Scrollbar fino y atractivo en navegadores compatibles */
.cat-scroll::-webkit-scrollbar {
  height: 6px;
}
.cat-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.25);
  border-radius: 4px;
}
.cat-scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

/* soporte Firefox */
.cat-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.25) transparent;
}

/* Dos líneas con ellipsis para nombres largos */
.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
