<template>
    <div>
      <div class="filter-container">
        <label for="brand-select">Filtrer par Marque:</label>
        <select v-model="selectedBrand" @change="fetchVehicles">
          <option value="">-- Toutes les marques --</option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.nom }}</option>
        </select>
      </div>
  
      <div class="filter-container">
        <label for="type-select">Filtrer par Type:</label>
        <select v-model="selectedType" @change="fetchVehicles">
          <option value="">-- Tous les types --</option>
          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.nom }}</option>
        </select>
      </div>
  
      <div class="product-container">
        <div v-if="vehicles.length === 0" class="no-vehicles">Aucun véhicule trouvé pour cette catégorie avec ces filtres.</div>
        <div v-else>
          <div v-for="vehicle in vehicles" :key="vehicle.id" class="vehicle-card" @click="goToVehicleDetail(vehicle.id)">
            <img :src="vehicle.photo" alt="Vehicle image" class="vehicle-photo" />
            <div class="vehicle-info">
              <h3>{{ vehicle.nom }}</h3>
              <p class="brand">Marque: {{ vehicle.marque }}</p>
              <p class="type">Type: {{ vehicle.type }}</p>
              <p class="price">{{ vehicle.prix }} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
<script>
export default {
  data() {
    return {
      brands: [],
      types: [],
      vehicles: [],
      selectedBrand: "",
      selectedType: "",
      categoryId: this.$route.params.id,
    };
  },
  created() {
    this.fetchBrands();
    this.fetchTypes();
    this.fetchVehicles();
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
    reloading(){
        this.fetchVehicles();
    },
    async fetchVehicles() {
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
    this.vehicles = data;
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules", error);
  }
}

  },
};
</script>

  
<style scoped>
.filter-container {
  margin-bottom: 20px;
}

.filter-container label {
  margin-right: 10px;
}

.filter-container select {
  margin-right: 20px;
}

.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.no-vehicles {
  font-size: 18px;
  color: #888;
  text-align: center;
}

.vehicle-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #f9f9f9;
  max-width: 250px;
  margin: 0 auto;
}

.vehicle-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.vehicle-photo {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}

.vehicle-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  color: #f1c40f; /* Jaune */
}

</style>
  
  
  