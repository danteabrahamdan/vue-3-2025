import '@/assets/styles/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import AuraPreset from './assets/presets/AuraPreset';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: AuraPreset
  }
});

app.use(createPinia());
app.use(router);
app.use(ToastService);

app.component('pButton', Button);
app.component('pCheckbox', Checkbox);
app.component('pToast', Toast);

app.mount('#app');
