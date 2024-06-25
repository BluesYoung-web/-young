import { type YoungImageViewerConf } from '..';
import { getThumbnails } from 'video-metadata-thumbnails';
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
 * @param args 透传
 * @returns Promise<{
    blob: Blob | null;
    currentTime: number;
}[]>
 */
export declare function getVideoCover(v: string | Blob, args: Parameters<typeof getThumbnails>['1']): Promise<{
    blob: Blob | null;
    currentTime: number;
}[]>;
