<template>
    <div class="main">
        <zx-table load-url="company/getList" del-url="company/delete" edit-url="company/edit"  action="company/save" ref="company" tag="项目地址列表">

            <!-- 搜索 -->
            <template slot-scope="tool" slot="tool">
                    <el-input v-model="tool.data.search_like_name" placeholder="地址名称"  size="small"></el-input>
                    <el-input v-model="tool.data.search_like_address" placeholder="地址详情"  size="small"></el-input>
                    <el-button type="warning" icon="el-icon-search" @click="$refs.company.search()"  size="small">搜索</el-button>
                    <el-button type="success" icon="el-icon-plus" @click="$refs.company.add()"  size="small">增加</el-button>
            </template>

            <!-- 表格主体 -->
            <template slot="column">
                 <el-table-column prop="name" label="地址名称">
                </el-table-column>
                <el-table-column prop="address" label="地址详情">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>

                <el-table-column label="操作"  width="70">
                       <template slot-scope="scope">
                           <el-tooltip content="编辑" placement="top" :hide-after="1000">
                               <el-button type="text" icon="el-icon-edit-outline" size="small" @click="$refs.company.edit(scope.row)"></el-button>
                           </el-tooltip>
                           <el-tooltip content="删除" placement="top" :hide-after="1000">
                               <el-button type="text" icon="el-icon-remove-outline" size="small" @click="$refs.company.del(scope.row)"></el-button>
                           </el-tooltip>
                       </template>
                </el-table-column>
            </template>

            <!-- 增加和编辑 -->
            <template slot-scope="dialog" slot="dialog">
                <el-form :model="dialog.data" label-width="100px" ref="ruleForm">
                    <el-row>
                        <el-col :span="24">    
                            <el-form-item label="地址名称" prop="name" label-width="150px" :span="12"
                                :rules ="[
                                    { required: true, message: '请输入地址名称', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input v-model="dialog.data.name" auto-complete="off"  style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="24">    
                            <el-form-item label="地址详情" prop="address" label-width="150px" :span="12"
                                :rules ="[
                                    { required: true, message: '请输入地址详情', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input v-model="dialog.data.address" auto-complete="off"  style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                        <el-form-item label="机房经纬度" prop="locationName" label-width="150px" :span="12">
                                <el-input v-model="dialog.data.locationName" auto-complete="off"  style="width:75%" disabled></el-input>
                                <el-button type="primary" @click="chooseMap">请选择机房的经纬度</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="经度" prop="longitude" label-width="120px" :span="12" v-show="false"> 
                            <el-input v-model="dialog.data.longitude" auto-complete="off"  style="width:100%"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="纬度" prop="latitude" label-width="120px" :span="12" v-show="false"> 
                            <el-input v-model="dialog.data.latitude" auto-complete="off"  style="width:100%"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="24">   
                            <el-form-item label="备注" prop="remark" label-width="150px" :span="12"
                                :rules ="[
                                    { required: false, message: '请输入备注', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input type="textarea" v-model="dialog.data.remark" auto-complete="off" style="width:100%" maxlength="128"></el-input>
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
                
            };
        },
        methods:{
            chooseMap(){
                var that = this;
                this.dialog.open('page/dbs/openMap', {
                    title : '选择位置',
                    width : "800px",
                    height :"500px",
                    data:{
                        longitude : that.$refs['company'].elForm.longitude,
                        latitude : that.$refs['company'].elForm.latitude,
                    },
                    confirm : function(resp) {
                        let obj= JSON.parse(resp);
                        that.$set(that.$refs['company'].elForm,"longitude", obj[1]);
                        that.$set(that.$refs['company'].elForm,"latitude", obj[0]);
                        that.$set(that.$refs['company'].elForm,"locationName", obj[0] +","+ obj[1]);
                    }
                });
            }
           
        }

    };
</script>
