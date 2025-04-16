<template>
  <div id="app">
    <Header />
    
    <router-view />
    
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../pages/Header.vue'; 
import Footer from '../pages/Footer.vue'; 

export default {
  components: {
    Header,
    Footer
  },
  setup() {
    const isLoading = ref(true);
    const router = useRouter();

    const inactivityTimeout = 60 * 60 * 1000; 
    let timeoutId;

    const resetInactivityTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.warn("⏳ Temps d'inactivité écoulé, déconnexion !");
        localStorage.removeItem("token");
      }, inactivityTimeout);
    };

    onMounted(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("🚫 Aucun token trouvé, redirection vers /connexion");
        isLoading.value = false;
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expTime) {
          console.warn("⏳ Token expiré après 1h, suppression et redirection !");
          localStorage.removeItem("token");
          router.push("/connexion");
          isLoading.value = false;
          return;
        }
      } catch (error) {
        console.error("❌ Erreur lors du décodage du token :", error);
        localStorage.removeItem("token");
        router.push("/connexion");
        isLoading.value = false;
        return;
      }

      document.addEventListener("mousemove", resetInactivityTimer);
      document.addEventListener("keydown", resetInactivityTimer);
      resetInactivityTimer();

      isLoading.value = false;
    });

    return { isLoading };
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}


</style>
