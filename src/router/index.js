import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 
import ModuleList from '../components/modules/ModuleList.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/modules',
    name: 'Modules',
    component: ModuleList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
