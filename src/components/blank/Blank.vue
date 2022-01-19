<template>
<div style="color: #ccc499">
  数据加载中 ......
</div>
</template>

<script>
export default {
  name: "Blank",
  data(){
    return {
      fromPath:'haha',
    }
  },
  mounted() {
    // alert('正搁那儿跳转......')
    setTimeout(() => {

    },1000)
    this.$router.push({
      path: this.fromPath
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.consts.CONSOLE) console.log(from)
      vm.fromPath = from.path;
    });
  },
}
</script>

<style scoped>

</style>