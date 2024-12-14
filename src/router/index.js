import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 
import ModuleList from '../components/modules/ModuleList.vue';
import StudentList from '../components/students/StudentList.vue'


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
  {
    path: '/students',
    name: 'Students',
    component: StudentList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
