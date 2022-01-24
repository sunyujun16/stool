import {
    Row, Col, Container, Main, Header, Footer, Button, Aside, Divider, Link, Message, Drawer, RadioGroup, Radio,
    Dialog, Form, FormItem, Input, Select, Option, MessageBox
} from "element-ui";

export default {
    install(Vue){
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(Container);
        Vue.use(Main);
        Vue.use(Header);
        Vue.use(Footer);
        Vue.use(Button);
        Vue.use(Aside);
        Vue.use(Divider);
        Vue.use(Link);
        Vue.use(Drawer);
        Vue.use(RadioGroup);
        Vue.use(Radio);
        Vue.use(Dialog);
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Input);
        Vue.use(Select);
        Vue.use(Option);

        // 引入无需关闭的弹窗提醒，需要手动添加一个$message属性。
        // Vue.use(Message) // 这行会导致页面加载时直接弹出一个空白窗口，只好替换为component方式。
        Vue.component(Message.name, Message)
        Vue.prototype.$message = Message
        Vue.component(Message.name, MessageBox)
        Vue.prototype.$messagebox = MessageBox
    }
}

