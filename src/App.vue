<template>
  <div id="app">
    <div style="position: relative; z-index: 10; top: 0">
      <el-container>
        <Header/>
        <MainPart/>
        <Footer/>
      </el-container>
    </div>
    <!--    <img src="./assets/img/benaja-germann-QbdzCEXy5vs-unsplash-021.jpg" alt="nah" class="background-img" id="fuck"-->
    <!--         :style="imgStyle" ref="backImg"> &lt;!&ndash;    &ndash;&gt;-->
    <img src="http://alifile.sunyujun.com/stool_base/basic/benaja-germann-QbdzCEXy5vs-unsplash-021.jpg" alt="nah" class="background-img" id="fuck">
<!--    <img src="./assets/img/olivier-guillard-xnGu_KGrqX8-unsplash.jpg" alt="nah" class="background-img" id="fuck">-->
<!--    <div id="bg-cover"></div>-->
  </div>
</template>

<script>
import Header from "@/components/head/Header";
import Footer from "@/components/foot/Footer";
import MainPart from "@/components/main/MainPart";
import TodoApp from "@/views/TodoApp";
import axios from "axios";

export default {
  name: 'App',
  components: {
    MainPart,
    Footer,
    Header,
    TodoApp,
  },
  data() {
    return {
      // winWidth: document.documentElement.clientWidth,
      // winHeight: document.documentElement.clientHeight,
    }
  },
  computed: {
    // imgStyle() {
    //   return {
    //     width: this.winWidth + 'px',
    //     height: this.winHeight + 'px'
    //   }
    // }
  },
  beforeMount() {
    // 刷新页面，加载程序，此时判断是否已经登录
    let userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      // 修改store的UserInfo信息
      this.$store.commit('globalOptions/SET_USER_INFO', JSON.parse(userInfo))
      this.$store.commit('globalOptions/LOGIN')
    }
  },
  mounted() {
    // if (this.consts.CONSOLE) console.log(this.$router)
    // if (this.consts.CONSOLE) console.log("Vue @ @ @ ", this)
    // if (!this.consts.CONSOLE) console.log("Fuck whom?")
    // let _this = this;
    // window.onresize = function () { // 定义窗口大小变更通知事件
    //   _this.winWidth = document.documentElement.clientWidth; //窗口宽度
    //   _this.winHeight = document.documentElement.clientHeight; //窗口高度
    // };
  },
  watch: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  z-index: 1;
  height: 800px;
  color: #2c3e50;
  top: 10px;
}

.background-img {
  top: 0;
  left: 0;
  z-index: 2; /*img背景关键属性*/
  position: fixed; /*img背景关键属性*/
  width: 1920px;
  height: 1080px;
  object-fit: cover; /*img背景关键属性*/
}

#bg-cover {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.382;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.hf-bgcolor {
  /*background-color: rgba(68, 153, 153, 0.1);*/
  /*background-color: rgba(45, 121, 28, 0.1);*/
  /*background-color: rgba(1, 1, 1, 0.1);*/
}


</style>
