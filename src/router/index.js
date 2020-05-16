import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Main from "@/components/main/main";

/**
 meta: {
    hide: false, 是否在左侧菜单显示 不显示请设为 true
    title: "列表页面", 菜单标题
    icon: "md-grid", 图标
    roleId: 1 菜单权限id 不填写等同于不需要权限校验
    singlePage: true 单页 非嵌套栏目显示
}
 */

// 不需要权限校验的静态路由
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    meta: {
      hide: true,
      title: "登录",
      // singlePage: true // 单页
    },
    component: () => import("@/views/login/login")
  },
  {
    path: "/",
    name: "Dashboard",
    component: Main,
    meta: {
      hide: false,
      title: "Dashboard",
      icon: "md-speedometer",
    },
    children: [
      {
        path: "/Dashboard/workplace",
        name: "workplace",
        meta: {
          hide: false,
          title: "主控台"
        },
        component: () => import("@/views/Dashboard/workplace")
      },
      {
        path: "/Dashboard/workplace1",
        name: "workplace1",
        meta: {
          hide: false,
          title: "工作台",
          permission: ['admin']
        },
        component: () => import("@/views/Dashboard/workplace1")
      },
    ]
  },
  {
    path: "/brief",
    name: "brief",
    component: Main,
    meta: {
      hide: false,
      title: "简叙",
      icon: "md-heart-outline",
      singlePage: true
    },
    children: [
      {
        path: "/brief/brief",
        name: "brief_brief",
        meta: {
          hide: false,
          title: "简叙",
          icon: 'md-heart-outline'
        },
        component: () => import("@/views/brief/brief")
      }
    ]
  },
]
// 需要权限校验的异步路由
export const asyncRoutes = [
  {
    path: "/permission",
    name: "permission",
    redirect: '/permission-index',
    component: Main,
    meta: {
      hide: false,
      title: "权限测试",
      icon: "ios-switch-outline",
      roleId: 8,
      singlePage: true
    },
    children: [
      {
        path: "/permission-index",
        name: "permission-index",
        meta: {
          hide: false,
          title: "权限测试",
          roleId: 8
        },
        component: () => import("@/views/permission")
      },
    ]
  },
  {
    path: "/form",
    name: "form",
    component: Main,
    meta: {
      hide: false,
      title: "表单页面",
      icon: "md-cube",
      roleId: 6
    },
    children: [
      {
        path: "/form/basic_form",
        name: "basic-form",
        meta: {
          hide: false,
          title: "基础表单",
          roleId: 5
        },
        component: () => import("@/views/form/basic_form")
      },
      {
        path: "/form/advanced_form",
        name: "advanced_form",
        meta: {
          hide: false,
          title: "高级表单",
          roleId: 7
        },
        component: () => import("@/views/form/advanced_form")
      },
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 解决跳转同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
