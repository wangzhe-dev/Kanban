/* 常量文件 */
import { getQueryByName, getQueryString } from '../utils';
// headers

export const HEADERS = {
  'tenant_id': getQueryByName('id') || getQueryString('id') || localStorage.getItem("tenant_id") || process.env.VUE_APP_TENANT,
  'X-Access-Token': getQueryByName('token') || getQueryString('token') || localStorage.getItem("token") || process.env.VUE_APP_TOKEN,
  'shareId': getQueryByName('shareId') || getQueryString('shareId') || localStorage.getItem("shareId") || "",
  'extractionCode': localStorage.getItem("extractionCode") || getQueryByName('extractionCode') || getQueryString('extractionCode') || "1",
}
