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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Fluid from 'primevue/fluid';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import ToggleSwitch from 'primevue/toggleswitch';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: AuraPreset
  }
});

app.use(createPinia());
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);

app.component('pButton', Button);
app.component('pCheckbox', Checkbox);
app.component('pToast', Toast);
app.component('pDataTable', DataTable);
app.component('pColumn', Column);
app.component('pIconField', IconField);
app.component('pInputIcon', InputIcon);
app.component('pInputText', InputText);
app.component('pFluid', Fluid);
app.component('pTextarea', Textarea);
app.component('pSelect', Select);
app.component('pDialog', Dialog);
app.component('pConfirmDialog', ConfirmDialog);
app.component('pToggleSwitch', ToggleSwitch);

app.mount('#app');
