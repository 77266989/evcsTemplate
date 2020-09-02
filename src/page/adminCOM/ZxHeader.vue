<template>
  <div class="hd flex center pr" style="justify-content: flex-end;">
    <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-demo"
      style="margin-right:280px"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgba(3,100,162,0)"  text-color="#fff" active-text-color="#fff000"
    >
      <el-menu-item index="1" route="/home">首页</el-menu-item>
      <el-submenu index="2">
      <template slot="title">管理系统</template>
        <el-menu-item index="2-1"  route="/admin">菜单1</el-menu-item>
      </el-submenu>
      <!-- <el-menu-item index="3" route="/">凑数菜单1</el-menu-item>
      <el-menu-item index="3" route="/">凑数菜单2</el-menu-item> -->
    </el-menu>

    <div class="bg-right flex center" style="color:#4a968c; font-size:24px;">
        <div class="flex" style="margin-bottom:50px; margin-left:80px;">
            <i class="el-icon-s-custom" style="margin-top:7px; margin-right:10px;"></i>
            <div class="flex flexc " style="color:#4a968c; font-size:14px;">
                <span>你好</span>
                <span>管理员</span>
            </div>
        </div>
        <div class="flex" style="margin-bottom:50px; margin-left:30px;"><i class="el-icon-s-tools" style="margin-top:7px; margin-right:10px;"></i></div>
    </div>

    <div class="ggao">
      <span style="color:#d7e22c; padding-right:10px;"><i class="el-icon-s-promotion"></i> 紧急通知：</span>你知道吗过几天可能福州会下雨哦？
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
  .bg-right{width: 280px; height: 100px; background-image: url('~@/../static/new/hdbg-right.png'); position: absolute; right: 0; top: 0; }
  .ggao{width: 800px; height: 30px;  position: absolute; left: 450px; top: 50px; position: absolute;line-height: 30px; font-size: 14px;color: #e9533f;}
</style>

