<template>
  <div class="login-page-wrapper">
    <!-- Glass Card -->
    <div class="glass-card">
      <div class="text-center mb-6">
        <!-- Logo Container -->
        <div class="logo-container mb-4">
          <img src="@/assets/img/FLOWLOGO.png" alt="Flow Logo" class="flow-logo" />
        </div>

        <h1 class="welcome-title">Bienvenido de nuevo</h1>
        <p class="welcome-subtitle">
          Por favor ingresa tus detalles para iniciar sesión.
        </p>
      </div>



      <form @submit.prevent="submit">
        <!-- Fields -->
        <div class="mb-4">
          <label class="input-label">Correo Electrónico</label>
          <input type="email" v-model="email" placeholder="Ingresa tu correo..." class="custom-input" required />
        </div>

        <div class="mb-2">
          <label class="input-label">Contraseña</label>
          <div class="password-wrapper">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Contraseña...123"
              class="custom-input" required />
            <v-icon :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" size="18" class="password-icon" color="grey"
              @click="showPassword = !showPassword"></v-icon>
          </div>
        </div>

        <!-- Options Row -->
        <div class="d-flex justify-space-between align-center mb-6 options-row">
          <div class="d-flex align-center gap-2">
            <input type="checkbox" id="remember" class="custom-checkbox" v-model="rememberMe" />
            <label for="remember" class="option-text">Recordarme</label>
          </div>
          <nuxt-link to="/reset-password" class="forgot-link">¿Olvidaste tu contraseña?</nuxt-link>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="signin-btn mb-4" :disabled="loading">
          <span v-if="loading">Cargando...</span>
          <span v-else>Iniciar sesión</span>
        </button>
      </form>

      <div class="text-center footer-text">
        ¿No tienes una cuenta? <nuxt-link to="/signup" class="signup-link">Regístrate</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const client = useSupabaseClient();
const router = useRouter();

// UI State
const showPassword = ref(false);
const rememberMe = ref(false);

// Form State
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

// Validation helper (optional if using simple inputs, but good for feedback)
const ruleRequired = (v) => !!v || 'Este campo es requerido';
const ruleEmail = (v) => /.+@.+\..+/.test(v) || 'Email inválido';
const rulePassLen = (v) => (v && v.length >= 6) || 'Mínimo 6 caracteres';

const submit = async () => {
  loading.value = true;
  errorMsg.value = "";

  try {
    let finalSession = null;
    let authSession = null;

    // 1. Attempt Native Auth
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (!authError && authData?.user) {
      console.log("Login nativo exitoso");
      authSession = authData.user;

      // Get profile logic
      const { data: rpcData } = await client.rpc('login_dashboard', {
        p_email: email.value,
        p_password: password.value
      });

      if (rpcData) {
        finalSession = rpcData;
      } else {
        const { data: profileData } = await client
          .from('dashboardlogin')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        finalSession = {
          id: authData.user.id,
          email: authData.user.email,
          full_name: profileData?.full_name || profileData?.nombre || 'Usuario Verificado',
          role: profileData?.role || 'authenticated'
        };
      }
    } else {
      console.log("Login nativo falló, intentando RPC legacy...");
      const { data: rpcData, error: rpcError } = await client.rpc('login_dashboard', {
        p_email: email.value,
        p_password: password.value
      });

      if (rpcData) {
        console.log("RPC legacy exitoso.");
        finalSession = rpcData;
        // Attempt auto-migration logic if needed (simplified here)
        const { data: signUpData, error: signUpError } = await client.auth.signUp({
          email: email.value,
          password: password.value,
          options: { data: { full_name: rpcData.nombre || rpcData.full_name } }
        });
        if (!signUpError && signUpData?.session) {
          await client.auth.setSession(signUpData.session);
        }
      } else {
        throw new Error("Credenciales incorrectas");
      }
    }

    if (finalSession) {
      const userSession = useCookie('dashboard_session');
      userSession.value = finalSession;

      const emailLower = email.value.toLowerCase();
      if (emailLower === "bazanjuanpa@gmail.com") {
        router.push('/instancias/Grijalba');
      } else if (emailLower === "elroby75@hotmail.com") {
        router.push('/instancias/Soletanche');
      } else {
        router.push('/instancias/AlefCompany');
      }
    } else {
      alert("No se pudo iniciar sesión. Verifique sus credenciales.");
    }

  } catch (e) {
    console.error("Login Error:", e);
    let msg = "Error de inicio de sesión";
    if (e.message && e.message.includes("Invalid login credentials")) msg = "Credenciales inválidas";
    else if (e.message) msg = e.message;
    alert(msg);
  } finally {
    loading.value = false;
  }
};
</script>
