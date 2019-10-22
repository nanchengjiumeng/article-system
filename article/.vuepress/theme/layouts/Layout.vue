<template>
  <div class="theme-container">
    <div class="page">
        <Content class="theme-default-content markdown-here-wrapper" />
    </div>
    <ThemeLi/>
  </div>
</template>

<script type='text/ecmascript-6'>
  import ThemeLi from '../../component/ThemeLi'
  export default {
    components: {
      ThemeLi
    },
    data () {
      return {
      }
    },
  }
</script>

