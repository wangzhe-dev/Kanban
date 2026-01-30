import request from '@/config/request.js'
import { Storage } from "@/utils/setStorage.js";

export function login(data) {
    return request({
        url   : wuUrl + '/o/oauth/token?access_token='+Storage.getItem('access_token'),
        method: 'post',
        data
    })
}
