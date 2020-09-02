import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
Vue.use(VueRouter)


import login from '../page/login.vue'
import home from '../page/home.vue'
import admin from '../page/admin.vue'
import welcome from '../page/welcome.vue'



const router = new VueRouter({
    routes: [
        {
            path: '/login',
            //alias: '/',
            component: login,
            name: '系统登录',
        },
        {
            path: '/home',
            component: home,
            alias: '/',
            name: '系统主页',
        },
        {
            path: '/admin/',
            component: admin,
            name: '管理系统',
            children:[
                {path:"",component:welcome,name: '系统欢迎页' },
            ]
        },

        
    ]
})

// router.beforeEach((to, from, next) => { 
//     if(!store.state.login){
//         to.path=='/login'?next():next('/login');
//     }else{
//         store.state.user.homeAddress=='guest'&&to.path.indexOf("admin")!= -1?next('/guest'):next();
//         ///next();
//     }
// })

export default router;