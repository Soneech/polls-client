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
    <form @submit.prevent="onSubmit">
        <div>
            <label for="name">Введите логин</label>
            <input type="text" id="name" placeholder="Логин" v-model="user.name">
        </div>
        <div>
            <label for="email">Введите почту</label>
            <input type="text" id="email" placeholder="Почта" v-model="user.email">
        </div>
        <div>
            <label for="password">Введите пароль</label>
            <input type="password" id="password" placeholder="Пароль" v-model="user.password">
        </div>
        <div>
            <button type="submit">Войти</button>
        </div>
  </form>
</template>