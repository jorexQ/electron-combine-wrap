import getDecorators from "inversify-inject-decorators";
import { IocTool } from "../infrastructure/ioc-tool";

const iocTool = new IocTool();

const decorators = getDecorators(iocTool.container);

export const lazyInject = decorators.lazyInject;

export const lazyInjectNamed = decorators.lazyInjectNamed;

export function getSingleIoc() {
  return iocTool;
}
