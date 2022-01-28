const DEV_HOOK_ATTRIBUTE = "data-dev-hook";

export const isDev: boolean = window
  ? window.location.origin.includes("localhost:")
  : false;

interface IDevHookOptions {
  /** name of dev hook (for console), defaults to "hook"*/
  name?: string;
  /** option to force dev hook to persist in production, default is false */
  force?: boolean;
}


function getScript(name: string = "hook"): HTMLElement {
  //@ts-ignore
  return document.querySelector(`script[${DEV_HOOK_ATTRIBUTE}=${name}]`);
}


/**
 * Creates a global "hook" that can be used from the console in development mode
 * @param {DevHookOptions} - options for creating a dev hook
 */
export function createHook(options?: IDevHookOptions): Record<string, any> {
  let { name, force } = options ?? { name: 'hook', force: false }
  if (isDev || force) {
    name = name || "hook";
    // add script to document
    if (!getScript(name)) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.setAttribute(DEV_HOOK_ATTRIBUTE, name);
      script.textContent = `${name}={};`;
      document.body.appendChild(script);
    }
    return window[name];
  }
  return {}; // this will only be available in local scope in non-dev mode!
}


/**
 * Removes a global dev "hook"
 * @param {String} [name="hook"] - name of dev hook to remove
 */
export function removeHook(name: string = "hook"): void {
  const script = getScript(name);
  if (script) {
    document.body.removeChild(script);
    if (window && name in window) {
      delete window[name];
    }
  }
}

/**
 * updates the specified dev hook with properties from an object
 * @param {Record<string, any>} obj - object to mixin to dev hook
 * @param {String} [name="hook"] - name of dev hook
 *
 * @example
 * updateHook({georgia: 'bulldogs', hello: 'world'});
 * hook.georgia // -> 'bulldogs'
 */
export function updateHook(
  obj: Record<string, any>,
  name: string = "hook"
): void {
  if (window && name in window) {
    for (const key in obj) {
      window[name][key] = obj[key];
    }
  }
}

/**
 * Removes a property from the specified dev hook
 * @param {String} prop - name of property to remove from dev hook
 * @param {String} [name="hook"] - name of dev hook
 */
export function removeProp(prop: string, name: string = "hook"): void {
  if (window && name in window) {
    delete window[name][prop];
  }
}
