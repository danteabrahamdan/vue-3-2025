<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import PerfectScrollbar from 'perfect-scrollbar';

const container = ref<Element | null>(null);
let ps: PerfectScrollbar | null = null;

onMounted(() => {
  ps = new PerfectScrollbar(container.value as Element, {
    suppressScrollX: true // Ocultar scroll horizontal
  });
});

onUnmounted(() => {
  if (ps) {
    ps.destroy();
  }
});

// Función para forzar la actualización del scrollbar (llamar después de expandir el desplegable)
const forzarActualizacion = () => {
  if (ps) {
    ps.update();
  }
};

defineExpose({
  forzarActualizacion
});
</script>

<template>
  <div ref="container" class="custom-scrollbar-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.custom-scrollbar-container {
  position: relative;
  height: 100%; /* Ajusta la altura según tus necesidades */
}

.ps__rail-y {
  background-color: transparent; /* Fondo transparente para el riel */
}

.ps__rail-y:hover > .ps__thumb-y,
.ps__rail-y:active > .ps__thumb-y {
  opacity: 1; /* Mostrar el pulgar al hacer hover o al interactuar */
}

.ps__thumb-y {
  background-color: rgba(0, 0, 0, 0.5); /* Pulgar semi-transparente */
  opacity: 0; /* Ocultar el pulgar por defecto */
  transition: opacity 0.3s ease; /* Transición suave */
}
</style>
