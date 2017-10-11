<template>
  <div class="custom-dialog">
   <div class="wrapper">
      <div class="dialogContent">
        <form v-model="formItems">
          <h3 class="dialogTitle">添加文章 <i class="el-icon-close" @click="closeDialog(isShow)"></i></h3>
          <div class="form-item">
            <label for="">文章标题</label>
            <input type="text" v-model="formItems.desc" placeholder="请输入文章标题">
          </div>
        </form>
        <div class="confirm">
          <el-button @click="closeDialog(isShow)">取消</el-button>
          <el-button type="primary" @click="submitDialog(isShow,formItems.desc)">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['isShow', 'formItems'],
    data: function () {
      return {
      }
    },
    methods: {
      closeDialog (isShow) {
        this.$emit('receive', isShow)
      },
      submitDialog (isShow, desc) {
        this.$emit('submit', isShow, desc)
      }
    }
  }
</script>
<style scoped>
 
  div.custom-dialog{position:fixed;left:0;top:0;bottom:0;right:0;width:100%;height:100%;z-index:2000;}
  div.custom-dialog div.wrapper{width:100%;height:100%;background:rgba(0,0,0,.5);position:relative;}
  div.custom-dialog div.wrapper div.dialogContent{border-radius:5px;background:#fff;width:50%;height:200px;position:absolute;left:50%;margin-left:-25%;top:25%;}
  div.custom-dialog div.wrapper div.dialogContent form h3.dialogTitle{color:#555;line-height:40px;height:40px;}
  div.custom-dialog div.wrapper div.dialogContent form h3.dialogTitle i.el-icon-close{float:right;line-height:40px;margin-right:10px;cursor:pointer;font-size:14px;}
</style>

