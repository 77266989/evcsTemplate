
import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router/index.js';
import store from '../vuex/store.js';

axios.defaults.baseURL = ip


// 跨域相关
axios.defaults.withCredentials = true;

// 请求超时时间
axios.defaults.timeout = 0;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {    
  Message({
    showClose: true,
    message: msg,
    type: 'error',
  });
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  store.commit("changeLogin", false);
  store.commit("changeUser", {});
  router.replace({
      path: '/login'
  });
}

/** 
 * 请求失败后的错误统一处理 
 */
const errorHandle = (data) => {
    if(data.errorCode){
      //错误码存在
      switch (data.errorCode) {
        // 401: 未登录状态，跳转登录页
        case '70001':
            alert('70001')
            //toLogin();
            //tip(data.errorMsg);
            break;
         case '70002':
            alert('70002')
            //toLogin();
            //tip(data.errorMsg);
            break;
        case '70003':
            alert('70003')
            //toLogin();
            //tip(data.errorMsg);
            break;
        default:
          console.log('http.js-other');   
        }
    }else{
      if(!data.success){
        tip(data.msg);
      }
    }

 }


//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res): Promise.reject(res),  
  error => {
    const { response } = error;
    if (response) {
        // 请求已发出，但是不在2xx的范围 
        return Promise.reject(response);
    } else {
        tip("服务器连接失败");
        console.log("http.js>服务器连接失败")
    }
  }
)


 
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            if(typeof(response.data)=='string'){
              toLogin();
            }else{
              errorHandle(response.data)
              resolve(response.data);
            }
          },err => {
            reject(err)
      })
    })
 }
 