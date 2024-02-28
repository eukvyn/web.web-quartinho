import { createApp } from 'vue';
import DefaultTemplate from './templates/Default.vue'
import router from './router'
import vuex from './store'
import Toast from "vue-toastification";
import "./plugins/vee-validate"; 

import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

let app = createApp(DefaultTemplate)
app.use(router).use(vuex).use(Toast);

app.mount('#app')
