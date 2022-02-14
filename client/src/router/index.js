import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const routes = [{
  path: '/',
  name: 'tasks.index',
  component: () => import('../views/Index.vue'),
},
{
  path: '/create',
  name: 'tasks.create',
  component: () => import('../views/Create.vue'),
},
{
  path: '/update/:id',
  name: 'tasks.update',
  component: () => import('../views/Update.vue'),
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
