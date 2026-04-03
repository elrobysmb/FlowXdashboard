<template>
  <div class="category-page section-padding position-relative overflow-hidden">
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <v-container style="max-width: 1200px" class="position-relative z-10">
      <!-- Breadcrumb & Header -->
      <div class="mb-10 mt-4 animate-fade-up">
        <div class="d-flex align-center text-grey-lighten-1 mb-6 text-body-2 font-weight-medium">
          <NuxtLink to="/web/productos" class="text-decoration-none text-grey-lighten-1 hover-primary hover-link">Productos</NuxtLink>
          <v-icon icon="mdi-chevron-right" size="small" class="mx-2"></v-icon>
          <span class="text-white">{{ categoryTitle }}</span>
        </div>
        <h1 class="text-h3 font-weight-black text-white text-capitalize tracking-tight mb-2">{{ categoryTitle }}</h1>
        <div class="divider mt-4 mb-2"></div>
      </div>

      <v-row>
        <!-- Sidebar Filters -->
        <v-col cols="12" md="3" class="animate-fade-up delay-100">
          <v-card class="bg-dark-2 border-card pa-6 rounded-xl shadow-premium" elevation="0">
            <div class="d-flex align-center mb-6">
              <v-icon icon="mdi-filter-variant" color="primary" class="mr-2"></v-icon>
              <h3 class="text-h6 font-weight-bold text-white">Filtros</h3>
            </div>
            
            <div class="mb-6">
              <div class="text-caption text-grey-lighten-1 mb-2 font-weight-bold tracking-widest">ORDENAR POR</div>
              <v-select
                v-model="sortBy"
                :items="['Popularidad', 'Menor Precio', 'Mayor Precio', 'Nuevos']"
                variant="solo-filled"
                density="compact"
                hide-details
                bg-color="rgba(255,255,255,0.03)"
                class="futuristic-select"
                flat
              ></v-select>
            </div>

            <v-divider class="my-6 border-opacity-20" color="white"></v-divider>

            <div class="mb-6">
              <div class="text-caption text-grey-lighten-1 mb-4 font-weight-bold tracking-widest">MARCAS</div>
              <v-checkbox label="SCHULZ" hide-details density="compact" color="primary" class="custom-checkbox"></v-checkbox>
              <v-checkbox label="BOSCH" hide-details density="compact" color="primary" class="custom-checkbox"></v-checkbox>
              <v-checkbox label="MAKITA" hide-details density="compact" color="primary" class="custom-checkbox"></v-checkbox>
            </div>

            <v-btn class="premium-btn w-100 mt-4" size="large">
              Aplicar Filtros
            </v-btn>
          </v-card>
        </v-col>

        <!-- Products Grid -->
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="(product, index) in products" :key="product.id" class="animate-fade-up" :style="`animation-delay: ${(index * 0.05) + 0.15}s`">
              <v-card class="product-card h-100 bg-transparent border-card pa-5 rounded-xl d-flex flex-column" elevation="0">
                <div class="card-glow"></div>
                
                <div class="product-img bg-dark-3 rounded-lg mb-5 d-flex align-center justify-center position-relative overflow-hidden" style="height: 180px; border: 1px solid rgba(255,255,255,0.05);">
                  <div class="img-placeholder-bg"></div>
                  <v-icon icon="mdi-image-outline" size="48" color="grey-darken-2" class="position-relative z-10"></v-icon>
                  <!-- Badge -->
                  <v-chip size="small" color="primary" variant="flat" class="position-absolute top-0 right-0 ma-2 z-10 font-weight-bold">
                    Nuevo
                  </v-chip>
                </div>
                
                <div class="position-relative z-10 d-flex flex-column flex-grow-1">
                  <div class="text-caption font-weight-bold mb-2 text-primary tracking-widest text-uppercase">{{ product.brand }}</div>
                  <h3 class="text-subtitle-1 font-weight-bold text-white mb-4 flex-grow-1" style="line-height: 1.4;">{{ product.name }}</h3>
                  
                  <v-divider class="my-3 border-opacity-20" color="white"></v-divider>
                  
                  <div class="d-flex align-center justify-space-between mt-auto">
                    <span class="text-caption text-grey-lighten-1 hover-primary cursor-pointer d-flex align-center">
                      Cotizar Repuesto <v-icon icon="mdi-arrow-right" size="x-small" class="ml-1"></v-icon>
                    </span>
                    <v-btn icon="mdi-cart-plus" color="primary" variant="tonal" size="small" class="cart-btn"></v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
          
          <div class="text-center mt-12 mb-8 animate-fade-up delay-300">
            <v-pagination v-model="page" :length="3" active-color="#10B981" class="custom-pagination"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'commercial'
})

const route = useRoute()
const categorySlug = route.params.category as string
const categoryTitle = computed(() => categorySlug ? categorySlug.replace(/-/g, ' ') : '')

const sortBy = ref('Popularidad')
const page = ref(1)

const products = [
    { id: 1, name: 'Cabezal de 2 etapas MSV 20MAX', brand: 'SCHULZ' },
    { id: 2, name: 'Compresor de Tornillo SRP 4000', brand: 'SCHULZ' },
    { id: 3, name: 'Filtro Regulador de Aire 1/2"', brand: 'GENERIC' },
    { id: 4, name: 'Tanque Pulmón 500L Vertical', brand: 'BOSCH' },
    { id: 5, name: 'Manguera Neumática de Alta Presión', brand: 'MAKITA' },
    { id: 6, name: 'Pistola de Impacto Neumática', brand: 'MAKITA' }
]
</script>

<style scoped>
:root {
  --v-dark-navy: #040D1A;
}

.bg-dark-2 { background-color: #0A192F !important; }
.bg-dark-3 { background-color: rgba(15, 23, 42, 0.6) !important; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-widest { letter-spacing: 0.1em; }

.ambient-glow {
    position: absolute;
    filter: blur(100px);
    border-radius: 50%;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
}

.glow-1 {
    top: 5%;
    left: -5%;
    width: 600px;
    height: 600px;
    background: #0284C7;
}

.glow-2 {
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: #10B981;
}

.hover-link {
    transition: all 0.3s ease;
}

.hover-link:hover {
    color: white !important;
}

.hover-primary {
    transition: all 0.3s ease;
}

.hover-primary:hover {
    color: #10B981 !important;
}

.divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #10B981, #0284C7);
    border-radius: 2px;
}

.shadow-premium {
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5) !important;
}

.border-card {
    border: 1px solid rgba(255,255,255,0.05) !important;
    background: rgba(15, 23, 42, 0.4) !important;
    backdrop-filter: blur(10px);
}

.product-card {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}

.card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}

.img-placeholder-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
}

.product-card:hover {
    transform: translateY(-8px);
    border-color: rgba(16, 185, 129, 0.4) !important;
    background: rgba(30, 41, 59, 0.6) !important;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
}

.product-card:hover .card-glow {
    opacity: 1;
}

.cart-btn {
    transition: all 0.3s ease;
}

.product-card:hover .cart-btn {
    background: #10B981 !important;
    color: white !important;
    transform: scale(1.1);
}

.futuristic-select :deep(.v-field) {
    border-radius: 8px;
    color: white;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2) !important;
    transition: all 0.3s ease;
}

.futuristic-select :deep(.v-field--focused) {
    background-color: rgba(16, 185, 129, 0.05) !important;
    box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.5) !important;
}

.custom-checkbox :deep(.v-label) {
    color: #9CA3AF;
    font-size: 0.9rem;
}

.custom-pagination :deep(.v-pagination__item) {
    background: rgba(255,255,255,0.05) !important;
    color: white !important;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
}

.custom-pagination :deep(.v-pagination__item--is-active) {
    background: #10B981 !important;
    border-color: #10B981;
}
</style>
