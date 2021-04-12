import { createRouter, createWebHistory } from "vue-router";

import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Autherization from "../views/Autherization.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/autherize',
        name: 'Autherization',
        component: Autherization,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
})

export default router