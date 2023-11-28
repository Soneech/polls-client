<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';

    const user = {
        name: '',
        email: '', 
        password: ''
    }

    function onSubmit() {
        if (user.name != '' && user.email != '' && user) {
            useAuthStore().registration(user.name, user.email, user.password);
        }
    }
</script>

<template>
    <form @submit.prevent="onSubmit" class="auth-form">
        <h2 class="form-title">Введите данные аккаунта</h2>

        <input type="text" id="name" class="form-input" placeholder="Логин" v-model="user.name">
        <input type="text" id="email" class="form-input" placeholder="Почта" v-model="user.email">
        <input type="password" id="password" class="form-input" placeholder="Пароль" v-model="user.password">
        <button type="submit" class="default-button form-button sign-up-form-btn">Зарегистрироваться</button>
  </form>
</template>