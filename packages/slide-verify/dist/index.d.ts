import * as lit from 'lit';
import { LitElement } from 'lit';

declare type Slide = {
    canWidth: Number;
    canHeight: Number;
    puzzleWidth: Number;
};
declare type Callback = () => void;
declare class YoungImageSliderElement extends LitElement {
    bgImgArr: string[];
    index: number;
    puzzleX: number;
    puzzleY: number;
    canMove: boolean;
    canWidth: any;
    canHeight: any;
    offset: number;
    isPass: boolean;
    isShow: boolean;
    isAnimate: boolean;
    success: Callback;
    puzzleWidth: any;
    cap: any;
    handle: any;
    btn: any;
    constructor(success: Callback, slider: Slide, index?: number);
    static styles: lit.CSSResult;
    firstUpdated(): void;
    show(): void;
    hide(): void;
    slideMove(e: any): void;
    slideStop(e: any): void;
    init(): void;
    createIndex(): void;
    openMove(): void;
    closeMove(): void;
    randomNum(minNum: any, maxNum: any): number;
    render(): lit.TemplateResult<1>;
}
declare class YoungImgSlider {
    el: YoungImageSliderElement;
    constructor(success: Callback, slider?: Slide);
    show(): void;
    hide(): void;
}

export { YoungImageSliderElement, YoungImgSlider };
