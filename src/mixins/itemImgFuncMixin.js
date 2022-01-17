// import {mapGetters, mapMutations, mapState} from "vuex";

export const itemImgMix = {
    data() {
        return {
            inRange: false,
        }
    },
    computed: {
        itemImageClass() {
            return this.inRange ? 'imgInRange' : 'imgOutRange'
        }
    },
    methods: {
        // ...mapMutations('imgOpacityAbout', ['setInRange','setOutRange']),
        setInRange() {
            this.inRange = true
            // console.log("true set", this.itemImageClass)
        },
        setOutRange() {
            this.inRange = false
            // console.log("false set", this.itemImageClass)
        }
    }
}