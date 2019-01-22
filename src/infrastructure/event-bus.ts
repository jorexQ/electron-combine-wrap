export type EventHandler<TContext, TArg> = (
  this: TContext,
  arg: TArg
) => Promise<void>;

export abstract class EventBus<TEventKey extends string, TContext, TArg> {
  protected _handlerList: Map<
    TEventKey,
    EventHandler<TContext, TArg>[]
  > = new Map<TEventKey, EventHandler<TContext, TArg>[]>();

  protected register(
    eventContext: TContext,
    eventName: TEventKey,
    eventHandler: EventHandler<TContext, TArg>
  ) {
    let handlerList = this._handlerList.get(eventName);
    if (!handlerList) {
      handlerList = [];
    }
    handlerList.push(eventHandler);
    this._handlerList.set(eventName, handlerList);
  }

  protected async trigger(
    eventContext: TContext,
    eventName: TEventKey,
    arg: TArg
  ) {
    let handlerList = this._handlerList.get(eventName);
    if (handlerList) {
      let promiseList = handlerList.map(x => {
        let promise = x.call(eventContext, arg);
        return <Promise<void>>promise;
      });
      return Promise.all(promiseList);
    } else {
      return;
    }
  }
}
