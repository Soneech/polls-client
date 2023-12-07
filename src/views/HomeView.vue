<script lang="ts" setup>
</script>

<template>
    <div class="main-content">
        <div class="greeting-container">
            <h2>Добро пожаловать!</h2>
            <p>На Нашем сайте Вы можете принимать участие в опросах, а также становиться автором!</p>
            <div class="links-btns">
                <RouterLink to="/users" class="default-button">Все пользователи</RouterLink>
                <RouterLink to="/polls" class="default-button">Все опросы</RouterLink>
                <RouterLink to="/polls/create" class="default-button">Создать опрос</RouterLink>
            </div>
        </div>

        <div class="home-poll-container">
            <img class="home-img" src="../components/image/home-img.png">
        </div>
    </div>
</template>