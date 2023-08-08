/*
 * @Author: zhangyang
 * @Date: 2021-03-22 11:44:01
 * @LastEditTime: 2023-08-07 17:00:34
 * @Description: 时间处理
 */
export function formatDate(number: number, format: string = 'Y-M-D h:m:s') {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  const returnArr = [];

  const date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (const i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i] + '');
  }
  return format;
}

//数据转化
function formatNumber(n: number) {
  let temp = n.toString();
  return temp[1] ? temp : '0' + temp;
}
/**
 * 获取上个月的第一天
 */
export const lastMonthDay = (): Date => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  if (month === 0) {
    d.setFullYear(year - 1);
    d.setMonth(11);
  } else {
    d.setMonth(month - 1);
  }
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * 获取这个月的第一天
 */
export const thisMonthDay = (): Date => {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * 昨天 0:0:0 到今天 23:59:59
 */
export const recentDay = (): [Date, Date] => {
  const start = new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start.getTime() + 1000 * 60 * 60 * 24);
  end.setHours(23, 59, 59);
  return [start, end];
};

/**
 * 上个月 1号 到今天 23:59:59
 */
export const recentMonth = (): [Date, Date] => [lastMonthDay(), recentDay()[1]];

/**
 * 这个月 1号 到今天 23:59:59
 */
export const thisMonth = (): [Date, Date] => [thisMonthDay(), recentDay()[1]];

/**
 * yyyymmdd -> yyyy-mm-dd
 */
export const ymdParse = (daytte: number | string, sep = '-') => {
  let str = String(daytte).split('');
  str.splice(4, 0, sep);
  str.splice(7, 0, sep);
  return str.join('');
};
/**
 * 获取明天
 */
export const nextDay = (h = 0, m = 0, s = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(h, m, s);
  return d;
};

/**
 * el-date-picker的快捷方式
 */
export const shortcuts = [
  {
    text: '今天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      return [start, end];
    })(),
  },
  {
    text: '昨天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      return [start, end];
    })(),
  },
  {
    text: '本周',
    value: (() => {
      const end = new Date();
      const start = new Date();
      //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
      var weekday = start.getDay() || 7;
      //往前算（weekday-1）天，年份、月份会自动变化
      start.setDate(start.getDate() - weekday + 1);
      return [start, end];
    })(),
  },
  {
    text: '上周',
    value: (() => {
      let myDate = new Date();
      let weekDate = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000); // 计算开始时间用
      let weekDate2 = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000); // 计算结束时间用

      let day = weekDate.getDay();
      let time = weekDate.getDate() - day + (day === 0 ? -6 : 1);

      let startDate = new Date(weekDate.setDate(time));
      let endDate = new Date(weekDate2.setDate(time + 6));
      return [startDate, endDate];
    })(),
  },
  {
    text: '本月',
    value: (() => {
      const end = new Date();
      const start = new Date();
      start.setDate(1);
      start.setHours(0);
      start.setSeconds(0);
      start.setMinutes(0);
      return [start, end];
    })(),
  },
  {
    text: '上月',
    value: (() => {
      let dayMSec = 24 * 3600 * 1000;
      let today = new Date();
      let lastMonthFirstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      //得到本月第一天
      let nowMonthFirstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      //得到上一个月的最后一天的毫秒值
      let lastMonthLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;
      let lastMonthLastDay = new Date(lastMonthLastDayMSec);
      return [lastMonthFirstDay, lastMonthLastDay];
    })(),
  },
  {
    text: '最近7天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      return [start, end];
    })(),
  },
  {
    text: '最近30天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    })(),
  },
];

/**
 * el-date-picker的禁选日期
 */
export const isDisabledDate = (d: Date) => {
  const now = new Date().setHours(23, 59, 59);
  const e = d.getTime();
  return e > now;
};

/**
 * 获取某月的开始日和结束日
 */
export const getDateRange = (year: number, month: number) => {
  let dateStart = new Date(year, month - 1, 1);
  let dateEnd = new Date(year, month, 0);
  // 包含便捷补零
  return [
    dateStart.getDate().toString().padStart(2, '0'),
    dateEnd.getDate().toString().padStart(2, '0'),
  ];
};

/**
 * 0 -> 00:00:00
 * 86399 -> 23:59:59
 */
export function secondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

/**
 * 00:00:00 -> 0
 * 23:59:59 -> 86399
 */
export function timeToSeconds(time: string) {
  const [hours, minutes, seconds] = time.split(':').map(Number);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds;
}