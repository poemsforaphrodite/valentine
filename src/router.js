import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/game',
        name: 'Game',
        component: () => import('./views/Game.vue')
    }
    ,
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('./views/Blog.vue')
    }
    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router

