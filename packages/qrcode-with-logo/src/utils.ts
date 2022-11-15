/*
 * @Author: zhangyang
 * @Date: 2022-11-15 11:45:00
 * @LastEditTime: 2022-11-15 11:45:00
 * @Description: 
 */

export const promisify = (f: Function): Function => {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function(err: object, result: object) {
        if (err) reject(err);
        else resolve(result);
      });
      f.apply(null, args);
    });
  };
};
