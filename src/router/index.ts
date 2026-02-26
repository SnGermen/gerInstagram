import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import HomePage from '@/components/MainPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import { useAuthStore } from '@/stores/login'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/home', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.path === '/home' && !auth.isAuth) {
    return '/login'
  }
})
export default router
