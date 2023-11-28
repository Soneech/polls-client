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
    <form @submit.prevent="onSubmit" class="auth-form">
        <h2 class="form-title">Введите данные аккаунта</h2>

        <input type="text" id="name" class="form-input" placeholder="Логин" v-model="user.name">
        <input type="password" id="password" class="form-input" placeholder="Пароль" v-model="user.password">
        <button type="submit" class="default-button form-button">Войти</button>
    </form>
</template>