<template>
   <el-container style="height:100%">
      <el-header>
                <zx-header></zx-header> 
            </el-header>
            <div class="main nobg">
              <!-- 地图模块 -->
               <el-amap style="width:100%; height:100%" vid="amap-vue" :events="mapEvents"  :zoom="17"   :center="[119.325465,26.073452]"></el-amap>
                <!-- 左边 -->
               <div class="left">
                    <div class="boxbg"  style="position: relative;">
                      <i class="i1"></i>
                      <i class="i2"></i>
                      <i class="i3"></i>
                      <i class="i4"></i>
                    
                      <div class="c flex" style="top:10px;">
                            <el-tabs type="border-card" style="width:100%" :stretch="true">
                              <el-tab-pane label="用户管理">111111</el-tab-pane>
                              <el-tab-pane label="配置管理">222222</el-tab-pane>
                            </el-tabs>
                      </div>

                  </div>
               </div>

                <!-- 头部 -->
               <div class="top">

                  <div class="boxbg"  style="position: relative;">
                      <i class="i1"></i>
                      <i class="i2"></i>
                      <i class="i3"></i>
                      <i class="i4"></i>
                    
                      <div class="c flex" style="top:10px; left:0; bottom:0; right:0">

                            
                            <div class="iconBox flex center flexc" v-for="(item,index) in icons" :key="index"  @click="ck(index)">
                                <img :src="item.url">
                                <span>{{item.name}}</span>
                                 <i class="el-icon-success" v-if="item.checked"></i>
                            </div>

                             <div class="check flex center" @click="ckAll">
                               <i class="el-icon-success" v-if="checked"></i> 
                               <div class="cc" v-else></div>
                               <span style="padding-left:10px;">全选</span>
                             </div>
                           

                             


                      </div>

                  </div>

               </div>

              <!-- 右边 -->
              <div class="right">

                <div class="boxbg"  style="position: relative;">
                      <i class="i1"></i>
                      <i class="i2"></i>
                      <i class="i3"></i>
                      <i class="i4"></i>
                    
                      <div class="c flex flexc" style="top:20px;bottom:20px;left:20px;right:20px;color:#fff">
                            <div>福建省泰昌信息技术有限公司</div>
                            <div style="margin-top:10px;">地址：------</div>

                            <el-row :gutter="0">
                              <el-col :span="8" v-for="(item,index) in icons" :key="index" > 
                                 <div class="flex flexc">
                                    <div class="iconBox flex center flexc" style="margin-top:20px;"><img :src="item.url">
                                    <span>{{item.name}}</span></div>
                                 </div>
                              </el-col>
                            </el-row>
                      </div>

                  </div>
              </div>

            </div>     
   </el-container>
</template>



<script>
 import ZxHeader from "./adminCOM/ZxHeader"
  export default {
    components: {
        ZxHeader
    },
    data() {
      return {
        checked: false,
        icons:[
            {
            url:'http://127.0.0.1:8090/static/new/0.png',
            name:'名字叫1',
            checked:false
            },
             {
            url:'http://127.0.0.1:8090/static/new/1.png',
            name:'名字叫2',
            checked:false
            },
             {
            url:'http://127.0.0.1:8090/static/new/2.png',
            name:'名字叫3',
            checked:false
            },
             {
            url:'http://127.0.0.1:8090/static/new/3.png',
            name:'名字叫4',
            checked:false
            },
             {
            url:'http://127.0.0.1:8090/static/new/4.png',
            name:'名字叫5',
            checked:false
            }, {
            url:'http://127.0.0.1:8090/static/new/5.png',
            name:'名字叫6',
            checked:false
            }, {
            url:'http://127.0.0.1:8090/static/new/6.png',
            name:'名字叫7',
            checked:false
            }, {
            url:'http://127.0.0.1:8090/static/new/7.png',
            name:'名字叫8',
            checked:false
            }, {
            url:'http://127.0.0.1:8090/static/new/8.png',
            name:'名字叫9',
            checked:true
            }
        ],
        mapEvents: {
        init(o) {
          o.setMapStyle("amap://styles/blue");
          ///o.setMapStyle("amap://styles/22175cb1222cc35dec20d2887d0bf772"); 自定义地图样式
        }
      }
      }
    },
    methods: {
      ckAll(){
          if(this.checked==false){
            for(let i in this.icons){
              this.icons[i].checked = true;
            }
            this.checked =true

          }else{
            for(let i in this.icons){
              this.icons[i].checked = false
            }
            this.checked =false
          }
      },
      ck(index){
       if(this.icons[index].checked==true){
         this.icons[index].checked = false;
         this.checked = this.icons.every(function(item,index,arr){
              return item.checked==true;
          })
       }else{
         this.icons[index].checked = true;
         this.checked = this.icons.every(function(item,index,arr){
              return item.checked==true;
          })
       }
      }
    },
    mounted (){
     
    }
  }
</script>

<style scoped>

.right{
 width: 600px;
 height: calc(100% - 100px);
 position: absolute;
 right: 0; 
 top: 100px;
 /* background-color: #01067c; */
 background: linear-gradient(to left, rgba(0,36,41,1) 0%,  rgba(0,36,41,1) 70%, rgba(0,36,41,0) 100%);
 padding-left: 10px;
 padding-bottom: 10px;
  padding-right: 20px;
 z-index: 1; box-sizing: border-box;
 padding-top:125px
}

.left{
 width: 400px;
 height: calc(100% - 100px);
 position: absolute;
 left: 0; 
 top: 100px;
 /* background-color: #01067c; */
 background: linear-gradient(to right, rgba(0,36,41,1) 0%,  rgba(0,36,41,1) 70%, rgba(0,36,41,0) 100%);
 padding-left: 10px;
 padding-bottom: 10px;
 z-index: 1; box-sizing: border-box;
}

.top{
 width: 100%;
 height: 110px;
 position: absolute;
 left: 000px; 
 top: 100px;
 background: linear-gradient(to bottom,  rgba(0,36,41,1) 0%,  rgba(0,36,41,1) 70%, rgba(0,36,41,0) 100%);
  z-index: 2; box-sizing: border-box;  padding-left:420px; padding-right:20px; box-sizing: border-box;
  
}

.iconBox{
   height: 100%; color: #4a968c; font-size:14px; margin-left: 30px;position: relative; cursor:default;
}
.iconBox img{width:70px; height: 70px; margin-bottom:5px;}
.iconBox i{position: absolute; right:-5px; top: -5px; color: #00f0d4; font-size: 20px;}

.check{position: absolute; right: 10px; top: 0px; color: #00f0d4; cursor: pointer;}
.check .cc{width: 15px; height: 15px; border-radius: 15px; background: #043a37;box-shadow:rgb(4, 65, 59) 0px 0px 2px inset;}
</style>


