import { Nullable } from "./types";

/**
 *
 *
 * @export
 * @class SyncWaiter
 */
export class SyncWaiter {
  private readonly _timeout: number;
  private readonly _whenMethod: () => boolean;

  constructor(timeout: number, whenMethod: () => boolean) {
    this._timeout = timeout;
    this._whenMethod = whenMethod;
  }

  /**
   *
   *
   * @returns {void}
   * @memberof SyncWaiter
   */
  run(execMethod: () => void, timeoutExecMethod: () => void): void {
    let isDone: boolean = false;
    let isTimeout: boolean = false;
    let currentUseTime = 0;
    let clearIntervalTimeout = setInterval(() => {
      currentUseTime++;
      if (currentUseTime === this._timeout) {
        isTimeout = true;
        clearInterval(clearIntervalTimeout);
      }
    }, 1);

    do {
      isDone = this._whenMethod();
    } while (!isDone && !isTimeout);

    if (clearIntervalTimeout && !isTimeout) {
      clearInterval(clearIntervalTimeout);
    }

    if (isTimeout) {
      timeoutExecMethod();
    }

    if (isDone) {
      execMethod();
    }
  }
}
