/*
 * @Author: zhangyang
 * @Date: 2023-01-06 17:20:44
 * @LastEditTime: 2023-01-06 17:21:58
 * @Description:
 */
import { YoungStorage } from '.';
export class YoungLocalStorage extends YoungStorage {
  /**
   * 存储
   * @param key 键名
   * @param value 键值
   * @param exp 过期时间(天)，默认 1 天后
   */
  public set<T>(key: string, value: T, exp = 1) {
    localStorage.setItem(
      key,
      JSON.stringify({
        exp: new Date(Date.now() + 1000 * 3600 * 24 * exp).getTime(),
        data: value,
      }),
    );
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public get<T>(key: string): T | undefined {
    const res = localStorage.getItem(key);
    if (!res) {
      return undefined;
    }
    try {
      const { exp, data } = JSON.parse(res) as { exp: number; data: T };
      if (Date.now() < exp) {
        return data;
      } else {
        this.remove(key);
        return undefined;
      }
    } catch (error) {
      this.remove(key);
      return undefined;
    }
  }
}
