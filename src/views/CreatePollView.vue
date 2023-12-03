<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { ref, onMounted } from 'vue';

    const auth = useAuthStore();
    const token = auth.token;

    const isModalVisible = ref(false);

    interface Error {
        message: string
    }

    interface Success {
        message: string
    }

    const error = ref<Error>({
        message: ''
    })

    const success = ref<Success>({
        message: ''
    });

    const openModalWindow = () => {
        isModalVisible.value = true;
    };

    const closeModalWindow = () => {
        isModalVisible.value = false;
    };

    interface Answer {
        text: string
    }

    interface Poll {
        theme: string,
        answers: Answer[]
    }

    const poll = ref<Poll> ({
        theme: '',
        answers: []
    });

    async function onSubmit() {
        const response = await fetch('http://localhost:8080/polls', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(poll.value)
            });

            const data = await response.json();
            if (response.status == 200) {
                success.value = data;
            }
            else {
                error.value = data;
            }

        console.log(poll);
    }

    function addAnswerInput() {
        poll.value.answers.push({ text: '' });
    }

    function removeAnswerInput(index: number) {
        poll.value.answers.splice(index, 1);
    }


</script>

<template>
    <div class="main-content">
        <div class="create-poll-form-block">
            <h2>Создание опроса</h2>
            <form @submit.prevent="onSubmit" class ="create-poll-form">
                <input type="text" id="theme" class="form-input" placeholder="Тема" v-model="poll.theme"><br>
                
                <button type="button" class ="default-button" @click="addAnswerInput">Добавить ответ</button>

                <div v-for="(answer, index) in poll.answers" :key="index" class="answer-input-container">
                    <input type="text" :id="'answer_' + index" class="form-input" placeholder="Вариант ответа" v-model="answer.text"/>
                    <button type="button" class="default-button" @click="removeAnswerInput(index)">Удалить</button>
                </div>

                <button @click="openModalWindow" type="submit" class ="default-button">Создать</button>
            </form>
        </div>

        <div :class="{ 'modal': true, 'visible': isModalVisible }">
            <button @click="closeModalWindow">x</button>
            <p v-if="success.message">{{ success.message }}</p>
            <p v-else>{{ error.message }}</p>
        </div>

        <div class="overlay" :class="{ 'visible': isModalVisible }"></div>
    </div>
</template>