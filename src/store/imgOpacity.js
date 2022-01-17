const imgOpacityAbout = {
    namespaced:true,
    actions: {},
    mutations: {
        setInRange(state,value) {
            state.inRange = true
            console.log("true set", this.itemImageClass)
        },
        setOutRange(state,value) {
            state.inRange = false
            console.log("false set", this.itemImageClass)
        }
    },
    state: {
        inRange: false,
    },
    getters: {
        itemImageClass(state) {
            return state.inRange ? 'imgInRange' : 'imgOutRange'
        }
    }
}
export default imgOpacityAbout;