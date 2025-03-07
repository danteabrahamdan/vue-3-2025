import { useUserStore } from '@/stores/UserStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function authGuard(to: any, from: any, next: any) {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    return next('/login');
  } else {
    return next();
  }
}
