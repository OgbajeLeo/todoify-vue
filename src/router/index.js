import { createRouter,createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import PreviewTodo from "../components/PreviewTodo.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/preview/:id", name: "PreviewTodo", component: PreviewTodo },
  {path: '/:catchAll(.*)', name:'NotFound', component: NotFound},
  
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes

})

export default router