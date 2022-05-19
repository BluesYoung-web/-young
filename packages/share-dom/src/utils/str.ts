/*
 * @Author: zhangyang
 * @Date: 2022-05-19 14:44:29
 * @LastEditTime: 2022-05-19 16:47:04
 * @Description: 字符串处理
 */
/**
 * 解析转义之后的字符
 * "\\u2693\\uFE0F \\u89C4\\u5219\\u4E4B\\u5916"
 * ===>
 * '⚓️ 规则之外'
 */
const parseUnicode = (str: string) => {
  const srcArr = str.match(/(\\u[0-9A-F]+\s?)+/img) || [];
  for (const name of srcArr) {
    const tp = name.split(/\s/);
    let s = '';
    for (const char of tp) {
      s += String.fromCharCode(...char.split('\\u').filter((c) => c).map((c) => +`0x${c}`))
    }
    str = str.replace(name, s);
    console.log(str)
  }
  return str;
}