interface SdkConfig {
    serverUrl: string;
    clientId: string;
    appName: string;
    organizationName: string;
    redirectPath?: string;
}

declare type OnMessage = (e: MessageEvent) => Promise<void> | void;

declare const defaultCmd = "I want to login";
declare type Config$1 = {
    onmsg_cbk: OnMessage;
};
declare class Master {
    constructor(conf: Config$1, cmd?: string);
}

declare type Config = {
    master_url: string;
    onmsg_cbk: (args: any) => Promise<void>;
};
declare class Slave {
    private cmd;
    constructor(conf: Config, cmd?: string);
    init(fallback?: () => void): void;
}

declare type Operate = 'login' | 'register';
declare class YoungAuth {
    static hasAuthed(): boolean;
    private sdk;
    constructor(conf?: Partial<SdkConfig>);
    init(operate?: Operate): void;
}

export { Master, Slave, YoungAuth, defaultCmd };
