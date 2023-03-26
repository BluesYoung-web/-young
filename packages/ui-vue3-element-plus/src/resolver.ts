/*
 * @Author: zhangyang
 * @Date: 2023-03-25 19:29:31
 * @LastEditTime: 2023-03-25 20:30:36
 * @Description:
 */
import pkg from '../package.json';

/**
 * module, name, alias
 */
type ImportsMap = Record<string, (string | [string, string])[]>;

export function YoungApisResolver(): ImportsMap {
  // ! 为了精简包体，暂时使用手动填写，每次新增方法时，手动在此处补充
  return {
    [pkg.name]: [
      'useAutoLoad',
      'useFormMode',
      'useExport2Excel',
      'useVerifyCode',
      'useImagePreview',
      'useKeyUp',
      'useQuery',
      'useRemoteSearch',
    ],
  };
}

interface ComponentsResolver {
  (name: string): {
    name: string;
    from: string;
  } | void;
}

export function YoungComponentsResolver(): ComponentsResolver {
  // where `componentName` is always CapitalCase
  return (componentName) => {
    if (componentName.startsWith('Young')) {
      return {
        name: componentName,
        from: pkg.name,
      };
    }
  };
}
