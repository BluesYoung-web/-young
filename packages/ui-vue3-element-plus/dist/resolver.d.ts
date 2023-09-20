export declare function YoungApisResolver(): Promise<{
    from: any;
    imports: string[];
}>;
export declare function YoungComponentsResolver(): Promise<(componentName: any) => {
    name: any;
    from: any;
} | undefined>;
