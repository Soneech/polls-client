<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { ref, onMounted } from 'vue';

    const auth = useAuthStore();
    const token = auth.token;
    const polls = ref([]);

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/polls/preview', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        polls.value = data;
    })
</script>

<template>
    <div class="main-content">
        <h2>Доступные опросы</h2>
        <div class="polls-carts">
            <div v-for="poll in polls" :key="poll.id" class="poll-cart">
                <RouterLink :to="{name: 'PollPage', params: {id: poll.id}}"><p class="poll-theme">{{ poll.theme }}</p></RouterLink>

                <p class="created-at">Создан: 
                    {{ poll.created_at.substring(8, 10) + '.' + poll.created_at.substring(5, 7) + '.' + 
                        poll.created_at.substring(0, 4) + " в " + poll.created_at.substring(11, 19)}}</p>

                <RouterLink :to="{name: 'UserProfile', params: {id: poll.user.id}}"><p class="owner">Автор: {{ poll.user.name }}</p></RouterLink>
                <RouterLink :to="{name: 'PollPage', params: {id: poll.id}}"><p class="poll-link">Подробнеe...</p></RouterLink>
            </div>
        </div>
    </div>
</template>