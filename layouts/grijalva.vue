<template>
    <div class="grijalva-web">
        <!-- Top Bar -->
        <div class="top-bar d-flex align-center justify-center px-4 py-1">
            <span class="text-caption text-md-body-2 font-weight-bold">
                11 años brindando materiales y equipos de calidad | Servicios: 951 351 783 / Ventas: 936 542 929
            </span>
        </div>

        <!-- Navbar -->
        <nav class="navbar" :class="{ 'scrolled': isScrolled }">
            <div class="container d-flex align-center justify-space-between h-100">
                <!-- Logo -->
                <div class="logo d-flex align-center gap-2">
                    <v-icon icon="mdi-shield-check" color="green-lighten-1" size="32"></v-icon> &nbsp;
                    <div class="d-flex flex-column" style="line-height: 1;">
                        <span class="text-blue font-weight-black text-h5 tracking-wide">GRIJALVA</span>
                        <span class="text-green font-weight-bold text-caption text-end"
                            style="letter-spacing: 2px;">COMPANY</span>
                    </div>
                </div>

                <!-- Desktop Menu -->
                <div class="d-none d-md-flex align-center gap-6">
                    <NuxtLink to="/grijalva" class="nav-link" active-class="active">INICIO</NuxtLink>
                    <NuxtLink to="/grijalva/productos" class="nav-link" active-class="active">PRODUCTOS</NuxtLink>
                    <NuxtLink to="/grijalva/servicios" class="nav-link" active-class="active">SERVICIOS</NuxtLink>
                    <NuxtLink to="/grijalva/contacto" class="nav-link" active-class="active">CONTACTO</NuxtLink>
                </div>

                <!-- CTA & Mobile Toggle -->
                <div class="d-flex align-center gap-4">
                    <div class="d-none d-sm-flex align-center text-blue-darken-3 font-weight-bold">
                        <v-icon icon="mdi-email-outline" class="mr-2"></v-icon>
                        ventas@grijalvacompany.com
                    </div>
                    <v-btn icon="mdi-menu" variant="text" class="d-md-none" color="blue-darken-4"></v-btn>
                </div>
            </div>
        </nav>

        <!-- Page Content -->
        <div class="page-content">
            <slot />
        </div>

        <!-- WhatsApp Floating Button -->
        <div class="whatsapp-float">
            <div class="whatsapp-tooltip">
                Necesitas ayuda? Chatea con nosotros
            </div>
            <a href="https://wa.me/51936542929" target="_blank" class="whatsapp-btn">
                <v-icon icon="mdi-whatsapp" size="32" color="white"></v-icon>
            </a>
        </div>

        <!-- Footer -->
        <footer class="footer-section pt-16 pb-8">
            <div class="container">
                <v-row>
                    <v-col cols="12" md="4">
                        <div class="logo d-flex align-center gap-2 mb-6">
                            <v-icon icon="mdi-shield-check" color="green-lighten-1" size="32"></v-icon>
                            <div class="d-flex flex-column" style="line-height: 1;">
                                <span class="text-white font-weight-black text-h5 tracking-wide">GRIJALVA</span>
                                <span class="text-green-lighten-1 font-weight-bold text-caption text-end">COMPANY</span>
                            </div>
                        </div>
                        <p class="text-grey-lighten-1 mb-6">
                            Comprometidos con la excelencia y la innovación en el sector industrial peruano. Proveedores
                            líderes de soluciones integrales.
                        </p>
                        <div class="d-flex gap-4">
                            <v-btn icon="mdi-facebook" variant="text" color="white"></v-btn>
                            <v-btn icon="mdi-linkedin" variant="text" color="white"></v-btn>
                            <v-btn icon="mdi-instagram" variant="text" color="white"></v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" md="2">
                        <h3 class="text-subtitle-1 font-weight-bold text-white mb-4">MAPA DEL SITIO</h3>
                        <ul class="footer-links">
                            <li>
                                <NuxtLink to="/grijalva">Inicio</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/grijalva/productos">Productos</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/grijalva/servicios">Servicios</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/grijalva/contacto">Contacto</NuxtLink>
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols="12" md="3">
                        <h3 class="text-subtitle-1 font-weight-bold text-white mb-4">CONTACTO</h3>
                        <ul class="footer-links">
                            <li class="d-flex align-start gap-2">
                                <v-icon icon="mdi-map-marker" size="small" color="green-lighten-1"
                                    class="mt-1"></v-icon>
                                <span>Av. Industrial 123, Lima, Perú</span>
                            </li>
                            <li class="d-flex align-center gap-2">
                                <v-icon icon="mdi-phone" size="small" color="green-lighten-1"></v-icon>
                                <span>+51 936 542 929</span>
                            </li>
                            <li class="d-flex align-center gap-2">
                                <v-icon icon="mdi-email" size="small" color="green-lighten-1"></v-icon>
                                <span>ventas@grijalvacompany.com</span>
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols="12" md="3">
                        <h3 class="text-subtitle-1 font-weight-bold text-white mb-4">BOLETÍN</h3>
                        <div class="d-flex">
                            <input type="email" placeholder="Tu correo electrónico" class="newsletter-input">
                            <button class="newsletter-btn"><v-icon icon="mdi-send"></v-icon></button>
                        </div>
                    </v-col>
                </v-row>
                <v-divider class="my-8 border-opacity-10" color="white"></v-divider>
                <div class="text-center text-caption text-grey">
                    &copy; {{ new Date().getFullYear() }} Grijalba Company S.A.C. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

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
/* Global Styles for Grijalba Website - LIGHT THEME */
.grijalva-web {
    background-color: #FFFFFF;
    color: #333333;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
}

/* Colors from Palette */
.text-blue {
    color: #1A4B99 !important;
}

.text-green {
    color: #99CC33 !important;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.section-padding {
    padding: 6rem 0;
}

.gap-2 {
    gap: 0.5rem;
}

.gap-4 {
    gap: 1rem;
}

.gap-6 {
    gap: 1.5rem;
}

/* Top Bar */
.top-bar {
    background-color: #99CC33;
    color: white;
    font-size: 0.85rem;
    position: relative;
    z-index: 1001;
}

/* Navbar */
.navbar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-link {
    color: #1A4B99;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    transition: color 0.2s;
    position: relative;
    letter-spacing: 0.5px;
}

.nav-link:hover,
.nav-link.active {
    color: #99CC33;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #99CC33;
    border-radius: 2px;
}

/* Footer */
.footer-section {
    background-color: #1A4B99;
    color: white;
}

.footer-links {
    list-style: none;
    padding: 0;
}

.footer-links li {
    margin-bottom: 0.75rem;
}

.footer-links a {
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    transition: color 0.2s;
}

.footer-links a:hover {
    color: #99CC33;
}

.newsletter-input {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px 0 0 4px;
    padding: 0.75rem 1rem;
    color: white;
    flex-grow: 1;
    outline: none;
}

.newsletter-btn {
    background: #99CC33;
    border: none;
    color: white;
    padding: 0 1.5rem;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-weight: bold;
}

.newsletter-btn:hover {
    background: #7aaa1c;
}

/* WhatsApp Floating Button */
.whatsapp-float {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 2000;
    display: flex;
    align-items: center;
    gap: 12px;
}

.whatsapp-btn {
    width: 60px;
    height: 60px;
    background-color: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.whatsapp-btn:hover {
    transform: scale(1.1);
}

.whatsapp-tooltip {
    background: white;
    color: #333;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    animation: fadeIn 0.5s ease-out;
}

.whatsapp-tooltip::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid white;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Animations included globally in the component if needed */
</style>
