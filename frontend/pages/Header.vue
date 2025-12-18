<template>
    <header>
      <div class="logo">
        <h1>RS Bike</h1>
      </div>
  
      <div v-if="categories.length > 0" class="categories">
        <ul>
          <li v-for="categorie in categories" :key="categorie.id">
            <router-link @change="reloading" :to="`/categorie/${categorie.id}`">{{ categorie.nom }}</router-link>
          </li>
        </ul>
      </div>
  
      <nav>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/connexion">Connexion</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/inscription">Inscription</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/mes-reservations">Mes réservations</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/compte">Mon profils</router-link></li>
          <li v-if="isLoggedIn && isAdmin"><router-link to="/admin-dashboard">Dashboard</router-link></li>
          <li v-if="isLoggedIn"><button @click="logout">Se déconnecter</button></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: [],  
      };
    },
    computed: {
      isLoggedIn() {
        return localStorage.getItem('token') !== null;
      },
      isAdmin() {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          return decoded.role_id === 1;
        }
        return false;
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role_id');
        localStorage.removeItem('id');
        
      },
      async fetchCategories() {
        try {
          const response = await fetch("http://localhost:3000/categorie");
          const data = await response.json();
          this.categories = data;
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories :", error);
        }
      }
    },
    watch: {
    '$route'() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    },
    mounted() {
      this.fetchCategories(); 
    }
  };
  </script>
  
  <style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f4b400;
    color: white;
  }
  
  .logo h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .categories {
    margin-bottom: 20px;
  }
  
  .categories ul {
    display: flex;
    list-style: none;
    gap: 15px;
  }
  
  .categories li {
    font-size: 16px;
  }
  
  .categories a {
    color: white;
    text-decoration: none;
  }
  
  .categories a:hover {
    color: #ffcc00;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    gap: 15px;
  }
  
  nav ul li {
    display: inline;
  }
  
  button {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    color: #ffcc00;
  }
  
  a {
    color: white;
    text-decoration: none;
  }
  
  a:hover {
    color: #ffcc00;
  }
  </style>
  