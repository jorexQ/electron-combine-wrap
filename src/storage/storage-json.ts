import { isType, nameof, tryJsonParse } from "../infrastructure/base-tool";
import { tryDoStatus } from "../infrastructure/try-do-types";
import {
  StorageResult,
  StorageValue,
  StorageResultHelper
} from "./storage-types";

export class StorageJson implements StorageValue<any> {
  private readonly _srcJsonStr: string;
  private readonly _jsonObject: { [key: string]: any };
  private readonly _resultHelper: StorageResultHelper = new StorageResultHelper(
    nameof(StorageJson)
  );

  constructor(jsonStr: string) {
    this._srcJsonStr = jsonStr;
    let tryDoResult = tryJsonParse(jsonStr);
    if (tryDoResult.status == tryDoStatus.success) {
      this._jsonObject = tryDoResult.result;
    } else {
      throw new TypeError("");
    }
  }

  get<T extends any>(key: string, type: any): StorageResult<T> {
    let getValue = this._jsonObject[key];
    if (!getValue) return this._resultHelper.fail("0000");
    if (isType<T>(getValue, type)) {
      return this._resultHelper.succ(getValue);
    } else {
      return this._resultHelper.fail("0000");
    }
  }

  set<T extends any>(key: string, obj: T): void {
    throw new Error("Method not implemented.");
  }
  remove(key: string): void {
    throw new Error("Method not implemented.");
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  getMany<T extends any>(keys: string[], type: any): StorageResult<T[]> {
    throw new Error("Method not implemented.");
  }
}
