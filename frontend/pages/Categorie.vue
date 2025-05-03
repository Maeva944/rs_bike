<template>
      <div class="filter-container">
        <label for="brand-select">Filtrer par Marque:</label>
        <select v-model="selectedBrand" @change="fetchVehicules">
          <option value="">-- Toutes les marques --</option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.nom }}</option>
        </select>
      </div>
  
      <div class="filter-container">
        <label for="type-select">Filtrer par Type:</label>
        <select v-model="selectedType" @change="fetchVehicules">
          <option value="">-- Tous les types --</option>
          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.nom }}</option>
        </select>
      </div>

      <button @click="reloadFilter">Réinitialisé les filtres</button>
      
      <section class="product-container2">
        <div v-if="vehicules.length === 0" class="no-vehicles">Aucun véhicule trouvé pour cette catégorie avec ces filtres.</div>
        <article v-else v-for="vehicule in vehicules" :key="vehicule.id" class="vehicle-card2" @click="goToVehiculeDetail(vehicule.id)">
          <img :src="vehicule.photo" alt="Vehicle image" class="vehicle-photo2" />
            <div class="vehicle-info2">
              <h3>{{ vehicule.nom }}</h3>
              <p class="brand">Marque: {{ vehicule.marque }}</p>
              <p class="type">Type: {{ vehicule.type_vehicule }}</p>
              <p class="price">{{ vehicule.prix }} €</p>
            </div>
        </article>
      </section>
      <!--
      <div class="product-container">
        <div v-if="vehicules.length === 0" class="no-vehicles">Aucun véhicule trouvé pour cette catégorie avec ces filtres.</div>
        <div v-else>
          <div v-for="vehicule in vehicules" :key="vehicule.id" class="vehicle-card" @click="goToVehiculeDetail(vehicule.id)">
            <img :src="vehicule.photo" alt="Vehicle image" class="vehicle-photo" />
            <div class="vehicle-info">
              <h3>{{ vehicule.nom }}</h3>
              <p class="brand">Marque: {{ vehicule.marque }}</p>
              <p class="type">Type: {{ vehicule.type_vehicule }}</p>
              <p class="price">{{ vehicule.prix }} €</p>
            </div>
          </div>
        </div>
      </div>-->
  </template>
  
  
<script>
export default {
  data() {
    return {
      brands: [],
      types: [],
      vehicules: [],
      selectedBrand: "",
      selectedType: "",
      categoryId: this.$route.params.id,
    };
  },
  created() {
    this.fetchBrands();
    this.fetchTypes();
    this.fetchVehicules(); 
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      this.categoryId = to.params.id;
      this.fetchVehicules();
    }
    next(); 
  },
    methods: {
    async fetchBrands() {
      try {
        const response = await fetch("http://localhost:3000/marque", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("Données des marques:", data);
        this.brands = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des marques", error);
      }
    },
    async fetchTypes() {
      try {
        const response = await fetch("http://localhost:3000/typevehicule", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("Données des types:", data);
        this.types = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des types", error);
      }
    },
    async fetchVehicules() {
  try {
    let apiUrl = `http://localhost:3000/categorie/vehicule/categorie/${this.categoryId}?`;

    if (this.selectedBrand) {
      apiUrl += `id_marque=${this.selectedBrand}&`;
    }
    if (this.selectedType) {
      apiUrl += `id_type=${this.selectedType}&`;
    }

    if (apiUrl.endsWith("&")) {
      apiUrl = apiUrl.slice(0, -1);
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log("Données des véhicules:", data);
    this.vehicules = data;

  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules", error);
  }
  },
  goToVehiculeDetail(id) {
       this.$router.push(`/vehiculedetail/${id}`);
  },
  reloadFilter(){
    this.selectedBrand = "",
    this.selectedType = "",
    this.fetchVehicules();
  }

  

  },
};
</script>

  
<style scoped>

.filter-container {
  padding: 1% 2%;
  width: 100%;
}



.product-container2{
  display: flex;
  flex-wrap: wrap;
  padding: 1%;
}


.vehicle-card2{
  width: 25%;
  padding: 2%;
  cursor: pointer;
}

.vehicle-photo2{
  width: 100%;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.brand, .type {
  font-size: 14px;
  margin-bottom: 5px;
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #f1c40f;
}

</style>
  
  
  