declare const deepClone: <T extends unknown = any>(obj: T) => T;

declare const isArray: (arr: any) => boolean;
declare const isObject: (arr: any) => boolean;
declare const isNumber: (num: any) => boolean;
declare const isString: (str: any) => boolean;
declare const isBoolean: (bool: any) => boolean;
declare const isMap: (bool: any) => boolean;
declare const isWeakMap: (bool: any) => boolean;
declare const isSet: (bool: any) => boolean;
declare const isWeakSet: (bool: any) => boolean;
declare const isArrayBuffer: (bool: any) => boolean;
declare const isRegExp: (bool: any) => boolean;
declare const isFunction: (bool: any) => boolean;
declare const isSymbol: (bool: any) => boolean;
declare const isNull: (n: any) => boolean;
declare const isUndefined: (u: any) => boolean;

/**
 * 加入财务分隔符
 */
declare const formatCurrency: (num: string | number, withFlag?: boolean) => string;
/**
 * 手机号隐藏中间4位
 */
declare const telMasaike: (str: string | number, mid?: string) => string;
/**
 * 姓名隐藏中间值
 */
declare const nameMasaike: (str: string, mid?: string) => string;
/**
 * 身份证号隐藏出生年月日
 */
declare const idMasaike: (str: string, mid?: string) => string;

declare function formatDate(number: number, format?: string): string;
/**
 * 获取上个月的第一天
 */
declare const lastMonthDay: () => Date;
/**
 * 获取这个月的第一天
 */
declare const thisMonthDay: () => Date;
/**
 * 昨天 0:0:0 到今天 23:59:59
 */
declare const recentDay: () => [Date, Date];
/**
 * 上个月 1号 到今天 23:59:59
 */
declare const recentMonth: () => [Date, Date];
/**
 * 这个月 1号 到今天 23:59:59
 */
declare const thisMonth: () => [Date, Date];
/**
 * yyyymmdd -> yyyy-mm-dd
 */
declare const ymdParse: (daytte: number | string, sep?: string) => string;
/**
 * 获取明天
 */
declare const nextDay: (h?: number, m?: number, s?: number) => Date;
/**
 * el-date-picker的快捷方式
 */
declare const shortcuts: {
    text: string;
    value: Date[];
}[];
/**
 * el-date-picker的禁选日期
 */
declare const isDisabledDate: (d: Date) => boolean;
/**
 * 获取某月的开始日和结束日
 */
declare const getDateRange: (year: number, month: number) => string[];

declare const sleep: (n: number) => Promise<unknown>;
/**
 * 解析转义之后的字符串
 * @param str
 */
declare const encodedStrParse: (str: string) => string;
/**
 * 安全解析 JSON 字符串
 * @param {string} str
 */
declare const safeJsonParse: <T extends unknown = any>(str: string, exp?: any) => T;
declare const formatUrl: (url: string) => string;

/**
 * 验证是否为合法的 email
 * @param {string} email
 */
declare const isEmail: (email: string) => boolean;
/**
 * 验证是否为合法的手机号
 * @param {string} tel
 */
declare const isMobile: (tel: string) => boolean;
/**
 * 验证是否为合法的 http url
 * @param {string} url
 */
declare const isHttpUrl: (url: string) => boolean;
/**
 * 验证是否为合法的 websocket url
 * @param {string} url
 */
declare const isWebSocketUrl: (url: string) => boolean;
/**
 * 验证是否为合法的日期格式
 * @param {string} date
 */
declare const isDate: (date: string | number | Date) => boolean;
/**
 * 验证是否为合法的ISO日期格式
 * @param {string} date
 */
declare const isISODate: (date: string) => boolean;
/**
 * 是否为十进制数
 * @param {number} num
 */
declare const isDecimal: (num: string | number) => boolean;
/**
 * 是否为整数
 * @param {number} num
 */
declare const isInteger: (num: string | number) => boolean;
/**
 * 是否为合法的身份证
 * @param {number} id
 */
declare const isIdCard: (id: string | number) => boolean;
/**
 * 是否为合法车牌号
 * @param {string} value
 */
declare const isLicensePlate: (value: string) => boolean;
/**
 * 是否为中文（不包含标点符号）
 * @param {string} str
 */
declare const isChinese: (str: string) => boolean;
/**
 * 是否为英文字母
 * @param {string} str
 */
declare const isLetter: (str: string) => boolean;
/**
 * 是否为合法的座机号码
 * @param {string} value
 */
declare const isLandline: (value: string) => boolean;
/**
 * 是否为 JSON 字符串
 * @param {string} str
 */
declare const isJsonStr: (str: any) => boolean;
/**
 * 判断是否为合法的财务数字(千分符字符串)
 * @param {string} str
 */
declare const isCurrencyStr: (str: string) => boolean;
/**
 * 判断是否为微信内置浏览器
 */
declare const isWeChat: () => boolean;
/**
 * 判断是否为 iOS 浏览器
 */
declare const isiOS: () => boolean;
/**
 * 判断是否为安卓浏览器
 */
declare const isAndroid: () => boolean;

/**
 * 滚动到顶部
 */
declare const scrollToTop: () => void;
/**
 * 滚动到底部
 */
declare const scrollToBottom: () => void;
/**
 * 滚动到指定元素的区域
 */
declare const smoothScroll: (element: keyof HTMLElementTagNameMap) => void;
/**
 * 获取可视窗口宽高
 * @returns [clientWidth, clientHeight]
 */
declare const getClientHeight: () => number[];
/**
 * 窗口全屏
 */
declare const toFullScreen: () => Promise<void>;
/**
 * 退出全屏
 */
declare const exitFullscreen: () => Promise<void>;
/**
 * 禁用滚动
 * @param target default window
 */
declare const disableScroll: (target?: Window & typeof globalThis) => void;
/**
 * 启用滚动
 * @param target default window
 */
declare const enableScroll: (target?: Window & typeof globalThis) => void;

/**
 * 随机 16 进制颜色
 */
declare const randomHexColorCode: () => string;
/**
 * RGB 转 16进制
 */
declare const RGBToHex: (r: number, g: number, b: number) => string;
/**
 * 16进制 转 RGB
 */
declare const hexToRGB: (hex: string) => string;
/**
 * 3 位 扩充为 6位
 */
declare const extendHex: (shortHex: string) => string;
/**
 * RGB 转 对象
 */
declare const toRGBObject: (rgbStr: string) => {
    red: number;
    green: number;
    blue: number;
};
/**
 * RGB 转 数组
 */
declare const toRGBArray: (rgbStr: string) => number[];
/**
 * RGB 转 HSB
 */
declare const RGBToHSB: (r: number, g: number, b: number) => number[];
/**
 * HSB 转 RGB
 */
declare const HSBToRGB: (h: number, s: number, b: number) => number[];
/**
 * RGB 转 HSL
 */
declare const RGBToHSL: (r: number, g: number, b: number) => number[];
/**
 * HLS 转 RGB
 */
declare const HSLToRGB: (h: number, s: number, l: number) => number[];

declare type Simplify<T> = {
    [P in keyof T]: T[P];
};
/**
 * 设置可选属性
 * T 接口
 * K 属性(联合类型)
 */
declare type SetOptional<T, K extends keyof T> = Simplify<Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>;
/**
 * 设置必选属性
 * T 接口
 * K 属性(联合类型)
 */
declare type setRequired<T, K extends keyof T> = Simplify<Required<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>;
/**
 * 筛选特定类型的属性
 * T 接口
 * K 要筛选的属性的类型
 */
declare type ConditionalPick<T, K> = {
    [P in keyof T as T[P] extends K ? P : never]: T[P];
};
/**
 * 为已有函数类型增加指定类型的参数
 * T 函数类型
 * A 参数类型
 */
declare type AppendArgument<F, A> = F extends (...args: infer Args) => infer Return ? (x: A, ...args: Args) => Return : never;
/**
 * 数组(元组)扁平化
 */
declare type NaiveFlat<T extends any[]> = {
    [P in keyof T]: T[P] extends any[] ? T[P][number] : T[P];
}[number];
/**
 * 严格类型(不一致直接报错)
 * T1 接口
 * T2 属性(联合类型)
 */
declare type Exclusive<T1, T2 extends T1> = {
    [K in keyof T2]: K extends keyof T1 ? T2[K] : never;
};
/**
 * 确保数组(元组)非空
 * T 类型
 */
declare type NotEmpty<T> = [T, ...T[]];
/**
 * 使用指定分隔符拼接字符串数组(元组)
 * Arr 数组(元组)
 * Separator 分隔符
 */
declare type JoinStrArray<Arr extends string[], Separator extends string> = Arr extends [
    infer A,
    ...infer B
] ? `${A extends string ? A : ''}${B extends [string, ...string[]] ? `${Separator}${JoinStrArray<B, Separator>}` : ''}` : '';
/**
 * 对于字符串字面量类型进行去空格处理
 */
declare type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
declare type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;
declare type Trim<V extends string> = TrimLeft<TrimRight<V>>;
/**
 * 比较两个类型是否相等
 */
declare type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
/**
 * 获取数组(元组)第一个元素的类型
 */
declare type Head<T extends any[]> = T extends [infer H, ...infer R] ? H : never;
/**
 * 获取数组(元组)除第一个元素之外的剩余元素
 */
declare type Tail<T extends any[]> = T extends [infer H, ...infer R] ? R : [];
/**
 * Unshift
 */
declare type Unshift<T extends any[], E> = [E, ...T];
/**
 * Shift
 */
declare type Shift<T extends any[]> = T extends [infer F, ...infer R] ? R : [];
/**
 * Push
 */
declare type Push<T extends any[], E> = [...T, E];
/**
 * Includes
 */
declare type Includes<T extends any[], E> = T extends [first: infer F, ...args: infer R] ? IsEqual<F, E> extends true ? true : Includes<R, E> : false;
/**
 * 联合类型转交叉类型
 */
/**
 * 将联合类型转为对应的交叉函数类型
 * @template U 联合类型
 */
declare type UnionToInterFunction<U> = (U extends any ? (k: () => U) => void : never) extends (k: infer I) => void ? I : never;
/**
 * 获取联合类型中的最后一个类型
 * @template U 联合类型
 */
declare type GetUnionLast<U> = UnionToInterFunction<U> extends {
    (): infer A;
} ? A : never;
/**
 * 在元组类型中前置插入一个新的类型（元素）；
 * @template Tuple 元组类型
 * @template E 新的类型
 */
declare type Prepend<Tuple extends any[], E> = [E, ...Tuple];
/**
 * 联合类型转元组类型；
 * @template Union 联合类型
 * @template T 初始元组类型
 * @template Last 传入联合类型中的最后一个类型（元素），自动生成，内部使用
 */
declare type UnionToTuple<Union, T extends any[] = [], Last = GetUnionLast<Union>> = {
    0: T;
    1: UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;
}[[Union] extends [never] ? 0 : 1];
declare type TupleToIntersection<T extends any[]> = T extends [infer F, ...infer U] ? U extends [] ? F : F & TupleToIntersection<U> : never;
declare type UnionToIntersection<U> = TupleToIntersection<UnionToTuple<U>>;
/**
 * 获取对象类型中所有的可选属性
 */
declare type OptionalKeys<T> = NonNullable<{
    [key in keyof T]: undefined extends T[key] ? key : never;
}[keyof T]>;
declare type FirstAsArray<T extends any[]> = T extends [...infer A, infer B, infer C] ? A extends [] ? T extends [...infer A, infer B] ? A : never : T extends [...infer A, infer B] ? FirstAsArray<A> : never : T;
/**
 * 函数类型柯里化
 */
declare type Curry<F extends (...args: any[]) => any, P extends any[] = Parameters<F>, R = ReturnType<F>> = P extends [infer A, infer B, ...infer C] ? P extends [infer A, ...infer B] ? Curry<F, FirstAsArray<P>, Curry<F, B, R>> : never : (...args: P) => R;
/**
 * Merge
 * F2 优先级高于 F1
 */
declare type Merge<F1, F2> = {
    [K in keyof (F1 & F2)]: K extends keyof F2 ? F2[K] : K extends keyof F1 ? F1[K] : never;
};
/**
 * 至少包含一个给定的属性
 */
declare type RequireAtLeastOne<ObjectType, KeysType extends keyof ObjectType = keyof ObjectType> = KeysType extends unknown ? ObjectType & {
    [K in KeysType]-?: ObjectType[K];
} : never;
/**
 * 移除索引签名
 */
declare type RemoveIndexSignature<T> = {
    [k in keyof T as string extends k ? never : number extends k ? never : k]: T[k];
};
/**
 * 移除部分属性的 readonly 修饰符
 * 默认全部移除
 */
declare type Mutable<T, Keys extends keyof T = keyof T> = {
    -readonly [k in Keys]: T[k];
} & Pick<T, Exclude<keyof T, Keys>>;
/**
 * 判断是否为联合类型
 */
declare type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : never;
/**
 * 判断是否为 never
 */
declare type IsNever<T> = [T] extends [never] ? true : false;
/**
 * 数组(元组)翻转
 */
declare type Reverse<T extends Array<any>, R extends Array<any> = []> = Head<T> extends never ? R : Reverse<Tail<T>, Unshift<R, Head<T>>>;
/**
 * 字符串分割
 */
declare type Split<S extends string, Delimiter extends string> = S extends `${infer First}${Delimiter}${infer Rest}` ? [First, ...Split<Rest, Delimiter>] : [S];
declare type Str2Tuple<S extends string> = S extends `${infer First}[${infer Second}]` ? [First, Second] : [S];
/**
 * 属性访问转数组(元组)
 */
declare type ToPath<S extends string> = S extends `${infer A}.${infer R}` ? [...Str2Tuple<A>, ...ToPath<R>] : [S];
/**
 * 链式调用进行类型扩展，实现动态类型推导
 */
declare type Chainable<T = {}> = {
    option<V, S extends string>(key: S, value: V): Chainable<T & {
        [P in keyof {
            S: S;
        } as `${S}`]: V;
    }>;
    get(): Simplify<T>;
};
/**
 * Repeat
 */
declare type Repeat<T, C extends number, R extends Array<any> = []> = R['length'] extends C ? R : Repeat<T, C, Push<R, T>>;
/**
 * RepeatString
 */
declare type RepeatString<T extends string, C extends number, R extends string = '', A extends any[] = []> = A['length'] extends C ? R : RepeatString<T, C, `${R}${T}`, Push<A, T>>;
/**
 * 数字字符串转数字
 */
declare type ToNumber<T extends string, S extends any[] = [], L extends number = S['length']> = `${L}` extends T ? L : ToNumber<T, [...S, 1]>;

export { AppendArgument, Chainable, ConditionalPick, Curry, Exclusive, FirstAsArray, GetUnionLast, HSBToRGB, HSLToRGB, Head, Includes, IsEqual, IsNever, IsUnion, JoinStrArray, Merge, Mutable, NaiveFlat, NotEmpty, OptionalKeys, Prepend, Push, RGBToHSB, RGBToHSL, RGBToHex, RemoveIndexSignature, Repeat, RepeatString, RequireAtLeastOne, Reverse, SetOptional, Shift, Simplify, Split, Str2Tuple, Tail, ToNumber, ToPath, Trim, TrimLeft, TrimRight, TupleToIntersection, UnionToInterFunction, UnionToIntersection, UnionToTuple, Unshift, deepClone, disableScroll, enableScroll, encodedStrParse, exitFullscreen, extendHex, formatCurrency, formatDate, formatUrl, getClientHeight, getDateRange, hexToRGB, idMasaike, isAndroid, isArray, isArrayBuffer, isBoolean, isChinese, isCurrencyStr, isDate, isDecimal, isDisabledDate, isEmail, isFunction, isHttpUrl, isISODate, isIdCard, isInteger, isJsonStr, isLandline, isLetter, isLicensePlate, isMap, isMobile, isNull, isNumber, isObject, isRegExp, isSet, isString, isSymbol, isUndefined, isWeChat, isWeakMap, isWeakSet, isWebSocketUrl, isiOS, lastMonthDay, nameMasaike, nextDay, randomHexColorCode, recentDay, recentMonth, safeJsonParse, scrollToBottom, scrollToTop, setRequired, shortcuts, sleep, smoothScroll, telMasaike, thisMonth, thisMonthDay, toFullScreen, toRGBArray, toRGBObject, ymdParse };
