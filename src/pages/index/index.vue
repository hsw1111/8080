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
    export default {
      components: {
        myHeader,
        siderBar
      },
      watch: {
        '$route' : 'isMenu'
      },
      methods: {
        isMenu () {
        console.log('页面路由变化了')
        }
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
  div.Grid .GridEntry.leftEntry{
    background:#f3f3f5;
    top: 0%;
    left: 0%;
    height: 100%;
    width: 19%;
  }
  div.Grid .GridEntry.rightEntry{
    background:#f3f3f5;
    top: 0%;
    left: 19%;
    height: 100%;
    width: 80%;
  }
  .Grid .GridEntry .entryInner{
    position: absolute;
    top: 29px;
    right: 0;
    left: 20px;
    bottom: 0;
    overflow: hidden;
    background: #f3f3f5;
  }
  .Grid .GridEntry .entryInner .workspace{
    width:100%;
    height:90%;
    box-sizing: border-box
  }
  .Grid .GridEntry .entryInner .workspace .scrollArea{
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    position:relative;
  }
  .Grid .GridEntry .entryInner .workspace .scrollArea .editcontainer .documentedit {
    user-select: text;
    min-height: 845px;
    margin-left: auto!important;
    margin-right: auto!important;
    border-radius: 2px;
    margin-top: 0;
    cursor: text;position: relative;
  }
</style>
