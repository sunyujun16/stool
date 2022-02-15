<template>
  <div>
    <el-drawer
        title="我的故事"
        :visible.sync="drawers.resume"
        :direction="direction"
        :before-close="handleClose"
        size="40%"
        @open="pushResume"
        :modal="false"
    >
<!--      <Resume/>-->
      <router-view name="resume"></router-view>
    </el-drawer>

    <!--    <el-drawer-->
    <!--        title="我的故事"-->
    <!--        :visible.sync="drawers.story"-->
    <!--        :direction="direction"-->
    <!--        :before-close="handleClose"-->
    <!--        size="40%"-->
    <!--        @open="changeClass"-->
    <!--        :modal="false"-->
    <!--    >-->
    <!--      nothing for now-->
    <!--    </el-drawer>-->

    <el-drawer
        title="特别鸣谢"
        :visible.sync="drawers.thanks"
        :direction="direction"
        :before-close="handleClose"
        size="40%"
        @open="changeClass"
        :modal="false"
    >
      <div style="text-align: left; margin-left: 20px; line-height: 32px">
        <span class="thankTitle">感谢在网络上无私分享优质知识和经验的前辈们：</span><br/>
        <span class="thankContent"><a href="https://space.bilibili.com/651245581"
                                      target="_blank">韩顺平老师的Java基础</a></span><br/>
        <span class="thankContent"><a href="https://space.bilibili.com/384068749"
                                      target="_blank">CodeSheep程序羊</a></span><br/>
        <span class="thankContent"><a href="https://www.bilibili.com/video/BV19K4y1L7MT?spm_id_from=333.999.0.0"
                                      target="_blank">雷丰阳老师的SpringBoot(尚硅谷)</a></span><br/>
        <span class="thankContent"><a href="https://www.bilibili.com/video/BV1Zy4y1K7SH?spm_id_from=333.999.0.0"
                                      target="_blank">张天禹老师的VUE2(尚硅谷)</a></span><br/>

        <!--        <hr style="margin: 20px 20px 20px 0px; background-color: #ccc499;"/> &lt;!&ndash;上右下左，记住了&ndash;&gt;-->
        <!--        <span class="thankTitle">感谢我的父母、家人以及朋友们：</span><br/>-->
        <!--        <span class="thankContent">你们的支持和信任对我很重要。</span><br/>-->

        <!--        <hr style="margin: 20px 20px 20px 0px;  background-color: #ccc499"/> &lt;!&ndash;上右下左，记住了&ndash;&gt;-->
        <!--        <span class="thankTitle">感谢俺自己：</span><br/>-->
        <!--        <span class="thankContent">-->
        <!--          - 不客气。-->
        <!--        </span>-->
        <br/>
      </div>
    </el-drawer>


    <el-drawer
        title="请您畅所欲言（留言对所有用户可见）"
        :visible.sync="drawers.message"
        :direction="direction"
        :before-close="handleClose"
        size="40%"
        @open="changeClass"
        :modal="false"
    >
      <div style="text-align: left; margin-left: 20px; line-height: 32px">


        <!--        <span class="thankTitle">请您畅所欲言（留言对所有用户可见）：</span><br/>-->
        <label @mouseover="showAddBtn = true" @mouseout="showAddBtn = false">
          <input
              type="text"
              class="input-msg"
              placeholder="请输入，按回车添加，不超过50字。（若要表白请留下姓名，谢谢）"
              @keyup.enter="addAndSaveMsg"
              v-model="input_value"/>
          <button @click="addAndSaveMsg" v-show="showAddBtn" style="margin-left: 5px">添加</button>
        </label>

        <div v-for="(message, index) of this.messages" :key="index" class="msg-list">
          <span
              style="float: left;
              width: 100%;
              display: inline-block;
              word-wrap: break-word;
              word-break: normal;
              white-space: pre-wrap">
            <span style="float: left; font-weight: bold">{{ message.id }}：</span>
            <span style="float: left; width: 90%">{{ message.content }} &nbsp; at: {{
                getDate(message.time)
              }}</span>
          </span>
          <div style="clear: both"></div>
        </div>

      </div>
    </el-drawer>

  </div>
</template>

<script>
import Resume from "@/components/head/Resume";
import {mapState} from "vuex";

export default {
  name: "LeftSide",
  components: {Resume,},
  data() {
    return {
      direction: 'ltr',
      changeFlag: false,
      showAddBtn: false,
      input_value: '',
      messages: [
        {
          id: 1,
          content: '初始化2',
          time: 1602000000000,
        },
        {
          id: 0,
          content: '初始化1',
          time: 0,
        },
      ],
    };
  },
  computed: {
    ...mapState('headOptions', ["drawers",])
  },
  methods: {
    handleClose(done) {
      // if (confirm("确定关闭吗?"))
      this.$router.back()
      done();
    },
    getDate(timestamp) {
      let strings = new Date(timestamp).toLocaleString().split(' ')[0].split('/');
      let year = strings[0],
          month = strings[1].length === 2 ? strings[1] : '0' + strings[1],
          day = strings[2].length === 2 ? strings[2] : '0' + strings[2]
      return year + '年' + month + '月' + day + '日'
    },
    pushResume() {
      this.$router.push({
        name: 'resume'
      })
      this.changeClass();
    },
    changeClass() { // 由于在update钩子里未调用，热刷新maybe有一定问题，不过生产环境应该无所谓
      if (this.changeFlag) return
      this.changeFlag = true
      // 改变el-drawer的颜色，除了这样不知道如何了，修改class属性？
      for (let i = 0; i < 3; i++) {
        this.setRawStyleFor("el-drawer", i);
      }
      // document.getElementsByClassName("el-drawer")[2].class = ("el-drawer-cus");
      if (this.consts.CONSOLE) console.log("进入 ~ LeftSide")
      // this.$refs['el-drawer-thanks'].style.backgroundColor = '#bd5f5f';
    },
    setRawStyleFor(className, index) {
      let theStyle = document.getElementsByClassName(className)[index].style;
      theStyle.backgroundColor = 'rgba(1,1,1,0.4)';
      theStyle.color = 'white';
      theStyle.borderRight = '1px solid rgba(204, 196, 153, 0.5)'
      // 定义滚动条，重要！！！
      // document.styleSheets[0].addRule('.' + className + '__body::-webkit-scrollbar', 'display:none')
      document.styleSheets[0].addRule(
          '.' + className + '__body::-webkit-scrollbar',
          'background-color: rgba(0, 0, 0, 0.1); width: 10px')
      document.styleSheets[0].addRule(
          '.' + className + '__body::-webkit-scrollbar-track',
          '-webkit-box-shadow: inset 0 0 6px rgba(50, 50, 50, 0.8);')
      document.styleSheets[0].addRule(
          '.' + className + '__body::-webkit-scrollbar-thumb',
          'background-color: rgba(204, 196, 153, 0.2);' +
          'border-radius: 10px;' +
          '-webkit-box-shadow: inset 0 0 6px rgba(204, 196, 153, 0.3);')
    },
    addAndSaveMsg(e) {
      // 先判断是否合规
      let inputValue = this.input_value;
      if (inputValue.length > 50) {
        this.$message.error("输入超过50个字符")
        // alert('输入超过50个字符');
        return;
      } else if (inputValue.length === 0) {
        this.$message.error("输入不能为空")
      }

      // 包装msg和当前时间到message对象，发送到后端，不需要携带cookies.
      let url = this.$store.state.todoOptions.todoHost + "/save_msg";
      let message = {
        id: null,
        content: inputValue,
        time: new Date().getTime(),
      };
      // you know what? nothing...
      this.$axios.post(url, message, {withCredentials: false}).then(
          response => {
            if (response.data === 'success') {
              this.$message.success("保存成功")
              this.input_value = ''
              this.listMsg()
            } else {
              this.$message.error("保存失败")
            }
          }
      ).catch(err => {
        this.$message.error(err)
      })
    },
    listMsg() {
      // todo_ 加载this.messages
      let url = this.$store.state.todoOptions.todoHost + "/list_messages";
      this.$axios.get(url).then(
          res => {
            this.messages = res.data
          }, err => {
            this.$message.error("获取数据失败，请联系军仔")
          })
    }
  },
  beforeMount() {
    this.listMsg()
  }
}
</script>

<style scoped>
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
*::-webkit-scrollbar {
  display: none;
  /*background-color: #45b2d9;*/
}

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

.input-msg {
  width: 80%;
  /*margin-left: 10px;*/
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.input-msg:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

.msg-list {
  margin-left: 20px;
  margin-right: 20px;
  font-size: 16px;
  line-height: 32px;
}

</style>