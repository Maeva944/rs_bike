<template>
    <div class="form">
    <h1>Connexion</h1>

    <form @submit.prevent="handleLogin">
      <input type="email" placeholder="Email" v-model="email" required />
      
      <div class="form-password">
        <input :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" v-model="password" required />
        <button type="button" class="toggle-button" @click="togglePassword">
          {{ showPassword ? "Masquer" : "Afficher" }}
        </button>
      </div>

      <input type="submit" value="Se connecter" />

      <div class="signup-link">
        <p>Vous n'avez pas encore de compte ? <span @click="goToInscription">Inscrivez-vous</span></p>
      </div>
    </form>
  </div>
</template>
<script>
    export default{
    data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      showPassword: false,
    };
    },
    methods: {
        togglePassword(){
            this.showPassword = !this.showPassword;
        },
        async handleLogin(){
            try{
                const response = await fetch("http://localhost:3000/auth", {
                    method: "POST",
                    header: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: this.email, password: this.password }),
                })
                const data = await response.json();

                if (response.status === 401) {
                this.errorMessage = data.error;
                return;
                }

                localStorage.setItem("token", data.token); 
                this.$router.push("/");
            }catch (error) {
                this.errorMessage = "Erreur lors de la connexion.";
            }
        }
    }
}
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

input[type="email"],
input[type="password"],
input[type="text"],
input[type="submit"] {
  padding: 14px;
  margin: 12px 0;
  font-size: 16px;
  border: 2px solid #f4b400;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}


input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #574c0e;
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
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link p {
  font-size: 14px;
  color: #333;
}

.signup-link span {
  color: #f4b400;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}

.signup-link span:hover {
  color: #ffcc00;
}
</style>
