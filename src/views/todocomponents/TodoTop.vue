<template>
  <div class="todo-header">
    <label @mouseover="showAddBtn = true" @mouseout="showAddBtn = false">
      <input
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
          @keyup.enter="sendTodo"
          v-model="input_value"/>
      <button @click="sendTodo" v-show="showAddBtn" style="margin-left: 5px">添加</button>
    </label>
  </div>
</template>

<script>
import {nanoid} from 'nanoid';
import consts from "@/consts/consts.json" // 我特么居然猜出来了，哈哈哈哈

export default {
  name: "TodoTop",
  data() {
    return {
      input_value: "",
      showAddBtn: false,
    }
  },
  methods: {
    sendTodo() {
      this.showAddBtn = false
      if (!this.input_value.trim().length > 0) return alert("输入不能为空")
      // create new to-do obj
      const todoObj = {
        id: nanoid(consts.NANO_SIZE),
        username: this.$store.state.globalOptions.userInfo.username,
        userId: this.$store.state.globalOptions.userInfo.userId,
        title: this.input_value,
        done: false
      };
      console.log(todoObj.id, this.input_value)
      // 触发总线事件，给APP发送todoObj
      this.$bus.$emit("fuck_addOneTodo", todoObj);
      this.input_value = ""
    },
    hideAddBtn() {
      let _this = this
      setTimeout(() => {
        _this.showAddBtn = false
      }, 20)
    }
  }
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 80%;
  margin-left: 10px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;

}

.todo-header {
  width: auto;
  text-align: left;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}


</style>