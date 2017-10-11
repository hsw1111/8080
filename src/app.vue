<template>
  <div id="app">
      <my-home></my-home>
  </div>
</template>

<script>
import 'element-ui/lib/theme-default/index.css'
import myHome from './pages/container/index.vue'
import './assets/rest_elementUI_less/pagenation.less'
import './assets/rest_formItem_input_less/index.less'

export default {
  name: 'app',
  components: {
    myHome
  }
}
</script>



