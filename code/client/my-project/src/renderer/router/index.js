import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../views/Login.vue'

import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      component: () => import('@/views/login/index'),
      name: 'login',
      hidden: true
    },


    {
      path: '/dashboard',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/dashboard/index'),
          name: 'Dashboard',
          meta: { title: '个人中心' }
        }
      ]
    },

    {
      path: '/user-info',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/user-info/index'),
          name: 'UserInfo',
          meta: { title: '用户信息管理' }
        }
      ]
    },

    {
      path: '/customer-info',
      component: Layout,
      children: [
        {
          path: 'index',

          component: () => import('@/views/customer-info/index'),
          name: 'customer-info',
          meta: { title: '客户信息管理' }
        }
      ]
    },

    {
      path: '/factory-info',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/factory-info/index'),
          name: 'factory-info',
          meta: { title: '工厂信息管理' }
        }
      ]
    },

    {
      path: '/order-info',
      component: Layout,
      name: 'order-info',
      meta: { title: '订单信息管理' },
      children: [
        {
          path: 'order-attribute',
          component: () => import('@/views/order-info/order-attribute'), // Parent router-view
          name: 'order-attribute',
          meta: { title: '订单属性' },
        },
        {
          path: 'computational-formula',
          component: () => import('@/views/order-info/computational-formula/index'), // Parent router-view
          name: 'computational-formula',
          meta: { title: '计算公式' },
        }
      ]
    },

    {
      path: '/order-customer',
      component: Layout,
      children: [
        {
          path: 'index',

          component: () => import('@/views/order-customer/index'),
          name: 'order-customer',
          meta: { title: '下单（客户）' }
        }
      ]
    },

    {
      path: '/order-factory',
      component: Layout,
      children: [
        {
          path: 'index',

          component: () => import('@/views/order-factory/index'),
          name: 'order-factory',
          meta: { title: '下单（工厂）' }
        }
      ]
    },
    {
      path: '/data-analysis',
      component: Layout,
      children: [
        {
          path: 'index',

          component: () => import('@/views/data-analysis/index'),
          name: 'data-analysis',
          meta: { title: '数据分析' }
        }
      ]
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})
