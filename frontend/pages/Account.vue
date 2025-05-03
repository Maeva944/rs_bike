<template>
    <h1>Mon profils</h1>
    <section>
        <div  class="profil-picture">
            <img :src="kjh" alt="Photo de profils de l'utilisateur" />
        </div>
        <article>
            <h3>Nom : </h3>
            <p></p>
            <h3>Prénom :</h3>
            <p></p>
            <h3>Email :</h3>
            <p></p>
            <h3>Tél :</h3>
            <p></p>
            <button>Chnger mon mot de passe</button>
        </article>
        <form>
            <label>Ancien mot de passe</label>
            <input type="password">
            <label>Nouveau mot de passe</label>
            <input type="password">
            <label>Confirmation du mot de passe</label>
            <input type="password">
        </form>
    </section>
</template>
<script>
    export default{
        data(){
            return {
                nom: "",
                prenom: "",
                email: "",
                tel: "",
                oldPassword: "",
                newPasword: "",
                ToggleForm: false,

            }
        }
    }
</script>