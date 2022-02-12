<template>
  <div>
    <el-drawer
        title="站长简介"
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
    changeClass() {
      if (this.changeFlag) return
      this.changeFlag = true
      // 改变el-drawer的颜色，除了这样不知道如何了，修改class属性？
      for (let i = 0; i < 2; i++) {
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
      document.styleSheets[0].addRule('.'+className + '__body::-webkit-scrollbar', 'display:none')
    }
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
</style>