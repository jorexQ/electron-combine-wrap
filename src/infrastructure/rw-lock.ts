import { SyncWaiter } from "./sync-waiter";
import { isPromise } from "./base-tool";

enum FileActionType {
  Read = 0,
  Write = 1
}

//
type QueueMethodType = () => void;

//
export type CallBackMethodType<T, T1> = (
  this: T,
  releaseLockMethod: () => void
) => T1;

//
export type CallBackMethodTypePromise<T, T1> = (
  this: T,
  releaseLockMethod: () => void
) => Promise<T1>;

export interface LockOptions<T, T1> {
  callBack: CallBackMethodType<T, T1>;
  scope: T;
  timeout: number;
  timeoutCallBack: () => void;
}

export interface LockOptionsPromise<T, T1> {
  callBack: CallBackMethodTypePromise<T, T1>;
  scope: T;
  timeout: number;
  timeoutCallBack: () => void;
}

/**
 *
 *
 * @export
 * @class RWLock
 */
export class RWLock {
  /**
   *
   *
   * @private
   * @static
   * @type {RWLock}
   * @memberof RWLock
   */
  private static _defaultInstance: RWLock = new RWLock();

  /**
   *
   *
   * @private
   * @static
   * @type {Map<string, RWLock>}
   * @memberof RWLock
   */
  private static _mapInstance: Map<string, RWLock> = new Map<string, RWLock>();

  /**
   * -1 为正在写
   * >0 为有人在读
   * @private
   * @type {number}
   * @memberof RWLock
   */
  private _readers: number = 0;

  /**
   *
   *
   * @private
   * @type {Array<QueueMehodType>}
   * @memberof RWLock
   */
  private _awaitExecuteQueue: Array<QueueMethodType> = new Array<
    QueueMethodType
  >();

  /**
   * Creates an instance of RWLock.
   * @memberof RWLock
   */
  private constructor() {}

  /**
   *
   *
   * @static
   * @param {string} [key='']
   * @returns {RWLock}
   * @memberof RWLock
   */
  public static getCurrent(key: string = ""): RWLock {
    if (key === "") return this._defaultInstance;
    let instance: RWLock;

    if (this._mapInstance.has(key)) {
      let tempInstance = this._mapInstance.get(key);
      if (!tempInstance) {
        instance = new RWLock();
        this._mapInstance.set(key, instance);
      } else {
        instance = tempInstance;
      }
    } else {
      instance = new RWLock();
      this._mapInstance.set(key, instance);
    }
    return instance;
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberof RWLock
   */
  public checkIsLocking(action: FileActionType): boolean {
    if (action === FileActionType.Read) {
      return this._readers < 0 || this._awaitExecuteQueue.length > 0;
    } else if (action === FileActionType.Write) {
      return this._readers > 0 || this._awaitExecuteQueue.length > 0;
    } else {
      throw new TypeError();
    }
  }

  /**
   *
   *
   * @param {FileActionType} action
   * @memberof RWLock
   */
  public releaseLock(action: FileActionType): void {
    if (action === FileActionType.Read) {
      this._readers--;
      if (this._awaitExecuteQueue.length > 0) {
        this._awaitExecuteQueue[0]();
      }
    } else if (action === FileActionType.Write) {
      this._readers = 0;
      if (this._awaitExecuteQueue.length > 0) {
        this._awaitExecuteQueue[0]();
      }
    } else {
      throw new TypeError();
    }
  }

  /**
   *
   *
   * @template T
   * @template T1
   * @param {LockOptions<T, T1>} option
   * @returns {T1}
   * @memberof RWLock
   */
  public syncRead<T, T1 extends any>(option: LockOptions<T, T1>): T1 {
    let readContent = {};

    this._awaitExecuteQueue.push(() => {
      this._readers++;
      this._awaitExecuteQueue.shift();
      readContent = option.callBack.call(option.scope, () =>
        this.releaseLock(FileActionType.Read)
      );
    });

    let syncWaiter = new SyncWaiter(option.timeout, () =>
      this.checkIsLocking(FileActionType.Read)
    );
    syncWaiter.run(
      () => {
        if (this._awaitExecuteQueue.length > 0) {
          this._awaitExecuteQueue[0]();
        }
      },
      () => {
        this._awaitExecuteQueue.shift();
        if (option.timeoutCallBack) option.timeoutCallBack.call(option.scope);
      }
    );

    return <T1>readContent;
  }

  /**
   *
   *
   * @template T
   * @param {LockOptions<T, void>} option
   * @memberof RWLock
   */
  public syncWrite<T>(option: LockOptions<T, void>): void {
    this._awaitExecuteQueue.push(() => {
      this._readers = -1;
      this._awaitExecuteQueue.shift();
      option.callBack.call(option.scope, () =>
        this.releaseLock(FileActionType.Write)
      );
    });

    let syncWaiter = new SyncWaiter(option.timeout, () =>
      this.checkIsLocking(FileActionType.Write)
    );
    syncWaiter.run(
      () => {
        if (this._awaitExecuteQueue.length > 0) {
          this._awaitExecuteQueue[0]();
        }
      },
      () => {
        this._awaitExecuteQueue.shift();
        if (option.timeoutCallBack) option.timeoutCallBack.call(option.scope);
      }
    );
  }

  /**
   *
   *
   * @template T
   * @template T1
   * @param {LockOptions<T, T1>} option
   * @returns {Promise<T1>}
   * @memberof RWLock
   */
  public async asyncRead<T, T1 extends any>(
    option: LockOptionsPromise<T, T1>
  ): Promise<T1> {
    if (this.checkIsLocking(FileActionType.Read)) {
      return new Promise<T1>((resolve, reject) => {
        this._awaitExecuteQueue.push(() => {
          this._readers++;
          this._awaitExecuteQueue.shift();
          let readContentPromise: Promise<T1> = option.callBack.call(
            option.scope,
            () => this.releaseLock(FileActionType.Read)
          );
          readContentPromise.then(readContent => {
            if (this._awaitExecuteQueue.length > 0) {
              this._awaitExecuteQueue[0]();
            }
            resolve(readContent);
          });
        });
        setTimeout(function() {
          this._awaitExecuteQueue.shift();
          option.timeoutCallBack.call(option.scope);
          resolve();
        }, option.timeout);
      });
    } else {
      return new Promise<T1>((resolve, reject) => {
        this._readers++;
        this._awaitExecuteQueue.shift();
        let readContentPromise: Promise<T1> = option.callBack.call(
          option.scope,
          () => this.releaseLock(FileActionType.Read)
        );
        readContentPromise.then(readContent => {
          if (this._awaitExecuteQueue.length > 0) {
            this._awaitExecuteQueue[0]();
          }
          resolve(readContent);
        });
      });
    }
  }

  /**
   *
   *
   * @template T
   * @param {LockOptions<T, void>} option
   * @returns {Promise<void>}
   * @memberof RWLock
   */
  public async asyncWrite<T>(option: LockOptions<T, void>): Promise<void> {
    if (this.checkIsLocking(FileActionType.Read)) {
      return new Promise<void>((resolve, reject) => {
        this._awaitExecuteQueue.push(() => {
          this._readers = -1;
          this._awaitExecuteQueue.shift();
          option.callBack.call(option.scope, () =>
            this.releaseLock(FileActionType.Write)
          );

          if (this._awaitExecuteQueue.length > 0) {
            this._awaitExecuteQueue[0]();
          }

          resolve();
        });
        if (option.timeoutCallBack && option.timeout) {
          setTimeout(function() {
            this._awaitExecuteQueue.shift();
            option.timeoutCallBack.call(option.scope);

            resolve();
          }, option.timeout);
        }
      });
    } else {
      return new Promise<void>((resolve, reject) => {
        this._readers = -1;
        this._awaitExecuteQueue.shift();
        option.callBack.call(option.scope, () =>
          this.releaseLock(FileActionType.Write)
        );

        resolve();
      });
    }
  }
}
