<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @click="triggerCheckedChanged"/> <!-- done_todo 修改回调-->
      <span v-show="!onEdit">{{ todo.title }}</span>
      <input type="text" v-model="editValue" v-show="onEdit" ref="editBox" @blur="confirmEdit(editValue)">
    </label>
    <button class="btn btn-danger" @click="deleteItem">删除</button>
    <button class="btn btn-edit" @click="updateItem">编辑</button>
    <span class="time-span">
      {{ new Date(todo.createTime).toLocaleString().replace('上午', 'AM ').replace('下午', 'PM ') }}
    </span>
  </li>

</template>

<script>
export default {
  name: "TodoItem",
  props: ['todo'],
  data() {
    return {
      editValue: "",
      onEdit: false
    }
  },
  methods: {
    deleteItem() {
      console.log(this.todo.id)
      // if (confirm("确定要删除？不带后悔的奥。"))
      // 触发删除事件
      this.$bus.$emit("fuck_delOneTodo", this.todo.id)
    },
    triggerCheckedChanged() {
      // 触发对应名称的事件
      this.$bus.$emit("fuck_CheckedChanged", this.todo.id)
    },
    updateItem() {
      // 进入编辑模式，首先修改显示和隐藏的标签
      this.onEdit = true
      // 然后设置input里面要显示的内容
      this.editValue = this.todo.title
      // 然后获取焦点，注意！！！此时还未解析模板，所以要使用$nextTick
      this.$nextTick(() => {
        this.$refs.editBox.focus()
      })
    },
    confirmEdit(editValue) {
      // get value and send it to App to update real todo_info
      // so we need to trigger an event that can get it done which is fuck_updateTitleById.
      this.$bus.$emit("fuck_updateTitleById", this.todo.id, editValue)
      // 别忘了修改一下要显示和隐藏的内容
      this.onEdit = false
    }
  },
  mounted() {


  },
  beforeDestroy() {

  }

};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

span {
  margin-left: 5px;
  font-size: 14px;
}

.time-span {
  float: right;
  margin-right: 15px;
  font-size: 14px;
}

/*li input {*/
/*  width: 560px;*/
/*}*/

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  width: 60px;
  float: right;
  /*display: none;*/
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>