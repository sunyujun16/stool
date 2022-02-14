const head = {
    namespaced: true,
    actions: {},
    mutations: {
        TAB_RESUME(state, boolFlag) {
            state.drawers.resume = boolFlag;
        },
        TAB_STORY(state, boolFlag) {
            state.drawers.story = boolFlag;
        },
        TAB_THANKS(state, boolFlag) {
            state.drawers.thanks = boolFlag;
        },
        LEAVE_MSG(state, boolFlag) {
            state.drawers.message = boolFlag;
        },
        // todo_done 修改方法名，区分login和register
        TAB_DIALOGFORMVISIBLE_LOGIN(state, boolFlag) {
            state.dialogFormVisible_login = boolFlag;
        },
        TAB_DIALOGFORMVISIBLE_REGISTER(state, boolFlag) {
            state.dialogFormVisible_register = boolFlag;
        }

    },
    state: {
        // drawers不需要和后端通信，所以跳过action，直接和mutation通信，使用者：LeftSide组件
        drawers: {
            resume: false,
            story: false,
            thanks: false,
            message: false
        },
        // 使用者 LogInBox组件
        dialogFormVisible_login: false,
        dialogFormVisible_register: false,
    },
    getters: {
        tryAsILike(state) { // 随便瞎写的，没有用
            return state.drawers.resume && state.drawers.story;
        }
    }
}
export default head;