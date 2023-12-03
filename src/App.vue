<script lang="ts" setup>
    import { RouterLink, RouterView } from 'vue-router';
    import { useAuthStore } from './stores/auth';

    const auth = useAuthStore();

    function logout() {
        auth.logout();

        let logoutBtn = document.getElementById('logout-btn');
        logoutBtn.style.visibility = "hidden";

        let signInBtn = document.getElementById('sign-in-btn');
        signInBtn.style.visibility = "visible";

        let signUpBtn = document.getElementById('sign-up-btn');
        signUpBtn.style.visibility = "visible";
    }

    document.addEventListener('DOMContentLoaded', function () {
            let logOutBtn = document.getElementById('logout-btn');
            let signInBtn = document.getElementById('sign-in-btn');
            let signUpBtn = document.getElementById('sign-up-btn');

            if (localStorage.getItem('username')) {
                logOutBtn.style.visibility = "visible";
                signInBtn.style.visibility = "hidden";
                signUpBtn.style.visibility = "hidden";
            }
            else {
                logOutBtn.style.visibility = "hidden";
                signInBtn.style.visibility = "visible";
                signUpBtn.style.visibility = "visible";
            }
    });

</script>

<template>
    <header>
        <div class="header-container">
            <h1 class="logo-text"><RouterLink to="/home">Опросничек</RouterLink></h1>
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
