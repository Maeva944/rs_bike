<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Mes réservations</h2>
    <ul v-if="reservations.length">
      <li v-for="res in reservations" :key="res.id" class="mb-2 p-2 border rounded">
        Moto ID: {{ res.moto_id }} | 
        Date: {{ res.date_reservation }} à {{ res.heure_reservation }} |
        Statut: {{ res.statut }}
      </li>
    </ul>
    <p v-else>Aucune réservation trouvée.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservations: [],
      userId: 1 // <-- à remplacer dynamiquement si nécessaire
    };
  },
  mounted() {
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await fetch(`http://localhost:3000/api/reservations/${this.userId}`);
        const data = await response.json();
        this.reservations = data;
      } catch (error) {
        console.error("Erreur lors du chargement des réservations:", error);
      }
    }
  }
};
</script>
