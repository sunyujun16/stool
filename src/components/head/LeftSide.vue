<template>
  <div>
    <el-drawer
        title="我的故事"
        :visible.sync="drawers.resume"
        :direction="direction"
        :before-close="handleClose"
        size="40%"
        @open="changeClass"
        :modal="false"
    >
      <Resume/>
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
        title="给我留言"
        :visible.sync="drawers.message"
        :direction="direction"
        :before-close="handleClose"
        size="40%"
        @open="changeClass"
        :modal="false"
    >
      <div style="text-align: left; margin-left: 20px; line-height: 32px">


        <span class="thankTitle">请您畅所欲言（留言对所有用户可见）：</span><br/>
        <label @mouseover="showAddBtn = true" @mouseout="showAddBtn = false">
          <input
              type="text"
              class="input-msg"
              placeholder="不超过50字，若要表白，请留下姓名，谢谢"
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
            <span style="float: left; width: 90%">{{ message.content }} - {{
                new Date(message.date).toLocaleString().split(' ')[0]
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
          id: 2,
          content: '初始化3',
          date: 1002000000000,
        },
        {
          id: 1,
          content: '初始化2',
          date: 10000000000,
        },
        {
          id: 0,
          content: '初始化111111 111111111 111111111 1 1 1111111111122222242aggggggg ggggggggg gggggggggs dfffffffffffffff fffffffffff134',
          date: 0,
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
      done();
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
      // 取消滚动条，重要！！！
      document.styleSheets[0].addRule('.' + className + '__body::-webkit-scrollbar', 'display:none')
    },
    addAndSaveMsg(e) {
      this.input_value;
      // 包装msg和当前时间到message对象，添加到

    }
  },
  beforeMount() {
    // todo 加载this.messages
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

.msg-list {
  margin-left: 20px;
  margin-right: 20px;
  font-size: 16px;
  line-height: 32px;
}

</style>