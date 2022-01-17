import axios from "axios";
import Vue from "vue";

// 小硬嗑API不支持这个设定，跨域问题，唔。。。解决办法：后端指名道姓，或者在发送请求时传入config参数{withCredentials: false}
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios

// todo: 配置拦截器哟，处理error状态码，比如401就给个请登录的提示。

export default axios;
