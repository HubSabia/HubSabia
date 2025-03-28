import { createRouter, createWebHistory } from 'vue-router';
import IaView from '@/components/ChatBot.vue';
import SobreView from '@/components/SobreBot.vue';
import LoginHistoryView from '@/components/LoginHistory.vue';

const router = createRouter({
  history: createWebHistory('/'), // Define BASE_URL para a raiz do site
  routes: [
    {
      path: '/',
      name: 'home',
      component: IaView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginHistoryView
    },
    {
      path: '/ia',
      name: 'ia',
      component: IaView
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: SobreView
    }
  ]
});

export default router; // Exporta a variável router