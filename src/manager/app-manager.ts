import "reflect-metadata";
import { injectable, inject } from "inversify";
import { nameof } from "../infrastructure/base-tool";
import { WindowStateManager } from "./window-state-manager";
import { IpcEventManager } from "./ipc-event-manager";
import { ChromeExtensionManager } from "./chrome-extension-manager";
import { ConfigLoadManager, GetOptionMethod } from "./config-load-manager";
import { PluginManager } from "./plugin-manager";
import { BaseManager, BootstrapEventWrap } from "../bootstrap/base-manager";
import {
  BootstrapEventBus,
  BootstrapArg
} from "../bootstrap/bootstrap-event-bus";
import { lazyInject, lazyInjectNamed } from "../bootstrap/bootstrap-ioc";
import { BootstrapContext } from "../bootstrap/bootstrap-context";
import { EventHandler } from "../infrastructure/event-bus";
import { app } from "electron";

export interface AppOption {
  pluginDirectory?: string;
  isDebugger?: boolean;
  startUpFileUri?: string;
}

const defatulOption: AppOption = {
  pluginDirectory: "./plugin",
  isDebugger: false,
  startUpFileUri: "index.html"
};

const configField = "appOption";

@injectable()
export class AppManager extends BaseManager {
  @lazyInject(nameof(WindowStateManager))
  public windowStateManager: WindowStateManager;

  @lazyInject(nameof(IpcEventManager))
  public ipcEventManager: IpcEventManager;

  @lazyInject(nameof(ChromeExtensionManager))
  public chromeExtensionManager: ChromeExtensionManager;

  @lazyInject(nameof(ConfigLoadManager))
  public configLoadManager: ConfigLoadManager;

  @lazyInject(nameof(PluginManager))
  public pluginManager: PluginManager;

  public baseConfigGetter: GetOptionMethod<AppOption>;
  public appOption: AppOption;

  constructor(
    @inject(nameof(BootstrapEventBus)) bootstrapEventBus: BootstrapEventBus
  ) {
    super(bootstrapEventBus);
    // this._configLoadManager = new ConfigLoadManager();
    // this._baseConfigGetter = this._configLoadManager.syncLoadConfigJson(
    //   configPath
    // );
    // this._appOption = this._baseConfigGetter<AppOption>(
    //   configField,
    //   currentAppOption => Object.assign(defatulOptoin, currentAppOption)
    // );
  }

  protected getBootstrapEventWrap(): BootstrapEventWrap {
    let self = this;
    return {
      preparingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("AppManager preparing");
          return;
        };
      },
      initializingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("AppManager initializing");
          return;
        };
      },
      startingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("AppManager starting");
          self.initAppBaseEvent();
          return;
        };
      }
    };
  }

  private initAppBaseEvent() {
    app.on("ready", this.windowStateManager.createWindow());

    app.on("activate", this.windowStateManager.activateWindow());

    app.on("window-all-closed", () => {
      if (this.windowStateManager.isWindowAllClosed()) {
        app.quit();
      }
    });
  }
}
