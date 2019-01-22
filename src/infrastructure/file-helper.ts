import fs from "fs";
import path from "path";

export function isFile(filePath: string, fsStat?: fs.Stats): boolean {
  if (!fs.existsSync(filePath)) return false;
  let stats = fsStat ? fsStat : fs.statSync(filePath);
  return stats.isFile();
}

export function isDir(filePath: string, fsStat?: fs.Stats): boolean {
  if (!fs.existsSync(filePath)) return false;
  let stats = fsStat ? fsStat : fs.statSync(filePath);
  return stats.isDirectory();
}

////
//// ┌─────────────────────┬────────────┐
//// │          dir        │    base    │
//// ├──────┬              ├──────┬─────┤
//// │ root │              │ name │ ext │
//// " C:\      path\dir   \ file  .txt "
//// └──────┴──────────────┴──────┴─────┘
////
export class PathHelper {
  private readonly _srcPathUri: string;
  private readonly _workspaceRoot: string;
  private readonly _validPath: string;
  private _root: string;
  private _dir: string;
  private _base: string;
  private _ext: string;
  private _name: string;
  private _fsStats: fs.Stats;

  constructor(pathUri: string, workspaceRoot: string) {
    this._srcPathUri = pathUri;
    this._workspaceRoot = workspaceRoot;
    this._validPath = this.getValidPath();

    this.initByValidPath();
  }

  private getValidPath(): string {
    let pathInfo = path.parse(this._srcPathUri);

    if (!pathInfo.root) {
      let workspaceRootPathInfo = path.parse(this._workspaceRoot);
      if (workspaceRootPathInfo.root) {
        return path.join(this._workspaceRoot, this._srcPathUri);
      } else {
        throw new Error("");
      }
    } else {
      return this._srcPathUri;
    }
  }

  private initByValidPath() {
    let validPathInfo = path.parse(this._validPath);
    this._root = validPathInfo.root;
    this._dir = validPathInfo.dir;
    this._base = validPathInfo.base;
    this._name = validPathInfo.name;
    this._ext = validPathInfo.ext;
    this._fsStats = fs.statSync(this._validPath);
  }

  public get isDir(): boolean {
    return this._fsStats.isDirectory();
  }

  public get isFile(): boolean {
    return this._fsStats.isFile();
  }

  public get fsStats(): fs.Stats {
    return this._fsStats;
  }
}
