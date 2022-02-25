import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ListeView.vue')
    },
    {
      path: '/modification',
      name: 'modification',
      component: () => import('../views/ModificationView.vue')
    },
    {
      path: '/ajout',
      name: 'ajout',
      component: () => import('../views/AjoutView.vue')
    },
    {
      path: '/produit',
      name: 'produit',
      component: () => import('../views/ProduitView.vue')
    }
  ]
})

export default router
