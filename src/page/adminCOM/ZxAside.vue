<template>
    <div class="janxyM">
        <el-menu  :default-active="$route.path" router background-color="rgba(3,100,162,0)"  text-color="#fff" active-text-color="#fff000">

            
            <el-submenu v-for="menu in menus" :index="menu.id" :key="menu.id" >
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span>{{menu.name}}</span>
                </template>
                <el-menu-item-group  popper-class="mymenu">
                    <el-menu-item v-for="m in menu.submenu" :index="m.route" :key="m.id" :route="m.route" >{{m.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

          
        </el-menu>

    </div>
</template>

<script>
  export default {
    data() {
      return {
         menus:[],
      }
    },
    created: function() {
      this.$post('res/getMenuTree')
      .then((response) => {
          this.menus = response.menus; //正式数据
          console.log()
      })
	},
    methods: {
      
    }
  }
</script>

<style>





</style>

