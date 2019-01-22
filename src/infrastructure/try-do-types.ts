export enum tryDoStatus {
  success = 0,
  failure = 1,
  error = 2
}

export interface TryDoResult<T extends any> {
  code?: string;
  msg?: string;
  error?: Error;
  status: tryDoStatus;
  result: T;
}

export function succResult<T>(
  value: T,
  code?: string,
  msg?: string
): TryDoResult<T> {
  let result: TryDoResult<T> = { result: value, status: tryDoStatus.success };
  if (code) result.code = code;
  if (msg) result.msg = msg;
  return result;
}

export function failResult<T>(code: string, msg?: string) {
  let result: TryDoResult<T> = {
    result: null as any,
    status: tryDoStatus.failure,
    code: code
  };
  if (msg) result.msg = msg;
  return result;
}

export function errResult<T, TError extends Error>(
  error: TError,
  code?: string,
  msg?: string
) {
  let result: TryDoResult<T> = {
    result: null as any,
    status: tryDoStatus.error,
    error: error
  };
  if (code) result.code = code;
  if (msg) result.msg = msg;
  return result;
}
