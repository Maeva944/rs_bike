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
      <div>
    <h2>Ajouter un Véhicule</h2>
    <form @submit.prevent="addVehicule">
      <input type="text" v-model="newVehicule.nom" placeholder="Nom du véhicule" required />
      <input type="number" v-model="newVehicule.cylindre" placeholder="Cylindre" required />
      <input type="text" v-model="newVehicule.moteur" placeholder="Moteur" required />
      <input type="number" v-model="newVehicule.niveau_de_bruit" placeholder="Niveau de bruit" required />
      <input type="number" v-model="newVehicule.prix" placeholder="Prix" required />
      <input type="text" v-model="newVehicule.puissance_maxi" placeholder="Puissance max" required />
      <input type="file" @change="onFileChange" />
      <select v-model="newVehicule.id_type" required>
        <option v-for="type in types" :key="type.id" :value="type.id">{{ type.nom }}</option>
      </select>
      <select v-model="newVehicule.id_marque" required>
        <option v-for="marque in marques" :key="marque.id" :value="marque.id">{{ marque.nom }}</option>
      </select>
      <select v-model="newVehicule.id_couleur" required>
        <option v-for="couleur in couleurs" :key="couleur.id" :value="couleur.id">{{ couleur.nom }}</option>
      </select>
      <button type="submit">Ajouter le Véhicule</button>
    </form>
  </div>
    </div>
      <div v-if="editingVehicule">
      <h2>Modifier le Véhicule</h2>
      <form @submit.prevent="updateVehicule">
        <input type="text" v-model="editingVehicule.nom" placeholder="Nom du véhicule" required />
        <input type="number" v-model="editingVehicule.cylindre" placeholder="Cylindre" required />
        <input type="text" v-model="editingVehicule.moteur" placeholder="Moteur" required />
        <input type="number" v-model="editingVehicule.niveau_de_bruit" placeholder="Niveau de bruit" required />
        <input type="number" v-model="editingVehicule.prix" placeholder="Prix" required />
        <input type="text" v-model="editingVehicule.puissance_maxi" placeholder="Puissance max" required />
        <input type="file" @change="onFileChange" />
        <select v-model="editingVehicule.id_type">
          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.nom }}</option>
        </select>
        <select v-model="editingVehicule.id_marque">
          <option v-for="marque in marques" :key="marque.id" :value="marque.id">{{ marque.nom }}</option>
        </select>
        <select v-model="editingVehicule.id_couleur">
          <option v-for="couleur in couleurs" :key="couleur.id" :value="couleur.id">{{ couleur.nom }}</option>
        </select>
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
      newType: "",
      newCouleur: "",
      newMarque: "",
      editingCategorie: null,
      editingVehicule: null,
      editingType: null,
      editingCouleur: null,
      editingMarque: null,
      newVehicule: { nom: "", cylindre: "", moteur: "", niveau_de_bruit: "", prix: "", puissance_maxi: "", id_type: "", id_marque: "", id_couleur: "" },
    };
  },

  async created() {
    await this.fetchCategories();
    await this.fetchTypes();
    await this.fetchVehicles();
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
    async fetchVehicles() {
      try {
        const response = await fetch("http://localhost:3000/vehicule", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        this.vehicles = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des véhicules :", error);
      }
    },
    onFileChange(event) {
      this.newFile = event.target.files[0];
    },

   
    async addVehicule() {
      const formData = new FormData();
      formData.append("nom", this.newVehicule.nom);
      formData.append("cylindre", this.newVehicule.cylindre);
      formData.append("moteur", this.newVehicule.moteur);
      formData.append("niveau_de_bruit", this.newVehicule.niveau_de_bruit);
      formData.append("prix", this.newVehicule.prix);
      formData.append("puissance_maxi", this.newVehicule.puissance_maxi);
      formData.append("photo", this.newFile);  // Send photo as part of the form
      formData.append("id_type", this.newVehicule.id_type);
      formData.append("id_marque", this.newVehicule.id_marque);
      formData.append("id_couleur", this.newVehicule.id_couleur);

      try {
        const response = await fetch("http://localhost:3000/api/vehicules/add", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const addedVehicule = await response.json();
        this.vehicles.push(addedVehicule);
        this.newVehicule = { nom: "", cylindre: "", moteur: "", niveau_de_bruit: "", prix: "", puissance_maxi: "", id_type: "", id_marque: "", id_couleur: "" };
        this.newFile = null;  // Reset the file input
      } catch (error) {
        console.error("Erreur d'ajout du véhicule :", error);
      }
    },

    async updateVehicule() {
      const formData = new FormData();
      formData.append("nom", this.editingVehicule.nom);
      formData.append("cylindre", this.editingVehicule.cylindre);
      formData.append("moteur", this.editingVehicule.moteur);
      formData.append("niveau_de_bruit", this.editingVehicule.niveau_de_bruit);
      formData.append("prix", this.editingVehicule.prix);
      formData.append("puissance_maxi", this.editingVehicule.puissance_maxi);
      if (this.newFile) {
        formData.append("photo", this.newFile);  
      }
      formData.append("id_type", this.editingVehicule.id_type);
      formData.append("id_marque", this.editingVehicule.id_marque);
      formData.append("id_couleur", this.editingVehicule.id_couleur);

      try {
        const response = await fetch(`http://localhost:3000/vehicule/${this.editingVehicule.id}`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
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
    editVehicule(vehicule) {
      this.editingVehicule = { ...vehicule };
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
input[type="text"], 
input[type="number"], 
select, 
input[type="file"] {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* Modification de la largeur */
  margin-bottom: 15px;
  box-sizing: border-box;
}

/* Formulaires */
form {
  margin-top: 10px;
  margin-bottom: 30px;
}

form input[type="text"],
form input[type="number"],
form select,
form input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 10px;
}

/* Bouton de soumission */
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

/* Conteneur du formulaire de modification et d'ajout */
div[v-if="editingVehicule"], div[v-if="newVehicule"] {
  background-color: #fff;
  padding: 30px;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-family: Arial, sans-serif;
  color: #333;
}

/* Titre du formulaire */
h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Formulaire de modification et d'ajout */
form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  margin-bottom: 20px;
}

/* Champs de texte et sélection */
input[type="text"], 
input[type="number"], 
select, 
input[type="file"] {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(50% - 10px); /* Ajustement pour deux colonnes */
  margin-bottom: 15px;
  box-sizing: border-box;
}

/* Largeur du fichier photo */
input[type="file"] {
  width: 100%;
  margin-bottom: 20px;
}


button {
  padding: 6px 12px; 
  border: none;
  background-color: #f1c40f; 
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  transition: background-color 0.3s ease;
  font-size: 14px; 
}

button:hover {
  background-color: #f39c12; 
}


/* Responsivité pour petits écrans */
@media (max-width: 768px) {
  form {
    flex-direction: column;
  }

  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
  }

  button {
    width: 100%;
  }
}

/* Table des véhicules */
table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

table th,
table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

table tbody tr:hover {
  background-color: #f9f9f9;
}

table button {
  padding: 6px 12px;
  background-color: #f1c40f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

table button:hover {
  background-color: #d32f2f;
}
</style>

  