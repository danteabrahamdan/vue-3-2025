<template>
  <div class="menu-section mb-4">
    <div class="menu-title px-5 py-2 text-xs font-medium text-white/50">
      {{ title }}
    </div>
    <ul class="menu-items">
      <li
        v-for="item in items"
        :key="item.label"
        class="menu-item"
        :class="{ active: item.id === activeSubmenu }"
      >
        <a
          href="#"
          class="menu-link"
          @click.prevent="item.hasSubmenu ? $emit('toggle-submenu', item.id) : null"
        >
          <span :class="[item.icon, 'h-5 w-5']"></span>
          <span class="ml-2">{{ item.label }}</span>

          <template v-if="item.badge">
            <span class="version-badge ml-auto">{{ item.badge }}</span>
          </template>

          <template v-else-if="item.hasArrow">
            <span class="i-lucide-chevron-right ml-auto h-4 w-4"></span>
          </template>

          <template v-else-if="item.hasSubmenu">
            <span
              :class="[
                'ml-auto h-4 w-4 transition-transform',
                item.id === activeSubmenu ? 'rotate-90' : ''
              ]"
              class="i-lucide-chevron-down"
            ></span>
          </template>
        </a>

        <ul v-if="item.hasSubmenu && item.id === activeSubmenu" class="submenu">
          <li
            v-for="subItem in item.submenuItems"
            :key="subItem.label"
            class="submenu-item"
            :class="{ active: subItem.active }"
          >
            <a href="#" class="submenu-link">
              <span class="submenu-dot"></span>
              <span>{{ subItem.label }}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  items: any[]
  activeSubmenu?: string
}

defineProps<Props>()
defineEmits(['toggle-submenu'])
</script>

<style scoped>
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

.version-badge {
  background-color: #000;
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
}
</style>
