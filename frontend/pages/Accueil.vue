<template>
    <div class="search-container">
      <h2>Liste des Motos</h2>
  
      <!-- Barre de recherche -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Recherche un véhicule..."
          @focus="showSuggestions = true"
          @blur="hideSuggestions"
          @input="updateSuggestions"
        />
      </div>
  
      <!-- Boîte de suggestions -->
      <div v-if="showSuggestions" class="suggestions-box">
        <ul v-if="filteredSuggestions.length">
          <li
            v-for="vehicule in filteredSuggestions"
            :key="vehicule.id"
            @mousedown="goToVehiculeDetail(vehicule.id)"
          >
            <span>{{ vehicule.nom }}</span>
          </li>
        </ul>
        <p v-else class="no-results">Aucun véhicule trouvé</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        vehicules: [],
        searchQuery: "",
        showSuggestions: false,
        filteredSuggestions: [],
      };
    },
    created() {
      this.fetchVehicules();  // Charger les données initiales
    },
    watch: {
      searchQuery(newQuery) {
        if (newQuery.length > 2) {
          this.updateSuggestions();  // Mettre à jour les suggestions avec la recherche
        } else {
          this.filteredSuggestions = [];  // Vider les suggestions si moins de 3 caractères
        }
      },
    },
    methods: {
      // Méthode pour récupérer les véhicules via l'API
      async fetchVehicules() {
        try {
          const response = await fetch("http://localhost:3000/vehicule");
          if (!response.ok) {
            throw new Error("Erreur serveur : " + response.status);
          }
          this.vehicules = await response.json();
        } catch (error) {
          console.error("Erreur lors de la récupération des véhicules", error);
        }
      },
      // Met à jour les suggestions en fonction du texte recherché
      updateSuggestions() {
        if (this.searchQuery.length > 0) {
          this.filteredSuggestions = this.vehicules.filter((vehicule) =>
            vehicule.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
      },
      hideSuggestions() {
        setTimeout(() => {
          this.showSuggestions = false;
        }, 200);
      },
      goToVehiculeDetail(id) {
        this.$router.push(`/vehiculedetail/${id}`);
        this.showSuggestions = false;
      },
    },
  };
  </script>

  

<style scoped>
.home-page {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.search-section {
    margin-bottom: 30px;
    text-align: center;
}

.search-box {
    position: relative;
    display: inline-block;
    width: 100%;
}

.search-bar input {
    padding: 10px;
    width: 300px;
    border-radius: 5px;
    border: 2px solid #f4b400;
    font-size: 16px;
}

.suggestions-box {
    position: absolute;
    width: 100%;
    background-color: white;
    border: 2px solid #f4b400;
    border-top: none;
    z-index: 1;
}

.suggestions-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.suggestions-box li {
    padding: 10px;
    cursor: pointer;
}

.suggestions-box li:hover {
    background-color: #f4b400;
    color: white;
}

.no-results {
    padding: 10px;
    color: #777;
}

.vehicules-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.vehicule-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    text-align: center;
}

.vehicule-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.vehicule-info h3 {
    font-size: 18px;
    margin: 10px 0;
}

.vehicule-description {
    font-size: 14px;
    color: #555;
}

.vehicule-price {
    font-size: 16px;
    font-weight: bold;
    color: #f4b400;
    margin: 10px 0;
}

button {
    background-color: #f4b400;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 5px;
}

button:hover {
    background-color: #ffcc00;
}

.about-us {
    margin: 40px 0;
    text-align: center;
}

.about-us h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.contact-link {
    text-align: center;
    margin-top: 30px;
}

.contact-link a {
    color: #f4b400;
    font-weight: bold;
    text-decoration: underline;
}
</style>