/*
 * @Author: zhaijs
 * @Date: 2021-04-21 16:25:34
 * @LastEditTime: 2022-07-25 18:10:41
 * @Description: 请填写简介
 */
import moment from "moment";

const formatDttm = (time) => {
  if (!time) return;
  return moment(Number(time)).format("YYYY-MM-DD HH:mm:ss");
};

const formatDt = (time) => {
  if (!time) return;
  return moment(Number(time)).format("YYYY/MM/DD");
};

const formatTm = (time) => {
  if (!time) return;
  return moment(Number(time)).format("HH:mm:ss");
};

const formatDttmm = (time) => {
  if (!time) return;
  return moment(Number(time)).format("YYYY-MM-DD HH:mm:ss");
};

const formatDttmmYMD = (time) => {
  // 2020年5月24日 17:35
  if (!time) return;
  return moment(Number(time)).format("YYYY [年] MM [月] DD [日] HH:mm:ss");
};
/**
 * @description: 把时间间隔转换为hh:mm:ss
 * @param {*} time: 时间戳 type: seconds秒 milliseconds毫秒
 * @return {*}
 */
const formatDuration = (time, format = "HH:mm:ss", type = "seconds") => {
  if (!time) return;
  const currentTime = moment.duration(time, type);
  return moment({
    h: currentTime.hours(),
    m: currentTime.minutes(),
    s: currentTime.seconds(),
  }).format(format);
};
export {
  formatDttm,
  formatDt,
  formatTm,
  formatDttmm,
  formatDttmmYMD,
  formatDuration,
};
