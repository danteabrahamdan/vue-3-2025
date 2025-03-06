<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const products = ref([
  { id: 1, name: 'Product 1', price: 100, stock: 10 },
  { id: 2, name: 'Product 2', price: 200, stock: 20 }
]);
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden p-4">
    <h1 class="text-lg font-semibold mb-4 ml-4 text-slate-800 dark:text-white">Products</h1>

    <pDataTable :value="products" dataKey="id">
      <template #header>
        <div class="flex justify-between">
          <RouterLink :to="{ name: 'Add product' }">
            <pButton type="button" icon="pi pi-plus" label="Add product" outlined />
          </RouterLink>

          <pIconField>
            <pInputIcon>
              <i class="pi pi-search" />
            </pInputIcon>

            <pInputText placeholder="Search" />
          </pIconField>
        </div>
      </template>

      <template #empty> No customers found. </template>

      <template #loading> Loading data. Please wait. </template>

      <pColumn field="name" header="Name"></pColumn>

      <pColumn field="price" header="Price"></pColumn>

      <pColumn field="stock" header="Stock"></pColumn>

      <pColumn header="Actions">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template #body="slotProps">
          <pButton icon="pi pi-eye" class="mr-1" rounded variant="text" />
          <pButton icon="pi pi-pencil" class="mr-1" rounded variant="text" />
          <pButton icon="pi pi-trash" rounded variant="text" />
        </template>
      </pColumn>
    </pDataTable>
  </div>
</template>
