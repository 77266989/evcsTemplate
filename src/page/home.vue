<template>
   <el-container style="height:100%">
      <el-header>
                <zx-header></zx-header> 
            </el-header>
            <div class="main nobg">
              <!-- 地图模块 -->
               <el-amap style="width:100%; height:100%" vid="amap-vue2" :events="mapEvents"  :zoom="9"   :center="center">

                 <el-amap-marker v-for="(marker,index) in mapList" :key="index" :position="arrfn(marker.latitude,marker.longitude)" :events="marker.events" >
                  <section>
                    <div class="wrap" style="height:50px;width:50px" @click="showRightClick(marker)">
                        <span class="pic"  >{{marker.name}}</span>
                    </div>
                  </section>
                </el-amap-marker>

               </el-amap>
                <!-- 左边 -->
               <div class="left">
                    <div class="boxbg"  style="position: relative;">
                
                      <div class="c flex" style="top:10px;">
                            <el-tabs type="border-card" style="width:100%" :stretch="true">
                              <el-tab-pane label="项目">
                                <el-input
                                  placeholder="输入项目关键字进行过滤"
                                  v-model="filterText1">
                                </el-input>

                                <el-tree
                                  class="filter-tree"
                                  :data="treeData1"
                                   node-key="id" 
                                  :show-checkbox="showcheckboxFlag1"
                                  default-expand-all
                                  :filter-node-method="filterNode1"
                                  @check="handleCurrentChange1"
                                  ref="tree1">
                                </el-tree>
                              </el-tab-pane>
                              <el-tab-pane label="项目地址">
                                <el-input
                                  placeholder="输入项目地址关键字进行过滤"
                                  v-model="filterText2">
                                </el-input>

                                <el-tree
                                  class="filter-tree"
                                  :data="treeData2"
                                   node-key="id" 
                                  :show-checkbox="showcheckboxFlag2"
                                  default-expand-all
                                  :filter-node-method="filterNode2"
                                  @check="handleCurrentChange2"
                                  ref="tree2">
                                </el-tree>
                              </el-tab-pane>
                            </el-tabs>
                      </div>

                  </div>
               </div>

                <!-- 头部 -->
               <div class="top">

                  <div class="boxbg"  style="position: relative;">
                    
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
              <div class="right" v-show="showRight">

                <div class="boxbg"  style="position: relative;">

                      <div class="c flex flexc" style="top:20px;bottom:20px;left:20px;right:20px;color:#fff">
                            <div>{{company.name}}</div>
                            <div style="margin-top:10px;">地址：{{company.address}}</div>

                            <el-row :gutter="0">
                              <el-col :span="8" v-for="(item,index) in webUrlList" :key="index" > 
                                 <div class="flex flexc">
                                    <div class="iconBox flex center flexc" style="margin-top:20px;" @click="openWeb(item)"> 
                                      <img :src="item.webIconUrl">
                                      <span>{{item.moduleName}}</span>
                                    </div>
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
    watch: {
      filterText1(val) {
        this.$refs.tree1.filter(val);
      },
      filterText2(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted (){
      this.$post("index/getIndexProjectData", {
      }).then(data => {
        if (data.success) {
          this.treeData1 = data.projectTree;
          this.treeData2 = data.companyTree;
          this.icons = data.moduleList;
        }else{
          this.$msg.message(data.message,{type:'error'}) 
        }
        
      });
    },
    data() {
      return {
        company:[],
        webUrlList:[],
        mapList:[],
        treeNodes1:[],
        treeNodes2:[],
        treeData1:[],
        treeData2:[],
        filterText1: '',
        filterText2: '',
        showcheckboxFlag1:true,
        showcheckboxFlag2:true,
        checked: true,
        showRight: false,
        icons:[
            
        ],
        center: [119.317225,26.070985],
        mapEvents: {
          init(o) {
            o.setMapStyle("amap://styles/blue");
           // o.setMapStyle("amap://styles/22175cb1222cc35dec20d2887d0bf772"); 自定义地图样式
          }
        }
      }
    },
    methods: {
      openWeb(tempModule){
        console.log(tempModule);
        window.open(tempModule.webNewUrl, "_blank");
      },
      showRightClick(marker){
        console.log(marker);
        this.center = [marker.latitude, marker.longitude]
        this.company = marker;

        var moduleIds=[];
        for (var i = 0; i < this.icons.length; i++) { 
          if(this.icons[i].checked){
            moduleIds.push(this.icons[i].type);
          }
        }
        this.$post("index/getWebUrlList", {
          companyId:marker.id,moduleIds:moduleIds
        }).then(data => {
            if (data.success) {
              console.log(data.data);
              this.webUrlList = data.data;
              this.showRight =true;
            }else{
              this.$msg.message(data.message,{type:'error'}) 
            }
        });
      },
      arrfn(p1,p2){
        if(p1==null||p2==null)return [0,0]
        let arr = [];
        arr.push(p1);
        arr.push(p2);
        return arr; 
      },
      getIndexMapData: function(){
        var projectIds=[];
        for (var i = 0; i < this.treeNodes1.length; i++) { 
           projectIds.push(this.treeNodes1[i].id);
        }
        console.log(projectIds);
        var companyIds=[];
        for (var i = 0; i < this.treeNodes2.length; i++) { 
           companyIds.push(this.treeNodes2[i].id);
        }
        console.log(companyIds);
        var moduleIds=[];
        for (var i = 0; i < this.icons.length; i++) { 
          if(this.icons[i].checked){
            moduleIds.push(this.icons[i].type);
          }
        }
        console.log(moduleIds);
        
        this.webUrlList = [];
        this.showRight =false;
        if(this.isEmpty(projectIds) && this.isEmpty(companyIds)){
          this.mapList = [];
          this.$msg.message("请选择要查询的项目或公司！",{type:'warning'}) 
          return;
        }
        
        if(this.isEmpty(moduleIds)){
          this.$msg.message("请选择一个模块类型！",{type:'warning'}) 
          return;
        }
        
        this.$post("index/getIndexMapData", {
          projectIds:projectIds,companyIds:companyIds,moduleIds:moduleIds
        }).then(data => {
            if (data.success) {
              console.log(data.data);
              this.mapList = data.data;
            }else{
              this.$msg.message(data.message,{type:'error'}) 
            }
        });
      },
      handleCurrentChange1: function() {
          var temp=[];
          //只返回选择中的2级子节点
          for (var i = 0; i < this.$refs.tree1.getCheckedNodes().length; i++) { 
            if(this.isEmpty(this.$refs.tree1.getCheckedNodes()[i].children)){
              temp.push(this.$refs.tree1.getCheckedNodes()[i]);
            }
          }
           //清空tree2选中的
         this.$refs.tree2.setCheckedNodes([]);
         this.treeNodes2 =[];

         this.treeNodes1 = temp;
         this.getIndexMapData();
      },
      handleCurrentChange2: function() {
          var temp=[];
          //只返回选择中的2级子节点
          for (var i = 0; i < this.$refs.tree2.getCheckedNodes().length; i++) { 
            if(this.isEmpty(this.$refs.tree2.getCheckedNodes()[i].children)){
              temp.push(this.$refs.tree2.getCheckedNodes()[i]);
            }
          }
           //清空tree1选中的
         this.$refs.tree1.setCheckedNodes([]);
         this.treeNodes1 =[];

         this.treeNodes2 = temp;
         this.getIndexMapData();
      },
      filterNode1(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      filterNode2(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
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
        this.getIndexMapData();
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
        this.getIndexMapData();
      }
    },
    
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
 z-index: 3; box-sizing: border-box;
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

.wrap {
  top: 0;
  left: 0;
  background-image: url("~@/../static/home.png");
  background-position: center;
  background-repeat: no-repeat;
}

.pic{background: red; color: #fff;   border-radius: 3px;  font-size: 20px;  white-space:nowrap; padding: 3px 5px; animation:mymove 3s infinite; position: absolute;pointer-events: none;animation-iteration-count:1;animation-fill-mode: forwards;}
</style>


