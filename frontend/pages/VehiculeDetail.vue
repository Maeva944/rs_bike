<template>
    <div v-if="vehicle" class="vehicle-detail-container">
      <div class="vehicle-image">
        <img :src="vehicle.photo" alt="Vehicle image" class="vehicle-photo" />
      </div>
  
      <div class="vehicle-info">
        <h1>{{ vehicle.nom }}</h1>
        <div class="vehicle-characteristics">
          <p><strong>Marque:</strong> {{ vehicle.marque }}</p>
          <p><strong>Type:</strong> {{ vehicle.type }}</p>
          <p><strong>Cylindre:</strong> {{ vehicle.cylindre }} cm³</p>
          <p><strong>Moteur:</strong> {{ vehicle.moteur }}</p>
          <p><strong>Niveau de bruit:</strong> {{ vehicle.niveau_de_bruit }} dB</p>
          <p><strong>Puissance maximale:</strong> {{ vehicle.puissance_maxi }}</p>
          <p><strong>Couleur:</strong> {{ vehicle.couleur }}</p>
          <p><strong>Prix:</strong> {{ vehicle.prix }} €</p>
        </div>
      </div>
    </div>
  
    <!-- Message d'erreur si l'API échoue -->
    <div v-else>
      <p>Véhicule non trouvé ou erreur dans le chargement des données.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        vehicle: null,
      };
    },
    created() {
      this.fetchVehicleDetails();
    },
    methods: {
      async fetchVehicleDetails() {
        const vehicleId = this.$route.params.id;
        try {
          const response = await fetch(`http://localhost:3000/vehicule/vehiculedetail/${vehicleId}`);
          
          if (!response.ok) {
            throw new Error('Véhicule non trouvé');
          }
  
          const data = await response.json();
          
          if (data.error) {
            console.error(data.error);
            return;
          }
  
          this.vehicle = data;  // Assigner les données récupérées à `vehicle`
        } catch (error) {
          console.error("Erreur lors de la récupération du véhicule:", error);
          this.vehicle = null;  // Assurer que l'objet `vehicle` soit null en cas d'erreur
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .vehicle-detail-container {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  .vehicle-image {
    width: 50%;
  }
  
  .vehicle-photo {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .vehicle-info {
    width: 45%;
    display: flex;
    flex-direction: column;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .vehicle-characteristics p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .vehicle-characteristics strong {
    font-weight: bold;
  }
  </style>
  
  