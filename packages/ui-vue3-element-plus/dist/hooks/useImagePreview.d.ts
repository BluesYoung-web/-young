import { type YoungImageViewerConf } from '..';
/**
 * 基于 ElImageViewer 的命令式图片预览
 * @param conf
 * @param zIndex
 */
export declare function useImagePreview(conf: YoungImageViewerConf, zIndex?: number): void;
/**
 * 基于 ElOverlay 的命令式视频预览
 */
export declare function useVideoPreview(src: string, zIndex?: number): void;
/**
 * 基于 ElOverlay 的命令式音频预览
 */
export declare function useAudioPreview(src: string, zIndex?: number): void;
/**
 * 获取视频封面
 * @param v 视频地址 or File
 * @param seek 取第几秒的
 * @returns Promise<string>
 */
export declare function getVideoCover(v: string | Blob, seek?: number): Promise<string>;
/**
 * base64 转 file
 * @param dataurl base64
 * @param filename 文件名
 * @returns File
 */
export declare function dataURLtoFile(dataurl: string, filename: string): File;
