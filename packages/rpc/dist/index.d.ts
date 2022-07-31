declare type GetParamsSign<T> = T extends (arg: infer P) => void ? P : never;
declare namespace Young {
    type Cbk = {
        success: (e: any) => void;
        fail: (e: any) => void;
    };
    type MasterReturnParams = {
        ok: boolean;
        data: any;
    };
}

declare class YoungRPCSlave<R extends Record<string, any>> {
    private shakeHandsMsg;
    port: MessagePort;
    private masterWindow;
    private handlersMap;
    constructor(shakeHandsMsg?: string);
    shakeHands(): void;
    trigger<T extends keyof R>(cmd: T, params?: GetParamsSign<R[T]>): void;
    setHandler<T extends keyof R>(cmd: T, { success, fail }?: Young.Cbk): (params: GetParamsSign<R[T]>) => void;
}

declare type MasterCbk<R extends Record<string, any>, T extends keyof R> = (params: GetParamsSign<R[T]>) => any | Promise<any>;
declare type MasterHandlers<R extends Record<string, any>> = {
    [P in keyof R]?: MasterCbk<R, P>;
};
declare class YoungRPCMaster<R extends Record<string, any>> {
    private port;
    private handlersMap;
    constructor(shakeHandsMsg?: string);
    setHandler<T extends keyof R>(cmd: T, cbk: MasterHandlers<R>[T]): void;
    close(): void;
    sendMsg(data: Young.MasterReturnParams & {
        cmd: keyof R;
    }): void;
}

export { YoungRPCMaster, YoungRPCSlave };
