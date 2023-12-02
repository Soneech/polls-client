<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';

    interface User {
        id: number,
        name: string
    }

    interface Vote {
        id: number,
        user: User
    }

    interface Answer {
        id: number,
        text: string,
        votes: Vote[]
    }

    interface Poll {
        id: number,
        theme: string,
        created_at: string,
        user: User,
        answers: Answer[]
    }

    interface Error {
        message: string
    }


    const user: User = {
        id: 1,
        name: ''
    }

    const poll = ref<Poll>({
        id: 1,
        theme: '',
        created_at: '',
        user: user,
        answers: []
    });

    const error = ref<Error>({
        message: ''
    });

    const auth = useAuthStore();
    const token = auth.token;

    const route = useRoute();
    const pollId = route.params.id;

    const isModalVisible = ref(false);

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/polls/' + pollId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        if (response.status == 200) {
            poll.value = data;
        }
        else {
            error.value = data;
        }

        console.log(error.value);
    });

    var clickedAnswer: Answer = {
        id: 1,
        text: '',
        votes: []
    };
    
    const openModal = (answer: Answer) => {
        clickedAnswer = answer;
        isModalVisible.value = true;
    };

    const closeModal = () => {
        isModalVisible.value = false;
    };
</script>

<template>
    <div class="main-content">
        <p v-if="error.message" class="error-message">{{ error.message }}!</p>

        <div v-else>
            <h2>Опрос от <RouterLink :to="{name: 'UserProfile', params: {id: poll.user.id}}">{{ poll.user.name }}</RouterLink></h2>
        
            <div class="poll-cart">
                <RouterLink :to="{name: 'PollPage', params: {id: poll.id}}"><p class="poll-theme">{{ poll.theme }}</p></RouterLink>

                <p class="created-at">Создан: 
                    {{ poll.created_at.substring(8, 10) + '.' + poll.created_at.substring(5, 7) + '.' + 
                        poll.created_at.substring(0, 4) + " в " + poll.created_at.substring(11, 19)}}</p>

                <div class="poll-container">
                    <form class ="poll-form">   
                        <div class="answers-container">
                            <div v-for="answer in poll.answers" class="answer default-answer">
                                <div class="answer-text">
                                    <input type="radio" :id="answer.id.toString()" name="answer">
                                    <label :for="answer.id.toString()">{{ answer.text }}</label>
                                </div>
                                
                                <button type="button" @click="openModal(answer)" class="votes-count">{{ answer.votes.length }}</button>
                            </div>
                        </div>
                
                        <input type="submit" class ="default-button" value="Отправить">
                    </form>

                    <div :class="{ 'modal': true, 'visible': isModalVisible }">
                        <button @click="closeModal">x</button>
                        <p>Проголосовали:</p>
                        <RouterLink :to="{name: 'UserProfile', params: {id: vote.user.id}}" v-for="vote in clickedAnswer.votes">
                            <p>{{ vote.user.name }}</p>
                        </RouterLink>
                    </div>

                    <div class="overlay" :class="{ 'visible': isModalVisible }"></div>
                </div>
            </div>
        </div>
    </div>
</template>