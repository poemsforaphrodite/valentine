import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/image", // Dynamic route parameter for image name
    name: "Image",
    component: () => import("./views/Image.vue"), // Assuming you have an Image.vue component
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
