import { createRouter, createWebHistory } from "vue-router";

import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Autherization from "../views/Autherization.vue";
import UnAutherize from "../views/UnAutherize.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
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
    },
    {
        path: '/unaurtherize',
        name: 'UnAutherize',
        component: UnAutherize,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
})

export default router