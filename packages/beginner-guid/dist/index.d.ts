declare type Selector = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | `.${string}` | `#${string}` | `[${string}]`;
declare type GuidItem = {
    el: Selector;
    title: string;
    content: string;
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
    handler: YoungBeginnerGuidController;
    root: ShadowRoot;
    constructor(handler: YoungBeginnerGuidController);
    changeVisiable(item: CurrStep): void;
    changeDialog(item: CurrStep, dialog: HTMLElement): void;
    changeContent(item: CurrStep, dialog: HTMLElement): void;
    changeButton(item: CurrStep, dialog: HTMLElement): void;
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

export { YoungBeginnerGuid, YoungBeginnerGuidController };
