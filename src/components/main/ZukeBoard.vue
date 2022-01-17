<template>
  <div class="item-div" id="zukeItem" @mouseout="setOutRange" @mouseover="setInRange">
    <img src="@/assets/img/annie-spratt-HwsRkHfSU60-unsplash (1).jpg" alt="nan"
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