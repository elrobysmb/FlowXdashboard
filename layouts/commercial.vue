<template>
  <VApp theme="light" class="grijalva-app theme-light">
    <!-- Navbar -->
    <v-app-bar :elevation="isScrolled ? 4 : 1" :color="isScrolled ? '#FFFFFF' : 'rgba(255,255,255,0.92)'" style="backdrop-filter: blur(16px); transition: all 0.4s; border-bottom: 1px solid rgba(26, 75, 153, 0.1);" fixed>
      <v-container class="d-flex align-center py-0 px-4 px-md-0" style="max-width: 1200px">
        <div class="logo d-flex align-center cursor-pointer" @click="$router.push('/web')">
          <span class="logo-text font-weight-black text-h5 tracking-tight">GRIJALVA</span>
          <span class="text-primary font-weight-black text-h5 ml-1">.</span>
        </div>
        
        <v-spacer></v-spacer>

        <!-- Desktop Navigation -->
        <div class="d-none d-md-flex align-center gap-6">
          <NuxtLink to="/web" class="nav-link">Inicio</NuxtLink>
          <NuxtLink to="/web/nosotros" class="nav-link">Nosotros</NuxtLink>
          <NuxtLink to="/web/productos" class="nav-link">Productos</NuxtLink>
          <NuxtLink to="/web/servicios" class="nav-link">Servicios</NuxtLink>
          <NuxtLink to="/web/contactenos" class="nav-link">Contacto</NuxtLink>
        </div>

        <v-spacer class="d-none d-md-flex"></v-spacer>

        <div class="d-none d-lg-flex flex-column text-right mr-6 text-caption" style="color: #555;">
          <div class="d-flex align-center justify-end"><v-icon icon="mdi-phone" size="14" color="primary" class="mr-1"></v-icon> Servicios: <strong class="ml-1" style="color: #1A4B99;">951 351 783</strong></div>
          <div class="d-flex align-center justify-end"><v-icon icon="mdi-phone" size="14" color="primary" class="mr-1"></v-icon> Ventas: <strong class="ml-1" style="color: #1A4B99;">936 542 929</strong></div>
        </div>

        <v-btn class="premium-btn d-none d-sm-flex" to="/web/contactenos" elevation="8">Cotizar Ahora</v-btn>

        <!-- Mobile Menu Icon -->
        <v-btn icon="mdi-menu-open" class="d-flex d-md-none text-white glow-icon" @click="drawer = !drawer"></v-btn>

      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer (custom - avoids Vuetify layout offsets that cause black bar) -->
    <Transition name="drawer">
      <div v-if="drawer" class="mobile-overlay" @click="drawer = false"></div>
    </Transition>
    <div class="mobile-drawer" :class="{ 'open': drawer }">
      <div class="pa-6" style="border-bottom: 1px solid rgba(26,75,153,0.1)">
        <div class="d-flex justify-space-between align-center mb-4">
          <div class="logo d-flex align-center">
            <span class="logo-text font-weight-black text-h5">GRIJALVA</span>
            <span class="text-primary font-weight-black text-h5 ml-1">.</span>
          </div>
          <button class="close-btn" @click="drawer = false">✕</button>
        </div>
        <p style="color: #666; font-size: 0.85rem;">Soluciones Industriales</p>
      </div>
      <nav class="pa-4 mt-2">
        <NuxtLink to="/web" class="drawer-link" @click="drawer = false">Inicio</NuxtLink>
        <NuxtLink to="/web/nosotros" class="drawer-link" @click="drawer = false">Nosotros</NuxtLink>
        <NuxtLink to="/web/productos" class="drawer-link" @click="drawer = false">Productos</NuxtLink>
        <NuxtLink to="/web/servicios" class="drawer-link" @click="drawer = false">Servicios</NuxtLink>
        <NuxtLink to="/web/contactenos" class="drawer-link" @click="drawer = false">Contacto</NuxtLink>
      </nav>
      <div class="pa-6" style="position:absolute; bottom: 0; width:100%; border-top: 1px solid rgba(255,255,255,0.08)">
        <div class="mb-3 d-flex align-center" style="color: #555; font-size: 0.85rem;"><v-icon icon="mdi-phone" size="16" color="primary" class="mr-2"></v-icon> <strong style="color: #1A4B99;">951 351 783</strong></div>
        <div class="d-flex align-center" style="color: #555; font-size: 0.85rem;"><v-icon icon="mdi-phone" size="16" color="primary" class="mr-2"></v-icon> <strong style="color: #1A4B99;">936 542 929</strong></div>
      </div>
    </div>

    <!-- Main Content -->
    <VMain class="main-content" style="min-height: 100vh;">
      <slot />
    </VMain>

    <!-- Footer -->
    <footer class="footer-section pt-16 pb-8 position-relative overflow-hidden">
      <!-- Glow effect in footer -->
      <div class="footer-glow"></div>
      
      <v-container style="max-width: 1200px" class="position-relative z-10">
        <v-row>
          <v-col cols="12" md="4" class="pr-md-8">
            <h2 class="text-h4 font-weight-black mb-6 tracking-tight" style="color: #1A4B99;">GRIJALVA<span class="text-primary">.</span></h2>
            <p class="footer-body-text mb-8" style="line-height: 1.8;">
              Comprometidos con la excelencia y la innovación en el sector industrial peruano. Materiales, equipos y servicios integrales.
            </p>
            <div class="d-flex gap-3">
              <v-btn icon="mdi-facebook" variant="tonal" color="primary" size="small" class="rounded-lg"></v-btn>
              <v-btn icon="mdi-linkedin" variant="tonal" color="primary" size="small" class="rounded-lg"></v-btn>
              <v-btn icon="mdi-instagram" variant="tonal" color="primary" size="small" class="rounded-lg"></v-btn>
            </div>
          </v-col>
          
          <v-col cols="12" md="3">
            <h3 class="text-subtitle-1 font-weight-bold mb-6" style="color: #1A4B99;">Ubicación y Horarios</h3>
            <ul class="footer-info">
              <li>
                <div class="footer-icon-box"><v-icon icon="mdi-map-marker" size="14" color="white"></v-icon></div>
                <div><span class="text-primary font-weight-bold">Ventas:</span><br/><span class="footer-body-text">Calle Neptuno Mz. A Lt.8 Alamos de Naranjal - SMP</span></div>
              </li>
              <li>
                <div class="footer-icon-box"><v-icon icon="mdi-map-marker" size="14" color="white"></v-icon></div>
                <div><span class="text-primary font-weight-bold">Servicios:</span><br/><span class="footer-body-text">Av. Grau Mz. E Lt. 5 - Pasco</span></div>
              </li>
              <li class="mt-6">
                <div class="footer-icon-box"><v-icon icon="mdi-clock-outline" size="14" color="white"></v-icon></div>
                <div class="footer-body-text"><span class="font-weight-bold" style="color: #1A4B99;"> L-V:</span> 8:00 - 13:00 / 14:00 - 17:00</div>
              </li>
              <li>
                <div class="footer-icon-box"><v-icon icon="mdi-clock-outline" size="14" color="white"></v-icon></div>
                <div class="footer-body-text"><span class="font-weight-bold" style="color: #1A4B99;"> Sáb:</span> 8:00 - 13:00</div>
              </li>
            </ul>
          </v-col>

          <v-col cols="12" md="2">
            <h3 class="text-subtitle-1 font-weight-bold mb-6" style="color: #1A4B99;">Enlaces Rápidos</h3>
            <ul class="footer-links">
              <li><NuxtLink to="/web">Inicio</NuxtLink></li>
              <li><NuxtLink to="/web/nosotros">Nosotros</NuxtLink></li>
              <li><NuxtLink to="/web/productos">Productos</NuxtLink></li>
              <li><NuxtLink to="/web/servicios">Servicios</NuxtLink></li>
            </ul>
          </v-col>

          <v-col cols="12" md="3">
            <h3 class="text-subtitle-1 font-weight-bold mb-6" style="color: #1A4B99;">Legal & Utilidad</h3>
            <ul class="footer-links">
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Envíos y Entregas</a></li>
              <li><a href="#">Libro de Reclamaciones</a></li>
            </ul>
          </v-col>
        </v-row>
        
        <div class="footer-divider my-8"></div>
        
        <div class="d-flex flex-column flex-md-row justify-space-between align-center text-caption text-grey">
          <div class="mb-4 mb-md-0">
            &copy; {{ new Date().getFullYear() }} Corporación Industrial Grijalva. Todos los derechos reservados.
          </div>
          <div class="d-flex gap-4">
            <span>Desarrollado con <v-icon icon="mdi-heart" color="primary" size="x-small"></v-icon></span>
          </div>
        </div>
      </v-container>
    </footer>
  </VApp>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const drawer = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* ==== Global layout reset for Vuetify ==== */
:root {
  --v-layout-left: 0px !important;
  --v-layout-right: 0px !important;
}

.grijalva-app,
.v-application,
.v-application__wrap,
.v-main,
.v-main__wrap {
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  left: 0 !important;
  right: 0 !important;
}

/* Ensure no hidden left offset from drawer */
.v-application__wrap,
.v-main,
.v-main__wrap {
  --v-layout-left: 0px !important;
  --v-layout-right: 0px !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* WHITE background across all wrappers */
.grijalva-app,
.v-application,
.v-application__wrap,
.v-main,
.v-main__wrap {
  background-color: #FFFFFF !important;
  color: #1a1a2e;
}

/* Global Styles */
html, body {
    background-color: #FFFFFF !important;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
}

.v-application,
.v-application__wrap,
.v-main,
.v-main__wrap {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  left: 0 !important;
  right: 0 !important;
}

.text-gradient {
    background: linear-gradient(135deg, #99CC33 0%, #1A4B99 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.text-primary {
    color: #99CC33 !important;
}

.logo-text {
    color: #1A4B99 !important;
}

.section-padding {
    padding: 7rem 0;
}

/* Typography Utilities */
.tracking-tight { letter-spacing: -0.025em; }
.border-light-10 { border-color: rgba(26,75,153,0.1) !important; }

/* Buttons */
.premium-btn {
    background: linear-gradient(135deg, #99CC33 0%, #7aaa1c 100%) !important;
    color: white !important;
    border-radius: 9999px !important;
    padding: 0 2rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
    text-transform: none !important;
    transition: all 0.3s ease !important;
    border: none;
}

.premium-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(153, 204, 51, 0.5) !important;
}

/* Nav Links */
.nav-link {
    color: #444;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    padding: 0.5rem 0;
    position: relative;
}

.nav-link:hover, .nav-link.router-link-active {
    color: #1A4B99;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: #99CC33;
    transition: width 0.3s ease;
    border-radius: 2px;
}

.nav-link:hover::after, .nav-link.router-link-active::after {
    width: 100%;
}

.nav-link.router-link-active {
    font-weight: 700;
    color: #1A4B99;
}

/* Custom Mobile Drawer - no Vuetify layout side-effects */
.mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9998;
    backdrop-filter: blur(4px);
}

.mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: #FFFFFF;
    backdrop-filter: blur(20px);
    border-left: 1px solid rgba(26, 75, 153, 0.15);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    overflow-y: auto;
    box-shadow: -10px 0 40px rgba(0,0,0,0.1);
}

.mobile-drawer.open {
    transform: translateX(0);
}

.drawer-link {
    display: block;
    padding: 1rem 1.25rem;
    color: #444;
    text-decoration: none;
    font-weight: 600;
    border-radius: 12px;
    margin-bottom: 4px;
    transition: all 0.25s ease;
    font-size: 1rem;
}

.drawer-link:hover, .drawer-link.router-link-active {
    background: rgba(153, 204, 51, 0.1);
    color: #1A4B99;
    padding-left: 1.75rem;
}

.close-btn {
    background: rgba(26,75,153,0.05);
    border: 1px solid rgba(26,75,153,0.15);
    color: #1A4B99;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}
.close-btn:hover { background: rgba(26,75,153,0.1); }

/* Transition animation for overlay */
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.3s ease; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }

/* Footer Section */
.footer-section {
    background-color: #1A4B99;
    color: white;
}

.footer-body-text {
    color: rgba(255,255,255,0.75);
}

.footer-glow {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(153, 204, 51, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
}

.footer-icon-box {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(153, 204, 51, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    margin-top: 4px;
    border: 1px solid rgba(153, 204, 51, 0.3);
}

.footer-links, .footer-info {
    list-style: none;
    padding: 0;
    position: relative;
    z-index: 2;
}

.footer-info li {
    margin-bottom: 1.2rem;
    font-size: 0.95rem;
    display: flex;
    align-items: flex-start;
}

.footer-links li {
    margin-bottom: 1rem;
}

.footer-links a {
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    display: inline-block;
}

.footer-links a:hover {
    color: #99CC33;
    transform: translateX(5px);
}

.footer-divider {
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
}

/* Utils */
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }

.divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #99CC33, #1A4B99);
    border-radius: 2px;
}

/* Animations */
@keyframes float {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
</style>
