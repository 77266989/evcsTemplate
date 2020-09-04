<template>
    <div class="main column nobg" style="padding:0">
        <div class="main row nobg" style="margin-left:0; ">

            <div class="main flex flex1" style="margin-left: 0;height: 400px;overflow-x: hidden; margin-right:5px;">
                <tree ref="tree" :show_checkbox=true url="role/getRoleRes" :params="{roleId:roleId,type:'1'}"  actives="" :defaultSelect="false" title="普通菜单" @check="nodeClick" style="width:100%"></tree>
            </div>
            <div class="main flex flex1" style="overflow: auto;height: 400px;overflow-x: hidden; margin-left:5px;">
                <tree ref="tree1" :show_checkbox=true url="role/getRoleRes" :params="{roleId:roleId,type:'2'}"  actives="" :defaultSelect="false" title="按钮菜单"  style="width:100%"></tree>
            </div>
        </div>

        <el-col :span="24" style="text-align: right; margin:15px 0">
            <el-button  @click="dialog.close()">取消</el-button>
            <el-button type="primary"  @click="save">确定</el-button>
        </el-col>
    </div>
</template>

<script>
    export default  {
        mounted(){
        },
        data(){
            return{
                roleId:this.$parent.$parent.params.id.id,
                returnData:[]
            }
        },
        methods:{
            save:function(){
                var selectIds=this.$refs.tree.getCheckedKeys();//普通菜单
                var selectIds2=this.$refs.tree1.getCheckedKeys();//按钮菜单
                this.$post('role/saveRoleRes', {roleId:this.roleId,resId:selectIds.concat(selectIds2)})
                .then((response) => {
                    if(response.success){
                        this.$msg.message(response.msg);
                        this.dialog.close();
                    }
                })
            
            },
            nodeClick(obj,node){
                //判断是否选中
                if(node.checkedNodes.indexOf(obj) != -1){
                    //设置子选择父菜单
                    if(!this.isEmpty(obj.data)){
                        if(!this.isEmpty(obj.data.parent)){
                            let ids = new Array();
                            node.checkedKeys.push(obj.data.parent);
                            this.$refs.tree.setCheckedKeys(node.checkedKeys, false);
                        }
                    }
                    //设置子菜单全选
                    if(obj.children.length > 0){
                        for (let i =0;i<obj.children.length;i++){
                            node.checkedKeys.push(obj.children[i].id);
                        }
                        this.$refs.tree.setCheckedKeys(node.checkedKeys, false);
                    }
                }else{
                    //设置清空子菜单
                    if(obj.children.length > 0){
                        let nodeArray = new Array();
                        for (let i =0;i<node.checkedNodes.length;i++){
                            if(obj.children.indexOf(node.checkedNodes[i]) ==-1){
                                nodeArray.push(node.checkedNodes[i].id);
                            }
                        }
                        this.$refs.tree.setCheckedKeys(nodeArray, false);
                    }
                    //设置清空父菜单
                    if(!this.isEmpty(obj.data)){
                        if(!this.isEmpty(obj.data.parent)){
                           let parentNode = this.$refs.tree.getNode(obj.data.parent);
                           let isClean = true;
                           for (let k =0;k<parentNode.childNodes.length;k++){
                               if(node.checkedKeys.indexOf(parentNode.childNodes[k].data.id) != -1){
                                   isClean = false;
                               }
                           }
                            if(isClean){
                                let nodes = new Array();
                                for (let j =0;j<node.checkedNodes.length;j++){
                                    if(node.checkedNodes[j].id != obj.data.parent){
                                        nodes.push(node.checkedNodes[j].id);
                                    }
                                }
                                this.$refs.tree.setCheckedKeys(nodes, false);
                            }
                        }
                    }
                }
            },
        }
    }
</script>
<style scoped>
    .ss{ overflow: auto}
</style>
