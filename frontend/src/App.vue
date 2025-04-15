<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else  id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
</script>
<style scoped>

</style>
