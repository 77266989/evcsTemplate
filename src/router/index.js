import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
Vue.use(VueRouter)


import login from '../page/login.vue'
import home from '../page/home.vue'
import admin from '../page/admin.vue'
import welcome from '../page/welcome.vue'

import role from '../page/system/role/role.vue'
import res from '../page/system/res/res.vue'
import dict from '../page/system/dict/dict.vue'
import user from '../page/system/user/user.vue'
import org from '../page/system/org/org.vue'
import config from '../page/system/config/config.vue'

import company from '../page/dbs/company.vue'


const router = new VueRouter({
    routes: [
        {
            path: '/login',
            alias: '/',
            component: login,
            name: '系统登录',
        },
        {
            path: '/home',
            component: home,
            name: '系统主页',
        },
        {
            path: '/admin',
            component: admin,
            name: '管理系统',
            children:[
                {path:"",component:welcome,name: '系统欢迎页' },
                 //二级路由=====================================开始
                 {path:"role",component:role,name: '角色管理' },
                 {path:"res",component:res,name: '资源管理' },
                 {path:"dict",component:dict,name: '业务字典' },
                 {path:"user",component:user,name: '用户管理' },
                 {path:"org",component:org,name: '单位管理' },
                 {path:"config",component:config,name: '系统配置' },

                 {path:"company",component:company,name: '项目地址管理' },

                
            ]
        },

        
    ]
})



export default router;