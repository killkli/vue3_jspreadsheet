import { createApp } from 'vue';
import jSuites from "jsuites";
import Dev from './serve.vue';

const app = createApp(Dev);
app.mount('#app');
