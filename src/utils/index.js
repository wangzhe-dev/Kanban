/*
 * @Author: zwn7 943987243@qq.com
 * @Date: 2022-07-12 10:39:26
 * @LastEditors: xuhaonan 837561260@qq.com
 * @LastEditTime: 2022-08-01 15:19:23
 * @FilePath: /wutongse-screen/src/utils/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @param {string} url
 * @returns {Object}
 */
export const downloadFile = (response, fileName = "模板", fileType = "xls") => {
  const fileTypeMap = {
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  const blob = new Blob([response], { type: fileTypeMap[fileType] });
  const href = window.URL.createObjectURL(blob);
  const a = document.createElement("a"); // 创建a标签
  a.style.display = "none";
  a.href = href; // 指定下载链接
  a.download = fileName;
  document.body.appendChild(a);
  a.click(); // 触发下载s
  URL.revokeObjectURL(a.href); // 释放URL对象
  document.body.removeChild(a);
};

export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // console.log("reg", reg);
  var r = window.location.hash.substr(3).match(reg);
  // console.log("r", r);
  if (r != null) return unescape(r[2]);
  return null;
};

// 根据名称获取query参数
export const getQueryByName = (name) => {
  var url = window.location.href;
  if (url.indexOf("?") != -1) {
    var cs = url.split("?")[1]; //获取?之后的参数字符串
    var cs_arr = "";
    if (cs.indexOf("&") != -1) {
      cs_arr = cs.split("&");
    } else {
      cs_arr = [cs];
    }
  } else {
    return "";
  }
  var cs = {};
  for (var i = 0; i < cs_arr.length; i++) {
    //遍历数组，拿到json对象
    cs[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
  }
  // console.log("myCs............", cs);
  return cs[name];
};
/**
 * @description: 获取当前日期
 * @return {*}
 */
export const getCurrDate = () => {
  var date = new Date();
  var sep = "-";
  var year = date.getFullYear(); //获取完整的年份(4位)
  var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  var day = date.getDate(); //获取当前日
  if (month <= 9) {
    month = "0" + month;
  }
  if (day <= 9) {
    day = "0" + day;
  }
  var currentdate = year + sep + month + sep + day;
  return currentdate;
};
export const secondsFormat = (value) => {
  let result = parseInt(value);

  let h =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600);

  let m =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);

  let s =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60);

  let res = "";

  if (h !== "00") res += `${h}h`;

  if (m !== "00") res += `${m}m`;

  res += `${s}s`;

  return res;
};
/**
 * @description:
 * @param {*} value 数值
 * @param {*} fractionDigits 保留小数点后面几位
 * @return {*}
 */
 export const getSingleNum = (value, fractionDigits) => {
  return ((value * 10 ** fractionDigits) << 0) / 10 ** fractionDigits;
};
// 分钟转成 时分 
export const toHoursAndMinutes=(totalMinutes)=> {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;  
  return `${hours > 0?`${hours}h`:''}${minutes > 0?`${minutes}m`:''}`;
 
}
