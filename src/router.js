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
        path: '/star',
        name: 'Star',
        component: () => import('./views/Star.vue')
    }
    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router

