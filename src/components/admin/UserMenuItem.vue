<template>
  <component
    :is="to ? 'router-link' : 'a'"
    :to="to || undefined"
    :href="!to ? '#' : undefined"
    class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
    @click="handleClick"
  >
    <span :class="[icon, 'h-4 w-4 mr-2']"></span>
    <span>{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  icon: string;
  label: string;
  to?: string;
  action?: () => void;
}

const props = defineProps<Props>();

const emit = defineEmits(['select']);

const handleClick = (event: MouseEvent) => {
  if (props.action) {
    event.preventDefault();
    props.action();
  } else if (!props.to) {
    event.preventDefault();
  }

  // Emitir evento de selección para cerrar el menú
  emit('select');
};
</script>

<style scoped>
.menu-item {
  transition: all 0.2s;
  color: inherit;
  text-decoration: none;
}
</style>
