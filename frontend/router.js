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

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth) {
        if (!token) {
            console.warn("🚫 Aucun token trouvé, redirection vers /connexion");
            return next("/connexion");
        }

        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            const userRole = decoded.role_id;

            if (userRole === 3) {
                const restrictedPages = ['/admin-dashboard'];

                if (restrictedPages.includes(to.path)) {
                    return next("/unauthorized");
                }
            }

            if (to.meta.restrictedTo === 'admin' && userRole !== 1) {
                return next("/unauthorized");
            }

            return next();
        } catch (error) {
            console.error("Erreur de décodage du token :", error);
            localStorage.removeItem("token");
            return next("/connexion");
        }
    }

    next();
});

export default router;