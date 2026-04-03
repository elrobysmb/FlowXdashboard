<template>
  <div class="nosotros-page">
    <!-- Header Page -->
    <section class="page-header py-16 position-relative">
      <div class="bg-gradient-overlay"></div>
      <v-container class="position-relative z-10 text-center animate-fade-up" style="max-width: 1000px">
        <v-chip variant="outlined" color="primary" class="mb-4">Historia y Trayectoria</v-chip>
        <h1 class="text-h3 font-weight-black text-white mb-4 tracking-tight">ACERCA DE <span class="text-primary">NOSOTROS</span></h1>
        <div class="divider mx-auto mb-6"></div>
        <p class="text-h6 text-white" style="max-width: 800px; margin: 0 auto; line-height: 1.6; opacity: 0.85;">
          Más de <strong>11 años de experiencia</strong> brindando soluciones integrales a la industria. Nos hemos consolidado como un aliado estratégico, ofreciendo calidad, eficiencia y respaldo constante.
        </p>
      </v-container>
    </section>

    <!-- Misión & Visión -->
    <section class="section-padding position-relative overflow-hidden" style="background-color: #F8F9FA;">
      <!-- Decorator -->
      <div class="position-absolute" style="top: 10%; right: 5%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(26, 75, 153, 0.06) 0%, transparent 60%); pointer-events: none; border-radius: 50%;"></div>
      
      <v-container style="max-width: 1200px" class="position-relative z-10">
        <v-row>
          <!-- Mision -->
          <v-col cols="12" md="6">
            <div class="mv-card h-100 pa-8 rounded-xl position-relative overflow-hidden animate-fade-up">
              <div class="mv-bg-icon">
                <v-icon icon="mdi-target" size="180" color="rgba(153, 204, 51, 0.06)"></v-icon>
              </div>
              <div class="position-relative z-10">
                <div class="d-flex align-center mb-6">
                  <div class="icon-box primary-box mr-4">
                    <v-icon icon="mdi-flag-variant-outline" color="white" size="32"></v-icon>
                  </div>
                  <h2 class="text-h4 font-weight-bold tracking-tight" style="color: #1A4B99;">Nuestra Misión</h2>
                </div>
                <p class="text-body-1" style="line-height: 1.8; color: #555;">
                  Ser líderes en comercialización y suministro de equipos, herramientas y servicios para los sectores minero, constructivo, petrolero y energético industrial. Optimizando nuestra logística para brindar un servicio de excelencia a nivel nacional, superando siempre las expectativas de nuestros clientes.
                </p>
              </div>
            </div>
          </v-col>

          <!-- Vision -->
          <v-col cols="12" md="6">
            <div class="mv-card h-100 pa-8 rounded-xl position-relative overflow-hidden animate-fade-up delay-100">
              <div class="mv-bg-icon">
                <v-icon icon="mdi-eye" size="180" color="rgba(26, 75, 153, 0.06)"></v-icon>
              </div>
              <div class="position-relative z-10">
                <div class="d-flex align-center mb-6">
                  <div class="icon-box secondary-box mr-4">
                    <v-icon icon="mdi-eye-outline" color="white" size="32"></v-icon>
                  </div>
                  <h2 class="text-h4 font-weight-bold tracking-tight" style="color: #1A4B99;">Nuestra Visión</h2>
                </div>
                <p class="text-body-1" style="line-height: 1.8; color: #555;">
                  Lograr ser el distribuidor más eficiente y confiable del mercado. Buscamos la mejora continua de nuestros procesos, expandiendo nuestro portafolio de representaciones exclusivas y garantizando un nivel superior de respaldo técnico y comercial para la industria moderna.
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Valores -->
    <section class="section-padding" style="background-color: #FFFFFF;">
      <v-container style="max-width: 1200px">
        <div class="text-center mb-12 animate-fade-up">
          <div class="subtitle-badge mb-4">Filosofía Corporativa</div>
          <h2 class="text-h4 text-md-h3 font-weight-black mb-4 tracking-tight" style="color: #1A4B99;">NUESTROS VALORES</h2>
          <p style="color: #555; max-width: 600px; margin: 0 auto; font-size: 1.1rem;">Los principios que guían nuestro trabajo día a día y forman el cimiento de nuestra empresa.</p>
        </div>

        <v-row>
          <v-col cols="12" sm="6" md="3" v-for="(valor, index) in valores" :key="index" class="animate-fade-up" :style="`animation-delay: ${index * 0.05}s`">
            <div class="valor-card text-center pa-6 h-100 rounded-xl">
              <div class="valor-icon-wrapper mx-auto mb-4">
                <v-icon :icon="valor.icon" size="36" color="#99CC33"></v-icon>
              </div>
              <h3 class="text-h6 font-weight-bold mb-2" style="color: #1A4B99;">{{ valor.name }}</h3>
              <div class="small-divider mx-auto"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Marcas Swiper -->
    <section class="py-12 overflow-hidden position-relative" style="background-color: #F8F9FA;">
      <div class="text-center mb-8">
        <div class="subtitle-badge mb-4">Aliados Estratégicos</div>
        <h2 class="text-h5 font-weight-black px-4" style="color: #1A4B99;">Respaldados por Líderes Mundiales</h2>
      </div>
      <div class="marquee-container">
        <div class="marquee-content d-flex align-center">
          <div class="marca-item px-8" v-for="marca in marcas" :key="marca">
            <span class="text-h4 font-weight-black text-grey-darken-1">{{ marca }}</span>
          </div>
          <!-- Duplicate for infinite scroll -->
          <div class="marca-item px-8" v-for="marca in marcas" :key="marca+'-dup'">
            <span class="text-h4 font-weight-black text-grey-darken-1">{{ marca }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'commercial'
})

const valores = [
  { name: 'Integridad', icon: 'mdi-shield-account-outline' },
  { name: 'Compromiso', icon: 'mdi-handshake-outline' },
  { name: 'Honestidad', icon: 'mdi-scale-balance' },
  { name: 'Eficiencia', icon: 'mdi-lightning-bolt-outline' },
  { name: 'Equidad', icon: 'mdi-account-group-outline' },
  { name: 'Innovación', icon: 'mdi-lightbulb-on-outline' },
  { name: 'Trabajo en Equipo', icon: 'mdi-account-multiple-outline' },
  { name: 'Vocación de Servicio', icon: 'mdi-heart-outline' }
]

const marcas = [
  'SCHULZ', 'BOSCH', 'MAKITA', 'DEWALT', 'SKF', 'TIMKEN', 'LINCOLN', 'GRACO', '3M', 'MSA', 'STEELPRO', 'CAT'
]
</script>

<style scoped>
:root {
  --v-dark-navy: #040D1A;
}

.nosotros-page {
    background-color: #FFFFFF;
}
.tracking-tight { letter-spacing: -0.025em; }

.page-header {
    background-image: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding-top: 150px !important;
    padding-bottom: 100px !important;
}

.bg-gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(26, 75, 153, 0.85) 0%, rgba(26, 75, 153, 0.95) 100%);
    backdrop-filter: blur(3px);
}

.mv-card {
    background: #FFFFFF;
    border: 1px solid rgba(26, 75, 153, 0.1);
    transition: all 0.4s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.mv-card:hover {
    background: #FAFCFF;
    border-color: rgba(153, 204, 51, 0.3);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -10px rgba(26, 75, 153, 0.15);
}

.mv-bg-icon {
    position: absolute;
    bottom: -40px;
    right: -20px;
    pointer-events: none;
    transition: all 0.5s ease;
}

.mv-card:hover .mv-bg-icon {
    transform: scale(1.1) rotate(-10deg);
}

.icon-box {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.1);
}

.primary-box {
    background: linear-gradient(135deg, rgba(153, 204, 51, 0.2) 0%, rgba(153, 204, 51, 0.8) 100%);
    box-shadow: 0 10px 20px -5px rgba(153, 204, 51, 0.3);
}

.secondary-box {
    background: linear-gradient(135deg, rgba(26, 75, 153, 0.2) 0%, rgba(26, 75, 153, 0.8) 100%);
    box-shadow: 0 10px 20px -5px rgba(26, 75, 153, 0.3);
}

.valor-card {
    background: #FFFFFF;
    border: 1px solid rgba(26, 75, 153, 0.1);
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.valor-card:hover {
    background: #F8FBFF;
    border-color: rgba(153, 204, 51, 0.4);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -10px rgba(153, 204, 51, 0.2);
}

.valor-icon-wrapper {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(153, 204, 51, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(153, 204, 51, 0.2);
}

.valor-card:hover .valor-icon-wrapper {
    background: rgba(153, 204, 51, 0.2);
    transform: scale(1.1);
}

.small-divider {
    width: 30px;
    height: 3px;
    background: #99CC33;
    border-radius: 2px;
    opacity: 0.6;
    transition: width 0.3s ease;
}

.valor-card:hover .small-divider {
    width: 50px;
    opacity: 1;
}

.subtitle-badge {
    color: #99CC33;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 0.85rem;
    position: relative;
    display: inline-block;
}

.subtitle-badge::before, .subtitle-badge::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30px;
    height: 1px;
    background: rgba(153, 204, 51, 0.6);
}
.subtitle-badge::before { left: -40px; }
.subtitle-badge::after { right: -40px; }

/* Marquee Swiper */
.marquee-container {
    width: 100vw;
    margin-left: calc(-50vw + 50%); /* Full width bleed */
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
    padding: 1rem 0;
}
.marquee-content {
    width: max-content;
    animation: scroll 30s linear infinite;
}
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
.marquee-content:hover {
    animation-play-state: paused;
}
.marca-item span {
    transition: all 0.3s ease;
}
.marca-item:hover span {
    color: #99CC33 !important;
    transform: scale(1.1);
    display: inline-block;
}
</style>
