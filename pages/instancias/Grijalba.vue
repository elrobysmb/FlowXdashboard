<template>
  <div class="dashboard-container">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <img src="@/assets/img/grijalvalogo.png" alt="Grijalba"
            style="max-width: 100%; height: auto; max-height: 50px;" />
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
            <v-icon icon="mdi-store-outline" size="20"></v-icon>
            <span>Mercado</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'orders' }]" @click="currentView = 'orders'">
            <v-icon icon="mdi-shopping-outline" size="20"></v-icon>
            <span>Pedidos</span>
          </button>
          <button :class="['nav-item', { active: currentView === 'tracking' }]" @click="currentView = 'tracking'">
            <v-icon icon="mdi-map-marker-path" size="20"></v-icon>
            <span>Seguimiento</span>
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
            <span class="user-name">Roberto Cáceres</span>
            <span class="user-role">Administrador</span>
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
                <th>Fecha de intervención</th>
                <th>Tipo de mantenimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="truck in trucks" :key="truck.id" @click="selectedTruck = truck"
                style="cursor: pointer; transition: background 0.2s;" class="hover:bg-gray-50">
                <td style="font-weight: 600; color: #4f46e5;">{{ truck.plate }}</td>
                <td>{{ truck.model }}</td>
                <td>{{ truck.km.toLocaleString() }} km</td>
                <td>{{ truck.maintenance }}</td>
                <td>
                  <v-chip :color="truck.maintenance_type === 'Preventivo/Programado' ? 'success' : 'warning'"
                    size="small" class="font-weight-medium">
                    {{ truck.maintenance_type }}
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

      <!-- Seguimiento View -->
      <div v-if="currentView === 'tracking'" class="view-container">
        <div class="two-column-grid">
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Mapa de Envíos en Tiempo Real</h2>
            </div>
            <div class="mock-map-large">
              <v-icon icon="mdi-map-marker-radius" size="64" color="primary"></v-icon>
              <p>Mapa Interactivo de Envíos (Google Maps / Mapbox)</p>
            </div>
          </div>
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Envíos Recientes</h2>
            </div>
            <div class="tracking-list">
              <div class="tracking-item" v-for="j in 5" :key="j">
                <div class="tracking-icon">
                  <v-icon icon="mdi-truck-delivery" color="white" size="20"></v-icon>
                </div>
                <div class="tracking-info">
                  <span class="tracking-id">#TRK-88{{ j }}9</span>
                  <span class="tracking-status">En tránsito hacia Destino {{ j }}</span>
                </div>
                <span class="tracking-time">Hace {{ j }}h</span>
              </div>
            </div>
          </div>
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
import { computed, ref } from 'vue'
import type { ApexOptions } from 'apexcharts'

// useTheme if needed for dark mode logic
import { useTheme } from 'vuetify'

const currentView = ref('dashboard')
const client = useSupabaseClient()
const router = useRouter()

const handleLogout = async () => {
  const { error } = await client.auth.signOut()
  if (error) {
    console.error('Error logging out:', error)
  }
  router.push('/')
}

const viewTitle = computed(() => {
  switch (currentView.value) {
    case 'dashboard': return 'Panel Principal'
    case 'document-analyzer': return 'Control de Camionetas'
    case 'marketplace': return 'Mercado'
    case 'orders': return 'Pedidos'
    case 'tracking': return 'Seguimiento'
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

const trucks = ref(Array.from({ length: 6 }, (_, i) => {
  // Generate History First
  const history = Array.from({ length: 5 }, (_, j) => ({
    date: `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`,
    type: Math.random() > 0.7 ? 'Preventivo/Programado' : 'Correctivo',
    driver: driversList[Math.floor(Math.random() * driversList.length)],
    activity: activitiesList[Math.floor(Math.random() * activitiesList.length)],
    observation: observationsList[Math.floor(Math.random() * observationsList.length)],
    daily_km: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
    daily_hours: Math.floor(Math.random() * (8 - 2 + 1)) + 2
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Calculate Totals based on history + base
  const totalKm = 10000 + history.reduce((acc, curr) => acc + curr.daily_km, 0)
  const totalHours = 100 + history.reduce((acc, curr) => acc + curr.daily_hours, 0)
  const lastMaintenance = history[0].date

  return {
    id: i + 1,
    plate: `ABC-${100 + i}`,
    brand: ['Toyota', 'Ford', 'Nissan', 'Mitsubishi', 'Chevrolet'][i % 5],
    model: ['Hilux', 'Ranger', 'Frontier', 'L200', 'Colorado'][i % 5],
    km: totalKm,
    maintenance: lastMaintenance,
    maintenance_type: history[0].type, // Reflect latest type
    hours: totalHours,
    // Detailed Fields
    year: 2020 + (i % 5),
    engine: ['2.4L Diesel', '3.2L TDCI', '2.5L Turbo', '2.4L MIVEC', '2.8L Duramax'][i % 5],
    transmission: (i % 2 === 0) ? 'Automática 6V' : 'Manual 5V',
    fuel_capacity: '80 Litros',
    load_capacity: '1000 Kg',
    status: 'Operativo',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    maintenance_history: history
  }
}))

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

</script>

<style src="@/assets/styles/dashboard.css"></style>
