<template>
  <div class="contactenos-page section-padding position-relative overflow-hidden" style="background-color: #FFFFFF;">
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>
    
    <v-container style="max-width: 1200px" class="position-relative z-10 pt-8 animate-fade-up">
      
      <v-row>
        <!-- Contact Info -->
        <v-col cols="12" md="5" class="pr-md-10">
          <v-chip variant="outlined" color="primary" class="mb-6">Atención Inmediata</v-chip>
          <h1 class="text-h3 font-weight-black mb-6 tracking-tight" style="color: #1A4B99;">Póngase en <span class="text-gradient">Contacto</span></h1>
          <p style="color: #555; line-height: 1.8; font-size: 1.05rem; margin-bottom: 2.5rem;">
            Nuestro equipo de especialistas está listo para asesorarlo y brindarle la mejor solución para su proyecto industrial. Déjenos sus datos y nos comunicaremos con usted a la brevedad.
          </p>

          <div class="contact-info-block mb-8">
            <div class="info-item d-flex align-start mb-8 pa-4 rounded-lg">
              <div class="icon-box">
                <v-icon icon="mdi-map-marker-outline" color="primary"></v-icon>
              </div>
              <div class="ml-4">
                <h4 class="font-weight-bold mb-2" style="color: #1A4B99;">Ubicaciones Físicas</h4>
                <p style="color: #555;" class="text-body-2 mb-1"><span class="text-primary font-weight-bold">Ventas:</span> Calle Neptuno Mz. A Lt.8 Alamos de Naranjal - SMP</p>
                <p style="color: #555;" class="text-body-2 mb-0"><span class="text-primary font-weight-bold">Servicios:</span> Av. Grau Mz. E Lt. 5 - Pasco</p>
              </div>
            </div>

            <div class="info-item d-flex align-start mb-8 pa-4 rounded-lg">
              <div class="icon-box">
                <v-icon icon="mdi-phone-outline" color="primary"></v-icon>
              </div>
              <div class="ml-4">
                <h4 class="font-weight-bold mb-2" style="color: #1A4B99;">Líneas Directas</h4>
                <p style="color: #555;" class="text-body-2 mb-1"><span class="text-primary font-weight-bold">Servicios:</span> 951 351 783</p>
                <p style="color: #555;" class="text-body-2 mb-0"><span class="text-primary font-weight-bold">Ventas:</span> 936 542 929</p>
              </div>
            </div>

            <div class="info-item d-flex align-start pa-4 rounded-lg">
              <div class="icon-box">
                <v-icon icon="mdi-clock-outline" color="primary"></v-icon>
              </div>
              <div class="ml-4">
                <h4 class="font-weight-bold mb-2" style="color: #1A4B99;">Horarios de Atención</h4>
                <p style="color: #555;" class="text-body-2 mb-1">Lunes a Viernes: 8:00am - 1:00pm / 2:00pm - 5:00pm</p>
                <p style="color: #555;" class="text-body-2 mb-0">Sábados: 8:00am - 1:00pm</p>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Form Section -->
        <v-col cols="12" md="7">
          <v-card class="contact-form-card pa-8 pa-md-10 rounded-xl position-relative overflow-hidden" elevation="0">
            <div class="card-glow"></div>
            
            <div class="position-relative z-10">
              <h3 class="text-h4 font-weight-black mb-8 tracking-tight" style="color: #1A4B99;">Envíenos su consulta</h3>
              
              <v-alert v-if="submitSuccess" type="success" variant="tonal" class="mb-6 rounded-lg font-weight-medium">
                Su mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.
              </v-alert>

              <!-- Marcas Swiper above form -->
              <div class="marquee-container mb-8">
                <div class="marquee-content d-flex align-center">
                  <div class="marca-item px-6" v-for="marca in marcas" :key="marca">
                    <span class="text-h6 font-weight-black text-grey-darken-1">{{ marca }}</span>
                  </div>
                  <div class="marca-item px-6" v-for="marca in marcas" :key="marca+'-dup'">
                    <span class="text-h6 font-weight-black text-grey-darken-1">{{ marca }}</span>
                  </div>
                </div>
              </div>

              <v-form @submit.prevent="handleSubmit" ref="formRef" v-if="!submitSuccess">
                <v-row>
                  <v-col cols="12" sm="6" class="pb-2">
                    <div class="text-subtitle-2 font-weight-bold mb-2" style="color: #1A4B99;">Nombres *</div>
                    <v-text-field 
                      v-model="form.nombres" 
                      placeholder="Ej. Juan" 
                      variant="solo-filled" 
                      bg-color="rgba(26,75,153,0.04)"
                      class="light-input"
                      :rules="[v => !!v || 'Requerido']"
                      flat
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="pb-2">
                    <div class="text-subtitle-2 font-weight-bold mb-2" style="color: #1A4B99;">Apellidos *</div>
                    <v-text-field 
                      v-model="form.apellidos" 
                      placeholder="Ej. Pérez" 
                      variant="solo-filled" 
                      bg-color="rgba(255,255,255,0.03)"
                      class="futuristic-input"
                      :rules="[v => !!v || 'Requerido']"
                      flat
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="pb-2">
                    <div class="text-subtitle-2 font-weight-bold mb-2" style="color: #1A4B99;">Email *</div>
                    <v-text-field 
                      v-model="form.email" 
                      placeholder="ejemplo@empresa.com" 
                      variant="solo-filled" 
                      bg-color="rgba(255,255,255,0.03)"
                      class="futuristic-input"
                      :rules="[
                        v => !!v || 'Requerido',
                        v => /.+@.+\..+/.test(v) || 'Email debe ser válido'
                      ]"
                      flat
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="pb-2">
                    <div class="text-subtitle-2 font-weight-bold mb-2" style="color: #1A4B99;">Teléfono</div>
                    <v-text-field 
                      v-model="form.telefono" 
                      placeholder="Ej. 987654321" 
                      variant="solo-filled" 
                      bg-color="rgba(255,255,255,0.03)"
                      class="futuristic-input"
                      flat
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="pb-2">
                    <div class="text-subtitle-2 font-weight-bold mb-2" style="color: #1A4B99;">Mensaje / Requerimiento *</div>
                    <v-textarea 
                      v-model="form.message" 
                      placeholder="Escriba aquí los detalles de su requerimiento o consulta..." 
                      variant="solo-filled" 
                      bg-color="rgba(255,255,255,0.03)"
                      class="futuristic-input"
                      rows="4"
                      :rules="[v => !!v || 'Requerido']"
                      flat
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-btn type="submit" class="premium-btn mt-6 w-100" size="x-large" :loading="isSubmitting">
                  Enviar Mensaje
                  <v-icon end icon="mdi-send-outline" class="ml-2"></v-icon>
                </v-btn>
              </v-form>
            </div>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'commercial'
})

const formRef = ref()
const isSubmitting = ref(false)
const submitSuccess = ref(false)

const form = ref({
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  message: ''
})

const marcas = [
  'SCHULZ', 'BOSCH', 'MAKITA', 'DEWALT', 'SKF', 'TIMKEN', 'LINCOLN', 'GRACO', '3M', 'MSA', 'STEELPRO', 'CAT'
]

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  
  if (!valid) return

  isSubmitting.value = true

  // PREPARED FOR N8N WEBHOOK
  const payload = {
    source: 'Grijalva Commercial Web',
    timestamp: new Date().toISOString(),
    leadData: { ...form.value }
  }
  console.log('✅ [Lead Generator] Payload Emitido para Webhook HTTP:', JSON.stringify(payload, null, 2))

  setTimeout(() => {
    isSubmitting.value = false
    submitSuccess.value = true
    formRef.value?.reset()
  }, 1000)
}
</script>

<style scoped>
:root {
  --v-dark-navy: #040D1A;
}

.bg-dark-2 { background-color: #F8F9FA !important; }
.tracking-tight { letter-spacing: -0.025em; }

.ambient-glow {
    position: absolute;
    filter: blur(100px);
    border-radius: 50%;
    opacity: 0.2;
    pointer-events: none;
    z-index: 0;
}

.glow-1 {
    top: 20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: #99CC33;
}

.glow-2 {
    bottom: -10%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: #1A4B99;
}

.contact-form-card {
    background: #FFFFFF;
    border: 1px solid rgba(26, 75, 153, 0.1);
    box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important;
}

.card-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(153, 204, 51, 0.04) 0%, transparent 60%);
    pointer-events: none;
}

.info-item {
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.info-item:hover {
    background: rgba(26, 75, 153, 0.04);
    border-color: rgba(26, 75, 153, 0.1);
    transform: translateX(5px);
}

.icon-box {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(153, 204, 51, 0.1) 0%, rgba(26, 75, 153, 0.1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(153, 204, 51, 0.25);
}

.light-input :deep(.v-field) {
    border-radius: 12px;
    color: #333;
    transition: all 0.3s ease;
    border: 1px solid rgba(26,75,153,0.15) !important;
}

.light-input :deep(.v-field--focused) {
    background-color: rgba(153, 204, 51, 0.03) !important;
    box-shadow: 0 0 0 2px rgba(153, 204, 51, 0.3) !important;
}

.light-input :deep(.v-field__input) {
    padding-top: 14px;
    padding-bottom: 14px;
}

/* Marquee Swiper for form */
.marquee-container {
    width: 100%;
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}
.marquee-content {
    width: max-content;
    animation: scroll 20s linear infinite;
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
}
</style>
