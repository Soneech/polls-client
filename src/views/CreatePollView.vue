<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { ref } from 'vue';

    const auth = useAuthStore();
    const token = auth.token;

    const isModalVisible = ref(false);

    interface FieldsErrors {
        messages: []
    }

    interface Success {
        message: string
    }

    const error = ref<FieldsErrors>({
        messages: []
    })

    const success = ref<Success>({
        message: ''
    });

    const openModalWindow = () => {
        isModalVisible.value = true;
    };

    const closeModalWindow = () => {
        if (success.value.message.length > 0) {
            location.reload();
        }
        isModalVisible.value = false;
    };

    interface Answer {
        text: string
    }

    interface Question {
        text: string,
        answers: Answer[]
    }

    interface Poll {
        theme: string,
        questions: Question[]
    }

    const poll = ref<Poll> ({
        theme: '',
        questions: []
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

        if (response.status == 401) {
          useAuthStore().logout();
        }
        else if (response.status == 200) {
            error.value.messages = []
            success.value = data;
        }
        else {
            error.value = data;
        }

        openModalWindow();
    }

    function addQuestionBlock() {
        poll.value.questions.push({text: '', answers: []})
    }

    function removeQuestionBlock(q_index: number) {
        poll.value.questions.splice(q_index, 1);
    }

    function addAnswerInput(q_index: number) {
        poll.value.questions[q_index].answers.push({text: ''});
    }

    function removeAnswerInput(q_index: number, a_index: number) {
        poll.value.questions[q_index].answers.splice(a_index, 1);
    }
</script>

<template>
    <div class="main-content">
        <div class="create-poll-form-block">
            <h2>Создание опроса</h2>
            <form @submit.prevent="onSubmit" class ="create-poll-form">
                <input type="text" id="theme" class="form-input poll-theme-create" placeholder="Тема" v-model="poll.theme"><br>
                
                <div class="question-block" v-for="(question, q_index) in poll.questions" :key="q_index">
                    <br>

                    <input type="text" :id="'question_' + q_index" class="form-input question-text-create" placeholder="Текст вопроса" v-model="question.text"/>
                    <button type="button" class ="default-button delete-btn" @click="removeQuestionBlock(q_index)">✖</button>

                    <div v-for="(answer, a_index) in question.answers" :key="a_index" class="answer-input-container">
                        <input type="text" :id="'answer_' + a_index" class="form-input" placeholder="Вариант ответа" v-model="answer.text"/>
                        <button type="button" class="default-button delete-btn" @click="removeAnswerInput(q_index, a_index)">✖</button>
                    </div>

                    <button type="button" class ="default-button create-polls-btn" @click="addAnswerInput(q_index)">Добавить ответ</button>
                    
                    <br>
                </div>
                
                <div class="create-poll-main-btns">
                    <button type="button" class ="default-button" @click="addQuestionBlock">Добавить вопрос</button>
                    <button type="submit" class ="default-button">Создать</button>  
                </div>
                
            </form>
        </div>

        <div :class="{ 'modal': true, 'visible': isModalVisible }">
            <button @click="closeModalWindow">✖</button>
            <p v-if="error.messages.length > 0" v-for="message in error.messages">{{ message }}</p>
            <p v-else>{{ success.message }}</p>
        </div>

        <div class="overlay" :class="{ 'visible': isModalVisible }"></div>
    </div>
</template>