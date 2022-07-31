/*
 * @Author: zhangyang
 * @Date: 2022-07-02 14:36:54
 * @LastEditTime: 2022-07-30 16:09:03
 * @Description: 
 */
export type GetParamsSign<T> = T extends (arg: infer P) => void ? P : never;
export declare namespace Young {
  type Cbk = {
    success: (e: any) => void;
    fail: (e: any) => void;
  };
  type MasterReturnParams = {
    ok: boolean;
    data: any;
  };
};