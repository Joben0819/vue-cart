// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import Home from '../pages/home.vue';
import Checkout from '../pages/checkout.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes,
});

export default router;
