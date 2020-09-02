import "babel-polyfill"
import Vue from 'vue';
import Vuex from 'vuex';
import vuexAlong from "vuex-along";



Vue.use(Vuex);


 
const state={
    login:false,
    user:{},
    evcsDataCharge:['总充电量','当日充电量','当周充电电量','当月充电电量'],
    evcsDataOrder:'周统计'

}
 
const mutations={
    changeLogin(state,data){
      state.login = data;
    },
    changeUser(state,data){
      state.user = data;
    },
    changeEvcsDataCharge(state,data){
      state.evcsDataCharge = data;
    },
    changeEvcsDataOrder(state,data){
      state.evcsDataOrder = data;
    }
}
 
export default new Vuex.Store({
	state,mutations,plugins: [
        vuexAlong({
          name: "pems2019-vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
          local: {
            list: ["login"],
            isFilter: true // 过滤模块" "数据， 将其他的存入 localStorage
          },
          session: { 
            list: [""] ,
            isFilter: true // 过滤模块" "数据， 将其他的存入 localStorage
          }
        })
      ]
})