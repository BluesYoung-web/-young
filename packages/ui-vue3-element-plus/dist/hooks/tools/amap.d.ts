declare global {
    interface Window {
        _AMapSecurityConfig: any;
        AMap: any;
    }
}
export declare function initAMapSDK(key: string, secret: string, url?: string): Promise<void>;
