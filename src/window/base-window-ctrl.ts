export abstract class BaseWindowCtrl {
  constructor() {}

  public abstract getName(): string;

  public abstract getViewHtmlUri(): string;

  public abstract openOrActive(): void;

  public abstract initEvent(): void;
}
