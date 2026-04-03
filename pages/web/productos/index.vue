<template>
  <div class="productos-page section-padding position-relative overflow-hidden" style="background-color: #FFFFFF;">
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>
    
    <v-container style="max-width: 1200px" class="position-relative z-10 pt-4">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-up">
        <v-chip variant="outlined" color="primary" class="mb-4">Catálogo Integral</v-chip>
        <h1 class="text-h3 text-md-h2 font-weight-black mb-4 tracking-tight" style="color: #1A4B99;">Líneas de <span class="text-primary">Negocio</span></h1>
        <div class="divider mx-auto mb-6"></div>
        <p style="color: #555; max-width: 700px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">
          Descubra nuestro portafolio de productos y equipos especializados, garantizando calidad, rendimiento y seguridad para la industria moderna.
        </p>
      </div>

      <!-- Categories Grid -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(categoria, index) in categorias" :key="categoria.slug" class="animate-fade-up" :style="`animation-delay: ${index * 0.05}s`">
          <NuxtLink :to="`/web/productos/${categoria.slug}`" class="text-decoration-none h-100 d-block">
            <v-card class="category-card h-100 d-flex flex-column bg-transparent" elevation="0">
              <div class="card-glow"></div>
              <div class="category-img-wrapper">
                <v-img :src="categoria.image" height="180" cover class="rounded-t-xl align-end visual-img">
                  <div class="img-overlay fill-height d-flex align-end pa-4">
                    <div class="icon-bubble d-flex align-center justify-center">
                      <v-icon :icon="categoria.icon" color="white" size="24"></v-icon>
                    </div>
                  </div>
                </v-img>
              </div>
              <div class="category-content pa-5 d-flex flex-column flex-grow-1 rounded-b-xl border-card position-relative z-10">
                <h3 class="text-h6 font-weight-bold mb-2" style="color: #1A4B99;">{{ categoria.name }}</h3>
                <p class="text-body-2 flex-grow-1" style="line-height: 1.5; color: #555;">{{ categoria.desc }}</p>
                
                <div class="mt-4 text-primary font-weight-bold d-flex align-center category-link">
                  Explorar Línea <v-icon icon="mdi-arrow-right" class="ml-1" size="small"></v-icon>
                </div>
              </div>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>

      <div class="mt-16 text-center animate-fade-up delay-300">
        <v-card class="cta-bottom-card pa-8 rounded-xl d-inline-block" elevation="2">
          <div class="d-flex flex-column flex-md-row align-center gap-6">
            <div class="text-left">
              <h3 class="text-h5 font-weight-bold mb-1" style="color: #1A4B99;">¿No encuentra un producto específico?</h3>
              <p style="color: #555; margin-bottom: 0;">Contamos con un equipo de especialistas dispuesto a ayudarle en su cotización.</p>
            </div>
            <v-btn to="/web/contactenos" class="premium-btn ml-md-4 mt-4 mt-md-0 px-8" size="large">
              Solicitar Cotización
            </v-btn>
          </div>
        </v-card>
      </div>

    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'commercial'
})

const categorias = [
    {
        name: 'Equipos de Lubricación',
        slug: 'equipos-lubricacion',
        icon: 'mdi-oil',
        desc: 'Sistemas de engrase y distribución de fluidos de alta precisión.',
        image: 'https://images.unsplash.com/photo-1615554851458-7c87c065f6c8?auto=format&fit=crop&q=80&w=600'
    },
    {
        name: 'Equipos para taller',
        slug: 'equipos-taller',
        icon: 'mdi-tools',
        desc: 'Mobiliario, maquinarias y herramientas pesadas para talleres.',
        image: 'https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?auto=format&fit=crop&q=80&w=600'
    },
    {
        name: 'Equipos de limpieza',
        slug: 'equipos-limpieza',
        icon: 'mdi-vacuum',
        desc: 'Hidrolavadoras y aspiradoras industriales de alto rendimiento.',
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600'
    },
    {
        name: 'Comprensores',
        slug: 'comprensores',
        icon: 'mdi-air-filter',
        desc: 'Compresores de pistón y tornillo para aplicaciones neumáticas.',
        image: 'https://plus.unsplash.com/premium_photo-1664300900349-afbce110ceeb?auto=format&fit=crop&q=80&w=600'
    },
    {
        name: 'Seguridad industrial',
        slug: 'seguridad-industrial',
        icon: 'mdi-hard-hat',
        desc: 'EPP, líneas de vida y equipamiento de prevención de riesgos.',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600'
    },
    {
        name: 'Suministro Integral',
        slug: 'suministro-integral',
        icon: 'mdi-package-variant-closed',
        desc: 'Provisión en masa de insumos recurrentes para campamentos.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?auto=format&fit=crop&q=80&w=600'
    },
    {
        name: 'Línea Amarilla',
        slug: 'linea-amarilla',
        icon: 'mdi-excavator',
        desc: 'Maquinaria pesada para construcción y movimiento de tierras.',
        image: 'https://images.unsplash.com/photo-1579512353119-e932b6bcde09?auto=format&fit=crop&q=80&w=600'
    },
    {
        name: 'Materiales Eléctricos',
        slug: 'materiales-electricos',
        icon: 'mdi-lightning-bolt',
        desc: 'Conductores, tableros y accesorios eléctricos industriales.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600'
    }
]
</script>

<style scoped>
:root {
  --v-dark-navy: #040D1A;
}

.cta-bottom-card {
    background: #F8F9FA !important;
    border: 1px solid rgba(26,75,153,0.1);
}
.tracking-tight { letter-spacing: -0.025em; }

.ambient-glow {
    position: absolute;
    filter: blur(100px);
    border-radius: 50%;
    opacity: 0.07;
    pointer-events: none;
    z-index: 0;
}

.glow-1 {
    top: -10%;
    left: -5%;
    width: 600px;
    height: 600px;
    background: #99CC33;
}

.glow-2 {
    bottom: -10%;
    right: -5%;
    width: 500px;
    height: 500px;
    background: #1A4B99;
}

.border-card {
    border: 1px solid rgba(26,75,153,0.1) !important;
    background: #FFFFFF;
    border-top: none !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.category-card {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
}

.category-img-wrapper {
    overflow: hidden;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
}

.visual-img {
    transition: transform 0.6s ease;
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

.category-card:hover {
    transform: translateY(-8px);
}

.category-card:hover .card-glow {
    opacity: 1;
}

.category-card:hover .visual-img {
    transform: scale(1.1);
}

.category-card:hover .border-card {
    border-color: rgba(153, 204, 51, 0.3) !important;
    background: #F8FBFF;
    box-shadow: 0 20px 40px -10px rgba(153, 204, 51, 0.2);
}

.category-link {
    transition: all 0.3s ease;
}

.category-card:hover .category-link {
    transform: translateX(5px);
    color: #1A4B99 !important;
}

.img-overlay {
    background: linear-gradient(to top, rgba(26, 75, 153, 0.85) 0%, transparent 100%);
}

.icon-bubble {
    width: 48px;
    height: 48px;
    background: rgba(153, 204, 51, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(153, 204, 51, 0.35);
    transition: all 0.3s ease;
}

.category-card:hover .icon-bubble {
    background: #99CC33;
    transform: scale(1.1);
}

.gap-6 {
    gap: 1.5rem;
}

.divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #99CC33, #1A4B99);
    border-radius: 2px;
}
</style>
