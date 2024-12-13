import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Assurez-vous d'importer correctement le routeur

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const app = createApp(App); // Créez une instance Vue
app.use(router); // Ajoutez Vue Router
app.mount("#app"); // Montez l'application
