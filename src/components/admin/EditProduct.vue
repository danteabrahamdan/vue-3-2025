<script setup lang="ts">
import http from '@/services/ClientHttp';
import { onMounted } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: () => ({})
  }
});

const categories = ref([]);

// Definition of methods
const getCategoryProducts = async () => {
  try {
    const response = await http.get('/category/basic');
    categories.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(getCategoryProducts);

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<!-- eslint-disable vue/no-mutating-props -->
<template>
  <pDialog
    v-model:visible="props.visible"
    modal
    header="Edit product"
    :style="{ width: '35rem' }"
    :draggable="false"
    :closable="false"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

    <pFluid>
      <div class="flex items-center gap-4 mb-2">
        <label for="pNameE" class="font-semibold w-40">Product name</label>
        <pInputText
          id="pNameE"
          class="flex-auto"
          autocomplete="off"
          v-model="product.name"
          size="small"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pCodeE" class="font-semibold w-30"></label>
        <small class="text-red-500 block">Error</small>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pDescriptionE" class="font-semibold w-40">Product description</label>
        <pTextarea id="pDescriptionE" rows="4" size="small" v-model="product.description" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pCodeE" class="font-semibold w-30"></label>
        <small class="text-red-500 block">Error</small>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pUnitE" class="font-semibold w-40">Unit price</label>
        <pInputText
          id="pUnitE"
          class="flex-auto"
          autocomplete="off"
          v-model="product.unitPrice"
          size="small"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pCodeE" class="font-semibold w-30"></label>
        <small class="text-red-500 block">Error</small>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pUnitStockE" class="font-semibold w-40">Units in stock</label>
        <pInputText
          id="pUnitStockE"
          class="flex-auto"
          autocomplete="off"
          v-model="product.unitsInStock"
          size="small"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pCodeE" class="font-semibold w-30"></label>
        <small class="text-red-500 block">Error</small>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pDisE" class="font-semibold w-30">Discontinued?</label>
        <pToggleSwitch id="pDisE" name="activation" v-model="product.discontinued" class="ml-0" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pUnitStockE" class="font-semibold w-40">Category</label>
        <pSelect
          id="pCategory"
          :options="categories"
          optionLabel="categoryName"
          optionValue="categoryId"
          placeholder="Select One"
          class="w-full"
          size="small"
          v-model="product.categoryId"
        ></pSelect>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pCodeE" class="font-semibold w-30"></label>
        <small class="text-red-500 block">Error</small>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pImageE" class="font-semibold w-40">Change image (Optional)</label>
        <pInputText id="pImageE" class="flex-auto" autocomplete="off" size="small" type="file" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="pCodeE" class="font-semibold w-30"></label>
        <small class="text-red-500 block">Error</small>
      </div>
    </pFluid>

    <div class="flex justify-end gap-2">
      <pButton
        type="button"
        label="Cancel"
        severity="secondary"
        @click="closeModal"
        size="small"
      ></pButton>
      <pButton type="button" label="Save" size="small"></pButton>
    </div>
  </pDialog>
</template>
