<template>
  <div class="app-container">
    <!-- Sidebar -->
    <TheSidebar :is-open="isSidebarOpen" @close="closeSidebar" />

    <!-- Main Content -->
    <main class="main-content md:ml-[320px] transition-all duration-300 flex flex-col h-screen">
      <!-- Header -->
      <TheHeader
        :is-dark="isDarkMode"
        :is-user-menu-open="isUserMenuOpen"
        @toggle-sidebar="toggleSidebar"
        @toggle-theme="toggleTheme"
        @toggle-user-menu="toggleUserMenu"
        @close-user-menu="closeUserMenu"
      />

      <!-- Page Content -->
      <div class="page-content p-3 md:p-6 bg-slate-50 dark:bg-slate-900 flex-1 overflow-y-auto">
        <RouterView />
      </div>

      <!-- Footer -->
      <TheFooter />
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav
      class="mobile-nav fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around py-2 md:hidden z-50"
    >
      <a href="#" class="nav-item flex flex-col items-center">
        <span class="pi pi-envelope h-5 w-5 relative">
          <span class="notification-badge">3</span>
        </span>
        <span class="text-xs mt-1">Messages</span>
      </a>
      <a href="#" class="nav-item flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          class="w-8 h-8 rounded-full object-cover border-2 border-white"
        />
      </a>
      <a href="#" class="nav-item flex flex-col items-center">
        <span class="pi pi-bell h-5 w-5 relative">
          <span class="notification-badge">2</span>
        </span>
        <span class="text-xs mt-1">Notifications</span>
      </a>
    </nav>

    <!-- Overlay for mobile sidebar -->
    <div
      v-if="isSidebarOpen"
      class="sidebar-overlay fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router';
import TheSidebar from '../../components/admin/AdminSidebar.vue';
import TheHeader from '../../components/admin/AdminHeader.vue';
import TheFooter from '../../components/admin/AdminFooter.vue';

const isSidebarOpen = ref(false);
const isUserMenuOpen = ref(false);
const isDarkMode = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (isUserMenuOpen.value && !target.closest('.user-profile')) {
    isUserMenuOpen.value = false;
  }

  // Cerrar sidebar en móvil cuando se hace clic fuera
  if (isSidebarOpen.value && !target.closest('.sidebar') && !target.closest('.menu-toggle')) {
    closeSidebar();
  }
};

onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }

  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
:root {
  --primary-color: #1e293b;
  --primary-hover: #334155;
  --accent-color: #3b82f6;
  --sidebar-width: 320px;
}

.dark {
  color-scheme: dark;
}

/* Scroll styles */
.page-content::-webkit-scrollbar {
  width: 5px;
}

.page-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.page-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.page-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .main-content {
    padding-bottom: 60px;
  }
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ef4444;
  color: white;
  font-size: 0.65rem;
  min-width: 1rem;
  height: 1rem;
  padding: 0 0.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
