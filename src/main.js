import Vue from 'vue'
import App from './App.vue'

// 按需引入elementUI，此处会自动注册为全局组件并引入相关css样式，真是tmd太方便了（前提：安装了babel插件）
import elements from './elements'
Vue.use(elements)

// 剪切板插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 引入我们在如下目录编写的Vuex的store
import store from './store/index'

// 引入全局CSS样式，用于：【el-message、】
import '@/assets/css/global.css'

// 配置一个全局变量，方便使用，唔？好像有点state的意思嘞？
import consts from '@/consts/consts.json'
Vue.prototype.consts = consts

// 引入路由器
import router from '@/router/index'

// 引入axios
import axios from "@/axios/index";
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router,
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    // 设置全局常量失败
    // mounted() {
    //     Vue.set(this,'consts',consts)
    //     if (consts.CONSOLE) console.log(consts)
    // }
}).$mount('#app')
