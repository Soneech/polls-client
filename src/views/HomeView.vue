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
                <a href="#" class="default-button">Создать опрос</a>
            </div>
        </div>

        <div class="home-poll-container">
            <h2>Как Вам Наш Сервис?</h2>
            <form class ="home-poll-form">   
                <label>Выберите вариант ответа:</label><br>
                
                <div class="answers-container">
                    <div class="answer">
                        <input type="radio" id="answer1" name="answer" value="Отлично">
                        <label for="answer1">Чудесно</label><br>
                    </div>
                    <div class="answer">
                        <input type="radio" id="answer2" name="answer" value="Хорошо">
                        <label for="answer2">Прекрасно</label><br>
                    </div>
                    <div class="answer">
                        <input type="radio" id="answer3" name="answer" value="Удовлетворительно">
                        <label for="answer3">Есть вопросики</label><br>
                    </div>
                    <div class="answer">
                        <input type="radio" id="answer4" name="answer" value="Неудовлетворительно">
                        <label for="answer4">Мяу</label><br>
                    </div>
                </div>
        
                <input type="submit" class ="default-button" value="Отправить">
            </form>
        </div>
    </div>
</template>