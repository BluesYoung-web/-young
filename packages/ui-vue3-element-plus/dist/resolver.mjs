/*
 * @Author: zhangyang
 * @Date: 2023-09-19 17:49:31
 * @LastEditTime: 2023-09-19 17:49:31
 * @Description: 
 */
import { readFile } from "fs/promises";
export async function YoungApisResolver() {
  const file = await readFile(new URL("../package.json", import.meta.url), { encoding: "utf-8" });
  const pkg = JSON.parse(file);
  return {
    from: pkg.name,
    imports: [
      "useAutoLoad",
      "useFormMode",
      "useExport2Excel",
      "useVerifyCode",
      "useImagePreview",
      "useKeyUp",
      "useQuery",
      "useRemoteSearch",
      "TableHeadItem"
    ]
  };
}
export async function YoungComponentsResolver() {
  const file = await readFile(new URL("../package.json", import.meta.url), { encoding: "utf-8" });
  const pkg = JSON.parse(file);
  return (componentName) => {
    if (componentName.startsWith("Young")) {
      return {
        name: componentName,
        from: pkg.name
      };
    }
  };
}
