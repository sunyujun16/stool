<template>
  <div class="item-div" id="todoItem"
       @mouseover="setInRange"
       @mouseout="setOutRange">
    <img src="@/assets/img/priscilla-du-preez-6tCiSN8LX7w-unsplash.jpg"
         alt="nan"
         :class="itemImageClass"
    />
    <span class="itemText"  style="top: -245px" @click="pushToTodoList">TodoList</span>
  </div>
</template>

<script>
import {itemImgMix} from "@/mixins/itemImgFuncMixin";

export default {
  name: "TodoBoard",
  mixins: [itemImgMix,],
  methods: {
    pushToTodoList(){
      // todo 登录判断，这里应该用router的 全局守卫 才合适我觉得。不过算了，跳转比较少。

      this.$bus.$emit('jumpToTodoList')
    }
  }

}
</script>

<style scoped>
/*@import "/src/assets/css/itemBoard.css";*/

</style>