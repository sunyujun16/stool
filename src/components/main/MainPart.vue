<template>
  <el-main>
    <div class="slogan" style="margin-right: 60px;" ref="slogan">
      <span style="font-weight: bold; font-size: 60px; text-shadow:  -3px -3px 10px #6f6a59">"Programming</span>
      <span> is like marathon, it's never too late to start"</span>
      <span id="luxun"> —— 鲁迅</span>
    </div>

    <div style="margin-bottom: 50px"></div>  <!-- 占位DIV -->

    <div>
      <el-divider direction="horizontal"></el-divider>
      <div style="margin: 50px"></div>  <!-- 占位DIV -->

      <!--    BoardsZone or TODOAPP or 。。。前端这鸡巴代码哪有一点可读性？ -->
      <!--tips：用全局事件总线实现事件的回调，即点击todolist触发此处的router push-->
      <router-view></router-view>

      <div style="margin-bottom: 60px; clear: both"></div>  <!-- 占位DIV -->
      <el-divider direction="horizontal"></el-divider>
    </div>

    <SlangPart/>

  </el-main>
</template>

<script>
import SlangPart from "@/components/main/SlangPart";

export default {
  name: "MainPart",
  components: {SlangPart,},
  data() {
    return {}
  },
  methods: {
    jumpToTodoList() {
      //先进行登录验证，verifyLogIn()
      this.$router.push({
        name: 'todoApp',
      })
    },
    verifyLogIn() {

    },
  },
  mounted() {
    this.$bus.$on("jumpToTodoList", this.jumpToTodoList)
  },
  beforeDestroy() {
    this.$bus.$off("jumpToTodoList")
  }
}
</script>

<style scoped>
.el-main {
  text-align: center;
  min-height: auto;
  color: #ccc499;
}

.el-main .slogan {
  color: #ccc499;
  line-height: 60px;
  font-size: 24px;
  font-family: "Microsoft YaHei UI", serif;
  font-weight: normal;
  text-align: right;
  padding-right: 40px;
  margin-top: 110px;
  user-select: none
}

#luxun {
  font-size: 14px;
  color: rgba(204, 196, 153, 0.5);
}

.el-divider {
  background-color: rgba(204, 196, 153, 0.1);
  height: 1px;
}

</style>