export const receiveSharedInfoHandlerName = "receiveShareInfo"
export const openUrlHandlerName = "openUrl"
export const jumpToExperienceDetail = "jumpToExperienceDetail"
export const iosWriteExpName = "clickPublishFeeling"
/* 
下载最新版本的拓词
*/
export const iosDownload = function () {
    window.location.href = '//itunes.apple.com/cn/app/ta-ci-+-shang-yin-bei-dan-ci/id726029718';
}

/* 
在浏览器环境下打开拓词
@param {string} path 打开拓词后，会进入到拓词的置顶path路径
*/
export const iosOpenApp = function (path) {
    path = path ? path : '/url=' + encodeURIComponent(location.href);
    window.location.href = 'iOSToWords://com.towords.www/' + path
    setTimeout(function () {
        // 下载app
        window.location.href = '//itunes.apple.com/cn/app/ta-ci-+-shang-yin-bei-dan-ci/id726029718';
    }, 500);
}


/* 
调用IOS端的api
@param {string} fnName 由IOS端给出方法名
@param {Object} msg 发送给IOS的消息
*/
export const iosMessageHandler = function (fnName, msg) {
    try {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[fnName]) {
            window.webkit.messageHandlers[fnName].postMessage(msg);
        } else {
            console.log("fn:iosMessageHandlers messageHandlers[fnName] not a function")
        }
    } catch (e) {
        console.log("fn:iosMessageHandlers err")
    }
}

/* 
分享页 向IOS端发送分享信息
@param {Object} msg {标题, 副标题, 图片链接, 分享出去的指定}
@param {string} msg.title 标题，默认为“拓词动态”
@param {string} msg.subTitle 副标题，默认为“副标题”
@param {string} msg.image 图片url，默认为拓词的icon
@param {string} msg.linkUrl 指定分享出去的链接，默认为当前页url
*/
export const iosSendSharedPageInfo = function (msg) {
    var title = msg["title"] ? msg["title"] : "拓词动态",
        subTitle = msg["title"] ? msg["subTitle"] : "副标题",
        image = msg["image"] ? msg["image"] : "",
        linkUrl = msg["linkUrl"] ? msg["linkUrl"] : location.href

    iosMessageHandler(receiveSharedInfoHandlerName, {
        title: title,
        subTitle: subTitle,
        image: image,
        linkUrl: linkUrl
    })
}

/* 
IOS拓词环境下打开指定url的页面
@param {Object} opt {url|webViewUrl}
@param {string} opt.url 默认为undefined，如过给出url，则在手机默认浏览器中打开此url
@param {string} opt.webViewUrl 默认为undefined，如过给出webViewUrl，则在拓词app内打开此url
*/
export const iosOpenUrl =  function (opt) {
    var url = opt["url"],
        webViewUrl = opt["webViewUrl"]

    if (url) iosMessageHandler(openUrlHandlerName, { url: url }, function (e) {
        console.log(e ? e : "error fn: openUrlWithMessage(url)")
    })
    if (webViewUrl) iosMessageHandler(openUrlHandlerName, { webViewUrl: webViewUrl }, function (e) {
        console.log(e ? e : "error fn: sendSharedPageInfo(webViewUrl)")
    })
}


/* 
根据expId跳转到拓词指定的心得详情页
@param {number} expId 心得的id
*/
export const iosJumpToExp = function(expId){
    let data =  {"experienceId": expId}
    iosMessageHandler(jumpToExperienceDetail, data)
}

/* 
根据给定的话题信息，打开到指定话题id的“写心得页面”
@param {Object} topicInfo {话题id，话题名称}
@param {Number} topicInfo.topicId 话题的id
@param {string} topicInfo.topicName 话题的名称
*/
export const iosWriteExp = function(topicInfo){
    iosMessageHandler(iosWriteExpName, topicInfo)
}


/* 
 将path和小程序id，传给客户端，让客户端唤起指定微信小程序
 @param {String} args.path 小程序path
 @param {String} args.miniProgramId 小程序id
*/
export const iosOpenWechatMiniProgram = function({path, miniProgramId}){
    iosMessageHandler("openWechatMiniProgram", {"path": path, "miniProgramId": miniProgramId})
}

