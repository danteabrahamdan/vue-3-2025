<template>
  <aside
    :class="[
      'sidebar fixed left-0 top-0 bottom-0 z-50 transition-all duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <!-- Logo section -->
    <div class="sidebar-header flex items-center px-5 py-4">
      <div class="logo-container flex items-center">
        <div class="logo-box bg-white/10 rounded p-1 mr-2">
          <span class="text-white font-bold pr-2 pl-2">E</span>
        </div>
        <h1 class="text-white text-xl font-semibold">Educomser</h1>
      </div>
      <button class="ml-auto text-white/70 hover:text-white md:hidden" @click="$emit('close')">
        <span class="pi pi-times h-5 w-5"></span>
      </button>
    </div>

    <!-- Navigation Menu -->
    <div class="sidebar-content overflow-y-auto h-[calc(100%-60px)]">
      <!-- Home Section -->
      <nav-section title="Home" :items="menuItems" @select-item="$emit('close')" />

      <!-- Options Section -->
      <nav-section title="Options" :items="appsItems" @select-item="$emit('close')" />

      <!-- Home Section -->
      <nav-section title="Settings" :items="settingItems" @select-item="$emit('close')" />

      <!-- PAGES Section -->
      <nav-section
        title="PAGES"
        :items="pagesItems"
        :active-submenu="activeSubmenu"
        @toggle-submenu="toggleSubmenu"
        @select-item="$emit('close')"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import NavSection from './NavSection.vue';

interface Props {
  isOpen: boolean;
}

defineProps<Props>();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['close']);

const activeSubmenu = ref('utility');

const menuItems = [
  {
    icon: 'pi pi-home',
    label: 'Dashboard',
    hasArrow: false,
    to: '/admin'
  }
];

const appsItems = [
  {
    icon: 'pi pi-clipboard',
    label: 'Products',
    to: '/admin/products'
  },
  {
    icon: 'pi pi-clone',
    label: 'Categories',
    to: '/admin/categories'
  },
  {
    icon: 'pi pi-user',
    label: 'Users',
    to: '/admin/users'
  },
  {
    icon: 'pi pi-flag-fill',
    label: 'Roles',
    to: '/admin/roles'
  }
];

const settingItems = [
  {
    icon: 'pi pi-cog',
    label: 'Settings',
    hasArrow: false,
    to: '/admin/settings'
  },
  {
    icon: 'pi pi-sign-out',
    label: 'Logout',
    hasArrow: false,
    action: () => console.log('Changelog clicked')
  }
];

const pagesItems = [
  {
    icon: 'pi pi-lock',
    label: 'Authentication',
    hasArrow: false,
    action: () => console.log('Auth clicked')
  },
  {
    icon: 'pi pi-user',
    label: 'Utility',
    id: 'utility',
    hasSubmenu: true,
    submenuItems: [
      {
        label: 'Invoice',
        to: '/invoice'
      },
      {
        label: 'Pricing',
        to: '/pricing'
      },
      {
        label: 'Testimonial',
        to: '/testimonial'
      },
      {
        label: 'FAQ',
        to: '/faq'
      },
      {
        label: 'Blog',
        to: '/blog'
      },
      {
        label: 'Blank Page',
        to: '/blank-page',
        active: true
      },
      {
        label: 'Profile',
        to: '/profile'
      }
    ]
  }
];

const toggleSubmenu = (id: string) => {
  activeSubmenu.value = activeSubmenu.value === id ? '' : id;
};
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--primary-color);
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
