<script lang="ts" setup>
</script>

<template>
    <div class="main-content">
        <div class="greeting-container">
            <h2>Добро пожаловать!</h2>
            <p>На нашем сайте вы можете создавать и принимать участие в опросах.</p>
            <div class="links-btns">
                <a href="#" class="default-button">Все пользователи</a>
                <a href="#" class="default-button">Все опросы</a>
                <a href="#" class="default-button">Создать опрос</a>
            </div>
        </div>

        <div class="poll-container">
            <h2>Как вам наш сервис?</h2>
            <form class ="poll-form">   
                <label>Выберите ваш ответ:</label><br>
                
                <div class="answers-container">
                    <div class="answer">
                        <input type="radio" id="answer1" name="answer" value="Отлично">
                        <label for="answer1">Отлично</label><br>
                    </div>
                    <div class="answer">
                        <input type="radio" id="answer2" name="answer" value="Хорошо">
                        <label for="answer2">Хорошо</label><br>
                    </div>
                    <div class="answer">
                        <input type="radio" id="answer3" name="answer" value="Удовлетворительно">
                        <label for="answer3">Удовлетворительно</label><br>
                    </div>
                    <div class="answer">
                        <input type="radio" id="answer4" name="answer" value="Неудовлетворительно">
                        <label for="answer4">Неудовлетворительно</label><br>
                    </div>
                </div>
        
                <input type="submit" class ="default-button" value="Отправить">
            </form>
        </div>
    </div>
</template>