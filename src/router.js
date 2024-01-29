// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Game from './views/Game.vue';

const routes = [
  {
    path: '/game',
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
