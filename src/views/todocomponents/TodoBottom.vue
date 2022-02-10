<template>
  <div class="todo-footer" @mouseleave="hideWarning">
    <label @mouseenter="showWarning">
      <input type="checkbox" v-model="allSelected" ref="cbox"/>
      <!-- 已失败的操作：@click="selectAll()" -->
      <span>已完成{{ todosDoneCount }}</span>
      <span>/  全部{{ todos.length }}</span>
      <span class="warn" v-show="warn">请慎重全选，误操作不能撤销</span>
    </label>
    <button class="btn btn-danger" style="width: 60px; margin-left: 5px" @click="saveAndQuit">退出</button>
    <button class="btn btn-danger" style="width: 60px; margin-left: 5px" @click="saveToServer">同步</button>
    <button class="btn btn-danger" style="width: 60px; margin-left: 5px" @click="withDraw">撤销</button>
    <button class="btn btn-danger" style="width: 100px" @click="deleteDoneTodos">删除选中项</button>
    <!--    <br/>-->

  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: "TodoBottom",
  props: ['todos'],
  mounted() {
    // 自动保存，先关掉
    // this.saveTimer = setInterval(() => {
    //   if (this.$store.state.globalOptions.login) { // 仅在登录状态下进行保存操作
    //     this.saveToServer()
    //     this.$message.success("自动保存")
    //   }
    // }, this.consts.SAVE_INTERVAL)

    // 上车
    this.$bus.$on("saveToServer", this.saveToServer)

  },
  beforeDestroy() {
    clearInterval(this.saveTimer)
    this.$bus.$off("saveToServer")
  },
  data() {
    return {
      // allSelected: false
      warn: false,
      saveTimer: null,
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
    showWarning() {
      this.warn = true
    },
    hideWarning() {
      this.warn = false
    },
    saveAndQuit() {
      if (confirm("宁确定要退出吗？")){
        this.saveToServer()
        this.$bus.$emit("jumpToMain")
      }
    },
    saveToServer() {
      // 判断是否登录
      if (!this.$store.state.globalOptions.login) {
        // 没登录，提醒
        this.$message({
          type: 'warning',
          message: '未登录，无需手动同步，数据将实时保存在本地。'
        })
      } else {
        let url = this.$store.state.todoOptions.todoHost + '/update_all';
        // 已登录，将数据发往后端，请求保存，策略由后端决定（此处为全部delete再重新insert)
        // this.$axios.post(url,
        //     {
        //       // 提供后端要求的参数，itemList和userID
        //       itemList: this.todos,
        //       userId: this.$store.state.globalOptions.userInfo.userId
        //     },
        //     {
        //       withCredential: true,
        //       // 不允许设置Cookie，草他妈的，啊啊啊啊啊啊啊！！！
        //       // headers: {
        //       //   Cookie: document.cookie.split(";")[0]
        //       // }
        //     }
        // ).then(
        //     response => {
        //       console.log(response.data)
        //     },
        //     error => {
        //       console.log(error)
        //     }
        // );

        // 添加user信息，避免离线添加的数据缺少username和userId
        // JS中，for in 取出来的是下标，基础不牢喽，奶奶的。
        this.todos.forEach(item => {
          if (!item.username || !item.userId) {
            console.log(item, '++++++', item.username, "----", item.userId)
            item.username = this.$store.state.globalOptions.userInfo.username
            item.userId = this.$store.state.globalOptions.userInfo.userId
          }
        })

        /*
        几点注意：
        1、contentType设置为json后，浏览器会先发送OPTIONS请求，所以后端的登录拦截器要放行一下
        2、JSON.stringify的使用是必须的
        3、跨域问题是后端解决的，前端只要保证请求带上cookie和参数即可。
        4、axios仍然不会携带cookie，不对它抱有幻想了，草他娘的。
         */
        $.ajax({
          type: "POST",
          url: url,
          data: JSON.stringify({
            itemList: this.todos,
            userId: this.$store.state.globalOptions.userInfo.userId
          }),
          dataType: 'json',
          contentType: 'application/json',
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function () {
            console.log("成功")
          },
          error: function () {
          }
        })


        // 以下代码有返回值，证明了只有POST请求无法携带cookies
        // this.$axios.get(url).then(
        //     response => {
        //       console.log(response.data)
        //     },
        //     error => {
        //       console.log(error)
        //     }
        // )

      }
    },
    withDraw() {
      this.$bus.$emit("justShitIt")
    }
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

.warn {
  /*position: inherit;*/
  position: fixed;
  font-size: 10px;
  color: #e58686;
  clear: both;
  margin-left: 10px;
  /*float: left;*/
}

.todo-footer label {
  /*display: inline;*/
  /*position: relative;*/
  margin-right: 3px;
  cursor: pointer;
  float: left;
}

.todo-footer label input {
  /*position: relative;*/
  /*top: -1px;*/
  vertical-align: middle;
  margin-right: 3px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
