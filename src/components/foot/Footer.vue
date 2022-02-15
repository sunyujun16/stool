<template>
  <el-footer class="hf-bgcolor" height="60px">
    <div style="width:100%; margin:0 auto; padding:0 0; color:#939393; text-align:center; font-size: 8px">
      <a href="https://beian.miit.gov.cn/" target="_blank"  style="color:#939393">网站备案号:&nbsp;黑ICP备2021011946号</a>
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002016165"
         style="display:inline-block;text-decoration:none;height:10px;line-height:10px;">
        <img src="http://alifile.sunyujun.com/stool_base/basic/beian.png" style="margin: 0 0 0 5px; height: 10px; width:10px" alt="nan"/>
        <span style="margin: 0 0 0 0; color:#939393;">浙公网安备 33011002016165号</span>
      </a>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.el-footer {
  color: rgb(204, 220, 184);
  height: 100px;
  line-height: 60px;
  text-align: center;
  position: fixed;
  bottom: 0;
  float: bottom;
  width: 100%;
  border: 0 solid ;
  /*border-top:1px solid rgba(68, 153, 153, 0.2);*/
  border-top:1px solid rgba(204,196,153,0.5);
}

</style>