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
        {id: "001", title: "eat", done: false},
        {id: "002", title: "sleep", done: false},
        {id: "003", title: "fuck", done: true}
      ],
      // todos: JSON.parse(localStorage.getItem("todos")) || [],
      // 用于用户的撤销动作。顾名思义，是一个类似栈的数组。
      historyStack: [],
      // stackPointer: 0, // 栈指针...唔，不需要这样，只操作栈顶即可
      onWithDraw: false,
      lastIsWithDraw: false,
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
    },
    unshiftIntoStack(todosSnap) {
      // 把当前的todos保存到栈中
      this.historyStack.unshift(todosSnap);
      // 最多保存10个，多了就从栈底删除
      if (this.historyStack.length > 10) this.historyStack.pop()
    },
    shiftFromStack() {
      if (this.consts.CONSOLE) console.log("shit ~")
      // 告诉watch 我在执行撤销，这次就不要执行添加stack了。
      this.onWithDraw = true;
      // 判断最近一次操作是不是撤销
      if (!this.lastIsWithDraw) { // 如果不是，先弹出与当前状态一样的todos
        this.historyStack.shift()
        this.lastIsWithDraw = true;
      }
      // 弹出栈中的第1个元素，即栈顶元素，赋值给todos
      if (this.historyStack.length > 0) this.todos = JSON.parse(this.historyStack.shift());
      // if (this.consts.CONSOLE) console.log(this.todos)
      // if (this.consts.CONSOLE) console.log(this.historyStack[0] === this.historyStack[1])
      // 当length榨干到0的时候，保留当前状态, 以保证不丢失状态。这步使得length永远大于0
      if (this.historyStack.length === 0) {
        this.unshiftIntoStack(JSON.stringify(this.todos))
        // product版本干脆不提示，以免影响用户观感
        this.$message({
          type: "warning",
          message: "没有更多操作记录",
          duration: 1000,
        })
        // 这句没用了，因为todos一定会修改
        // this.onWithDraw = false; // 归零之后不会再修改todos所以这里要set一下，否则一旦归零导致onWithDraw还是true，stack不会添东西。
      }
      // if (this.consts.CONSOLE) console.log("set false ~")
      // 不在这里设置FALSE，因为watch是在此后执行的，如果在此设置为false，那就完全是脱了裤子放屁
      // this.onWithDraw = false;
    },
    isListEqual(localList, serverList) {
      let length = localList.length;

      for (let i = 0; i < length; i++) {
        let localItem = localList[i];
        let serverItem = serverList[i];

        let localProps = Object.getOwnPropertyNames(localItem);
        let serverProps = Object.getOwnPropertyNames(serverItem);

        if (localProps.length !== serverProps.length) {
          return false;
        }

        for (let j = 0; j < localProps.length; j++) {
          let propName = localProps[j];
          if (localItem[propName] !== serverItem[propName]) {
            return false
          }
        }
      }

      return true;
    }
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        if (this.consts.CONSOLE) console.log("监测到todos变化...同步到本地")
        // 每次修改都更新localStorage, 拼接用户名来区分，避免item的ID值冲突。
        let username = this.$store.state.globalOptions.userInfo.username;
        localStorage.setItem(username ? username : ''  + 'todos', JSON.stringify(value));
        // 判断是不是正在撤销，如果不是，添加stack
        if (!this.onWithDraw) {
          // 保存当前快照到撤回栈顶，以供撤回
          this.unshiftIntoStack(JSON.stringify(this.todos));
          // 设置最近操作不是撤回，这句代码放在这里的逻辑本质是：在unshift发生处，立flag，表明刚塞进去一个，还热乎，还多余。
          this.lastIsWithDraw = false;
          // if (this.consts.CONSOLE) console.log("压栈 ~", this.historyStack)
        } else {
          // 是撤回，通过以下两个布尔值，设置最近一次操作类型为撤回，并终止撤回操作的工作状态。
          // this.lastIsWithDraw = true; // 不需要，因为走到这儿说明刚刚经过shift函数。
          this.onWithDraw = false
        }
      }
    }
  },
  // 此时页面中呈现的DOM不是Vue的DOM，此时Vue的虚拟DOM还在后边摸鱼，没有转换成真实DOM
  beforeMount() {
    // 立flag，进入todoAPP
    this.$store.commit('globalOptions/ENTER_TODO_APP')

    if (!this.$store.state.globalOptions.login) {
      // 未登录，首先提示一下
      this.$message({
        message: '建议注册登录后使用，否则数据只保留在本地，可能误删',
        type: 'warning',
        duration: 4000,
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
          type: 'warning',
          offset: 60,
        })
    } else {
      let username = this.$store.state.globalOptions.userInfo.username;
      let userId = this.$store.state.globalOptions.userInfo.userId;
      // 已登录，先向stool服务端请求itemList数据，并且拿到localStorage。
      let url = this.$store.state.todoOptions.todoHost + "/list-item?userId=" + userId;
      this.$axios.get(url).then(
          response => {
            // 分别获取本地和服务器的数据，以便比较。
            if (this.consts.CONSOLE) console.log('username: ',username)
            let localTodos = JSON.parse(localStorage.getItem((username + "todos")));
            let serverTodos = response.data;
            // 分类讨论:
            if (!localTodos || localTodos.length === 0) {
              // 一、local为空，则直接读取服务器数据
              if (this.consts.CONSOLE) console.log('local存储为空，读取服务器数据')
              this.todos = serverTodos;
            } else if (!serverTodos || serverTodos.length === 0) {
              // 二、local非空，但服务器为空，以local为准, todo 但要判断用户名
              this.todos = localTodos;
            } else {
              if (this.isListEqual(localTodos, serverTodos)) {
                // 三、local和服务器均不空，且一致，服务器数据直接保存
                this.todos = serverTodos;
              } else {
                // 四、local和服务器均不空，且不一致，confirm，让用户进行选择。
                if (confirm("本地和服务器数据不一致，是否用本地覆盖云端？选否则用云端覆盖本地")) {
                  this.todos = localTodos;
                } else {
                  this.todos = serverTodos;
                  // 至此，todos数据建立完成，可以进行增删改查了。
                }
              }
            }
          },
          error => {
            // alert("请求错误: " + error)
            this.$message({
              type: "error",
              message: "未登录，获取用户信息失败"
            })
            if (this.consts.CONSOLE) console.log(error)
          }
      )
    }
  },
  mounted() {
    // 绑定ctrl-z 快捷键。
    let _this = this;
    document.onkeydown = function (event) {
      // console.log(event.key)
      if (event.key === 'z' && event.ctrlKey) {
        _this.shiftFromStack();
      }
    };
    // 给总线绑定添加事件，和要触发的回调函数。
    this.$bus.$on("fuck_addOneTodo", this.addOneTodo);
    // 给总线绑定删除事件，和要触发的回调函数。
    this.$bus.$on("fuck_delOneTodo", this.delOneTodo);
    // 给总线绑定修改了Item的checked而触发的事件，和回调。
    this.$bus.$on("fuck_CheckedChanged", this.whenCheckedChanged);
    // 绑定全选事件，和回调
    this.$bus.$on("fuck_setAllOrNeitherDone", this.setAllOrNeitherDone)
    this.$bus.$on("fuck_updateTitleById", this.updateTitleById)
    this.$bus.$on("justShitIt", this.shiftFromStack)
  },
  beforeDestroy() {
    this.$store.commit('globalOptions/LEAVE_TODO_APP')
    this.historyStack = [];
    // 把todo写入localStorage，不知道为啥，在这个生命周期无法做这样的事情
    // localStorage.setItem('todos', JSON.stringify(this.todos))
    // console.log("会不会出来呢？")
    this.$bus.$off("fuck_addOneTodo");
    this.$bus.$off("fuck_delOneTodo");
    this.$bus.$off("fuck_CheckedChanged");
    this.$bus.$off("fuck_setAllOrNeitherDone")
    this.$bus.$off("fuck_updateTitleById")
    this.$bus.$off("justShitIt")
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
  height: 400px;
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