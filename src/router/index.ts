import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import MainPage from '@/components/MainPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import { useUserStore } from '@/stores/user'
import ProfilePage from '@/components/ProfilePage.vue'
import updateProfile from '@/views/updateProfile.vue'
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/profile', component: ProfilePage },
  { path: '/update-profile', component: updateProfile },
  { path: '/main', component: MainPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const auth = useUserStore()

  await auth.init()
  if (to.path === '/main' && !auth.isAuth) {
    console.warn('Idi naxyi')
    return '/login'
  }
})
export default router
