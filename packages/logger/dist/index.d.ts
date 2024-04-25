import * as consola_dist_core from 'consola/dist/core';
import { LogObject } from 'consola';

type YoungLoggerConfig = {
    /**
     * 是否强制退出
     */
    forceExit?: {
        /**
         * 同步错误是否退出进程
         * @default true
         */
        sync?: boolean;
        /**
         * 异步错误是否退出进程
         * @default false
         */
        async?: boolean;
    };
    /**
     * 是否劫持 console
     * @default true;
     */
    wrapConsole?: boolean;
    /**
     * tag
     * @default 'young_logger'
     */
    tag?: string;
    /**
     * 格式化函数
     */
    reporter?: (logObj: LogObject, __log: Console['log']) => void;
};
declare const useYoungLogger: (conf?: YoungLoggerConfig) => {
    logger: consola_dist_core.ConsolaInstance;
    consola: consola_dist_core.ConsolaInstance;
};

export { YoungLoggerConfig, useYoungLogger };
