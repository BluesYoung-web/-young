/*
 * @Author: zhangyang
 * @Date: 2023-01-06 17:21:30
 * @LastEditTime: 2023-01-06 17:21:31
 * @Description:
 */
export abstract class YoungStorage {
  /**
   * 存储
   * @param key 键名
   * @param value 键值
   * @param exp 过期时间(天)，默认 1 天后
   */
  abstract set<T>(key: string, value: T, exp?: number): void;

  abstract remove(key: string): void;

  abstract get<T>(key: string): T | undefined;
}
