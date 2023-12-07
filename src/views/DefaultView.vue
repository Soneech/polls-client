<script lang="ts" setup>
</script>

<template>
    <div class="main-content">
        <div class="greeting-container">
            <h2>Приветствуем Вас на сайте 'Опросничек'</h2>
            <p>На Нашем сайте Вы можете принимать участие в опросах, а также становиться автором!</p>
            <p>Для продолжения необходимо 
                <RouterLink to="/auth/login" class="auth-links" id="sign-in-btn">войти</RouterLink>
                или
                <RouterLink to="/auth/registration" class="auth-links" id="sign-up-btn">зарегистрироваться</RouterLink>, если у Вас ещё нет аккаунта.
            </p>
        </div>
    </div>
</template>