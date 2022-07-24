declare function copy(text: string, options?: any): boolean;

declare class Detector {
    _rules: {
        os: any[];
        browser: any[];
    };
    constructor(rules: any);
    _detect(name: string, expression: any, ua: string): {
        name: string;
        version: string;
        codename: string;
    };
    _parseItem(ua: string, patterns: any[], factory: any, detector: any): void;
    /**
     * parse ua
     * @param ua
     */
    parse(ua: string): any;
}
declare const ua: string;
declare const d: any;

declare const disableScroll: () => void;
declare const enableScroll: () => void;

/**
 * 解析转义之后的字符
 * "\\u2693\\uFE0F \\u89C4\\u5219\\u4E4B\\u5916"
 * ===>
 * '⚓️ 规则之外'
 */
declare const parseUnicode: (str: string) => string;

export { Detector, copy, d as detector, disableScroll, enableScroll, parseUnicode, ua };
