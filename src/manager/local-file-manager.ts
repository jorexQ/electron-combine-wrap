import "reflect-metadata";
import { injectable, inject } from "inversify";
import { BaseManager, BootstrapEventWrap } from "../bootstrap/base-manager";
import { nameof } from "../Infrastructure/base-tool";
import {
  BootstrapEventBus,
  BootstrapArg
} from "../bootstrap/bootstrap-event-bus";
import { BootstrapContext } from "../bootstrap/bootstrap-context";
import { EventHandler } from "../infrastructure/event-bus";

@injectable()
export class LocalFileManager extends BaseManager {
  constructor(
    @inject(nameof(BootstrapEventBus)) bootstrapEventBus: BootstrapEventBus
  ) {
    super(bootstrapEventBus);
  }

  protected getBootstrapEventWrap (): BootstrapEventWrap {
    
    return {
      preparingHandle: async ()=>{

        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("LocalFileManager preparing");
          return;
        };
      },
      initializingHandle: async ()=>{

        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("LocalFileManager initializing");
          return;
        };
      },
      startingHandle: async ()=>{

        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("LocalFileManager starting");
          return;
        };
      }
    }
  }
}
