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
    >
      <!--      注意ref属性和v-model保持一致-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
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
  name: "RegisterBox",
  data() {
    var checkName = (rule, userName, callback) => {
      if (this.consts.CONSOLE) console.log(userName + " ------ Name校验开始 ------")
      if (!userName) {
        callback(new Error('用户名不能为空噻'));
      }
      setTimeout(() => {
        if (userName.length > 16) {
          callback(new Error('用户名过长'));
          if (this.consts.CONSOLE) console.log("~用户名过长触发~")
        }
        // 正则表达式判断字符合法性
        if (!userName.match(/^[\u4E00-\u9FA5\uF900-\uFA2D|\w]{2,20}$/)) {
          callback(new Error('请使用中文、字母、数字和下划线的组合'))
          if (this.consts.CONSOLE) console.log("~非法字符触发~");
        }
        // TODO 做判断，向后端发请求检查用户名是否冲突，不需要拦截的路径/find_duplicate，后端需要放行（这里会不会有安全漏洞呢？）。

      }, 200);
      if (this.consts.CONSOLE) console.log('用户名校验结束。')
      callback();
    };
    var validatePass = (rule, pwd, callback) => {
      if (this.consts.CONSOLE) console.log(pwd + " ------ pass01开始校验 ------")
      if (pwd === '') {
        callback(new Error('请输入密码'));
      }
          // else if (this.ruleForm.checkPass !== '') {
          //     if (this.consts.CONSOLE) console.log(pwd + " ------ pass01底层验证1 ------")
          //     this.$refs.ruleForm.validateField('checkPass');
          //     if (this.consts.CONSOLE) console.log(pwd + " ------ pass01底层验证2 ------")
          //   callback();
      // }
      else {
        if (this.consts.CONSOLE) console.log('密码1校验结束')
        callback(); // 必须调用，否则回不到validata()方法.
      }

    };
    var validatePass2 = (rule, pwd2, callback) => {
      console.log(pwd2 + " ------ pass02 ------")
      if (pwd2 === '') {
        callback(new Error('请再次输入密码'));
      } else if (pwd2 !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        if (this.consts.CONSOLE) console.log('密码2校验通过')
        callback();
      }

    };
    return {
      formLabelWidth: '80px',
      ruleForm: {
        pass: '',
        checkPass: '',
        userName: ''
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
    ...mapState("headOptions", {dialogFormVisible: 'dialogFormVisible_register'}),
    // 用表单注意这，不能图省事，必须写set方法
    dialogFormVisible_local: {
      get() {
        return this.$store.state.headOptions.dialogFormVisible_register
      },
      set(bool) {
        this.TAB_DIALOGFORMVISIBLE_REGISTER(bool);
      }
    },
  },
  methods: {
    ...mapMutations("headOptions", ['TAB_DIALOGFORMVISIBLE_REGISTER']), // header中控制
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (this.consts.CONSOLE) console.log("验证结果 *********** ：", valid)
        if (valid) {
          // alert('submit!');
          let url = this.$store.state.zukeOptions.zukeHost + '/register';
          let _this = this;
          // 发送axios请求/POST,访问登录页，返回啥呢？返回一个token？sessionId？
          if (this.consts.CONSOLE) console.log("发送请求：")
          this.$axios.post(url,
              {
                username: this.ruleForm.userName,
                password: md5(this.ruleForm.pass),
              },
              {
                withCredentials: false, // 注册的时候，肯定没登录，并且不会被拦截。那么何必带cookies呢。
              }
          ).then(response => {
            console.log("收到响应，状态码：" + response.status)
            // 这是登录用的，注册成功应该给个提示，然后弹出登录页
            this.$message({
              customClass: 'noticeMsg',
              message: '注册成功，请登录',
              type: 'success', // 样式在main.js引入
            })
            // 退出注册页
            this.TAB_DIALOGFORMVISIBLE_REGISTER(false)
            // 弹出登录页
            this.$store.commit('headOptions/TAB_DIALOGFORMVISIBLE_LOGIN', true)
            // this.$store.dispatch('globalOptions/sendLogin', true);
          }).catch(error => {
            if (this.consts.CONSOLE) console.log("错误叻！" + error)
            // 提示一下注册失败
            this.$message({
              customClass: 'noticeMsg',
              message: '注册失败，错误信息：' + error.message,
              type: 'error', // 样式在main.js引入
            })
            // 这句没必要，本来就没登录
            // this.$store.dispatch('globalOptions/logout');
          })
        } else {
          if (this.consts.CONSOLE) console.log('error submit!!');
          this.$message({
            customClass: 'noticeMsg',
            message: '注册失败',
            type: 'error',
          }) // 样式在main.js引入
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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