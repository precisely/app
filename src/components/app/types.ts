// JSONData, with optional additional allowed type:
export type JSONData<T = null> = null | boolean | string | number | T | { [key: string]: JSONData<T> } | JSONData<T>[];

export type ContinueCallback = (data?: JSONData, permit?: JSONData) => Promise<void>;

type NotA<T, R> = T extends R ? never : T
type NotB<T, R> = R extends T ? never : T
type Excluding<T, R> = NotA<T, R> & NotB<T, R>

export interface ChatProps {
  id?: string,
  type: string,
  permit?: JSONData,
  continueCallback: ContinueCallback
  [key: string]: JSONData<Function>,
};


// TODO: uncomment this to see that there is a problem with our Typescript environment
//       this code works fine in a Typescript playground. Why does it not work for us??
//       https://www.typescriptlang.org/play?#code/C4TwDgpgBAogHgYwDYFcAmEByKlIIYBGSEAPACoA0UA0lBHMBAHZoDOUA1hCAPYBmUTDybZchYuQB8kqAF5Bw0fiKkyMgGRQA3gCgo+qAG0OUAJZMaAXQC0AfgBcsRKgwkhInMolrjlqk08oAB8oFBYIPnMINEkdAF8dHT4whGBTYSgACzxWAEFccipaekYWdi5eATUACj0DHgIAK0dKOv0K1jIeAGFMiAQOR2pDSx0ASkcGxrN2eGR0LE9xVSKZXQMoACcIYBRNiymoAEJZeQDcNo2odU1Dk-kwjEimaMuNm85uTp6+gYA6CAANwgmxA1RMshkU18x1OUHOSGutyaMPuoXCz2iYwA3PFEqBIFAAGI8HhybSXPikhxQVjATbmADmuI2BDwm0cAQAtgQQcF4Z5cQliMAoFSeI4SWT5Fo4lAcvKmCBcUlSX82Zs-sAeABlelM6o4qAAemNYrVGpmTAA5KK8IC8KYvNA+ttEqYBNUjtk8rhquKqIZrRrrZYxmMKRtgJlNjwAO6wTaxzaGoWJcV-cXYk1mukMpiM-mPCJRNCqnjq9nZ00Cnkg92e705fJIf2kwPW8Wh8ORgzR2MJmBJngpnF48uZ0nV3P6gs6IA
//       See related comment in RunUI.tsx
//
// export type ExcludeNullable<T, K extends keyof NonNullable<T>> = NonNullable<T> & {
//   [k in K]-?: Exclude<NonNullable<T>[k], null | undefined>
// }

// export function hasAll<T, K extends keyof NonNullable<T>>(
//   obj: T,
//   keysToCheck: K[]
// ): obj is ExcludeNullable<T, K> {
//   return obj !== null && obj !== undefined
//       && keysToCheck.every(k => obj![k] !== null && obj![k] !== undefined);
// }

// Also why does this not work????
// Described here: https://fettblog.eu/typescript-hasownproperty/
// export function hasOwnProperty<X extends {}, Y extends PropertyKey>
//   (obj: X, prop: Y): obj is X & Record<Y, unknown> {
//   return obj.hasOwnProperty(prop)
// }