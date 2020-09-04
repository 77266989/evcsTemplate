<template>
    <div class="main">
        <zx-table load-url="res/getList" del-url="res/delete" edit-url="res/edit"  action="res/save" ref="res" tag="资源列表" >

            <!-- 搜索 -->
            <template slot-scope="tool" slot="tool">
                <el-input v-model="tool.data.search_like_resName" placeholder="菜单名称" ></el-input>
                <el-input v-model="tool.data.parentName" placeholder="父菜单名称" ></el-input>
                <el-button type="warning" icon="el-icon-search" @click="$refs.res.search()">搜索</el-button>
                <el-button type="success" icon="el-icon-plus" @click="addRes()">新增</el-button>
            </template>

            <!-- 表格主体 -->
            <template slot="column">
                <el-table-column prop="resName" label="菜单名称" >
                </el-table-column>
                <el-table-column prop="resTypeName" label="菜单类型" >
                </el-table-column>
                <el-table-column prop="url" label="URL" >
                </el-table-column>
                <el-table-column prop="icon" label="图标样式" >
                </el-table-column>
                <el-table-column prop="parentName" label="父菜单名称" >
                </el-table-column>
                <el-table-column prop="seat" label="排序" width="180">
                </el-table-column>
                <el-table-column prop="address" label="操作" width="100">
                       <template slot-scope="scope">
                           <el-tooltip content="编辑" placement="top" :hide-after="1000">
                               <el-button type="text" icon="el-icon-edit-outline" size="small" @click="editRes(scope.row)"></el-button>
                           </el-tooltip>

                           <el-tooltip content="权限配置" placement="top" :hide-after="1000">
                               <el-button type="text" icon="el-icon-goods" size="small" @click="resMethod(scope.row)"></el-button>
                           </el-tooltip>

                           <el-tooltip content="删除" placement="top" :hide-after="1000">
                               <el-button type="text" icon="el-icon-remove-outline" size="small" @click="$refs.res.del(scope.row)"></el-button>
                           </el-tooltip>
                       </template>
                </el-table-column>
            </template>

            <!-- 增加和编辑 -->
            <template slot-scope="dialog" slot="dialog" width="500">
                    <el-form :model="dialog.data" label-width="100px" ref="ruleForm">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="菜单名称" prop="resName" label-width="120px" :span="12"
                                :rules ="[
                                        { required: true, message: '请输入菜单名称', trigger: 'blur' },
                                        { message: '长度超出限制', trigger: 'blur',max:31}
                                        ]"
                                >   
                                    <el-input v-model="dialog.data.resName" auto-complete="off" style="width:100%"></el-input>
                                </el-form-item>
                            </el-col> 
                            <el-col :span="12">   
                                <el-form-item label="菜单类型" prop="resType" label-width="150px" :span="12"
                                    :rules ="[
                                        { required: true, message: '请输入菜单类型', trigger: 'blur' }
                                        ]"
                                >
                                    <el-select v-model="dialog.data.resType" placeholder="请选择">
                                        <el-option
                                                v-for="item in list"
                                                :key="item.dictValue"
                                                :label="item.dictKey"
                                                :value="item.dictValue">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> 
                            <el-col :span="12">    
                                <el-form-item label="URL" prop="url" label-width="120px" :span="12"
                                                :rules ="[
                                        { message: '长度超出限制', trigger: 'blur',max:63}
                                        ]">
                                    <el-input v-model="dialog.data.url" auto-complete="off"  style="width:100%"></el-input>
                                </el-form-item>
                            </el-col>  
                            <el-col :span="12">   
                                <el-form-item label="图标样式" prop="icon" label-width="150px" :span="12"
                                                :rules ="[
                                        { message: '长度超出限制', trigger: 'blur',max:63}
                                        ]"
                                >
                                    <el-input v-model="dialog.data.icon" auto-complete="off"  style="width:100%"></el-input>
                                </el-form-item>
                            </el-col> 
                            <el-col :span="12">   
                                <el-form-item label="父类菜单" label-width="120px"
                                    :rules ="[{ message: '输入名称搜索父菜单', trigger: 'change' }]">
                                    <el-select v-model="dialog.data.parentId"  style="width:100%" clearable filterable>
                                        <el-option
                                            v-for="item in parentList"
                                            :key="item.id"
                                            :label="item.resName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">   
                                <el-form-item label="排序" prop="seat" label-width="150px" :span="12"
                                    :rules ="[
                                        { required: true, message: '请输入排序号', trigger: 'blur' }
                                        ]"
                                >
                                    <el-input v-model="dialog.data.seat" auto-complete="off"  style="width:100%"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
            </template>

        </zx-table>

    </div>
</template>



<script>
  export default {
    data() {
      return {
        list:[],
        parentList:[],
      }
    },
    methods: {
        addRes(){
            var that = this;
            this.$refs.res.add({
                data: { parentId: this.$refs.res.tool.parentId},
                success:function(data){
                    that.list = data.list;
                    that.parentList = data.data.parentList
                }
            });
        },
        editRes(row){
            var that = this;
            this.$refs.res.edit(row,{
                success:function(data){
                    that.list = data.list;
                    that.parentList = data.data.parentList
                }
            });
        },
        resMethod(row){
            this.drawer.open('page/system/res/resClassEdit',{data:{id:row},width:'100%',title:'权限配置'})
        }
    }
  }
</script>