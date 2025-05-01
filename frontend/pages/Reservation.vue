<template>
    <div>
      <h1 v-if="userIsUser">Mes Réservations</h1>
      <h1 v-if="userIsAdmin">Toutes les Réservations</h1>
      <div v-if="allreservations.length === 0 && userIsAdmin">
        <p>Il n'y aucune réservation pour l'instant</p>
      </div>
      <div v-if="userIsAdmin">
        <ul>
          <li v-for="reservation in allreservations" :key="reservation.id">
            <p><strong>Véhicule :</strong> {{ reservation.vehicule }}</p>
            <p><strong>Date :</strong> {{ reservation.reservation_date }} à {{ reservation.reservation_time }}</p>
            <p><strong>Utilisateur :</strong>{{ reservation.email }}</p>
            <button @click="cancelReservation(reservation.id)">Annuler</button>
          </li>
        </ul>
      </div>

      <div v-if="reservations.length === 0 && userIsUser">
        <p>Aucune réservation trouvée.</p>
      </div>
      <div v-else="userIsUser">
        <ul>
          <li v-for="reservation in reservations" :key="reservation.id">
            <p><strong>Véhicule :</strong> {{ reservation.vehicule }}</p>
            <p><strong>Date :</strong> {{ reservation.reservation_date }} à {{ reservation.reservation_time }}</p>
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
        allreservations: [],
        userIsAdmin: false,
        userIsUser: false,
      };
    },
    created() {
      this.fetchReservations();
      this.checkUserRole();
      this.fectAllReservations();
    },
    methods: {
      async fectAllReservations(){
        try{
          const api = await fetch(`http://localhost:3000/all-reservation`)
          const data = await api.json();

          if (api.ok) {
            this.allreservations = data;
          } else {
            console.error('Erreur lors de la récupération des réservations:', data.error);
          }
        }catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
      },
      async fetchReservations() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Utilisateur non connecté");
        this.$router.push('/connexion');
      }else{
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded.id; 

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
            this.fetchReservations();  
            this.fectAllReservations();
          } else {
            console.error('Erreur lors de l\'annulation de la réservation:', data.error);
          }
        } catch (error) {
          console.error('Erreur lors de l\'annulation de la réservation:', error);
        }
      },
      checkUserRole() {
        const userRole = JSON.parse(localStorage.getItem('role_id'));
        if (userRole === 1) {
          this.userIsAdmin = true;
        } else if (userRole === 2) {
          this.userIsUser = true;
        }
      },
    }
  };
  </script>
  
  