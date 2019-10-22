import request from '../../utils/request'

const receiveSharedInfoHandlerName = "receiveShareInfo"
const openUrlHandlerName = "openUrl"
const jumpToExperienceDetail = "jumpToExperienceDetail"
const androidWriteExpName = "doHomework"
const resetGoBackIndex = "resetGoBackIndex"

/* 
下载最新版本的安卓拓词
*/
export const androidDownload = function () {
    return request({
        baseURL: 'https://api.towords.com',
        url: '/tool/get_latest_client_version_info',
        method: 'get',
    }).then(_ => {
        const data = _.data;
        if (data['code'] === 200) {
            var vStr = data.result.androidLastAppVersion.toString()
            var v = vStr.length === 3 ? vStr + '0' : vStr
            window.location.href = "//new-towords.oss-cn-beijing.aliyuncs.com/download/towords_GuanWang_" + v + ".apk";
        } else {
            alert('获取版本号失败,请联系拓词客服');
        }
    })
}

/* 
在浏览器环境下打开拓词， 失败则下载最新版本的安卓客户端
@param {string} path 打开拓词后，会进入到拓词的置顶path路径
*/
export const androidOpenApp = function (path) {
    var timeout = void 0,
        t = 100,
        hasApp = true;
    path = path ? path : 'external_link=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title);
    setTimeout(function () {
        if (hasApp) {
            window.location.href = "towords://invite/openwith?" + path
        } else {
            // 下载最新版本的拓词，安卓
            androidDownload()
        }
        document.body.removeChild(ifr);
    }, 200);

    var t1 = Date.now();
    var ifr = document.createElement("iframe");
    ifr.setAttribute('src', 'towords://invite/openwith?' + path);
    ifr.setAttribute('style', 'display:none');
    document.body.appendChild(ifr);
    timeout = setTimeout(function () {
        var t2 = Date.now();
        if (!t1 || t2 - t1 < t + 100) {
            hasApp = false;
        }
    }, t);
}

/* 
调用安卓的api
@param {string} fnName 由安卓端给出回调函数名
@param {string} msg 发送给安卓的消息，如果是对象需要转换成JSON字符串
*/
export const androidMessageHandler = function (fnName, msg) {
    try {
        if (androidObject[fnName] instanceof Function) {
            msg ? androidObject[fnName](msg) : androidObject[fnName]()
        } else {
            console.log("fn:androidMessageHandlers androidObject[fnName] not a function")
        }
    } catch (e) {
        console.log("fn:androidMessageHandlers err")
    }
}

/* 
分享页 向安卓发送分享信息
@param {Object} msg {标题, 副标题, 图片链接, 分享出去的指定}
@param {string} msg.title 标题，默认为“拓词动态”
@param {string} msg.subTitle 副标题，默认为“副标题”
@param {string} msg.image 图片url，默认为拓词的icon
@param {string} msg.linkUrl 指定分享出去的链接，默认为当前页url
*/
export const androidSendSharedPageInfo = function (msg) {
    var title = msg["title"] ? msg["title"] : "拓词动态",
        subTitle = msg["title"] ? msg["subTitle"] : "副标题",
        image = msg["image"] ? msg["image"] : "",
        linkUrl = msg["linkUrl"] ? msg["linkUrl"] : location.href
    androidMessageHandler(receiveSharedInfoHandlerName, JSON.stringify({
        title: title,
        subTitle: subTitle,
        image: image,
        linkUrl: linkUrl
    }))
}

export const androidOpenUrl = function () {

}

/* 
根据expId跳转到拓词指定的心得详情页
@param {number} expId 心得的id
*/
export const androidJumpToExp = function(expId){
    androidMessageHandler(jumpToExperienceDetail, expId)
}

/* 
根据给定的话题信息，打开到指定话题id的“写心得页面”
@param {Object} topicInfo {话题id，话题名称}
@param {Number} topicInfo.topicId 话题的id
@param {string} topicInfo.topicName 话题的名称
*/
export const androidWriteExp = function(topicInfo){
    androidMessageHandler(androidWriteExpName, JSON.stringify(topicInfo))
}



/* 
 将path和小程序id，传给客户端，让客户端唤起指定微信小程序
 @param {String} args.path 小程序path
 @param {String} args.miniProgramId 小程序id
*/
export const androidOpenWechatMiniProgram = function({path, miniProgramId}){
    androidMessageHandler("openWechatMiniProgram", JSON.stringify({"path": path, "miniProgramId": miniProgramId}))
}