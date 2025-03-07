import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { type User, type AuthResponse } from '../types/AuthType';

export const useUserStore = defineStore('user', () => {
  // Estado reactivo
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);

  // Acciones
  function setUserData(userData: AuthResponse) {
    user.value = userData.user;
    accessToken.value = userData.accessToken;

    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('accessToken', userData.accessToken);
  }

  function clearUserData() {
    user.value = null;
    accessToken.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }

  function loadUserData() {
    const userData = localStorage.getItem('user');

    if (userData) {
      user.value = JSON.parse(userData);
    }

    const accessTokenData = localStorage.getItem('accessToken');

    if (accessTokenData) {
      accessToken.value = accessTokenData;
    }
  }

  // Getters
  const isAuthenticated = computed(() => {
    return user.value !== null && accessToken.value !== null;
  });

  // Retornar el estado y las acciones
  return {
    user,
    accessToken,
    setUserData,
    clearUserData,
    loadUserData,
    isAuthenticated
  };
});
