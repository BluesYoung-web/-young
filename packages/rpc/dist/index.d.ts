declare type GetParamsSign<T> = T extends (arg: infer P) => void ? P : string;
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

declare class YoungRPCSlave<R extends Record<string, any>, T extends keyof R = keyof R> {
    port: MessagePort;
    private masterWindow;
    private handlersMap;
    constructor();
    shakeHands(): void;
    trigger(cmd: T, params?: Record<string, any>): void;
    setHandler(cmd: T, { success, fail }: Young.Cbk): (params?: GetParamsSign<R[T]>) => void;
}

declare type MasterCbk<R extends Record<string, any>, T extends keyof R = keyof R> = (params: GetParamsSign<R[T]>) => any | Promise<any>;
declare class YoungRPCMaster<R extends Record<string, any>, T extends keyof R = keyof R> {
    private port;
    private handlersMap;
    constructor();
    setHandler(cmd: T, cbk: MasterCbk<R, T>): void;
    close(): void;
    sendMsg(data: Young.MasterReturnParams & {
        cmd: T;
    }): void;
}

export { YoungRPCMaster, YoungRPCSlave };
