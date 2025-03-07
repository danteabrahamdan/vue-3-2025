<template>
  <header
    class="top-navbar flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10"
  >
    <!-- Left Section: Mobile Menu Toggle & Search -->
    <div class="flex items-center">
      <button class="menu-toggle mr-3 block md:hidden" @click="$emit('toggle-sidebar')">
        <span class="pi pi-bars h-6 w-6"></span>
      </button>

      <div
        class="search-container hidden md:flex items-center bg-slate-100 dark:bg-slate-700/50 rounded-md px-3 py-1.5"
      >
        <span class="pi pi-search h-4 w-4 text-slate-400"></span>
        <input
          type="text"
          placeholder="Search..."
          class="bg-transparent border-none outline-none ml-2 text-sm w-48"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center space-x-3">
      <!-- User Profile -->
      <div class="user-profile relative">
        <button class="flex items-center" @click="$emit('toggle-user-menu')">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            class="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
          <span class="ml-2 hidden md:inline">
            {{ userStore.user?.fullName }}
          </span>
          <span class="pi pi-angle-down ml-1 h-4 w-4"></span>
        </button>

        <!-- User Dropdown Menu -->
        <div
          v-if="isUserMenuOpen"
          class="user-menu absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-md py-1 z-50 border border-slate-200 dark:border-slate-700"
        >
          <UserMenuItem
            v-for="item in userMenuItems"
            :key="item.label"
            :icon="item.icon"
            :label="item.label"
            :to="item.to"
            :action="item.action"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import UserMenuItem from './UserMenuItem.vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import { useConfirm } from 'primevue';
import http from '@/services/ClientHttp';

const userStore = useUserStore();

const router = useRouter();

const confirm = useConfirm();

interface Props {
  isDark: boolean;
  isUserMenuOpen: boolean;
}

defineProps<Props>();
defineEmits(['toggle-sidebar', 'toggle-theme', 'toggle-user-menu']);

const handleLogout = () => {
  confirm.require({
    message: 'Confirm logout process',
    header: 'Logout',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: { label: 'Yes' },
    accept: async () => {
      try {
        await http.post('/authentication/logout');
        userStore.clearUserData();
        router.push({ name: 'Login' });
      } catch (error) {
        console.log(error);
      }
    }
  });
};

const userMenuItems = [
  { icon: 'pi pi-home', label: 'Home', to: '/' },
  { icon: 'pi pi-user', label: 'Profile', to: '/admin/profile' },
  { icon: 'pi pi-cog', label: 'Settings', to: '/admin/settings' },
  { icon: 'pi pi-sign-out', label: 'Logout', action: handleLogout }
];
</script>

<style scoped>
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
