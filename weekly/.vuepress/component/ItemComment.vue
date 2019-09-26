<template>
  <div class="experience" v-if="itemData">
    <div class="person__info">
      <div class="l">
        <div class="avatar">
          <img :src="getUserPortraitURL(itemData.userPortrait)" alt="avatar" class="img logo goto">
        </div>
      </div>
      <div class="m">
        <div class="name">{{itemData.userName}} <span v-if="itemData.vipStatus" class="vip__icon"></span></div>
        <div>
          <div class="tgroups" v-if="itemData.groupName">
            <span>{{itemData.groupName}}</span>
          </div>
          <div class="time">{{formatDate(itemData.createTime)}}</div>
          <div class="slim">精选</div>
        </div>
      </div>
      <div class="r">
        <div class="person__attention--not">+关注</div>
      </div>
    </div>
    <p class="experience__content">{{itemData.content}}</p>
    <p class="experience__topics">
      <span v-for="(item, key) in itemData.rdmExperienceTopicInfoList" :key="key" class="topic"><b class="topic__icon"></b>{{item.topicDescription}}</span>
    </p>
    <div class="experience__footer">
      <p class="btn">
        <span class="icon share"></span> 分享 </p>
      <p class="btn">
        <span class="icon comment"></span> {{itemData.commentNum?itemData.commentNum:"评论 "}}</p>
      <p class="btn">
        <span class="icon like"></span>{{itemData.praiseNum?itemData.praiseNum:"点赞 "}} </p>
    </div>
  </div>
</template>

<script type='text/javascript'>
  export default {
    name: "item",
    props: ["itemData"],
    methods: {
      getUserPortraitURL(userPortrait) {
        var avatar_n = userPortrait && userPortrait.match('default_([0-9]+).jpg');
        var m = avatar_n && avatar_n[1];
        return 'https://new-towords.oss-cn-beijing.aliyuncs.com/img/public_portrait/avatar_' + (m ? m : '01') + '.png';
      },
      formatDate(timeStr) {
        if(!timeStr) return ''
        let date = new Date(timeStr),
          tNow = new Date();
        var calculateSeconds = function(date) {
          if (!(date instanceof Date)) {
            date = new Date(date);
          }
          // return ((date.getDate() * 24 + date.getHours()) * 60 + date.getMinutes()) * 60 + date.getSeconds();
          return Number(date) / 1000;
        };
        
        timeStr = timeStr.replace(/-/g, function() {
          return '/';
        });
        if (tNow.getFullYear() === date.getFullYear()) {
          var secondJetLag = calculateSeconds(tNow) - calculateSeconds(date);
          if (secondJetLag < 60) {
            return '\u521A\u521A';
          } else if (secondJetLag < 3600) {
            return Math.floor(secondJetLag / 60) + '\u5206\u949F\u524D';
          } else if (secondJetLag < 3600 * 24) {
            return Math.floor(secondJetLag / 3600) + '\u5C0F\u65F6\u524D';
          } else if (secondJetLag < 3600 * 48) {
            return '\u6628\u5929 ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
          } else {
            return (date.getMonth() + 1) + '\u6708' + date.getDate() + '\u65E5 ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
          }
        } else {
          return date.getFullYear() + '\u5E74' + (date.getMonth() + 1) + '\u6708' + date.getDate() + '\u65E5 ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        }
      }
    },
    // choiceState: false,
    // commentNum: 0,
    // content: "",
    // createTime: "",
    // createTimeStr: "",
    // followState: false,
    // groupId: 0,
    // groupName: "",
    // id: 0,
    // praiseNum: 0,
    // publicState: true,
    // rdmExperienceTopicInfoList: [],
    // state: true,
    // topicIdStr: "",
    // userId: "",
    // userName: "",
    // userPortrait: "",
    // verifyState: true,
    // vipStatus: false
    data() {
      return {}
    }
  }
</script>

<style scoped='' type='text/css'>
  .experience {
    border-top: 1px solid #E6E6E6;
    padding: 25px 15px 15px;
  }
  .experience__content {
    margin: 16px 0;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(50, 54, 64, 1);
    line-height: 25px;
    white-space: pre-wrap;
  }
  .experience__topics {
    font-size: 0;
    line-height: 1.2;
    margin: 0;
  }
  .experience__topics .topic {
    font-size: 13px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(248, 91, 69, 1);
    line-height: 1;
  }
  .experience__topics .topic__icon {
    margin-right: 3px;
    float: left;
    width: 13px;
    height: 13px;
    background: url("https://official-web.oss-cn-beijing.aliyuncs.com/active/towordsLeaningExperience/topic.png") no-repeat center;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .experience__footer {
    margin-top: 15px;
    display: flex;
  }
  .experience__footer p {
    margin: 0;
    flex: 1;
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(95, 95, 100, 1);
    line-height: 1;
  }
  .experience__footer .icon {
    float: left;
    margin-right: 2px;
    display: block;
    width: 14px;
    height: 14px;
  }
  .experience__footer .share {
    background: url("https://official-web.oss-cn-beijing.aliyuncs.com/active/towordsLeaningExperience/fenxiang.png") no-repeat center;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .experience__footer .comment {
    background: url("https://official-web.oss-cn-beijing.aliyuncs.com/active/towordsLeaningExperience/pinglun.png") no-repeat center;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .experience__footer .like {
    background: url("https://official-web.oss-cn-beijing.aliyuncs.com/active/towordsLeaningExperience/zan.png") no-repeat center;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .vip__icon {
    display: block;
    width: 40px;
    height: 16px;
    background: url("https://official-web.oss-cn-beijing.aliyuncs.com/towords/icon/vip.png");
    background-size: 100% 100%;
  }
  .person__info img {
    display: block;
    height: 100%;
    width: 100%;
  }
  .person__info .avatar {
    height: 42px;
    width: 42px;
  }
  .person__info .name {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(50, 54, 64, 1);
  }
  .person__info .tgroups {
    margin-right: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(177, 177, 184, 1);
    display: inline-block;
  }
  .person__info .time {
    margin-right: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(177, 177, 184, 1);
    display: inline-block;
  }
  .person__info .slim {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 171, 48, 1);
    display: inline-block;
  }
  .person__info .person__attention {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(177, 177, 184, 1);
  }
  .person__info .person__attention--not {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(248, 90, 68, 1);
  }
  .person__info {
    position: relative;
  }
  .person__info .l {
    position: absolute;
    left: 0;
    top: 0;
  }
  .person__info .m {
    margin: 0 50px;
    font-size: 0;
  }
  .person__info .m .name {
    display: inline-block;
    margin-bottom: 10px;
    line-height: 1;
  }
  .person__info .m .vip__icon {
    float: right;
    margin-left: 3px;
  }
  .person__info .r {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>