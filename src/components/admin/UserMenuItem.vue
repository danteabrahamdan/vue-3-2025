<template>
  <a
    href="#"
    class="menu-item flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
  >
    <span :class="[icon, 'h-4 w-4 mr-2']"></span>
    <span>{{ label }}</span>
  </a>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  label: string
}

defineProps<Props>()
</script>
