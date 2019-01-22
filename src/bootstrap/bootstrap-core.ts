import { Container } from "inversify";
import { IocTool } from "../infrastructure/ioc-tool";
import { getSingleIoc } from "./bootstrap-ioc";
import { managerLoad } from "./bootstrap-ioc-load";
import { BootstrapOptions, BootstrapContext } from "./bootstrap-context";
import {
  BootstrapEventBus,
  BootstrapEventType,
  BootstrapArg
} from "./bootstrap-event-bus";

/**
 *启动引导器
 *
 * @export
 * @class Bootstrap
 */
export class BootstrapCore {
  public readonly managerContainer: Container;
  public readonly context: BootstrapContext;
  private _eventBus: BootstrapEventBus;

  /**
   * 引导器构造 会做的事:
   * 1.获取依赖容器，并注册基础管理器。
   *0
   *
   * @memberof Bootstrap
   */
  public constructor(bootstrapOptions: BootstrapOptions | undefined) {
    this.context = this.getContext(bootstrapOptions);
    let iocTool = getSingleIoc();
    this.managerContainer = this.getManagerContainer(iocTool);
  }

  public getManagerContainer(iocTool: IocTool): Container {
    this._eventBus = managerLoad(iocTool, this.context);
    return iocTool.container;
  }

  public getContext(
    bootstrapOptions: BootstrapOptions | undefined
  ): BootstrapContext {
    let options = bootstrapOptions || {
      startOptionFile: ""
    };
    return new BootstrapContext(options);
  }

  /**
   * 启动准备期 会做的事:
   * 1.加载各个管理器的本地配置文件和相关的功能配置。
   * 2.
   *
   * @memberof Bootstrap
   */
  private async preparing(): Promise<void> {
    await this._eventBus.triggerHandler(
      BootstrapEventType.preparing,
      new BootstrapArg()
    );
  }

  /**
   * 启动初始化期 会做的事:
   * 1.初始化各个管理器相关的事件和功能。
   * 2.
   *
   * @memberof Bootstrap
   */
  private async initializing(): Promise<void> {
    await this._eventBus.triggerHandler(
      BootstrapEventType.initializing,
      new BootstrapArg()
    );
  }

  /**
   * 启动开始期
   *
   * @memberof Bootstrap
   */
  private async starting(): Promise<void> {
    await this._eventBus.triggerHandler(
      BootstrapEventType.starting,
      new BootstrapArg()
    );
  }

  public async open(): Promise<void> {
    await this._eventBus.starRegisterHandler();
    await this.preparing();
    await this.initializing();
    await this.starting();
  }

  private static instance: BootstrapCore;

  public static impl(
    bootstrapOptions?: BootstrapOptions | undefined
  ): BootstrapCore {
    if (!this.instance) {
      this.instance = new BootstrapCore(bootstrapOptions);
    }
    return this.instance;
  }
}
