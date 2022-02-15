<template>
  <div class="item-div" id="zukeItem" @mouseout="setOutRange" @mouseover="setInRange">
    <img src="http://alifile.sunyujun.com/stool_base/basic/annie-spratt-HwsRkHfSU60-unsplash%20%281%29.jpg" alt="nan"
         :class="itemImageClass"/>
    <span class="itemText" @click="note">ZukeSay</span>
  </div>
</template>

<script>
import {itemImgMix} from "@/mixins/itemImgFuncMixin";

export default {
  name: "ZukeBoard",
  mixins: [itemImgMix,],
  methods: {
    note(){
      alert('本模块正在开发~');
    }
  }
}
</script>

<style scoped>
/*@import "../../../src/assets/css/itemBoard.css";*/

</style>