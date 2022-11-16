interface Logo {
    src: string;
    logoRadius?: number;
    logoSize?: number;
    borderRadius?: number;
    borderColor?: string;
    borderSize?: number;
    bgColor?: string;
    /**
     * 是否启用跨域
     */
    crossOrigin?: string | boolean;
}
interface NodeQrCodeOptions {
    margin?: number;
    color?: {
        dark?: string;
        light?: string;
    };
    errorCorrectionLevel?: string;
    scale?: any;
}
interface BaseOptions {
    content: string;
    width?: number;
    nodeQrCodeOptions?: NodeQrCodeOptions;
    logo?: Logo | string;
    canvas?: HTMLCanvasElement;
    image?: HTMLImageElement;
    download?: boolean | Function;
    downloadName?: string;
}

declare class YoungQRCodeLogo {
    static version: string;
    option: BaseOptions;
    ifCanvasDrawed: boolean;
    ifImageCreated: boolean;
    private defaultOption;
    constructor(option: BaseOptions);
    toCanvas(): Promise<void>;
    toImage(): Promise<void>;
    downloadImage(name: string): Promise<void>;
    getCanvas(): Promise<HTMLCanvasElement>;
}

export { YoungQRCodeLogo as default };
