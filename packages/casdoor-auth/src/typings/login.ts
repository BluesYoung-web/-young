/*
 * @Author: zhangyang
 * @Date: 2022-05-25 11:49:01
 * @LastEditTime: 2022-05-25 11:49:01
 * @Description: 
 */
export type OnMessage = (e: MessageEvent) => Promise<void> | void;