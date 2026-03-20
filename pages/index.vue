<template>
  <div class="login-container">
    <!-- Background Image -->
    <div class="bg-image"></div>

    <!-- Floating Triangles Animation -->
    <div class="triangles-container">
      <div v-for="n in 15" :key="n" class="triangle"></div>
    </div>

    <!-- Login Card -->
    <div class="login-content">
      <div class="login-card">
        <div class="brand-header text-center mb-6">
          <div class="logo-circle">
            <v-img src="@/assets/img/FLOWLOGO.png" width="80" height="auto" class="mx-auto" contain />
          </div>
        </div>

        <h2 class="text-center text-white mb-2 font-weight-bold section-title">Bienvenido de nuevo</h2>
        <p class="text-center text-medium-emphasis mb-8 subtitle-text">Por favor ingresa tus detalles para iniciar
          sesión.</p>

        <VForm @submit.prevent="submit" class="login-form">
          <div class="mb-4 input-group">
            <label class="input-label">Correo Electrónico</label>
            <VTextField v-model="email" placeholder="Ingresa tu correo..." variant="plain" bg-color="transparent"
              class="custom-input futuristic-input" hide-details="auto" :rules="[ruleRequired, ruleEmail]" rounded="lg"
              density="comfortable"></VTextField>
          </div>

          <div class="mb-6 input-group">
            <label class="input-label">Contraseña <span style="color: #ff5252">*</span></label>
            <VTextField v-model="password" placeholder="Contraseña...123" type="password" variant="plain"
              bg-color="transparent" class="custom-input futuristic-input" hide-details="auto"
              :rules="[ruleRequired, rulePassLen]" rounded="lg" density="comfortable">
              <template v-slot:append-inner>
                <v-icon icon="mdi-eye-off" size="small" color="rgba(255,255,255,0.5)"></v-icon>
              </template>
            </VTextField>
          </div>

          <VBtn type="submit" block height="50" class="login-btn mb-6" :loading="loading" color="#1a1f2e">
            Iniciar sesión
          </VBtn>

          <div class="d-flex justify-start align-center mb-6 remember-row">
            <v-checkbox v-model="rememberMe" label="Recordarme" hide-details density="compact" color="white"
              class="custom-checkbox"></v-checkbox>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { isSuperAdmin, getDashboardPathByCompanyId } from '@/utils/permissions';

const client = useSupabaseClient();
const router = useRouter();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);
const errorMsg = ref("");

const ruleRequired = (v) => !!v || 'Requerido';
const ruleEmail = (v) => /.+@.+\..+/.test(v) || 'Email inválido';
const rulePassLen = (v) => (v && v.length >= 6) || 'Mínimo 6 caracteres';

const submit = async () => {
  loading.value = true;
  errorMsg.value = "";

  try {
    let finalSession = null;
    let authSession = null;

    // 1. Intentar Autenticación Nativa (Supabase Auth)
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (!authError && authData?.user) {
      console.log("Login nativo exitoso");
      authSession = authData.user;

      // Obtener datos adicionales del perfil si es necesario
      const { data: rpcData } = await client.rpc('login_dashboard', {
        p_email: email.value,
        p_password: password.value
      });

      if (rpcData) {
        finalSession = rpcData;
      } else {
        // Fallback perfil
        const { data: profileData } = await client
          .from('dashboardlogin')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        finalSession = {
          id: authData.user.id,
          email: authData.user.email,
          full_name: profileData?.full_name || profileData?.nombre || 'Usuario Verificado',
          role: profileData?.role || 'authenticated',
          company_id: profileData?.company_id
        };
      }
    } else {
      console.log("Login nativo falló, intentando RPC legacy...");

      // 2. Si falla Auth nativo, intentar validar con el sistema antiguo (RPC) O API
      let legacyUser = null;

      // Intentar primero con RPC (por compatibilidad histórica estricta)
      const { data: rpcResult, error: rpcError } = await client.rpc('login_dashboard', {
        p_email: email.value,
        p_password: password.value
      });

      if (rpcResult) {
        legacyUser = rpcResult;
      } else {
        console.log("RPC falló o devolvió null. Intentando verificación API Manual (bcrypt)...");
        try {
          const apiRes = await $fetch('/api/auth/verify-legacy', {
            method: 'POST',
            body: { email: email.value, password: password.value }
          });

          if (apiRes && apiRes.success && apiRes.user) {
            console.log("Verificación API manual exitosa");
            legacyUser = apiRes.user;
          }
        } catch (errApi) {
          console.error("API Legacy check failed:", errApi);
        }
      }

      if (legacyUser) {
        console.log("Login legacy exitoso. Intentando descripción finalSession...");
        finalSession = legacyUser;

        // 3. MIGRACION AUTOMÁTICA (Auto-SignUp)
        const { data: signUpData, error: signUpError } = await client.auth.signUp({
          email: email.value,
          password: password.value,
          options: {
            data: {
              full_name: legacyUser.nombre || legacyUser.full_name
            }
          }
        });

        if (!signUpError && signUpData?.session) {
          console.log("Auto-migration to Supabase Auth success");
          await client.auth.setSession(signUpData.session);
        } else {
          console.warn("Auto-migration skipped or failed:", signUpError);
        }

      } else {
        throw new Error("Credenciales incorrectas");
      }
    }

    if (finalSession) {
      // Ensure company_id and role are loaded if missing (Safety check for RPC)
      if ((!finalSession.company_id || !finalSession.role) && finalSession.email) {
        const { data: profileData } = await client
          .from('dashboardlogin')
          .select('company_id, role')
          .eq('email', finalSession.email)
          .single();

        if (profileData) {
          console.log("Profile data fetched separately:", profileData);
          if (!finalSession.company_id) finalSession.company_id = profileData.company_id;
          if (!finalSession.role) finalSession.role = profileData.role;
        }
      }

      // Login exitoso
      const userSession = useCookie('dashboard_session');
      userSession.value = finalSession;

      // Redirigir según el correo y ROL
      const userRole = finalSession?.role?.toLowerCase();
      const companyId = finalSession?.company_id;

      console.log("Login User Role:", userRole);
      console.log("Login Company ID:", companyId);

      // 1. SUPERADMIN -> Hub (Access to everything)
      if (userRole === 'superadmin') {
        console.log("Redirecting Superadmin to Hub");
        router.push('/admin-hub');
        return;
      }

      // 2. ADMIN or AGENT -> Specific Company Dashboard
      if (companyId && (userRole === 'admin' || userRole === 'agent' || userRole === 'agente')) {
        const targetPath = getDashboardPathByCompanyId(companyId)
        if (targetPath && targetPath !== '/') {
          console.log(`Redirecting ${userRole} to ${targetPath}`);
          router.push(targetPath)
          return
        }
      }

      // 3. Fallback General
      alert("No se encontró un dashboard asignado a este usuario.");

    } else {
      alert("No se pudo iniciar sesión. Verifique sus credenciales.");
    }

  } catch (e) {
    console.error("Login Error:", e);
    let msg = "Error de inicio de sesión";
    if (e.message.includes("Invalid login credentials")) msg = "Credenciales inválidas";
    else if (e.message) msg = e.message;

    alert(msg);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* =======================================================================
   FUTURISTIC LOGIN STYLES
   matches user request: flowfondo.jpg, FLOWLOGO.png, animated triangles
   ======================================================================= */

.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  /* Fallback */
}

/* Background Image Layer */
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/flowfondo.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

/* Triangles Container */
.triangles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  /* Above bg, below card */
  pointer-events: none;
}

/* Triangle Shape */
.triangle {
  position: absolute;
  bottom: -100px;
  /* Start below screen or random */
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid rgba(255, 255, 255, 0.1);
  animation: floatSideToSide 15s infinite linear;
  opacity: 0.3;
}

/* Specific triangles randomization (simulated with CSS nth-child) */
.triangle:nth-child(1) {
  left: 10%;
  width: 0;
  border-width: 0 15px 30px 15px;
  animation-duration: 12s;
  animation-delay: 0s;
}

.triangle:nth-child(2) {
  left: 20%;
  width: 0;
  border-width: 0 25px 50px 25px;
  animation-duration: 18s;
  animation-delay: -5s;
  border-bottom-color: rgba(69, 137, 245, 0.2);
}

.triangle:nth-child(3) {
  left: 30%;
  width: 0;
  border-width: 0 10px 20px 10px;
  animation-duration: 10s;
  animation-delay: -2s;
}

.triangle:nth-child(4) {
  left: 40%;
  width: 0;
  border-width: 0 30px 60px 30px;
  animation-duration: 20s;
  animation-delay: -8s;
  border-bottom-color: rgba(139, 92, 246, 0.2);
}

.triangle:nth-child(5) {
  left: 50%;
  width: 0;
  border-width: 0 12px 24px 12px;
  animation-duration: 14s;
  animation-delay: -1s;
}

.triangle:nth-child(6) {
  left: 60%;
  width: 0;
  border-width: 0 20px 40px 20px;
  animation-duration: 16s;
  animation-delay: -6s;
  border-bottom-color: rgba(236, 72, 153, 0.15);
}

.triangle:nth-child(7) {
  left: 70%;
  width: 0;
  border-width: 0 18px 36px 18px;
  animation-duration: 13s;
  animation-delay: -3s;
}

.triangle:nth-child(8) {
  left: 80%;
  width: 0;
  border-width: 0 22px 44px 22px;
  animation-duration: 19s;
  animation-delay: -9s;
}

.triangle:nth-child(9) {
  left: 90%;
  width: 0;
  border-width: 0 16px 32px 16px;
  animation-duration: 11s;
  animation-delay: -4s;
  border-bottom-color: rgba(59, 130, 246, 0.2);
}

.triangle:nth-child(10) {
  left: 15%;
  width: 0;
  border-width: 0 28px 56px 28px;
  animation-duration: 22s;
  animation-delay: -10s;
}

.triangle:nth-child(11) {
  left: 85%;
  width: 0;
  border-width: 0 14px 28px 14px;
  animation-duration: 15s;
  animation-delay: -2s;
}

.triangle:nth-child(12) {
  left: 5%;
  width: 0;
  border-width: 0 35px 70px 35px;
  animation-duration: 25s;
  animation-delay: -7s;
  border-bottom-color: rgba(99, 102, 241, 0.1);
}

.triangle:nth-child(13) {
  left: 95%;
  width: 0;
  border-width: 0 10px 20px 10px;
  animation-duration: 12s;
  animation-delay: -1s;
}

.triangle:nth-child(14) {
  left: 25%;
  width: 0;
  border-width: 0 20px 40px 20px;
  animation-duration: 17s;
  animation-delay: -5s;
}

.triangle:nth-child(15) {
  left: 75%;
  width: 0;
  border-width: 0 15px 30px 15px;
  animation-duration: 14s;
  animation-delay: -3s;
}

/* The Animation: Move side to side and float up slightly */
@keyframes floatSideToSide {
  0% {
    transform: translate(0, 110vh) rotate(0deg);
    opacity: 0;
  }

  20% {
    opacity: 0.6;
  }

  50% {
    transform: translate(100px, 50vh) rotate(180deg);
  }

  80% {
    opacity: 0.6;
  }

  100% {
    transform: translate(-50px, -10vh) rotate(360deg);
    opacity: 0;
  }
}

/* Login Card (Glassmorphism) */
.login-content {
  z-index: 10;
  width: 100%;
  max-width: 420px;
  padding: 1rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Logo Area */
.logo-circle {
  width: 90px;
  /* Slightly larger */
  height: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  /* Removed background */
  border: none;
  /* Removed border */
  box-shadow: none;
  /* Removed shadow */
}

/* Texts */
.section-title {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.5px;
}

.subtitle-text {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 0.9rem;
}

/* Inputs */
.input-label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* Force Vuetify internals to be transparent so only our border/bg shows */
.futuristic-input :deep(.v-field) {
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0) !important;
  border: 1px solid rgba(255, 255, 255, 0) !important;
  /* Managed border */
  color: white !important;
  transition: all 0.3s ease;
  box-shadow: none !important;
}

/* Nuke all internal borders/backgrounds */
.futuristic-input :deep(.v-field__outline),
.futuristic-input :deep(.v-field__loader),
.futuristic-input :deep(.v-field__overlay),
.futuristic-input :deep(.v-field__background),
.futuristic-input :deep(.v-field__shadow) {
  display: none !important;
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  opacity: 0 !important;
}

.futuristic-input :deep(.v-field:hover),
.futuristic-input :deep(.v-field--focused) {
  background: rgba(255, 0, 0, 0) !important;
  border-color: rgba(255, 255, 255, 0);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0) !important;
}

.futuristic-input :deep(input) {
  color: white !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

.futuristic-input :deep(input::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Checkbox */
.custom-checkbox :deep(.v-label) {
  color: rgba(255, 255, 255, 0.8) !important;
  opacity: 1;
}

/* Button */
.login-btn {
  background: #1a1f2e !important;
  /* Dark simplistic button like reference */
  color: white !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  border-radius: 12px;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-btn:hover {
  background: #252b40 !important;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

/* Footer Link */
.footer-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}

.register-link {
  color: white;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
