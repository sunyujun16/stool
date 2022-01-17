import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

// import ours Components
import TodoApp from "@/views/TodoApp";
import App from "@/App";
import BoardsZone from "@/components/main/BoardsZone";

// create a router and expose it
export default new VueRouter({
    routes:[
        // {
        //     path: '/',
        //     name: 'main',
        //     redirect: 'board-zone'
        // },
        {
            name: 'todoApp',
            path: '/todoApp',
            component: TodoApp,
        },
        {
            name: 'board-zone',
            path: '/',
            component: BoardsZone

        },
    ]
})
