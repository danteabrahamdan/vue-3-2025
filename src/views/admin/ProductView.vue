<script setup lang="ts">
import http from '@/services/ClientHttp';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import PaginationTable from '@/components/admin/PaginationTable.vue';
import { useConfirm, useToast } from 'primevue';
import EditProduct from '@/components/admin/EditProduct.vue';

const products = ref([]);
const totalCount = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchTerm = ref('');
const toast = useToast();
const confirm = useConfirm();

const getPaginatedProducts = async () => {
  try {
    const response = await http.get('/product', {
      params: {
        page: currentPage.value,
        take: itemsPerPage.value,
        search: searchTerm.value
      }
    });

    products.value = response.data.data;
    totalCount.value = response.data.totalCount;
  } catch (error) {
    console.log(error);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  getPaginatedProducts();
};

onMounted(getPaginatedProducts);

const deleteProduct = async (productId: number) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      try {
        await http.delete(`/product/${productId}`);
        getPaginatedProducts();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.response.data.message,
          life: 4000
        });
      }
    }
  });
};

const search = () => {
  getPaginatedProducts();
};

const selectedProduct = ref(null);
const editModal = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEditProduct = (product: any) => {
  selectedProduct.value = product;
  editModal.value = true;
};
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden p-4">
    <h1 class="text-lg font-semibold mb-4 ml-4 text-slate-800 dark:text-white">Products</h1>

    <pDataTable :value="products" dataKey="id">
      <template #header>
        <div class="flex justify-between">
          <RouterLink :to="{ name: 'Add product' }">
            <pButton type="button" icon="pi pi-plus" label="Add product" outlined size="small" />
          </RouterLink>

          <pInputText
            placeholder="Search"
            size="small"
            v-model="searchTerm"
            @keyup.enter="search"
          />
        </div>
      </template>

      <template #empty> No products found. </template>

      <template #loading> Loading data. Please wait. </template>

      <pColumn field="name" header="Name"></pColumn>

      <pColumn field="description" header="Description"></pColumn>

      <pColumn field="unitPrice" header="Unit price"></pColumn>

      <pColumn field="unitsInStock" header="Units in stock"></pColumn>

      <pColumn field="category.name" header="Category"></pColumn>

      <pColumn field="discontinued" header="Discontinued?">
        <template #body="slotProps">
          <span v-if="slotProps.data.discontinued">
            <pTag value="Yes" severity="success"></pTag>
          </span>
          <span v-else>
            <pTag value="No" severity="danger"></pTag>
          </span>
        </template>
      </pColumn>

      <pColumn field="creationDate" header="Creation date"></pColumn>

      <pColumn header="Image">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.productImagePath"
            :src="slotProps.data.productImagePath"
            alt="Product image"
            style="height: 50px; width: auto"
          />

          <img
            v-else
            src="@/assets/images/no-image.jpg"
            alt="Product image"
            style="height: 50px; width: auto"
          />
        </template>
      </pColumn>

      <pColumn header="Actions">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template #body="slotProps">
          <pButton
            icon="pi pi-pencil"
            class="mr-1"
            rounded
            variant="text"
            size="small"
            @click="handleEditProduct(slotProps.data)"
          />

          <pButton
            icon="pi pi-trash"
            rounded
            variant="text"
            size="small"
            @click="deleteProduct(slotProps.data.id)"
          />
        </template>
      </pColumn>

      <template #footer>
        <PaginationTable
          :totalPages="Math.ceil(totalCount / itemsPerPage)"
          :currentPage="currentPage"
          @pageChanged="handlePageChange"
        />
      </template>
    </pDataTable>
  </div>

  <pConfirmDialog></pConfirmDialog>

  <EditProduct
    v-model:visible="editModal"
    :product="selectedProduct || undefined"
    @close="editModal = false"
  />
</template>
