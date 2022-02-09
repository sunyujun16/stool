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
    // this.saveTimer = setInterval(this.saveToServer, this.consts.SAVE_INTERVAL)
    // this.saveTimer = setInterval(() => {
    //   if (this.$store.state.globalOptions.login) { // 仅在登录状态下进行保存操作
    //     this.saveToServer()
    //     this.$message.success("自动保存")
    //   }
    // }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.saveTimer)
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
      if (confirm("宁确定要退出吗？"))
        this.$bus.$emit("jumpToMain")
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

        $.ajax({
          type: "POST",
          url: url,
          dataType: 'jsonp',
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success:function(){
            console.log("成功")
          },
          error:function(){
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
