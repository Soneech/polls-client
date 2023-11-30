import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            username: localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')!) : null,
            token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null, 
            loginSuccessReturnUrl: '/home',
            registrationSuccessReturnUrl: '/auth/login'
        }
    },
    actions: {
        async registration(name: string, email: string, password: string) {
            const response = await fetch('http://localhost:8080/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            });
            
            if (response.status == 201) {
                router.push(this.registrationSuccessReturnUrl || '/')
            }
            else {
                // TODO
            }
        },
        async login(name: string, password: string) {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, password})
            });

            if (response.status == 200) {
                const data = await response.json();
                const token = data.token;
                
                this.username = name;
                this.token = token;
                
                localStorage.setItem('username', JSON.stringify(name));
                localStorage.setItem('token', JSON.stringify(token));
                router.push(this.loginSuccessReturnUrl || '/');

                let logoutBtn = document.getElementById('logout-btn');
                logoutBtn.style.visibility = "visible";

                let signInBtn = document.getElementById('sign-in-btn');
                signInBtn.style.visibility = "hidden";

                let signUpBtn = document.getElementById('sign-up-btn');
                signUpBtn.style.visibility = "hidden";
            } else {
                // TODO - вывод ошибок от сервера
            }
        },
        logout() {
            this.username = null;
            this.token = null;

            localStorage.removeItem('username');
            localStorage.removeItem('token');
            router.push('/home');

            let logoutBtn = document.getElementById('logout-btn');
            logoutBtn.style.visibility = "hidden";

            let signInBtn = document.getElementById('sign-in-btn');
            signInBtn.style.visibility = "visible";

            let signUpBtn = document.getElementById('sign-up-btn');
            signUpBtn.style.visibility = "visible";
        }
    }
});