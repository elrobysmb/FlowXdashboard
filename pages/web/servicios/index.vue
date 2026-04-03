<template>
  <div class="servicios-page section-padding position-relative overflow-hidden" style="background-color: #FFFFFF;">
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <v-container style="max-width: 1200px" class="position-relative z-10 pt-4">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-up">
        <v-chip variant="outlined" color="primary" class="mb-4">División Especializada</v-chip>
        <h1 class="text-h3 text-md-h2 font-weight-black mb-4 tracking-tight" style="color: #1A4B99;">Servicios <span class="text-primary">Especializados</span></h1>
        <div class="divider mx-auto mb-6"></div>
        <p style="color: #555; max-width: 700px; margin: 0 auto; line-height: 1.6; font-size: 1.1rem;">
          Ofrecemos soluciones integrales y servicios garantizados para optimizar sus operaciones y desarrollar sus proyectos industriales con la más alta seguridad.
        </p>
      </div>

      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(servicio, index) in servicios" :key="servicio.slug" class="animate-fade-up" :style="`animation-delay: ${index * 0.05}s`">
          <NuxtLink :to="`/web/servicios/${servicio.slug}`" class="text-decoration-none h-100 d-block">
            <v-card class="servicio-card h-100 bg-transparent border-card rounded-xl overflow-hidden d-flex flex-column" elevation="0">
              <div class="card-glow"></div>
              
              <div class="position-relative overflow-hidden">
                <v-img :src="servicio.image" height="240" cover class="visual-img">
                  <div class="img-overlay fill-height d-flex flex-column justify-end pa-6 position-relative z-10">
                    <h3 class="text-h5 font-weight-bold text-white tracking-tight" style="line-height: 1.2;">{{ servicio.title }}</h3>
                  </div>
                </v-img>
              </div>

              <div class="pa-6 flex-grow-1 d-flex flex-column service-card-body position-relative z-10">
                <p class="text-grey-lighten-1 text-body-2 mb-6 flex-grow-1" style="line-height: 1.6;">{{ servicio.desc }}</p>
                
                <div class="mb-6">
                  <div class="text-caption font-weight-bold mb-3 tracking-widest text-primary">ESPECIALIDADES:</div>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip v-for="sub in servicio.subs" :key="sub" size="small" variant="outlined" color="grey-lighten-1" class="border-opacity-50 special-chip">{{ sub }}</v-chip>
                  </div>
                </div>

                <div class="mt-auto pt-4 border-top">
                  <div class="d-flex align-center text-primary font-weight-bold view-more">
                    Ver Detalles <v-icon icon="mdi-arrow-right" size="small" class="ml-2 icon-move"></v-icon>
                  </div>
                </div>
              </div>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'commercial'
})

const servicios = [
  {
    title: 'Construcción General',
    slug: 'construccion-general',
    desc: 'Ejecución de proyectos de obras civiles y arquitectónicos adaptados a normativas vigentes.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    subs: ['Construcción civil', 'Construcción drywall', 'Rapi-módulos']
  },
  {
    title: 'Instalaciones Eléctricas',
    slug: 'diseno-montaje-electrico',
    desc: 'Diseño, ejecución y mantenimiento de sistemas eléctricos industriales y tableros de control.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600',
    subs: ['Diseño', 'Montaje', 'Sistema PAT', 'Mantenimiento']
  },
  {
    title: 'Metalmecánica',
    slug: 'metalmecanica',
    desc: 'Fabricación de estructuras metálicas, casetas y proyectos a medida para el sector minero e industrial.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
    subs: ['Estructuras', 'Casetas Acústicas', 'Soldadura Homologada']
  }
]
</script>

<style scoped>
:root {
  --v-dark-navy: #040D1A;
}

.service-card-body { background-color: #FFFFFF; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-widest { letter-spacing: 0.1em; }

.ambient-glow {
    position: absolute;
    filter: blur(100px);
    border-radius: 50%;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
}

.glow-1 {
    top: -10%;
    left: -5%;
    width: 600px;
    height: 600px;
    background: #1A4B99;
}

.glow-2 {
    bottom: -10%;
    right: -5%;
    width: 500px;
    height: 500px;
    background: #99CC33;
}

.border-card {
    border: 1px solid rgba(26,75,153,0.1) !important;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.servicio-card {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
}

.card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(153, 204, 51, 0.08) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 1;
}

.visual-img {
    transition: transform 0.6s ease;
}

.servicio-card:hover {
    transform: translateY(-8px);
    border-color: rgba(153, 204, 51, 0.4) !important;
    box-shadow: 0 20px 40px -10px rgba(153, 204, 51, 0.2);
}

.servicio-card:hover .visual-img {
    transform: scale(1.05);
}

.servicio-card:hover .card-glow {
    opacity: 1;
}

.img-overlay {
    background: linear-gradient(to top, rgba(26, 75, 153, 0.9) 0%, rgba(26, 75, 153, 0.2) 60%, transparent 100%);
}

.gap-2 { gap: 0.5rem; }

.border-top {
    border-top: 1px solid rgba(26,75,153,0.08);
}

.view-more {
    transition: all 0.3s ease;
}

.servicio-card:hover .view-more {
    color: #1A4B99 !important;
}

.icon-move {
    transition: transform 0.3s ease;
}

.servicio-card:hover .icon-move {
    transform: translateX(5px);
}

.text-grey-lighten-1 {
    color: #555 !important;
}

.special-chip {
    transition: all 0.3s ease;
}

.servicio-card:hover .special-chip {
    border-color: rgba(153, 204, 51, 0.4) !important;
    color: #1A4B99 !important;
}

.divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #99CC33, #1A4B99);
    border-radius: 2px;
}
</style>
