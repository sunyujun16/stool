<template>
  <div class="item-div" id="todoItem"
       @mouseover="setInRange"
       @mouseout="setOutRange" @click="pushToTodoList">
    <img src="http://alifile.sunyujun.com/stool_base/basic/priscilla-du-preez-6tCiSN8LX7w-unsplash.jpg"
         alt="nan"
         :class="itemImageClass"
    />
    <span class="itemText"  style="top: -245px" >TodoList</span>
  </div>
</template>

<script>
import {itemImgMix} from "@/mixins/itemImgFuncMixin";

export default {
  name: "TodoBoard",
  mixins: [itemImgMix,],
  methods: {
    pushToTodoList(){
      this.setOutRange()
      this.$bus.$emit('jumpToTodoList')
    }
  }

}
</script>

<style scoped>
/*@import "/src/assets/css/itemBoard.css";*/



</style>