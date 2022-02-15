<template>
  <div style="color: #ccc499">
    数据加载中 ......
  </div>
</template>

<script>
export default {
  name: "Blank",
  data() {
    return {
      fromPath: '/',
    }
  },
  mounted() {
    // console.log('正搁那儿跳转......' + this.fromPath)
  },
  activated() {
    if (this.consts.CONSOLE) console.log('Blank activated: '+this.fromPath)
    setTimeout(() => {
      this.$router.back()
    }, 100)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.consts.CONSOLE) console.log('跳转来自于：' + from.path)
      vm.fromPath = from.path;
    });
  },
}
</script>

<style scoped>

</style>