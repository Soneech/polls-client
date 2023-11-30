<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';

    const auth = useAuthStore();
    const token = auth.token;
    const users = ref([]);

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/users', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        users.value = data;
    })
</script>

<template>
    <div class="users-carts main-content">
      <h2>Пользователи</h2>
      <ul>
        <li v-for="user in users" :key="user.id" class="user-list">
          <RouterLink :to="{name: 'UserProfile', params: {id: user.id}}"><p>{{ user.name }}</p></RouterLink>
          <ul>
            <li v-for="role in user.roles" :key="role.id">
              <span v-if="role.name == 'ROLE_USER'">Обычный Пользователь</span>
              <span v-else>Администратор</span>
            </li>
          </ul>   
        </li>
      </ul>
  </div>
</template>