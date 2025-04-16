<template>
    <div>
      <h1>Réglages</h1>
  
      <!-- Liste des Catégories -->
      <div>
        <h2>Catégories</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="categorie in categories" :key="categorie.id">
              <td>{{ categorie.id }}</td>
              <td>{{ categorie.nom }}</td>
              <td>
                <button @click="editCategorie(categorie)">Modifier</button>
                <button @click="deleteCategorie(categorie.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <form @submit.prevent="addCategorie">
          <input type="text" v-model="newCategorie" placeholder="Nom de la catégorie" required />
          <button type="submit">Ajouter une Catégorie</button>
        </form>
      </div>
  
      <!-- Formulaire pour Modifier une Catégorie -->
      <div v-if="editingCategorie">
        <h2>Modifier la Catégorie</h2>
        <form @submit.prevent="updateCategorie">
          <input type="text" v-model="editingCategorie.nom" placeholder="Nom de la catégorie" required />
          <button type="submit">Sauvegarder</button>
        </form>
      </div>
  
      <!-- Liste des Véhicules -->
      <div>
        <h2>Véhicules</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehicule in vehicles" :key="vehicule.id">
              <td>{{ vehicule.id }}</td>
              <td>{{ vehicule.nom }}</td>
              <td>
                <button @click="editVehicule(vehicule)">Modifier</button>
                <button @click="deleteVehicule(vehicule.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <form @submit.prevent="addVehicule">
          <input type="text" v-model="newVehicule.nom" placeholder="Nom du véhicule" required />
          <button type="submit">Ajouter un Véhicule</button>
        </form>
      </div>
  
      <!-- Formulaire pour Modifier un Véhicule -->
      <div v-if="editingVehicule">
        <h2>Modifier le Véhicule</h2>
        <form @submit.prevent="updateVehicule">
          <input type="text" v-model="editingVehicule.nom" placeholder="Nom du véhicule" required />
          <button type="submit">Sauvegarder</button>
        </form>
      </div>
  
      <!-- Liste des Types -->
      <div>
        <h2>Types</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="type in types" :key="type.id">
              <td>{{ type.id }}</td>
              <td>{{ type.nom }}</td>
              <td>
                <button @click="editType(type)">Modifier</button>
                <button @click="deleteType(type.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <form @submit.prevent="addType">
          <input type="text" v-model="newType" placeholder="Nom du type" required />
          <button type="submit">Ajouter un Type</button>
        </form>
      </div>
  
      <!-- Formulaire pour Modifier un Type -->
      <div v-if="editingType">
        <h2>Modifier le Type</h2>
        <form @submit.prevent="updateType">
          <input type="text" v-model="editingType.nom" placeholder="Nom du type" required />
          <button type="submit">Sauvegarder</button>
        </form>
      </div>
  
      <!-- Liste des Couleurs -->
      <div>
        <h2>Couleurs</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="couleur in couleurs" :key="couleur.id">
              <td>{{ couleur.id }}</td>
              <td>{{ couleur.nom }}</td>
              <td>
                <button @click="editCouleur(couleur)">Modifier</button>
                <button @click="deleteCouleur(couleur.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <form @submit.prevent="addCouleur">
          <input type="text" v-model="newCouleur" placeholder="Nom de la couleur" required />
          <button type="submit">Ajouter une Couleur</button>
        </form>
      </div>
  
      <!-- Formulaire pour Modifier une Couleur -->
      <div v-if="editingCouleur">
        <h2>Modifier la Couleur</h2>
        <form @submit.prevent="updateCouleur">
          <input type="text" v-model="editingCouleur.nom" placeholder="Nom de la couleur" required />
          <button type="submit">Sauvegarder</button>
        </form>
      </div>
  
      <!-- Liste des Marques -->
      <div>
        <h2>Marques</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="marque in marques" :key="marque.id">
              <td>{{ marque.id }}</td>
              <td>{{ marque.nom }}</td>
              <td>
                <button @click="editMarque(marque)">Modifier</button>
                <button @click="deleteMarque(marque.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <form @submit.prevent="addMarque">
          <input type="text" v-model="newMarque" placeholder="Nom de la marque" required />
          <button type="submit">Ajouter une Marque</button>
        </form>
      </div>
  
      <!-- Formulaire pour Modifier une Marque -->
      <div v-if="editingMarque">
        <h2>Modifier la Marque</h2>
        <form @submit.prevent="updateMarque">
          <input type="text" v-model="editingMarque.nom" placeholder="Nom de la marque" required />
          <button type="submit">Sauvegarder</button>
        </form>
      </div>
    </div>
  </template>
  
  
  <script>
export default {
  data() {
    return {
      vehicles: [],
      categories: [],
      types: [],
      couleurs: [],
      marques: [],
      newCategorie: "",
      newVehicule: { nom: "" },
      newType: "",
      newCouleur: "",
      newMarque: "",
      editingCategorie: null,
      editingVehicule: null,
      editingType: null,
      editingCouleur: null,
      editingMarque: null,
    };
  },

  async created() {
    await this.fetchCategories();
    await this.fetchTypes();
   
    await this.fetchCouleurs();
    await this.fetchMarques();
  },

  methods: {
    // Fetch methods for all entities
    async fetchCategories() {
      try {
        const response = await fetch("http://localhost:3000/categorie", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    },
    
    async fetchTypes() {
      try {
        const response = await fetch("http://localhost:3000/typevehicule", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        this.types = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des types :", error);
      }
    },


    async fetchCouleurs() {
      try {
        const response = await fetch("http://localhost:3000/couleur", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        this.couleurs = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des couleurs :", error);
      }
    },

    async fetchMarques() {
      try {
        const response = await fetch("http://localhost:3000/marque", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        this.marques = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des marques :", error);
      }
    },

    // Add methods for all entities
    async addCategorie() {
      try {
        const response = await fetch("http://localhost:3000/categorie/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ nom: this.newCategorie })
        });
        const addedCategorie = await response.json();
        this.categories.push(addedCategorie);
        this.newCategorie = "";
      } catch (error) {
        console.error("Erreur d'ajout de la catégorie :", error);
      }
    },

    async addVehicule() {
      try {
        const response = await fetch("http://localhost:3000/vehicule/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.newVehicule)
        });
        const addedVehicule = await response.json();
        this.vehicles.push(addedVehicule);
        this.newVehicule.nom = "";
      } catch (error) {
        console.error("Erreur d'ajout du véhicule :", error);
      }
    },

    async addType() {
      try {
        const response = await fetch("http://localhost:3000/typevehicule/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ nom: this.newType })
        });
        const addedType = await response.json();
        this.types.push(addedType);
        this.newType = "";
      } catch (error) {
        console.error("Erreur d'ajout du type :", error);
      }
    },

    async addCouleur() {
      try {
        const response = await fetch("http://localhost:3000/couleur/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ nom: this.newCouleur })
        });
        const addedCouleur = await response.json();
        this.couleurs.push(addedCouleur);
        this.newCouleur = "";
      } catch (error) {
        console.error("Erreur d'ajout de la couleur :", error);
      }
    },

    async addMarque() {
      try {
        const response = await fetch("http://localhost:3000/marque/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ nom: this.newMarque })
        });
        const addedMarque = await response.json();
        this.marques.push(addedMarque);
        this.newMarque = "";
      } catch (error) {
        console.error("Erreur d'ajout de la marque :", error);
      }
    },

    // Edit methods for all entities
    async editCategorie(categorie) {
      this.editingCategorie = { ...categorie };
    },

    async editVehicule(vehicule) {
      this.editingVehicule = { ...vehicule };
    },

    async editType(type) {
      this.editingType = { ...type };
    },

    async editCouleur(couleur) {
      this.editingCouleur = { ...couleur };
    },

    async editMarque(marque) {
      this.editingMarque = { ...marque };
    },

    // Update methods for all entities
    async updateCategorie() {
      try {
        const response = await fetch(`http://localhost:3000/categorie/${this.editingCategorie.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.editingCategorie)
        });
        const updatedCategorie = await response.json();
        const index = this.categories.findIndex(c => c.id === updatedCategorie.id);
        if (index !== -1) {
          this.categories[index] = updatedCategorie;
        }
        this.editingCategorie = null;
      } catch (error) {
        console.error("Erreur de mise à jour de la catégorie :", error);
      }
    },

    async updateVehicule() {
      try {
        const response = await fetch(`http://localhost:3000/vehicule/${this.editingVehicule.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.editingVehicule)
        });
        const updatedVehicule = await response.json();
        const index = this.vehicles.findIndex(v => v.id === updatedVehicule.id);
        if (index !== -1) {
          this.vehicles[index] = updatedVehicule;
        }
        this.editingVehicule = null;
      } catch (error) {
        console.error("Erreur de mise à jour du véhicule :", error);
      }
    },

    async updateType() {
      try {
        const response = await fetch(`http://localhost:3000/typevehicule/${this.editingType.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.editingType)
        });
        const updatedType = await response.json();
        const index = this.types.findIndex(t => t.id === updatedType.id);
        if (index !== -1) {
          this.types[index] = updatedType;
        }
        this.editingType = null;
      } catch (error) {
        console.error("Erreur de mise à jour du type :", error);
      }
    },

    async updateCouleur() {
      try {
        const response = await fetch(`http://localhost:3000/couleur/${this.editingCouleur.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.editingCouleur)
        });
        const updatedCouleur = await response.json();
        const index = this.couleurs.findIndex(c => c.id === updatedCouleur.id);
        if (index !== -1) {
          this.couleurs[index] = updatedCouleur;
        }
        this.editingCouleur = null;
      } catch (error) {
        console.error("Erreur de mise à jour de la couleur :", error);
      }
    },

    async updateMarque() {
      try {
        const response = await fetch(`http://localhost:3000/marque/${this.editingMarque.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.editingMarque)
        });
        const updatedMarque = await response.json();
        const index = this.marques.findIndex(m => m.id === updatedMarque.id);
        if (index !== -1) {
          this.marques[index] = updatedMarque;
        }
        this.editingMarque = null;
      } catch (error) {
        console.error("Erreur de mise à jour de la marque :", error);
      }
    },

    // Delete methods for all entities
    async deleteCategorie(id) {
      try {
        await fetch(`http://localhost:3000/categorie/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.categories = this.categories.filter(categorie => categorie.id !== id);
      } catch (error) {
        console.error("Erreur de suppression de la catégorie :", error);
      }
    },

    async deleteVehicule(id) {
      try {
        await fetch(`http://localhost:3000/vehicule/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.vehicles = this.vehicles.filter(vehicule => vehicule.id !== id);
      } catch (error) {
        console.error("Erreur de suppression du véhicule :", error);
      }
    },

    async deleteType(id) {
      try {
        await fetch(`http://localhost:3000/typevehicule/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.types = this.types.filter(type => type.id !== id);
      } catch (error) {
        console.error("Erreur de suppression du type :", error);
      }
    },

    async deleteCouleur(id) {
      try {
        await fetch(`http://localhost:3000/couleur/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.couleurs = this.couleurs.filter(couleur => couleur.id !== id);
      } catch (error) {
        console.error("Erreur de suppression de la couleur :", error);
      }
    },

    async deleteMarque(id) {
      try {
        await fetch(`http://localhost:3000/marque/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.marques = this.marques.filter(marque => marque.id !== id);
      } catch (error) {
        console.error("Erreur de suppression de la marque :", error);
      }
    }
  }
};
</script>

  
  <style scoped>
  /* Conteneur global */
div {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  background-color: #fafafa;
}

/* Titres principaux */
h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  color: #2c3e50;
}

/* Titres de sections */
h2 {
  font-size: 1.75rem;
  margin-top: 30px;
  margin-bottom: 10px;
  border-bottom: 2px solid #bdc3c7;
  padding-bottom: 5px;
  color: #34495e;
}

/* Styles de tableau */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
}

table thead th {
  background-color: #ecf0f1;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #bdc3c7;
  font-weight: 600;
  color: #2980b9;
}

table tbody td {
  padding: 10px 15px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 0.95rem;
}

table tbody tr:hover {
  background-color: #f9fafb;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Boutons */
button {
  padding: 8px 16px;
  border: none;
  background-color: #27ae60; /* Vert */
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2ecc71; /* Vert clair */
}

/* Entrées de formulaire */
input[type="text"] {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

/* Formulaires */
form {
  margin-top: 10px;
  margin-bottom: 30px;
}

form input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 10px;
}

form button[type="submit"] {
  background-color: #3498db; /* Bleu */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

form button[type="submit"]:hover {
  background-color: #2980b9; /* Bleu plus foncé */
}

/* Options pour une mise en page responsive */
@media (max-width: 768px) {
  div {
    padding: 10px;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  table thead {
    display: none;
  }

  table tbody tr {
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }

  table tbody td {
    padding: 10px 5px;
    text-align: right;
    position: relative;
  }

  table tbody td::before {
    content: attr(data-label);
    position: absolute;
    left: 5px;
    width: 45%;
    font-weight: bold;
    text-align: left;
  }
}

  </style>
  