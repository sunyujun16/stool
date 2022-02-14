<template>
  <div>
    <el-header class="hf-bgcolor" height="45px">
      <div style="float: left">
        <span class="headLink" @click="TAB_RESUME(true)">站长简介</span>
        <el-divider direction="vertical"></el-divider>
<!--        <span class="headLink" @click="TAB_STORY(true)">我的故事</span>-->
        <!--        <el-divider direction="vertical"></el-divider>-->
        <span class="headLink" @click="TAB_THANKS(true)">特别鸣谢</span>
        <el-divider direction="vertical"></el-divider>
        <span class="headLink" @click="LEAVE_MSG(true)">给我留言</span>
      </div>
      <div style="float: right">
        <span class="headLink" id="login" v-show="!login"
              @click="TAB_DIALOGFORMVISIBLE_LOGIN(true)">登录</span>
        <span class="headLink" id="userName" v-show="login" v-text="'欢迎: ' + userInfo.username"></span>
        <el-divider direction="vertical"></el-divider>
        <span class="headLink" id="register" v-show="!login"
              @click="TAB_DIALOGFORMVISIBLE_REGISTER(true)">注册</span>
        <span class="headLink" id="avatar" v-show="login" @click="logout">退出</span>
      </div>
      <div style="clear: both"></div>
    </el-header>

    <!--    登录滴Box-->
    <LoginBox/>
    <!--    注册滴Box-->
    <RegisterBox/>
    <!--    左侧滴侧边栏-->
    <LeftSide/>

  </div>
</template>

<script>
import Resume from "@/components/head/Resume";
import LeftSide from "@/components/head/LeftSide";
import LoginBox from "@/components/head/LoginBox";
import RegisterBox from "@/components/head/RegisterBox";
import {mapMutations, mapState} from "vuex";

export default {
  components: {RegisterBox, LoginBox, LeftSide, Resume,},
  name: "Header",
  data() {
    return {
      changeFlag: false,
    };
  },
  computed: {
    ...mapState('headOptions', ["drawers",]),
    ...mapState('globalOptions', ["login", "userInfo"])
  },
  methods: {
    ...mapMutations("headOptions",
        ['TAB_RESUME',
          'TAB_STORY',
          'TAB_THANKS',
          'LEAVE_MSG',
          'TAB_DIALOGFORMVISIBLE_LOGIN',
          'TAB_DIALOGFORMVISIBLE_REGISTER']),
    ...mapMutations("globalOptions", ['SET_USER_INFO', 'CLEAR_USER_INFO', 'LOGOUT']),
    logout() {
      // todo_done 把数据同步到数据库
      // 先判断是否inAPP
      let inOrNot = this.$store.state.globalOptions.inTodoApp;
      if (this.consts.CONSOLE) console.log("inTodoApp为: ", inOrNot)
      if (inOrNot) {
        // 如果在APP内，则令总线触发saveToServer
        if (this.consts.CONSOLE) console.log("在APP内退出，触发同步")
        this.$bus.$emit('saveToServer', null, true, true)
      } else {
        if (this.consts.CONSOLE) console.log("不在APP内退出，不进行同步")
      }

      // clear sessionStorage，注意后端也要清除
      sessionStorage.clear()

      this.$message({
        type: "success",
        message: '数据已保存到云端，现在进入离线模式',
        // offset: 3000,
      })
      // 退出登录，修改login状态，清除全局userInfo
      this.LOGOUT();
      this.CLEAR_USER_INFO();

      // 发送请求，清除后端的相应session对象。
      let _this = this
      this.$nextTick(() => {
        let url = _this.$store.state.todoOptions.todoHost
            + '/logout?username='
            + _this.$store.state.globalOptions.userInfo.username;
        _this.$axios.get(url).then(
            response => {
              _this.$message.success("已退出登录")
            },
            error => {
              _this.$message.error("服务器端退出异常，请重启浏览器后登录")
            })
      })

    }
  }
}
</script>

<style scoped>
.el-header {
  color: rgba(204, 196, 153, 0.9);
  font-size: 14px;
  font-family: 'Microsoft YaHei UI Light', serif;
  font-weight: 100;
  height: 45px;
  margin-top: 25px;
  position: fixed;
  width: 100%;
  text-align: left;
  border: 0 solid;
  border-bottom: 2px solid rgba(204, 196, 153, 0.5);
}

.el-divider {
  /*background-color: rgba(45, 121, 28, 0.1);*/
  /*background-color: #cfeac7;*/
  background-color: rgba(204, 196, 153, 0.5);
  height: 15px;
  opacity: 0.5;
}

.headLink {
  font-family: "Microsoft YaHei UI", serif;
  cursor: pointer;
  font-size: 14px;
  user-select: none
}

.headLink:hover {
  font-size: 15px;
  text-shadow: 2px 2px 5px #e7e6cd;
}

/*控制其他区域的颜色*/
.el-drawer__wrapper {
  background-color: rgba(1, 1, 1, 0.7);
}


/*一个也不好使*/
.el-drawer-cus {
  background-color: rgba(133, 212, 186, 0.8);
  color: red;
}

/*.el-drawer__container .el-drawer .el-drawer__open {*/
/*  background-color: rgba(1, 1, 1, 0.7);*/
/*}*/
/*.el-drawer__body{*/
/*  background-color: #45b2d9;*/
/*}*/

.thankTitle {
  font-weight: bold;
  font-size: 22px;
  color: #ccc499;
}

.thankContent {
  margin-left: 20px
}

a {
  color: white;
}

a:visited {
  color: lightcyan;
}

</style>