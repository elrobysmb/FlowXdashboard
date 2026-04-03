<template>
    <div class="admin-hub-container">
        <div class="content-wrapper">
            <div class="user-profile">
                <v-avatar size="120" class="profile-avatar">
                    <v-img :src="userAvatar" :alt="userName"></v-img>
                </v-avatar>
                <h1 class="user-name">{{ userName }}</h1>
                <p class="user-email text-primary">{{ userEmail }}</p>
            </div>

            <div class="dashboards-grid">
                <h3 class="text-h5 text-center mb-6 font-weight-bold text-white">Portales Disponibles</h3>
                <v-row class="ma-0">
                    <v-col v-for="d in availableDashboardsWithLogos" :key="d.path" cols="12" sm="6">
                        <v-card class="dashboard-card" @click="navigateToDashboard(d)" elevation="10">
                            <div class="card-bg"></div>
                            <div class="d-flex align-center pa-6 position-relative z-10">
                                <v-avatar size="56" class="mr-4 dashboard-avatar bg-white">
                                    <v-img :src="d.logoUrl" cover v-if="d.logoUrl"></v-img>
                                    <v-icon v-else :icon="d.icon" color="primary" size="32"></v-icon>
                                </v-avatar>
                                <div>
                                    <h3 class="text-h6 font-weight-bold mb-1 text-white">{{ d.name }}</h3>
                                    <div class="d-flex align-center text-primary text-caption font-weight-bold">
                                        INGRESAR <v-icon icon="mdi-arrow-right" size="14" class="ml-1"></v-icon>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { dashboards } from '@/utils/permissions'

definePageMeta({
    middleware: 'auth-dashboard'
})

interface UserSession {
    id: string
    email: string
    full_name: string
    role: string
}

const userSession = useCookie<UserSession | null>('dashboard_session')
const router = useRouter()

const userName = computed(() => userSession.value?.full_name || 'Admin')
const userEmail = computed(() => userSession.value?.email || '')
const userAvatar = computed(() => 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userName.value) + '&background=10B981&color=fff')

// Dynamic Asset Loading using Vite's glob import
const logos = import.meta.glob('@/assets/img/*.(png|jpg|jpeg|svg)', { eager: true, as: 'url' })

const availableDashboardsWithLogos = computed(() => {
    return dashboards.map(d => {
        const logoKey = Object.keys(logos).find(key => key.includes(d.logo!))
        const logoUrl = logoKey ? logos[logoKey] : ''
        return {
            ...d,
            logoUrl
        }
    })
})

function navigateToDashboard(dashboard: any) {
    if (dashboard && dashboard.path) {
        router.push(dashboard.path)
    }
}
</script>

<style scoped>
.admin-hub-container {
    min-height: 100vh;
    width: 100%;
    background: radial-gradient(circle at top right, #0F172A 0%, #000000 100%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    padding: 2rem 0;
}

.content-wrapper {
    max-width: 800px;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
}

.user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    animation: fadeInDown 0.8s ease-out;
}

.profile-avatar {
    border: 4px solid rgba(16, 185, 129, 0.3);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}

.user-name {
    font-size: 2.2rem;
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.5px;
}

.user-email {
    font-size: 1rem;
    margin: 0;
    opacity: 0.9;
}

.text-primary {
    color: #10B981 !important;
}

.dashboards-grid {
    width: 100%;
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.dashboard-card {
    background: rgba(30, 41, 59, 0.4) !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    backdrop-filter: blur(10px);
}

.card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.1) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
}

.dashboard-card:hover {
    transform: translateY(-8px);
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.2) !important;
}

.dashboard-card:hover .card-bg {
    opacity: 1;
}

.dashboard-avatar {
    border: 2px solid rgba(16, 185, 129, 0.2);
    padding: 4px;
    transition: transform 0.4s ease;
}

.dashboard-card:hover .dashboard-avatar {
    transform: scale(1.1) rotate(5deg);
    border-color: #10B981;
}

@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
