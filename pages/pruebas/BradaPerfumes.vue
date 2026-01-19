<template>
  <div class="dashboard-container">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <img src="@/assets/img/soletanche_logo.jpg" alt="Soletanche Bachy"
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
            <v-icon icon="mdi-file-document-multiple-outline" size="20"></v-icon>
            <span>Analizador de documentos</span>
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
      <div v-if="currentView === 'dashboard'" class="dashboard-grid">
        <!-- 1. Stats Row -->
        <div class="stats-row">
          <!-- Card 1 -->
          <div class="stat-card">
            <div class="stat-header">
              <v-icon icon="mdi-account-outline" size="18"></v-icon>
              <span>Total clientes</span>
            </div>
            <div class="stat-value-container">
              <span class="stat-value">567,899</span>
              <span class="stat-trend trend-up">
                <v-icon icon="mdi-trending-up" size="14"></v-icon> 2,5%
              </span>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="stat-card">
            <div class="stat-header">
              <v-icon icon="mdi-currency-usd" size="18"></v-icon>
              <span>Ingresos totales</span>
            </div>
            <div class="stat-value-container">
              <span class="stat-value">$3,465 M</span>
              <span class="stat-trend trend-up">
                <v-icon icon="mdi-trending-up" size="14"></v-icon> 0,5%
              </span>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="stat-card">
            <div class="stat-header">
              <v-icon icon="mdi-shopping-outline" size="18"></v-icon>
              <span>Total pedidos</span>
            </div>
            <div class="stat-value-container">
              <span class="stat-value">1,136 M</span>
              <span class="stat-trend trend-down">
                <v-icon icon="mdi-trending-down" size="14"></v-icon> 0,2%
              </span>
            </div>
          </div>
          <!-- Card 4 -->
          <div class="stat-card">
            <div class="stat-header">
              <v-icon icon="mdi-package-variant-closed" size="18"></v-icon>
              <span>Total devoluciones</span>
            </div>
            <div class="stat-value-container">
              <span class="stat-value">1,789</span>
              <span class="stat-trend trend-up">
                <v-icon icon="mdi-trending-up" size="14"></v-icon> 0,12%
              </span>
            </div>
          </div>
          <!-- Card 5 (Add Data) -->
          <div class="stat-card add-data-card">
            <div class="add-icon-box">+</div>
            <span>Añadir datos</span>
          </div>
        </div>

        <!-- 2. Main Chart -->
        <div class="chart-card">
          <div class="chart-header">
            <h2 class="chart-title">Ventas de productos</h2>
            <div class="chart-legend">
              <div class="legend-item"><span class="dot bg-blue"></span> Margen bruto</div>
              <div class="legend-item"><span class="dot bg-orange"></span> Ingresos</div>
            </div>
          </div>
          <!-- Chart Container -->
          <client-only>
            <apexchart type="bar" height="300" :options="mainChartOptions" :series="mainChartSeries"></apexchart>
          </client-only>
        </div>

        <!-- 3. Bottom Section -->
        <div class="bottom-split">
          <!-- Product Categories Donut -->
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Ventas por categoría</h2>
            </div>
            <div class="donut-layout">
              <div class="donut-legend-grid">
                <div class="donut-legend-item"><span class="dot" style="background:#7e3af2"></span> Sala - 25%
                </div>
                <div class="donut-legend-item"><span class="dot" style="background:#7e3af2"></span> Oficina - 13%</div>
                <div class="donut-legend-item"><span class="dot" style="background:#7e3af2"></span> Cocina - 9%</div>
                <div class="donut-legend-item"><span class="dot" style="background:#f05252"></span> Comedor - 6%
                </div>
                <div class="donut-legend-item"><span class="dot" style="background:#0e9f6e"></span> Iluminación - 3%
                </div>
              </div>
              <client-only>
                <apexchart type="donut" width="220" :options="donutOptions" :series="donutSeries"></apexchart>
              </client-only>
              <div class="donut-legend-grid">
                <div class="donut-legend-item"><span class="dot" style="background:#1c64f2"></span> Niños - 17%</div>
                <div class="donut-legend-item"><span class="dot" style="background:#3b82f6"></span> Dormitorio - 12%
                </div>
                <div class="donut-legend-item"><span class="dot" style="background:#e02424"></span> Baño - 8%</div>
                <div class="donut-legend-item"><span class="dot" style="background:#f97316"></span> Decoración - 5%
                </div>
                <div class="donut-legend-item"><span class="dot" style="background:#10b981"></span> Exterior - 2%</div>
              </div>
            </div>
          </div>

          <!-- Countries List -->
          <div class="chart-card">
            <div class="chart-header">
              <h2 class="chart-title">Ventas por país</h2>
            </div>
            <div class="countries-list">
              <div class="country-item">
                <span class="dot" style="background:#10b981"></span>
                <span class="country-name">Polonia</span>
                <span class="country-percentage">19%</span>
              </div>
              <div class="country-item">
                <span class="dot" style="background:#10b981"></span>
                <span class="country-name">Austria</span>
                <span class="country-percentage">15%</span>
              </div>
              <div class="country-item">
                <span class="dot" style="background:#10b981"></span>
                <span class="country-name">España</span>
                <span class="country-percentage">13%</span>
              </div>
              <div class="country-item">
                <span class="dot" style="background:#10b981"></span>
                <span class="country-name">Rumania</span>
                <span class="country-percentage">12%</span>
              </div>
              <div class="country-item">
                <span class="dot" style="background:#10b981"></span>
                <span class="country-name">Francia</span>
                <span class="country-percentage">11%</span>
              </div>
              <div class="country-item">
                <span class="dot" style="background:#10b981"></span>
                <span class="country-name">Italia</span>
                <span class="country-percentage">11%</span>
              </div>
              <div class="country-item">
                <span class="dot" style="background:#10b981"></span>
                <span class="country-name">Alemania</span>
                <span class="country-percentage">10%</span>
              </div>
              <div class="country-item">
                <span class="dot" style="background:gray"></span>
                <span class="country-name">Ucrania</span>
                <span class="country-percentage">9%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Document Analyzer View -->
      <!-- Document Analyzer View -->
      <div v-if="currentView === 'document-analyzer'" class="document-analyzer-view">
        <!-- Upload Section -->
        <div class="upload-section" v-if="!reportReady && !isAnalyzing">
          <div class="drop-zone" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop">
            <v-icon icon="mdi-cloud-upload" size="48" color="primary"></v-icon>
            <div class="upload-text">
              <h3>Arrastra y suelta tu PDF aquí</h3>
              <p>o haz clic para seleccionar</p>
            </div>
            <input type="file" ref="fileInput" class="d-none" accept=".pdf" @change="handleFileUpload"
              style="display: none;" />
          </div>
          <v-btn color="primary" prepend-icon="mdi-camera" class="scan-btn">
            Escanear documento
          </v-btn>
        </div>

        <!-- Loading State -->
        <div v-if="isAnalyzing" class="d-flex flex-column align-center justify-center py-10" style="min-height: 400px;">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          <div class="mt-4 text-h6 text-grey-darken-1">Analizando documento con IA...</div>
        </div>

        <!-- Report Container (Mock Result) -->
        <div class="report-container" v-if="reportReady">
          <div class="d-flex justify-end mb-4">
            <v-btn color="primary" variant="text" prepend-icon="mdi-refresh" @click="resetAnalyzer">Analizar otro
              documento</v-btn>
          </div>
          <div class="report-header-banner">
            <h2>UNIVERSIDAD AUTÓNOMA - BLOQUE B</h2>
          </div>

          <div class="report-layout">
            <!-- Left Column -->
            <div class="report-column left-col">
              <!-- Map Placeholder -->
              <div class="map-card">
                <div class="mock-map">
                  <v-icon icon="mdi-map" size="64" color="grey"></v-icon>
                  <span>Plano de Ubicación</span>
                </div>
                <div class="site-photos">
                  <div class="photo-placeholder"><v-icon icon="mdi-image" /></div>
                </div>
              </div>
            </div>

            <!-- Center Column -->
            <div class="report-column center-col">
              <!-- Estructura -->
              <div class="report-card">
                <div class="card-title-box">Estructura Proyectada</div>
                <div class="card-content-text">
                  Se proyecta la construcción de una edificación de 5 niveles, área de la primera planta 480m2.
                  Estructura aporticada de concreto, luz máxima entre ejes de apoyos de L=11.45m. Nivel de piso
                  terminado del bloque +0.50m.
                  Carga trasmitida proporcionada por el solicitante: 1.0 kg/cm2 a más. Para el presente proyecto se
                  considera 2.5kg/cm2. Peso de la estructura 5000tn.
                </div>
              </div>

              <!-- Ensayos -->
              <div class="report-card">
                <div class="card-title-box">Ensayos de Refracción Sísmica</div>
                <div class="card-content-text">
                  Las líneas LS-1 y MASW-1 se realizaron a nivel de terreno del bloque B (entre nivel -0.11m y -0.15m).
                  <ul class="report-list">
                    <li>Una primera capa de intercalaciones de lentes de arcillas, arena limosa, con velocidad de ondas
                      Vp 321 a 380m/s y Vs 174 a 230m/s. Presenta una profundidad promedio de 0.0 a 5.0m.</li>
                    <li>Una segunda capa de arcillas, arena limosa muy húmeda a saturada, de velocidad de ondas Vp 802 a
                      898m/s y Vs 251 a 275m/s. Presenta una profundidad promedio de 5.0 a 12.0m.</li>
                  </ul>
                </div>
              </div>

              <!-- Napa -->
              <div class="report-card">
                <div class="card-title-box">Napa Freática</div>
                <div class="card-content-text">
                  La napa freática se ubicó a una profundidad media de 7.6m con filtración notoria en capas de arena
                  explicado por una mayor permeabilidad. La fuente de recarga del acuífero estaría relacionada a las
                  aguas infiltradas del río Chillón.
                </div>
              </div>

              <!-- Modulo Elasticidad -->
              <div class="report-card">
                <div class="card-title-box">Módulo de elasticidad</div>
                <div class="card-content-text">
                  <table class="report-table">
                    <tr>
                      <td>Para arenas</td>
                      <td>E(kg/cm2)=7.5+0.5*N60</td>
                    </tr>
                    <tr>
                      <td>Para arcillas y limos</td>
                      <td>E=5*N60</td>
                    </tr>
                  </table>
                  <div class="table-caption">Tabla 7: Modulo de Young correlación con N spt - SPT-2/SPT-4</div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="report-column right-col">
              <!-- Peso Especifico -->
              <div class="report-card">
                <div class="card-title-box">Peso Específico</div>
                <div class="card-content-text">
                  <div class="table-caption">Tabla 10: Densidades del suelo</div>
                  <table class="report-table compact">
                    <thead>
                      <tr>
                        <th>Calicata</th>
                        <th>Prof.(m)</th>
                        <th>SUCS</th>
                        <th>Densidad Húmeda</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>C-1</td>
                        <td>0.1-1.5</td>
                        <td>CL</td>
                        <td>1.74</td>
                      </tr>
                      <tr>
                        <td>C-1</td>
                        <td>1.5-3.0</td>
                        <td>CL</td>
                        <td>1.71</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- condiciones -->
              <div class="report-card">
                <div class="card-title-box">Condiciones del suelo de la cimentación</div>
                <div class="card-content-text">
                  Los suelos de cimentación del bloque B, están conformados por capas horizontales
                  predominantemente arcillosos inorgánicos de baja plasticidad(CL) y algunas capas de alta
                  plasticidad(CH) de consistencia firme, se evidencian inoculaciones rígidas en las arcillas.
                </div>
              </div>

              <!-- Profundidad -->
              <div class="report-card">
                <div class="card-title-box">Profundidad de cimentación</div>
                <div class="card-content-text highlight-yellow">
                  Para cimentación con platea se recomienda una profundidad mínima de Df.min=1.2m respecto
                  al nivel del terreno actual(-0.11m), apoyadas en toda su extensión sobre relleno controlado.
                </div>
              </div>

              <!-- Licuacion -->
              <div class="report-card">
                <div class="card-title-box">Licuación de suelos</div>
                <div class="card-content-text">
                  La zona de estudio no presenta las condiciones para problemas de potencial de licuación de
                  suelos. Suelos arcillosos no licúan.
                </div>
              </div>

              <!-- Quimico -->
              <div class="report-card">
                <div class="card-title-box">Análisis químico</div>
                <div class="card-content-text">
                  El suelo por contenidos de sales solubles totales se tiene cantidades insuficientes para producir
                  problemas de lixiviación.
                </div>
              </div>
            </div>

            <!-- Far Right Column (Criterios) -->
            <div class="report-column far-right-col">
              <div class="report-card">
                <div class="card-title-box">Criterios considerados en los cálculos</div>
                <div class="card-content-text">
                  En estricto no se cumple consolidación en suelos secos o de muy baja humedad, el
                  proceso de consolidación conlleva la expulsión de agua ocasionando reducción del
                  volumen esto se traduce en asentamiento.
                  <br><br>
                  Se emplea cargas admisibles y cargas trasmitidas. La carga trasmitida es proporcionada
                  por el solicitante 2.5kg/cm a más fijándose en 2.6kg/cm2.
                  <div class="highlight-red-box">
                    Requiere mejoramiento para incremento de capacidad de carga y control de asentamiento.
                  </div>
                  <br>
                  Debido al elevado asentamiento, para cimentación con platea se plantea un mejoramiento de
                  suelo que deberá resolver lo siguiente:
                  <ul>
                    <li>Reducción del asentamiento a valores tolerables para la estructura: menor a 5.00cm.</li>
                  </ul>
                </div>
              </div>
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
    case 'document-analyzer': return 'Analizador de documentos'
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

const mainChartSeries = [
  { name: 'Margen bruto', data: [25, 30, 20, 32, 53, 53, 14, 32, 25, 45, 32, 58] },
  { name: 'Ingresos', data: [37, 45, 43, 52, 18, 58, 37, 42, 31, 48, 45, 58] }
]

const mainChartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif'
  },
  colors: ['#4f46e5', '#f97316'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '40%',
      borderRadius: 4,
      borderRadiusApplication: 'end'
    }
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 5, colors: ['transparent'] },
  xaxis: {
    categories: ['1 Jul', '2 Jul', '3 Jul', '4 Jul', '5 Jul', '6 Jul', '7 Jul', '8 Jul', '9 Jul', '10 Jul', '11 Jul', '12 Jul'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#9ca3af', fontSize: '12px' } }
  },
  yaxis: {
    labels: { style: { colors: '#9ca3af', fontSize: '12px' }, formatter: (val) => val + ' K' }
  },
  grid: {
    borderColor: '#f3f4f6',
    strokeDashArray: 4,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } }
  },
  legend: { show: false },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      const val = series[seriesIndex][dataPointIndex]
      return `
         <div style="background: white; padding: 10px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Margen bruto</div>
            <div style="font-weight: 700; font-size: 16px; color: #111827;">$52,187 <span style="font-size: 12px; color: #10b981; margin-left: 4px;">↗ 2,5%</span></div>
         </div>
       `
    }
  }
}))

const donutSeries = [25, 17, 13, 12, 9, 8, 6, 5, 3, 2]
const donutOptions = computed<ApexOptions>(() => ({
  colors: ['#7e3af2', '#1c64f2', '#7e3af2', '#1c64f2', '#7e3af2', '#e02424', '#f97316', '#10b981', '#10b981', '#9ca3af'],
  chart: { type: 'donut' },
  labels: ['Sala', 'Niños', 'Oficina', 'Dormitorio', 'Cocina', 'Baño', 'Comedor', 'Decoración', 'Iluminación', 'Exterior'],
  dataLabels: { enabled: false },
  legend: { show: false },
  plotOptions: {
    pie: {
      donut: {
        size: '65%'
      }
    }
  },
  stroke: { show: false }
}))

</script>

<style src="@/assets/styles/dashboard.css"></style>
