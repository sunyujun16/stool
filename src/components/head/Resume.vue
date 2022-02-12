<template>
  <div class="global-resume">
    <!--  <div style="color: red">-->
    <!--    编写中-->
    <!--  </div>-->
    <div class="resume resume-left">
      <img src="@/assets/resume/jukan-tateisi-bJhT_8nbUA0-unsplash-s.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">1994年</b>，在一个北方的乡村，呱呱坠地，人生开启</span>
      </div>
      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>

    <div class="resume resume-right">
      <img src="@/assets/resume/hit-main.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">2010年</b>，幸运考入哈尔滨工业大学，<br/>土木工程专业</span>
      </div>
      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>

    <div class="resume resume-left">
      <img src="@/assets/resume/IMG_20160325_181629.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">2014年</b>，“惊险”毕业，入职中国建筑第八工程局</span>
      </div>
      <div class="clear-float"></div>
      <img src="@/assets/resume/der2.jpg" alt="born.jpg" style="margin-top: 20px">
      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>

    <div class="resume resume-right">
      <img src="@/assets/resume/long-river.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">2020年</b>，裸辞，开始自学编程</span>
      </div>
      <div class="clear-float"></div>

<!--      <img src="@/assets/resume/7e27af3a5b03a38d371110baf6f5767.jpg" alt="born.jpg" style="margin-top: 10px">-->
<!--      <div class="clear-float"></div>-->
      <el-divider></el-divider>
    </div>

    <div class="resume resume-left">
      <img src="@/assets/resume/screen.jpg" alt="born.jpg" style="margin-top: 10px">
      <div class="resume-description">
        <span><b style="font-size: 20px">此间</b>，自学了Python，C，Java，<br/>HTML、CSS、JS + Vue等。</span>
      </div>
      <div class="clear-float"></div>

      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>


    <div class="resume resume-right">
      <img src="@/assets/resume/thin.jpg" alt="born.jpg">
      <div class="resume-description">
        <span>然而，<b style="font-size: 20px">收获</b>远不止于此——在自学期间，成功减重30斤，戒掉了香烟，养成了跑步的习惯，厨艺也日渐精湛，对人生的态度也发生了转变。</span>
      </div>
      <div class="clear-float"></div>

      <!--      <img src="@/assets/resume/7e27af3a5b03a38d371110baf6f5767.jpg" alt="born.jpg" style="margin-top: 10px">-->
      <!--      <div class="clear-float"></div>-->
      <el-divider></el-divider>
    </div>

  </div>
</template>

<script>
export default {
  name: "Resume"
}
</script>

<style scoped>
.global-resume::-webkit-scrollbar {
  display: none;
}

.resume-left img {
  width: 42%;
  position: relative;
  float: left;
  margin-left: 20px;
}

.resume-left .resume-description {
  /*display: inline-block;*/
  width: 40%;
  position: relative;
  float: left;
  /*line-height: 20px;*/
  margin: 10px 20px 0 40px;
  padding-top: 10px;
  /*margin-left: 50%;*/
}

.resume-right img {
  width: 42%;
  position: relative;
  float: right;
  margin-right: 20px;
}

.resume-right .resume-description {
  width: 40%;
  /*display: inline-block;*/
  position: relative;
  float: right;
  /*line-height: 24px;*/
  margin: 10px 40px 0 20px;
  padding-top: 10px;
}

.resume .clear-float {
  clear: both;
}

.resume {
  /*text-align: left;*/
  line-height: 24px;
  padding-right: 20px;
}

.el-divider {
  margin: 40px 0 40px 10px;
  clear: both;
  background-color: rgba(204, 196, 153, 0.15);
  height: 1px;
}


</style>