<template>
  <ul class="todo-main">
    <transition-group name="todoA" appear>
      <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </transition-group>
  </ul>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props:['todos']
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
  max-height: 300px;
  overflow-y: scroll;
  /*overflow-x: hidden;*/
  /*float: left;*/
}

.todo-main::-webkit-scrollbar {
  display: none;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

.todoA-enter-active {
  animation: todoA 0.2s linear;
}
.todoA-leave-active {
  animation: todoA 0.1s linear reverse;
}

@keyframes todoA {
  from {
    opacity: 0;
    /*height: 1px;*/
  }
  to {
    opacity: 1;
    /*height: 100%;*/
  }

}

</style>