import { createRouter, createWebHashHistory } from "vue-router";
import Accueil from './pages/Accueil.vue';
import Inscription from "./pages/Inscription.vue";
import Connexion from "./pages/Connexion.vue";
import VehiculeByCategorie from "./pages/Categorie.vue";
import VehiculeDetail from "./pages/VehiculeDetail.vue";
import AdminDashboard from "./pages/AdminDashboard.vue";

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
        },
        {
            path: '/categorie/:id',
            component: VehiculeByCategorie
        },
        {
            path: '/vehiculedetail/:id',
            component: VehiculeDetail
        },
        {
            path: '/admin-dashboard',
            component: AdminDashboard,
            meta: { requiresAuth: true, restrictedTo: 'admin' }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            const userRole = decoded.role_id;

            if (userRole === 2) {
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
