<template>
  <div>
    <Content  class="theme-container"/>
  </div>
</template>

<script type='text/ecmascript-6'>
  import copy from 'copy-text-to-clipboard';
  import {
    Notification
  } from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import '../../../weekly/.vuepress/theme/typora-themes-css/li.css'
  export default {
    data() {
      return {}
    },
    methods: {
      // 将页面中的css代码块标签，加上点击复制功能
      initCopyBoard() {
        var pres = document.querySelectorAll(".language-css.extra-class");
        var _this = this;
        pres.forEach(function(pre, item) {
          pre.addEventListener("click", function(e) {
            var text = pre.innerText;
            var msg =  text.slice(0, 30) + '...';
            copy(text) ? Notification.success({
              title: '复制成功',
              message: msg,
            }) : Notification.error({
              title: '复制失败',
              message: msg,
            })
          })
        })
      }
    },
    mounted() {
      this.initCopyBoard();
      console.log('help');
    }
  }
</script>



