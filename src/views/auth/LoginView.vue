<script setup lang="ts">
import { useToast } from 'primevue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { object, string } from 'yup';
import { useForm } from 'vee-validate';
import { useUserStore } from '../../stores/UserStore';
import http from '../../services/ClientHttp';

// Schema definition
const loginSchema = object({
  email: string().email('Email format not valid').required('Field required'),
  password: string().required('Field required')
});

// refs definition
const toast = useToast();
const userStore = useUserStore();
const router = useRouter();
const loading = ref(false);

// Form definition with vee-validate
const { defineField, errors, values, meta } = useForm({
  validationSchema: loginSchema,
  initialValues: { email: '', password: '' }
});

// Field definition
const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');

const validForm = computed(() => {
  return meta.value.valid;
});

// Function to login user
const loginUser = async () => {
  loading.value = true;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await http.post('/authentication/login', values);
    userStore.setUserData(response.data);
    router.push({ name: 'Dashboard' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    loading.value = false;

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 4000
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="bg-blue-100 flex justify-center items-center h-screen">
    <div class="p-7 shadow-lg rounded-2xl w-full lg:w-4/12 mx-auto bg-white">
      <div class="text-center mb-5">
        <img src="@/assets/icons/hyper.svg" alt="Image" height="50" class="mb-3 mx-auto" />
        <div class="text-gray-900 text-2xl font-medium mb-3">Welcome Back</div>
        <span class="text-gray-600 text-sm font-medium">Don't have an account?</span>
        <a class="font-medium text-blue-500 hover:underline ml-2 text-sm" href="/auth/register"
          >Create today!</a
        >
      </div>

      <div>
        <label for="email1" class="block text-gray-900 font-medium mb-2">Email</label>
        <input
          autofocus
          id="email1"
          type="text"
          placeholder="Email address"
          class="w-full mb-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2"
          v-model="email"
          v-bind="emailAttr"
        />

        <small class="text-red-500 block mb-5">
          {{ errors.email }}
        </small>

        <label for="password1" class="block text-gray-900 font-medium mb-2">Password</label>
        <input
          id="password1"
          type="password"
          placeholder="Password"
          class="w-full mb-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2"
          v-model="password"
          v-bind="passwordAttr"
        />

        <small class="text-red-500 block mb-5">
          {{ errors.password }}
        </small>

        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <pCheckbox inputId="rememberme1" class="mr-2" binary />
            <label for="rememberme1" class="text-gray-900">Accept terms and conditions</label>
          </div>

          <a class="font-medium text-blue-500 hover:underline text-right" href="#">
            Forgot password?
          </a>
        </div>

        <div class="flex justify-center items-center w-full">
          <pButton
            label="Sign in"
            icon="pi pi-user"
            class="text-white rounded-md"
            @click="loginUser"
            :disabled="!validForm"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </div>

  <pToast />
</template>
