import request from '@/config/request.js'

/* 动态传递url 调用接口 */
const workingHoursStatistics = (data, url) => {
    return request({
        url: url,
        method: 'post',
        data
    })
}

const getPublicRequest = (url) => {
    return request({
        url: url,
        method: 'get',
    })
}
const postPublicRequest = (url, data) => {
    return request({
        url: url,
        method: 'post',
        data
    })
}

export {
    workingHoursStatistics,
    getPublicRequest,
    postPublicRequest
}