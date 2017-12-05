<template>
  <div class="status_error">
    <div class="container" :style="{backgroundImage: 'url(' +bg + ')'}"></div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        bg:require("../../assets/img/500.gif")
      }
    }
  }
</script>
<style>
  div.container{
    width:100%;
    height:100%;
    position:absolute;
    left:0;right:0;top:0;bottom:0;
    background-size:cover;
    background-position:center;
    /* background-image:url("../../../src/assets/img/500.gif") */
  }
</style>