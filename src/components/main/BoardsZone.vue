<template>
  <div>
    <TodoBoard/>
    <ZukeBoard/>
    <BlogBoard/>
  </div>
</template>

<script>
import TodoBoard from "@/components/main/TodoBoard";
import ZukeBoard from "@/components/main/ZukeBoard";
import BlogBoard from "@/components/main/BlogBoard";

export default {
  name: "BoardsZone",
  components: {BlogBoard, ZukeBoard, TodoBoard,},
}
</script>

<style scoped>
@import "../../../src/assets/css/itemBoard.css";


</style>