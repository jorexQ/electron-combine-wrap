// import fs from "fs";
// import { TreeStorage, TypeName } from "../infrastructure/types";
// import {
//   RWLock,
//   LockOptions,
//   LockOptionsPromise,
//   CallBackMethodType
// } from "../infrastructure/rw-lock";
// type fileContentType<T extends {}> = string | Buffer | T;

// export class StorageFolder implements TreeStorage<fileContentType> {
//   private readonly _folderPath: string;
//   constructor(folderPath: string) {
//     this._folderPath = folderPath;
//   }

//   private parseFileContentType<T extends fileContentType>(
//     fileBuffer: Buffer,
//     typeStr: TypeName<fileContentType>
//   ): T {
//     switch (typeStr) {
//       case "string":
//         return <T>fileBuffer.toString();
//       case "buffer":
//         return <T>fileBuffer;
//       case "object":
//         return <T>JSON.parse(fileBuffer.toString());
//       default:
//         return <T>{};
//     }
//   }

//   private getParsePath(path: string): string {
//     return "";
//   }

//   private getRwLockProxy<T, T1>(
//     path: string
//   ): (method: CallBackMethodType<T, T1>, curScope: T) => T1 {
//     let rwLock = RWLock.getCurrent(path);
//     return (method, curScope) => {
//       let option: LockOptions<T, T1> = {
//         callBack: method,
//         scope: curScope,
//         timeout: 20000,
//         timeoutCallBack: () => null
//       };
//       return rwLock.syncRead(option);
//     };
//   }

//   public has(filePath: string): boolean {
//     let validPath = this.getParsePath(filePath);
//     return fs.existsSync(validPath);
//   }

//   public keys(): string[] {
//     throw new Error("Method not implemented.");
//   }

//   public hasTree(folderPath: string): boolean {
//     throw new Error("Method not implemented.");
//   }

//   public TreeKeys(): string[] {
//     throw new Error("Method not implemented.");
//   }

//   public getTree<T extends TreeStorage<fileContentType>>(
//     key: string,
//     typeStr: TypeName<fileContentType>
//   ): T {
//     throw new Error("Method not implemented.");
//   }

//   public get<T extends fileContentType>(
//     filePath: string,
//     typeStr: TypeName<fileContentType>
//   ): T {
//     let validPath = this.getParsePath(filePath);
//     let rwLockProxy = this.getRwLockProxy<null, T>(validPath);
//     let result = rwLockProxy(() => {
//       let fileBuffer = fs.readFileSync(validPath);
//       return this.parseFileContentType(fileBuffer, typeStr);
//     }, null);
//     return result;
//   }

//   public asyncGet<T extends fileContentType>(
//     filePath: string,
//     typeStr: TypeName<fileContentType>
//   ): Promise<T> {
//     let rwLock = RWLock.getCurrent(filePath);
//     let option: LockOptionsPromise<null, T> = {
//       callBack: () =>
//         new Promise<T>((resolve, reject) => {
//           fs.readFile(filePath, (ex, fileBuffer) => {
//             let returnValue: T = this.parseFileContentType(fileBuffer, typeStr);
//             resolve(returnValue);
//           });
//         }),
//       scope: null,
//       timeout: 20000,
//       timeoutCallBack: () => null
//     };
//     return rwLock.asyncRead(option);
//   }

//   public setTree<T extends TreeStorage<fileContentType>>(
//     key: string,
//     obj: T
//   ): void {
//     throw new Error("Method not implemented.");
//   }

//   public removeTree(key: string): void {
//     throw new Error("Method not implemented.");
//   }

//   public clearTree(): void {
//     throw new Error("Method not implemented.");
//   }

//   public getManyTree<T extends TreeStorage<fileContentType>>(
//     keys: string[],
//     typeStr: TypeName<fileContentType>
//   ): T[] {
//     throw new Error("Method not implemented.");
//   }

//   public set<T extends fileContentType>(filePath: string, obj: T): void {
//     throw new Error("Method not implemented.");
//   }

//   public asyncSet<T extends fileContentType>(
//     filePath: string,
//     obj: T
//   ): Promise<void> {
//     throw new Error("Method not implemented.");
//   }

//   public remove(filePath: string): void {
//     throw new Error("Method not implemented.");
//   }

//   public asyncRemove(filePath: string): Promise<void> {
//     throw new Error("Method not implemented.");
//   }

//   public clear(): void {
//     throw new Error("Method not implemented.");
//   }

//   public asyncClear(): Promise<void> {
//     throw new Error("Method not implemented.");
//   }

//   public getMany<T extends fileContentType>(filePath: string[]): T[] {
//     throw new Error("Method not implemented.");
//   }

//   public asyncGetMany<T extends fileContentType>(
//     filePath: string[]
//   ): Promise<T[]> {
//     throw new Error("Method not implemented.");
//   }
// }
