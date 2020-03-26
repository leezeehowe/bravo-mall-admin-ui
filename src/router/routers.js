import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // Dashboard
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // 商品管理
  {
    path: '/pms$commodity',
    name: 'commodity',
    meta: {
      icon: 'ios-stats',
      title: '商品管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'commodity-list',
        meta: {
          icon: 'md-add',
          title: '商品列表'
        },
        component: () => import('@/view/system-log-page/system-log-page.vue')
      },
      {
        path: 'add',
        name: 'commodity-add',
        meta: {
          icon: 'md-add',
          title: '添加商品'
        },
        component: () => import('@/view/system-log-page/system-log-page.vue')
      }
    ]
  },
  // 类目管理
  {
    path: '/pms$category',
    name: 'category',
    meta: {
      icon: 'ios-stats',
      title: '类目管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'category-list',
        meta: {
          icon: 'md-add',
          title: '类目列表'
        },
        component: () => import('@/components/category/category-table/category-table.vue')
      }
    ]
  },
  // 属性管理
  {
    path: '/pms$attribute',
    name: 'attribute',
    meta: {
      icon: 'ios-stats',
      title: '属性管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'attribute-list',
        meta: {
          icon: 'md-add',
          title: '属性列表'
        },
        component: () => import('@/view/system-log-page/system-log-page.vue')
      }
    ]
  },
  // 订单管理
  {
    path: '/oms$order',
    name: 'order',
    meta: {
      icon: 'ios-stats',
      title: '订单管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'order-list',
        meta: {
          icon: 'md-add',
          title: '订单列表'
        },
        component: () => import('@/view/system-log-page/system-log-page.vue')
      }
    ]
  },
  // 用户管理
  {
    path: '/ums$user',
    name: 'user',
    meta: {
      icon: 'ios-stats',
      title: '用户管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'user-list',
        meta: {
          icon: 'md-add',
          title: '用户列表'
        },
        component: () => import('@/view/ums/user-list.vue')
      }
    ]
  },
  // 角色管理
  {
    path: '/ams$role',
    name: 'role',
    meta: {
      icon: 'ios-stats',
      title: '角色管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'role-list',
        meta: {
          icon: 'md-add',
          title: '角色列表'
        },
        component: () => import('@/view/ams/role/role-list.vue')
      },
      {
        path: 'add',
        name: 'role-add',
        meta: {
          icon: 'md-add',
          title: '添加角色'
        },
        component: () => import('@/view/ams/role/role-add')
      },
      {
        path: 'issue',
        name: 'role-issue',
        meta: {
          icon: 'md-add',
          title: '颁发角色'
        },
        component: () => import('@/components/role/issue-role-form/issue-role-form.vue')
      }
    ]
  },
  // 资源管理
  {
    path: '/ams$resource',
    name: 'resource',
    meta: {
      icon: 'ios-stats',
      title: '资源管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'webpage',
        name: 'resource-webpage',
        meta: {
          icon: 'md-add',
          title: '页面资源',
          showAlways: true
        },
        component: parentView,
        children: [
          {
            path: 'list',
            name: 'resource-webpage-list',
            meta: {
              icon: 'md-add',
              title: '页面资源列表'
            },
            component: () => import('@/view/ams/resource/webpage/webpage-list.vue')
          },
          {
            path: 'add',
            name: 'resource-webpage-add',
            meta: {
              icon: 'md-add',
              title: '添加页面资源'
            },
            component: () => import('@/view/ams/resource/webpage/webpage-add.vue')
          }
        ]
      },
      {
        path: 'api',
        name: 'resource-api',
        meta: {
          icon: 'md-add',
          title: 'API资源'
        },
        component: parentView,
        children: [
          {
            path: 'list',
            name: 'resource-api-list',
            meta: {
              icon: 'md-add',
              title: 'API资源列表'
            },
            component: () => import('@/view/ams/resource/api/api-list.vue')
          },
          {
            path: 'add',
            name: 'resource-api-add',
            meta: {
              icon: 'md-add',
              title: '添加API资源'
            },
            component: () => import('@/view/ams/resource/api/api-add.vue')
          }
        ]
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'md-cog',
      hideInBread: false,
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'runtime-log',
        name: 'system-runtime-log',
        meta: {
          icon: 'md-cog',
          title: '运行日志'
        },
        component: () => import('@/view/system-log-page/system-log-page.vue')
      }
    ]
  },
  // 浏览器错误日志
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误日志'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  // 消息中心
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  // 404 授权不足
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  // 500 服务器错误
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  // 404 NOT FOUND
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
