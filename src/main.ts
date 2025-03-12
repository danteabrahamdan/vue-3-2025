import '@/assets/styles/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import AuraPreset from './assets/presets/AuraPreset';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import ToggleSwitch from 'primevue/toggleswitch';
import Select from 'primevue/select';
import Fluid from 'primevue/fluid';
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';

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
app.component('pInputText', InputText);
app.component('pInputIcon', InputIcon);
app.component('pIconField', IconField);
app.component('pTag', Tag);
app.component('pTextarea', Textarea);
app.component('pToggleSwitch', ToggleSwitch);
app.component('pSelect', Select);
app.component('pFluid', Fluid);
app.component('pConfirmDialog', ConfirmDialog);
app.component('pDialog', Dialog);

app.mount('#app');
