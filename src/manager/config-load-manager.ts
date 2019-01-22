import "reflect-metadata";
import { injectable, inject } from "inversify";

import { nameof } from "../infrastructure/base-tool";
import { BaseManager, BootstrapEventWrap } from "../bootstrap/base-manager";
import {
  BootstrapEventBus,
  BootstrapArg
} from "../bootstrap/bootstrap-event-bus";
import { BootstrapContext } from "../bootstrap/bootstrap-context";
import { EventHandler } from "../infrastructure/event-bus";

//
export type CustomConvertMethod<T> = (result: T) => T;

//
export type GetOptionMethod<T> = <T extends {}>(
  rootKey: string,
  customConvertMethod?: CustomConvertMethod<T>
) => T;

/**
 *
 *
 * @template T
 * @param {string} rootKey
 * @param {CustomConvertMethod<T>} [customConvertMethod]
 * @returns {T}
 */
// function getOption<T extends {}>(
//   rootKey: string,
//   customConvertMethod?: CustomConvertMethod<T>
// ): T {
//   if (!customConvertMethod) {
//     customConvertMethod = result => {
//       return result;
//     };
//   }

//   if (!this.configJsonContent) {
//     return customConvertMethod(<T>{});
//   }

//   var currentValue = this.configJsonContent[rootKey];

//   if (currentValue) {
//     return customConvertMethod(currentValue);
//   } else {
//     return customConvertMethod(<T>{});
//   }
// }

/**
 *
 *
 * @export
 * @class ConfigLoadManager
 */
@injectable()
export class ConfigLoadManager extends BaseManager {
  private _configFile: string = "";
  //private _configStorage: StorageFile;
  constructor(
    @inject(nameof(BootstrapEventBus)) bootstrapEventBus: BootstrapEventBus
  ) {
    super(bootstrapEventBus);
  }

  public syncLoadConfigJson<T>(
    configStoragePath: string
  ): GetOptionMethod<T> | null {
    let configJsonContent: any;

    return null;
  }

  public async asyncLoadConfigJson<T>(
    configStoragePath: string
  ): Promise<GetOptionMethod<T>> {
    let configJsonContent: any;

    return new Promise<GetOptionMethod<T>>(function() {});
  }

  protected getBootstrapEventWrap(): BootstrapEventWrap {
    let self = this;
    return {
      preparingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("ConfigLoadManager preparing");
          // self._configFile = this.startOptionFile;
          // self._configStorage = new StorageFile(self._configFile);
          // self._configStorage.asyncGet
          return;
        };
      },
      initializingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("ConfigLoadManager initializing");
          return;
        };
      },
      startingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("ConfigLoadManager starting");
          return;
        };
      }
    };
  }
}
