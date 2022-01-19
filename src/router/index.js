import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

// import our Components
import TodoApp from "@/views/TodoApp";
import BoardsZone from "@/components/main/BoardsZone";
import Blank from "@/components/blank/Blank";

// create a router and expose it
export default new VueRouter({
    routes:[
        {
            path: '/',
            name: 'main',
            redirect: 'board-zone'
        },
        {
            name: 'todoApp',
            path: '/todoApp',
            component: TodoApp,
        },
        {
            name: 'board-zone',
            path: '/board-zone',
            component: BoardsZone

        },
        {
            name: 'blank',
            path: '/blank',
            component: Blank
        }
    ]
})
