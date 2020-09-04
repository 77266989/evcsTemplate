<template>
    <div class="main">

        <div class="treeDiv">
            <tree treeType="orgTree" @click="nodeClick" ref="orgTree" title="组织架构" :actives="actives" :show_icon="true"></tree>
        </div>
        <div  class="mainDiv">
                <zx-table load-url="org/getList" del-url="org/delete" edit-url="org/edit"  action="org/save" ref="org" tag="单位列表" :auto-load="false">

        <!-- 搜索 -->
        <template slot-scope="tool" slot="tool">
            <el-input v-model="tool.data.search_like_orgName" placeholder="请输入单位名称"></el-input>
            <el-input v-model="tool.data.search_like_orgCode" placeholder="请输入单位编码"></el-input>
            <el-button type="warning" icon="el-icon-search"   @click="$refs.org.search()">搜索</el-button>
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="orgIns">新增</el-button>
            <el-switch v-model="tool.data.isLowLevel" :active-value="true" :inactive-value="false" active-text="包含下级"  @change="$refs.org.search()"  style="margin-left: 20px"></el-switch>
        </template>

        <!-- 表格主体 -->
        <template slot="column">
            <el-table-column prop="orgCode" label="单位编码"/>
            <el-table-column prop="orgName" label="单位名称" />
            <el-table-column prop="parentName" label="上级单位" />
            <el-table-column prop="createDate" label="创建时间" />
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top" :hide-after="1000">
                        <el-button type="text" icon="el-icon-edit-outline" size="small" @click="orgEdit(scope.row)"></el-button>
                    </el-tooltip>

                    <el-tooltip content="删除" placement="top" :hide-after="1000">
                        <el-button type="text" icon="el-icon-remove-outline" size="small" @click="$refs.org.del(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </template>

        <!-- 增加和编辑 -->
        <template slot-scope="dialog" slot="dialog">
            <el-form :model="dialog.data" label-width="100px">
                <el-row>

            <el-col :span="12" v-if="false">
                <el-form-item label="上级单位ID" prop="parentId" label-width="120px" :span="12">
                    <el-input v-model="elForm.item.parentId" auto-complete="off" style="width:100%"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="单位编号" prop="orgCode" label-width="120px" :span="12"
                    :rules ="[
                            { required: true, message: '请输入单位编号', trigger: 'blur' }
                            ]"
                >
                    <el-tooltip class="item" effect="dark" :content="dialog.data.parentCode+'...'" placement="top-start">
                        <el-input v-model="dialog.data.orgCode" auto-complete="off" style="width:100%"  :maxlength="32"></el-input>
                    </el-tooltip>
                </el-form-item> 
            </el-col>

            <el-col :span="12">
                <el-form-item label="单位级别" prop="orgType" label-width="120px" :span="12"
                                :rules ="[
                            { required: true, message: '请选择单位级别', trigger: 'blur' }
                            ]"
                >
                    <el-select v-model="orgType" placeholder="请选择" @change="selectChange">
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
                    <el-form-item label="地市名" prop="cityName" label-width="120px" :span="12"
                    :rules ="[
                            { required: true, message: '请输入地市名', trigger: 'blur' }
                            ]"
                    >
                    <el-input v-model="dialog.data.cityName" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                    </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="区县名" prop="countyName" label-width="120px" :span="12">
                    <el-input v-model="dialog.data.countyName" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="上级单位" prop="parentName" label-width="120px" :span="12"
                                :rules ="[
                            { required: false, message: '请输入上级单位', trigger: 'blur' }
                            ]"
                >
                    <el-input v-model="dialog.data.parentName" :readonly=true auto-complete="off" style="width:100%"></el-input>
                </el-form-item>
            </el-col>

            <!-- <el-col :span="12">
                <el-form-item label="站点名" prop="siteName" label-width="120px" :span="12"
                                :rules ="[
                            { required: false, message: '请输入站点名', trigger: 'blur' }
                            ]"
                >
                    <el-input v-model="dialog.data.siteName" auto-complete="off"  style="width:100%" :maxlength="16"></el-input>
                </el-form-item>
            </el-col> -->
            <el-col :span="12">
                <el-form-item label="单位简称" prop="orgShortName" label-width="120px" :span="12"
                                :rules ="[
                            { required: true, message: '请输入单位简称', trigger: 'blur' }
                            ]"
                >
                    <el-input v-model="dialog.data.orgShortName" auto-complete="off"  style="width:100%" :maxlength="10"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="单位排序" prop="seat" label-width="120px" :span="12"
                                :rules ="[
                            { required: true, message: '请输入排序', trigger: 'blur' }
                            ]"
                >
                    <el-input v-model="dialog.data.seat" type="number" auto-complete="off" style="width:100%" :maxlength="10"></el-input>
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
                isRouterAlive1 : true,
                orgType:''
            };
        },
        methods: {
            nodeClick:function(obj, node){
                this.$refs.org.page = 1;
                this.$refs.org.tool.parentId = node.data.data.id;
                this.$refs.org.load();
            },

            orgIns() {
                if(this.$refs.org.tool.parentId==null){
                    this.messager.info("请选择一个单位");
                    return;
                }
                var that = this;
                this.$refs.org.add({
                    data: { parentId: this.$refs.org.tool.parentId},
                    success:function(data){
                        that.list = data.list;
                    }
                });
            
            },
            orgEdit(row){
                var that = this;
                this.$refs.org.edit(row,{
                success:function(data){
                    that.list = data.list;
                    that.orgType = data.orgType;
                }
            })
            },   
            selectChange(){
               this.$refs.org.elForm.orgType = this.orgType;      
            }
            
        }


    };
</script>
