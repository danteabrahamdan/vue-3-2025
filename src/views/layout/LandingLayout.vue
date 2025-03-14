<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore';
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const userStore = useUserStore();

// Estado para el menú móvil
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

// Función para alternar el menú móvil
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Función para detectar el scroll y aplicar el efecto blur al header
const handleScroll = () => {
  if (window.scrollY > 10) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

// Agregar y remover el event listener para el scroll
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <header
      class="fixed top-0 left-0 right-0 mx-[5px] mt-[5px] z-50 transition-all duration-300"
      :class="{
        'bg-black/70 backdrop-blur-md rounded-lg': isScrolled,
        'bg-transparent': !isScrolled
      }"
    >
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="h-8 w-8 bg-red-500 flex items-center justify-center rounded-sm mr-2">
            <span class="font-bold text-white">E</span>
          </div>
          <span class="font-bold text-white text-xl">Educomser</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <a href="#" class="text-gray-300 hover:text-white transition-colors">Docs</a>
          <a href="#" class="text-gray-300 hover:text-white transition-colors">Community</a>
          <div class="flex items-center space-x-3 ml-6" v-if="!userStore.isAuthenticated">
            <RouterLink
              :to="{ name: 'Login' }"
              class="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Log in
            </RouterLink>
            <RouterLink
              :to="{ name: 'Register' }"
              class="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Register
            </RouterLink>
          </div>

          <div class="flex items-center space-x-3 ml-6" v-else>
            <RouterLink
              :to="{ name: 'Dashboard' }"
              class="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Go panel
            </RouterLink>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black z-40 md:hidden pt-20 px-4">
      <div class="flex flex-col space-y-6">
        <a href="#" class="text-white text-xl py-2">Docs</a>
        <a href="#" class="text-white text-xl py-2">Community</a>
        <template v-if="!userStore.isAuthenticated">
          <RouterLink
            :to="{ name: 'Login' }"
            class="w-full py-3 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center font-medium mt-4"
          >
            Log in
          </RouterLink>
          <RouterLink
            :to="{ name: 'Register' }"
            class="w-full py-3 rounded-md bg-white text-black text-center font-medium"
          >
            Register
          </RouterLink>
        </template>

        <template v-else>
          <RouterLink
            :to="{ name: 'Dashboard' }"
            class="w-full py-3 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center font-medium mt-4"
          >
            Go panel
          </RouterLink>
        </template>
      </div>
    </div>

    <!-- Announcement Banner -->
    <div class="container mx-auto px-4 pt-24 md:pt-32">
      <div class="bg-gray-900 rounded-lg p-3 text-center text-sm mb-12 max-w-md mx-auto">
        <span class="inline-flex items-center">
          <span class="text-orange-500 mr-2">⚡</span>
          New version is available now!
          <span class="ml-2">→</span>
        </span>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="container mx-auto px-4 text-center pt-8 md:pt-16">
      <h1 class="text-4xl md:text-7xl font-bold mb-6">
        Ship Faster with <span class="text-pink-400">Educomser</span>
      </h1>
      <p class="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
        Trae is an adaptive Platform that transforms how you work, collaborating with you to run
        faster.
      </p>
      <div class="flex flex-col items-center">
        <a
          href="#"
          class="w-full max-w-xs py-3 px-6 rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white text-center font-medium mb-2"
        >
          Apply
        </a>
        <a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">
          See all options
        </a>
      </div>

      <!-- IDE Preview Image -->
      <div class="mt-16 relative">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/257/217/106/minimalism-gradient-blurred-wallpaper-preview.jpg"
          alt="Interface"
          class="rounded-lg w-full max-w-4xl mx-auto"
        />
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-24">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Feature 1 -->
        <div>
          <div class="text-red-500 font-medium mb-2"># Builder</div>
          <h3 class="text-2xl font-bold mb-4">Chat to build a project faster</h3>
          <p class="text-gray-400 mb-6">
            In Builder mode, Trae automatically breaks down and executes tasks, optimizing each step
            while letting you preview and control the process.
          </p>
          <div class="rounded-lg overflow-hidden bg-gray-900 h-48 flex items-center justify-center">
            <span class="text-gray-500">Feature Preview</span>
          </div>
        </div>

        <!-- Feature 2 -->
        <div>
          <div class="text-red-500 font-medium mb-2"># Multimodality</div>
          <h3 class="text-2xl font-bold mb-4">
            Upload images to clarify the most suitable agent, maximizing your productivity.
          </h3>
          <p class="text-gray-400 mb-6">
            Trae understands visual context to provide more accurate assistance and code generation.
          </p>
          <div class="rounded-lg overflow-hidden bg-gray-900 h-48 flex items-center justify-center">
            <span class="text-gray-500">Feature Preview</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="container mx-auto px-4 py-12 border-t border-gray-800">
      <div class="flex flex-col md:flex-row items-start">
        <!-- Logo and Copyright -->
        <div class="mb-8 md:mb-0 md:w-1/4">
          <div class="flex items-center mb-2">
            <div class="h-6 w-6 bg-red-500 flex items-center justify-center rounded-sm mr-2">
              <span class="font-bold text-white text-xs">T</span>
            </div>
            <span class="font-bold text-white">Educomser</span>
          </div>
          <p class="text-gray-500 text-sm">Copyright © 2025. All rights reserved.</p>

          <!-- Newsletter -->
          <div class="mt-6 flex">
            <input
              type="email"
              placeholder="Enter your email"
              class="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none"
            />
            <button class="bg-red-500 text-white px-4 py-2 rounded-r-md">Subscribe</button>
          </div>
        </div>

        <!-- Footer Links -->
        <div class="grid grid-cols-3 gap-8 w-full md:w-3/4">
          <!-- Terms Column -->
          <div>
            <h4 class="font-medium mb-4">Terms</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              </li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Support Column -->
          <div>
            <h4 class="font-medium mb-4">Supports</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">Feedback</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">Docs</a></li>
            </ul>
          </div>

          <!-- Engage Column -->
          <div>
            <h4 class="font-medium mb-4">Engage</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">Discord</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #ff4d4d;
  --primary-gradient: linear-gradient(to right, #ff4d4d, #f472b6);
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #000;
  color: #fff;
}
</style>
