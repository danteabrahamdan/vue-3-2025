import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function authGuard(to: any, from: any, next: any) {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    return next('/login');
  } else {
    return next();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function alreadyLogin(to: any, from: any, next: any) {
  const userStore = useUserStore();
  const router = useRouter();

  if (userStore.isAuthenticated) {
    router.go(-1);
  } else {
    return next();
  }
}
