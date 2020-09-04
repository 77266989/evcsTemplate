<template>
    <div class="main">
        <zx-table load-url="role/getList" del-url="role/delete" edit-url="role/edit"  action="role/save" ref="role" tag="角色列表">

            <!-- 搜索 -->
            <template slot-scope="tool" slot="tool">
                <el-input v-model="tool.data.search_like_roleName" placeholder="角色名称" ></el-input>
                <el-button type="warning" icon="el-icon-search"  @click="$refs.role.search()">搜索</el-button>
                <el-button type="success" icon="el-icon-plus" @click="add()">新增</el-button>
            </template>

            <!-- 表格主体 -->
            <template slot="column">
                <el-table-column prop="roleName" label="角色名称">
                </el-table-column>
                <el-table-column prop="roleCode" label="英文">
                </el-table-column>
                <el-table-column prop="roleUrl" label="角色首页地址">
                </el-table-column>
                <el-table-column prop="address" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-tooltip content="配置菜单" placement="top" :hide-after="1000">
                            <el-button type="text" size="small"  icon="el-icon-menu" @click="dialog.open('page/system/role/chooseRes',{data:{id:scope.row},title:'配置菜单'})"></el-button>
                        </el-tooltip>
                        <el-tooltip content="编辑" placement="top" :hide-after="1000">
                            <el-button type="text" size="small"  icon="el-icon-edit-outline" @click="roleEdit(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" :hide-after="1000">
                            <el-button type="text" size="small" icon="el-icon-remove-outline" @click="$refs.role.del(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </template>

            <!-- 增加和编辑 -->
            <template slot-scope="dialog" slot="dialog" width="500">
                <el-form :model="dialog.data" label-width="100px" ref="ruleForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="角色名称" prop="roleName" label-width="120px" :span="12"
                                          :rules ="[
										  { required: true, message: '请输入角色名称', trigger: 'blur' },
										   { message: '长度超出限制', trigger: 'blur',max:31}
										 ]"
                            >
                                <el-input v-model="dialog.data.roleName" auto-complete="off" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                       <el-col :span="24">
                            <el-form-item label="英文名" prop="roleCode" label-width="120px" :span="12"
                                          :rules ="[
                                                        { required: true, message: '请输入英文名称', trigger: 'blur' },
                                                        { message: '长度超出限制', trigger: 'blur',max:31}
                                                        ]"
                            >
                                <el-input v-model="dialog.data.roleCode" auto-complete="off" style="width:100%"></el-input>

                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="角色首页地址" prop="roleUrl" label-width="120px" :span="12"
                                          :rules ="[
                                                        { required: true, message: '请输入角色首页地址', trigger: 'blur' },
                                                        { message: '长度超出限制', trigger: 'blur',max:31}
                                                        ]"
                            >
                                <el-input v-model="dialog.data.roleUrl" auto-complete="off" style="width:100%"></el-input>

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
        mounted () {
        },
        data () {
            return {
                list:''
            };
        },
        methods:{
            add(){
              var that = this;  
               this.$refs.role.add({
                   success:function(data){
                      that.list = data.list;
                   }
               })
            },
            roleEdit(row){
                var that = this;
                this.$refs.role.edit(row,{
                    success:function(data){
                        that.list = data.list;
                    }
                });
            }
        }

    };
</script>


