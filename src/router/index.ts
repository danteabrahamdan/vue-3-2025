import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/layout/LandingView.vue';
import AdminView from '../views/layout/PanelAdminView.vue';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ContactView from '../views/landing/ContactView.vue';
import AboutView from '../views/landing/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
});

export default router;
