<script setup lang="ts">
import { useToast } from 'primevue';
import { ref } from 'vue';
import axios from 'axios';

const user = ref({ email: 'johndoe@mail.com', password: '' });
const toast = useToast();

const loginUser = async () => {
  try {
    const response = await axios.post('https://app-service-production-e951.up.railway.app/authentication/login', user.value);
    console.log(response);
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.response.data.message, life: 4000 });
  }
}

</script>

<template>
  <div class="bg-blue-100 flex justify-center items-center h-screen">
    <div class="p-7 shadow-lg rounded-2xl w-full lg:w-4/12 mx-auto bg-white">
      <div class="text-center mb-5">
        <img src="@/assets/icons/hyper.svg" alt="Image" height="50" class="mb-3 mx-auto">
        <div class="text-gray-900 text-2xl font-medium mb-3">Welcome Back</div>
        <span class="text-gray-600 text-sm font-medium">Don't have an account?</span>
        <a class="font-medium text-blue-500 hover:underline ml-2 text-sm" href="/auth/register">Create today!</a>
      </div>

      <div>
        <label for="email1" class="block text-gray-900 font-medium mb-2">Email</label>
        <input id="email1" type="text" placeholder="Email address"
          class="w-full mb-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2" v-model="user.email" />

        <small class="text-red-500 block mb-5">The field is required</small>

        <label for="password1" class="block text-gray-900 font-medium mb-2">Password</label>
        <input id="password1" type="password" placeholder="Password"
          class="w-full mb-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2" v-model="user.password" />

        <small class="text-red-500 block mb-5">The field is required</small>

        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <pCheckbox inputId="rememberme1" class="mr-2" binary />
            <label for="rememberme1" class="text-gray-900">Accept terms and conditions</label>
          </div>

          <a class="font-medium text-blue-500 hover:underline text-right" href="#">Forgot password?</a>
        </div>

        <div class="flex justify-center items-center w-full">
          <pButton label="Sign in" icon="pi pi-user" class="text-white rounded-md" @click="loginUser" />
        </div>
      </div>
    </div>
  </div>

  <pToast />
</template>
