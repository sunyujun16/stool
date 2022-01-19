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
    <img src="./assets/img/benaja-germann-QbdzCEXy5vs-unsplash-021.jpg" alt="nah" class="background-img" id="fuck"
         > <!--    -->
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
  background-color: rgba(1, 1, 1, 0.1);
}


</style>
