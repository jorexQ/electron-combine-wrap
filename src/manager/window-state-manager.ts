import "reflect-metadata";
import { injectable, inject } from "inversify";
import { BaseManager, BootstrapEventWrap } from "../bootstrap/base-manager";
import {
  BootstrapEventBus,
  BootstrapArg
} from "../bootstrap/bootstrap-event-bus";
import { nameof } from "../Infrastructure/base-tool";
import { BootstrapContext } from "../bootstrap/bootstrap-context";
import { lazyInjectNamed } from "../bootstrap/bootstrap-ioc";
import { ConfigLoadManager } from "./config-load-manager";
import { EventHandler } from "../infrastructure/event-bus";
import { BaseWindowCtrl } from "../window/base-window-ctrl";

import { default as windowCtrls } from "../window/window-ctrl-load";
import { object } from "prop-types";
import electronDebug = require("electron-debug");

export interface WindowStateOption {
  height: number;
  width: number;
  isMaximize: boolean;
  defaultWindowName: string;
  mainHtmlUrl?: string;
}

@injectable()
export class WindowStateManager extends BaseManager {
  // public name: string;
  private _stateOption: WindowStateOption;

  private windowCtrlImpls: BaseWindowCtrl[];
  private defaultCtrl: BaseWindowCtrl | undefined;
  private activeCtrl: BaseWindowCtrl | undefined;

  @lazyInjectNamed(ConfigLoadManager, nameof(ConfigLoadManager))
  public configLoadManager: ConfigLoadManager;

  constructor(
    @inject(nameof(BootstrapEventBus)) bootstrapEventBus: BootstrapEventBus
  ) {
    super(bootstrapEventBus);
    this.configLoadManager


    this._stateOption = {
      width: 1280,
      height: 720,
      isMaximize: true,
      defaultWindowName: "main"
    };
  }

  protected getBootstrapEventWrap(): BootstrapEventWrap {
    let self = this;
    return {
      preparingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          //self.initByOption()
          self.loadWindowCtrl();
          self.initByOption();
          console.log("WindowStateManager preparing");
          return;
        };
      },
      initializingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("WindowStateManager initializing");
          return;
        };
      },
      startingHandle: async () => {
        return async function(this: BootstrapContext, arg: BootstrapArg) {
          console.log("WindowStateManager starting");
          return;
        };
      }
    };
  }

  public initByOption(option?: WindowStateOption | undefined) {
    let vaildOption = option ? option : {};
    Object.assign(this._stateOption, vaildOption);
    this.defaultCtrl = this.windowCtrlImpls.find(
      x => x.getName() === this._stateOption.defaultWindowName
    );
  }

  public loadWindowCtrl() {
    this.windowCtrlImpls = windowCtrls.map(windowCtrl => {
      return new windowCtrl();
    });
  }

  public createWindow(): (launchInfo: any) => void {
    return (launchInfo: any) => {
      if (!this.defaultCtrl) return;
      electronDebug({ showDevTools: true, enabled: true });
      this.defaultCtrl.openOrActive();
      require("devtron").install();
    };
  }

  public activateWindow(): (event: Event, hasVisibleWindows: boolean) => void {
    return (event: Event, hasVisibleWindows: boolean) => {
      if (!this.defaultCtrl) return;
      this.defaultCtrl.openOrActive();
    };
  }

  public isWindowAllClosed(): boolean {
    return true;
  }
}
