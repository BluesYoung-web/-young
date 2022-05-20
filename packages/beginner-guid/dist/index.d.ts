declare type VNode = any;
declare type Selector = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | `.${string}` | `#${string}` | `[${string}]`;
declare type Content = string | (() => VNode);
declare type GuidItem = {
    el: Selector;
    des: Content;
};
declare type GuidOptions = {
    /**
     * 实例化之后立即开始
     * @default false
     */
    immdiate?: boolean;
    /**
     * 强制进行新手引导，无法直接关闭
     * @default false
     */
    force?: boolean;
};

declare type CurrStep = {
    visible: boolean;
    index: number;
    step: GuidItem;
};
declare class YoungBeginnerGuid extends HTMLElement {
    nums: number;
    force: boolean;
    root: ShadowRoot;
    constructor(nums: number, force: boolean);
    render(item: CurrStep): void;
}
declare class YoungBeginnerGuidController {
    index: number;
    immdiate: boolean;
    force: boolean;
    guids: GuidItem[];
    el: YoungBeginnerGuid;
    constructor(guids: GuidItem[], options?: GuidOptions);
    show(index?: number, visible?: boolean): void;
    next(): void;
    prev(): void;
    hide(): void;
    destory(): void;
}

export { YoungBeginnerGuidController, YoungBeginnerGuid as default };
