import { injectable, inject } from "inversify";
import { nameof } from "../infrastructure/base-tool";
import {
  BootstrapEventBus,
  BootstrapEventType,
  BootstrapArg
} from "./bootstrap-event-bus";
import { EventHandler } from "../infrastructure/event-bus";
import { BootstrapContext } from "./bootstrap-context";

export interface BootstrapEventWrap {
  /**
   *启动准备期 会做的事:
   * 1.加载各个管理器的本地配置文件和相关的功能配置。
   * 2.
   *
   * @returns {Promise<EventHandler<BootstrapContext, BootstrapArg>>}
   * @memberof BootstrapEventWrap
   */
  preparingHandle(): Promise<EventHandler<BootstrapContext, BootstrapArg>>;


  /**
   * 启动初始化期 会做的事:
   * 1.初始化各个管理器相关的事件和功能。
   * 2.
   *
   * @returns {Promise<EventHandler<BootstrapContext, BootstrapArg>>}
   * @memberof BootstrapEventWrap
   */
  initializingHandle(): Promise<EventHandler<BootstrapContext, BootstrapArg>>;

  /**
   * 启动开始期
   *
   * @returns {Promise<EventHandler<BootstrapContext, BootstrapArg>>}
   * @memberof BootstrapEventWrap
   */
  startingHandle(): Promise<EventHandler<BootstrapContext, BootstrapArg>>;
}

@injectable()
export abstract class BaseManager {
  protected readonly bootstrapEventBus: BootstrapEventBus;

  constructor(
    @inject(nameof(BootstrapEventBus)) bootstrapEventBus: BootstrapEventBus
  ) {
    this.bootstrapEventBus = bootstrapEventBus;

    this.registerBootstrapEvent();
  }

  protected abstract getBootstrapEventWrap(): BootstrapEventWrap;

  private registerBootstrapEvent(): void {
    let eventWrap = this.getBootstrapEventWrap();
    this.bootstrapEventBus.awaitRegisterHandler(
      BootstrapEventType.preparing,
      eventWrap.preparingHandle()
    );

    this.bootstrapEventBus.awaitRegisterHandler(
      BootstrapEventType.initializing,
      eventWrap.initializingHandle()
    );

    this.bootstrapEventBus.awaitRegisterHandler(
      BootstrapEventType.starting,
      eventWrap.startingHandle()
    );
  }
}
