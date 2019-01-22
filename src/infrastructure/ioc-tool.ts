import { Container, interfaces } from "inversify";
import { nameof } from "../infrastructure/base-tool";

export class IocTool {
  public readonly container: Container;
  private readonly _bindTypes: string[] = [];

  constructor() {
    this.container = new Container({
      autoBindInjectable: true,
      defaultScope: "Singleton"
    });
  }

  public registerSingletonClass<T>(
    constructor: interfaces.Newable<T>
  ): IocTool {
    var typeName = nameof(constructor);
    this._bindTypes.push(typeName);
    this.container
      .bind<T>(typeName)
      .to(constructor)
      .inSingletonScope();
    return this;
  }

  public registerConstantValue<T>(impl: T): IocTool {
    var typeName = impl.constructor.name;
    this._bindTypes.push(typeName);
    this.container.bind<T>(typeName).toConstantValue(impl);
    return this;
  }

  // public resolveAll(): void {
  //   this._bindTypes.forEach(typeName => this.container.get());
  // }
}
