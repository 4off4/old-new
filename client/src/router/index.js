import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductCreate from '../views/ProductCreate.vue'
import SalesList from '../views/SalesList.vue'
import ImageInsert from '../views/ImageInsert.vue'
import ProductUpdate from '../views/ProductUpdate.vue'
import buyCart from '../views/buyCart.vue'
import orderDetail from '../views/orderDetail.vue'
import zipCode from '../views/zipCode.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductList
  },
  {
    path: '/detail',
    name: 'productDetail',
    component: ProductDetail
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList
  },
  {
    path: '/image_insert',
    name: 'ImageInsert',
    component: ImageInsert
  },
  {
    path: '/update',
    name: 'ProductUpdate',
    component: ProductUpdate
  },
  {
    path: '/cart',
    name: 'buyCart',
    component: buyCart
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: orderDetail
  },
  {
    path: '/zipCode',
    name: 'zipCode',
    component: zipCode
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
