import { androidSendSharedPageInfo } from "../api/appBase/android";
import { iosSendSharedPageInfo } from "../api/appBase/ios";
import { shareInfo2Wechat } from "../api/wx";

// const shareInfo = {
//     image: "https://official-web.oss-cn-beijing.aliyuncs.com/towords/moguiying/1/A/share_icon.png",
//     subTitle: "100天牢记6000单词，戳此报名>>>",
//     title: "不用思考的「习惯养成计划」",
//     linkUrl: location.origin + location.pathname
// };

var share = function(shareInfo) {
  androidSendSharedPageInfo(shareInfo);
  iosSendSharedPageInfo(shareInfo);
  try {
    shareInfo2Wechat(shareInfo);
  } catch (e) {
    console.log("share to wechat error.");
  }
};

export default share;
// 初始化分享信息
