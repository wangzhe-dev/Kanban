import request from '@/config/request.js'
import { Storage } from '@/utils/setStorage.js'

export function general(params) {
  const { chartId, data } = params
  return request({
    url: '?chartId=' + chartId + '&token=' + Storage.getItem('params') + '&_t=' + new Date().getTime(),
    method: 'post',
    data
  })
}
