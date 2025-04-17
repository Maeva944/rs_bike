<!-- src/components/MotoGallery.vue -->
<template>
  <div class="flex flex-wrap gap-4">
    <!-- Liste des motos -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-1/2">
      <div 
        v-for="moto in motos" 
        :key="moto.id"
        @click="motoSelectionnee = moto"
        class="cursor-pointer border p-2 rounded hover:shadow transition"
      >
        <img :src="getImagePath(moto.image)" alt="" class="w-full h-40 object-cover rounded" />
        <p class="text-center mt-2 font-semibold">{{ moto.nom }}</p>
      </div>
    </div>

    <!-- Détails -->
    <div v-if="motoSelectionnee" class="w-full md:w-1/2 border p-4 rounded shadow-md bg-white">
      <h2 class="text-2xl font-bold mb-2">{{ motoSelectionnee.nom }}</h2>
      <img :src="getImagePath(motoSelectionnee.image)" class="w-full h-64 object-cover mb-2 rounded" />
      <p class="mb-2">{{ motoSelectionnee.description }}</p>
      <p class="mb-4">
        Disponibilité :
        <span :class="motoSelectionnee.dispo ? 'text-green-600' : 'text-red-600'">
          {{ motoSelectionnee.dispo ? 'Disponible' : 'Indisponible' }}
        </span>
      </p>
      <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
        Réserver
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      motos: [
        {
          id: 1,
          nom: "Yamaha R1",
          image: "yamaha.jpg",
          description: "Moto sportive très puissante.",
          dispo: true
        },
        {
          id: 2,
          nom: "Scooter City",
          image: "scooter.jpg",
          description: "Scooter urbain et économique.",
          dispo: false
        }
      ],
      motoSelectionnee: null
    };
  },
  methods: {
    getImagePath(fileName) {
      return `/images/${fileName}`;
    }
  }
};
</script>

