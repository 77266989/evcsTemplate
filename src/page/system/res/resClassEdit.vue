<template>
    

<div class="body">
    <div class="c">
      <div class="cc">
        <div class="container-water-fall">
            <waterfall :col="5" :gutterWidth="gutterWidth"  :data="totalData" >
            <template>
                <div class="cell-item" v-for="(item,index) in totalData" :key="index">
                <div class="title">{{item.classDesc}}<span v-if="!isEmpty(item.classDesc)">-</span>{{item.className}}</div>
                <div class="item-body">
                    <el-table :ref="'table'+index" stripe :data="item.methodList" style="width: 100%" size="mini" @select="selectChange" @select-all="selectChange($event,null,index)">
                    <el-table-column type="selection" width="29">
                    </el-table-column>
                    <el-table-column prop="methodUrl" label="路径" width="220">
                    </el-table-column>
                    <el-table-column prop="methodDesc" label="描述" show-overflow-tooltip>
                    </el-table-column>
                    </el-table>
                </div>
                </div>
            </template>
            </waterfall>
        </div></div>
    </div>
    <div class="b">
        <el-row>
              <el-col :span="24" style=" text-align: right">
                <el-button  size="small" @click="drawer.close()">取 消</el-button>
                <el-button type="success" size="small" @click="save">保 存</el-button>
              </el-col>
            </el-row>
    </div>
</div>
</template>


<script>
  export default {
    data() {
      return {
        resId:this.$parent.$parent.params.id.id,
        selectData:[],
        totalData:[]
      }
    },
    created: function() {
      var that = this;
        this.$post('res/getClassData',{resId:this.resId})
        .then((data) => {
          console.log("xxxxxx");
          console.log(data.data);
          console.log(data.select);
              this.totalData = data.data;
              var sle = data.select;
              for(var i=0;i<data.select.length;i++){
                  this.selectData.push(data.select[i]);
              }
              for (let i = 0; i < this.totalData.length; i++) {
                for (let y = 0; y < this.totalData[i].methodList.length; y++) {
                  for (let z = 0; z < sle.length; z++) {
                    if (this.totalData[i].methodList[y].methodUrl == sle[z]) {
                      setTimeout(() => {
                        eval(
                          "that.$refs.table" +
                            i +
                            "[0].toggleRowSelection(that.$refs.table" +
                            i +
                            "[0].data[" +
                            y +
                            "],true)"
                        );
                      }, 100);
                    }
                  }
                }
              }
            
        })
    },
    methods:{
      save: function() {
        this.$post('res/saveAction', {resId:this.resId,selectData:this.selectData})
        .then((response) => {
            if(response.success){
                this.$msg.message(response.msg);
                this.drawer.close();
            }
        })
      },
      selectChange: function(selection, row,line) {
        //全选
        if(this.isEmpty(row)){
          var obj=this.totalData[line].methodList;
          //全部取消
            if(this.isEmpty(selection)){
                for(let t=0;t<obj.length;t++){
                    let lines = this.selectData.indexOf(obj[t].methodUrl);
                    this.selectData.splice(lines, 1);
                }
            }else{//全部选中
                for(let t=0;t<obj.length;t++){
                    //先移除后添加避免重复
                    if (this.selectData.includes(obj[t].methodUrl)) {
                        let temp =obj[t].methodUrl;
                        let lnum = this.selectData.indexOf(temp);
                        this.selectData.splice(lnum, 1);
                    }
                    this.selectData.push(obj[t].methodUrl); //添加到数组
                }
            }
            return;
          }
        //单选
        if (this.selectData.includes(row.methodUrl)) {
          //存在
          var index = this.selectData.indexOf(row.methodUrl);
          this.selectData.splice(index, 1);
        } else {
          //不存在
          this.selectData.push(row.methodUrl); //添加到数组
        }
      }
    },
    computed:{
	      itemWidth(){  
	        return (138*0.5*(document.documentElement.clientWidth/375)) /// #rem布局 计算宽度
	      },
	      gutterWidth(){
	        return (9*0.5*(document.documentElement.clientWidth/375))	//#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
          }
    }
  }
</script>

<style scoped>
.body{
      width: 100%; height: 100%; display: flex; flex-direction: column;
}

.c{   flex:1; overflow-x: hidden; height: 0; position: relative;}
.cc{ position: absolute; left: 0; top: 0; bottom: 0; right: 0; }
.b{  box-sizing: border-box;height: 60px; padding: 15px;}


.title{margin-bottom: 3px; font-size: 13px; color: var(--color3)}


.container-water-fall{padding:0 15px;}
.cell-item{background-color: var(--main-bg-color); margin: 5px; padding: 5px;}
</style>