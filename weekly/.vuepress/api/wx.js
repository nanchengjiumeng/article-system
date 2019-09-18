import {
    getWxShareData
} from './request/index'
import request from '../utils/request'

// import '@/assets/wxdialog.css'

/* 
微信 基于“https://www.topschool.com/js/jweixin-1.2.2.js” ,html引入这个js文件，才能成功执行shareInfo2Wechat();
@param {String} args.image 微信分享出去后的小图片 
@param {String} args.title 微信分享出去的标题
@param {String} args.subTitle 微信分享出去后的小标题 
@param {String} args.linkUrl 微信分享出去后的url地址
*/
export const shareInfo2Wechat = function ({
    image,
    subTitle,
    title,
    linkUrl = location.href
}) {
    let options = {
        title: title, // 分享标题
        desc: subTitle, // 分享描述
        link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: image, // 分享图标
        success: function () {
            // 设置成功
        }
    },
        config = {
            debug: false,
            appId: '', // 必填，公众号的唯一标识
            timestamp: null, // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '', // 必填，签名
            // jsApiList: ["updateTimelineShareData","updateAppMessageShareData"] 
            // 必填，需要使用的JS接口列表
        },
        url = encodeURIComponent(window.location.origin + window.location.pathname + window.location.search);
    try{
        wx.ready(function () {
            wx.onMenuShareTimeline(options);
            wx.onMenuShareAppMessage(options);
        })
        wx.error(function (res) {
            console.log(res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
        getWxShareData(url).then(res => {
            if (res.data.code === 200) {
                wx.config(Object.assign(config, res.data.result));
            }
        })
    }catch(e){
        console.log('wx is not defined.');
        
    }
  
    // console.log(image, subTitle, title, linkUrl);
}



/* 微信支付接口
@param {Number} arguments.productId 商品id
@param {String} arguments.userId 拓词用户id
@returns {Promise} axios请求的Promise对象
 */
export const getPrepayInfo = function ({ productId, userId }) {
    return request({
        baseURL: "https://wx.towords.com",
        url: "/h5pay/get_prepay_info.do",
        data: { product_id: productId, user_id: userId },
        method: 'post',
    })
}



/* 
调用此接口打开“请在浏览器中打开” 遮罩层
*/
export const toggleToBrowserCue = function () {
    ~function dialogBox(opt) {
        var imageClassName = opt.imageClassName,
            image = opt.image
        var box = document.createElement('div');
        box.className = 'wx__dialog wx__dialog__bg';
        box.innerHTML += '<img class="' + imageClassName + '" src="' + image + '"/>'
        box.innerHTML += '</div>';
        box.addEventListener('click', function () {
            opt.cancel && opt.cancel(close);
        });
        box.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
        document.body.appendChild(box);
        function close() {
            box.style.animation = 'fadeOut .2s linear';
            window.setTimeout(function () {
                document.body.removeChild(box);
            }, 100)
        }
    }({
        image: 'https://official-web.oss-cn-beijing.aliyuncs.com/towords/avatars/wechat_bg.png',
        imageClassName: 'to__browser',
        cancel: function (close) {
            close && close();
        }
    })
}