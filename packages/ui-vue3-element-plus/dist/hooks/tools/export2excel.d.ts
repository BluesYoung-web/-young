interface ExportParams {
    filename: string;
    data: any[];
    header: any[];
}
export declare const export_json_to_excel: ({ header, data, filename }: ExportParams) => void;
export {};
