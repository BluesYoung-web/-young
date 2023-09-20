import { type PropType } from 'vue';
import 'vue-cropper/dist/index.css';
export type YoungUploadFn = (file: File) => string;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string[]>;
        required: true;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
    type: {
        type: PropType<"file" | "image">;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    uploadFn: {
        type: PropType<YoungUploadFn>;
        required: true;
    };
    cropper: {
        type: BooleanConstructor;
        default: boolean;
    };
    aspt: {
        type: PropType<[number, number]>;
        default: () => number[];
    };
    cropperAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<string[]>;
        required: true;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
    type: {
        type: PropType<"file" | "image">;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    uploadFn: {
        type: PropType<YoungUploadFn>;
        required: true;
    };
    cropper: {
        type: BooleanConstructor;
        default: boolean;
    };
    aspt: {
        type: PropType<[number, number]>;
        default: () => number[];
    };
    cropperAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: "file" | "image";
    limit: number;
    accept: string;
    cropper: boolean;
    aspt: [number, number];
    cropperAttrs: Record<string, any>;
}>;
export default _default;
