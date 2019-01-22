import { PathHelper } from "../infrastructure/file-helper";
import {
  GroupStorage,
  GroupStorageAsync,
  StorageResult
} from "./storage-types";

export type fileContentType<T extends {}> = string | Buffer | T;

export class StorageDir implements GroupStorage<fileContentType<{}>> {
  getAsyncStorage(): GroupStorageAsync<fileContentType<{}>> {
    throw new Error("Method not implemented.");
  }
  hasChildGroup(key: string): boolean {
    throw new Error("Method not implemented.");
  }
  ChildGroupKeys(): string[] {
    throw new Error("Method not implemented.");
  }
  getChildGroup(key: string): StorageResult<GroupStorage<fileContentType<{}>>> {
    throw new Error("Method not implemented.");
  }
  setChildGroup<T extends GroupStorage<fileContentType<{}>>>(
    key: string,
    obj: T
  ): void {
    throw new Error("Method not implemented.");
  }
  removeChildGroup(key: string): void {
    throw new Error("Method not implemented.");
  }
  clearChildGroup(): void {
    throw new Error("Method not implemented.");
  }
  getManyChildGroup(
    keys: string[]
  ): StorageResult<GroupStorage<fileContentType<{}>>[]> {
    throw new Error("Method not implemented.");
  }
  has(key: string): boolean {
    throw new Error("Method not implemented.");
  }
  keys(): string[] {
    throw new Error("Method not implemented.");
  }
  get<T extends fileContentType<{}>>(key: string): StorageResult<T> {
    throw new Error("Method not implemented.");
  }
  set<T extends fileContentType<{}>>(key: string, obj: T): void {
    throw new Error("Method not implemented.");
  }
  remove(key: string): void {
    throw new Error("Method not implemented.");
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  getMany<T extends fileContentType<{}>>(keys: string[]): StorageResult<T[]> {
    throw new Error("Method not implemented.");
  }
}

class StorageDirAsync implements GroupStorageAsync<fileContentType<{}>> {
  asyncHasChildGroup(key: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  asyncChildGroupKeys(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  asyncGetChildGroup(
    key: string
  ): Promise<StorageResult<GroupStorageAsync<fileContentType<{}>>>> {
    throw new Error("Method not implemented.");
  }
  asyncSetChildGroup<T extends GroupStorageAsync<fileContentType<{}>>>(
    key: string,
    obj: T
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  asyncRemoveChildGroup(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  asyncClearChildGroup(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  asyncGetManyChildGroup(
    keys: string[]
  ): Promise<StorageResult<GroupStorageAsync<fileContentType<{}>>[]>> {
    throw new Error("Method not implemented.");
  }
  asyncHas(key: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  asyncKeys(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  asyncGet<T extends fileContentType<{}>>(
    key: string
  ): Promise<StorageResult<T>> {
    throw new Error("Method not implemented.");
  }
  asyncSet<T extends fileContentType<{}>>(key: string, obj: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  asyncRemove(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  asyncClear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  asyncGetMany<T extends StorageResult<fileContentType<{}>>>(
    keys: string[]
  ): Promise<StorageResult<T[]>> {
    throw new Error("Method not implemented.");
  }
}
