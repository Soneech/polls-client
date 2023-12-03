import { useAuthStore } from '@/stores/auth';
import DefaultVue from '@/views/DefaultView.vue'
import HomeVue from '@/views/HomeView.vue';
import LoginVue from '@/views/LoginView.vue';
import RegistrationVue from '@/views/RegistrationView.vue';
import UsersVue from '@/views/UsersView.vue';
import UserProfileVue from '@/views/UserProfileView.vue';
import PollsVue from '@/views/PollsView.vue';
import PollPageVue from '@/views/PollPageView.vue';
import CreatePollVue from '@/views/CreatePollView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Greeting',
      component: DefaultVue
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeVue
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: LoginVue
    },
    {
      path: '/auth/registration',
      name: 'Registration',
      component: RegistrationVue
    },
    {
      path: '/users',
      name: 'Users',
      component: UsersVue
    },
    {
      path: '/users/:id',
      name: 'UserProfile',
      component: UserProfileVue
    },
    {
      path: '/polls',
      name: 'Polls',
      component: PollsVue
    },
    {
      path: '/polls/:id',
      name: 'PollPage',
      component: PollPageVue
    },
    {
      path: '/polls/create',
      name: 'CreatePollPage',
      component: CreatePollVue
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
