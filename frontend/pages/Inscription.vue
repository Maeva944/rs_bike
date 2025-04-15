<template>
    <div class="form">
      <h1>Inscription</h1>
  
      <form @submit.prevent="handleSignup">
        <input type="text" placeholder="Nom" v-model="nom" required />
        <input type="text" placeholder="Prénom" v-model="prenom" required />
        <input type="email" placeholder="Email" v-model="email" required />
        
        <div class="form-password">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" v-model="password" required />
          <button type="button" class="toggle-button" @click="togglePassword">
            {{ showPassword ? "Masquer" : "Afficher" }}
          </button>
        </div>
  
        <input type="tel" placeholder="Numéro de téléphone" v-model="tel" required />
  
        <input type="submit" value="S'inscrire" />
  
        <div class="login-link">
          <p>Vous avez déjà un compte ? <span @click="goToLogin">Connectez-vous</span></p>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        tel: "",
        showPassword: false,
        errorMessage: "",
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      async handleSignup() {
        try {
          const response = await fetch("http://localhost:3000/api/inscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nom: this.nom,
              prenom: this.prenom,
              email: this.email,
              password: this.password,
              tel: this.tel,
            }),
          });
  
          const data = await response.json();
  
          if (response.status === 400 || response.status === 401) {
            this.errorMessage = data.error;
            return;
          }
  
          this.$router.push("/connexion");
        } catch (error) {
          this.errorMessage = "Erreur lors de l'inscription.";
        }
      },
      goToLogin() {
        this.$router.push("/connexion");
      }
    }
  };
  </script>
  
  <style scoped>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    color: #333;
    margin-bottom: 40px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 30px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"],
  input[type="submit"] {
    padding: 14px;
    margin: 12px 0;
    font-size: 16px;
    border: 2px solid #f4b400;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus,
  input[type="tel"]:focus {
    border-color: #574c0e;
  }
  
  .form-password input {
    width: 90%;
  }
  
  input[type="submit"] {
    background-color: #f4b400;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    transition: background-color 0.3s ease;
  }
  
  input[type="submit"]:hover {
    background-color: #ffcc00;
  }
  
  .form-password {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .toggle-button {
    background-color: transparent;
    border: none;
    color: #f4b400;
    font-size: 14px;
    cursor: pointer;
    margin-left: 15px;
  }
  
  .login-link {
    text-align: center;
    margin-top: 20px;
  }
  
  .login-link p {
    font-size: 14px;
    color: #333;
  }
  
  .login-link span {
    color: #f4b400;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }
  
  .login-link span:hover {
    color: #ffcc00;
  }
  </style>
  