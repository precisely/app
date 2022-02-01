// JSONData, with optional additional allowed type:
export type JSONData<T = null> = null | boolean | string | number | T | { [key: string]: JSONData<T> } | JSONData<T>[];
