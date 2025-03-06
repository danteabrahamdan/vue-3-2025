import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/layout/LandingLayout.vue';
import AdminView from '../views/layout/AdminLayout.vue';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ContactView from '../views/landing/ContactView.vue';
import AboutView from '../views/landing/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LandingView
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/admin',
      component: AdminView,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/admin/DashboardView.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('../views/admin/ProductView.vue')
        },
        {
          path: 'add-product',
          name: 'Add product',
          component: () => import('../views/admin/AddProductView.vue')
        },
        {
          path: 'categories',
          name: 'Categories',
          component: () => import('../views/admin/CategoryView.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../views/admin/UserView.vue')
        },
        {
          path: 'roles',
          name: 'Roles',
          component: () => import('../views/admin/RoleView.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../views/admin/SettingView.vue')
        }
      ]
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
