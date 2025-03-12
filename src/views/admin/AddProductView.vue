<script setup lang="ts">
import http from '@/services/ClientHttp';
import { useToast } from 'primevue';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { boolean, mixed, number, object, string } from 'yup';

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
    .required('Field required')
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

// Definition of refs
const categories = ref([]);
const router = useRouter();
const toast = useToast();

// Definition use Form
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { handleSubmit, values, errors, defineField, meta } = useForm({
  validationSchema: productSchema,
  initialValues: {
    productName: '',
    unitPrice: 0,
    description: '',
    unitsInStock: 0,
    discontinued: false,
    categoryId: 0,
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

const loadImage = (event: Event) => {
  const inputFile = event.target as HTMLInputElement;

  if (inputFile.files && inputFile.files.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image.value = inputFile.files[0] as any;
  }
};

onMounted(getCategoryProducts);

const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = new FormData();
    formData.append('name', values.productName);
    formData.append('unitPrice', String(values.unitPrice));
    formData.append('description', values.description);
    formData.append('unitsInStock', String(values.unitsInStock));
    formData.append('discontinued', String(values.discontinued));
    formData.append('categoryId', String(values.categoryId));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData.append('image', values.image as any);

    await http.post('/product', formData);
    router.push({ name: 'Products' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 4000
    });
  }
});
</script>

<template>
  <pFluid>
    <div class="bg-white rounded-lg overflow-hidden p-4">
      <div class="flex mt-2">
        <form class="card flex flex-col gap-4 w-full" @submit.prevent="onSubmit">
          <div class="font-semibold text-2xl">New product</div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="pName">Name</label>
              <pInputText
                id="pName"
                type="text"
                size="small"
                v-model="productName"
                v-bind="productNameAttr"
              />
              <small class="text-red-500 block">
                {{ errors.productName }}
              </small>
            </div>

            <div class="flex flex-wrap gap-2 w-full">
              <label for="pPrice">Unit price</label>
              <pInputText
                id="pPrice"
                type="number"
                size="small"
                v-model="unitPrice"
                v-bind="unitPriceAttr"
              />
              <small class="text-red-500 block">
                {{ errors.unitPrice }}
              </small>
            </div>
          </div>

          <div class="flex flex-wrap">
            <label for="pDescription">Description</label>
            <pTextarea
              id="pDescription"
              rows="4"
              size="small"
              v-model="description"
              v-bind="descriptionAttr"
            />
            <small class="text-red-500 block">
              {{ errors.description }}
            </small>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="pStock">Units in stock</label>
              <pInputText
                id="pStock"
                type="number"
                size="small"
                v-model="unitsInStock"
                v-bind="unitsInStockAttr"
              />
              <small class="text-red-500 block">
                {{ errors.unitsInStock }}
              </small>
            </div>

            <div class="flex flex-wrap gap-2 w-full">
              <div class="flex flex-col flex-wrap">
                <label for="pDiscontinued" class="mb-2">Discontinued</label>
                <pToggleSwitch name="activation" v-model="discontinued" v-bind="discontinuedAttr" />
                <small class="text-green-500 block mt-4">Field optional</small>
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="pCategory">Category</label>
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
              <small class="text-red-500 block">
                {{ errors.categoryId }}
              </small>
            </div>

            <div class="flex flex-wrap gap-2 w-full">
              <label for="pImage">Image</label>
              <pInputText
                id="pImage"
                type="file"
                size="small"
                accept="image/*"
                @change="loadImage($event)"
              />
              <small class="text-red-500 block">
                {{ errors.image }}
              </small>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2">
              <pButton
                label="Save product"
                type="submit"
                icon="pi pi-save"
                class="mt-4"
                :disabled="!meta.valid"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </pFluid>

  <pToast />
</template>
