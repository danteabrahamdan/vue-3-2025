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
        :class="{ active: isItemActive(item) }"
      >
        <component
          :is="item.to ? 'router-link' : 'a'"
          :to="item.to || '#'"
          :href="!item.to ? '#' : undefined"
          class="menu-link"
          @click="handleClick(item, $event)"
        >
          <span :class="[item.icon, 'h-5 w-5']"></span>
          <span class="ml-2">{{ item.label }}</span>

          <template v-if="item.badge">
            <span class="version-badge ml-auto">{{ item.badge }}</span>
          </template>

          <template v-else-if="item.hasArrow">
            <span class="pi pi-chevron-right ml-auto h-4 w-4"></span>
          </template>

          <template v-else-if="item.hasSubmenu">
            <span
              :class="[
                'ml-auto h-4 w-4 transition-transform',
                item.id === activeSubmenu ? 'rotate-90' : ''
              ]"
              class="pi pi-chevron-right"
            ></span>
          </template>
        </component>

        <ul v-if="item.hasSubmenu && item.id === activeSubmenu" class="submenu">
          <li
            v-for="subItem in item.submenuItems"
            :key="subItem.label"
            class="submenu-item"
            :class="{ active: isSubItemActive(subItem) }"
          >
            <component
              :is="subItem.to ? 'router-link' : 'a'"
              :to="subItem.to || '#'"
              :href="!subItem.to ? '#' : undefined"
              class="submenu-link"
              @click="handleSubItemClick(subItem, $event)"
            >
              <span class="submenu-dot"></span>
              <span>{{ subItem.label }}</span>
            </component>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRoute } from 'vue-router';

interface MenuItem {
  icon?: string;
  label: string;
  to?: string;
  action?: () => void;
  hasArrow?: boolean;
  badge?: string;
  id?: string;
  hasSubmenu?: boolean;
  submenuItems?: SubMenuItem[];
  active?: boolean;
}

interface SubMenuItem {
  label: string;
  to?: string;
  action?: () => void;
  active?: boolean;
}

interface Props {
  title: string;
  items: MenuItem[];
  activeSubmenu?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
const emit = defineEmits(['toggle-submenu', 'select-item']);

const route = useRoute();

const isItemActive = (item: MenuItem) => {
  if (item.to) {
    return route.path === item.to;
  }
  return item.active || false;
};

const isSubItemActive = (subItem: SubMenuItem) => {
  if (subItem.to) {
    return route.path === subItem.to;
  }
  return subItem.active || false;
};

const handleClick = (item: MenuItem, event: Event) => {
  if (item.hasSubmenu) {
    event.preventDefault();
    emit('toggle-submenu', item.id);
  } else if (item.action) {
    event.preventDefault();
    item.action();
    emit('select-item');
  } else if (!item.to) {
    event.preventDefault();
  } else {
    emit('select-item');
  }
};

const handleSubItemClick = (subItem: SubMenuItem, event: Event) => {
  if (subItem.action) {
    event.preventDefault();
    subItem.action();
    emit('select-item');
  } else if (!subItem.to) {
    event.preventDefault();
  } else {
    emit('select-item');
  }
};
</script>

<style scoped>
.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;
  font-size: 0.95rem;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.menu-item.active > .menu-link {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 500;
}

.submenu {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0;
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem 0.5rem 3rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  transition: all 0.2s;
}

.submenu-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.05);
}

.submenu-item.active .submenu-link {
  color: white;
  font-weight: 500;
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
