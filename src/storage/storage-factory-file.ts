// import {
//   RWLock,
//   LockOptions,
//   LockOptionsPromise
// } from "../infrastructure/rw-lock";
// import fs from "fs";
// import { StorageFactory } from "./storage-factory";
// import { Storage, TreeStorage, TypeName } from "../infrastructure/types";

// export class StorageFactoryFile
//   implements StorageFactory<StorageFile, fileContentType> {
//   private _folderPath: string;
//   //private StorageFolder

//   constructor(folderPath: string) {
//     this._folderPath = folderPath;
//   }

//   private async asyncGetFileContent(): Promise<Buffer> {}

//   private getFileContent(): Buffer {
//     let rwLock = RWLock.getCurrent(this._filePath);
//     let option: LockOptions<null, Buffer> = {
//       callBack: () => fs.readFileSync(this._filePath),
//       scope: null,
//       timeout: 20000,
//       timeoutCallBack: () => null
//     };
//     return rwLock.syncRead(option);
//   }

//   private setFileContent() {}

//   private async asyncSetFileContent(): Promise<void> {}

//   public async asyncGetStorage(): Promise<StorageFile> {
//     let buffer = await this.asyncGetFileContent();
//   }

//   public getStorage(): StorageFile {
//     return;
//   }

//   public static async asyncGetStorage(filePath: string): Promise<StorageFile> {
//     let factory = new StorageFactoryFile(filePath);
//     return factory.asyncGetStorage();
//   }

//   public static getStorage(filePath: string): StorageFile {
//     let factory = new StorageFactoryFile(filePath);
//     return factory.getStorage();
//   }
// }


