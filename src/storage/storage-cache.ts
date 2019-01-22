// import { SyncStorage } from '../infrastructure/types';
// import { JsonStoreByCache } from './storage-json';

// interface CacheContext {
//     timeout: number,
//     actionDateTime: Date,
//     content: any,
// }

// /**
//  * 
//  * 
//  * @export
//  * @class StorageCache
//  * @implements {SyncStorage}
//  */
// export class StorageCache implements SyncStorage {

//     private readonly _cacheWrapHasKey: string;

//     /**
//      * Creates an instance of StorageCache.
//      * @param {string} cacheWrapHasKey 
//      * @memberof StorageCache
//      */
//     constructor(cacheWrapHasKey: string) {
//         this._cacheWrapHasKey = cacheWrapHasKey;
//     }

//     /**
//      * 
//      * 
//      * @private
//      * @param {string} key 
//      * @param {CacheContext} cacheContext 
//      * @returns {boolean} 
//      * @memberof StorageCache
//      */
//     private checkTimeOut(key: string, cacheContext: CacheContext): boolean {
//         let actionDateTime = cacheContext.actionDateTime;
//         let differenceValue = new Date().getTime() - actionDateTime.getTime();
//         return differenceValue > cacheContext.timeout;
//     }

//     /**
//      * 
//      * 
//      * @private
//      * @param {*} content 
//      * @param {number} timeout 
//      * @returns {CacheContext} 
//      * @memberof StorageCache
//      */
//     private getContext(content: any, timeout: number): CacheContext {
//         return {
//             content: content,
//             actionDateTime: new Date(),
//             timeout: timeout
//         };
//     }
    
//     /**
//      * 
//      * 
//      * @private
//      * @param {string} jsonStr 
//      * @returns {CacheContext} 
//      * @memberof StorageCache
//      */
//     private paresContext(jsonStr: string): CacheContext {
//         let jsonObj = JSON.parse(jsonStr);
//         return jsonObj as CacheContext;
//     }

//     /**
//      * 
//      * 
//      * @template T 
//      * @param {string} key 
//      * @returns {T} 
//      * @memberof StorageCache
//      */
//     get<T extends any>(key: string): T {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * 
//      * 
//      * @template T 
//      * @param {string} key 
//      * @param {T} obj 
//      * @param {(number | null)} [timeout=10000] 
//      * @memberof StorageCache
//      */
//     set<T extends any>(key: string, obj: T, timeout: number | null = 10000): void {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * 
//      * 
//      * @param {string} key 
//      * @returns {boolean} 
//      * @memberof StorageCache
//      */
//     has(key: string): boolean {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * 
//      * 
//      * @returns {string[]} 
//      * @memberof StorageCache
//      */
//     keys(): string[] {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * 
//      * 
//      * @param {string} key 
//      * @memberof StorageCache
//      */
//     remove(key: string): void {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * 
//      * 
//      * @memberof StorageCache
//      */
//     clear(): void {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * 
//      * 
//      * @template T 
//      * @param {string[]} keys 
//      * @returns {T[]} 
//      * @memberof StorageCache
//      */
//     getMany<T extends any>(keys: string[]): T[] {
//         throw new Error("Method not implemented.");
//     }
// }