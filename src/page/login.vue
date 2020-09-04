<template>
<div class="loginbox"> 
<div class="boxbg">
        <div class="title bgbg"><span>福州市政充电设施运营监管平台</span></div>
        <i class="i1"></i>
        <i class="i2"></i>
        <i class="i3"></i>
        <i class="i4"></i>   
         
        <div class="c flex flexc" style="top:80px;overflow-x: hidden; left:0; right:0; bottom:0;padding:20px; padding-right:80px;">
            
             <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="用户名">
                    <el-input size="medium" v-model="form.usercode"  @keyup.enter.native="onSubmit('form')" autofocus></el-input>
                </el-form-item>
                <el-form-item label="密 码">
                    <el-input size="medium" v-model="form.password" type="password"  @keyup.enter.native="onSubmit('form')" autofocus></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  size="medium" @click="onSubmit" :loading="loading"  @keyup.enter.native="onSubmit('form')" autofocus>登录系统</el-button>
                </el-form-item>
            </el-form>
  
             
        </div>

        <div class="ts">福州市综合能源信息服务有限公司</div>

    </div>
</div>
    
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          usercode: 'admin',
          password: '1'
        },
        loading:false,
      }
    },
    beforeRouteEnter(to,from,next){
      next((vm)=>{ 
        ///vm.path = from.path
      })
    },
    created(){
        
    },
    mounted () {
        
    },
   
    methods: {
      onSubmit() {
        this.loading = true;
        this.$post('login/loginValid',this.form)
        .then((response) => {
            if(response.success){
              this.$store.commit("changeUser", response.user);
              this.$router.push({ path: '/admin' })
            }else{
                this.loading = false;
            }
        })
      }
    }
  }
</script>

<style scoped>
.loginbox{
    width: 600px; height: 400px; position: absolute; left: 50%; top: 50%; margin-left: -300px; margin-top: -200px; padding:50px; box-sizing: border-box;
}
.ts{width: 100%; position: absolute; left: 0; bottom: -100px; text-align: center; color: #1383e7; font-size: 20px;}
.bgbg{width:500px;background-image: url('~@/../static/titlebg2.png');margin-left: -250px;}
</style>
