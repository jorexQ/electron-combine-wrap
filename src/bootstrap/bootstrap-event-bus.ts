import "reflect-metadata";
import { EventBus } from "../infrastructure/event-bus";
import { injectable } from "inversify";
import { EventHandler } from "../infrastructure/event-bus";
import { BootstrapContext } from "./bootstrap-context";
import { __await } from "tslib";

export enum BootstrapEventType {
  preparing = "preparing",
  initializing = "initializing",
  starting = "starting"
}

@injectable()
export class BootstrapEventBus extends EventBus<
  BootstrapEventType,
  BootstrapContext,
  BootstrapArg
> {
  private readonly context: BootstrapContext;
  private readonly awaitRegisterQueue: (() => Promise<void>)[] = [];

  constructor(context: BootstrapContext) {
    super();
    this.context = context;
  }

  public registerHandler(
    eventName: BootstrapEventType,
    eventHandler: EventHandler<BootstrapContext, BootstrapArg>
  ) {
    this.register(this.context, eventName, eventHandler);
  }

  public awaitRegisterHandler(
    eventName: BootstrapEventType,
    eventHandlerPromise: Promise<EventHandler<BootstrapContext, BootstrapArg>>
  ) {
    let self = this;
    this.awaitRegisterQueue.push(async function() {
      self.register(self.context, eventName, await eventHandlerPromise);
    });
  }

  public async starRegisterHandler() {
    if (this.awaitRegisterQueue.length) {
      let promiseArr = this.awaitRegisterQueue.map(x => x());
      this.awaitRegisterQueue.splice(0, this.awaitRegisterQueue.length);
      return Promise.all(promiseArr);
    }
  }

  public async triggerHandler(
    eventName: BootstrapEventType,
    arg: BootstrapArg
  ) {
    await this.trigger(this.context, eventName, arg);
  }
}

export class BootstrapArg {
  constructor() {}
}
