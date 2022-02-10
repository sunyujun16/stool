<template>
  <div>
    <!--    <el-button type="text" @click="TAB_DIALOGFORMVISIBLE_LOGIN(true)">打开嵌套表单的 Dialog</el-button>-->
    <!--    弹出框-登录， 注意store里面的dialogFormVisible不能直接用，需要经过computed来配置get和set方法-->
    <el-dialog title="请填写登录信息"
               :visible.sync="dialogFormVisible_local"
               :modal="false"
               width="30%"
               :top="'20vh'"
               :custom-class="'myDialog'"
               @open="onOpen">
      <!--注意ref属性和v-model保持一致-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import md5 from 'js-md5';

export default {
  name: "LoginBox",
  data() {
    // callback不会停止方法运行, 但是貌似callback只生效一次
    var checkName = (rule, userName, callback) => {
      // if (this.consts.CONSOLE) console.log(userName + " ------ Name校验开始 ------")
      // if (this.consts.CONSOLE) console.log(md5(this.ruleForm.pass));
      if (!userName) {
        // if (this.consts.CONSOLE) console.log(" @callback执行前。。。");
        callback(new Error('用户名不能为空噻'));
        // debugger
        callback(new Error('用户名不能为空噻2333333'));
        // if (this.consts.CONSOLE) console.log(" @callback执行后 - - -")
        // return false
      }
      setTimeout(() => {
        if (userName.length > 16) {
          callback(new Error('用户名过长'));
          // if (this.consts.CONSOLE) console.log("~用户名过长触发~")
        }
        // 正则表达式判断字符合法性
        if (!userName.match(/^[\u4E00-\u9FA5\uF900-\uFA2D|\w]{2,20}$/)) {
          callback(new Error('请使用中文、字母、数字和下划线的组合'))
          // if (this.consts.CONSOLE) console.log("~非法字符触发~");
        }
      }, 200);
      // if (this.consts.CONSOLE) console.log('用户名校验成功')
      callback();
    };
    var validatePass = (rule, pwd, callback) => {
      // if (this.consts.CONSOLE) console.log(pwd + " ------ pass01开始校验 ------")
      if (pwd === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          // if (this.consts.CONSOLE) console.log(pwd + " ------ pass01底层验证1 ------")
          this.$refs.ruleForm.validateField('checkPass');
          // if (this.consts.CONSOLE) console.log(pwd + " ------ pass01底层验证2 ------")
        }
        // callback();
      }
      // 正则解释：密码>=6位，必须包含数字大写小写和特殊字符.?=是积极正向匹配，各分组仅作为判断条件而不占位。并没有顺序。
      // if (!pass.match(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/))
      // if (!pwd.match(/^.{6,}$/)) {
      //   callback(new Error("密码最少6位"))
      // }

      // if (this.consts.CONSOLE) console.log('密码1校验通过')
      callback(); // 必须调用，否则回不到validata()方法.
    };
    var validatePass2 = (rule, pwd2, callback) => {
      // console.log(pwd2 + " ------ pass02 ------")
      if (pwd2 === '') {
        callback(new Error('请再次输入密码'));
      } else if (pwd2 !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        // if (this.consts.CONSOLE) console.log('密码2校验通过')
        callback();
      }

    };
    return {
      formLabelWidth: '80px',
      ruleForm: {
        pass: '0',
        checkPass: '',
        userName: 'sun'
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        userName: [
          {validator: checkName, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapState("headOptions", {dialogFormVisible: 'dialogFormVisible_login'}),
    ...mapState("globalOptions", ['login', 'userInfo']),
    // 用表单注意这，不能图省事，必须写set方法
    dialogFormVisible_local: {
      get() {
        return this.$store.state.headOptions.dialogFormVisible_login
      },
      set(bool) {
        this.TAB_DIALOGFORMVISIBLE_LOGIN(bool);
      }
    },
  },
  methods: {
    ...mapMutations("headOptions", ['TAB_DIALOGFORMVISIBLE_LOGIN']),
    ...mapMutations("globalOptions", ['SET_USER_INFO', 'CLEAR_USER_INFO', 'LOGIN','SET_SESSIONID']),
    onOpen() {
      // 修改登录界面的主题颜色等。放弃了，bug太多，还不如自己写。
      // this.customDialogStyle();
    },
    submitForm(formName) {
      // valid的来源 --- 它是一个布尔值，取决于上面定义的rules指定的方法是否全部通过而没有发生callback（Error）
      this.$refs[formName].validate((valid) => {
        if (this.consts.CONSOLE) console.log("验证结果：valid = ", valid)
        if (valid) {
          let url = this.$store.state.todoOptions.todoHost + '/login';
          if (this.consts.CONSOLE) console.log("开始发送请求：", url)
          this.sendLogin(url)
        } else {
          if (this.consts.CONSOLE) console.log('error submit!!');
          this.$message({
            customClass: 'noticeMsg',
            message: '提交失败',
            type: 'error',
          }) // 样式在main.js引入
          return false;
        }
      });
    },
    sendLogin(url) {
      // 发送axios请求/POST,访问登录页，返回一个user对象
      this.$axios.post(url,
          {
            username: this.ruleForm.userName,
            password: md5(this.ruleForm.pass),
          }
      ).then(response => {
        if (this.consts.CONSOLE) console.log("登录成功，状态码：" + response.status)
        // 修改对应login状态的state
        this.LOGIN(true);
        // 设置全局用户信息。
        this.SET_USER_INFO({
          username: response.data.username,
          userId: response.data.id,
          privilege: response.data.privilege,
          avatar_url: ''
        });
        // 存储用户信息到sessionStorage当中
        sessionStorage.setItem("userInfo", JSON.stringify(this.$store.state.globalOptions.userInfo));

        // 退出登录窗口
        this.TAB_DIALOGFORMVISIBLE_LOGIN(false);
        // 刷新页面
        this.refreshComponent();
      }).catch(error => {
        alert("登录失败，错误码: " + error.status + "，错误信息: " + error.message)
      })
    },
    /**
     * 跳转到blank再回来，实现刷新（触发当前页面的beforeMounted钩子）
     * */
    refreshComponent(){
      // this.$router.go(0); // 不行，state会被刷新掉，除非保存到localStorage或sessionStorage
      // this.$router.push("/blank") // 可行，在blank中跟下面的方式一样，配置两个钩子再次跳转即可
      this.$bus.$emit("jumpToBlank")
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /** @deprecated 真sb，浪费感情，艹，组件真的不能瞎jb改*/
    customDialogStyle() {
      let el_dialogs = document.getElementsByClassName("el-dialog");
      let el_dialog_titles = document.getElementsByClassName("el-dialog__title");
      let el_dialog_form_labels = document.getElementsByClassName("el-form-item__label");
      let el_dialog_form_inputs = document.getElementsByClassName("el-input");
      let el_dialog_form_input_inners = document.getElementsByClassName("el-input__inner");

      let dialog = el_dialogs[el_dialogs.length - 1];
      let titleElement = el_dialog_titles[el_dialog_titles.length - 1];

      dialog.style.border = '1px solid rgba(204, 196, 153, 0.5)'
      dialog.style.background = 'rgba(1,1,1,0.9)';
      titleElement.style.color = '#ccc499';
      for (let i = 0; i < el_dialog_form_labels.length; i++) {
        el_dialog_form_labels[i].style.color = '#ccc499';
      }
      for (let i = 0; i < el_dialog_form_inputs.length; i++) {
        el_dialog_form_inputs[i].style.border = "0px solid rgba(204, 196, 153, 0.5)";
        el_dialog_form_input_inners[i].style.border = "1px solid rgba(204, 196, 153, 0.5)";
        el_dialog_form_input_inners[i].style.background = 'rgba(1,1,1,0.8)';
        el_dialog_form_input_inners[i].style.color = 'white';
      }
    }
  }

}
</script>

<style scoped>
.el-input {
  width: 90%;
  float: left;
}

.el-dialog__wrapper {
  background-color: rgba(1, 1, 1, 0.3);
}

/*对登录框的修改果然不管用，还得操作DOM*/
.el-dialog {
  background: #807e3f;
}

/*不过修改提交button还是生效滴，放弃修改，bug太多*/
/*.el-button--primary {*/
/*  background-color: #ccc499;*/
/*  border: 1px solid #ccc499;*/
/*  color: white;*/
/*  !*text-shadow:  1px 1px 1px #000000;*!*/
/*}*/
/*.el-button--primary:hover {*/
/*  background-color: #bbb388;*/
/*  border: 1px solid #bbb388;*/
/*}*/
/*.el-button--primary:out-of-range {*/
/*  background-color: #ccc499;*/
/*  border: 1px solid #ccc499;*/
/*}*/


</style>