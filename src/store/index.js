// 引入
import Vue from 'vue'
import Vuex from "vuex"

// 应用
Vue.use(Vuex)

// 准备模块，想一下先...唔...
import headOptions from "@/store/head";
import imgOpacityOptions from "@/store/imgOpacity";
import todoOptions from "@/store/todo";
import zukeOptions from "@/store/zuke";
import fa from "element-ui/src/locale/lang/fa";

const globalOptions = {
    strict:true,
    namespaced:true,
    actions: {
        login(context, boolValue){
            context.commit('LOGIN', boolValue)
        },
        logout(context){
           context.commit('LOGOUT', false);
        }
    },
    mutations: {
        LOGIN(state, value){
            state.login = true
        },
        LOGOUT(state){
            state.login = false
        },
        SET_USER_INFO(state, valueObj) {
          state.userInfo.username = valueObj.username;
          state.userInfo.user_privilege = valueObj.privilege;
          state.userInfo.avatar_url = valueObj.avatar_url;
        },
        CLEAR_USER_INFO(state){
            state.userInfo = {
                username: '',
                user_privilege: 2,
                avatar_url: '',
            }
        }
    },
    state: {
        login: false,
        userInfo: {
            username: '',
            user_privilege: '2',
            avatar_url: '',
        }
    },
    getters: {

    }
}

export default new Vuex.Store({
    modules: {
        imgOpacityOptions,
        headOptions,
        todoOptions,
        zukeOptions,
        globalOptions,

    }
})
