<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['pageChanged']);

const pages = computed(() => {
  const range: number[] = [];

  for (let i = 1; i <= props.totalPages; i++) {
    range.push(i);
  }

  return range;
});

const changePage = (page: number) => {
  if (page !== props.currentPage) {
    emit('pageChanged', page);
  }
};
</script>

<template>
  <div class="flex justify-center mt-3">
    <pButton
      icon="pi pi-angle-double-left"
      text
      rounded
      :disabled="currentPage === 1"
      @click="changePage(1)"
    />

    <pButton
      icon="pi pi-angle-left"
      text
      rounded
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    />

    <pButton
      v-for="page in pages"
      :key="page"
      :label="page.toString()"
      :text="page !== currentPage"
      :disabled="currentPage === page"
      :outlined="page === currentPage"
      rounded
      variant="text"
      @click="changePage(page)"
    />

    <pButton
      icon="pi pi-angle-right"
      text
      rounded
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    />

    <pButton
      icon="pi pi-angle-double-right"
      text
      rounded
      :disabled="currentPage === totalPages"
      @click="changePage(totalPages)"
    />
  </div>
</template>
