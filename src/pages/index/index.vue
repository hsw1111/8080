<template>
  <div id="applycation">
    <div class="desktop-window platform-windows">
      <div class="window-container">
        <myHeader></myHeader>
        <div class="Grid">
          <div class="GridEntry leftEntry">
            <siderBar></siderBar>
          </div>
          <div class="GridEntry rightEntry">
            <div class="rightSider">
              <div class="entryInner">
                 <div class="workspace">
                   <div class="scrollArea">
                     <div class="editcontainer">
                       <div class="documentedit">
                         <router-view></router-view>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import myHeader from '../../components/head.vue'
    import siderBar from '../../components/siderBar.vue'
    import $ from 'jquery'
    import {setCookie,getCookie,delCookie } from '../../../utils/index'
    export default {
      components: {
        myHeader,
        siderBar
      },
     mounted:function () {
     },
      methods: {
      }
    }
</script>

<style scoped>

  #application{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #f3f3f5;
  }
  .platform-windows{    
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width:100%;
    height:100%
  }
  .desktop-window .window-container{
    width: 100%;
    height: 100%;
  }
  div.Grid{
    width:101%;
    height:100%;
    position:relative;
  }
  div.Grid .GridEntry{
    position:absolute;
  }
  div.rightSider{height:100%;}
  div.Grid .GridEntry.leftEntry{
    background:#f3f3f5;
    top: 0%;
    left: 0%;
    height: 100%;
    width: 19%;
    min-width: 196px;
    max-width:280px;
  }
  div.Grid .GridEntry.rightEntry{
  background: #f3f3f5;
    top: 0%;
    left: 280px;
    height: 100%;
    /* width: 80%; */
    width: calc( 100% - 280px);
   
  }
  .Grid .GridEntry .entryInner{
   position: absolute;
    top: 29px;
    right: 20px;
    left: 20px;
    bottom:65px;
    overflow-y: auto;
    background: #ffffff;
  }
  .Grid .GridEntry .entryInner .workspace{
    width:100%;
   background: #f3f3f5;
    box-sizing: border-box;
    height:100%;
  }
  .Grid .GridEntry .entryInner .workspace .scrollArea{
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x:hidden;
    box-sizing: border-box;
    position:relative;
  }
  .Grid .GridEntry .entryInner .workspace .scrollArea .editcontainer .documentedit {
    user-select: text;
   
    margin-left: auto!important;
    margin-right: auto!important;
    border-radius: 2px;
    margin-top: 0;
    cursor: text;position: relative;
  }
</style>
