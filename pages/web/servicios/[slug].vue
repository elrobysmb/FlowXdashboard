<template>
  <div class="servicio-detail-page section-padding position-relative overflow-hidden" style="background-color: #FFFFFF;">
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <v-container style="max-width: 1100px" class="position-relative z-10 pt-4">
      
      <!-- Back Link -->
      <div class="mb-10 animate-fade-up">
        <NuxtLink to="/web/servicios" class="text-decoration-none hover-primary d-inline-flex align-center font-weight-medium" style="color: #666;">
          <div class="back-btn-icon mr-3 d-flex align-center justify-center">
            <v-icon icon="mdi-arrow-left" size="small"></v-icon>
          </div>
          Volver a Servicios
        </NuxtLink>
      </div>

      <!-- Header Content -->
      <v-row class="mb-16">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center pr-md-10 animate-fade-up delay-100">
          <v-chip variant="outlined" color="primary" class="mb-6 align-self-start">Servicio Especializado</v-chip>
          <h1 class="text-h3 text-md-h2 font-weight-black mb-6 text-capitalize tracking-tight" style="color: #1A4B99; line-height: 1.15;">
            {{ serviceTitle }}
          </h1>
          <div class="divider mb-6"></div>
          <p style="color: #555; line-height: 1.8; font-size: 1.1rem; margin-bottom: 2rem;">
            Contamos con personal altamente calificado para el diseño, ejecución y mantenimiento de proyectos relacionados con nuestra especialidad de <strong>{{ serviceTitle.toLowerCase() }}</strong>. Aseguramos el cumplimiento de los más altos estándares de calidad y seguridad industrial.
          </p>
          <div class="d-flex align-center gap-4">
            <v-btn to="/web/contactenos" class="premium-btn px-8" size="x-large">
              Solicitar Presupuesto
            </v-btn>
            <v-btn variant="outlined" class="custom-outlined-btn" size="x-large" append-icon="mdi-download">
              Brochure
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="animate-fade-up delay-200 mt-8 mt-md-0">
          <div class="hero-image-wrapper border-card rounded-xl">
            <div class="card-glow"></div>
            <v-img :src="heroImage" class="hero-image z-10 position-relative" cover height="450">
              <div class="img-overlay fill-height"></div>
            </v-img>
          </div>
        </v-col>
      </v-row>

      <!-- Details Section -->
      <div class="value-section rounded-xl pa-8 pa-md-12 animate-fade-up delay-300 position-relative overflow-hidden">
        <v-icon icon="mdi-star-four-points" size="120" color="rgba(153, 204, 51, 0.06)" class="position-absolute" style="top: -20px; right: -20px;"></v-icon>
        
        <div class="text-center mb-10">
          <h2 class="text-h4 font-weight-black mb-2 tracking-tight" style="color: #1A4B99;">Nuestra Propuesta de <span class="text-primary">Valor</span></h2>
          <p style="color: #555;">Por qué elegir nuestras divisiones especializadas</p>
        </div>

        <v-row>
          <v-col cols="12" md="4">
            <div class="value-card pa-6 rounded-lg text-center h-100">
              <div class="icon-box mx-auto mb-6">
                <v-icon icon="mdi-check-decagram" color="white" size="32"></v-icon>
              </div>
              <h4 class="text-h6 font-weight-bold mb-3" style="color: #1A4B99;">Personal Certificado</h4>
              <p class="text-body-2 m-0" style="line-height: 1.6; color: #555;">Ingenieros y técnicos especialistas homologados de acuerdo a la normativa vigente.</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="value-card pa-6 rounded-lg text-center h-100" style="animation-delay: 0.1s;">
              <div class="icon-box mx-auto mb-6">
                <v-icon icon="mdi-shield-check" color="white" size="32"></v-icon>
              </div>
              <h4 class="text-h6 font-weight-bold mb-3" style="color: #1A4B99;">Máxima Seguridad</h4>
              <p class="text-body-2 m-0" style="line-height: 1.6; color: #555;">Cumplimiento estricto de normativas y estándares EHS durante toda la ejecución.</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="value-card pa-6 rounded-lg text-center h-100" style="animation-delay: 0.2s;">
              <div class="icon-box mx-auto mb-6">
                <v-icon icon="mdi-clock-fast" color="white" size="32"></v-icon>
              </div>
              <h4 class="text-h6 font-weight-bold mb-3" style="color: #1A4B99;">Cumplimiento de Plazos</h4>
              <p class="text-body-2 m-0" style="line-height: 1.6; color: #555;">Planificación detallada y ejecución eficiente para entregas puntuales garantizadas.</p>
            </div>
          </v-col>
        </v-row>
      </div>

    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'commercial'
})

const route = useRoute()
const slug = route.params.slug as string
const serviceTitle = computed(() => slug ? slug.replace(/-/g, ' ') : '')

// Simple logic to map images based on slug keyword for demonstration
const heroImage = computed(() => {
  if (slug.includes('electrico')) return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  if (slug.includes('metal')) return 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
  return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
})
</script>

<style scoped>
:root {
  --v-dark-navy: #040D1A;
}

.value-section { background-color: #F8F9FA; border: 1px solid rgba(26,75,153,0.08); }
.tracking-tight { letter-spacing: -0.025em; }

.ambient-glow {
    position: absolute;
    filter: blur(100px);
    border-radius: 50%;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
}

.glow-1 {
    top: 5%;
    left: -5%;
    width: 600px;
    height: 600px;
    background: #1A4B99;
}

.glow-2 {
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: #99CC33;
}

.back-btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(26,75,153,0.06);
    border: 1px solid rgba(26,75,153,0.15);
    transition: all 0.3s ease;
    color: #1A4B99;
}

.hover-primary {
    transition: all 0.3s ease;
}

.hover-primary:hover {
    color: #99CC33 !important;
}

.hover-primary:hover .back-btn-icon {
    background: rgba(153, 204, 51, 0.15);
    border-color: rgba(153, 204, 51, 0.4);
    color: #99CC33;
    transform: translateX(-3px);
}

.divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #99CC33, #1A4B99);
    border-radius: 2px;
}

.gap-4 { gap: 1rem; }

.custom-outlined-btn {
    border: 2px solid #1A4B99 !important;
    color: #1A4B99 !important;
    border-radius: 9999px !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
    text-transform: none !important;
    transition: all 0.3s ease !important;
    background: transparent;
}

.custom-outlined-btn:hover {
    background: rgba(26,75,153,0.05);
    transform: translateY(-2px);
}

.hero-image-wrapper {
    position: relative;
    overflow: hidden;
    padding: 2px;
}

.card-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(153, 204, 51, 0.7) 0%, rgba(26, 75, 153, 0.7) 100%);
    z-index: 0;
    opacity: 0.5;
}

.hero-image {
    border-radius: inherit;
}

.img-overlay {
    background: linear-gradient(to top, rgba(26, 75, 153, 0.7) 0%, transparent 50%);
}

.border-card {
    border: 1px solid rgba(26,75,153,0.1);
}

.value-card {
    background: #FFFFFF;
    border: 1px solid rgba(26,75,153,0.1);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.value-card:hover {
    background: #F8FBFF;
    border-color: rgba(153, 204, 51, 0.35);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -10px rgba(153, 204, 51, 0.2);
}

.icon-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(153, 204, 51, 0.2) 0%, rgba(26, 75, 153, 0.2) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(153, 204, 51, 0.3);
    transition: all 0.3s ease;
}

.value-card:hover .icon-box {
    background: linear-gradient(135deg, #99CC33 0%, #1A4B99 100%);
    transform: scale(1.1) rotate(-5deg);
}
</style>
