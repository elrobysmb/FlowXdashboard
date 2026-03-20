<template>
    <div class="view-container fill-height d-flex flex-column pa-4">
        <!-- HEADER -->
        <header class="d-flex align-center justify-space-between mb-4">
            <h1 class="text-h4 font-weight-bold">Configuración - {{ appName || companyId }}</h1>
        </header>

        <!-- TABS & CONTENT -->
        <div class="content-area flex-grow-1 overflow-hidden d-flex flex-column bg-surface rounded-lg elevation-1">
            <v-tabs v-model="activeTab" bg-color="surface" color="primary">
                <v-tab value="perfiles">Perfiles</v-tab>
                <v-tab value="logs">Logs</v-tab>
            </v-tabs>
            <v-divider></v-divider>

            <v-window v-model="activeTab" class="flex-grow-1 overflow-y-auto">
                <!-- PERFILES TAB -->
                <v-window-item value="perfiles" class="fill-height">
                    <div class="d-flex flex-column fill-height pa-4">
                        <div class="d-flex justify-space-between align-center mb-4">
                            <h3 class="text-h6">Gestión de Usuarios</h3>
                            <v-btn v-if="canCreateUser" color="primary" @click="showCreateUserDialog = true"
                                prepend-icon="mdi-account-plus">
                                Nuevo Usuario
                            </v-btn>
                        </div>

                        <v-data-table :headers="headers" :items="users" :loading="loading"
                            class="elevation-0 border rounded flex-grow-1" density="compact"
                            no-data-text="No se encontraron usuarios">
                            <template v-slot:item.role="{ item }">
                                <v-chip :color="getRoleColor(item.role)" size="small" class="text-capitalize">
                                    {{ item.role }}
                                </v-chip>
                            </template>
                            <template v-slot:item.created_at="{ item }">
                                {{ new Date(item.created_at).toLocaleDateString() }}
                            </template>
                        </v-data-table>
                    </div>
                </v-window-item>

                <!-- LOGS TAB -->
                <v-window-item value="logs" class="fill-height">
                    <div class="d-flex flex-column fill-height pa-4 justify-center align-center text-center">
                        <v-icon icon="mdi-file-clock-outline" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
                        <h3 class="text-h6 text-grey-darken-1">Registro de Actividad</h3>
                        <p class="text-body-2 text-grey-darken-1">Visualiza aquí el historial de acciones y cambios en
                            el
                            sistema.</p>
                        <v-alert type="info" variant="tonal" class="mt-4" max-width="400">
                            Funcionalidad de logs próximamente disponible.
                        </v-alert>
                    </div>
                </v-window-item>
            </v-window>
        </div>

        <!-- Use existing CreateUserDialog inside settings -->
        <CreateUserDialog v-model="showCreateUserDialog" :company-id="companyId" @user-created="fetchUsers" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import CreateUserDialog from './CreateUserDialog.vue'

const props = defineProps<{
    companyId: string
    appName?: string
    currentUserRole?: string // Optional, to control permission
}>()

const activeTab = ref('perfiles')
const users = ref<any[]>([])
const loading = ref(false)
const showCreateUserDialog = ref(false)

const headers = [
    { title: 'Nombre Completo', key: 'full_name' },
    { title: 'Email', key: 'email' },
    { title: 'Rol', key: 'role' },
    // { title: 'Creado', key: 'created_at' }
]

const canCreateUser = computed(() => {
    // If undefined, assume true or check internal logic. 
    // Usually passed from parent. Default to checking if role is admin/superadmin if available
    if (props.currentUserRole) {
        return props.currentUserRole === 'admin' || props.currentUserRole === 'superadmin'
    }
    return true // Default fallback
})

const getRoleColor = (role: string) => {
    switch (role) {
        case 'superadmin': return 'purple'
        case 'admin': return 'blue'
        case 'agente': return 'green'
        default: return 'grey'
    }
}

const fetchUsers = async () => {
    loading.value = true
    try {
        const { users: data } = await $fetch(`/api/users?company_id=${encodeURIComponent(props.companyId)}`)
        users.value = data || []
    } catch (e) {
        console.error('Error fetching users:', e)
    } finally {
        loading.value = false
    }
}

// Fetch users on mount
onMounted(() => {
    fetchUsers()
})

watch(activeTab, (val) => {
    if (val === 'perfiles') {
        fetchUsers()
    }
})

</script>

<style scoped>
/* Scoped styles specific to SettingsView if needed */
</style>
