import moment from 'moment'
/***
 * 当前时间
 */
export function getCurrentDate() {
	return new Date();
}
/***
 * 今天的开始时间 start 开始时间
 */
export function getBeginToday(val) {
	let nowDate = getCurrentDate()
	let y = nowDate.getFullYear()
	let m = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)
	let d = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
	let start = val =='start'?' 00:00:00':' 23:59:59'
	let now = y + '-' + m + '-' + d + start
	return now
}
/***
 * 本周的第一天时间
 */
export function getBeginWeek() {
	var currentDate = getCurrentDate();
	var week = currentDate.getDay();

	//一天的毫秒数
	var millisecond = 1000 * 60 * 60 * 24;
	//减去的天数
	var minusDay = week != 0 ? week - 1 : 6;
	//本周 周一
	var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
	var nowDate = new Date(monday)
	let y = nowDate.getFullYear()
	let m = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)
	let d = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
	let now = y + '-' + m + '-' + d + ' 00:00:00'
	return now
}
/***
 * 本周的第一天和最后一天
 */
export function getCurrentWeek() {
	const start = moment().weekday(1).format('YYYY-MM-DD'); //本周一
	const end = moment().weekday(7).format('YYYY-MM-DD'); //本周日
	return [start, end]
}

/***
 * 本月的第一天时间
 */
export function getBeginMonth() {
	var nowDate = getCurrentDate();
	let y = nowDate.getFullYear()
	let m = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)
	let now = y + '-' + m + '-' + '01' + ' 00:00:00'
	return now;
};



/**
 * 日期范围工具类
 */
export function startTime(time) {
	const nowTimeDate = new Date(time)
	nowTimeDate.setHours(0, 0, 0, 0)
	let now = nowTimeDate.getYear() + '-' + (nowTimeDate.getMonth() + 1) + '-' + nowTimeDate.getDate() + ' 00:00:00'
	return now
}

export function endTime(time) {
	const nowTimeDate = new Date(time)
	return nowTimeDate.setHours(23, 59, 59, 999)
}





/***
 * 昨天开始时间
 */
export function getBeginYesterday() {
	return startTime(getBeginToday() - 24 * 60 * 60 * 1000);
}


/***
 * 昨天结束时间时间
 */
export function getEndYesterday() {
	return endTime(getBeginToday() - 24 * 60 * 60 * 1000);
}



/***
 * 上周的开始
 */
export function getBeginLastWeek() {
	var currentDate = getCurrentDate();
	var first = currentDate.getDate() - currentDate.getDay() - 6;
	var startDate = new Date(currentDate.setDate(first));
	return startTime(startDate);
}

/***
 * 上周的结束
 */
export function getEndLastWeek() {
	var currentDate = getCurrentDate();
	var first = currentDate.getDate() - currentDate.getDay() - 6;
	var last = first + 6;
	var endDate = new Date(currentDate.setDate(last));
	return endTime(endDate);
}



/***
 * 本月的最后一天时间
 */
export function getEndMonth() {
	//获取当前时间
	var currentDate = getCurrentDate();
	var fullYear = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
	var endOfMonth = new Date(fullYear, month, 0);
	return endTime(endOfMonth);
};

/***
 * 上月的第一天时间
 */
export function getBeginLastMonth() {
	//获取当前时间
	var currentDate = getCurrentDate();
	//获得当前月份0-11
	var currentMonth = currentDate.getMonth();
	//获得当前年份4位年
	var currentYear = currentDate.getFullYear();
	//获得上一个月的第一天
	var priorMonthFirstDay = getPriorMonthFirstDay(currentYear, currentMonth);
	return priorMonthFirstDay;
};

/***
 * 上月的最后一天时间
 */
export function getEndLastMonth() {
	//获取当前时间
	var currentDate = getCurrentDate();
	//获得当前月份0-11
	var currentMonth = currentDate.getMonth();
	//获得当前年份4位年
	var currentYear = currentDate.getFullYear();

	//当为12月的时候年份需要加1
	//月份需要更新为0 也就是下一年的第一个月
	if (currentMonth == 11) {
		currentYear++;
		currentMonth = 0; //就为
	} else {
		//否则只是月份增加,以便求的下一月的第一天
		currentMonth++;
	}

	//一天的毫秒数
	var millisecond = 1000 * 60 * 60 * 24;
	//求出上月的最后一天
	var lastDay = new Date(getBeginMonth().getTime() - millisecond);

	return endTime(lastDay);
};

/**
 * 返回上一个月的第一天Date类型
 * @param year 年
 * @param month 月
 **/
export function getPriorMonthFirstDay(year, month) {
	//年份为0代表,是本年的第一月,所以不能减
	if (month == 0) {
		month = 11; //月份为上年的最后月份
		year--; //年份减1
		return new Date(year, month, 1);
	}
	//否则,只减去月份
	month--;
	return new Date(year, month, 1);;
}


export const second = (value) => {
    let theTime = parseInt(value);  // 秒
    let middle  = 0;                // 分
    let hour    = 0;                // 小时
    if(theTime > 60) {
        middle  = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(middle > 60) {
            hour   = parseInt(middle/60);
            middle = parseInt(middle%60);
        }
    }
    let result = ""+parseInt(theTime)+"秒";
    if(middle > 0) {
        result = ""+parseInt(middle)+"分"+result;
    }
    if(hour> 0) {
        result = ""+parseInt(hour)+"小时"+result;
    }
    return result;
}
