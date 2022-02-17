<template>
  <div class="item-div"
       @mouseover="setInRange"
       @mouseout="setOutRange"
       @click="note">
    <img src="http://alifile.sunyujun.com/stool_base/basic/dariusz-sankowski-mj2NwYH3wBA-unsplash-s-der.jpg"
         alt="nan"
         :class="itemImageClass"
    />
    <span class="itemText" style="top: -230px">SunBlog</span>
  </div>
</template>

<script>
import {itemImgMix} from "@/mixins/itemImgFuncMixin";

export default {
  name: "BlogBoard",
  mixins: [itemImgMix,],
  methods: {
    note(){
      alert('本模块尚未开发~');
    }
  }
}
</script>

<style scoped>
/*@import "/src/assets/css/itemBoard.css";*/

</style>