<template>
    <div>
      <h1>Mes Réservations</h1>
      <div v-if="reservations.length === 0">
        <p>Aucune réservation trouvée.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="reservation in reservations" :key="reservation.id">
            <p><strong>Véhicule :</strong> {{ reservation.vehicule }}</p>
            <p><strong>Date :</strong> {{ reservation.reservation_date }} à {{ reservation.reservation_time }}</p>
            <p><strong>État :</strong> {{ reservation.etat }}</p>
            <button @click="cancelReservation(reservation.id)">Annuler</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reservations: [],
      };
    },
    created() {
      this.fetchReservations();
    },
    methods: {
        async fetchReservations() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Utilisateur non connecté");
    return;
  }

  const decoded = JSON.parse(atob(token.split(".")[1]));
  const userId = decoded.id; // Récupérer l'ID de l'utilisateur à partir du token

  try {
    const response = await fetch(`http://localhost:3000/reservations/${userId}`);
    const data = await response.json();

    if (response.ok) {
      this.reservations = data;
    } else {
      console.error('Erreur lors de la récupération des réservations:', data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
  }
},
      async cancelReservation(id) {
        try {
          const response = await fetch(`http://localhost:3000/reservation/${id}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Réservation annulée:', data);
            this.fetchReservations();  // Recharger les réservations après l'annulation
          } else {
            console.error('Erreur lors de l\'annulation de la réservation:', data.error);
          }
        } catch (error) {
          console.error('Erreur lors de l\'annulation de la réservation:', error);
        }
      }
    }
  };
  </script>
  
  