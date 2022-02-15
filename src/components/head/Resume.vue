<template>
  <div class="global-resume">
    <!--  <div style="color: red">-->
    <!--    编写中-->
    <!--  </div>-->
    <div style="height: 30px"></div>
    <div class="resume resume-left">
      <img src="@/assets/resume/jukan-tateisi-bJhT_8nbUA0-unsplash-s.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">1994年</b>，Hello world。</span>
      </div>
      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>

    <div class="resume resume-right">
      <img src="@/assets/resume/hit-main.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">2010年</b>，考入哈尔滨工业大学<br/>土木工程专业。</span>
      </div>
      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>

    <div class="resume resume-left">
      <img src="@/assets/resume/IMG_20160325_181629.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">2014年</b>，毕业，入职中建八局。</span>
      </div>
      <div class="clear-float"></div>
<!--      <img src="@/assets/resume/der2.jpg" alt="born.jpg" style="margin-top: 20px">-->
<!--      <div class="clear-float"></div>-->
      <el-divider></el-divider>
    </div>

    <div class="resume resume-right">
      <img src="@/assets/resume/long-river.jpg" alt="born.jpg">
      <div class="resume-description">
        <span><b style="font-size: 20px">2020年</b>，裸辞，自学编程。</span>
      </div>
      <div class="clear-float"></div>

<!--      <img src="@/assets/resume/7e27af3a5b03a38d371110baf6f5767.jpg" alt="born.jpg" style="margin-top: 10px">-->
<!--      <div class="clear-float"></div>-->
      <el-divider></el-divider>
    </div>

    <div class="resume resume-left">
      <img src="@/assets/resume/screen.jpg" alt="born.jpg" style="margin-top: 10px">
      <div class="resume-description">
        <span><b style="font-size: 20px">至今</b>，自学了Python，C，Java，<br/>以及前端基础 + Vue。</span>
      </div>
      <div class="clear-float"></div>

      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>


    <div class="resume resume-right">
      <img src="@/assets/resume/thin.jpg" alt="born.jpg">
      <div class="resume-description"  style="text-align: left">
        <span><b style="font-size: 20px">2021年</b>，减重30斤，戒烟成功。<br/>
          </span>
      </div>
      <div class="clear-float"></div>

      <!--      <img src="@/assets/resume/7e27af3a5b03a38d371110baf6f5767.jpg" alt="born.jpg" style="margin-top: 10px">-->
      <!--      <div class="clear-float"></div>-->
      <el-divider></el-divider>
    </div>

    <div class="resume resume-left">
      <img src="@/assets/resume/run23plus.jpg" alt="run23plus.jpg" style="margin-top: 10px">
      <div class="resume-description">
        <span><b style="font-size: 20px">同年</b>，成为一名“跑者”<br/>目前跑量400km。</span>
      </div>
      <div class="clear-float"></div>

      <div class="clear-float"></div>
      <el-divider></el-divider>
    </div>


    <div class="resume resume-right">
      <img src="@/assets/resume/jon-tyson-sMHVg2KBkLc-unsplash.jpg" alt="pro.jpg">
      <div class="resume-description"  style="text-align: left">
        <span><b style="font-size: 20px">2022年 任务</b>1：正式开启程序员生涯。</span>
      </div>
      <div class="clear-float"></div>

      <!--      <img src="@/assets/resume/7e27af3a5b03a38d371110baf6f5767.jpg" alt="born.jpg" style="margin-top: 10px">-->
      <!--      <div class="clear-float"></div>-->
      <el-divider></el-divider>
    </div>

    <div class="resume resume-left">
      <img src="@/assets/resume/marathon.jpg" alt="marathon.jpg" style="margin-top: 10px">
      <div class="resume-description">
        <span><b style="font-size: 20px">2022年 任务</b>2：用145以内的成绩完赛一场半马。</span>
      </div>
      <div class="clear-float"></div>

      <div class="clear-float"></div>
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