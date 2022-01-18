<template>
  <div id="todoApp" style="max-width: 50%; margin-left: 25%">
    <todo-top/>
    <todo-list :todos="todos"/>
    <todo-bottom :todos="todos"/>
  </div>
</template>

<script>
import TodoList from "@/views/todocomponents/TodoList";
import TodoTop from "@/views/todocomponents/TodoTop";
import TodoBottom from "@/views/todocomponents/TodoBottom";

export default {
  name: "TodoApp",
  components: {
    TodoList, TodoTop, TodoBottom
  },
  data() {
    return {
      todos: [
        {id: "001", title: "0eat", done: false},
        {id: "002", title: "0sleep", done: false},
        {id: "003", title: "0fuck", done: true}
      ]
      // todos: JSON.parse(localStorage.getItem("todos")) || []
    }
  },
  methods: {
    addOneTodo(todo) {
      this.todos.unshift(todo) //{id: id, title: title, done:false}
    },
    delOneTodo(id) {
      // 先不用for循环写
      // for (const _todo in this.todos) {}
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    },
    whenCheckedChanged(id) {
      // 根据id将done状态取反
      this.todos.forEach((todo) => {
        if (todo.id === id)
          todo.done = !todo.done
      })
    },
    setAllOrNeitherDone(allDoneFlag) {
      // 根据参数，把所有todo的done修改为 true或FALSE
      this.todos.forEach(todo => todo.done = allDoneFlag)
    },
    updateTitleById(id, title) {
      this.todos.forEach(todo => {
        if (todo.id === id) todo.title = title
      })
    }
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        // if (!this.$store.state.globalOptions.login)
          localStorage.setItem('todos', JSON.stringify(value))
      }
    }
  },
  // 此时页面中呈现的DOM不是Vue的DOM，此时Vue的虚拟DOM还在后边摸鱼，没有转换成真实DOM
  beforeMount() {
    // 从localStorage中读取todos
    // let todos = localStorage.getItem('todos');
    // if (!todos) {
    //   todos = [
    //     {id: "001", title: "初始化事务", done: false},
    //   ]
    //   this.todos = todos
    //   return
    // }
    // this.todos = JSON.parse(todos)
    // console.log(this.todos)
    if (!this.$store.state.globalOptions.login) {
      // 未登录，提示一下
      this.$message({
        message: '建议注册登录后使用，否则数据只保存在本地磁盘，可能会被误清理',
        type: 'error',
        duration: 3500,
        showClose: true,
        center: true,
        offset: 200,
      })
      // 然后读取本地存储
      let parseTodos = JSON.parse(localStorage.getItem("todos"));
      this.todos = parseTodos ? parseTodos : []
      if (!parseTodos || parseTodos.length === 0)
        this.$message({
          message: '本地缓存为空',
          type: 'error',
          offset: 60,
        })
    } else {
      // 向stool服务端请求itemList数据
      let url = this.$store.state.todoOptions.todoHost + "/list-item";
      this.$axios.get(url).then(
          response => {
            this.todos = response.data
          },
          error => {
            alert("请求错误: " + error.message)
          }
      )
    }

  },
  mounted() {
    // 给总线绑定添加事件，和要触发的回调函数。
    this.$bus.$on("fuck_addOneTodo", this.addOneTodo);
    // 给总线绑定删除事件，和要触发的回调函数。
    this.$bus.$on("fuck_delOneTodo", this.delOneTodo);
    // 给总线绑定修改了Item的checked而触发的事件，和回调。
    this.$bus.$on("fuck_CheckedChanged", this.whenCheckedChanged);
    // 绑定全选事件，和回调
    this.$bus.$on("fuck_setAllOrNeitherDone", this.setAllOrNeitherDone)
    this.$bus.$on("fuck_updateTitleById", this.updateTitleById)
  },
  beforeDestroy() {
    // 把todo写入localStorage，不知道为啥，在这个生命周期无法做这样的事情
    // localStorage.setItem('todos', JSON.stringify(this.todos))
    // console.log("会不会出来呢？")
    this.$bus.$off("fuck_addOneTodo");
    this.$bus.$off("fuck_delOneTodo");
    this.$bus.$off("fuck_CheckedChanged");
    this.$bus.$off("fuck_setAllOrNeitherDone")
    this.$bus.$off("fuck_updateTitleById")
  }
};
</script>

<style scoped>
/*base*/
body {
  background: #fff;
}

#todoApp {
  /*width: 600px;*/
  /*margin-left: 50px;*/
  /*margin-top: 50px;*/
  /*position: relative;*/
  /*background-color: rgba(0,0,0,0.5);*/
}

#todoApp::-webkit-scrollbar {
  display: none;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 560px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #45b2d9;
  border: 1px solid #065c77;
  margin-right: 5px;
}

.btn-danger:hover {
  color: #f1d8d8;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  /*width: 600px;*/
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>