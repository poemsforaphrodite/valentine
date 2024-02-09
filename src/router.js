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
];

const router = createRouter({
    history: createWebHistory(),
    //base: process.env.BASE_URL, // Add this line
    routes
});


export default router

