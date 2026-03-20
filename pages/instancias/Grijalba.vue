<template>
  <div class="dashboard-container">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo" style="gap: 0.5rem;">
          <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
            <img src="@/assets/img/grijalvalogo.png" alt="Grijalba"
              style="max-width: 100%; height: auto; max-height: 50px;" />
          </div>

          <template v-if="isSuperAdmin(currentUser)">
            <v-menu v-model="showDashboardMenu">
              <template v-slot:activator="{ props }">
                <div v-bind="props"
                  style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; justify-content: center; margin-top: 5px;">
                  <v-icon icon="mdi-menu-down" size="small" />
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
        <!-- Marketing -->
        <div class="nav-section">
          <div class="nav-label">MARKETING</div>
          <button :class="['nav-item', { active: currentView === 'dashboard' }]" @click="currentView = 'dashboard'">
            <v-icon icon="mdi-view-dashboard-outline" size="20"></v-icon>
            <span>Panel Principal</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'document-analyzer' }]"
            @click="currentView = 'document-analyzer'">
            <v-icon icon="mdi-truck-outline" size="20"></v-icon>
            <span>Control de Camionetas</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'marketplace' }]" @click="currentView = 'marketplace'">
            <v-icon icon="mdi-hard-hat" size="20"></v-icon>
            <span>EPPS</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'orders' }]" @click="currentView = 'orders'">
            <v-icon icon="mdi-shopping-outline" size="20"></v-icon>
            <span>Pedidos</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'tracking' }]" @click="currentView = 'tracking'">
            <v-icon icon="mdi-account-clock" size="20"></v-icon>
            <span>Tareas del personal</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'discounts' }]" @click="currentView = 'discounts'">
            <v-icon icon="mdi-tag-outline" size="20"></v-icon>
            <span>Descuentos</span>
          </button>
        </div>

        <!-- Payments -->
        <div class="nav-section">
          <div class="nav-label">PAGOS</div>
          <button :class="['nav-item', { active: currentView === 'ledger' }]" @click="currentView = 'ledger'">
            <v-icon icon="mdi-grid" size="20"></v-icon>
            <span>Libro Mayor</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'taxes' }]" @click="currentView = 'taxes'">
            <v-icon icon="mdi-currency-usd" size="20"></v-icon>
            <span>Impuestos</span>
          </button>
        </div>

        <!-- System -->
        <div class="nav-section">
          <div class="nav-label">SISTEMA</div>
          <button :class="['nav-item', { active: currentView === 'settings' }]" @click="currentView = 'settings'">
            <v-icon icon="mdi-cog-outline" size="20"></v-icon>
            <span>Configuración</span>
          </button>
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
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" class="user-avatar" />
          <div class="user-info">
            <span class="user-name">{{ currentUser?.full_name || currentUser?.email || 'Usuario' }}</span>
            <span class="user-role" style="text-transform: capitalize;">{{ currentUser?.role || 'User' }}</span>
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
        <h1 class="page-title">Panel de Control</h1>
        <div class="time-filter">
          <v-icon icon="mdi-calendar-range" size="16"></v-icon>
          <span>Periodo: </span>
          <span style="font-weight: 600; color: #111827;">Todo el tiempo</span>
          <v-icon icon="mdi-chevron-down" size="16"></v-icon>
        </div>
      </div>

      <!-- Content Grid -->
      <!-- Dashboard View -->
      <div v-if="currentView === 'dashboard'" class="view-container">
        <!-- Maintenance & Km Charts Row -->
        <div class="two-column-grid mb-8">
          <!-- Maintenance Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Mantenimientos por Vehículo</h2>
            </div>
            <client-only>
              <apexchart type="bar" height="350" :options="maintenanceChartOptions" :series="maintenanceChartSeries">
              </apexchart>
            </client-only>
          </div>
          <!-- Km Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Kilometraje Total por Vehículo</h2>
            </div>
            <client-only>
              <apexchart type="bar" height="350" :options="kmChartOptions" :series="kmChartSeries"></apexchart>
            </client-only>
          </div>
        </div>

        <!-- Drivers Matrix Table -->
        <div class="table-card">
          <div class="card-header px-6 py-4 border-b">
            <h2 class="text-h6 font-weight-bold">Actividad de Conductores por Vehículo</h2>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Conductor</th>
                <th v-for="truck in trucks" :key="truck.id">{{ truck.plate }}</th>
                <th>Total Viajes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stat in driverStats" :key="stat.driver">
                <td class="font-weight-medium">{{ stat.driver }}</td>
                <td v-for="truck in trucks" :key="truck.id" class="text-center">
                  <span
                    :class="{ 'text-primary font-weight-bold': stat.trucks[truck.id] > 0, 'text-grey-lighten-2': !stat.trucks[truck.id] }">
                    {{ stat.trucks[truck.id] || '-' }}
                  </span>
                </td>
                <td class="font-weight-bold text-center">{{ stat.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Document Analyzer View -->
      <!-- Document Analyzer View -->
      <div v-if="currentView === 'document-analyzer'" class="view-container">
        <!-- List View -->
        <div v-if="!selectedTruck" class="table-card">
          <div class="card-header d-flex justify-space-between align-center pa-4">
            <h2 class="card-title">Flota de Vehículos</h2>
            <v-btn color="primary" prepend-icon="mdi-plus">Añadir Vehículo</v-btn>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Km acumulado</th>
                <th>Ultima fecha de intervención</th>
                <th>Próximo SOAT</th>
                <th>Fecha de intervención</th>
                <th>Tipo de mantenimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="truck in trucks" :key="truck.id" @click="selectedTruck = truck"
                style="cursor: pointer; transition: background 0.2s;" class="hover:bg-gray-50">
                <td style="font-weight: 600; color: #4f46e5;">{{ truck.placa }}</td>
                <td>{{ truck.modelo }}</td>
                <td>{{ truck.km_acumulado ? truck.km_acumulado.toLocaleString() : 0 }} km</td>
                <td>{{ truck.ultima_fecha_intervencion || '-' }}</td>
                <td>{{ truck.proximo_soat || '-' }}</td>
                <td>{{ truck.fecha_intervencion || '-' }}</td>
                <td>
                  <v-chip :color="truck.tipo_mantenimiento === 'Preventivo/Programado' ? 'success' : 'warning'"
                    size="small" class="font-weight-medium">
                    {{ truck.tipo_mantenimiento }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Detail View -->
        <div v-else class="truck-detail-view">
          <div class="d-flex align-center mb-6">
            <v-btn icon="mdi-arrow-left" variant="text" @click="selectedTruck = null" class="mr-4"></v-btn>
            <div>
              <h1 class="text-h4 font-weight-bold">{{ selectedTruck.brand }} {{ selectedTruck.model }}</h1>
              <div class="text-subtitle-1 text-grey">Placa: {{ selectedTruck.plate }} • ID: #{{ selectedTruck.id }}
              </div>
            </div>
          </div>

          <div class="detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <!-- Left: Image -->
            <div class="detail-image-card"
              style="background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <img :src="selectedTruck.image" alt="Truck Image"
                style="width: 100%; height: auto; border-radius: 8px; object-fit: cover;" />
              <div class="status-badge mt-4 d-flex align-center justify-center"
                style="background: #eef2ff; color: #4f46e5; padding: 0.5rem; border-radius: 6px; font-weight: 600;">
                <v-icon icon="mdi-check-circle" size="18" class="mr-2"></v-icon>
                Estado: {{ selectedTruck.status }}
              </div>
            </div>

            <!-- Right: Specs -->
            <div class="detail-specs-card"
              style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <h2 class="text-h5 mb-6 font-weight-bold">Ficha Técnica</h2>

              <div class="specs-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <!-- Spec Item -->
                <div class="spec-item">
                  <div class="text-caption text-grey">Año de Fabricación</div>
                  <div class="text-h6">{{ selectedTruck.year }}</div>
                </div>
                <!-- Spec Item -->
                <div class="spec-item">
                  <div class="text-caption text-grey">Motor</div>
                  <div class="text-h6">{{ selectedTruck.engine }}</div>
                </div>
                <!-- Spec Item -->
                <div class="spec-item">
                  <div class="text-caption text-grey">Transmisión</div>
                  <div class="text-h6">{{ selectedTruck.transmission }}</div>
                </div>
                <!-- Spec Item -->
                <div class="spec-item">
                  <div class="text-caption text-grey">Combustible</div>
                  <div class="text-h6">{{ selectedTruck.fuel_capacity }}</div>
                </div>
                <!-- Spec Item -->
                <div class="spec-item">
                  <div class="text-caption text-grey">Capacidad de Carga</div>
                  <div class="text-h6">{{ selectedTruck.load_capacity }}</div>
                </div>
                <!-- Spec Item -->
                <div class="spec-item">
                  <div class="text-caption text-grey">Último Mantenimiento</div>
                  <div class="text-h6">{{ selectedTruck.maintenance }}</div>
                </div>
              </div>

              <v-divider class="my-6"></v-divider>

              <h3 class="text-h6 mb-4">Métricas Operativas</h3>
              <div class="d-flex justify-space-between text-center">
                <div>
                  <div class="text-h4 font-weight-bold text-primary">{{ selectedTruck.km.toLocaleString() }}</div>
                  <div class="text-caption">Kilometraje Total</div>
                </div>
                <div>
                  <div class="text-h4 font-weight-bold text-primary">{{ selectedTruck.hours }}</div>
                  <div class="text-caption">Horas Totales</div>
                </div>
              </div>
            </div>
          </div>

          <!-- History Table -->
          <div class="history-section mt-8">
            <h2 class="text-h5 mb-4 font-weight-bold">Historial de Mantenimientos Diarios</h2>
            <div class="table-card">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Conductor</th>
                    <th>Km/Día</th>
                    <th>Hrs/Día</th>
                    <th>Actividad Realizada</th>
                    <th>Detalle / Observación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, index) in selectedTruck.maintenance_history" :key="index">
                    <td>{{ record.date }}</td>
                    <td>
                      <v-chip :color="record.type === 'Preventivo/Programado' ? 'success' : 'warning'" size="x-small"
                        class="font-weight-medium">
                        {{ record.type }}
                      </v-chip>
                    </td>
                    <td class="text-capitalize">{{ record.driver }}</td>
                    <td>{{ record.daily_km }} km</td>
                    <td>{{ record.daily_hours }} hrs</td>
                    <td>{{ record.activity }}</td>
                    <td class="text-grey-darken-1">{{ record.observation }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <!-- Maquinaria View (Renamed from Marketplace) -->
      <div v-if="currentView === 'marketplace'" class="view-container">
        <div class="filters-bar">
          <div class="search-box">
            <v-icon icon="mdi-magnify" color="grey"></v-icon>
            <input type="text" placeholder="Buscar equipo o maquinaria..." />
          </div>
          <v-btn color="primary" variant="outlined" prepend-icon="mdi-filter-variant">Filtros</v-btn>
          <v-btn color="primary" prepend-icon="mdi-plus">Añadir Equipo</v-btn>
        </div>

        <div class="products-grid">
          <!-- Hydrofraise -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-excavator" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Hydrofraise® HC05</h3>
              <p class="product-category">Excavación de Muros Pantalla</p>
              <div class="product-meta">
                <span class="product-price">Consultar</span>
                <span class="product-stock instock">Disponible (2)</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>

          <!-- Compact Hydrofraise -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-excavator" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Hydrofraise® Compacta</h3>
              <p class="product-category">Trabajos urbanos / Baja altura</p>
              <div class="product-meta">
                <span class="product-price">Consultar</span>
                <span class="product-stock instock">En uso (1)</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>

          <!-- Cutter Soil Mixing -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-mixer" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Equipo CSM (Cutter Soil Mixing)</h3>
              <p class="product-category">Mejora de Suelos</p>
              <div class="product-meta">
                <span class="product-price">Consultar</span>
                <span class="product-stock instock">Disponible (3)</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>

          <!-- Pilotes -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-screw-machine-flat-top" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Perforadora de Pilotes Starsol®</h3>
              <p class="product-category">Cimentaciones Profundas</p>
              <div class="product-meta">
                <span class="product-price">Consultar</span>
                <span class="product-stock instock">Mantenimiento</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>

          <!-- Grouting Pump -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-pump" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Unidad de Inyección (Grouting)</h3>
              <p class="product-category">Túneles y Presas</p>
              <div class="product-meta">
                <span class="product-price">$45,000</span>
                <span class="product-stock instock">Stock (5)</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>

          <!-- Tunnel Boring Machine Reference -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-train-car" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Componentes TBM (Tuneladora)</h3>
              <p class="product-category">Infraestructura Subterránea</p>
              <div class="product-meta">
                <span class="product-price">Bajo Pedido</span>
                <span class="product-stock instock">Stock (0)</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>

          <!-- Barge -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-ferry" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Plataforma/Barcaza Marítima</h3>
              <p class="product-category">Obras Portuarias</p>
              <div class="product-meta">
                <span class="product-price">Alquiler</span>
                <span class="product-stock instock">Ocupada</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>

          <!-- Biocalcis -->
          <div class="product-card">
            <div class="product-image">
              <v-icon icon="mdi-flask" size="64" color="grey"></v-icon>
            </div>
            <div class="product-info">
              <h3 class="product-title">Solución Biocalcis®</h3>
              <p class="product-category">Mejora de Suelos (Eco)</p>
              <div class="product-meta">
                <span class="product-price">$1,200/u</span>
                <span class="product-stock instock">Stock Alto</span>
              </div>
            </div>
            <div class="product-actions">
              <v-btn size="small" variant="text" icon="mdi-pencil"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-delete" color="error"></v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Pedidos View -->
      <div v-if="currentView === 'orders'" class="view-container">
        <div class="filters-bar">
          <div class="search-box">
            <v-icon icon="mdi-magnify" color="grey"></v-icon>
            <input type="text" placeholder="Buscar pedido..." />
          </div>
          <v-btn color="primary" variant="outlined">Exportar CSV</v-btn>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 10" :key="i">
                <td>#ORD-{{ 7000 + i }}</td>
                <td>
                  <div class="user-cell">
                    <div class="user-avatar-sm">{{ String.fromCharCode(65 + i) }}</div>
                    <span>Cliente {{ i }}</span>
                  </div>
                </td>
                <td>{{ 10 + i }} Ene, 2024</td>
                <td>
                  <span :class="['status-chip', i % 3 === 0 ? 'cancelled' : (i % 2 === 0 ? 'completed' : 'pending')]">
                    {{ i % 3 === 0 ? 'Cancelado' : (i % 2 === 0 ? 'Completado' : 'Pendiente') }}
                  </span>
                </td>
                <td>${{ (i * 150).toFixed(2) }}</td>
                <td>
                  <v-btn size="small" variant="text" icon="mdi-eye"></v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tareas del Personal / Time Tracking View -->
      <div v-if="currentView === 'tracking'" class="view-container">
        <!-- Stats Row -->
        <div class="stats-row mb-6">
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-account-group" /> <span>Personal Total</span></div>
            <div class="stat-value">{{ staffList.length }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-account-check" /> <span>Activos Ahora</span></div>
            <div class="stat-value text-success">{{staffList.filter(s => s.status === 'active').length}}</div>
          </div>
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-coffee" /> <span>En Descanso</span></div>
            <div class="stat-value text-warning">{{staffList.filter(s => s.status === 'break').length}}</div>
          </div>
        </div>

        <div class="two-column-grid">
          <!-- Left: My Time Clock -->
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Mi Marcador de Tiempo</h2>
            </div>
            <div class="d-flex flex-column align-center justify-center py-8">
              <div class="text-h2 font-weight-bold mb-2">{{ new Date().toLocaleTimeString([], {
                hour: '2-digit', minute:
                  '2-digit'
              }) }}</div>
              <div class="text-subtitle-1 text-grey mb-8">{{ new Date().toLocaleDateString([], {
                weekday: 'long', year:
                  'numeric', month: 'long', day: 'numeric'
              }) }}</div>

              <div class="d-flex gap-4 mb-6" style="gap: 1rem;">
                <v-btn v-if="currentUserStatus === 'offline'" size="x-large" color="success" prepend-icon="mdi-login"
                  @click="handleClockAction('clock-in')">
                  Iniciar Turno
                </v-btn>

                <template v-else>
                  <v-btn v-if="currentUserStatus === 'active'" size="large" color="warning" prepend-icon="mdi-coffee"
                    @click="handleClockAction('break-start')">
                    Iniciar Descanso
                  </v-btn>
                  <v-btn v-if="currentUserStatus === 'break'" size="large" color="info" prepend-icon="mdi-coffee-off"
                    @click="handleClockAction('break-end')">
                    Fin Descanso
                  </v-btn>
                  <v-btn size="large" color="error" prepend-icon="mdi-logout" @click="handleClockAction('clock-out')">
                    Finalizar Turno
                  </v-btn>
                </template>
              </div>

              <div class="status-indicator d-flex align-center">
                <v-icon
                  :color="currentUserStatus === 'active' ? 'success' : (currentUserStatus === 'break' ? 'warning' : 'grey')"
                  icon="mdi-circle-medium"></v-icon>
                <span class="text-caption font-weight-bold text-uppercase"
                  :class="currentUserStatus === 'active' ? 'text-success' : (currentUserStatus === 'break' ? 'text-warning' : 'text-grey')">
                  {{ currentUserStatus === 'active' ? 'En Turno' : (currentUserStatus === 'break' ? 'En Descanso' :
                    'Desconectado') }}
                </span>
                <span v-if="lastActionTime !== '--:--'" class="ml-2 text-caption text-grey">Desde {{ lastActionTime
                }}</span>
              </div>
            </div>
          </div>

          <!-- Right: Recent Activity Log -->
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Registros Recientes</h2>
            </div>
            <div class="table-container" style="max-height: 300px; overflow-y: auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Acción</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="log in timeLogs" :key="log.id">
                    <td>
                      <div class="d-flex align-center">
                        <v-avatar size="24" class="mr-2">
                          <v-img src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            v-if="log.user === 'Roberto Cáceres'"></v-img>
                          <v-icon icon="mdi-account" v-else></v-icon>
                        </v-avatar>
                        {{ log.user }}
                      </div>
                    </td>
                    <td>
                      <v-chip size="x-small"
                        :color="log.type === 'Entrada' || log.type === 'Fin Descanso' ? 'success' : (log.type === 'Salida' ? 'error' : 'warning')">
                        {{ log.type }}
                      </v-chip>
                    </td>
                    <td class="text-caption">{{ log.time }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Staff List Table -->
        <div class="table-card mt-8">
          <div class="card-header px-6 py-4 border-b d-flex justify-space-between align-center">
            <h2 class="text-h6 font-weight-bold">Estado del Personal</h2>
            <div class="d-flex gap-2">
              <v-btn size="small" variant="text" icon="mdi-magnify"></v-btn>
              <v-btn size="small" variant="text" icon="mdi-filter-variant"></v-btn>
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Rol</th>
                <th>Estado Actual</th>
                <th>Última Actividad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="staff in staffList" :key="staff.id">
                <td>
                  <div class="d-flex align-center">
                    <v-avatar size="32" class="mr-3">
                      <v-img :src="staff.avatar"></v-img>
                    </v-avatar>
                    <div>
                      <div class="font-weight-medium">{{ staff.name }}</div>
                      <div class="text-caption text-grey">ID: #{{ 100 + staff.id }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ staff.role }}</td>
                <td>
                  <v-chip size="small"
                    :color="staff.status === 'active' ? 'success' : (staff.status === 'break' ? 'warning' : 'grey')">
                    <v-icon start icon="mdi-circle-medium"></v-icon>
                    {{ staff.status === 'active' ? 'Activo' : (staff.status === 'break' ? 'Descanso' : 'Offline') }}
                  </v-chip>
                </td>
                <td>{{ staff.last_action }}</td>
                <td>
                  <v-btn size="small" variant="text" icon="mdi-dots-vertical"></v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Descuentos View -->
      <div v-if="currentView === 'discounts'" class="view-container">
        <div class="filters-bar">
          <v-btn color="primary" prepend-icon="mdi-plus">Crear Código</v-btn>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Usos</th>
                <th>Estado</th>
                <th>Expira</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="k in 5" :key="k">
                <td style="font-weight: 700;">SUMMER{{ 20 + k }}</td>
                <td>Porcentaje</td>
                <td>{{ 10 + k }}%</td>
                <td>{{ k * 12 }}</td>
                <td><span class="status-chip completed">Activo</span></td>
                <td>31 Dic, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Libro Mayor View -->
      <div v-if="currentView === 'ledger'" class="view-container">
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-bank" /> <span>Balance Total</span></div>
            <div class="stat-value">$125,430.00</div>
          </div>
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-arrow-up" /> <span>Ingresos (Mes)</span></div>
            <div class="stat-value text-success">$45,200.00</div>
          </div>
          <div class="stat-card">
            <div class="stat-header"><v-icon icon="mdi-arrow-down" /> <span>Gastos (Mes)</span></div>
            <div class="stat-value text-error">$12,850.00</div>
          </div>
        </div>
        <div class="table-card mt-4">
          <table class="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Referencia</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in 8" :key="m">
                <td>{{ m }} Feb, 2024</td>
                <td>Pago de Servicios {{ m }}</td>
                <td>Operativo</td>
                <td>#REF-99{{ m }}</td>
                <td :class="m % 2 === 0 ? 'text-error' : 'text-success'">
                  {{ m % 2 === 0 ? '-' : '+' }}${{ (m * 500).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Impuestos View -->
      <div v-if="currentView === 'taxes'" class="view-container">
        <div class="chart-card">
          <div class="chart-header">
            <h2 class="chart-title">Resumen de Impuestos 2024</h2>
          </div>
          <div class="d-flex align-center justify-space-around py-8">
            <div class="text-center">
              <div class="text-h4 font-weight-bold mb-2">$15,400</div>
              <div class="text-caption text-uppercase">IVA Recaudado</div>
            </div>
            <div class="text-center">
              <div class="text-h4 font-weight-bold mb-2">$8,200</div>
              <div class="text-caption text-uppercase">IVA Pagado</div>
            </div>
            <div class="text-center">
              <div class="text-h4 font-weight-bold mb-2 text-primary">$7,200</div>
              <div class="text-caption text-uppercase">Impuesto a Pagar</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Configuración View -->
      <div v-if="currentView === 'settings'" class="view-container">
        <div class="chart-card" style="max-width: 800px; margin: 0 auto;">
          <div class="chart-header">
            <h2 class="chart-title">Perfil de Administrador</h2>
          </div>
          <div class="pa-6">
            <v-row>
              <v-col cols="12" md="6">
                <label class="d-block mb-2 font-weight-bold">Nombre Completo</label>
                <input type="text" class="form-input" value="Roberto Cáceres" />
              </v-col>
              <v-col cols="12" md="6">
                <label class="d-block mb-2 font-weight-bold">Correo Electrónico</label>
                <input type="email" class="form-input" value="admin@flup.com" />
              </v-col>
              <v-col cols="12">
                <label class="d-block mb-2 font-weight-bold">Rol</label>
                <input type="text" class="form-input" value="Administrador Super" disabled
                  style="background: #f3f4f6;" />
              </v-col>
            </v-row>
            <div class="mt-6">
              <h3 class="text-h6 mb-4">Notificaciones</h3>
              <div class="d-flex align-center justify-space-between mb-2">
                <span>Alertas de correo por nuevos pedidos</span>
                <v-switch color="primary" model-value="true" hide-details density="compact"></v-switch>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Resumen semanal de ventas</span>
                <v-switch color="primary" model-value="false" hide-details density="compact"></v-switch>
              </div>
            </div>
            <div class="d-flex justify-end mt-6">
              <v-btn color="primary">Guardar Cambios</v-btn>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { ApexOptions } from 'apexcharts'
import {
  isSuperAdmin,
  canAccessGrijalva,
  dashboards,
  type UserSession
} from '@/utils/permissions'

// useTheme if needed for dark mode logic
import { useTheme } from 'vuetify'

const currentView = ref('dashboard')
const client = useSupabaseClient()
const router = useRouter()
const showDashboardMenu = ref(false)

const userSession = useCookie<UserSession | null>('dashboard_session')
const currentUser = computed(() => userSession.value || { email: '', role: '', company_id: '' })

function navigateTo(path: string) {
  router.push(path)
}

const handleLogout = async () => {
  const { error } = await client.auth.signOut()
  if (error) {
    console.error('Error logging out:', error)
  }
  userSession.value = null
  router.push('/')
}

const trucks = ref<any[]>([])

const fetchTrucks = async () => {
  const { data, error } = await client
    .from('camionetas_grijalva')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching trucks:', error)
    return
  }

  if (data) {
    // Map data if necessary or use directly if columns match. 
    // Assuming columns: id, plate, brand, model, km, maintenance_date (mapped to maintenance), maintenance_type, etc.
    // We'll map them to ensure frontend compatibility if needed, or stick to raw structure if it matches.
    // For now, let's map to ensuring the structure matches our UI expectations, especially for the history which isn't in DB yet.

    trucks.value = data.map((t: any) => {
      // Generate valid fake history PROVISIONALLY to prevent valid fake errors in charts/tables until backend history table exists
      // Real implementation would fetch from a separate 'maintenance_history' table
      const history = Array.from({ length: 5 }, (_, j) => ({
        date: `2024-01-${String(Math.floor(Math.random() * 25) + 1).padStart(2, '0')}`,
        type: Math.random() > 0.7 ? 'Preventivo/Programado' : 'Correctivo',
        driver: driversList[Math.floor(Math.random() * driversList.length)],
        activity: activitiesList[Math.floor(Math.random() * activitiesList.length)],
        observation: observationsList[Math.floor(Math.random() * observationsList.length)],
        daily_km: Math.floor(Math.random() * 100) + 20,
        daily_hours: Math.floor(Math.random() * 6) + 1
      })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

      return {
        ...t,
        // Map DB columns (Spanish) to Frontend Props (English) for compatibility
        id: t.id,
        plate: t.placa || t.plate || '---',
        brand: t.marca || t.brand || 'Toyota', // Fallback
        model: t.modelo || t.model || 'Unknown',
        year: t.anio || t.year || 2024,
        km: t.km_acumulado || t.km || 0,
        hours: t.horas || 0,

        // Specs 
        engine: t.motor || t.engine || 'N/A',
        transmission: t.transmision || t.transmission || 'N/A',
        fuel_capacity: t.capacidad_combustible || t.fuel_capacity || 'N/A',
        load_capacity: t.capacidad_carga || t.load_capacity || 'N/A',
        status: t.estado || t.status || 'Operativo',

        // Maintenance
        maintenance: t.fecha_intervencion || t.ultima_fecha_intervencion || t.maintenance || '',
        maintenance_type: t.tipo_mantenimiento || t.maintenance_type || '',

        // Extra
        image: t.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
        maintenance_history: history,
        next_soat: t.proximo_soat || t.next_soat || '',
        next_technical_revision: t.proxima_revision_tecnica || t.next_technical_revision || ''
      }
    })
  }
}

onMounted(() => {
  if (!canAccessGrijalva(currentUser.value)) {
    alert('No tienes permiso para acceder a este dashboard.')
    router.push('/')
    return
  }
  fetchTrucks()
})

const viewTitle = computed(() => {
  switch (currentView.value) {
    case 'dashboard': return 'Panel Principal'
    case 'document-analyzer': return 'Control de Camionetas'
    case 'marketplace': return 'EPPS'
    case 'orders': return 'Pedidos'
    case 'tracking': return 'Tareas del personal'
    case 'discounts': return 'Descuentos'
    case 'ledger': return 'Libro Mayor'
    case 'taxes': return 'Impuestos'
    case 'settings': return 'Configuración'
    default: return 'Panel Principal'
  }
})

// Document Analyzer Logic
const fileInput = ref<HTMLInputElement | null>(null)
const isAnalyzing = ref(false)
const reportReady = ref(false)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    simulateAnalysis()
  }
}

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    simulateAnalysis()
  }
}

const simulateAnalysis = () => {
  isAnalyzing.value = true
  // Simulate API delay
  setTimeout(() => {
    isAnalyzing.value = false
    reportReady.value = true
  }, 2500)
}

const resetAnalyzer = () => {
  reportReady.value = false
  isAnalyzing.value = false
  if (fileInput.value) fileInput.value.value = ''
}

// --- MOCK DATA & LISTS (Moved to top for computed access) ---

// Mock Data Lists
const driversList = [
  'Juan Pérez', 'Carlos Quispe', 'Luis Flores', 'José Sánchez', 'Manuel Rojas',
  'Jorge Mamani', 'Víctor Huamán', 'César Gutiérrez', 'Pedro Castillo', 'Miguel Torres',
  'Ángel Ramos', 'Raúl Vargas', 'Julio Castro', 'Ricardo Mendoza', 'Eduardo Chávez'
]

const activitiesList = [
  'Aceite motor + filtro aceite', 'Filtro de aire (motor)', 'Filtro de combustible (petroleo)',
  'Filtro de aire acondicionado', 'Rotación de llantas', 'Cambio llantas (neumáticos)',
  'Cambio batería', 'Cambio pastillas de freno', 'Revisión general (check)', 'Kit antiderrame', 'Otros: Revision de luces'
]

const observationsList = [
  'Todo conforme', 'Desgaste moderado encontrado', 'Reemplazo preventivo', 'Nivel bajo rellenado',
  'Ruido en suspensión revisado', 'Limpieza realizada', 'Ajuste de frenos necesario', 'OK',
  'Sin novedades', 'Próximo cambio sugerido'
]



// --- COMPUTED PROPERTIES FOR DASHBOARD ---

// 1. Maintenance Chart (Preventive vs Corrective)
const maintenanceChartSeries = computed(() => {
  const preventivos_data = trucks.value.map(t =>
    t.maintenance_history.filter((h: any) => h.type === 'Preventivo/Programado').length
  )
  const correctivos_data = trucks.value.map(t =>
    t.maintenance_history.filter((h: any) => h.type === 'Correctivo').length
  )

  return [
    { name: 'Preventivo/Programado', data: preventivos_data },
    { name: 'Correctivo', data: correctivos_data }
  ]
})

const maintenanceChartOptions = computed<ApexOptions>(() => ({
  chart: { type: 'bar', stacked: true, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  colors: ['#10b981', '#f97316'], // Green for Preventive, Orange for Corrective
  plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: '40%' } },
  xaxis: {
    categories: trucks.value.map(t => t.plate),
    labels: { style: { colors: '#6b7280', fontSize: '12px' } }
  },
  yaxis: { labels: { style: { colors: '#6b7280' } } },
  grid: { borderColor: '#f3f4f6' },
  legend: { position: 'top' },
  dataLabels: { enabled: false }
}))

// 2. Km Chart
const kmChartSeries = computed(() => {
  return [{ name: 'Kilometraje Total', data: trucks.value.map(t => t.km) }]
})

const kmChartOptions = computed<ApexOptions>(() => ({
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  colors: ['#4f46e5'],
  plotOptions: { bar: { borderRadius: 4, columnWidth: '45%' } },
  xaxis: {
    categories: trucks.value.map(t => t.plate),
    labels: { style: { colors: '#6b7280' } }
  },
  yaxis: {
    labels: { formatter: (val) => val.toLocaleString(), style: { colors: '#6b7280' } }
  },
  grid: { borderColor: '#f3f4f6' },
  dataLabels: { enabled: false }
}))

// 3. Driver Stats Matrix
const driverStats = computed(() => {
  // Init map for all drivers
  const stats: Record<string, { driver: string, trucks: Record<number, number>, total: number }> = {}
  driversList.forEach(d => {
    stats[d] = { driver: d, trucks: {}, total: 0 }
    trucks.value.forEach(t => { stats[d].trucks[t.id] = 0 })
  })

  // Fill from history
  trucks.value.forEach(t => {
    t.maintenance_history.forEach((h: any) => {
      if (stats[h.driver]) {
        stats[h.driver].trucks[t.id] = (stats[h.driver].trucks[t.id] || 0) + 1
        stats[h.driver].total++
      }
    })
  })

  // Convert to array and sort by total activity
  return Object.values(stats)
    .sort((a, b) => b.total - a.total)
    .filter(s => s.total > 0) // Only show active drivers if preferred, or keep all
})

const selectedTruck = ref<any>(null)

// --- TIME TRACKING / TAREAS DEL PERSONAL LOGIC ---

const staffList = ref([
  { id: 1, name: 'Roberto Cáceres', role: 'Administrador', status: 'active', last_action: '08:00 AM', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 2, name: 'Juan Pérez', role: 'Conductor', status: 'active', last_action: '07:45 AM', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 3, name: 'María Gonzalez', role: 'Logística', status: 'break', last_action: '12:30 PM', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 4, name: 'Carlos Ruiz', role: 'Mecánico', status: 'offline', last_action: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 5, name: 'Ana López', role: 'Asistente', status: 'active', last_action: '08:15 AM', avatar: 'https://i.pravatar.cc/150?u=4' },
])

const timeLogs = ref([
  { id: 101, user: 'Roberto Cáceres', type: 'Entrada', time: '19 Feb, 08:00 AM', location: 'Oficina Principal' },
  { id: 102, user: 'Juan Pérez', type: 'Entrada', time: '19 Feb, 07:45 AM', location: 'Almacén' },
  { id: 103, user: 'María Gonzalez', type: 'Entrada', time: '19 Feb, 08:30 AM', location: 'Remoto' },
  { id: 104, user: 'María Gonzalez', type: 'Inicio Descanso', time: '19 Feb, 12:30 PM', location: 'Remoto' },
  { id: 105, user: 'Carlos Ruiz', type: 'Salida', time: '18 Feb, 06:00 PM', location: 'Taller' },
])

const currentUserStatus = ref('offline') // offline, active, break
const lastActionTime = ref('--:--')

const handleClockAction = (action: 'clock-in' | 'clock-out' | 'break-start' | 'break-end') => {
  const now = new Date()
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dateString = now.toLocaleDateString([], { day: 'numeric', month: 'short' })

  let typeText = ''

  if (action === 'clock-in') {
    currentUserStatus.value = 'active'
    typeText = 'Entrada'
  } else if (action === 'clock-out') {
    currentUserStatus.value = 'offline'
    typeText = 'Salida'
  } else if (action === 'break-start') {
    currentUserStatus.value = 'break'
    typeText = 'Inicio Descanso'
  } else if (action === 'break-end') {
    currentUserStatus.value = 'active'
    typeText = 'Fin Descanso'
  }

  lastActionTime.value = timeString

  // Add to log
  timeLogs.value.unshift({
    id: Date.now(),
    user: 'Roberto Cáceres', // Current user mock
    type: typeText,
    time: `${dateString}, ${timeString}`,
    location: 'Oficina Principal'
  })
}

</script>

<style src="@/assets/styles/dashboard.css"></style>
