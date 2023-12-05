<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';

    interface User {
        name: string,
        email: string,
        roles: Role[],
        created_polls: Poll[],
        polls_in_which_voted: Poll[]
    }

    interface Role {
        id: number,
        name: string
    }

    interface Poll {
        id: number,
        theme: string
    }

    interface Error {
        message: string
    }

    const user = ref<User>({
        name: '',
        email: '',
        roles: [],
        created_polls: [],
        polls_in_which_voted: []
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
        
        if (response.status == 401) {
          useAuthStore().logout();
        }
        else if (response.status == 200) {
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
            <p class="user-name"><b>{{ user.name }}</b></p>
            <p class="user-email" v-if="user.email">{{ user.email }}</p>
            <p><b>Роли:</b></p>
            <div class="user-roles">
                <p v-for="role in user.roles" :key="role.id">
                <span v-if="role.name == 'ROLE_USER'">Обычный Пользователь</span>
                <span v-else>Администратор</span>
                </p>
            </div>

            <p><b>Созданные опросы:</b></p>
            <RouterLink :to="{name: 'PollPage', params: {id: poll.id}}" class="poll-name" v-for="poll in user.created_polls"><p>{{ poll.theme }}</p></RouterLink>

            <p><b>Опросы, в которых принимается участие:</b></p>
            <RouterLink :to="{name: 'PollPage', params: {id: poll.id}}" class="poll-name" v-for="poll in user.polls_in_which_voted"><p>{{ poll.theme }}</p></RouterLink>
            </div>
        </div>
        
    </div>
</template>