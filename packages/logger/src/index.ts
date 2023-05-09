/*
 * @Author: zhangyang
 * @Date: 2023-05-09 12:03:55
 * @LastEditTime: 2023-05-09 15:07:40
 * @Description:
 */
import consola, { type LogObject } from 'consola';
import { defu } from 'defu';

export type YoungLoggerConfig = {
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

const DEFAULT_CONFIG: Required<YoungLoggerConfig> = {
  forceExit: {
    sync: true,
    async: false,
  },
  wrapConsole: true,
  tag: 'young_logger',
  reporter: ({ level, type, tag, args, date }, __log) => {
    __log(
      `${Math.floor(date.getTime() / 1000)} ${type} ${tag} - - - - - - - ${JSON.stringify(args)}`,
    );
  },
};

export const useYoungLogger = (conf: YoungLoggerConfig = {}) => {
  const config = defu(conf, DEFAULT_CONFIG) as Required<YoungLoggerConfig>;

  const __log = console.log;
  process.on('uncaughtException', (error) => {
    console.error('sync error: ', error.toString());
    config.forceExit.sync && process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    console.error('async error: ', error.toString());
    config.forceExit.async && process.exit(1);
  });

  const logger = consola.create({
    formatOptions: {
      compact: true,
    },
    reporters: [
      {
        log: (args) => config.reporter(args, __log),
      },
    ],
  });

  logger.withTag(config.tag);

  config.wrapConsole && logger.wrapConsole();

  return {
    logger,
    consola,
  };
};
