<template>
  <q-page class="q-pa-md tienda-page">
    <!-- Categorías: barra horizontal con scroll fino y atractivo -->
    <section class="q-mb-md sticky-cats">
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
                <q-btn size="sm" round flat icon="remove" @click="decQty(product.id)" />
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
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from 'src/stores/cart'
import type { Product as StoreProduct } from 'src/stores/types'

type Category = { key: string; label: string; image?: string }

type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const categories = ref<Category[]>([
  { key: 'all', label: 'Todas' },
  { key: 'ropa', label: 'Ropa', image: '/images/tiendaRopa.jpg' },
  { key: 'hogar', label: 'Hogar', image: '/images/productosHogar.png' },
  { key: 'ferreteria', label: 'Ferretería', image: '/images/ferreteria.png' },
  { key: 'carnicos', label: 'Cárnicos', image: '/images/carnicos.webp' },
  { key: 'confituras', label: 'Confituras', image: '/images/confituras.webp' },
  { key: 'belleza', label: 'Belleza', image: '/images/cosmeticos.png' },
  { key: 'combos', label:'Combos',image:'/images/cestaProductoBasicos.png'}
])

const products = ref<Product[]>([])

const route = useRoute()

const selectedCategory = ref<string>('all')

const categoryKeys = computed(() => categories.value.map(c => c.key))

function applyRouteCategory() {
  const q = (route.query.cat as string | undefined) || 'all'
  selectedCategory.value = (q === 'all' || categoryKeys.value.includes(q)) ? q : 'all'
}

onMounted(async () => {
  applyRouteCategory()
  try {
    const res = await fetch('/data/products.json')
    const data: Product[] = await res.json()
    products.value = data
    data.forEach(p => (qty[p.id] = 1))
  } catch (e) {
    console.error('Error cargando productos.json', e)
  }
})
watch(() => route.query.cat, applyRouteCategory)
const qty = reactive<Record<string, number>>({})

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

function incQty(id: string) {
  qty[id] = Math.min((qty[id] || 1) + 1, 99)
}

function decQty(id: string) {
  qty[id] = Math.max((qty[id] || 1) - 1, 1)
}

function onQtyInput(id: string) {
  const n = Number(qty[id])
  if (Number.isNaN(n)) {
    qty[id] = 1
    return
  }
  qty[id] = Math.max(1, Math.min(n, 99))
}

function addToCart(product: Product) {
  const cart = useCartStore()
  const q = Math.max(1, qty[product.id] || 1)
  const mapped: StoreProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    categoryId: product.category,
  }
  cart.add(mapped, q)
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
  background: linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%);
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
.sticky-cats {
  position: sticky;
  top: 56px; /* altura del header de Quasar (aprox) */
  z-index: 10; /* sobre el contenido de la página */
}

</style>
