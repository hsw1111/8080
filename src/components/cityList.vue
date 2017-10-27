<template>
  <div class="cityList">
      <ul>
          <li class="citySelect" @click="sendCityToParent"  v-for="list of cityList" :cityId="list.code" v-bind:key="list.id" v-text="list.cityName"></li>
      </ul>
  </div>
</template>

<script>
import {siblings} from '../util/util.js'
export default {
  data: function() {
    return {
      cityList: [
        
      ],
     
      cityCodeList:[]
    };
  },
  props:["joinCity"],
  updated:function(){
       var $li = document.querySelector('li.citySelect')
       var code = $li.getAttribute('cityId');
       this.cityCodeList.push(code)
       this.$emit('listenToChildEvetn',[...this.cityCodeList])
  },
  methods:{
      sendCityToParent(e){
          var doms = siblings(e.target)
              for(var i=0;i<doms.length;i++){
                  doms[i].setAttribute('class','')
                   doms[i].style.cssText = 'color:#000;border:1px solid #ccc'
              }
              e.target.style.cssText = 'color:orange;border:1px solid orange'
              this.cityCodeList = []
              this.cityCodeList.push(e.target.getAttribute('cityId'))
              this.$emit('listenToChildEvetn',[...this.cityCodeList])
      }
  },
  watch:{
      joinCity:{
          handler:function(n){
              this.cityList = n
          },
          deep:true
      }
  }
};
</script>
<style scoped >
    div.cityList ul {height:32px;}
    div.cityList ul li{cursor:pointer; float:left;list-style: none;width:80px;height:30px;line-height:30px;text-align:center;border:1px solid #ccc;border-radius:4px;margin-right:5px;font-size:14px;}
    div.cityList ul li.active{color:orange;border:1px solid orange}
    div.cityList ul li:nth-child(1){color:orange;border:1px solid orange}
</style>

