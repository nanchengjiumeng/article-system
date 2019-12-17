import request from '../../utils/request'

/* 
根据userId 获取用户信息
@param {String} userId
@return {Promise} axios的promise对象
*/
export const getUserInfoByUserId = function (userId) {
    return request({
        baseURL: 'https://api.towords.com',
        url: '/stat/get_user_info.do?user_id=' + userId,
        method: 'post',
    })
}

/* 
根据phoneNumber获取用户信息(userid...)
@param {String} phoneNumber 手机号码
@return {Promise} axios的promise对象
*/
export const getUserInfoByPhoneNumber = function (phoneNumber) {
    return request({
        baseURL: 'https://api.towords.com',
        url: '/stat/get_user_info.do?mobile_phone=' + phoneNumber,
        method: 'post',
    })
}

/* 
获取微信jssdk的配置信息
@return {Promise} axios的promise对象
*/
export const getWxShareData = function (url) {
    var nonceStr = Math.random()
        .toString(36)
        .slice(-8),
        timestamp = new Date().getTime();
    return request({
        baseURL: "https://wx.towords.com",
        url: `/access/get_signature.do?url=${url}&timestamp=${timestamp}&nonce_str=${nonceStr}`,
        method: 'post',
    }).then(res => {
        return {
            timestamp,
            nonceStr,
            signature: res.data.result
        }
    })
}






