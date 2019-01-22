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
import { WindowStateManager } from "./window-state-manager";
import { lazyInject } from "../bootstrap/bootstrap-ioc";
import { IpcEventManager } from "./ipc-event-manager";
import { ChromeExtensionManager } from "./chrome-extension-manager";
import { ConfigLoadManager } from "./config-load-manager";
import { VersionManager } from "./version-manager";
import { LocalFileManager } from "./local-file-manager";

@injectable()
export class PluginManager extends BaseManager {
  @lazyInject(nameof(WindowStateManager))
  public windowStateManager: WindowStateManager;

  @lazyInject(nameof(IpcEventManager))
  public ipcEventManager: IpcEventManager;

  @lazyInject(nameof(ChromeExtensionManager))
  public chromeExtensionManager: ChromeExtensionManager;

  @lazyInject(nameof(ConfigLoadManager))
  public configLoadManager: ConfigLoadManager;

  @lazyInject(nameof(VersionManager))
  public versionManager: VersionManager;

  @lazyInject(nameof(LocalFileManager))
  public localFileManager: LocalFileManager;

  constructor(
    @inject(nameof(BootstrapEventBus)) bootstrapEventBus: BootstrapEventBus
  ) {
    super(bootstrapEventBus);
  }

  protected getBootstrapEventWrap(): BootstrapEventWrap {
    return {
      preparingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("PluginManager preparing");
          return;
        };
      },
      initializingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("PluginManager initializing");
          return;
        };
      },
      startingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("PluginManager starting");
          return;
        };
      }
    };
  }
}
