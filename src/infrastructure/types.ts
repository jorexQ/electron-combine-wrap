export type BaseEventKey =
  | "resize"
  | "move"
  | "devtools-opened"
  | "devtools-closed"
  | "close"
  | "closed"
  | "maximize"
  | "unmaximize"
  | "minimize"
  | "restore"
  | "enter-full-screen"
  | "leave-full-screen";


export interface StateConfig {
  fullScreen?: boolean;
  devToolsOpened?: boolean;
  bounds?: Electron.Rectangle;
  isMaximized?: boolean;
  displayBounds?: Electron.Rectangle;
}

export interface ExtensionConfig {
  rootPath?: string;
  extensionTokens?: string[];
}


export type Readonly<T> = { readonly [P in keyof T]: T[P] };

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : T extends Buffer
  ? "buffer"
  : "object";
