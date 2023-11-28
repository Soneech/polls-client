<script lang="ts" setup>
    import App from '@/App.vue';
import { useAuthStore } from '@/stores/auth';
    import { reactive } from 'vue';

    const user = {
        name: '',
        password: ''
    }

    function onSubmit() {
        if (user.name != '' && user.password != '') {
            useAuthStore().login(user.name, user.password);
        }
    }
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="name">Введите логин</label>
            <input type="text" id="name" placeholder="Логин" v-model="user.name">
        </div>
        <div>
            <label for="password">Введите пароль</label>
            <input type="password" id="password" placeholder="Пароль" v-model="user.password">
        </div>
        <div>
            <button type="submit" @click="App.hideButton">Войти</button>
        </div>
  </form>
</template>