<script setup lang="ts">
import { ref } from 'vue';

const dropdownItems = ref([
  { name: 'Option 1', code: 'Option 1' },
  { name: 'Option 2', code: 'Option 2' },
  { name: 'Option 3', code: 'Option 3' }
]);
</script>

<template>
  <pFluid>
    <div class="flex mt-2">
      <div class="card flex flex-col gap-4 w-full">
        <div class="font-semibold text-2xl">New product</div>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="pName">Name</label>
            <pInputText id="pName" type="text" size="small" />
            <small class="text-red-500 block">Error</small>
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="pPrice">Unit price</label>
            <pInputText id="pPrice" type="number" size="small" />
            <small class="text-red-500 block">Error</small>
          </div>
        </div>

        <div class="flex flex-wrap">
          <label for="pDescription">Description</label>
          <pTextarea id="pDescription" rows="4" size="small" />
          <small class="text-red-500 block">Error</small>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="pStock">Units in stock</label>
            <pInputText id="pStock" type="number" size="small" />
            <small class="text-red-500 block">Error</small>
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <div class="flex flex-col flex-wrap">
              <label for="pDiscontinued" class="mb-2">Discontinued</label>
              <pToggleSwitch name="activation" />
              <small class="text-red-500 block mt-4">Error</small>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="pCategory">Category</label>
            <pSelect
              id="pCategory"
              :options="dropdownItems"
              optionLabel="name"
              placeholder="Select One"
              class="w-full"
              size="small"
            ></pSelect>
            <small class="text-red-500 block">Error</small>
          </div>

          <div class="flex flex-wrap gap-2 w-full">
            <label for="pImage">Image</label>
            <pInputText id="pImage" type="file" size="small" accept="image/*" />
            <small class="text-red-500 block">Error</small>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2">
            <pButton label="Save product" type="button" icon="pi pi-save" class="mt-4" />
          </div>
        </div>
      </div>
    </div>
  </pFluid>
</template>
