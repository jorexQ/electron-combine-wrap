import { TypeName } from "../infrastructure/types";
import {
  TryDoResult,
  tryDoStatus,
  succResult,
  failResult,
  errResult
} from "../infrastructure/try-do-types";

export interface StorageResult<TValue> extends TryDoResult<TValue> {
  storageName: string;
}

export class StorageResultHelper {
  private readonly _storageName: string;
  constructor(storageName: string) {
    this._storageName = storageName;
  }

  public succ<TValue>(
    value: TValue,
    code?: string,
    msg?: string
  ): StorageResult<TValue> {
    let result = succResult(value, code, msg) as StorageResult<TValue>;
    result.storageName = this._storageName;
    return result;
  }
  public fail<TValue>(code: string, msg?: string): StorageResult<TValue> {
    let result = failResult(code, msg) as StorageResult<TValue>;
    result.storageName = this._storageName;
    return result;
  }
  public err<TValue, TError extends Error>(
    error: TError,
    code?: string,
    msg?: string
  ): StorageResult<TValue> {
    let result = errResult(error, code, msg) as StorageResult<TValue>;
    result.storageName = this._storageName;
    return result;
  }
}

export interface StorageKey {
  has(key: string): boolean;
  keys(): string[];
}

export interface StorageAsyncKey {
  asyncHas(key: string): Promise<boolean>;
  asyncKeys(): Promise<string[]>;
}

export interface StorageValue<Textends> {
  get<T extends Textends>(key: string, type: any): StorageResult<T>;
  set<T extends Textends>(key: string, obj: T): void;
  remove(key: string): void;
  clear(): void;
  getMany<T extends Textends>(keys: string[], type: any): StorageResult<T[]>;
}

export interface StorageAsyncValue<TValue> {
  asyncGet<T extends TValue>(key: string, type: any): Promise<StorageResult<T>>;
  asyncSet<T extends TValue>(key: string, obj: T): Promise<void>;
  asyncRemove(key: string): Promise<void>;
  asyncClear(): Promise<void>;
  asyncGetMany<T extends StorageResult<TValue>>(
    keys: string[],
    type: any
  ): Promise<StorageResult<T[]>>;
}

export interface StandardStorage<TValue>
  extends StorageKey,
    StorageValue<TValue> {
  getAsyncStorage(): StandardStorageAsync<TValue>;
}

export interface StandardStorageAsync<TValue>
  extends StorageAsyncKey,
    StorageAsyncValue<TValue> {}

export interface GroupStorage<TValue> extends StorageKey, StorageValue<TValue> {
  getAsyncStorage(): GroupStorageAsync<TValue>;
  hasChildGroup(key: string): boolean;
  ChildGroupKeys(): string[];
  getChildGroup(key: string): StorageResult<GroupStorage<TValue>>;
  setChildGroup<T extends GroupStorage<TValue>>(key: string, obj: T): void;
  removeChildGroup(key: string): void;
  clearChildGroup(): void;
  getManyChildGroup(keys: string[]): StorageResult<GroupStorage<TValue>[]>;
}

export interface GroupStorageAsync<TValue>
  extends StorageAsyncKey,
    StorageAsyncValue<TValue> {
  asyncHasChildGroup(key: string): Promise<boolean>;
  asyncChildGroupKeys(): Promise<string[]>;
  asyncGetChildGroup(
    key: string
  ): Promise<StorageResult<GroupStorageAsync<TValue>>>;
  asyncSetChildGroup<T extends GroupStorageAsync<TValue>>(
    key: string,
    obj: T
  ): Promise<void>;
  asyncRemoveChildGroup(key: string): Promise<void>;
  asyncClearChildGroup(): Promise<void>;
  asyncGetManyChildGroup(
    keys: string[]
  ): Promise<StorageResult<GroupStorageAsync<TValue>[]>>;
}
