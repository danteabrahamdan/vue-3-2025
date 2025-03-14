<script setup lang="ts">
import http from '@/services/ClientHttp';
import { useToast } from 'primevue';
import { useForm } from 'vee-validate';
import { onUpdated, onMounted, ref } from 'vue';
import { boolean, mixed, number, string, object } from 'yup';

// Definition schema
const productSchema = object({
  productName: string().required('Field required').min(3, 'Must be at least 3 characters'),
  unitPrice: number().required('Field required').positive('Must be positive'),
  description: string().required('Field required'),
  unitsInStock: number()
    .required('Field required')
    .integer('Must be integer')
    .min(0, 'Must be greater than 0')
    .max(1000, 'Must be less than 1000'),
  discontinued: boolean(),
  categoryId: number().required('Field required'),
  image: mixed()
    .nullable()
    .optional()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .test('fileFormat', 'File type not valid', (value: any) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .test('fileSize', 'File size not valid', (value: any) => {
      if (!value) return true;
      return value.size <= 1024 * 1024; // 1 MB
    })
});

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
const toast = useToast();

onUpdated(() => {
  if (props.product) {
    values.productName = props.product.name;
    values.unitPrice = props.product.unitPrice;
    values.description = props.product.description;
    values.unitsInStock = props.product.unitsInStock;
    values.discontinued = props.product.discontinued;
    values.categoryId = props.product.categoryId;
    values.image = null;
  }
});

// Definition use Form
const { handleSubmit, values, errors, defineField, meta } = useForm({
  validationSchema: productSchema,
  initialValues: {
    productName: props.product.name,
    unitPrice: props.product.unitPrice,
    description: props.product.description,
    unitsInStock: props.product.unitsInStock,
    discontinued: props.product.discontinued,
    categoryId: props.product.categoryId,
    image: null
  }
});

// Definition of fields
const [productName, productNameAttr] = defineField('productName');
const [unitPrice, unitPriceAttr] = defineField('unitPrice');
const [description, descriptionAttr] = defineField('description');
const [unitsInStock, unitsInStockAttr] = defineField('unitsInStock');
const [discontinued, discontinuedAttr] = defineField('discontinued');
const [categoryId, categoryIdAttr] = defineField('categoryId');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [image, imageAttr] = defineField('image');

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

const emit = defineEmits(['close', 'product-updated']);

const closeModal = () => {
  emit('close');
};

const loadImage = (event: Event) => {
  const inputFile = event.target as HTMLInputElement;

  if (inputFile.files && inputFile.files.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image.value = inputFile.files[0] as any;
  }
};

const updateProduct = handleSubmit(async (values) => {
  try {
    const formData = new FormData();
    formData.append('name', values.productName);
    formData.append('unitPrice', String(values.unitPrice));
    formData.append('description', values.description);
    formData.append('unitsInStock', String(values.unitsInStock));
    formData.append('discontinued', String(values.discontinued));
    formData.append('categoryId', String(values.categoryId));

    if (image.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append('image', values.image as any);
    }

    await http.put(`/product/${props.product.id}`, formData);
    emit('product-updated');
    emit('close');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.add({
      severity: 'error',
      detail: error.response.data.message,
      life: 4000
    });
  }
});
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

    <form @submit.prevent="updateProduct">
      <pFluid>
        <div class="flex items-center gap-4 mb-2">
          <label for="pNameE" class="font-semibold w-40">Product name</label>
          <pInputText
            id="pNameE"
            class="flex-auto"
            autocomplete="off"
            v-model="productName"
            v-bind="productNameAttr"
            size="small"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pCodeE" class="font-semibold w-30"></label>
          <small class="text-red-500 block">
            {{ errors.productName }}
          </small>
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pDescriptionE" class="font-semibold w-40">Product description</label>
          <pTextarea
            id="pDescriptionE"
            rows="4"
            size="small"
            v-model="description"
            v-bind="descriptionAttr"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pCodeE" class="font-semibold w-30"></label>
          <small class="text-red-500 block">
            {{ errors.description }}
          </small>
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pUnitE" class="font-semibold w-40">Unit price</label>
          <pInputText
            id="pUnitE"
            class="flex-auto"
            autocomplete="off"
            v-model="unitPrice"
            v-bind="unitPriceAttr"
            size="small"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pCodeE" class="font-semibold w-30"></label>
          <small class="text-red-500 block">
            {{ errors.unitPrice }}
          </small>
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pUnitStockE" class="font-semibold w-40">Units in stock</label>
          <pInputText
            id="pUnitStockE"
            class="flex-auto"
            autocomplete="off"
            v-model="unitsInStock"
            v-bind="unitsInStockAttr"
            size="small"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pCodeE" class="font-semibold w-30"></label>
          <small class="text-red-500 block">
            {{ errors.unitsInStock }}
          </small>
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pDisE" class="font-semibold w-30">Discontinued?</label>
          <pToggleSwitch
            id="pDisE"
            name="activation"
            v-model="discontinued"
            v-bind="discontinuedAttr"
            class="ml-0"
          />
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
            v-model="categoryId"
            v-bind="categoryIdAttr"
          ></pSelect>
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pCodeE" class="font-semibold w-30"></label>
          <small class="text-red-500 block">
            {{ errors.categoryId }}
          </small>
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pImageE" class="font-semibold w-40">Change image (Optional)</label>
          <pInputText
            id="pImageE"
            class="flex-auto"
            autocomplete="off"
            size="small"
            type="file"
            @change="loadImage($event)"
          />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="pCodeE" class="font-semibold w-30"></label>
          <small class="text-red-500 block">
            {{ errors.image }}
          </small>
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
        <pButton type="submit" label="Update" size="small" :disabled="!meta.valid"></pButton>
      </div>
    </form>
  </pDialog>

  <pToast />
</template>
