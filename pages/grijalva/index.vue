<template>
    <div class="grijalva-home">
        <!-- Hero Section -->
        <section id="hero" class="hero-section d-flex align-center">
            <div class="hero-bg"></div>
            <div class="hero-overlay"></div>
            <div class="container position-relative z-10">
                <v-row align="center">
                    <v-col cols="12" md="7">
                        <div class="hero-content">
                            <v-chip color="green-lighten-1" variant="flat"
                                class="mb-6 animate-fade-up text-white font-weight-bold">
                                <v-icon start icon="mdi-shield-check" size="small"></v-icon>
                                CALIDAD Y GARANTÍA
                            </v-chip>
                            <h1 class="text-h2 text-md-h1 font-weight-black text-white mb-6 animate-fade-up delay-100"
                                style="line-height: 1.1;">
                                Equipos de <br>
                                <span class="text-green-lighten-1">Protección Industrial</span>
                            </h1>
                            <p class="text-h6 text-grey-lighten-3 mb-8 animate-fade-up delay-200 font-weight-light"
                                style="max-width: 600px; line-height: 1.6;">
                                Suministro integral, herramientas y servicios especializados para minería y
                                construcción. La mejor tecnología al servicio de su seguridad.
                            </p>
                            <div class="d-flex gap-4 animate-fade-up delay-300">
                                <v-btn size="x-large" color="green-lighten-1"
                                    class="rounded px-8 elevation-4 text-white font-weight-bold"
                                    to="/grijalva/productos">
                                    VER PRODUCTOS
                                    <v-icon end icon="mdi-arrow-right"></v-icon>
                                </v-btn>
                                <v-btn size="x-large" variant="outlined" color="white"
                                    class="rounded px-8 font-weight-bold" to="/grijalva/contacto">
                                    CONTÁCTENOS
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="5" class="d-none d-md-block">
                        <!-- Hero Image Placeholder - can be replaced with the helmet image from screenshot -->
                    </v-col>
                </v-row>
            </div>
        </section>

        <!-- Features / Info Section -->
        <section class="section-padding bg-white">
            <div class="container">
                <v-row>
                    <v-col cols="12" md="4" v-for="(feature, i) in features" :key="i">
                        <div class="feature-card text-center pa-8 elevation-2">
                            <div class="icon-circle mb-6 mx-auto">
                                <v-icon :icon="feature.icon" size="40" color="white"></v-icon>
                            </div>
                            <h3 class="text-h5 font-weight-bold text-blue-darken-4 mb-3">{{ feature.title }}</h3>
                            <p class="text-grey-darken-1">{{ feature.desc }}</p>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'grijalva'
})

const features = [
    { title: 'Suministro Integral', desc: 'Abastecimiento completo para grandes proyectos industriales.', icon: 'mdi-package-variant-closed' },
    { title: 'Servicios Generales', desc: 'Mantenimiento, construcción y soporte técnico especializado.', icon: 'mdi-cog-outline' },
    { title: 'Marcas Líderes', desc: 'Distribuidores autorizados de las mejores marcas del mercado.', icon: 'mdi-medal' }
]
</script>

<style scoped>
.hero-section {
    min-height: 85vh;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #0D2035;
    /* Dark Blue fallback */
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Gradient approximation of the screenshot's dark blue background */
    background: linear-gradient(135deg, #1E56A0 0%, #0D2035 100%);
    z-index: 1;
}

/* Optional: Add an image background here if available using v-img or css url() */
/* .hero-bg { background-image: url('...'); background-size: cover; } */

.text-blue-darken-4 {
    color: #1E56A0 !important;
}

.text-green-lighten-1 {
    color: #9ACA3C !important;
}

.feature-card {
    background: white;
    border-radius: 8px;
    transition: transform 0.3s;
    border-bottom: 4px solid transparent;
}

.feature-card:hover {
    transform: translateY(-10px);
    border-bottom-color: #9ACA3C;
}

.icon-circle {
    width: 80px;
    height: 80px;
    background: #1E56A0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(30, 86, 160, 0.3);
}
</style>
