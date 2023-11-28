<script lang="ts" setup>
    import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';

    const auth = useAuthStore();

    function logout() {
        auth.logout();
    }

    document.addEventListener('DOMContentLoaded', function () {
            let button = document.getElementById('logout-btn');
            localStorage.getItem('username') ? button.style.visibility = "visible" : button.style.visibility = "hidden";
    });

    document.addEventListener('DOMContentLoaded', function () {
            let button = document.getElementById('sign-in-btn');
            localStorage.getItem('username') ? button.style.visibility = "hidden" : button.style.visibility = "visible";
    });

</script>

<template>
    <header>
        <div class="header-container">
            <h1>Опросник</h1>
            <div class="navigation">
                <ul>
                    <li><RouterLink to="/auth/login" class="header-button" id="sign-in-btn">Войти</RouterLink></li>
                    <li><RouterLink to="/auth/registration" class="header-button" id="sign-up-btn">Зарегистрироваться</RouterLink></li>
                    <li><a href="#" @click="logout" class="header-button" id="logout-btn">Выйти</a></li>
                </ul>
            </div>
        </div>
    </header>

    <div class="routes">
        <RouterView/>
    </div>
    
</template>
