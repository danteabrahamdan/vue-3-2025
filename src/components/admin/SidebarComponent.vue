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
        <span class="i-lucide-x h-5 w-5"></span>
      </button>
    </div>

    <!-- Navigation Menu -->
    <div class="sidebar-content overflow-y-auto h-[calc(100%-60px)]">
      <!-- MENU Section -->
      <nav-section title="MENU" :items="menuItems" />

      <!-- APPS Section -->
      <nav-section title="APPS" :items="appsItems" />

      <!-- PAGES Section -->
      <nav-section
        title="PAGES"
        :items="pagesItems"
        :active-submenu="activeSubmenu"
        @toggle-submenu="toggleSubmenu"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import NavSection from './NavSectionComponent.vue'

interface Props {
  isOpen: boolean
}

defineProps<Props>()
const emit = defineEmits(['close'])

const activeSubmenu = ref('utility')

const menuItems = [
  {
    icon: 'i-lucide-home',
    label: 'Dashboard',
    hasArrow: true
  },
  {
    icon: 'i-lucide-activity',
    label: 'Changelog',
    badge: '2.0.1'
  }
]

const appsItems = [
  {
    icon: 'i-lucide-message-circle',
    label: 'Chat'
  },
  {
    icon: 'i-lucide-mail',
    label: 'Email'
  },
  {
    icon: 'i-lucide-layout-grid',
    label: 'Kanban'
  },
  {
    icon: 'i-lucide-calendar',
    label: 'Calendar'
  },
  {
    icon: 'i-lucide-check-square',
    label: 'Todo'
  },
  {
    icon: 'i-lucide-folder',
    label: 'Projects',
    hasArrow: true
  }
]

const pagesItems = [
  {
    icon: 'i-lucide-lock',
    label: 'Authentication',
    hasArrow: true
  },
  {
    icon: 'i-lucide-layout',
    label: 'Utility',
    id: 'utility',
    hasSubmenu: true,
    submenuItems: [
      { label: 'Invoice' },
      { label: 'Pricing' },
      { label: 'Testimonial' },
      { label: 'FAQ' },
      { label: 'Blog' },
      { label: 'Blank Page', active: true },
      { label: 'Profile' }
    ]
  }
]

const toggleSubmenu = (id: string) => {
  activeSubmenu.value = activeSubmenu.value === id ? '' : id
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--primary-color);
  overflow-x: hidden;
}
</style>
