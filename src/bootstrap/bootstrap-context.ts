export class BootstrapContext {
  public readonly startOptionFile: string;

  constructor(options: BootstrapOptions) {
    if (!options) return;
    this.startOptionFile = options.startOptionFile;
  }
}

export interface BootstrapOptions {
  startOptionFile: string;
}
