interface SdkConfig {
    serverUrl: string;
    clientId: string;
    appName: string;
    organizationName: string;
    redirectPath?: string;
}

declare type Operate = 'login' | 'register';
declare class YoungAuth {
    static hasAuthed(): boolean;
    private sdk;
    constructor(conf?: Partial<SdkConfig>);
    init(operate?: Operate): void;
}

export { YoungAuth };
