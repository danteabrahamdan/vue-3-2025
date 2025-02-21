<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>

      <li>
        <RouterLink to="/contact">Contact</RouterLink>
      </li>

      <li>
        <RouterLink to="/about">About</RouterLink>
      </li>

      <li>
        <RouterLink to="/login">Login</RouterLink>
      </li>

      <li>
        <RouterLink to="/register">Register</RouterLink>
      </li>
    </ul>
  </nav>

  <RouterView />
</template>
