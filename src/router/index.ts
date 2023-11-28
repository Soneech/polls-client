import { useAuthStore } from '@/stores/auth';
import HomeVue from '@/views/HomeView.vue';
import LoginVue from '@/views/LoginView.vue';
import RegistrationVue from '@/views/RegistrationView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: HomeVue
    },
    {
      path: '/auth/login',
      name: 'Вход в аккаунт',
      component: LoginVue
    },
    {
      path: '/auth/registration',
      name: 'Регистрация',
      component: RegistrationVue
    }
  ]
});

router.beforeEach(async (to) => {
  const publicPages = ['/auth/login', '/auth/registration'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.username) {
    return '/auth/login'
  }
});

export default router
