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
  
      <!-- Section réservations pour l'admin -->
      <div v-if="userIsAdmin">
        <h2>Ajouter un créneau pour ce véhicule</h2>
        <form @submit.prevent="addCreneau">
          <input type="date" v-model="reservationDate" required />
          <input type="time" v-model="reservationTime" required />
          <button type="submit">Ajouter le créneau</button>
        </form>
      </div>
  
      <!-- Section réservation pour l'utilisateur -->
      <div v-if="userIsUser">
        <h2>Sélectionner un créneau pour réserver</h2>
        <div class="creneaux-list">
          <div v-for="creneau in availableCreneaux" :key="creneau.id" class="creneau-item">
            <button @click="reserveCreneau(creneau)" :disabled="!creneau.is_available">
              {{ formatDate(creneau.date_) }} à {{ formatTime(creneau.time_) }}
            </button>
          </div>
        </div>
      </div>
  
    </div>
  
    <div v-else>
      <p>Véhicule non trouvé ou erreur dans le chargement des données.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        vehicle: null,
        reservationDate: '',
        reservationTime: '',
        availableCreneaux: [],
        userIsAdmin: false,
        userIsUser: false,
      };
    },
    created() {
      this.fetchVehicleDetails();
      this.checkUserRole();
      this.fetchCreneaux();
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
  
          this.vehicle = data;
        } catch (error) {
          console.error("Erreur lors de la récupération du véhicule:", error);
          this.vehicle = null;
        }
      },
  
      formatDate(dateStr) {
        const date = new Date(dateStr);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options); 
      },
  
      formatTime(timeStr) {
        const time = new Date(`1970-01-01T${timeStr}Z`);
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      },
  
      checkUserRole() {
        const userRole = JSON.parse(localStorage.getItem('role_id'));
        if (userRole === 1) {
          this.userIsAdmin = true;
        } else if (userRole === 2) {
          this.userIsUser = true;
        }
      },
  
      async fetchCreneaux() {
        const vehicleId = this.$route.params.id;
        try {
          const response = await fetch(`http://localhost:3000/creneaux/${vehicleId}`);
          const data = await response.json();
  
          this.availableCreneaux = data.filter(creneau => creneau.is_available);
        } catch (error) {
          console.error("Erreur lors de la récupération des créneaux :", error);
        }
      },
  
      async addCreneau() {
        const vehicleId = this.$route.params.id; 
        const payload = {
          date_: this.reservationDate,  
          time_: this.reservationTime, 
          id_vehicule: vehicleId,   
        };

  
        console.log("Payload envoyé : ", payload);  
        if (!payload.date_ || !payload.time_ || !payload.id_vehicule) {
          console.error("Tous les champs sont nécessaires !");
          return; 
        }
  
        try {
          const response = await fetch('http://localhost:3000/creneaux/add-creneau', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
  
          if (!response.ok) {
            const error = await response.json();
            console.error("Erreur lors de l'ajout du créneau horaire", error);
            return;
          }
  
          const data = await response.json();
          console.log('Créneau ajouté avec succès', data);
        } catch (error) {
          console.error('Erreur lors de l\'ajout du créneau horaire', error);
        }
      },
      async reserveCreneau(creneau) {
        const userId = JSON.parse(localStorage.getItem('id_user'));
  
        console.log('ID utilisateur récupéré : ', userId); 
  

  if (!userId) {
    console.error('Erreur : ID utilisateur non trouvé');
    return;  

  }

  const vehicleId = this.$route.params.id;
  const payload = {
    id_user: userId,  
    id_creneau: creneau.id,
    id_etat: 2, 
    id_vehicule: vehicleId,  
  };
  console.log(creneau.id,userId, vehicleId);
  console.log("Données envoyées dans la requête de réservation : ", payload);

  try {
    const response = await fetch('http://localhost:3000/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Réservation effectuée', data);
    } else {
      console.error('Erreur lors de la réservation', data);
    }
  } catch (error) {
    console.error('Erreur lors de la réservation', error);
  }
}

    }
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
  
  