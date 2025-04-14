import { createRouter, createWebHashHistory } from "vue-router";
import Accueil from './pages/Accueil.vue'
import Inscription from "./pages/Inscription.vue";
import Connexion from "./pages/Connexion.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Accueil
        }, 
        {
            path: '/inscription',
            component: Inscription
        },
        {
            path: '/connexion',
            component: Connexion
        }
    ]
})


export default router