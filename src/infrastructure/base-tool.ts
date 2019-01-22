import { TryDoResult, succResult, failResult, errResult } from "./try-do-types";

//
type NullOrUndefined = null | undefined;

/**
 *
 *
 * @export
 * @template T
 * @param {*} obj
 * @returns {obj is Promise<T>}
 */
export function isPromise<T>(obj: any): obj is Promise<T> {
  return obj && obj.then && obj.then instanceof Function;
}

/**
 *
 *
 * @export
 * @param {*} obj
 * @returns {obj is NullOrUnderfined}
 */
export function isNullOrUndefined(obj: any): obj is NullOrUndefined {
  return obj === null || obj === undefined;
}

export function nameof<T>(nameFunction: { new (...params: any[]): T }): string {
  if (nameFunction.name) {
    return nameFunction.name;
  }
  var fnStr = nameFunction.toString();
  // Class name (es6).
  // class MyClass { ... }
  var classString = "class ";
  var classIndex = fnStr.indexOf(classString);
  if (classIndex === 0) {
    var notMinified1 = fnStr.indexOf(" extends");
    if (notMinified1 > -1) {
      let name = fnStr.substring(classString.length, notMinified1);
      return name;
    }

    var minified1 = fnStr.indexOf("extends");
    if (minified1 > -1) {
      let name = fnStr.substring(classString.length, minified1);
      return name;
    }

    var notMinified = fnStr.indexOf(" {");
    if (notMinified > -1) {
      let name = fnStr.substring(classString.length, notMinified);
      return name;
    }

    var minified = fnStr.indexOf("{");
    if (minified > -1) {
      let name = fnStr.substring(classString.length, minified);
      return name;
    }
  }

  // Property accessor function.
  var dotIndex = fnStr.indexOf(".");
  if (dotIndex > -1) {
    // ES5
    // "function(x) { return x.prop; }"
    // or
    // "function(x) { return x.prop }"
    // or
    // "function(x) {return x.prop}"
    if (fnStr.indexOf("{") > -1) {
      var endsWithSemicolon = fnStr.lastIndexOf(";");
      if (endsWithSemicolon > -1) {
        return fnStr.substring(dotIndex + 1, endsWithSemicolon);
      }
      var endsWithSpace = fnStr.lastIndexOf(" }");
      if (endsWithSpace > -1) {
        return fnStr.substring(dotIndex + 1, endsWithSpace);
      }
      var endsWithBrace = fnStr.lastIndexOf("}");
      if (endsWithBrace > -1) {
        return fnStr.substring(dotIndex + 1, endsWithBrace);
      }
    } else {
      return fnStr.substr(dotIndex + 1);
    }
  }
  // Class name (es5).
  // function MyClass(...) { ... }
  var functionString = "function ";
  var functionIndex = fnStr.indexOf(functionString);
  if (functionIndex === 0) {
    var parenIndex = fnStr.indexOf("(");
    if (parenIndex > -1) {
      return fnStr.substring(functionString.length, parenIndex);
    }
  }

  // Invalid function.
  throw new Error("nameof: Invalid function syntax.");
}

//export function isType(obj: any, type: NumberConstructor): obj is number;
//export function isType(obj: any, type: StringConstructor): obj is string;
export function isType<T>(obj: any, type: { prototype: T }): obj is T;
export function isType(obj: any, type: any): boolean {
  const objType: string = typeof obj;
  const typeString = type.toString();
  const nameRegex: RegExp = /Arguments|Function|String|Number|Date|Array|Boolean|RegExp/;

  let typeName: string;

  if (obj && objType === "object") {
    return obj instanceof type;
  }

  if (typeString.startsWith("class ")) {
    return type.name.toLowerCase() === objType;
  }

  typeName = typeString.match(nameRegex);
  if (typeName) {
    return typeName[0].toLowerCase() === objType;
  }

  return false;
}

export function isJSONStr(str: string): boolean {
  try {
    let parseData = JSON.parse(str);
    if (parseData && typeof parseData === "object") {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export function tryJsonParse<T extends {}>(str: string): TryDoResult<T> {
  try {
    let parseData = JSON.parse(str);
    if (parseData && typeof parseData === "object") {
      return succResult(<T>parseData);
    } else {
      return failResult("");
    }
  } catch {
    return failResult("");
  }
}
