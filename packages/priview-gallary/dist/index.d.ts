import * as lit from 'lit';
import { LitElement } from 'lit';

declare class YoungPreviewGallary extends LitElement {
    direction: 'x' | 'y';
    'show-icon': boolean;
    'after-icon': string;
    'after-icon-disabled': string;
    baseEl: HTMLDivElement;
    gap: number;
    'item-width': any;
    'display-num': number;
    width: number;
    num: number;
    index: number;
    disablePrev: boolean;
    disableNext: boolean;
    firstUpdated(): void;
    prev(): void;
    next(): void;
    render(): lit.TemplateResult<1>;
}
declare class YoungPreviewGallaryItem extends LitElement {
    render(): lit.TemplateResult<1>;
}

export { YoungPreviewGallary, YoungPreviewGallaryItem };
