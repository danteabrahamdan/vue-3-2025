<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/UserStore';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUserData();
});
</script>

<template>
  <RouterView />

  <pConfirmDialog></pConfirmDialog>
</template>
