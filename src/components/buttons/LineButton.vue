<template>
  <button @click="clickCall">{{msg}}</button>
</template>

<script>
export default {
  name: "LineButton",
  props:['msg','clickCall'],
}
</script>

<style scoped>
button {
  margin-left: 10px;
  width: auto;
  padding: 0 10px;
  height: 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  color: #ccc499;
  font-family: 'Microsoft YaHei UI', serif;
  font-weight: 400;
  position: relative;
  transition: all 0.3s;
  z-index: 1;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: #ccc499;
  z-index: -1;
  transition: all 0.3s;
}

button:hover::before {
  width: 100%;
}

button:hover {
  color: black;
}

button:active:before {
  background: #b9b9b9;
}
</style>