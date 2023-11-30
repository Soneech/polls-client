import { useAuthStore } from '@/stores/auth';
import DefaultVue from '@/views/DefaultView.vue'
import HomeVue from '@/views/HomeView.vue';
import LoginVue from '@/views/LoginView.vue';
import RegistrationVue from '@/views/RegistrationView.vue';
import UsersVue from '@/views/UsersView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Приветствие',
      component: DefaultVue
    },
    {
      path: '/home',
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
    },
    {
      path: '/users',
      name: 'Пользователи',
      component: UsersVue
    }
  ]
});

router.beforeEach(async (to) => {
  const publicPages = ['/auth/login', '/auth/registration', '/'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.username) {
    return '/'
  }
});

export default router
