import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 
import ModuleList from '../components/modules/ModuleList.vue';
import StudentList from '../components/students/StudentList.vue'
import RegistrationList from '../components/registrations/RegistrationList.vue';
import PayementList from '../components/payments/PayementList.vue';


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
  {
    path: '/registrations',
    name: 'registrations',
    component: RegistrationList,
  },
  {
    path: '/payments',
    name: 'payments',
    component: PayementList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
