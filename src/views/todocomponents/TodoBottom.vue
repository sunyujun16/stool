<template>
  <div class="todo-footer" @mouseleave="hideWarning">
    <label  @mouseenter="showWarning" >
      <input type="checkbox" v-model="allSelected" ref="cbox"/>
      <!-- 已失败的操作：@click="selectAll()" -->
      <span>已完成{{ todosDoneCount }}</span>
      <span>/  全部{{ todos.length }}</span>
    </label>
    <button class="btn btn-danger" style="width: 100px; margin-left: 5px" @click="saveAndQuit">返回主界面</button>
    <button class="btn btn-danger" style="width: 120px" @click="deleteDoneTodos">清除已完成任务</button>
<!--    <br/>-->
    <span style="font-size: 10px; color: #e7a9a9" v-show="warn">请慎重全选，误操作不能撤销</span>
  </div>
</template>

<script>
export default {
  name: "TodoBottom",
  props: ['todos'],
  data() {
    return {
      // allSelected: false
      warn: false
    }
  },
  computed: {
    todosDoneCount: {
      get() {
        return this.todos.filter((todo) => todo.done === true).length
      },
      set(value) {
        // do nothing// return null;
      }
    },
    allSelected: {
      get() {
        return this.todos.filter(todo => todo.done !== true).length === 0
      },
      set(value) {
        this.$bus.$emit("fuck_setAllOrNeitherDone", value)
      }
    }
  },
  methods: {
    deleteDoneTodos() {
      if (confirm("确定清除所选项？"))
      // trigger del event one by one based on todos info.
      this.todos.forEach(todo => {
        todo.done ? this.$bus.$emit("fuck_delOneTodo", todo.id) : {}
      })
    },
    showWarning(){
      this.warn = true
    },
    hideWarning(){
      this.warn = false
    },
    saveAndQuit(){
      // if (confirm("宁确定要退出吗？"))
        this.$router.back()

    }
    // selectAll() {
    //   // send a boolean msg to App by trigger event
    //   this.$nextTick(()=> {
    //     this.$bus.$emit("fuck_setAllOrNeitherDone", this.allSelected)
    //     console.log(this,this.allSelected)
    //   })
    // }
  }

};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

span {
  margin-left: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 3px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 3px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
