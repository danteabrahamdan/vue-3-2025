<script setup lang="ts">
import { ref, onMounted } from 'vue'

/**
 * State for sidebar visibility
 * @type {import('vue').Ref<boolean>}
 */
const isSidebarOpen = ref(false)

/**
 * State for utility submenu visibility
 * @type {import('vue').Ref<boolean>}
 */
const isUtilityOpen = ref(true)

/**
 * State for user menu dropdown visibility
 * @type {import('vue').Ref<boolean>}
 */
const isUserMenuOpen = ref(false)

/**
 * State for dark mode
 * @type {import('vue').Ref<boolean>}
 */
const isDarkMode = ref(false)

/**
 * Toggle sidebar visibility
 * @returns {void}
 */
const toggleSidebar = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value
}

/**
 * Toggle utility submenu visibility
 * @returns {void}
 */
const toggleUtility = (): void => {
  isUtilityOpen.value = !isUtilityOpen.value
}

/**
 * Toggle user menu dropdown visibility
 * @returns {void}
 */
const toggleUserMenu = (): void => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

/**
 * Toggle dark mode
 * @returns {void}
 */
const toggleTheme = (): void => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/**
 * Close user menu when clicking outside
 * @param {MouseEvent} event - The mouse event
 * @returns {void}
 */
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (isUserMenuOpen.value && !target.closest('.user-profile')) {
    isUserMenuOpen.value = false
  }
}

/**
 * Initialize component
 */
onMounted(() => {
  // Check system preference for dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }

  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="app-container">
    <!-- Sidebar (visible on desktop, hidden on mobile) -->
    <aside
      :class="[
        'sidebar fixed left-0 top-0 bottom-0 z-50 transition-all duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <!-- Logo section -->
      <div class="sidebar-header flex items-center px-5 py-4">
        <div class="logo-container flex items-center">
          <div class="logo-box bg-white/10 rounded p-1 mr-2">
            <span class="text-white font-bold">D</span>
          </div>
          <h1 class="text-white text-xl font-semibold">DashCode</h1>
        </div>
        <button class="ml-auto text-white/70 hover:text-white md:hidden" @click="toggleSidebar">
          <span class="i-lucide-x h-5 w-5"></span>
        </button>
      </div>

      <!-- Navigation Menu -->
      <div class="sidebar-content overflow-y-auto h-[calc(100%-60px)]">
        <!-- MENU Section -->
        <div class="menu-section mb-4">
          <div class="menu-title px-5 py-2 text-xs font-medium text-white/50">MENU</div>
          <ul class="menu-items">
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-home h-5 w-5"></span>
                <span class="ml-2">Dashboard</span>
                <span class="i-lucide-chevron-right ml-auto h-4 w-4"></span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-activity h-5 w-5"></span>
                <span class="ml-2">Changelog</span>
                <span class="version-badge ml-auto">2.0.1</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- APPS Section -->
        <div class="menu-section mb-4">
          <div class="menu-title px-5 py-2 text-xs font-medium text-white/50">APPS</div>
          <ul class="menu-items">
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-message-circle h-5 w-5"></span>
                <span class="ml-2">Chat</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-mail h-5 w-5"></span>
                <span class="ml-2">Email</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-layout-grid h-5 w-5"></span>
                <span class="ml-2">Kanban</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-calendar h-5 w-5"></span>
                <span class="ml-2">Calender</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-check-square h-5 w-5"></span>
                <span class="ml-2">Todo</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-folder h-5 w-5"></span>
                <span class="ml-2">Projects</span>
                <span class="i-lucide-chevron-right ml-auto h-4 w-4"></span>
              </a>
            </li>
          </ul>
        </div>

        <!-- PAGES Section -->
        <div class="menu-section mb-4">
          <div class="menu-title px-5 py-2 text-xs font-medium text-white/50">PAGES</div>
          <ul class="menu-items">
            <li class="menu-item">
              <a href="#" class="menu-link">
                <span class="i-lucide-lock h-5 w-5"></span>
                <span class="ml-2">Authentication</span>
                <span class="i-lucide-chevron-right ml-auto h-4 w-4"></span>
              </a>
            </li>
            <li class="menu-item" :class="{ active: isUtilityOpen }">
              <a href="#" class="menu-link" @click.prevent="toggleUtility">
                <span class="i-lucide-layout h-5 w-5"></span>
                <span class="ml-2">Utility</span>
                <span
                  :class="[
                    'ml-auto h-4 w-4 transition-transform',
                    isUtilityOpen ? 'rotate-90' : ''
                  ]"
                  class="i-lucide-chevron-down"
                ></span>
              </a>
              <ul v-if="isUtilityOpen" class="submenu">
                <li class="submenu-item">
                  <a href="#" class="submenu-link">
                    <span class="submenu-dot"></span>
                    <span>Invoice</span>
                  </a>
                </li>
                <li class="submenu-item">
                  <a href="#" class="submenu-link">
                    <span class="submenu-dot"></span>
                    <span>Pricing</span>
                  </a>
                </li>
                <li class="submenu-item">
                  <a href="#" class="submenu-link">
                    <span class="submenu-dot"></span>
                    <span>Testimonial</span>
                  </a>
                </li>
                <li class="submenu-item">
                  <a href="#" class="submenu-link">
                    <span class="submenu-dot"></span>
                    <span>FAQ</span>
                  </a>
                </li>
                <li class="submenu-item">
                  <a href="#" class="submenu-link">
                    <span class="submenu-dot"></span>
                    <span>Blog</span>
                  </a>
                </li>
                <li class="submenu-item active">
                  <a href="#" class="submenu-link">
                    <span class="submenu-dot"></span>
                    <span>Blank Page</span>
                  </a>
                </li>
                <li class="submenu-item">
                  <a href="#" class="submenu-link">
                    <span class="submenu-dot"></span>
                    <span>Profile</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content md:ml-[240px] transition-all duration-300 flex flex-col h-screen">
      <!-- Top Navigation Bar -->
      <header
        class="top-navbar flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10"
      >
        <!-- Left Section: Mobile Menu Toggle & Search -->
        <div class="flex items-center">
          <button class="menu-toggle mr-3 md:hidden" @click="toggleSidebar">
            <span class="i-lucide-menu h-6 w-6"></span>
          </button>
          <div
            class="search-container hidden md:flex items-center bg-slate-100 dark:bg-slate-700/50 rounded-md px-3 py-1.5"
          >
            <span class="i-lucide-search h-4 w-4 text-slate-400"></span>
            <input
              type="text"
              placeholder="Search..."
              class="bg-transparent border-none outline-none ml-2 text-sm w-48"
            />
          </div>
        </div>

        <!-- Right Section: Actions & User Profile -->
        <div class="flex items-center space-x-3">
          <!-- Language Selector -->
          <div class="language-selector">
            <button class="flex items-center">
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="English"
                class="w-5 h-5 rounded-full"
              />
              <span class="ml-1 text-sm hidden md:inline">En</span>
            </button>
          </div>

          <!-- Theme Toggle -->
          <button class="theme-toggle" @click="toggleTheme">
            <span v-if="isDarkMode" class="i-lucide-sun h-5 w-5"></span>
            <span v-else class="i-lucide-moon h-5 w-5"></span>
          </button>

          <!-- Help -->
          <button class="help-button">
            <span class="i-lucide-help-circle h-5 w-5"></span>
          </button>

          <!-- Messages -->
          <button class="messages-button relative">
            <span class="i-lucide-mail h-5 w-5"></span>
            <span class="notification-badge">3</span>
          </button>

          <!-- Notifications -->
          <button class="notifications-button relative">
            <span class="i-lucide-bell h-5 w-5"></span>
            <span class="notification-badge">2</span>
          </button>

          <!-- User Profile -->
          <div class="user-profile relative">
            <button class="flex items-center" @click="toggleUserMenu">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                class="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <span class="ml-2 hidden md:inline">Albert Flores</span>
              <span class="i-lucide-chevron-down ml-1 h-4 w-4 hidden md:inline"></span>
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="isUserMenuOpen"
              class="user-menu absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-md py-1 z-50 border border-slate-200 dark:border-slate-700"
            >
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-user h-4 w-4 mr-2"></span>
                <span>Profile</span>
              </a>
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-message-circle h-4 w-4 mr-2"></span>
                <span>Chat</span>
              </a>
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-mail h-4 w-4 mr-2"></span>
                <span>Email</span>
              </a>
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-check-square h-4 w-4 mr-2"></span>
                <span>Todo</span>
              </a>
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-settings h-4 w-4 mr-2"></span>
                <span>Settings</span>
              </a>
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-dollar-sign h-4 w-4 mr-2"></span>
                <span>Price</span>
              </a>
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-help-circle h-4 w-4 mr-2"></span>
                <span>Faq</span>
              </a>
              <a
                href="#"
                class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span class="i-lucide-log-out h-4 w-4 mr-2"></span>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="page-content p-4 md:p-6 bg-slate-50 dark:bg-slate-900 flex-1 overflow-y-auto">
        <h1 class="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Blank Page</h1>

        <!-- Page content goes here -->
        <div class="content-placeholder min-h-[1000px]">
          <!-- Contenido de ejemplo para demostrar el scroll -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div v-for="i in 9" :key="i" class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
              <h3 class="font-medium mb-2">Card {{ i }}</h3>
              <p class="text-slate-500 dark:text-slate-400">
                Este es un ejemplo de contenido para demostrar el funcionamiento del scroll.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer
        class="footer px-4 py-3 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 flex flex-wrap justify-between items-center sticky bottom-0 bg-white dark:bg-slate-800 z-10"
      >
        <div>COPYRIGHT © 2022 DashCode, All rights Reserved</div>
        <div>Hand-crafted & Made by <a href="#" class="text-blue-500">Codeshaper</a></div>
      </footer>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav
      class="mobile-nav fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around py-2 md:hidden z-50"
    >
      <a href="#" class="nav-item flex flex-col items-center">
        <span class="i-lucide-mail h-5 w-5 relative">
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
        <span class="i-lucide-bell h-5 w-5 relative">
          <span class="notification-badge">2</span>
        </span>
        <span class="text-xs mt-1">Notifications</span>
      </a>
    </nav>

    <!-- Settings Button (Fixed) -->
    <button
      class="settings-button fixed right-4 bottom-20 md:bottom-4 z-40 bg-slate-800 dark:bg-slate-700 text-white p-2 rounded-md shadow-lg"
    >
      <span class="i-lucide-settings h-5 w-5"></span>
    </button>

    <!-- Overlay for mobile sidebar -->
    <div
      v-if="isSidebarOpen"
      class="sidebar-overlay fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<style>
/* Base styles */
:root {
  --primary-color: #1e293b;
  --primary-hover: #334155;
  --accent-color: #3b82f6;
  --sidebar-width: 240px;
}

/* Dark mode styles */
.dark {
  color-scheme: dark;
}

/* Sidebar styles */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--primary-color);
  overflow-x: hidden;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.menu-item.active > .menu-link {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.version-badge {
  background-color: #000;
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
}

.submenu {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0;
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 0.4rem 1.25rem 0.4rem 2.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.submenu-link:hover {
  color: white;
}

.submenu-item.active .submenu-link {
  color: white;
}

.submenu-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: currentColor;
  margin-right: 0.75rem;
}

/* Notification badge */
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

/* Content placeholder for demo */
.content-placeholder {
  min-height: calc(100vh - 200px);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

/* Scroll styles */
.page-content::-webkit-scrollbar {
  width: 8px;
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

/* Ajustes para dispositivos móviles */
@media (max-width: 768px) {
  .main-content {
    padding-bottom: 60px; /* Espacio para la navegación móvil */
  }
}
</style>
