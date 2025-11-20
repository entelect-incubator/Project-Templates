import { createRequire } from 'module';const require = createRequire(import.meta.url);

// node_modules/@angular/common/fesm2022/xhr.mjs
function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(";")) {
    const eqIndex = cookie.indexOf("=");
    const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ""] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
var XhrFactory = class {
};

export {
  parseCookieValue,
  XhrFactory
};
/*! Bundled license information:

@angular/common/fesm2022/xhr.mjs:
  (**
   * @license Angular v20.3.10
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-YQZF7T32.js.map
