<template>
    <div class="main">
        <zx-table load-url="dict/getList" del-url="dict/delete" edit-url="dict/edit"  action="dict/save" ref="dict" tag="字典列表">

            <!-- 搜索 -->
            <template slot-scope="tool" slot="tool">
                    <el-input v-model="tool.data.search_like_dictCode" placeholder="字典编码"  size="small"></el-input>
                    <el-input v-model="tool.data.search_like_dictName" placeholder="字典名称"  size="small"></el-input>
                    <el-input v-model="tool.data.search_like_dictEnKey" placeholder="值对应的英文名"  size="small"></el-input>
                    <el-button type="warning" icon="el-icon-search" @click="$refs.dict.search()"  size="small">搜索</el-button>
                    <el-button  type="success" icon="el-icon-plus" @click="$refs.dict.add()"  size="small">增加</el-button>
            </template>

            <!-- 表格主体 -->
            <template slot="column">
                 <el-table-column prop="dictCode" label="字典编码">
                </el-table-column>
                <el-table-column prop="dictName" label="字典名称">
                </el-table-column>
                <el-table-column prop="dictKey" label="中文值">
                </el-table-column>
                <el-table-column prop="dictEnKey" label="值对应的英文名">
                </el-table-column>
                 <el-table-column prop="dictValue" label="实际值">
                </el-table-column>

                <el-table-column label="操作"  width="70">
                       <template slot-scope="scope">
                           <el-tooltip content="编辑" placement="top" :hide-after="1000">
                               <el-button type="text" icon="el-icon-edit-outline" size="small" @click="$refs.dict.edit(scope.row)"></el-button>
                           </el-tooltip>
                           <el-tooltip content="删除" placement="top" :hide-after="1000">
                               <el-button type="text" icon="el-icon-remove-outline" size="small" @click="$refs.dict.del(scope.row)"></el-button>
                           </el-tooltip>
                       </template>
                </el-table-column>
            </template>

            <!-- 增加和编辑 -->
            <template slot-scope="dialog" slot="dialog">
                <el-form :model="dialog.data" label-width="100px" ref="ruleForm">
                    <el-row>
                        <el-col :span="12">    
                            <el-form-item label="字典编码" prop="dictCode" label-width="150px" :span="12"
                                :rules ="[
                                    { required: true, message: '请输入字典编码', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input v-model="dialog.data.dictCode" auto-complete="off"  style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="12">    
                            <el-form-item label="字典名称" prop="dictName" label-width="150px" :span="12"
                                :rules ="[
                                    { required: true, message: '请输入字典名称', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input v-model="dialog.data.dictName" auto-complete="off"  style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="12">   
                            <el-form-item label="字典中文值" prop="dictKey" label-width="120px" :span="12"
                            :rules ="[
                                    { required: true, message: '请输入字典中文值', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input v-model="dialog.data.dictKey" auto-complete="off"  style="width:100%"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="12">   
                            <el-form-item label="值对应的英文名" prop="dictEnKey" label-width="150px" :span="12"
                            :rules ="[
                                    { required: true, message: '请输入值对应的英文名', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input v-model="dialog.data.dictEnKey" auto-complete="off"  style="width:100%"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="12">   
                            <el-form-item label="实际值" prop="dictValue" label-width="120px" :span="12"
                                :rules ="[
                                    { required: true, message: '请输入实际值', trigger: 'blur' },
                                    { message: '长度超出限制', trigger: 'blur',max:63}
                                    ]"
                            >
                                <el-input v-model="dialog.data.dictValue" auto-complete="off"  style="width:100%"></el-input>
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
          
            edit(row){
                console.log("字典回填");
                console.log(row);
                // this.$refs.dict.edit(row);
            }
        }

    };
</script>
