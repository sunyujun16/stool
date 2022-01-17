<template>
  <div style="margin-top: 50px; margin-bottom: 60px" v-on:mouseleave="warnShow = false">
    <!--    <LineButtonLeft msg="复制" :content="slang"/>-->
    <div v-if="copySuccess" :class="msgDiv" ref="msgDiv">拷贝成功</div>
    <button type="button" class="btnLeft"
            v-clipboard:copy="slang"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制
    </button>
    <!--    <span id="shici"><span id="jinrishici-sentence">正在加载今日诗词....</span></span>-->
    <span
        v-on:mouseover="warnShow = true"

        style="user-select: none"
    >{{ slang }}</span>
    <LineButton msg="刷新" :click-call="getSlang"/>
    <br/>
    <div style="margin-top: 5px">
      <span v-show="warnShow" class="choose" @click="setTxetType(1)">一言</span> <span v-show="warnShow">|</span>
      <span v-show="warnShow" class="choose" @click="setTxetType(2)">中英文</span> <span v-show="warnShow">|</span>
      <span v-show="warnShow" class="choose" @click="setTxetType(3)">社会嗑</span> <span v-show="warnShow">|</span>
      <span v-show="warnShow" class="choose" @click="setTxetType(4)">毒鸡汤</span> <span v-show="warnShow">|</span>
      <span v-show="warnShow" class="choose" @click="setTxetType(5)">彩虹屁</span> <span v-show="warnShow">|</span>
      <span v-show="warnShow" class="choose" @click="setTxetType(6)">渣男语录</span> <span v-show="warnShow"></span>
    </div>
  </div>
</template>

<script>
import LineButton from "@/components/buttons/LineButton";
// 单独引入，因为全局的axios设置了withCredential=true，跨域出问题咯。
import axios1 from "axios";

axios1.defaults.withCredentials = false

export default {
  name: "SlangPart",
  components: {LineButton},
  data() {
    return {
      slang: '',
      warnShow: false,
      copySuccess: false,
      msgDiv: 'msgDiv',
      textType: 'en',
      typeList: ['hitokoto', 'en', 'social', 'soup', 'fart', 'zha'],

      lastChoice: 0,
    }
  },
  methods: {
    getSlang() {
      // 刷新诗词
      // let shici = document.getElementById("shici");
      // let jinrishici = document.getElementById("jinrishici-sentence");
      // shici.removeChild(jinrishici)
      // let attrId = document.createAttribute("id");
      // let eleSpan = document.createElement("span");
      // eleSpan.setAttribute("id","jinrishici-sentence")
      // eleSpan.innerText = "sha wan ying"
      // shici.appendChild(eleSpan)

      // this.$refs.slogan.style.color = 'red' // 亲测好使
      // console.log("diao le")
      // hitokoto(一言)、en(中英文)、social(社会语录)、soup(毒鸡汤)、fart(彩虹屁)、zha(渣男语录)

      return axios1.get("https://api.uixsj.cn/hitokoto/get?type=" + this.textType,
          {withCredentials: false})
          .then(
              response => {
                this.slang = response.data
              },
              error => {
                alert("小硬嗑没了")
              }
          )

      // 诗词API，速度和机制不太友好，不嫖了
      // https://v2.jinrishici.com/one.json
      // json data - data - content
      // return axios.get("https://v2.jinrishici.com/one.json").then(
      //     response => {
      //       // console.log(this)
      //       this.slang = response.data.data.content
      //     },
      //     error => {
      //       alert("小硬嗑没了")
      //     }
      // )
    },
    setTxetType(n) {
      this.textType = this.typeList[n - 1]
      this.getSlang()
      let eles = document.getElementsByClassName('choose');
      eles[this.lastChoice].style.color = '#d5d9c4'
      this.lastChoice = n - 1
      eles[n - 1].style.color = "#a1b842"

    },
    onCopy() {
      // 如果要修改弹窗样式，请参考在main.js引入的对应css文件。
      this.$message({
        customClass: 'noticeMsg',
        message: '拷贝成功',
        type: 'success',
      })
      // 用下面代码能实现类似的效果，但想写好太麻烦了，还是用现成的工具吧，不能再耽搁了。
      // this.copySuccess = true;
      // let _this = this
      // setTimeout(()=> {
      //   _this.msgDiv = 'msgDiv2'
      // },1000)
      //
      // setTimeout(()=> {
      //   _this.copySuccess = false
      //   _this.msgDiv = 'msgDiv'
      // },1000)

    },
    onError: function (e) {
      alert('拷贝失败')
    },
    initType(n) {
      document.getElementsByClassName('choose')[n].style.color = '#a1b842'
      this.lastChoice = n
    }
  },
  mounted() {
    this.slang = this.getSlang().data
    this.initType(1)
  },
}
</script>

<style scoped>
@import "../../../src/assets/css/lineButtonLeft.css";

.choose {
  /*user-select: none;*/
  color: #d5d9c4;
  font-size: 12px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 5px;
}

.choose:hover {
  cursor: default;
  color: #a1b842;
  /*font-size: 10px;*/
  font-weight: bold;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 5px;
}

</style>