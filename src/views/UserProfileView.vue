<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';

    interface UserData {
        name: string;
        email: string;
        roles: Role[];
    }

    interface Role {
        id: number;
        name: string;
    }

    interface Error {
        message: string;
    }

    const user = ref<UserData>({
        name: '',
        email: '',
        roles: [],
    });

    const error = ref<Error>({
        message: ''
    });

    const auth = useAuthStore();
    const token = auth.token;

    const route = useRoute();
    const userId = route.params.id;

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/users/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        if (response.status == 200) {
            user.value = data;
        }
        else {
            error.value = data;
        }
    });

</script>

<template>   
    <div class="main-content">
        <p v-if="error.message" class="error-message">{{ error.message }}!</p>

        <div v-else class="user-block">
            <div class="user-cart">
            <p class="user-name">{{ user.name }}</p>
            <p class="user-email" v-if="user.email">{{ user.email }}</p>
            <p>Роли:</p>
            <div class="user-roles">
                <p v-for="role in user.roles" :key="role.id">
                <span v-if="role.name == 'ROLE_USER'">Обычный Пользователь</span>
                <span v-else>Администратор</span>
                </p>
            </div>

            <p>Созданные опросы:</p>

            <p>Опросы, в которых принимается участие:</p>
            </div>
        </div>
        
    </div>
</template>