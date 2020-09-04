<template>
    <div class="main">
            <div class="treeDiv">
                <el-table ref="configTalbe" :data="tableData" highlight-current-row @cell-click="tableClick"
                        style="width: 200px">
                    <el-table-column prop="group" label="分类"> </el-table-column>
                    <el-table-column label="#"  width="40">
                        <template slot-scope="scope">
                            <i class="el-icon-arrow-right"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div  class="mainDiv">
                <zx-table load-url="config/getList"  edit-url="config/edit"  action="config/save" ref="config" tag="系统配置" :auto-load="false" @loadSuccess="loadSuccess">
                    <!-- 表格主体 -->
                    <template slot="column">
                        <el-table-column prop="keyName" label="键名称"/>
                        <el-table-column prop="keyValue" label="键值" />
                        <el-table-column prop="remark" label="中文描述" />
                        <el-table-column prop="typeName" label="键值类型" />
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-tooltip content="编辑" placement="top" :hide-after="1000">
                                    <el-button type="text" icon="el-icon-edit-outline" size="small" @click="configEdit(scope.row)"></el-button>
                                </el-tooltip>

                            </template>
                        </el-table-column>
                    </template>

                    <!-- 增加和编辑 -->
                    <template slot-scope="dialog" slot="dialog">
                        <el-form :model="dialog.data" label-width="100px">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="中文描述" prop="remark" label-width="120px" :span="12"
                                              :rules ="[
                                          { required: true, message: '请输入中文描述', trigger: 'blur' },
                                          { message: '长度超出限制', trigger: 'blur',max:127}
                                         ]"
                                >
                                    <el-input v-model="dialog.data.remark" auto-complete="off" style="width:100%"></el-input>
                                </el-form-item>
            
            
                                <el-form-item label="键值" prop="keyValue" label-width="120px" :span="12"
                                              :rules ="[
                                          { required: true, message: '请输入键值', trigger: 'blur' },
                                          { message: '长度超出限制', trigger: 'blur',max:127}
                                         ]"
                                >
                                    <el-input v-model="dialog.data.keyValue" auto-complete="off" style="width:100%"></el-input>
                                </el-form-item>
            
            
                                <el-form-item label="请输入排序" prop="seat" label-width="120px" :span="12"
                                              :rules ="[
                                          { required: true, message: '请输入排序', trigger: 'blur' },
                                          { message: '长度超出限制', trigger: 'blur',max:11}
                                         ]"
                                >
                                    <el-input v-model="dialog.data.seat" auto-complete="off" style="width:100%" type="number"></el-input>
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

        var that = this;
        that.$refs.config.load();
        this.$post('config/list', {})
        .then((data) => {
            if(data.success){
                that.tableData = data.data;
                that.showEmail = data.showEmail;

            }else{
                this.$msg.message("数据请求失败",{type:'info'});
            }

        })

        },
        data () {
            return {
                tableData:[],
                showEmail:false,
            };
        },
        methods: {
            tableClick:function(row){
                console.log(row.group)
                this.$refs.config.tool.group = row.group;
                this.$refs.config.load();
                // console.log(data.showEmail)
            },
            configEdit(row){
                var that = this;
                this.$refs.config.edit(row,{
                    success:function(data){

                    }
                });
            },
            loadSuccess(data){
                console.log(data.showEmail);
                this.showEmail = data.showEmail;
            },

        }
    };
</script>
