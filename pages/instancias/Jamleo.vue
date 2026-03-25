<template>
  <div class="dashboard-container">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo" style="gap: 0.5rem; flex-direction: column;">
          <div style="width: 100%; display: flex; justify-content: center; align-items: center; background: white; padding: 6px; border-radius: 12px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
            <img src="@/assets/img/Jamleo SAC LOGO.jpeg" alt="Jamleo SAC"
              style="width: 100%; height: auto; max-height: 65px; object-fit: contain; border-radius: 6px;" />
          </div>

          <template v-if="isSuperAdmin(currentUser)">
            <v-menu v-model="showDashboardMenu">
              <template v-slot:activator="{ props }">
                <div v-bind="props"
                  style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; justify-content: center; margin-top: 5px;">
                  <v-icon icon="mdi-menu-down" size="small" color="black" />
                </div>
              </template>
              <v-list density="compact" class="dashboard-switcher-menu">
                <v-list-item v-for="d in dashboards" :key="d.path" @click="navigateTo(d.path)" :value="d.path">
                  <template v-slot:prepend><v-icon :icon="d.icon"></v-icon></template>
                  <v-list-item-title>{{ d.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </div>
      </div>

      <nav class="sidebar-nav">
        <!-- Main Modules -->
        <div class="nav-section">
          <div class="nav-label">MÓDULOS PRINCIPALES</div>
          <button :class="['nav-item', { active: currentView === 'dashboard' }]" @click="currentView = 'dashboard'">
            <v-icon icon="mdi-view-dashboard-outline" size="20"></v-icon>
            <span>Panel Principal</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'drivers' }]" @click="currentView = 'drivers'">
            <v-icon icon="mdi-card-account-details-outline" size="20"></v-icon>
            <span>Control Documental</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'operations' }]" @click="currentView = 'operations'">
            <v-icon icon="mdi-map-marker-path" size="20"></v-icon>
            <span>Operaciones y Flota</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'maintenance' }]" @click="currentView = 'maintenance'">
            <v-icon icon="mdi-fuel" size="20"></v-icon>
            <span>Combustible y Mto.</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'shifts' }]" @click="currentView = 'shifts'">
            <v-icon icon="mdi-calendar-clock" size="20"></v-icon>
            <span>Tareo y Guardias</span>
          </button>
        </div>

        <!-- System -->
        <div class="nav-section mt-auto">
          <div class="nav-label">SISTEMA</div>
          <button class="nav-item" style="justify-content: space-between;">
            <div style="display:flex; gap:0.875rem; align-items:center;">
              <v-icon icon="mdi-moon-waning-crescent" size="20"></v-icon>
              <span>Modo oscuro</span>
            </div>
            <v-switch density="compact" hide-details inset color="primary"></v-switch>
          </button>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile">
          <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="User" class="user-avatar" />
          <div class="user-info">
            <span class="user-name">{{ currentUser?.full_name || currentUser?.email || 'Admin Jamleo' }}</span>
            <span class="user-role" style="text-transform: capitalize;">{{ currentUser?.role || 'Admin' }}</span>
          </div>
        </div>
        <button class="nav-item" style="margin-top: 5px;" @click="handleLogout">
          <v-icon icon="mdi-logout" size="20"></v-icon>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <!-- Top Header -->
      <div class="top-header">
        <h1 class="page-title">{{ viewTitle }}</h1>
        <div class="time-filter">
          <v-icon icon="mdi-clock-outline" size="16"></v-icon>
          <span>Guardia Actual: </span>
          <span style="font-weight: 600; color: #111827;">{{ activeGuardName }}</span>
          <v-icon icon="mdi-chevron-down" size="16"></v-icon>
        </div>
        <div class="time-filter ml-4">
          <v-icon icon="mdi-calendar-range" size="16"></v-icon>
          <span>Periodo: </span>
          <span style="font-weight: 600; color: #111827;">Hoy</span>
          <v-icon icon="mdi-chevron-down" size="16"></v-icon>
        </div>
      </div>

      <!-- Views -->
      
      <!-- 1. DASHBOARD OVERVIEW -->
      <div v-if="currentView === 'dashboard'" class="view-container animate-fade-in">
        <div class="stats-row mb-6">
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-dump-truck" color="primary" /> <span>Volquetes Operativos</span></div>
            <div class="stat-value text-primary">13 / 13</div>
            <div class="text-caption text-success mt-2"><v-icon icon="mdi-trending-up" size="14"/> Diurnos: 10 | Nocturnos: 3</div>
          </div>
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-alert-circle" color="warning" /> <span>Alertas de Licencias</span></div>
            <div class="stat-value text-warning">{{ upcomingExpirations }}</div>
            <div class="text-caption text-grey mt-2">Vencen en los próximos 10 días</div>
          </div>
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-chart-line" color="success" /> <span>Material Trasladado</span></div>
            <div class="stat-value text-success">1,450 TN</div>
            <div class="text-caption text-grey mt-2">D: 900 TN | M: 550 TN</div>
          </div>
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-gas-station" color="error" /> <span>Desvío Combustible</span></div>
            <div class="stat-value text-error">1.2%</div>
            <div class="text-caption text-grey mt-2">Vs SAP Titular Minero</div>
          </div>
        </div>
        <div class="two-column-grid mb-8">
            <div class="chart-card">
              <div class="chart-header">
                <h2 class="chart-title">Producción Diaria (TN)</h2>
              </div>
              <client-only>
                <apexchart type="area" height="300" :options="productionChartOptions" :series="productionChartSeries"></apexchart>
              </client-only>
            </div>
            <div class="chart-card">
              <div class="chart-header">
                <h2 class="chart-title">Consumo de Combustible vs SAP</h2>
              </div>
              <client-only>
                <apexchart type="bar" height="300" :options="fuelChartOptions" :series="fuelChartSeries"></apexchart>
              </client-only>
            </div>
        </div>
      </div>

      <!-- 2. CONTROL DOCUMENTAL (Drivers) -->
      <div v-if="currentView === 'drivers'" class="view-container animate-fade-in">
         <div class="filters-bar">
          <div class="search-box">
            <v-icon icon="mdi-magnify" color="grey"></v-icon>
            <input type="text" v-model="driverSearch" placeholder="Buscar chofer..." />
          </div>
          <v-btn color="warning" prepend-icon="mdi-bell-alert" variant="tonal">Alertas ({{upcomingExpirations}})</v-btn>
          <v-btn color="primary" prepend-icon="mdi-account-plus">Registrar Chofer</v-btn>
        </div>
        
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Chofer ({{filteredDrivers.length}})</th>
                <th>DNI</th>
                <th>Licencia MTC</th>
                <th>Venc. MTC</th>
                <th>Licencia Interna (Mina)</th>
                <th>Venc. Interna</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="driver in filteredDrivers" :key="driver.id" :class="{'bg-red-lighten-5': getDaysUntil(driver.mtc_exp) < 10 || getDaysUntil(driver.internal_exp) < 10}">
                <td>
                  <div class="d-flex align-center font-weight-bold">
                    <v-avatar size="32" class="mr-3" color="primary">
                      {{ driver.name.charAt(0) }}
                    </v-avatar>
                    {{ driver.name }}
                  </div>
                </td>
                <td>{{ driver.dni }}</td>
                <td class="text-uppercase text-grey-darken-2">{{ driver.mtc_cat }}</td>
                <td>
                  <v-chip size="small" :color="getExpColor(driver.mtc_exp)" variant="flat" class="font-weight-bold text-white">
                    {{ formatDate(driver.mtc_exp) }}
                  </v-chip>
                </td>
                <td><v-icon icon="mdi-check-circle" color="success" size="small" class="mr-1"></v-icon>  {{ driver.internal_id }}</td>
                <td>
                  <v-chip size="small" :color="getExpColor(driver.internal_exp)" variant="flat" class="font-weight-bold text-white">
                     {{ formatDate(driver.internal_exp) }}
                  </v-chip>
                </td>
                <td>
                   <v-chip size="x-small" :color="getDaysUntil(driver.mtc_exp) < 0 || getDaysUntil(driver.internal_exp) < 0 ? 'error' : 'success'">
                      {{ getDaysUntil(driver.mtc_exp) < 0 || getDaysUntil(driver.internal_exp) < 0 ? 'Suspendido' : 'Habilitado' }}
                   </v-chip>
                </td>
                 <td>
                  <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 3. GESTIÓN DE OPERACIONES Y FLOTA (Operations) -->
      <div v-if="currentView === 'operations'" class="view-container animate-fade-in">
        <div class="d-flex justify-space-between align-center mb-6">
            <h2 class="text-h5 font-weight-bold">Asignación de Rutas y Tareas</h2>
            <v-btn color="primary" prepend-icon="mdi-plus">Nueva Asignación</v-btn>
        </div>

        <div class="two-column-grid">
           <!-- Route Assignments Kanban style -->
           <div class="chart-card" style="background: transparent; border: none; box-shadow: none; padding: 0;">
              <h3 class="text-h6 font-weight-bold mb-4">Rutas Activas (Desmonte)</h3>
              <div v-for="route in operationsData.desmonte" :key="route.id" class="op-card mb-4 pa-4 elevation-1 rounded-lg bg-white border-l-4" style="border-left-color: #3b82f6 !important;">
                 <div class="d-flex justify-space-between mb-2">
                    <span class="font-weight-bold text-h6">{{ route.truck }}</span>
                    <v-chip size="small" color="blue" variant="tonal">Desmonte</v-chip>
                 </div>
                 <div class="mb-3">
                   <div class="text-caption text-grey">Ruta</div>
                   <div class="d-flex align-center font-weight-medium">
                     {{ route.origin }} <v-icon icon="mdi-arrow-right" class="mx-2" size="small" color="grey"></v-icon> {{ route.destination }}
                   </div>
                 </div>
                 <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                       <v-avatar size="24" color="grey-lighten-2" class="mr-2 text-caption font-weight-bold">{{ route.driver.charAt(0) }}</v-avatar>
                       <span class="text-caption">{{ route.driver }}</span>
                    </div>
                    <span class="text-caption font-weight-bold">{{ route.trips }} Viajes Hoy</span>
                 </div>
              </div>
           </div>

           <div class="chart-card" style="background: transparent; border: none; box-shadow: none; padding: 0;">
              <h3 class="text-h6 font-weight-bold mb-4">Rutas Activas (Mineral)</h3>
              <div v-for="route in operationsData.mineral" :key="route.id" class="op-card mb-4 pa-4 elevation-1 rounded-lg bg-white border-l-4" style="border-left-color: #10b981 !important;">
                 <div class="d-flex justify-space-between mb-2">
                    <span class="font-weight-bold text-h6">{{ route.truck }}</span>
                    <v-chip size="small" color="green" variant="tonal">Mineral Acopio</v-chip>
                 </div>
                 <div class="mb-3">
                   <div class="text-caption text-grey">Ruta</div>
                   <div class="d-flex align-center font-weight-medium">
                     {{ route.origin }} <v-icon icon="mdi-arrow-right" class="mx-2" size="small" color="grey"></v-icon> {{ route.destination }}
                   </div>
                 </div>
                 <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                       <v-avatar size="24" color="grey-lighten-2" class="mr-2 text-caption font-weight-bold">{{ route.driver.charAt(0) }}</v-avatar>
                       <span class="text-caption">{{ route.driver }}</span>
                    </div>
                    <span class="text-caption font-weight-bold">{{ route.trips }} Viajes Hoy</span>
                 </div>
              </div>
           </div>
        </div>

        <!-- Latest Transport Logs -->
        <h3 class="text-h6 font-weight-bold mb-4 mt-8">Registro de Traslado de Materiales</h3>
        <div class="table-card">
           <table class="data-table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Volquete</th>
                <th>Chofer</th>
                <th>Material</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Tonelaje</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in operationsLogs" :key="log.id">
                 <td>{{ log.time }}</td>
                 <td class="font-weight-bold text-primary">{{ log.truck }}</td>
                 <td>{{ log.driver }}</td>
                 <td>
                    <v-chip size="x-small" :color="log.material === 'Desmonte' ? 'blue' : 'emerald'" variant="flat" class="text-white">
                       {{ log.material }}
                    </v-chip>
                 </td>
                 <td>{{ log.origin }}</td>
                 <td>{{ log.destination }}</td>
                 <td class="font-weight-bold text-right">{{ log.tonnage }} TN</td>
              </tr>
            </tbody>
           </table>
        </div>
      </div>

      <!-- 4. MANTENIMIENTO, COMBUSTIBLE, NEUMÁTICOS -->
      <div v-if="currentView === 'maintenance'" class="view-container animate-fade-in">
        
        <!-- Horómetro IA Validation -->
        <div class="chart-card mb-8">
           <div class="chart-header">
             <h2 class="chart-title"><v-icon icon="mdi-robot-outline" class="mr-2"/> IA de Validación de Horómetro</h2>
           </div>
           <div class="d-flex gap-4 p-4 align-start">
              <div class="flex-1 dropzone d-flex flex-column align-center justify-center bg-grey-lighten-4 rounded-lg border-dashed border-2 p-8 text-center" style="cursor: pointer; min-height: 200px;">
                 <v-icon icon="mdi-camera" size="40" color="grey"></v-icon>
                 <div class="text-subtitle-1 mt-2 font-weight-medium">Subir foto del horómetro</div>
                 <div class="text-caption text-grey">Para evitar errores de digitación, sube la foto del panel.</div>
                 <v-btn class="mt-4" color="primary" variant="tonal" @click="simulateAI">Validar con IA</v-btn>
              </div>
              
              <div class="flex-1 ai-results pa-6 rounded-lg bg-white border" style="min-height: 200px;">
                 <div v-if="!aiValidated" class="d-flex flex-column align-center justify-center h-100 text-grey">
                    Esperando imagen...
                 </div>
                 <div v-else class="animate-fade-in">
                    <h4 class="text-success font-weight-bold mb-4 d-flex align-center">
                       <v-icon icon="mdi-check-circle" class="mr-2"></v-icon> Lectura Exitosa
                    </h4>
                    <div class="d-flex justify-space-between mb-2 pb-2 border-b">
                       <span class="text-grey">Volquete Identificado:</span>
                       <span class="font-weight-bold">VOL-07</span>
                    </div>
                    <div class="d-flex justify-space-between mb-2 pb-2 border-b">
                       <span class="text-grey">Horómetro Leído (IA):</span>
                       <span class="font-weight-bold text-h6 text-primary">14,235.5 Hrs</span>
                    </div>
                    <div class="d-flex justify-space-between mb-4">
                       <span class="text-grey">Confianza:</span>
                       <span class="font-weight-bold text-success">98.5%</span>
                    </div>
                    <v-btn block color="primary">Registrar en Sistema</v-btn>
                 </div>
              </div>
           </div>
        </div>

        <div class="two-column-grid mb-8">
           <!-- Combustible Audit vs SAP/Tag -->
           <div class="chart-card">
              <div class="chart-header justify-space-between">
                <h2 class="chart-title">Auditoría Combustible vs SAP</h2>
                <v-btn size="x-small" color="primary" variant="text">Ver Reporte</v-btn>
              </div>
              <table class="data-table" style="font-size: 0.85rem;">
                <thead>
                  <tr>
                    <th>Unidad</th>
                    <th>Reporte SAP</th>
                    <th>Registro Int.</th>
                    <th>Desvío</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="audit in fuelAuditData" :key="audit.truck" :class="{'bg-red-lighten-5': audit.deviation > 1.5}">
                     <td class="font-weight-bold">{{ audit.truck }}</td>
                     <td>{{ audit.sap }} GL</td>
                     <td>{{ audit.internal }} GL</td>
                     <td :class="{'text-error font-weight-bold': audit.deviation > 1.5, 'text-success': audit.deviation <= 1.5}">
                        {{ audit.deviation }}% 
                        <v-icon v-if="audit.deviation > 1.5" icon="mdi-alert" size="x-small" color="error"></v-icon>
                     </td>
                  </tr>
                </tbody>
              </table>
           </div>

           <!-- Chasis Interactivo (Llantas & PM) -->
           <div class="chart-card">
              <div class="chart-header">
                <h2 class="chart-title">Estado de Neumáticos (Chasis Interactivo)</h2>
              </div>
              <div class="d-flex justify-space-between mb-4">
                 <v-select label="Seleccionar Unidad" :items="truckIds" model-value="VOL-10" density="compact" hide-details class="w-50 mr-2"></v-select>
                 <div class="d-flex flex-column align-end justify-center">
                    <span class="text-caption">Prox. Mantenimiento:</span>
                    <v-chip size="small" color="warning" class="font-weight-bold">Paquete PM2 (50 Hrs)</v-chip>
                 </div>
              </div>

              <!-- Interactive Chassis Schematic -->
              <div class="chassis-container position-relative mx-auto mt-6" style="width: 140px; height: 320px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px;">
                 <!-- Cabin / Front -->
                 <div class="position-absolute bg-grey-lighten-2" style="top: 10%; left: 10%; width: 80%; height: 25%; border-radius: 8px 8px 0 0; border: 1px solid #cbd5e1;"></div>
                 <!-- Bed / Rear -->
                 <div class="position-absolute bg-primary-lighten-4" style="top: 38%; left: 5%; width: 90%; height: 55%; border: 1px solid #93c5fd; border-radius: 4px;"></div>
                 
                 <!-- Tires (Axle 1 Frontend) -->
                 <div class="tire position-absolute bg-success" style="top: 15%; left: -15px;"></div>
                 <div class="tire position-absolute bg-success" style="top: 15%; right: -15px;"></div>
                 
                 <!-- Tires (Axle 2 Rear Dual) -->
                 <div class="tire position-absolute bg-warning" style="top: 55%; left: -20px;"></div>
                 <div class="tire position-absolute bg-warning" style="top: 55%; left: -5px;"></div>
                 
                 <div class="tire position-absolute bg-success" style="top: 55%; right: -5px;"></div>
                 <div class="tire position-absolute bg-error cursor-pointer tire-blink" style="top: 55%; right: -20px;" title="Desgaste Crítico - Cambiar hoy"></div>
                 
                 <!-- Tires (Axle 3 Rear Dual) -->
                 <div class="tire position-absolute bg-success" style="top: 75%; left: -20px;"></div>
                 <div class="tire position-absolute bg-success" style="top: 75%; left: -5px;"></div>
                 
                 <div class="tire position-absolute bg-success" style="top: 75%; right: -5px;"></div>
                 <div class="tire position-absolute bg-success" style="top: 75%; right: -20px;"></div>
              </div>
              <div class="d-flex justify-center gap-4 mt-6">
                 <div class="d-flex align-center"><div class="tire-legend bg-success"></div> <span class="text-caption ml-1">Óptimo</span></div>
                 <div class="d-flex align-center"><div class="tire-legend bg-warning"></div> <span class="text-caption ml-1">Desgaste</span></div>
                 <div class="d-flex align-center"><div class="tire-legend bg-error"></div> <span class="text-caption ml-1">Crítico/Cambio</span></div>
              </div>
           </div>
        </div>
      </div>

      <!-- 5. TAREO Y CUADRADO DE GUARDIA (Shifts) -->
      <div v-if="currentView === 'shifts'" class="view-container animate-fade-in">
        <div class="d-flex justify-space-between align-center mb-6">
            <div>
               <h2 class="text-h5 font-weight-bold">Tareo y Cuadrado de Guardia</h2>
               <p class="text-grey mb-0">Gestión de 13 volquetes (10 diurnos / 3 nocturnos) sin vacíos operativos.</p>
            </div>
            
            <v-btn-toggle v-model="selectedGuard" color="primary" mandatory variant="outlined">
               <v-btn value="blanca">
                  <v-icon start icon="mdi-weather-sunny"></v-icon>
                  G. Blanca (D)
               </v-btn>
               <v-btn value="verde">
                  <v-icon start icon="mdi-weather-sunset"></v-icon>
                  G. Verde (D)
               </v-btn>
               <v-btn value="amarilla">
                  <v-icon start icon="mdi-weather-night"></v-icon>
                  G. Amarilla (N)
               </v-btn>
            </v-btn-toggle>
        </div>

        <div class="stats-row mb-6">
           <div class="stat-card">
              <div class="stat-header text-grey">Cobertura de Guardia</div>
             <div class="stat-value text-success" v-if="selectedGuard!=='amarilla'">10 / 10 Volquetes</div>
             <div class="stat-value text-success" v-else>3 / 3 Volquetes</div>
           </div>
           <div class="stat-card">
              <div class="stat-header text-grey">Choferes Asignados</div>
              <div class="stat-value text-primary">100%</div>
           </div>
           <div class="stat-card">
              <div class="stat-header text-grey">Continuidad</div>
              <div class="stat-value text-success d-flex align-center">
                 <v-icon icon="mdi-check-all" class="mr-1"></v-icon> Sin Vacíos
              </div>
           </div>
        </div>

        <div class="table-card">
           <table class="data-table">
            <thead>
              <tr>
                <th>Unidad Volquete</th>
                <th>Chofer ({{selectedGuard.toUpperCase()}})</th>
                <th>Relevo (Continuidad)</th>
                <th>Estado Unidad</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shift in filteredShifts" :key="shift.truck">
                 <td class="font-weight-bold text-h6">{{ shift.truck }}</td>
                 <td>
                    <div class="d-flex align-center">
                       <v-avatar size="28" color="primary-lighten-2" class="mr-2 text-white text-caption">{{ shift.driver.charAt(0) }}</v-avatar>
                       <span class="font-weight-medium">{{ shift.driver }}</span>
                    </div>
                 </td>
                 <td>
                    <div class="d-flex align-center text-grey">
                       <v-icon icon="mdi-swap-horizontal" class="mr-1" size="small"></v-icon>
                       {{ shift.relief }}
                    </div>
                 </td>
                 <td>
                    <v-chip size="small" color="success" variant="flat">Operativo</v-chip>
                 </td>
                 <td class="text-caption text-grey">
                    {{ shift.truck === 'VOL-10' ? 'Reporte PM2 pendiente' : 'Sin novedad en revisión pre-uso' }}
                 </td>
              </tr>
            </tbody>
           </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { ApexOptions } from 'apexcharts'
import { isSuperAdmin, canAccessJamleo, dashboards, type UserSession } from '@/utils/permissions'

// -- Core Setup
const currentView = ref('dashboard')
const client = useSupabaseClient()
const router = useRouter()
const showDashboardMenu = ref(false)
const userSession = useCookie<UserSession | null>('dashboard_session')
const currentUser = computed(() => userSession.value || { email: '', role: '', company_id: '' })

onMounted(() => {
  if (!canAccessJamleo(currentUser.value)) {
    alert('No tienes permiso para acceder a este dashboard.')
    router.push('/')
  }
})

const handleLogout = async () => {
  await client.auth.signOut()
  userSession.value = null
  router.push('/')
}

const navigateTo = (path: string) => router.push(path)

const viewTitle = computed(() => {
  switch (currentView.value) {
    case 'dashboard': return 'Panel de Control Principal'
    case 'drivers': return 'Control Documental de Conductores'
    case 'operations': return 'Gestión de Operaciones y Flota'
    case 'maintenance': return 'Auditoría de Combustible y Mantenimiento'
    case 'shifts': return 'Tareo y Cuadrado de Guardia'
    default: return 'Jamleo SAC'
  }
})

// -- Shared Helper Data --
const activeGuardName = ref('G. Blanca (D)')
const truckIds = Array.from({length: 13}, (_, i) => `VOL-${String(i+1).padStart(2, '0')}`)

// -- Choferes (Drivers) Mock Data --
const generateDrivers = () => {
  const names = [
    'Juan Pérez', 'Carlos Quispe', 'Luis Flores', 'José Sánchez', 'Manuel Rojas',
    'Jorge Mamani', 'Víctor Huamán', 'César Gutiérrez', 'Pedro Castillo', 'Miguel Torres',
    'Ángel Ramos', 'Raúl Vargas', 'Julio Castro', 'Ricardo Mendoza', 'Eduardo Chávez',
    'Fernando Silva', 'Antonio Ruiz', 'Roberto Navarro', 'Martin Cruz', 'Diego Salazar',
    'Andrés Cortez', 'Daniel Montes'
  ]
  const today = new Date()
  
  return names.map((name, i) => {
    let mtcExp = new Date(today)
    let intExp = new Date(today)
    
    if (i === 2 || i === 7) {
      mtcExp.setDate(mtcExp.getDate() + 8) 
      intExp.setDate(intExp.getDate() + 45) 
    } else if (i === 15) {
      intExp.setDate(intExp.getDate() + 9) 
      mtcExp.setDate(mtcExp.getDate() + 120)
    } else {
      mtcExp.setDate(mtcExp.getDate() + 30 + Math.floor(Math.random() * 300))
      intExp.setDate(intExp.getDate() + 30 + Math.floor(Math.random() * 300))
    }

    return {
      id: i + 1, name, dni: `4${Math.floor(1000000 + Math.random() * 9000000)}`,
      mtc_cat: 'A-IIIc', mtc_exp: mtcExp.toISOString().split('T')[0],
      internal_id: `JAM-${String(i+1).padStart(3, '0')}`, internal_exp: intExp.toISOString().split('T')[0]
    }
  })
}

const driversList = ref(generateDrivers())
const driverSearch = ref('')

const filteredDrivers = computed(() => {
  return driversList.value.filter(d => d.name.toLowerCase().includes(driverSearch.value.toLowerCase()) || d.dni.includes(driverSearch.value))
})

const getDaysUntil = (dateStr: string) => {
  const diffTime = (new Date(dateStr).getTime() - new Date().getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('es-PE', { day:'2-digit', month: 'short', year:'numeric' })
const getExpColor = (dateStr: string) => {
  const expDays = getDaysUntil(dateStr)
  if (expDays < 0) return 'error'
  if (expDays <= 10) return 'warning'
  return 'success'
}
const upcomingExpirations = computed(() => driversList.value.filter(d => getDaysUntil(d.mtc_exp) <= 10 || getDaysUntil(d.internal_exp) <= 10).length)


// -- Operations Mock Data --
const operationsData = ref({
   desmonte: [
      { id: 1, truck: 'VOL-01', origin: 'Tajo Norte', destination: 'Botadero Sur', driver: 'Juan Pérez', trips: 14 },
      { id: 2, truck: 'VOL-03', origin: 'Tajo Norte', destination: 'Botadero Sur', driver: 'Manuel Rojas', trips: 15 },
      { id: 3, truck: 'VOL-05', origin: 'Tajo Sur', destination: 'Botadero Este', driver: 'Luis Flores', trips: 12 },
   ],
   mineral: [
      { id: 4, truck: 'VOL-02', origin: 'Mina Subt. Nv 12', destination: 'Stockpile 1', driver: 'Carlos Quispe', trips: 8 },
      { id: 5, truck: 'VOL-04', origin: 'Tajo Este', destination: 'Planta Chancadora', driver: 'José Sánchez', trips: 9 },
   ]
})

const operationsLogs = ref([
   { id: 101, time: '10:45 AM', truck: 'VOL-01', driver: 'Juan Pérez', material: 'Desmonte', origin: 'Tajo Norte', destination: 'Botadero Sur', tonnage: 35.2 },
   { id: 102, time: '10:48 AM', truck: 'VOL-02', driver: 'Carlos Quispe', material: 'Mineral', origin: 'Mina Subt. Nv 12', destination: 'Stockpile 1', tonnage: 33.8 },
   { id: 103, time: '10:52 AM', truck: 'VOL-04', driver: 'José Sánchez', material: 'Mineral', origin: 'Tajo Este', destination: 'Planta Chancadora', tonnage: 36.1 },
   { id: 104, time: '11:05 AM', truck: 'VOL-03', driver: 'Manuel Rojas', material: 'Desmonte', origin: 'Tajo Norte', destination: 'Botadero Sur', tonnage: 34.5 },
   { id: 105, time: '11:10 AM', truck: 'VOL-05', driver: 'Luis Flores', material: 'Desmonte', origin: 'Tajo Sur', destination: 'Botadero Este', tonnage: 35.0 },
])

// -- Maintenance Data --
const aiValidated = ref(false)
const simulateAI = () => {
   aiValidated.value = false;
   setTimeout(() => { aiValidated.value = true }, 1500)
}

const fuelAuditData = ref([
   { truck: 'VOL-01', sap: 120.5, internal: 119.8, deviation: 0.58 },
   { truck: 'VOL-02', sap: 115.0, internal: 115.2, deviation: 0.17 },
   { truck: 'VOL-03', sap: 130.2, internal: 125.0, deviation: 4.00 }, // Error/Desvío simulado alto
   { truck: 'VOL-04', sap: 125.0, internal: 124.5, deviation: 0.40 },
   { truck: 'VOL-05', sap: 110.0, internal: 109.5, deviation: 0.45 },
])

// -- Shifts Data --
const selectedGuard = ref('blanca')
const filteredShifts = computed(() => {
   // 10 day trucks for Blanca/Verde, 3 night trucks for Amarilla
   const len = selectedGuard.value === 'amarilla' ? 3 : 10;
   const baseT = selectedGuard.value === 'amarilla' ? 10 : 0; // Nocturnos empiezan en VOL-11
   
   return Array.from({length: len}, (_, i) => {
      const truckIdx = baseT + i;
      const tId = `VOL-${String(truckIdx+1).padStart(2, '0')}`;
      
      let d1 = driversList.value[truckIdx].name;
      let r1 = driversList.value[(truckIdx + 11) % 22].name; // Mock releiver
      
      if(selectedGuard.value === 'verde') {
         const temp = d1; d1 = r1; r1 = temp;
      }
      if(selectedGuard.value === 'amarilla') {
         d1 = driversList.value[truckIdx + 1].name;
         r1 = driversList.value[truckIdx + 5].name;
      }
      
      return { truck: tId, driver: d1, relief: r1 }
   })
})

// -- Dashboard Charts Options --
const productionChartOptions = ref<ApexOptions>({
  chart: { type: 'area', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  colors: ['#3b82f6', '#10b981'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] },
  dataLabels: { enabled: false },
})

const productionChartSeries = ref([
  { name: 'Desmonte', data: [1200, 1350, 1400, 1250, 1500, 1450, 1100] },
  { name: 'Mineral de Acopio', data: [800, 750, 900, 850, 950, 800, 700] }
])

const fuelChartOptions = ref<ApexOptions>({
  chart: { type: 'bar', toolbar: { show: false } },
  colors: ['#4f46e5', '#f43f5e'],
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  xaxis: { categories: ['Volq 01', 'Volq 02', 'Volq 03', 'Volq 04', 'Volq 05'] },
  dataLabels: { enabled: false },
})

const fuelChartSeries = ref([
  { name: 'Consumo Tag SAP', data: [120, 115, 130, 125, 110] },
  { name: 'Consumo IA Interno', data: [119, 115, 125, 124, 109] } 
])

</script>

<style src="@/assets/styles/dashboard.css"></style>
<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-grey-lighten-4 { background-color: #f3f4f6 !important; }
.bg-primary-lighten-4 { background-color: #dbeafe !important; }

/* Interactive Chassis Styles */
.tire {
   width: 15px; 
   height: 40px; 
   border-radius: 4px; 
   border: 1px solid rgba(0,0,0,0.2);
   z-index: 2;
}

.tire-blink {
   animation: alertBlink 1s infinite alternate;
}

@keyframes alertBlink {
   0% { box-shadow: 0 0 5px red; transform: scale(1); }
   100% { box-shadow: 0 0 15px red; transform: scale(1.1); }
}

.tire-legend {
   width: 12px; height: 12px; border-radius: 2px;
}
</style>
