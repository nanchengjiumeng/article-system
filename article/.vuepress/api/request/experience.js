import request from '../../utils/request'

/* 
获取心得列表数据
@param {Number} topicId 拓词话题的id
@return {Promise} axios的promise对象
*/
export const getExperienceList = function ({ topicId, expId }) {
    var data = {
        topic_id: topicId,
        user_id: 's15600503490707'
    }
    if (expId && expId > 0) {
        data.exp_id = expId;
    }

    return request({
        baseURL: 'https://api.towords.com',
        url: '/experience/get_topic_exp_list.do',
        method: 'post',
        data
    })
    // ?topic_id=' + topicId + '&user_id=s15600503490707'
    // &exp_id=' + expId +
}