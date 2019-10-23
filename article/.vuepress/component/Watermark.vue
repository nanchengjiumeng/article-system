<template>
  <div class="watermark">
    <div class="row watermark__row" v-for="i in option.row">
      <div class="img" v-for="i in option.numberOneRow" :style="{
        marginTop: option.marginTop + 'px'
      }">
        <img :src="option.imageSrc" alt="顶上英语" />
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: ["watermark"],
  data() {
    return {
      option: {
        row: 1,
        imageSrc: "http://towords.oss-cn-beijing.aliyuncs.com/test/icon_towords.jpg",
        numberOneRow: 3,
        marginTop: 300,
        width: 100,
        height: 100,
        opacity: 1
      }
    };
  },
  mounted() {
    console.log(this.watermark);
    let option = {
      imageSrc: "",
      numberOneRow: 3,
      marginTop: 200,
      width: 100,
      height: 100,
      // opacity: 1
    };

    // let numberOnRow = watermark
    let rowElHeight = document.querySelector(".watermark__row").clientHeight;
    let bodyElHeight = document.body.clientHeight;

    this.option.row = Math.round(bodyElHeight / (rowElHeight + option.marginTop)+5);
  }
};
</script>

<style  scoped='' type='text/css'>
.watermark {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  margin-top: -50%;
}
.row {
  /* margin-top: 200px; */
  display: flex;
  transform: rotateZ(10deg);
  transform-origin: 50% 50%;
}
img {
  display: block;
  width: 50%;
  flex: 1;
  opacity: 0.05;
}
</style>