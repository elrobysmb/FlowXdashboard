<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section d-flex align-center">
      <div class="hero-bg">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
      </div>
      <div class="hero-overlay"></div>
      
      <v-container class="position-relative z-10 hero-container" style="max-width: 1200px">
        <v-row align="center">
          <v-col cols="12" md="7">
            <div class="hero-content">
              <v-chip variant="outlined" class="mb-6 animate-fade-up hero-chip" color="primary">
                <v-icon start icon="mdi-shield-check-outline" size="small"></v-icon>
                Excelencia Comprobada en la Industria
              </v-chip>
              <h1 class="text-h3 text-md-h2 font-weight-black mb-6 animate-fade-up delay-100 uppercase" style="color: #1A4B99; line-height: 1.15; letter-spacing: -2px;">
                Especialistas en soluciones <span class="text-gradient">Integrales</span>
              </h1>
              <p class="text-h6 mb-10 animate-fade-up delay-200" style="color: #444; max-width: 540px; line-height: 1.6; font-weight: 400;">
                11 años brindando componentes, equipos y servicios al sector minero e industrial. Calidad, responsabilidad y eficiencia.
              </p>
              <div class="d-flex flex-wrap gap-4 animate-fade-up delay-300">
                <v-btn size="x-large" class="premium-btn" to="/web/productos">
                  Explorar Catálogo
                  <v-icon end icon="mdi-arrow-right"></v-icon>
                </v-btn>
                <v-btn size="x-large" variant="outlined" class="custom-outlined-btn" to="/web/contactenos">
                  Cotizar Proyecto
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="d-none d-md-flex justify-center position-relative">
            <div class="hero-visual animate-float">
              <div class="hero-image-wrapper">
                 <v-img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" cover class="hero-image" alt="Industria moderna"></v-img>
                 <div class="image-overlay-gradient"></div>
                 <div class="floating-badge">
                   <div class="d-flex align-center pa-4">
                     <v-avatar color="primary" size="48" class="mr-4">
                       <v-icon icon="mdi-shield-star" color="white"></v-icon>
                     </v-avatar>
                     <div>
                       <div class="font-weight-black text-white text-h6">10+ Años</div>
                       <div class="text-caption text-grey-lighten-1">Experiencia en Perú</div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Nuestras Divisiones (CTAs Section) -->
    <section class="section-padding position-relative" style="background-color: #F8F9FA;">
      <v-container style="max-width: 1200px">
        <div class="d-flex flex-column align-center text-center mb-16 animate-fade-up">
          <div class="subtitle-badge mb-4">Nuestras Divisiones</div>
          <h2 class="text-h4 text-md-h3 font-weight-black mb-6 tracking-tight" style="color: #1A4B99;">RESPALDO TOTAL PARA SU <span class="text-primary">EMPRESA</span></h2>
          <p class="mb-0" style="color: #555; max-width: 700px; font-size: 1.1rem; line-height: 1.6;">
            Abarcamos todas las necesidades que su negocio demanda con un equipo de especialistas y proveedores premium.
          </p>
        </div>

        <v-row class="mt-8">
          <!-- VENTAS -->
          <v-col cols="12" sm="6" md="3">
            <NuxtLink to="/web/productos" class="cta-card text-decoration-none">
              <div class="card-glow"></div>
              <div class="cta-content position-relative z-10">
                <div class="cta-icon-wrapper mb-6">
                  <v-icon icon="mdi-cart-outline" size="32" color="white"></v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-3" style="color: #1A4B99;">VENTAS</h3>
                <p class="text-body-2 mb-6" style="color: #555;">Materiales, equipos y herramientas de alta calidad y precisión.</p>
                <div class="cta-arrow-btn">Ver Catálogo <v-icon icon="mdi-arrow-right" size="small" class="ml-1"></v-icon></div>
              </div>
            </NuxtLink>
          </v-col>
          
          <!-- SERVICIOS -->
          <v-col cols="12" sm="6" md="3">
            <NuxtLink to="/web/servicios" class="cta-card text-decoration-none" style="animation-delay: 0.1s">
              <div class="card-glow"></div>
              <div class="cta-content position-relative z-10">
                <div class="cta-icon-wrapper mb-6">
                  <v-icon icon="mdi-account-hard-hat-outline" size="32" color="white"></v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-3" style="color: #1A4B99;">SERVICIOS</h3>
                <p class="text-body-2 mb-6" style="color: #555;">Mantenimiento y soluciones especializadas de nivel industrial.</p>
                <div class="cta-arrow-btn">Nuestros Servicios <v-icon icon="mdi-arrow-right" size="small" class="ml-1"></v-icon></div>
              </div>
            </NuxtLink>
          </v-col>

          <!-- MARCAS -->
          <v-col cols="12" sm="6" md="3">
            <NuxtLink to="/web/marcas" class="cta-card text-decoration-none" style="animation-delay: 0.2s">
              <div class="card-glow"></div>
              <div class="cta-content position-relative z-10">
                <div class="cta-icon-wrapper mb-6">
                  <v-icon icon="mdi-shield-star-outline" size="32" color="white"></v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-3" style="color: #1A4B99;">MARCAS</h3>
                <p class="text-body-2 mb-6" style="color: #555;">Partners estratégicos mundiales brindando respaldo garantizado.</p>
                <div class="cta-arrow-btn">Aliados Comerciales <v-icon icon="mdi-arrow-right" size="small" class="ml-1"></v-icon></div>
              </div>
            </NuxtLink>
          </v-col>

          <!-- INSTALACIONES -->
          <v-col cols="12" sm="6" md="3">
            <NuxtLink to="/web/servicios/diseno-montaje-electrico" class="cta-card text-decoration-none" style="animation-delay: 0.3s">
              <div class="card-glow"></div>
              <div class="cta-content position-relative z-10">
                <div class="cta-icon-wrapper mb-6">
                  <v-icon icon="mdi-lightning-bolt-outline" size="32" color="white"></v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-3" style="color: #1A4B99;">INSTALACIONES</h3>
                <p class="text-body-2 mb-6" style="color: #555;">Diseño, montaje y gestión de sistemas eléctricos y estructurales.</p>
                <div class="cta-arrow-btn">Conocer Más <v-icon icon="mdi-arrow-right" size="small" class="ml-1"></v-icon></div>
              </div>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-container>
    </section>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'commercial'
})
</script>

<style scoped>
/* Page Variables */
:root {
  --v-dark-navy: #040D1A;
}

.home-page {
    background-color: #FFFFFF !important;
    min-height: 100vh;
}

/* Hero Section */
.hero-section {
    min-height: 100vh;
    position: relative;
    padding-top: 100px;
    overflow: hidden;
}

.hero-chip {
    border-color: rgba(153, 204, 51, 0.5) !important;
    background: rgba(153, 204, 51, 0.08);
    color: #6e9d00 !important;
    font-weight: 600;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
}

.blob {
    position: absolute;
    filter: blur(100px);
    border-radius: 50%;
    opacity: 0.5;
    animation: drift 20s infinite alternate linear;
}

.blob-1 {
    top: -10%;
    right: -5%;
    width: 600px;
    height: 600px;
    background: rgba(153, 204, 51, 0.15);
}

.blob-2 {
    bottom: -20%;
    left: -10%;
    width: 800px;
    height: 800px;
    background: rgba(26, 75, 153, 0.1);
    animation-direction: alternate-reverse;
}

@keyframes drift {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-100px, 50px) scale(1.1); }
}

.custom-outlined-btn {
    border: 2px solid #1A4B99 !important;
    color: #1A4B99 !important;
    border-radius: 9999px !important;
    padding: 0 2rem !important;
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

/* Hero Visual & Badge */
.hero-image-wrapper {
    position: relative;
    width: 100%;
    max-width: 450px;
    aspect-ratio: 4/5;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.1);
}

.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
}

.hero-image-wrapper:hover .hero-image {
    transform: scale(1.05);
}

.image-overlay-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(4, 13, 26, 0.8) 0%, transparent 50%);
}

.floating-badge {
    position: absolute;
    bottom: -20px;
    left: -30px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(153, 204, 51, 0.3);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    z-index: 2;
    animation: float-small 4s infinite ease-in-out;
}

@keyframes float-small {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* CTAs (Nuestras Divisiones) */
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

.cta-card {
    display: block;
    background: #FFFFFF;
    border: 1px solid rgba(26, 75, 153, 0.1);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    height: 100%;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
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
}

.cta-card:hover {
    transform: translateY(-10px);
    border-color: rgba(153, 204, 51, 0.4);
    box-shadow: 0 20px 40px -10px rgba(153, 204, 51, 0.2);
}

.cta-card:hover .card-glow {
    opacity: 1;
}

.cta-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(153, 204, 51, 0.15) 0%, rgba(26, 75, 153, 0.15) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(153, 204, 51, 0.25);
    transition: all 0.4s ease;
}

.cta-card:hover .cta-icon-wrapper {
    background: linear-gradient(135deg, #99CC33 0%, #1A4B99 100%);
    transform: scale(1.1) rotate(-5deg);
}

.cta-card:hover .cta-icon-wrapper :deep(.v-icon) {
    color: white !important;
}

.cta-arrow-btn {
    display: inline-flex;
    align-items: center;
    color: #99CC33;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.cta-card:hover .cta-arrow-btn {
    transform: translateX(5px);
    color: #1A4B99;
}
</style>
