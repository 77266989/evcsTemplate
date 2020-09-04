<template>
    <div class="main">

     
        <div  class="mainDiv">
                <zx-table load-url="user/getList" del-url="user/delete" edit-url="user/edit"  action="user/save" ref="user" tag="用户列表" >

                    <!-- 搜索 -->
                    <template slot-scope="tool" slot="tool">
                        <el-input v-model="tool.data.search_like_userCode" placeholder="请输入用户号"></el-input>
                        <el-input v-model="tool.data.search_like_userName" placeholder="请输入用户名"></el-input>
                        <el-button type="warning" icon="el-icon-search"  @click="$refs.user.search()">搜索</el-button>
                        <el-button type="success" icon="el-icon-circle-plus-outline" @click="userIns">新增</el-button>
                    </template>

                    <!-- 表格主体 -->
                    <template slot="column">
                        <el-table-column prop="userCode" label="用户号"/>
                        <el-table-column prop="userName" label="用户名" />
                        <el-table-column prop="userPhone" label="手机号码" />
                        <el-table-column prop="email" label="邮件地址" />
                        <el-table-column prop="roleName" label="角色" />
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">

                                 <el-tooltip content="重置密码" placement="top" :hide-after="1000">
                                    <el-button type="text" icon="el-icon-setting" size="small" @click="resetPass(scope.row)"></el-button>
                                </el-tooltip>
                                <el-tooltip content="编辑" placement="top" :hide-after="1000">
                                    <el-button type="text" icon="el-icon-edit-outline" size="small" @click="userEdit(scope.row)"></el-button>
                                </el-tooltip>

                                <el-tooltip content="删除" placement="top" :hide-after="1000">
                                    <el-button type="text" icon="el-icon-remove-outline" size="small" @click="$refs.user.del(scope.row)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </template>

                    <!-- 增加和编辑 -->
                    <template slot-scope="dialog" slot="dialog">
                        <el-form :model="dialog.data" label-width="100px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="用户号" prop="userCode" label-width="120px" :span="12"
                                                  :rules ="[
                                                { required: true, message: '请输入用户号', trigger: 'blur' },
                                                { message: '长度超出限制', trigger: 'blur',max:31}
                                                ]"
                                    >
                                        <el-input v-model="dialog.data.userCode" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="用户名" prop="userName" label-width="120px" :span="12"
                                                  :rules ="[
                                                { required: true, message: '请输入用户名', trigger: 'blur' },
                                                { message: '长度超出限制', trigger: 'blur',max:31}
                                                ]"
                                    >
                                        <el-input v-model="dialog.data.userName" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="电话号码" prop="userPhone" label-width="120px" :span="12"
                                                  :rules ="[
                                                    { required: false, message: '请输入电话号码', trigger: 'blur' },
                                                    { message: '长度超出限制', trigger: 'blur',max:11}
                                                    ]"
                                    >
                                        <el-input v-model="dialog.data.userPhone" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="邮箱" prop="email" label-width="120px" :span="12"
                                                  :rules="[
                                              { required: false, message: '请输入邮箱地址', trigger: 'blur' },
                                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                                               { message: '长度超出限制', trigger: 'blur',max:31}
                                            ]"
                                    >
                                        <el-input v-model="dialog.data.email" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12" v-if="dialog.data.showPwd">
                                    <el-form-item label="密码" prop="password" label-width="120px" :span="12"
                                                  :rules ="[
                                                { required: true, message: '请输入密码', trigger: 'blur' },
                                                { message: '长度超出限制', trigger: 'blur',max:32}
                                                ]"
                                    >
                                        <el-input type="password" v-model="dialog.data.password" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12"  v-if="dialog.data.showPwd">
                                    <el-form-item label="确认密码" label-width="120px" :span="12" prop="newPassword"
                                                  :rules ="[
                                                { validator: validatePass, trigger: 'blur' }
                                                ]"
                                    >
                                        <el-input type="password" v-model="newPassword" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="角色" prop="roleId" label-width="120px" :span="12">
                                        <el-select v-model="selectValue" multiple :multiple-limit="1" placeholder="请选择" style="width:100%"  @change="selectChange">
                                            <el-option
                                                    v-for="item in roleList"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>


                              
                            </el-row>
                        </el-form>
                    </template>
                </zx-table>
        </div>


    </div>
</template>

<script>
    export default {
        mounted () {
        },
        data () {
            return {
                list:[],
                actives:[],
                isRouterAlive1:true,
                selectValue:[],
                roleList:[],
                newPassword:"",
                userStatus:'',
                jihuoList:[],
            };
        },
        methods: {
            userIns() {
               
                var that = this;
                this.$refs.user.add({
                    data: { orgId: '1'},
                    success:function(data){
                        that.roleList = data.roleList;
                        that.selectValue = data.selectValue;
                        that.jihuoList = data.jihuoList;
                    }
                });
            },
            selectChange:function(){
                this.$refs.user.elForm.roleId = this.selectValue;
            },
            selectJihuo:function(){
                this.$refs.user.elForm.userStatus = this.userStatus;
            },
            userEdit(row){
                var that = this;
                this.$refs.user.edit(row,{
                    success:function(data){
                        that.roleList = data.roleList;
                        that.selectValue = data.selectValue;
                        that.userStatus = data.userStatus;
                        that.jihuoList = data.jihuoList;   
                    }
                });
            },
            resetPass(row){
                var that = this;
                var obj = {id:row.id};
                 this.$confirm('此操作将重置密码, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                        this.$post('user/resetPwd', obj)
                        .then((data) => {
                            if(data.success){
                               that.$message({
                                    type: 'success',
                                    message: '重置密码成功!'
                                });
                            }
                       })

                        

                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消重置密码'
                        });          
                        });    
            },
            validatePass(rule, value, callback){
                    if (this.newPassword === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (this.newPassword !== this.$refs.user.elForm.password) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
            },
            deleteOrg(scope){
                var that = this;
                this.datagrid.del(scope.row, this.elTable,
                    //刷新树
                    function(json){
                        that.isRouterAlive1 = false;
                        that.$nextTick(() => (that.isRouterAlive1 = true));
                    });
            }
        }


    };
</script>
