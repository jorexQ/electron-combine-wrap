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
import electronDebug from "electron-debug";

export type ChromeExtensionOptionItem = {
  tokenKey: string;
};

export interface ChromeExtensionOption {
  extensionRootUri: string;
  extensions: ChromeExtensionOptionItem[];
}

@injectable()
export class ChromeExtensionManager extends BaseManager {
  constructor(
    @inject(nameof(BootstrapEventBus)) bootstrapEventBus: BootstrapEventBus
  ) {
    super(bootstrapEventBus);
  }

  protected getBootstrapEventWrap (): BootstrapEventWrap {
    
    return {
      preparingHandle: async ()=>{

        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("ChromeExtensionManager preparing");
          return;
        };
      },
      initializingHandle: async ()=>{

        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("ChromeExtensionManager initializing");
          return;
        };
      },
      startingHandle: async ()=>{

        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("ChromeExtensionManager starting");
          return;
        };
      }
    }
  }

}
