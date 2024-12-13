import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import router from "./router"; // Assurez-vous d'importer correctement le routeur

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const app = createApp(App); // Créez une instance Vue
const pinia = createPinia();
app.use(router); // Ajoutez Vue Router
app.mount("#app"); // Montez l'application
app.use(pinia);
