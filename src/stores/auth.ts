import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            username: localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')!) : null,
            token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null, 
            loginSuccessReturnUrl: '/home',
            registrationSuccessReturnUrl: '/auth/login',
            fieldsErrors: {messages: []},
            loginErrors: {messages: []},
            loginStatus: 0,
            registrationStatus: 0
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
                this.registrationStatus = 201;
                router.push(this.registrationSuccessReturnUrl || '/')
            }
            else {
                this.registrationStatus = 400;
                const data = await response.json();
                this.fieldsErrors = data;
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
                this.loginStatus = 200;
                const data = await response.json();
                const token = data.token;
                
                this.username = name;
                this.token = token;
                
                localStorage.setItem('username', JSON.stringify(name));
                localStorage.setItem('token', JSON.stringify(token));

                router.push(this.loginSuccessReturnUrl || '/');
            } else {
                this.loginStatus = 400;
                const data = await response.json();
                this.loginErrors = data;
            }
        },
        logout() {
            this.loginStatus = 0;
            this.registrationStatus = 0;

            this.username = null;
            this.token = null;

            localStorage.removeItem('username');
            localStorage.removeItem('token');
            router.push('/home');
        }
    }
});