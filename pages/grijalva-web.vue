<template>
    <div class="grijalva-web">
        <!-- Navbar -->
        <nav class="navbar" :class="{ 'scrolled': isScrolled }">
            <div class="container d-flex align-center justify-space-between">
                <div class="logo">
                    <span class="text-white font-weight-bold text-h5">GRIJALVA</span>
                    <span class="text-primary font-weight-bold text-h5">.</span>
                </div>
                <div class="d-none d-md-flex gap-4">
                    <a href="#hero" class="nav-link">Inicio</a>
                    <a href="#products" class="nav-link">Productos</a>
                    <a href="#services" class="nav-link">Servicios</a>
                    <a href="#contact" class="nav-link">Contacto</a>
                </div>
                <v-btn color="primary" variant="flat" class="rounded-pill px-6">Cotizar Ahora</v-btn>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="hero" class="hero-section d-flex align-center">
            <div class="hero-bg"></div>
            <div class="hero-overlay"></div>
            <div class="container position-relative z-10">
                <v-row align="center">
                    <v-col cols="12" md="7">
                        <div class="hero-content">
                            <v-chip color="primary" variant="outlined" class="mb-4 animate-fade-up"
                                style="border-color: rgba(var(--v-theme-primary), 0.5);">
                                <v-icon start icon="mdi-rocket-launch" size="small"></v-icon>
                                Innovación Industrial
                            </v-chip>
                            <h1 class="text-h2 text-md-h1 font-weight-black text-white mb-6 animate-fade-up delay-100">
                                Soluciones Integrales para la <span class="text-gradient">Industria Moderna</span>
                            </h1>
                            <p class="text-h6 text-grey-lighten-1 mb-8 animate-fade-up delay-200"
                                style="max-width: 600px; line-height: 1.6;">
                                Expertos en minería, construcción y energía. Ofrecemos tecnología de punta, suministro
                                integral y servicios especializados para potenciar su operación.
                            </p>
                            <div class="d-flex gap-4 animate-fade-up delay-300">
                                <v-btn size="x-large" color="primary" class="rounded-lg px-8 elevation-10">
                                    Explorar Servicios
                                    <v-icon end icon="mdi-arrow-right"></v-icon>
                                </v-btn>
                                <v-btn size="x-large" variant="outlined" color="white" class="rounded-lg px-8">
                                    Contáctanos
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="5" class="d-none d-md-block">
                        <!-- Abstract 3D Element Placeholder or Image -->
                        <div class="hero-visual animate-float">
                            <div class="glowing-circle"></div>
                            <!-- We can place a transparent industrial machine image here later -->
                            <v-img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
                                class="rounded-xl elevation-24" cover aspect-ratio="1"></v-img>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </section>

        <!-- Products Section -->
        <section id="products" class="section-padding bg-dark-2">
            <div class="container">
                <div class="section-header text-center mb-16">
                    <h2 class="text-h3 font-weight-bold text-white mb-4">Nuestros Productos</h2>
                    <div class="divider mx-auto mb-6"></div>
                    <p class="text-grey mb-0" style="max-width: 700px; margin: 0 auto;">
                        Suministro de equipos y herramientas de alta gama para garantizar la eficiencia y seguridad en
                        cada proyecto.
                    </p>
                </div>

                <v-row>
                    <v-col cols="12" sm="6" md="3" v-for="(product, index) in products" :key="index">
                        <div class="product-card">
                            <div class="product-icon-wrapper">
                                <v-icon :icon="product.icon" size="32" color="primary"></v-icon>
                            </div>
                            <h3 class="text-h6 font-weight-bold text-white mb-2">{{ product.title }}</h3>
                            <p class="text-caption text-grey mb-4">Calidad garantizada para exigencias industriales.</p>
                            <v-btn variant="text" color="primary" class="px-0" append-icon="mdi-arrow-right">Ver
                                más</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="section-padding">
            <div class="container">
                <div class="section-header mb-16">
                    <h2 class="text-h3 font-weight-bold text-white mb-4">Servicios Especializados</h2>
                    <div class="divider mb-6"></div>
                </div>

                <div class="d-flex flex-column flex-md-row gap-8">
                    <!-- Services Menu -->
                    <div class="services-menu" style="min-width: 300px;">
                        <div v-for="(service, index) in services" :key="index" class="service-menu-item"
                            :class="{ active: activeService === index }" @click="activeService = index">
                            <div class="d-flex align-center justify-space-between w-100">
                                <span class="font-weight-medium">{{ service.title }}</span>
                                <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                            </div>
                        </div>
                    </div>

                    <!-- Service Content -->
                    <div class="service-content-wrapper flex-grow-1">
                        <v-window v-model="activeService">
                            <v-window-item v-for="(service, index) in services" :key="index" :value="index">
                                <div class="service-detail-card animate-fade-in">
                                    <v-img :src="service.image" height="300" cover
                                        class="rounded-lg mb-6 service-hero-img">
                                        <div class="fill-height d-flex align-end p-gradient">
                                            <h3 class="text-h4 font-weight-bold text-white pa-6">{{ service.title }}
                                            </h3>
                                        </div>
                                    </v-img>

                                    <h4 class="text-h6 font-weight-bold text-primary mb-4">Sub Servicios</h4>
                                    <v-row>
                                        <v-col cols="12" md="6" v-for="(sub, sIndex) in service.subServices"
                                            :key="sIndex">
                                            <div class="sub-service-item d-flex align-start">
                                                <v-icon icon="mdi-check-circle-outline" color="primary"
                                                    class="mt-1 mr-3"></v-icon>
                                                <div>
                                                    <div class="font-weight-bold text-white">{{ sub.name }}</div>
                                                    <div class="text-caption text-grey">{{ sub.desc }}</div>
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-window-item>
                        </v-window>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer-section bg-dark-2 pt-16 pb-8">
            <div class="container">
                <v-row>
                    <v-col cols="12" md="4">
                        <h2 class="text-h5 font-weight-bold text-white mb-6">GRIJALVA<span class="text-primary">.</span>
                        </h2>
                        <p class="text-grey mb-6">
                            Comprometidos con la excelencia y la innovación en el sector industrial peruano.
                        </p>
                        <div class="d-flex gap-4">
                            <v-btn icon="mdi-facebook" variant="text" color="grey"></v-btn>
                            <v-btn icon="mdi-linkedin" variant="text" color="grey"></v-btn>
                            <v-btn icon="mdi-instagram" variant="text" color="grey"></v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" md="2">
                        <h3 class="text-subtitle-1 font-weight-bold text-white mb-4">Enlaces</h3>
                        <ul class="footer-links">
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Nosotros</a></li>
                            <li><a href="#">Proyectos</a></li>
                            <li><a href="#">Sostenibilidad</a></li>
                        </ul>
                    </v-col>
                    <v-col cols="12" md="2">
                        <h3 class="text-subtitle-1 font-weight-bold text-white mb-4">Legal</h3>
                        <ul class="footer-links">
                            <li><a href="#">Privacidad</a></li>
                            <li><a href="#">Términos</a></li>
                            <li><a href="#">Cookies</a></li>
                        </ul>
                    </v-col>
                    <v-col cols="12" md="4">
                        <h3 class="text-subtitle-1 font-weight-bold text-white mb-4">Suscríbete</h3>
                        <div class="d-flex">
                            <input type="email" placeholder="Tu correo electrónico" class="newsletter-input">
                            <button class="newsletter-btn"><v-icon icon="mdi-send"></v-icon></button>
                        </div>
                    </v-col>
                </v-row>
                <v-divider class="my-8 border-opacity-10"></v-divider>
                <div class="text-center text-caption text-grey">
                    &copy; {{ new Date().getFullYear() }} Grijalba. Todos los derechos reservados.
                </div>
            </div>
        </footer>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const activeService = ref(0)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const products = [
    { title: 'Suministro Integral', icon: 'mdi-package-variant-closed' },
    { title: 'Herramientas Industriales', icon: 'mdi-tools' },
    { title: 'Equipos de Lubricación', icon: 'mdi-oil' },
    { title: 'Seguridad Industrial', icon: 'mdi-hard-hat' },
    { title: 'Equipos de Limpieza', icon: 'mdi-vacuum' },
    { title: 'Lubricantes', icon: 'mdi-barrel' },
    { title: 'Mantenimiento', icon: 'mdi-wrench-cog' },
    { title: 'Compresoras', icon: 'mdi-air-filter' },
]

const services = [
    {
        title: 'Construcción',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000',
        subServices: [
            { name: 'Construcción Modular', desc: 'Rapi-modulos, oficinas multi uso, campamentos' },
            { name: 'Construcción Civil', desc: 'Construcción de edificios' },
            { name: 'Ejecución de Servicios', desc: 'Construcción especializado, montajes' },
            { name: 'Servicios Generales', desc: 'Mantenimiento integral' },
        ]
    },
    {
        title: 'Fabricación y Montaje Metalmecánica',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000',
        subServices: [
            { name: 'Casetas protección tormentas', desc: 'Estructuras resistentes a condiciones extremas' },
            { name: 'Casetas protección acústica', desc: 'Aislamiento de ruido industrial' },
            { name: 'Proyectos a medida', desc: 'Diseño y fabricación personalizada' },
        ]
    },
    {
        title: 'Mantenimiento Eléctrico',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000',
        subServices: [
            { name: 'Infraestructura Eléctrica', desc: 'Implementación de redes' },
            { name: 'Equipos Especializados', desc: 'Instalación y configuración' },
            { name: 'Sistema PAT', desc: 'Mantenimientos de sistema de protección a tierra' },
        ]
    },
    {
        title: 'Arrendamiento - Renting',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000',
        subServices: [
            { name: 'Unidades Especializadas', desc: 'Flota operativa diversa' },
            { name: 'Línea Amarilla', desc: 'Maquinaria pesada para construcción' },
        ]
    },
    {
        title: 'Infraestructura TI',
        image: 'https://images.unsplash.com/photo-1558494949-efc52728101c?auto=format&fit=crop&q=80&w=1000',
        subServices: [
            { name: 'Infraestructura de Red', desc: 'Cableado estructurado y networking' },
            { name: 'Equipos Especializados', desc: 'Mantenimiento de hardware crítico' },
            { name: 'Circuito Cerrado', desc: 'Instalación de sistemas CCTV' },
        ]
    }
]
</script>

<style scoped>
/* Base Styles */
.grijalva-web {
    background-color: #0F1115;
    color: #E2E8F0;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
}

.text-gradient {
    background: linear-gradient(135deg, #FF3D00 0%, #FF9100 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.bg-dark-2 {
    background-color: #161B22;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.section-padding {
    padding: 6rem 0;
}

/* Navbar */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem 0;
    z-index: 1000;
    transition: all 0.3s ease;
}

.navbar.scrolled {
    background: rgba(15, 17, 21, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-link {
    color: #94A3B8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

.nav-link:hover {
    color: white;
}

/* Hero Section */
.hero-section {
    min-height: 100vh;
    position: relative;
    padding-top: 80px;
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 30%, rgba(255, 61, 0, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 10% 80%, rgba(33, 150, 243, 0.1) 0%, transparent 40%);
    z-index: 1;
}

.hero-visual {
    position: relative;
}

.glowing-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 61, 0, 0.2) 0%, transparent 70%);
    z-index: -1;
    animation: pulse-glow 4s infinite alternate;
}

/* Products */
.product-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s ease;
    height: 100%;
}

.product-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 61, 0, 0.5);
}

.product-icon-wrapper {
    width: 60px;
    height: 60px;
    background: rgba(255, 61, 0, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
}

/* Services */
.services-menu {
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    padding-right: 1rem;
}

.service-menu-item {
    padding: 1.25rem 1.5rem;
    cursor: pointer;
    border-left: 3px solid transparent;
    color: #94A3B8;
    transition: all 0.2s;
    border-radius: 0 8px 8px 0;
}

.service-menu-item:hover {
    background: rgba(255, 255, 255, 0.03);
    color: white;
}

.service-menu-item.active {
    background: linear-gradient(90deg, rgba(255, 61, 0, 0.1) 0%, transparent 100%);
    border-left-color: #FF3D00;
    color: white;
}

.service-detail-card {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.p-gradient {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
}

.sub-service-item {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    margin-bottom: 1rem;
    height: 100%;
}

/* Footer */
.footer-links {
    list-style: none;
    padding: 0;
}

.footer-links li {
    margin-bottom: 0.75rem;
}

.footer-links a {
    color: #94A3B8;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-links a:hover {
    color: #FF3D00;
}

.newsletter-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px 0 0 8px;
    padding: 0.75rem 1rem;
    color: white;
    flex-grow: 1;
    outline: none;
}

.newsletter-btn {
    background: #FF3D00;
    border: none;
    color: white;
    padding: 0 1.5rem;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: background 0.2s;
}

.newsletter-btn:hover {
    background: #D93200;
}

/* Utilities & Animations */
.gap-4 {
    gap: 1rem;
}

.gap-8 {
    gap: 2rem;
}

.divider {
    width: 60px;
    height: 4px;
    background: #FF3D00;
    border-radius: 2px;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-up {
    animation: fadeUp 0.8s ease-out forwards;
    opacity: 0;
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}

.delay-300 {
    animation-delay: 0.3s;
}
</style>
