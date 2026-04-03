<template>
  <div class="marcas-page section-padding position-relative overflow-hidden">
    <!-- Ambient Glows -->
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>
    
    <v-container style="max-width: 1200px" class="position-relative z-10">
      <div class="text-center mb-16 mt-8 animate-fade-up">
        <v-chip variant="outlined" color="primary" class="mb-4">Aliados Comerciales</v-chip>
        <h1 class="text-h3 text-md-h2 font-weight-black text-white mb-4 tracking-tight">NUESTRAS <span class="text-primary">MARCAS</span></h1>
        <div class="divider mx-auto mb-6"></div>
        <p class="text-grey-lighten-1" style="max-width: 700px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">
          Trabajamos de la mano con líderes mundiales como Partners y Representantes Oficiales, garantizando productos originales y soporte directo de fábrica.
        </p>
      </div>

      <v-row>
        <v-col cols="6" sm="4" md="3" v-for="(marca, index) in marcas" :key="marca" class="animate-fade-up" :style="`animation-delay: ${index * 0.05}s`">
          <v-card class="marca-card bg-transparent border-card p-4 d-flex align-center justify-center rounded-xl" height="160" elevation="0">
            <div class="card-glow"></div>
            <!-- Simulated Logos using text for showcase -->
            <div class="marca-content position-relative z-10 text-center">
              <div class="text-h5 font-weight-black text-grey-darken-1 marca-logo mb-2">{{ marca }}</div>
              <v-icon icon="mdi-shield-check" color="primary" size="small" class="opacity-0 shield-icon"></v-icon>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-16 animate-fade-up delay-300 bg-dark-2 pa-10 rounded-xl contact-banner border-card position-relative overflow-hidden">
        <div class="card-glow" style="background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%);"></div>
        <v-icon icon="mdi-cog-outline" size="100" class="position-absolute opacity-5" style="right: -20px; bottom: -20px;"></v-icon>
        <h2 class="text-h4 font-weight-black text-white mb-4">¿Buscas repuestos originales?</h2>
        <p class="text-grey-lighten-1 mb-8" style="max-width: 600px; margin: 0 auto;">Ofrecemos garantía de fábrica y asesoría técnica en la compra de todos nuestros repuestos y equipos.</p>
        <v-btn to="/web/contactenos" class="premium-btn text-white px-10" size="x-large">
          Cotizar Ahora <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'commercial'
})

const marcas = [
  'SCHULZ', 'BOSCH', 'MAKITA', 'DEWALT', 'SKF', 'TIMKEN', 'LINCOLN', 'GRACO', '3M', 'MSA', 'STEELPRO', 'CAT'
]
</script>

<style scoped>
:root {
  --v-dark-navy: #040D1A;
}

.bg-dark-2 { background-color: #0A192F !important; }
.tracking-tight { letter-spacing: -0.025em; }

.ambient-glow {
    position: absolute;
    filter: blur(100px);
    border-radius: 50%;
    opacity: 0.15;
    pointer-events: none;
    z-index: 0;
}

.glow-1 {
    top: 10%;
    left: 0;
    width: 500px;
    height: 500px;
    background: #0284C7;
}

.glow-2 {
    bottom: 20%;
    right: 0;
    width: 600px;
    height: 600px;
    background: #10B981;
}

.border-card {
    border: 1px solid rgba(255,255,255,0.05) !important;
    background: rgba(15, 23, 42, 0.3) !important;
    backdrop-filter: blur(10px);
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
    background: radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}

.marca-card:hover {
    transform: translateY(-8px);
    border-color: rgba(16, 185, 129, 0.4) !important;
    background: rgba(16, 185, 129, 0.05) !important;
    box-shadow: 0 15px 30px -10px rgba(16, 185, 129, 0.2);
}

.marca-card:hover .card-glow {
    opacity: 1;
}

.marca-card:hover .marca-logo {
    color: white !important;
    transform: scale(1.05);
}

.marca-card:hover .shield-icon {
    opacity: 1 !important;
    transform: translateY(0);
}

.marca-logo {
    transition: all 0.3s ease;
}

.shield-icon {
    transition: all 0.3s ease;
    transform: translateY(10px);
}

.opacity-0 { opacity: 0; }
.opacity-5 { opacity: 0.05; }

.divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #10B981, #0284C7);
    border-radius: 2px;
}
</style>
