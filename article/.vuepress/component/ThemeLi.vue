<template>
  <div>
    <Watermark v-if="pageConfig['watermark']"  :watermark="pageConfig['watermark']"/>
    <AreaComment  v-if="pageConfig['comment']" ref="comment" class="area__comment" :topicInfo="{topicId: pageConfig['topic-id'], topicName: pageConfig['topic-name']}" />
    <!-- 自定义按钮 底部跳转 -->
    <div v-if="pageConfig['footer-type']" style="height:1rem"></div>
    <div v-if="pageConfig['footer-type'] === 1" class="footer__fixed">
      <!-- <a :href="gotoLink">{{custom_btn.text}}</a> -->
      <div class="timer">限时赠4个月会员，价值120元</div>
      <div class="price">
        <div class="top">
          <span class="cut">¥<span class="price_number">199</span></span>
          <span class="original"> 报名费99元+契约金100元</span>
        </div>
        <div class="bottom">任务完成，契约金100元全额返还</div>
      </div>
        <div class="btn__buy pay__btn" @click="gotoLink">立即报名<br>魔鬼营</div>
    </div>
    <!-- 自定义按钮 写心得 -->
    <div class="btn__write__exp" v-if="pageConfig['btn-wirte-exp']" @click="handleWriteExp">
    <!-- <div id="btn__write__exp"></div> -->
    
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import "../theme/typora-themes-css/li.css"
  import sharing from '../utils/sharing'
  import AreaComment from './AreaComment.vue'
  import Watermark from './Watermark.vue'
  export default {
    components:{
      AreaComment,
      Watermark
    },
    data() {
      return {
        // pageConfig: {}
        // linkMGY: '',
      };
    },
    computed: {
      pageConfig() {
        return {
          'comment': !!(this.$frontmatter['topic-id'] && this.$frontmatter['topic-name']),
          'btn-wirte-exp': this.$frontmatter['btn-wirte-exp'],
          'footer-type': this.$frontmatter['footer-type'],
          'topic-id': this.$frontmatter['topic-id'],
          'topic-name': this.$frontmatter['topic-name'],
          'share-title': this.$frontmatter['share-title'],
          'share-description': this.$frontmatter['share-description'],
          'share-icon-url': this.$frontmatter['share-icon-url'],
          'watermark': this.$frontmatter['watermark'], //水印配置
        }
      }
    },
    methods: {
      handleWriteExp() {
        this.$handleEnvCheck((env) => {
          // 跳转到拓词的心得页面
          if (env && env.writeExp instanceof Function) {
            env.writeExp({
              topicId: this.pageConfig['topic-id'],
              topicName: this.pageConfig['topic-name']
            });
          }
        })
      },
      share() {
        if (this.pageConfig['share-title'] && this.pageConfig['share-description'] && this.pageConfig['share-icon-url']) {
          var shareInfo = {
            image: this.pageConfig['share-icon-url'],
            subTitle: this.pageConfig['share-description'],
            title: this.pageConfig['share-title'],
            linkUrl: location.origin + location.pathname
          };
          sharing(shareInfo);
        }
      },
      gotoLink() {
        var url = "https://wx.towords.com/towordscamp/mo_gui_ying_2"
        if (navigator.userAgent.indexOf('towords') >= 0) {
          location.href = url + location.search;
        } else {
          location.href = url;
        }
      },
      // 第三方环境中“请到浏览器中打开”的提示弹窗
      dialogBox(opt) {
        var imageClassName = opt.imageClassName,
          image = opt.image
        var box = document.createElement('div');
        box.className = 'dialog dialog-bg';
        box.innerHTML += '<img class="' + imageClassName + '" src="' + image + '"/>'
        box.innerHTML += '    </div>';
        box.addEventListener('click', function(e) {
          opt.cancel && opt.cancel(close);
        });
        box.addEventListener('touchmove', function(e) {
          e.preventDefault();
        });
        var container = document.body;  
        container.appendChild(box);
        function close() {
          box.style.animation = 'fadeOut .2s linear';
          window.setTimeout(function() {
            container.removeChild(box);
          }, 100)
        }
      },
      toBrowser(cb) {
        this.dialogBox({
          image: 'http://official-web.oss-cn-beijing.aliyuncs.com/towords/avatars/wechat_bg.png',
          imageClassName: 'to-browser',
          cancel: function(close) {
            if (cb && (cb instanceof Function)) {
              cb(close);
            } else {
              close();
            }
          }
        })
      },
      // initBtnWriteExp(){
      //   // <div class="btn__write__exp" v-if="pageConfig['btn-wirte-exp']" @click="handleWriteExp">
      //   const btn = document.querySelector("#btn__write__exp");
      //   console.log(btn);
        
      //   const div = document.createElement('div');
      //   div.className = 'btn__write__exp';
      //   div.addEventListener('click',()=>{
      //      this.handleWriteExp();
      //   })
      //   btn.append(div);
      // },
      // initGotoLink(){
      //   var btn = document.querySelector('.btn__buy.pay__btn');
      //   btn.addEventListener('click', ()=>{
      //     this.gotoLink();
      //   })
      // }
    },
    mounted(){
      
    },
    beforeMount() {
      this.share(); // 网页分享
      // 向全局绑定env
      this.$env = this.$root.$env = new Env();
      // 接收一个函数后进行环境判断
      this.$handleEnvCheck = this.$root.$handleEnvCheck = (fn) => {
        // 如果在第三方（微信，微博）浏览器环境，弹出“请到浏览器中打开”
        if (this.$env.thirdParty) {
          this.toBrowser();
          // 如果在浏览器中，则唤醒拓词app，并在拓词app中打开当前页面
        } else if (!this.thirdParty && !this.$env.towords.istowords) {
          this.$env.openApp instanceof Function && this.$env.openApp()
          // 如果在拓词app中，则执行fn
        } else if (this.$env.towords.istowords) {
          fn instanceof Function && fn(this.$env);
        }
      };
      // 重置页面rem
      ~ function REMResize() {
        var rate = 3.75,
          $html = document.querySelector("html"),
          width = $html.offsetWidth;
        width = width > 720 ? 720 : width < 320 ? 320 : width;
        $html.style.fontSize = width / 3.75 + "px";
        window.onresize !== REMResize ? window.onresize = REMResize : '';
      }();
    },
  };
</script>

<style lang="stylus">
.btn__write__exp {
        position: fixed;
        width: 64px;
        height: 64px;
        bottom: 15%;
        right: 5px;
        background: url("https://official-web.oss-cn-beijing.aliyuncs.com/towords/dynamic/Public/btn_write_exp.png");
        -webkit-background-size: 64px 64px;
        background-size: 64px 64px;
        z-index: 999;
    }
.footer__fixed {
        // display: none;
        position: fixed;
        margin: 0 auto;
        left: 0;
        right: 0;
        bottom: 0;
        height: .65rem;
        padding-top: .1rem;
        background: #312E73;
        width: 100%;
        max-width: 720px;
        color: #fff;
        z-index: 999;
    }
    .footer__fixed .price {
        padding-left: .15rem;
    }
    .footer__fixed .price .top .cut {
        font-size: .28rem;
        font-family: "Swiss921 BT";
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
    }
    .footer__fixed .price .top {
        font-size: 0;
        margin-top: .08rem;
    }
    .footer__fixed .price .bottom {
        margin-top: .1rem;
        font-size: .15rem;
        font-family: PingFang-SC-Medium;
        font-weight: 400;
        color: #fff;
        line-height: .12rem;
        border-radius: .9rem;
    }
    .footer__fixed .price .top .original {
        margin-left: .05rem;
        font-size: .12rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(157, 159, 217, 1);
        line-height: .14rem;
    }
    .footer__fixed .btn__buy {
        position: absolute;
        right: 0;
        width: 1.15rem;
        height: 100%;
        padding-top: .15rem;
        padding-bottom: .2rem;
        top: 0;
        background: #d73156;
        text-align: center;
        font-size: .15rem;
        line-height .22rem;
        font-family: NotoSansCJKsc-Medium;
        font-weight: 500;
        color: #fff;
        // line-height: 1;
        z-index: 9;
    }
    .footer__fixed .timer {
        position: absolute;
        height: .2rem;
        /* width: 100%; */
        /* background-color: #373858; */
        z-index: 1;
        top: -.2rem;
        left: 0;
        font-size: .12rem;
        line-height: .2rem;
        color: #fff;
        padding-left: .15rem;
        padding-right: .15rem;
        font-weight: 400;
        background: linear-gradient(270deg, rgba(94, 90, 184, 1) 0%, rgba(206, 39, 82, 1) 100%);
        border-radius: 0px .09rem 0 0px;
    }
     .dialog {
        position: fixed;
        top: 0;
        left: 0;
        right:0;
        bottom: 0;
        transition: all ease-in 2s;
    }
    .dialog-bg {
        height: 100%;
        width: 100%;
        background: rgba(32, 38, 54, .8);
        animation: fadeIn .2s linear;
        z-index: 9999;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .dialog .to-browser {
        position: absolute;
        right: 0;
        top: 0;
        margin: 40px 80px;
        width: 200px;
    }
</style>