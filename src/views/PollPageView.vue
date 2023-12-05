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

    interface Question {
        id: number,
        text: string,
        answers: Answer[]
    }

    interface Poll {
        id: number,
        theme: string,
        created_at: string,
        user: User,
        questions: Question[]
    }

    interface Error {
        message: string
    }

    interface Success {
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
        questions: []
    });

    const pollNotFoundError = ref<Error>({
        message: ''
    });

    const auth = useAuthStore();
    const token = auth.token;

    const route = useRoute();
    const pollId = route.params.id;

    const isVoterModalVisible = ref(false);
    const isVoteModalVisible = ref(false);

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/polls/' + pollId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();

        if (response.status == 401) {
          useAuthStore().logout();
        }
        else if (response.status == 200) {
            poll.value = data;
        }
        else {
            pollNotFoundError.value = data;
        }
    });

    var clickedAnswer: Answer = {
        id: 0,
        text: '',
        votes: []
    };
    
    const openVoterWindow = (answer: Answer) => {
        clickedAnswer = answer;
        isVoterModalVisible.value = true;
    };

    const closeVoterWindow = () => {
        isVoterModalVisible.value = false;
    };

    const openVoteMessageWindow = () => {
        isVoteModalVisible.value = true;
    };

    const closeVoteMessageWindow = (isSuccess: boolean) => {
        if (isSuccess) {
            location.reload();
        }
        isVoteModalVisible.value = false;
    };

    interface VoteRequest {
        answer_id: number,
    }

    interface VotesRequest {
        poll_id: number,
        votes: VoteRequest[]
    }

    var votesRequest = ref<VotesRequest>({
        poll_id: Number(pollId),
        votes: []
    });

    for (let i = 0; i < poll.value.questions.length; i++) {
        votesRequest.value.votes.push({answer_id: 0});
    }

    const success = ref<Success>({
        message: ''
    });

    const voteError = ref<Error>({
        message: ''
    })

    async function onSubmit() {
        const response = await fetch('http://localhost:8080/polls/vote', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(votesRequest.value)
        });

        const data = await response.json();

        if (response.status == 401) {
          useAuthStore().logout();
        }
        else if (response.status == 200) {
            voteError.value.message = '';
            success.value = data;
        }
        else {
            success.value.message = '';
            voteError.value = data;
        }
        openVoteMessageWindow();
    }   
</script>

<template>
    <div class="main-content">
        <p v-if="pollNotFoundError.message" class="error-message">{{ pollNotFoundError.message }}!</p>

        <div v-else>
            <h2>Опрос от <RouterLink :to="{name: 'UserProfile', params: {id: poll.user.id}}">{{ poll.user.name }}</RouterLink></h2>
        
            <div class="poll-cart">
                <RouterLink :to="{name: 'PollPage', params: {id: poll.id}}"><b><p class="poll-theme">{{ poll.theme }}</p></b></RouterLink>

                <p class="created-at">Создан: 
                    {{ poll.created_at.substring(8, 10) + '.' + poll.created_at.substring(5, 7) + '.' + 
                        poll.created_at.substring(0, 4) + " в " + poll.created_at.substring(11, 19)}}</p>

                <div class="poll-container">
                    <form @submit.prevent="onSubmit" class ="poll-form">
                        <div class="questions-container">
                            <div class="question-container" v-for="(question, index) in poll.questions">
                                <b><p class="question-text">{{ question.text }}</p></b>

                                <div class="answers-container">
                                    <div v-for="answer in question.answers" :key="answer.id" class="answer default-answer">
                                        <div class="answer-text">
                                            <input type="radio" :id="answer.id.toString()" v-model="votesRequest.votes[index]" :value="{answer_id: answer.id}" :name="index.toString()">
                                            <label :for="answer.id.toString()">{{ answer.text }}</label>
                                        </div>
                                
                                        <button type="button" @click="openVoterWindow(answer)" class="votes-count">{{ answer.votes.length }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>   
                        
                        <button type="submit" class ="default-button">Отправить</button>
                    </form>

                    <div :class="{ 'modal': true, 'visible': isVoterModalVisible }">
                        <button @click="closeVoterWindow">✖</button>
                        <p>Проголосовали:</p>
                        <RouterLink :to="{name: 'UserProfile', params: {id: vote.user.id}}" v-for="vote in clickedAnswer.votes">
                            <p>{{ vote.user.name }}</p>
                        </RouterLink>
                    </div>

                    <div :class="{ 'modal': true, 'visible': isVoteModalVisible }">
                        <button @click="closeVoteMessageWindow(success.message ? true: false)">✖</button>
                        <p v-if="voteError.message.length > 0">{{ voteError.message }}</p>
                        <p v-else-if="success.message.length > 0">{{ success.message }}</p>
                    </div>

                    <div class="overlay" :class="{ 'visible': isVoteModalVisible || isVoterModalVisible }"></div>
                </div>
            </div>
        </div>
    </div>
</template>