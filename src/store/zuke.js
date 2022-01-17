const zukeOptions = {
    strict: true, // 阻止不经过mutations就修改state的非分之想。
    namespaced:true,
    actions: {},
    mutations: {},
    state: {
        zukeHost: 'http://localhost:8080',
    },
    getters: {}
}
export default zukeOptions;