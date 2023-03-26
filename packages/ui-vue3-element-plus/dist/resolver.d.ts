/**
 * module, name, alias
 */
type ImportsMap = Record<string, (string | [string, string])[]>;
declare function YoungApisResolver(): ImportsMap;
interface ComponentsResolver {
    (name: string): {
        name: string;
        from: string;
    } | void;
}
declare function YoungComponentsResolver(): ComponentsResolver;

export { YoungApisResolver, YoungComponentsResolver };
