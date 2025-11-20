import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  ActivatedRoute,
  ROUTES,
  Router,
  loadChildren
} from "./chunk-SX54CAMD.js";
import {
  BrowserDomAdapter,
  BrowserModule
} from "./chunk-L6K6Q574.js";
import {
  EVENT_MANAGER_PLUGINS,
  EventManagerPlugin
} from "./chunk-SI6BERYJ.js";
import {
  APP_BASE_HREF,
  NullViewportScroller,
  PLATFORM_SERVER_ID,
  PlatformLocation,
  ViewportScroller,
  getDOM,
  setRootDomAdapter
} from "./chunk-GMAFZCOF.js";
import {
  HTTP_ROOT_INTERCEPTOR_FNS
} from "./chunk-XXTHJJHJ.js";
import {
  XhrFactory
} from "./chunk-YQZF7T32.js";
import {
  APP_ID,
  ApplicationRef,
  CSP_NONCE,
  Compiler,
  Console,
  DOCUMENT,
  ENABLE_ROOT_COMPONENT_BOOTSTRAP,
  EnvironmentInjector,
  IS_HYDRATION_DOM_REUSE_ENABLED,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  LOCALE_ID,
  NgModule,
  Optional,
  PLATFORM_ID,
  PLATFORM_INITIALIZER,
  REQUEST,
  REQUEST_CONTEXT,
  RESPONSE_INIT,
  Renderer2,
  SSR_CONTENT_INTEGRITY_MARKER,
  TESTABILITY,
  Testability,
  TransferState,
  Version,
  annotateForHydration,
  createEnvironmentInjector,
  createPlatformFactory,
  inject,
  makeEnvironmentProviders,
  platformCore,
  provideEnvironmentInitializer,
  resetCompiledComponents,
  runInInjectionContext,
  setClassMetadata,
  setDocument,
  startMeasuring,
  stopMeasuring,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-VSQD7T2K.js";
import {
  require_cjs
} from "./chunk-O5J3CNTX.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-6DU2HRTW.js";

// node_modules/@angular/platform-server/fesm2022/server.mjs
var import_rxjs = __toESM(require_cjs(), 1);
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lib = {};
var Event_1;
var hasRequiredEvent;
function requireEvent() {
  if (hasRequiredEvent) return Event_1;
  hasRequiredEvent = 1;
  Event_1 = Event;
  Event.CAPTURING_PHASE = 1;
  Event.AT_TARGET = 2;
  Event.BUBBLING_PHASE = 3;
  function Event(type, dictionary) {
    this.type = "";
    this.target = null;
    this.currentTarget = null;
    this.eventPhase = Event.AT_TARGET;
    this.bubbles = false;
    this.cancelable = false;
    this.isTrusted = false;
    this.defaultPrevented = false;
    this.timeStamp = Date.now();
    this._propagationStopped = false;
    this._immediatePropagationStopped = false;
    this._initialized = true;
    this._dispatching = false;
    if (type) this.type = type;
    if (dictionary) {
      for (var p in dictionary) {
        this[p] = dictionary[p];
      }
    }
  }
  Event.prototype = Object.create(Object.prototype, {
    constructor: {
      value: Event
    },
    stopPropagation: {
      value: function stopPropagation() {
        this._propagationStopped = true;
      }
    },
    stopImmediatePropagation: {
      value: function stopImmediatePropagation() {
        this._propagationStopped = true;
        this._immediatePropagationStopped = true;
      }
    },
    preventDefault: {
      value: function preventDefault() {
        if (this.cancelable) this.defaultPrevented = true;
      }
    },
    initEvent: {
      value: function initEvent(type, bubbles, cancelable) {
        this._initialized = true;
        if (this._dispatching) return;
        this._propagationStopped = false;
        this._immediatePropagationStopped = false;
        this.defaultPrevented = false;
        this.isTrusted = false;
        this.target = null;
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
      }
    }
  });
  return Event_1;
}
var UIEvent_1;
var hasRequiredUIEvent;
function requireUIEvent() {
  if (hasRequiredUIEvent) return UIEvent_1;
  hasRequiredUIEvent = 1;
  var Event = requireEvent();
  UIEvent_1 = UIEvent;
  function UIEvent() {
    Event.call(this);
    this.view = null;
    this.detail = 0;
  }
  UIEvent.prototype = Object.create(Event.prototype, {
    constructor: {
      value: UIEvent
    },
    initUIEvent: {
      value: function(type, bubbles, cancelable, view, detail) {
        this.initEvent(type, bubbles, cancelable);
        this.view = view;
        this.detail = detail;
      }
    }
  });
  return UIEvent_1;
}
var MouseEvent_1;
var hasRequiredMouseEvent;
function requireMouseEvent() {
  if (hasRequiredMouseEvent) return MouseEvent_1;
  hasRequiredMouseEvent = 1;
  var UIEvent = requireUIEvent();
  MouseEvent_1 = MouseEvent;
  function MouseEvent() {
    UIEvent.call(this);
    this.screenX = this.screenY = this.clientX = this.clientY = 0;
    this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = false;
    this.button = 0;
    this.buttons = 1;
    this.relatedTarget = null;
  }
  MouseEvent.prototype = Object.create(UIEvent.prototype, {
    constructor: {
      value: MouseEvent
    },
    initMouseEvent: {
      value: function(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
        this.initEvent(type, bubbles, cancelable, view, detail);
        this.screenX = screenX;
        this.screenY = screenY;
        this.clientX = clientX;
        this.clientY = clientY;
        this.ctrlKey = ctrlKey;
        this.altKey = altKey;
        this.shiftKey = shiftKey;
        this.metaKey = metaKey;
        this.button = button;
        switch (button) {
          case 0:
            this.buttons = 1;
            break;
          case 1:
            this.buttons = 4;
            break;
          case 2:
            this.buttons = 2;
            break;
          default:
            this.buttons = 0;
            break;
        }
        this.relatedTarget = relatedTarget;
      }
    },
    getModifierState: {
      value: function(key) {
        switch (key) {
          case "Alt":
            return this.altKey;
          case "Control":
            return this.ctrlKey;
          case "Shift":
            return this.shiftKey;
          case "Meta":
            return this.metaKey;
          default:
            return false;
        }
      }
    }
  });
  return MouseEvent_1;
}
var utils = {};
var config = {};
var hasRequiredConfig;
function requireConfig() {
  if (hasRequiredConfig) return config;
  hasRequiredConfig = 1;
  config.isApiWritable = !globalThis.__domino_frozen__;
  return config;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var isApiWritable = requireConfig().isApiWritable;
  utils.NAMESPACE = {
    HTML: "http://www.w3.org/1999/xhtml",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/",
    MATHML: "http://www.w3.org/1998/Math/MathML",
    SVG: "http://www.w3.org/2000/svg",
    XLINK: "http://www.w3.org/1999/xlink"
  };
  utils.IndexSizeError = () => {
    throw new DOMException("The index is not in the allowed range", "IndexSizeError");
  };
  utils.HierarchyRequestError = () => {
    throw new DOMException("The node tree hierarchy is not correct", "HierarchyRequestError");
  };
  utils.WrongDocumentError = () => {
    throw new DOMException("The object is in the wrong Document", "WrongDocumentError");
  };
  utils.InvalidCharacterError = () => {
    throw new DOMException("The string contains invalid characters", "InvalidCharacterError");
  };
  utils.NoModificationAllowedError = () => {
    throw new DOMException("The object cannot be modified", "NoModificationAllowedError");
  };
  utils.NotFoundError = () => {
    throw new DOMException("The object can not be found here", "NotFoundError");
  };
  utils.NotSupportedError = () => {
    throw new DOMException("The operation is not supported", "NotSupportedError");
  };
  utils.InvalidStateError = () => {
    throw new DOMException("The object is in an invalid state", "InvalidStateError");
  };
  utils.SyntaxError = () => {
    throw new DOMException("The string did not match the expected pattern", "SyntaxError");
  };
  utils.InvalidModificationError = () => {
    throw new DOMException("The object can not be modified in this way", "InvalidModificationError");
  };
  utils.NamespaceError = () => {
    throw new DOMException("The operation is not allowed by Namespaces in XML", "NamespaceError");
  };
  utils.InvalidAccessError = () => {
    throw new DOMException("The object does not support the operation or argument", "InvalidAccessError");
  };
  utils.TypeMismatchError = () => {
    throw new DOMException("The type of the object does not match the expected type", "TypeMismatchError");
  };
  utils.SecurityError = () => {
    throw new DOMException("The operation is insecure", "SecurityError");
  };
  utils.NetworkError = () => {
    throw new DOMException("A network error occurred", "NetworkError");
  };
  utils.AbortError = () => {
    throw new DOMException("The operation was aborted", "AbortError");
  };
  utils.UrlMismatchError = () => {
    throw new DOMException("The given URL does not match another URL", "URLMismatchError");
  };
  utils.QuotaExceededError = () => {
    throw new DOMException("The quota has been exceeded", "QuotaExceededError");
  };
  utils.TimeoutError = () => {
    throw new DOMException("The operation timed out", "TimeoutError");
  };
  utils.InvalidNodeTypeError = () => {
    throw new DOMException("The node is of an invalid type", "InvalidNodeTypeError");
  };
  utils.DataCloneError = () => {
    throw new DOMException("The object can not be cloned", "DataCloneError");
  };
  utils.InUseAttributeError = () => {
    throw new DOMException("The attribute is already in use", "InUseAttributeError");
  };
  utils.nyi = function() {
    throw new Error("NotYetImplemented");
  };
  utils.shouldOverride = function() {
    throw new Error("Abstract function; should be overriding in subclass.");
  };
  utils.assert = function(expr, msg) {
    if (!expr) {
      throw new Error("Assertion failed: " + (msg || "") + "\n" + new Error().stack);
    }
  };
  utils.expose = function(src, c) {
    for (var n in src) {
      Object.defineProperty(c.prototype, n, {
        value: src[n],
        writable: isApiWritable
      });
    }
  };
  utils.merge = function(a, b) {
    for (var n in b) {
      a[n] = b[n];
    }
  };
  utils.documentOrder = function(n, m) {
    return 3 - (n.compareDocumentPosition(m) & 6);
  };
  utils.toASCIILowerCase = function(s) {
    return s.replace(/[A-Z]+/g, function(c) {
      return c.toLowerCase();
    });
  };
  utils.toASCIIUpperCase = function(s) {
    return s.replace(/[a-z]+/g, function(c) {
      return c.toUpperCase();
    });
  };
  return utils;
}
var EventTarget_1;
var hasRequiredEventTarget;
function requireEventTarget() {
  if (hasRequiredEventTarget) return EventTarget_1;
  hasRequiredEventTarget = 1;
  var Event = requireEvent();
  var MouseEvent = requireMouseEvent();
  var utils2 = requireUtils();
  EventTarget_1 = EventTarget;
  function EventTarget() {
  }
  EventTarget.prototype = {
    // XXX
    // See WebIDL §4.8 for details on object event handlers
    // and how they should behave.  We actually have to accept
    // any object to addEventListener... Can't type check it.
    // on registration.
    // XXX:
    // Capturing event listeners are sort of rare.  I think I can optimize
    // them so that dispatchEvent can skip the capturing phase (or much of
    // it).  Each time a capturing listener is added, increment a flag on
    // the target node and each of its ancestors.  Decrement when removed.
    // And update the counter when nodes are added and removed from the
    // tree as well.  Then, in dispatch event, the capturing phase can
    // abort if it sees any node with a zero count.
    addEventListener: function addEventListener(type, listener, capture) {
      if (!listener) return;
      if (capture === void 0) capture = false;
      if (!this._listeners) this._listeners = /* @__PURE__ */ Object.create(null);
      if (!this._listeners[type]) this._listeners[type] = [];
      var list = this._listeners[type];
      for (var i = 0, n = list.length; i < n; i++) {
        var l = list[i];
        if (l.listener === listener && l.capture === capture) return;
      }
      var obj = {
        listener,
        capture
      };
      if (typeof listener === "function") obj.f = listener;
      list.push(obj);
    },
    removeEventListener: function removeEventListener(type, listener, capture) {
      if (capture === void 0) capture = false;
      if (this._listeners) {
        var list = this._listeners[type];
        if (list) {
          for (var i = 0, n = list.length; i < n; i++) {
            var l = list[i];
            if (l.listener === listener && l.capture === capture) {
              if (list.length === 1) {
                this._listeners[type] = void 0;
              } else {
                list.splice(i, 1);
              }
              return;
            }
          }
        }
      }
    },
    // This is the public API for dispatching untrusted public events.
    // See _dispatchEvent for the implementation
    dispatchEvent: function dispatchEvent(event) {
      return this._dispatchEvent(event, false);
    },
    //
    // See DOMCore §4.4
    // XXX: I'll probably need another version of this method for
    // internal use, one that does not set isTrusted to false.
    // XXX: see Document._dispatchEvent: perhaps that and this could
    // call a common internal function with different settings of
    // a trusted boolean argument
    //
    // XXX:
    // The spec has changed in how to deal with handlers registered
    // on idl or content attributes rather than with addEventListener.
    // Used to say that they always ran first.  That's how webkit does it
    // Spec now says that they run in a position determined by
    // when they were first set.  FF does it that way.  See:
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/webappapis.html#event-handlers
    //
    _dispatchEvent: function _dispatchEvent(event, trusted) {
      if (typeof trusted !== "boolean") trusted = false;
      function invoke(target, event2) {
        var type = event2.type, phase = event2.eventPhase;
        event2.currentTarget = target;
        if (phase !== Event.CAPTURING_PHASE && target._handlers && target._handlers[type]) {
          var handler = target._handlers[type];
          var rv;
          if (typeof handler === "function") {
            rv = handler.call(event2.currentTarget, event2);
          } else {
            var f = handler.handleEvent;
            if (typeof f !== "function") throw new TypeError("handleEvent property of event handler object isnot a function.");
            rv = f.call(handler, event2);
          }
          switch (event2.type) {
            case "mouseover":
              if (rv === true)
                event2.preventDefault();
              break;
            case "beforeunload":
            // XXX: eventually we need a special case here
            /* falls through */
            default:
              if (rv === false) event2.preventDefault();
              break;
          }
        }
        var list = target._listeners && target._listeners[type];
        if (!list) return;
        list = list.slice();
        for (var i2 = 0, n2 = list.length; i2 < n2; i2++) {
          if (event2._immediatePropagationStopped) return;
          var l = list[i2];
          if (phase === Event.CAPTURING_PHASE && !l.capture || phase === Event.BUBBLING_PHASE && l.capture) continue;
          if (l.f) {
            l.f.call(event2.currentTarget, event2);
          } else {
            var fn = l.listener.handleEvent;
            if (typeof fn !== "function") throw new TypeError("handleEvent property of event listener object is not a function.");
            fn.call(l.listener, event2);
          }
        }
      }
      if (!event._initialized || event._dispatching) utils2.InvalidStateError();
      event.isTrusted = trusted;
      event._dispatching = true;
      event.target = this;
      var ancestors = [];
      for (var n = this.parentNode; n; n = n.parentNode) ancestors.push(n);
      event.eventPhase = Event.CAPTURING_PHASE;
      for (var i = ancestors.length - 1; i >= 0; i--) {
        invoke(ancestors[i], event);
        if (event._propagationStopped) break;
      }
      if (!event._propagationStopped) {
        event.eventPhase = Event.AT_TARGET;
        invoke(this, event);
      }
      if (event.bubbles && !event._propagationStopped) {
        event.eventPhase = Event.BUBBLING_PHASE;
        for (var ii = 0, nn = ancestors.length; ii < nn; ii++) {
          invoke(ancestors[ii], event);
          if (event._propagationStopped) break;
        }
      }
      event._dispatching = false;
      event.eventPhase = Event.AT_TARGET;
      event.currentTarget = null;
      if (trusted && !event.defaultPrevented && event instanceof MouseEvent) {
        switch (event.type) {
          case "mousedown":
            this._armed = {
              x: event.clientX,
              y: event.clientY,
              t: event.timeStamp
            };
            break;
          case "mouseout":
          case "mouseover":
            this._armed = null;
            break;
          case "mouseup":
            if (this._isClick(event)) this._doClick(event);
            this._armed = null;
            break;
        }
      }
      return !event.defaultPrevented;
    },
    // Determine whether a click occurred
    // XXX We don't support double clicks for now
    _isClick: function(event) {
      return this._armed !== null && event.type === "mouseup" && event.isTrusted && event.button === 0 && event.timeStamp - this._armed.t < 1e3 && Math.abs(event.clientX - this._armed.x) < 10 && Math.abs(event.clientY - this._armed.Y) < 10;
    },
    // Clicks are handled like this:
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#interactive-content-0
    //
    // Note that this method is similar to the HTMLElement.click() method
    // The event argument must be the trusted mouseup event
    _doClick: function(event) {
      if (this._click_in_progress) return;
      this._click_in_progress = true;
      var activated = this;
      while (activated && !activated._post_click_activation_steps) activated = activated.parentNode;
      if (activated && activated._pre_click_activation_steps) {
        activated._pre_click_activation_steps();
      }
      var click = this.ownerDocument.createEvent("MouseEvent");
      click.initMouseEvent("click", true, true, this.ownerDocument.defaultView, 1, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, null);
      var result2 = this._dispatchEvent(click, true);
      if (activated) {
        if (result2) {
          if (activated._post_click_activation_steps) activated._post_click_activation_steps(click);
        } else {
          if (activated._cancelled_activation_steps) activated._cancelled_activation_steps();
        }
      }
    },
    //
    // An event handler is like an event listener, but it registered
    // by setting an IDL or content attribute like onload or onclick.
    // There can only be one of these at a time for any event type.
    // This is an internal method for the attribute accessors and
    // content attribute handlers that need to register events handlers.
    // The type argument is the same as in addEventListener().
    // The handler argument is the same as listeners in addEventListener:
    // it can be a function or an object. Pass null to remove any existing
    // handler.  Handlers are always invoked before any listeners of
    // the same type.  They are not invoked during the capturing phase
    // of event dispatch.
    //
    _setEventHandler: function _setEventHandler(type, handler) {
      if (!this._handlers) this._handlers = /* @__PURE__ */ Object.create(null);
      this._handlers[type] = handler;
    },
    _getEventHandler: function _getEventHandler(type) {
      return this._handlers && this._handlers[type] || null;
    }
  };
  return EventTarget_1;
}
var LinkedList = {
  exports: {}
};
var hasRequiredLinkedList;
function requireLinkedList() {
  if (hasRequiredLinkedList) return LinkedList.exports;
  hasRequiredLinkedList = 1;
  var utils2 = requireUtils();
  var LinkedList$1 = LinkedList.exports = {
    // basic validity tests on a circular linked list a
    valid: function(a) {
      utils2.assert(a, "list falsy");
      utils2.assert(a._previousSibling, "previous falsy");
      utils2.assert(a._nextSibling, "next falsy");
      return true;
    },
    // insert a before b
    insertBefore: function(a, b) {
      utils2.assert(LinkedList$1.valid(a) && LinkedList$1.valid(b));
      var a_first = a, a_last = a._previousSibling;
      var b_first = b, b_last = b._previousSibling;
      a_first._previousSibling = b_last;
      a_last._nextSibling = b_first;
      b_last._nextSibling = a_first;
      b_first._previousSibling = a_last;
      utils2.assert(LinkedList$1.valid(a) && LinkedList$1.valid(b));
    },
    // replace a single node a with a list b (which could be null)
    replace: function(a, b) {
      utils2.assert(LinkedList$1.valid(a) && (b === null || LinkedList$1.valid(b)));
      if (b !== null) {
        LinkedList$1.insertBefore(b, a);
      }
      LinkedList$1.remove(a);
      utils2.assert(LinkedList$1.valid(a) && (b === null || LinkedList$1.valid(b)));
    },
    // remove single node a from its list
    remove: function(a) {
      utils2.assert(LinkedList$1.valid(a));
      var prev = a._previousSibling;
      if (prev === a) {
        return;
      }
      var next = a._nextSibling;
      prev._nextSibling = next;
      next._previousSibling = prev;
      a._previousSibling = a._nextSibling = a;
      utils2.assert(LinkedList$1.valid(a));
    }
  };
  return LinkedList.exports;
}
var NodeUtils;
var hasRequiredNodeUtils;
function requireNodeUtils() {
  if (hasRequiredNodeUtils) return NodeUtils;
  hasRequiredNodeUtils = 1;
  NodeUtils = {
    // NOTE: The `serializeOne()` function used to live on the `Node.prototype`
    // as a private method `Node#_serializeOne(child)`, however that requires
    // a megamorphic property access `this._serializeOne` just to get to the
    // method, and this is being done on lots of different `Node` subclasses,
    // which puts a lot of pressure on V8's megamorphic stub cache. So by
    // moving the helper off of the `Node.prototype` and into a separate
    // function in this helper module, we get a monomorphic property access
    // `NodeUtils.serializeOne` to get to the function and reduce pressure
    // on the megamorphic stub cache.
    // See https://github.com/fgnass/domino/pull/142 for more information.
    serializeOne,
    // Export util functions so that we can run extra test for them.
    // Note: we prefix function names with `ɵ`, similar to what we do
    // with internal functions in Angular packages.
    ɵescapeMatchingClosingTag: escapeMatchingClosingTag,
    ɵescapeClosingCommentTag: escapeClosingCommentTag,
    ɵescapeProcessingInstructionContent: escapeProcessingInstructionContent
  };
  var utils2 = requireUtils();
  var NAMESPACE = utils2.NAMESPACE;
  var hasRawContent = {
    STYLE: true,
    SCRIPT: true,
    XMP: true,
    IFRAME: true,
    NOEMBED: true,
    NOFRAMES: true,
    PLAINTEXT: true
  };
  var emptyElements = {
    area: true,
    base: true,
    basefont: true,
    bgsound: true,
    br: true,
    col: true,
    embed: true,
    frame: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  };
  var extraNewLine = {
    /* Removed in https://github.com/whatwg/html/issues/944
    pre: true,
    textarea: true,
    listing: true
    */
  };
  const ESCAPE_REGEXP = /[&<>\u00A0]/g;
  const ESCAPE_ATTR_REGEXP = /[&"<>\u00A0]/g;
  function escape(s) {
    if (!ESCAPE_REGEXP.test(s)) {
      return s;
    }
    return s.replace(ESCAPE_REGEXP, (c) => {
      switch (c) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case " ":
          return "&nbsp;";
      }
    });
  }
  function escapeAttr(s) {
    if (!ESCAPE_ATTR_REGEXP.test(s)) {
      return s;
    }
    return s.replace(ESCAPE_ATTR_REGEXP, (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case '"':
          return "&quot;";
        case " ":
          return "&nbsp;";
      }
    });
  }
  function attrname(a) {
    var ns = a.namespaceURI;
    if (!ns) return a.localName;
    if (ns === NAMESPACE.XML) return "xml:" + a.localName;
    if (ns === NAMESPACE.XLINK) return "xlink:" + a.localName;
    if (ns === NAMESPACE.XMLNS) {
      if (a.localName === "xmlns") return "xmlns";
      else return "xmlns:" + a.localName;
    }
    return a.name;
  }
  function escapeMatchingClosingTag(rawText, parentTag) {
    const parentClosingTag = "</" + parentTag;
    if (!rawText.toLowerCase().includes(parentClosingTag)) {
      return rawText;
    }
    const result2 = [...rawText];
    const matches = rawText.matchAll(new RegExp(parentClosingTag, "ig"));
    for (const match of matches) {
      result2[match.index] = "&lt;";
    }
    return result2.join("");
  }
  const CLOSING_COMMENT_REGEXP = /--!?>/;
  function escapeClosingCommentTag(rawContent) {
    if (!CLOSING_COMMENT_REGEXP.test(rawContent)) {
      return rawContent;
    }
    return rawContent.replace(/(--\!?)>/g, "$1&gt;");
  }
  function escapeProcessingInstructionContent(rawContent) {
    return rawContent.includes(">") ? rawContent.replaceAll(">", "&gt;") : rawContent;
  }
  function serializeOne(kid, parent) {
    var s = "";
    switch (kid.nodeType) {
      case 1:
        var ns = kid.namespaceURI;
        var html = ns === NAMESPACE.HTML;
        var tagname = html || ns === NAMESPACE.SVG || ns === NAMESPACE.MATHML ? kid.localName : kid.tagName;
        s += "<" + tagname;
        for (var j = 0, k = kid._numattrs; j < k; j++) {
          var a = kid._attr(j);
          s += " " + attrname(a);
          if (a.value !== void 0) s += '="' + escapeAttr(a.value) + '"';
        }
        s += ">";
        if (!(html && emptyElements[tagname])) {
          var ss = kid.serialize();
          if (hasRawContent[tagname.toUpperCase()]) {
            ss = escapeMatchingClosingTag(ss, tagname);
          }
          if (html && extraNewLine[tagname] && ss.charAt(0) === "\n") s += "\n";
          s += ss;
          s += "</" + tagname + ">";
        }
        break;
      case 3:
      //TEXT_NODE
      case 4:
        var parenttag;
        if (parent.nodeType === 1 && parent.namespaceURI === NAMESPACE.HTML) parenttag = parent.tagName;
        else parenttag = "";
        if (hasRawContent[parenttag] || parenttag === "NOSCRIPT" && parent.ownerDocument._scripting_enabled) {
          s += kid.data;
        } else {
          s += escape(kid.data);
        }
        break;
      case 8:
        s += "<!--" + escapeClosingCommentTag(kid.data) + "-->";
        break;
      case 7:
        const content = escapeProcessingInstructionContent(kid.data);
        s += "<?" + kid.target + " " + content + "?>";
        break;
      case 10:
        s += "<!DOCTYPE " + kid.name;
        s += ">";
        break;
      default:
        utils2.InvalidStateError();
    }
    return s;
  }
  return NodeUtils;
}
var Node_1;
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return Node_1;
  hasRequiredNode = 1;
  Node_1 = Node2;
  var EventTarget = requireEventTarget();
  var LinkedList2 = requireLinkedList();
  var NodeUtils2 = requireNodeUtils();
  var utils2 = requireUtils();
  function Node2() {
    EventTarget.call(this);
    this.parentNode = null;
    this._nextSibling = this._previousSibling = this;
    this._index = void 0;
  }
  var ELEMENT_NODE = Node2.ELEMENT_NODE = 1;
  var ATTRIBUTE_NODE = Node2.ATTRIBUTE_NODE = 2;
  var TEXT_NODE = Node2.TEXT_NODE = 3;
  var CDATA_SECTION_NODE = Node2.CDATA_SECTION_NODE = 4;
  var ENTITY_REFERENCE_NODE = Node2.ENTITY_REFERENCE_NODE = 5;
  var ENTITY_NODE = Node2.ENTITY_NODE = 6;
  var PROCESSING_INSTRUCTION_NODE = Node2.PROCESSING_INSTRUCTION_NODE = 7;
  var COMMENT_NODE = Node2.COMMENT_NODE = 8;
  var DOCUMENT_NODE = Node2.DOCUMENT_NODE = 9;
  var DOCUMENT_TYPE_NODE = Node2.DOCUMENT_TYPE_NODE = 10;
  var DOCUMENT_FRAGMENT_NODE = Node2.DOCUMENT_FRAGMENT_NODE = 11;
  var NOTATION_NODE = Node2.NOTATION_NODE = 12;
  var DOCUMENT_POSITION_DISCONNECTED = Node2.DOCUMENT_POSITION_DISCONNECTED = 1;
  var DOCUMENT_POSITION_PRECEDING = Node2.DOCUMENT_POSITION_PRECEDING = 2;
  var DOCUMENT_POSITION_FOLLOWING = Node2.DOCUMENT_POSITION_FOLLOWING = 4;
  var DOCUMENT_POSITION_CONTAINS = Node2.DOCUMENT_POSITION_CONTAINS = 8;
  var DOCUMENT_POSITION_CONTAINED_BY = Node2.DOCUMENT_POSITION_CONTAINED_BY = 16;
  var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = Node2.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
  Node2.prototype = Object.create(EventTarget.prototype, {
    // Node that are not inserted into the tree inherit a null parent
    // XXX: the baseURI attribute is defined by dom core, but
    // a correct implementation of it requires HTML features, so
    // we'll come back to this later.
    baseURI: {
      get: utils2.nyi
    },
    parentElement: {
      get: function() {
        return this.parentNode && this.parentNode.nodeType === ELEMENT_NODE ? this.parentNode : null;
      }
    },
    hasChildNodes: {
      value: utils2.shouldOverride
    },
    firstChild: {
      get: utils2.shouldOverride
    },
    lastChild: {
      get: utils2.shouldOverride
    },
    isConnected: {
      get: function() {
        let node2 = this;
        while (node2 != null) {
          if (node2.nodeType === Node2.DOCUMENT_NODE) {
            return true;
          }
          node2 = node2.parentNode;
          if (node2 != null && node2.nodeType === Node2.DOCUMENT_FRAGMENT_NODE) {
            node2 = node2.host;
          }
        }
        return false;
      }
    },
    previousSibling: {
      get: function() {
        var parent = this.parentNode;
        if (!parent) return null;
        if (this === parent.firstChild) return null;
        return this._previousSibling;
      }
    },
    nextSibling: {
      get: function() {
        var parent = this.parentNode, next = this._nextSibling;
        if (!parent) return null;
        if (next === parent.firstChild) return null;
        return next;
      }
    },
    textContent: {
      // Should override for DocumentFragment/Element/Attr/Text/PI/Comment
      get: function() {
        return null;
      },
      set: function(v) {
      }
    },
    innerText: {
      // Should override for DocumentFragment/Element/Attr/Text/PI/Comment
      get: function() {
        return null;
      },
      set: function(v) {
      }
    },
    _countChildrenOfType: {
      value: function(type) {
        var sum = 0;
        for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
          if (kid.nodeType === type) sum++;
        }
        return sum;
      }
    },
    _ensureInsertValid: {
      value: function _ensureInsertValid(node2, child, isPreinsert) {
        var parent = this, i, kid;
        if (!node2.nodeType) throw new TypeError("not a node");
        switch (parent.nodeType) {
          case DOCUMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
          case ELEMENT_NODE:
            break;
          default:
            utils2.HierarchyRequestError();
        }
        if (node2.isAncestor(parent)) utils2.HierarchyRequestError();
        if (child !== null || !isPreinsert) {
          if (child.parentNode !== parent) utils2.NotFoundError();
        }
        switch (node2.nodeType) {
          case DOCUMENT_FRAGMENT_NODE:
          case DOCUMENT_TYPE_NODE:
          case ELEMENT_NODE:
          case TEXT_NODE:
          case PROCESSING_INSTRUCTION_NODE:
          case COMMENT_NODE:
            break;
          default:
            utils2.HierarchyRequestError();
        }
        if (parent.nodeType === DOCUMENT_NODE) {
          switch (node2.nodeType) {
            case TEXT_NODE:
              utils2.HierarchyRequestError();
              break;
            case DOCUMENT_FRAGMENT_NODE:
              if (node2._countChildrenOfType(TEXT_NODE) > 0) utils2.HierarchyRequestError();
              switch (node2._countChildrenOfType(ELEMENT_NODE)) {
                case 0:
                  break;
                case 1:
                  if (child !== null) {
                    if (isPreinsert && child.nodeType === DOCUMENT_TYPE_NODE) utils2.HierarchyRequestError();
                    for (kid = child.nextSibling; kid !== null; kid = kid.nextSibling) {
                      if (kid.nodeType === DOCUMENT_TYPE_NODE) utils2.HierarchyRequestError();
                    }
                  }
                  i = parent._countChildrenOfType(ELEMENT_NODE);
                  if (isPreinsert) {
                    if (i > 0) utils2.HierarchyRequestError();
                  } else {
                    if (i > 1 || i === 1 && child.nodeType !== ELEMENT_NODE) utils2.HierarchyRequestError();
                  }
                  break;
                default:
                  utils2.HierarchyRequestError();
              }
              break;
            case ELEMENT_NODE:
              if (child !== null) {
                if (isPreinsert && child.nodeType === DOCUMENT_TYPE_NODE) utils2.HierarchyRequestError();
                for (kid = child.nextSibling; kid !== null; kid = kid.nextSibling) {
                  if (kid.nodeType === DOCUMENT_TYPE_NODE) utils2.HierarchyRequestError();
                }
              }
              i = parent._countChildrenOfType(ELEMENT_NODE);
              if (isPreinsert) {
                if (i > 0) utils2.HierarchyRequestError();
              } else {
                if (i > 1 || i === 1 && child.nodeType !== ELEMENT_NODE) utils2.HierarchyRequestError();
              }
              break;
            case DOCUMENT_TYPE_NODE:
              if (child === null) {
                if (parent._countChildrenOfType(ELEMENT_NODE)) utils2.HierarchyRequestError();
              } else {
                for (kid = parent.firstChild; kid !== null; kid = kid.nextSibling) {
                  if (kid === child) break;
                  if (kid.nodeType === ELEMENT_NODE) utils2.HierarchyRequestError();
                }
              }
              i = parent._countChildrenOfType(DOCUMENT_TYPE_NODE);
              if (isPreinsert) {
                if (i > 0) utils2.HierarchyRequestError();
              } else {
                if (i > 1 || i === 1 && child.nodeType !== DOCUMENT_TYPE_NODE) utils2.HierarchyRequestError();
              }
              break;
          }
        } else {
          if (node2.nodeType === DOCUMENT_TYPE_NODE) utils2.HierarchyRequestError();
        }
      }
    },
    insertBefore: {
      value: function insertBefore(node2, child) {
        var parent = this;
        parent._ensureInsertValid(node2, child, true);
        var refChild = child;
        if (refChild === node2) {
          refChild = node2.nextSibling;
        }
        parent.doc.adoptNode(node2);
        node2._insertOrReplace(parent, refChild, false);
        return node2;
      }
    },
    appendChild: {
      value: function(child) {
        return this.insertBefore(child, null);
      }
    },
    _appendChild: {
      value: function(child) {
        child._insertOrReplace(this, null, false);
      }
    },
    removeChild: {
      value: function removeChild(child) {
        var parent = this;
        if (!child.nodeType) throw new TypeError("not a node");
        if (child.parentNode !== parent) utils2.NotFoundError();
        child.remove();
        return child;
      }
    },
    // To replace a `child` with `node` within a `parent` (this)
    replaceChild: {
      value: function replaceChild(node2, child) {
        var parent = this;
        parent._ensureInsertValid(node2, child, false);
        if (node2.doc !== parent.doc) {
          parent.doc.adoptNode(node2);
        }
        node2._insertOrReplace(parent, child, true);
        return child;
      }
    },
    // See: http://ejohn.org/blog/comparing-document-position/
    contains: {
      value: function contains(node2) {
        if (node2 === null) {
          return false;
        }
        if (this === node2) {
          return true;
        }
        return (this.compareDocumentPosition(node2) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
      }
    },
    compareDocumentPosition: {
      value: function compareDocumentPosition2(that) {
        if (this === that) return 0;
        if (this.doc !== that.doc || this.rooted !== that.rooted) return DOCUMENT_POSITION_DISCONNECTED + DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
        var these = [], those = [];
        for (var n = this; n !== null; n = n.parentNode) these.push(n);
        for (n = that; n !== null; n = n.parentNode) those.push(n);
        these.reverse();
        those.reverse();
        if (these[0] !== those[0])
          return DOCUMENT_POSITION_DISCONNECTED + DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
        n = Math.min(these.length, those.length);
        for (var i = 1; i < n; i++) {
          if (these[i] !== those[i]) {
            if (these[i].index < those[i].index) return DOCUMENT_POSITION_FOLLOWING;
            else return DOCUMENT_POSITION_PRECEDING;
          }
        }
        if (these.length < those.length) return DOCUMENT_POSITION_FOLLOWING + DOCUMENT_POSITION_CONTAINED_BY;
        else return DOCUMENT_POSITION_PRECEDING + DOCUMENT_POSITION_CONTAINS;
      }
    },
    isSameNode: {
      value: function isSameNode(node2) {
        return this === node2;
      }
    },
    // This method implements the generic parts of node equality testing
    // and defers to the (non-recursive) type-specific isEqual() method
    // defined by subclasses
    isEqualNode: {
      value: function isEqualNode(node2) {
        if (!node2) return false;
        if (node2.nodeType !== this.nodeType) return false;
        if (!this.isEqual(node2)) return false;
        for (var c1 = this.firstChild, c2 = node2.firstChild; c1 && c2; c1 = c1.nextSibling, c2 = c2.nextSibling) {
          if (!c1.isEqualNode(c2)) return false;
        }
        return c1 === null && c2 === null;
      }
    },
    // This method delegates shallow cloning to a clone() method
    // that each concrete subclass must implement
    cloneNode: {
      value: function(deep) {
        var clone = this.clone();
        if (deep) {
          for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
            clone._appendChild(kid.cloneNode(true));
          }
        }
        return clone;
      }
    },
    lookupPrefix: {
      value: function lookupPrefix(ns) {
        var e;
        if (ns === "" || ns === null || ns === void 0) return null;
        switch (this.nodeType) {
          case ELEMENT_NODE:
            return this._lookupNamespacePrefix(ns, this);
          case DOCUMENT_NODE:
            e = this.documentElement;
            return e ? e.lookupPrefix(ns) : null;
          case ENTITY_NODE:
          case NOTATION_NODE:
          case DOCUMENT_FRAGMENT_NODE:
          case DOCUMENT_TYPE_NODE:
            return null;
          case ATTRIBUTE_NODE:
            e = this.ownerElement;
            return e ? e.lookupPrefix(ns) : null;
          default:
            e = this.parentElement;
            return e ? e.lookupPrefix(ns) : null;
        }
      }
    },
    lookupNamespaceURI: {
      value: function lookupNamespaceURI(prefix) {
        if (prefix === "" || prefix === void 0) {
          prefix = null;
        }
        var e;
        switch (this.nodeType) {
          case ELEMENT_NODE:
            return utils2.shouldOverride();
          case DOCUMENT_NODE:
            e = this.documentElement;
            return e ? e.lookupNamespaceURI(prefix) : null;
          case ENTITY_NODE:
          case NOTATION_NODE:
          case DOCUMENT_TYPE_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            return null;
          case ATTRIBUTE_NODE:
            e = this.ownerElement;
            return e ? e.lookupNamespaceURI(prefix) : null;
          default:
            e = this.parentElement;
            return e ? e.lookupNamespaceURI(prefix) : null;
        }
      }
    },
    isDefaultNamespace: {
      value: function isDefaultNamespace(ns) {
        if (ns === "" || ns === void 0) {
          ns = null;
        }
        var defaultNamespace = this.lookupNamespaceURI(null);
        return defaultNamespace === ns;
      }
    },
    // Utility methods for nodes.  Not part of the DOM
    // Return the index of this node in its parent.
    // Throw if no parent, or if this node is not a child of its parent
    index: {
      get: function() {
        var parent = this.parentNode;
        if (this === parent.firstChild) return 0;
        var kids = parent.childNodes;
        if (this._index === void 0 || kids[this._index] !== this) {
          for (var i = 0; i < kids.length; i++) {
            kids[i]._index = i;
          }
          utils2.assert(kids[this._index] === this);
        }
        return this._index;
      }
    },
    // Return true if this node is equal to or is an ancestor of that node
    // Note that nodes are considered to be ancestors of themselves
    isAncestor: {
      value: function(that) {
        if (this.doc !== that.doc) return false;
        if (this.rooted !== that.rooted) return false;
        for (var e = that; e; e = e.parentNode) {
          if (e === this) return true;
        }
        return false;
      }
    },
    // DOMINO Changed the behavior to conform with the specs. See:
    // https://groups.google.com/d/topic/mozilla.dev.platform/77sIYcpdDmc/discussion
    ensureSameDoc: {
      value: function(that) {
        if (that.ownerDocument === null) {
          that.ownerDocument = this.doc;
        } else if (that.ownerDocument !== this.doc) {
          utils2.WrongDocumentError();
        }
      }
    },
    removeChildren: {
      value: utils2.shouldOverride
    },
    // Insert this node as a child of parent before the specified child,
    // or insert as the last child of parent if specified child is null,
    // or replace the specified child with this node, firing mutation events as
    // necessary
    _insertOrReplace: {
      value: function _insertOrReplace(parent, before, isReplace) {
        var child = this, before_index, i;
        if (child.nodeType === DOCUMENT_FRAGMENT_NODE && child.rooted) {
          utils2.HierarchyRequestError();
        }
        if (parent._childNodes) {
          before_index = before === null ? parent._childNodes.length : before.index;
          if (child.parentNode === parent) {
            var child_index = child.index;
            if (child_index < before_index) {
              before_index--;
            }
          }
        }
        if (isReplace) {
          if (before.rooted) before.doc.mutateRemove(before);
          before.parentNode = null;
        }
        var n = before;
        if (n === null) {
          n = parent.firstChild;
        }
        var bothRooted = child.rooted && parent.rooted;
        if (child.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var spliceArgs = [0, isReplace ? 1 : 0], next;
          for (var kid = child.firstChild; kid !== null; kid = next) {
            next = kid.nextSibling;
            spliceArgs.push(kid);
            kid.parentNode = parent;
          }
          var len = spliceArgs.length;
          if (isReplace) {
            LinkedList2.replace(n, len > 2 ? spliceArgs[2] : null);
          } else if (len > 2 && n !== null) {
            LinkedList2.insertBefore(spliceArgs[2], n);
          }
          if (parent._childNodes) {
            spliceArgs[0] = before === null ? parent._childNodes.length : before._index;
            parent._childNodes.splice.apply(parent._childNodes, spliceArgs);
            for (i = 2; i < len; i++) {
              spliceArgs[i]._index = spliceArgs[0] + (i - 2);
            }
          } else if (parent._firstChild === before) {
            if (len > 2) {
              parent._firstChild = spliceArgs[2];
            } else if (isReplace) {
              parent._firstChild = null;
            }
          }
          if (child._childNodes) {
            child._childNodes.length = 0;
          } else {
            child._firstChild = null;
          }
          if (parent.rooted) {
            parent.modify();
            for (i = 2; i < len; i++) {
              parent.doc.mutateInsert(spliceArgs[i]);
            }
          }
        } else {
          if (before === child) {
            return;
          }
          if (bothRooted) {
            child._remove();
          } else if (child.parentNode) {
            child.remove();
          }
          child.parentNode = parent;
          if (isReplace) {
            LinkedList2.replace(n, child);
            if (parent._childNodes) {
              child._index = before_index;
              parent._childNodes[before_index] = child;
            } else if (parent._firstChild === before) {
              parent._firstChild = child;
            }
          } else {
            if (n !== null) {
              LinkedList2.insertBefore(child, n);
            }
            if (parent._childNodes) {
              child._index = before_index;
              parent._childNodes.splice(before_index, 0, child);
            } else if (parent._firstChild === before) {
              parent._firstChild = child;
            }
          }
          if (bothRooted) {
            parent.modify();
            parent.doc.mutateMove(child);
          } else if (parent.rooted) {
            parent.modify();
            parent.doc.mutateInsert(child);
          }
        }
      }
    },
    // Return the lastModTime value for this node. (For use as a
    // cache invalidation mechanism. If the node does not already
    // have one, initialize it from the owner document's modclock
    // property. (Note that modclock does not return the actual
    // time; it is simply a counter incremented on each document
    // modification)
    lastModTime: {
      get: function() {
        if (!this._lastModTime) {
          this._lastModTime = this.doc.modclock;
        }
        return this._lastModTime;
      }
    },
    // Increment the owner document's modclock and use the new
    // value to update the lastModTime value for this node and
    // all of its ancestors. Nodes that have never had their
    // lastModTime value queried do not need to have a
    // lastModTime property set on them since there is no
    // previously queried value to ever compare the new value
    // against, so only update nodes that already have a
    // _lastModTime property.
    modify: {
      value: function() {
        if (this.doc.modclock) {
          var time = ++this.doc.modclock;
          for (var n = this; n; n = n.parentElement) {
            if (n._lastModTime) {
              n._lastModTime = time;
            }
          }
        }
      }
    },
    // This attribute is not part of the DOM but is quite helpful.
    // It returns the document with which a node is associated.  Usually
    // this is the ownerDocument. But ownerDocument is null for the
    // document object itself, so this is a handy way to get the document
    // regardless of the node type
    doc: {
      get: function() {
        return this.ownerDocument || this;
      }
    },
    // If the node has a nid (node id), then it is rooted in a document
    rooted: {
      get: function() {
        return !!this._nid;
      }
    },
    normalize: {
      value: function() {
        var next;
        for (var child = this.firstChild; child !== null; child = next) {
          next = child.nextSibling;
          if (child.normalize) {
            child.normalize();
          }
          if (child.nodeType !== Node2.TEXT_NODE) {
            continue;
          }
          if (child.nodeValue === "") {
            this.removeChild(child);
            continue;
          }
          var prevChild = child.previousSibling;
          if (prevChild === null) {
            continue;
          } else if (prevChild.nodeType === Node2.TEXT_NODE) {
            prevChild.appendData(child.nodeValue);
            this.removeChild(child);
          }
        }
      }
    },
    // Convert the children of a node to an HTML string.
    // This is used by the innerHTML getter
    // The serialization spec is at:
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#serializing-html-fragments
    //
    // The serialization logic is intentionally implemented in a separate
    // `NodeUtils` helper instead of the more obvious choice of a private
    // `_serializeOne()` method on the `Node.prototype` in order to avoid
    // the megamorphic `this._serializeOne` property access, which reduces
    // performance unnecessarily. If you need specialized behavior for a
    // certain subclass, you'll need to implement that in `NodeUtils`.
    // See https://github.com/fgnass/domino/pull/142 for more information.
    serialize: {
      value: function() {
        if (this._innerHTML) {
          return this._innerHTML;
        }
        var s = "";
        for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
          s += NodeUtils2.serializeOne(kid, this);
        }
        return s;
      }
    },
    // Non-standard, but often useful for debugging.
    outerHTML: {
      get: function() {
        return NodeUtils2.serializeOne(this, {
          nodeType: 0
        });
      },
      set: utils2.nyi
    },
    // mirror node type properties in the prototype, so they are present
    // in instances of Node (and subclasses)
    ELEMENT_NODE: {
      value: ELEMENT_NODE
    },
    ATTRIBUTE_NODE: {
      value: ATTRIBUTE_NODE
    },
    TEXT_NODE: {
      value: TEXT_NODE
    },
    CDATA_SECTION_NODE: {
      value: CDATA_SECTION_NODE
    },
    ENTITY_REFERENCE_NODE: {
      value: ENTITY_REFERENCE_NODE
    },
    ENTITY_NODE: {
      value: ENTITY_NODE
    },
    PROCESSING_INSTRUCTION_NODE: {
      value: PROCESSING_INSTRUCTION_NODE
    },
    COMMENT_NODE: {
      value: COMMENT_NODE
    },
    DOCUMENT_NODE: {
      value: DOCUMENT_NODE
    },
    DOCUMENT_TYPE_NODE: {
      value: DOCUMENT_TYPE_NODE
    },
    DOCUMENT_FRAGMENT_NODE: {
      value: DOCUMENT_FRAGMENT_NODE
    },
    NOTATION_NODE: {
      value: NOTATION_NODE
    },
    DOCUMENT_POSITION_DISCONNECTED: {
      value: DOCUMENT_POSITION_DISCONNECTED
    },
    DOCUMENT_POSITION_PRECEDING: {
      value: DOCUMENT_POSITION_PRECEDING
    },
    DOCUMENT_POSITION_FOLLOWING: {
      value: DOCUMENT_POSITION_FOLLOWING
    },
    DOCUMENT_POSITION_CONTAINS: {
      value: DOCUMENT_POSITION_CONTAINS
    },
    DOCUMENT_POSITION_CONTAINED_BY: {
      value: DOCUMENT_POSITION_CONTAINED_BY
    },
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {
      value: DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
    }
  });
  return Node_1;
}
var NodeList_es6;
var hasRequiredNodeList_es6;
function requireNodeList_es6() {
  if (hasRequiredNodeList_es6) return NodeList_es6;
  hasRequiredNodeList_es6 = 1;
  NodeList_es6 = class NodeList extends Array {
    constructor(a) {
      super(a && a.length || 0);
      if (a) {
        for (var idx in a) {
          this[idx] = a[idx];
        }
      }
    }
    item(i) {
      return this[i] || null;
    }
  };
  return NodeList_es6;
}
var NodeList_es5;
var hasRequiredNodeList_es5;
function requireNodeList_es5() {
  if (hasRequiredNodeList_es5) return NodeList_es5;
  hasRequiredNodeList_es5 = 1;
  function item(i) {
    return this[i] || null;
  }
  function NodeList(a) {
    if (!a) a = [];
    a.item = item;
    return a;
  }
  NodeList_es5 = NodeList;
  return NodeList_es5;
}
var NodeList_1;
var hasRequiredNodeList;
function requireNodeList() {
  if (hasRequiredNodeList) return NodeList_1;
  hasRequiredNodeList = 1;
  var NodeList;
  try {
    NodeList = requireNodeList_es6();
  } catch (e) {
    NodeList = requireNodeList_es5();
  }
  NodeList_1 = NodeList;
  return NodeList_1;
}
var ContainerNode_1;
var hasRequiredContainerNode;
function requireContainerNode() {
  if (hasRequiredContainerNode) return ContainerNode_1;
  hasRequiredContainerNode = 1;
  ContainerNode_1 = ContainerNode;
  var Node2 = requireNode();
  var NodeList = requireNodeList();
  function ContainerNode() {
    Node2.call(this);
    this._firstChild = this._childNodes = null;
  }
  ContainerNode.prototype = Object.create(Node2.prototype, {
    hasChildNodes: {
      value: function() {
        if (this._childNodes) {
          return this._childNodes.length > 0;
        }
        return this._firstChild !== null;
      }
    },
    childNodes: {
      get: function() {
        this._ensureChildNodes();
        return this._childNodes;
      }
    },
    firstChild: {
      get: function() {
        if (this._childNodes) {
          return this._childNodes.length === 0 ? null : this._childNodes[0];
        }
        return this._firstChild;
      }
    },
    lastChild: {
      get: function() {
        var kids = this._childNodes, first;
        if (kids) {
          return kids.length === 0 ? null : kids[kids.length - 1];
        }
        first = this._firstChild;
        if (first === null) {
          return null;
        }
        return first._previousSibling;
      }
    },
    _ensureChildNodes: {
      value: function() {
        if (this._childNodes) {
          return;
        }
        var first = this._firstChild, kid = first, childNodes = this._childNodes = new NodeList();
        if (first) do {
          childNodes.push(kid);
          kid = kid._nextSibling;
        } while (kid !== first);
        this._firstChild = null;
      }
    },
    // Remove all of this node's children.  This is a minor
    // optimization that only calls modify() once.
    removeChildren: {
      value: function removeChildren() {
        var root2 = this.rooted ? this.ownerDocument : null, next = this.firstChild, kid;
        while (next !== null) {
          kid = next;
          next = kid.nextSibling;
          if (root2) root2.mutateRemove(kid);
          kid.parentNode = null;
        }
        if (this._childNodes) {
          this._childNodes.length = 0;
        } else {
          this._firstChild = null;
        }
        this.modify();
      }
    }
  });
  return ContainerNode_1;
}
var xmlnames = {};
var hasRequiredXmlnames;
function requireXmlnames() {
  if (hasRequiredXmlnames) return xmlnames;
  hasRequiredXmlnames = 1;
  xmlnames.isValidName = isValidName;
  xmlnames.isValidQName = isValidQName;
  var simplename = /^[_:A-Za-z][-.:\w]+$/;
  var simpleqname = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/;
  var ncnamestartchars = "_A-Za-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�";
  var ncnamechars = "-._A-Za-z0-9·À-ÖØ-öø-˿̀-ͽͿ-῿‌‍‿⁀⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�";
  var ncname = "[" + ncnamestartchars + "][" + ncnamechars + "]*";
  var namestartchars = ncnamestartchars + ":";
  var namechars = ncnamechars + ":";
  var name = new RegExp("^[" + namestartchars + "][" + namechars + "]*$");
  var qname = new RegExp("^(" + ncname + "|" + ncname + ":" + ncname + ")$");
  var hassurrogates = /[\uD800-\uDB7F\uDC00-\uDFFF]/;
  var surrogatechars = /[\uD800-\uDB7F\uDC00-\uDFFF]/g;
  var surrogatepairs = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
  ncnamestartchars += "\uD800-󯰀-\uDFFF";
  ncnamechars += "\uD800-󯰀-\uDFFF";
  ncname = "[" + ncnamestartchars + "][" + ncnamechars + "]*";
  namestartchars = ncnamestartchars + ":";
  namechars = ncnamechars + ":";
  var surrogatename = new RegExp("^[" + namestartchars + "][" + namechars + "]*$");
  var surrogateqname = new RegExp("^(" + ncname + "|" + ncname + ":" + ncname + ")$");
  function isValidName(s) {
    if (simplename.test(s)) return true;
    if (name.test(s)) return true;
    if (!hassurrogates.test(s)) return false;
    if (!surrogatename.test(s)) return false;
    var chars = s.match(surrogatechars), pairs = s.match(surrogatepairs);
    return pairs !== null && 2 * pairs.length === chars.length;
  }
  function isValidQName(s) {
    if (simpleqname.test(s)) return true;
    if (qname.test(s)) return true;
    if (!hassurrogates.test(s)) return false;
    if (!surrogateqname.test(s)) return false;
    var chars = s.match(surrogatechars), pairs = s.match(surrogatepairs);
    return pairs !== null && 2 * pairs.length === chars.length;
  }
  return xmlnames;
}
var attributes = {};
var hasRequiredAttributes;
function requireAttributes() {
  if (hasRequiredAttributes) return attributes;
  hasRequiredAttributes = 1;
  var utils2 = requireUtils();
  attributes.property = function(attr) {
    if (Array.isArray(attr.type)) {
      var valid = /* @__PURE__ */ Object.create(null);
      attr.type.forEach(function(val) {
        valid[val.value || val] = val.alias || val;
      });
      var missingValueDefault = attr.missing;
      if (missingValueDefault === void 0) {
        missingValueDefault = null;
      }
      var invalidValueDefault = attr.invalid;
      if (invalidValueDefault === void 0) {
        invalidValueDefault = missingValueDefault;
      }
      return {
        get: function() {
          var v = this._getattr(attr.name);
          if (v === null) return missingValueDefault;
          v = valid[v.toLowerCase()];
          if (v !== void 0) return v;
          if (invalidValueDefault !== null) return invalidValueDefault;
          return v;
        },
        set: function(v) {
          this._setattr(attr.name, v);
        }
      };
    } else if (attr.type === Boolean) {
      return {
        get: function() {
          return this.hasAttribute(attr.name);
        },
        set: function(v) {
          if (v) {
            this._setattr(attr.name, "");
          } else {
            this.removeAttribute(attr.name);
          }
        }
      };
    } else if (attr.type === Number || attr.type === "long" || attr.type === "unsigned long" || attr.type === "limited unsigned long with fallback") {
      return numberPropDesc(attr);
    } else if (!attr.type || attr.type === String) {
      return {
        get: function() {
          return this._getattr(attr.name) || "";
        },
        set: function(v) {
          if (attr.treatNullAsEmptyString && v === null) {
            v = "";
          }
          this._setattr(attr.name, v);
        }
      };
    } else if (typeof attr.type === "function") {
      return attr.type(attr.name, attr);
    }
    throw new Error("Invalid attribute definition");
  };
  function numberPropDesc(a) {
    var def;
    if (typeof a.default === "function") {
      def = a.default;
    } else if (typeof a.default === "number") {
      def = function() {
        return a.default;
      };
    } else {
      def = function() {
        utils2.assert(false, typeof a.default);
      };
    }
    var unsigned_long = a.type === "unsigned long";
    var signed_long = a.type === "long";
    var unsigned_fallback = a.type === "limited unsigned long with fallback";
    var min = a.min, max = a.max, setmin = a.setmin;
    if (min === void 0) {
      if (unsigned_long) min = 0;
      if (signed_long) min = -2147483648;
      if (unsigned_fallback) min = 1;
    }
    if (max === void 0) {
      if (unsigned_long || signed_long || unsigned_fallback) max = 2147483647;
    }
    return {
      get: function() {
        var v = this._getattr(a.name);
        var n = a.float ? parseFloat(v) : parseInt(v, 10);
        if (v === null || !isFinite(n) || min !== void 0 && n < min || max !== void 0 && n > max) {
          return def.call(this);
        }
        if (unsigned_long || signed_long || unsigned_fallback) {
          if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(v)) {
            return def.call(this);
          }
          n = n | 0;
        }
        return n;
      },
      set: function(v) {
        if (!a.float) {
          v = Math.floor(v);
        }
        if (setmin !== void 0 && v < setmin) {
          utils2.IndexSizeError(a.name + " set to " + v);
        }
        if (unsigned_long) {
          v = v < 0 || v > 2147483647 ? def.call(this) : v | 0;
        } else if (unsigned_fallback) {
          v = v < 1 || v > 2147483647 ? def.call(this) : v | 0;
        } else if (signed_long) {
          v = v < -2147483648 || v > 2147483647 ? def.call(this) : v | 0;
        }
        this._setattr(a.name, String(v));
      }
    };
  }
  attributes.registerChangeHandler = function(c, name, handler) {
    var p = c.prototype;
    if (!Object.prototype.hasOwnProperty.call(p, "_attributeChangeHandlers")) {
      p._attributeChangeHandlers = Object.create(p._attributeChangeHandlers || null);
    }
    p._attributeChangeHandlers[name] = handler;
  };
  return attributes;
}
var FilteredElementList_1;
var hasRequiredFilteredElementList;
function requireFilteredElementList() {
  if (hasRequiredFilteredElementList) return FilteredElementList_1;
  hasRequiredFilteredElementList = 1;
  FilteredElementList_1 = FilteredElementList;
  var Node2 = requireNode();
  function FilteredElementList(root2, filter2) {
    this.root = root2;
    this.filter = filter2;
    this.lastModTime = root2.lastModTime;
    this.done = false;
    this.cache = [];
    this.traverse();
  }
  FilteredElementList.prototype = Object.create(Object.prototype, {
    length: {
      get: function() {
        this.checkcache();
        if (!this.done) this.traverse();
        return this.cache.length;
      }
    },
    item: {
      value: function(n) {
        this.checkcache();
        if (!this.done && n >= this.cache.length) {
          this.traverse(
            /*n*/
          );
        }
        return this.cache[n];
      }
    },
    checkcache: {
      value: function() {
        if (this.lastModTime !== this.root.lastModTime) {
          for (var i = this.cache.length - 1; i >= 0; i--) {
            this[i] = void 0;
          }
          this.cache.length = 0;
          this.done = false;
          this.lastModTime = this.root.lastModTime;
        }
      }
    },
    // If n is specified, then traverse the tree until we've found the nth
    // item (or until we've found all items).  If n is not specified,
    // traverse until we've found all items.
    traverse: {
      value: function(n) {
        if (n !== void 0) n++;
        var elt;
        while ((elt = this.next()) !== null) {
          this[this.cache.length] = elt;
          this.cache.push(elt);
          if (n && this.cache.length === n) return;
        }
        this.done = true;
      }
    },
    // Return the next element under root that matches filter
    next: {
      value: function() {
        var start = this.cache.length === 0 ? this.root : this.cache[this.cache.length - 1];
        var elt;
        if (start.nodeType === Node2.DOCUMENT_NODE) elt = start.documentElement;
        else elt = start.nextElement(this.root);
        while (elt) {
          if (this.filter(elt)) {
            return elt;
          }
          elt = elt.nextElement(this.root);
        }
        return null;
      }
    }
  });
  return FilteredElementList_1;
}
var DOMTokenList_1;
var hasRequiredDOMTokenList;
function requireDOMTokenList() {
  if (hasRequiredDOMTokenList) return DOMTokenList_1;
  hasRequiredDOMTokenList = 1;
  var utils2 = requireUtils();
  DOMTokenList_1 = DOMTokenList;
  function DOMTokenList(getter, setter) {
    this._getString = getter;
    this._setString = setter;
    this._length = 0;
    this._lastStringValue = "";
    this._update();
  }
  Object.defineProperties(DOMTokenList.prototype, {
    length: {
      get: function() {
        return this._length;
      }
    },
    item: {
      value: function(index2) {
        var list = getList(this);
        if (index2 < 0 || index2 >= list.length) {
          return null;
        }
        return list[index2];
      }
    },
    contains: {
      value: function(token) {
        token = String(token);
        var list = getList(this);
        return list.indexOf(token) > -1;
      }
    },
    add: {
      value: function() {
        var list = getList(this);
        for (var i = 0, len = arguments.length; i < len; i++) {
          var token = handleErrors(arguments[i]);
          if (list.indexOf(token) < 0) {
            list.push(token);
          }
        }
        this._update(list);
      }
    },
    remove: {
      value: function() {
        var list = getList(this);
        for (var i = 0, len = arguments.length; i < len; i++) {
          var token = handleErrors(arguments[i]);
          var index2 = list.indexOf(token);
          if (index2 > -1) {
            list.splice(index2, 1);
          }
        }
        this._update(list);
      }
    },
    toggle: {
      value: function toggle(token, force) {
        token = handleErrors(token);
        if (this.contains(token)) {
          if (force === void 0 || force === false) {
            this.remove(token);
            return false;
          }
          return true;
        } else {
          if (force === void 0 || force === true) {
            this.add(token);
            return true;
          }
          return false;
        }
      }
    },
    replace: {
      value: function replace(token, newToken) {
        if (String(newToken) === "") {
          utils2.SyntaxError();
        }
        token = handleErrors(token);
        newToken = handleErrors(newToken);
        var list = getList(this);
        var idx = list.indexOf(token);
        if (idx < 0) {
          return false;
        }
        var idx2 = list.indexOf(newToken);
        if (idx2 < 0) {
          list[idx] = newToken;
        } else {
          if (idx < idx2) {
            list[idx] = newToken;
            list.splice(idx2, 1);
          } else {
            list.splice(idx, 1);
          }
        }
        this._update(list);
        return true;
      }
    },
    toString: {
      value: function() {
        return this._getString();
      }
    },
    value: {
      get: function() {
        return this._getString();
      },
      set: function(v) {
        this._setString(v);
        this._update();
      }
    },
    // Called when the setter is called from outside this interface.
    _update: {
      value: function(list) {
        if (list) {
          fixIndex(this, list);
          this._setString(list.join(" ").trim());
        } else {
          fixIndex(this, getList(this));
        }
        this._lastStringValue = this._getString();
      }
    }
  });
  function fixIndex(clist, list) {
    var oldLength = clist._length;
    var i;
    clist._length = list.length;
    for (i = 0; i < list.length; i++) {
      clist[i] = list[i];
    }
    for (; i < oldLength; i++) {
      clist[i] = void 0;
    }
  }
  function handleErrors(token) {
    token = String(token);
    if (token === "") {
      utils2.SyntaxError();
    }
    if (/[ \t\r\n\f]/.test(token)) {
      utils2.InvalidCharacterError();
    }
    return token;
  }
  function toArray(clist) {
    var length = clist._length;
    var arr = Array(length);
    for (var i = 0; i < length; i++) {
      arr[i] = clist[i];
    }
    return arr;
  }
  function getList(clist) {
    var strProp = clist._getString();
    if (strProp === clist._lastStringValue) {
      return toArray(clist);
    }
    var str = strProp.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
    if (str === "") {
      return [];
    } else {
      var seen = /* @__PURE__ */ Object.create(null);
      return str.split(/[ \t\r\n\f]+/g).filter(function(n) {
        var key = "$" + n;
        if (seen[key]) {
          return false;
        }
        seen[key] = true;
        return true;
      });
    }
  }
  return DOMTokenList_1;
}
var select = {
  exports: {}
};
var hasRequiredSelect;
function requireSelect() {
  if (hasRequiredSelect) return select.exports;
  hasRequiredSelect = 1;
  (function(module, exports) {
    var window2 = Object.create(null, {
      location: {
        get: function() {
          throw new Error("window.location is not supported.");
        }
      }
    });
    var compareDocumentPosition2 = function(a, b) {
      return a.compareDocumentPosition(b);
    };
    var order = function(a, b) {
      return compareDocumentPosition2(a, b) & 2 ? 1 : -1;
    };
    var next = function(el) {
      while ((el = el.nextSibling) && el.nodeType !== 1) ;
      return el;
    };
    var prev = function(el) {
      while ((el = el.previousSibling) && el.nodeType !== 1) ;
      return el;
    };
    var child = function(el) {
      if (el = el.firstChild) {
        while (el.nodeType !== 1 && (el = el.nextSibling)) ;
      }
      return el;
    };
    var lastChild = function(el) {
      if (el = el.lastChild) {
        while (el.nodeType !== 1 && (el = el.previousSibling)) ;
      }
      return el;
    };
    var parentIsElement = function(n) {
      if (!n.parentNode) {
        return false;
      }
      var nodeType = n.parentNode.nodeType;
      return nodeType === 1 || nodeType === 9;
    };
    var unquote = function(str) {
      if (!str) return str;
      var ch = str[0];
      if (ch === '"' || ch === "'") {
        if (str[str.length - 1] === ch) {
          str = str.slice(1, -1);
        } else {
          str = str.slice(1);
        }
        return str.replace(rules.str_escape, function(s) {
          var m = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(s);
          if (!m) {
            return s.slice(1);
          }
          if (m[2]) {
            return "";
          }
          var cp2 = parseInt(m[1], 16);
          return String.fromCodePoint ? String.fromCodePoint(cp2) : (
            // Not all JavaScript implementations have String.fromCodePoint yet.
            String.fromCharCode(cp2)
          );
        });
      } else if (rules.ident.test(str)) {
        return decodeid(str);
      } else {
        return str;
      }
    };
    var decodeid = function(str) {
      return str.replace(rules.escape, function(s) {
        var m = /^\\([0-9A-Fa-f]+)/.exec(s);
        if (!m) {
          return s[1];
        }
        var cp2 = parseInt(m[1], 16);
        return String.fromCodePoint ? String.fromCodePoint(cp2) : (
          // Not all JavaScript implementations have String.fromCodePoint yet.
          String.fromCharCode(cp2)
        );
      });
    };
    var indexOf = (function() {
      if (Array.prototype.indexOf) {
        return Array.prototype.indexOf;
      }
      return function(obj, item) {
        var i = this.length;
        while (i--) {
          if (this[i] === item) return i;
        }
        return -1;
      };
    })();
    var makeInside = function(start, end) {
      var regex = rules.inside.source.replace(/</g, start).replace(/>/g, end);
      return new RegExp(regex);
    };
    var replace = function(regex, name, val) {
      regex = regex.source;
      regex = regex.replace(name, val.source || val);
      return new RegExp(regex);
    };
    var truncateUrl = function(url, num) {
      return url.replace(/^(?:\w+:\/\/|\/+)/, "").replace(/(?:\/+|\/*#.*?)$/, "").split("/", num).join("/");
    };
    var parseNth = function(param_, test) {
      var param = param_.replace(/\s+/g, ""), cap;
      if (param === "even") {
        param = "2n+0";
      } else if (param === "odd") {
        param = "2n+1";
      } else if (param.indexOf("n") === -1) {
        param = "0n" + param;
      }
      cap = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(param);
      return {
        group: cap[1] === "-" ? -(cap[2] || 1) : +(cap[2] || 1),
        offset: cap[4] ? cap[3] === "-" ? -cap[4] : +cap[4] : 0
      };
    };
    var nth = function(param_, test, last) {
      var param = parseNth(param_), group = param.group, offset = param.offset, find3 = !last ? child : lastChild, advance = !last ? next : prev;
      return function(el) {
        if (!parentIsElement(el)) return;
        var rel = find3(el.parentNode), pos = 0;
        while (rel) {
          if (test(rel, el)) pos++;
          if (rel === el) {
            pos -= offset;
            return group && pos ? pos % group === 0 && pos < 0 === group < 0 : !pos;
          }
          rel = advance(rel);
        }
      };
    };
    var selectors = {
      "*": /* @__PURE__ */ (function() {
        return function() {
          return true;
        };
      })(),
      "type": function(type) {
        type = type.toLowerCase();
        return function(el) {
          return el.nodeName.toLowerCase() === type;
        };
      },
      "attr": function(key, op, val, i) {
        op = operators[op];
        return function(el) {
          var attr;
          switch (key) {
            case "for":
              attr = el.htmlFor;
              break;
            case "class":
              attr = el.className;
              if (attr === "" && el.getAttribute("class") == null) {
                attr = null;
              }
              break;
            case "href":
            case "src":
              attr = el.getAttribute(key, 2);
              break;
            case "title":
              attr = el.getAttribute("title") || null;
              break;
            // careful with attributes with special getter functions
            case "id":
            case "lang":
            case "dir":
            case "accessKey":
            case "hidden":
            case "tabIndex":
            case "style":
              if (el.getAttribute) {
                attr = el.getAttribute(key);
                break;
              }
            /* falls through */
            default:
              if (el.hasAttribute && !el.hasAttribute(key)) {
                break;
              }
              attr = el[key] != null ? el[key] : el.getAttribute && el.getAttribute(key);
              break;
          }
          if (attr == null) return;
          attr = attr + "";
          if (i) {
            attr = attr.toLowerCase();
            val = val.toLowerCase();
          }
          return op(attr, val);
        };
      },
      ":first-child": function(el) {
        return !prev(el) && parentIsElement(el);
      },
      ":last-child": function(el) {
        return !next(el) && parentIsElement(el);
      },
      ":only-child": function(el) {
        return !prev(el) && !next(el) && parentIsElement(el);
      },
      ":nth-child": function(param, last) {
        return nth(param, function() {
          return true;
        }, last);
      },
      ":nth-last-child": function(param) {
        return selectors[":nth-child"](param, true);
      },
      ":root": function(el) {
        return el.ownerDocument.documentElement === el;
      },
      ":empty": function(el) {
        return !el.firstChild;
      },
      ":not": function(sel) {
        var test = compileGroup(sel);
        return function(el) {
          return !test(el);
        };
      },
      ":first-of-type": function(el) {
        if (!parentIsElement(el)) return;
        var type = el.nodeName;
        while (el = prev(el)) {
          if (el.nodeName === type) return;
        }
        return true;
      },
      ":last-of-type": function(el) {
        if (!parentIsElement(el)) return;
        var type = el.nodeName;
        while (el = next(el)) {
          if (el.nodeName === type) return;
        }
        return true;
      },
      ":only-of-type": function(el) {
        return selectors[":first-of-type"](el) && selectors[":last-of-type"](el);
      },
      ":nth-of-type": function(param, last) {
        return nth(param, function(rel, el) {
          return rel.nodeName === el.nodeName;
        }, last);
      },
      ":nth-last-of-type": function(param) {
        return selectors[":nth-of-type"](param, true);
      },
      ":checked": function(el) {
        return !!(el.checked || el.selected);
      },
      ":indeterminate": function(el) {
        return !selectors[":checked"](el);
      },
      ":enabled": function(el) {
        return !el.disabled && el.type !== "hidden";
      },
      ":disabled": function(el) {
        return !!el.disabled;
      },
      ":target": function(el) {
        return el.id === window2.location.hash.substring(1);
      },
      ":focus": function(el) {
        return el === el.ownerDocument.activeElement;
      },
      ":is": function(sel) {
        return compileGroup(sel);
      },
      // :matches is an older name for :is; see
      // https://github.com/w3c/csswg-drafts/issues/3258
      ":matches": function(sel) {
        return selectors[":is"](sel);
      },
      ":nth-match": function(param, last) {
        var args = param.split(/\s*,\s*/), arg = args.shift(), test = compileGroup(args.join(","));
        return nth(arg, test, last);
      },
      ":nth-last-match": function(param) {
        return selectors[":nth-match"](param, true);
      },
      ":links-here": function(el) {
        return el + "" === window2.location + "";
      },
      ":lang": function(param) {
        return function(el) {
          while (el) {
            if (el.lang) return el.lang.indexOf(param) === 0;
            el = el.parentNode;
          }
        };
      },
      ":dir": function(param) {
        return function(el) {
          while (el) {
            if (el.dir) return el.dir === param;
            el = el.parentNode;
          }
        };
      },
      ":scope": function(el, con) {
        var context = con || el.ownerDocument;
        if (context.nodeType === 9) {
          return el === context.documentElement;
        }
        return el === context;
      },
      ":any-link": function(el) {
        return typeof el.href === "string";
      },
      ":local-link": function(el) {
        if (el.nodeName) {
          return el.href && el.host === window2.location.host;
        }
        var param = +el + 1;
        return function(el2) {
          if (!el2.href) return;
          var url = window2.location + "", href = el2 + "";
          return truncateUrl(url, param) === truncateUrl(href, param);
        };
      },
      ":default": function(el) {
        return !!el.defaultSelected;
      },
      ":valid": function(el) {
        return el.willValidate || el.validity && el.validity.valid;
      },
      ":invalid": function(el) {
        return !selectors[":valid"](el);
      },
      ":in-range": function(el) {
        return el.value > el.min && el.value <= el.max;
      },
      ":out-of-range": function(el) {
        return !selectors[":in-range"](el);
      },
      ":required": function(el) {
        return !!el.required;
      },
      ":optional": function(el) {
        return !el.required;
      },
      ":read-only": function(el) {
        if (el.readOnly) return true;
        var attr = el.getAttribute("contenteditable"), prop = el.contentEditable, name = el.nodeName.toLowerCase();
        name = name !== "input" && name !== "textarea";
        return (name || el.disabled) && attr == null && prop !== "true";
      },
      ":read-write": function(el) {
        return !selectors[":read-only"](el);
      },
      ":hover": function() {
        throw new Error(":hover is not supported.");
      },
      ":active": function() {
        throw new Error(":active is not supported.");
      },
      ":link": function() {
        throw new Error(":link is not supported.");
      },
      ":visited": function() {
        throw new Error(":visited is not supported.");
      },
      ":column": function() {
        throw new Error(":column is not supported.");
      },
      ":nth-column": function() {
        throw new Error(":nth-column is not supported.");
      },
      ":nth-last-column": function() {
        throw new Error(":nth-last-column is not supported.");
      },
      ":current": function() {
        throw new Error(":current is not supported.");
      },
      ":past": function() {
        throw new Error(":past is not supported.");
      },
      ":future": function() {
        throw new Error(":future is not supported.");
      },
      // Non-standard, for compatibility purposes.
      ":contains": function(param) {
        return function(el) {
          var text = el.innerText || el.textContent || el.value || "";
          return text.indexOf(param) !== -1;
        };
      },
      ":has": function(param) {
        return function(el) {
          return find2(param, el).length > 0;
        };
      }
      // Potentially add more pseudo selectors for
      // compatibility with sizzle and most other
      // selector engines (?).
    };
    var operators = {
      "-": function() {
        return true;
      },
      "=": function(attr, val) {
        return attr === val;
      },
      "*=": function(attr, val) {
        return attr.indexOf(val) !== -1;
      },
      "~=": function(attr, val) {
        var i, s, f, l;
        for (s = 0; true; s = i + 1) {
          i = attr.indexOf(val, s);
          if (i === -1) return false;
          f = attr[i - 1];
          l = attr[i + val.length];
          if ((!f || f === " ") && (!l || l === " ")) return true;
        }
      },
      "|=": function(attr, val) {
        var i = attr.indexOf(val), l;
        if (i !== 0) return;
        l = attr[i + val.length];
        return l === "-" || !l;
      },
      "^=": function(attr, val) {
        return attr.indexOf(val) === 0;
      },
      "$=": function(attr, val) {
        var i = attr.lastIndexOf(val);
        return i !== -1 && i + val.length === attr.length;
      },
      // non-standard
      "!=": function(attr, val) {
        return attr !== val;
      }
    };
    var combinators = {
      " ": function(test) {
        return function(el) {
          while (el = el.parentNode) {
            if (test(el)) return el;
          }
        };
      },
      ">": function(test) {
        return function(el) {
          if (el = el.parentNode) {
            return test(el) && el;
          }
        };
      },
      "+": function(test) {
        return function(el) {
          if (el = prev(el)) {
            return test(el) && el;
          }
        };
      },
      "~": function(test) {
        return function(el) {
          while (el = prev(el)) {
            if (test(el)) return el;
          }
        };
      },
      "noop": function(test) {
        return function(el) {
          return test(el) && el;
        };
      },
      "ref": function(test, name) {
        var node2;
        function ref(el) {
          var doc = el.ownerDocument, nodes = doc.getElementsByTagName("*"), i = nodes.length;
          while (i--) {
            node2 = nodes[i];
            if (ref.test(el)) {
              node2 = null;
              return true;
            }
          }
          node2 = null;
        }
        ref.combinator = function(el) {
          if (!node2 || !node2.getAttribute) return;
          var attr = node2.getAttribute(name) || "";
          if (attr[0] === "#") attr = attr.substring(1);
          if (attr === el.id && test(node2)) {
            return node2;
          }
        };
        return ref;
      }
    };
    var rules = {
      escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
      str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
      nonascii: /[\u00A0-\uFFFF]/,
      cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
      qname: /^ *(cssid|\*)/,
      simple: /^(?:([.#]cssid)|pseudo|attr)/,
      ref: /^ *\/(cssid)\/ */,
      combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
      attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
      pseudo: /^(:cssid)(?:\((inside)\))?/,
      inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
      ident: /^(cssid)$/
    };
    rules.cssid = replace(rules.cssid, "nonascii", rules.nonascii);
    rules.cssid = replace(rules.cssid, "escape", rules.escape);
    rules.qname = replace(rules.qname, "cssid", rules.cssid);
    rules.simple = replace(rules.simple, "cssid", rules.cssid);
    rules.ref = replace(rules.ref, "cssid", rules.cssid);
    rules.attr = replace(rules.attr, "cssid", rules.cssid);
    rules.pseudo = replace(rules.pseudo, "cssid", rules.cssid);
    rules.inside = replace(rules.inside, `[^"'>]*`, rules.inside);
    rules.attr = replace(rules.attr, "inside", makeInside("\\[", "\\]"));
    rules.pseudo = replace(rules.pseudo, "inside", makeInside("\\(", "\\)"));
    rules.simple = replace(rules.simple, "pseudo", rules.pseudo);
    rules.simple = replace(rules.simple, "attr", rules.attr);
    rules.ident = replace(rules.ident, "cssid", rules.cssid);
    rules.str_escape = replace(rules.str_escape, "escape", rules.escape);
    var compile2 = function(sel_) {
      var sel = sel_.replace(/^\s+|\s+$/g, ""), test, filter2 = [], buff = [], subject, qname, cap, op, ref;
      while (sel) {
        if (cap = rules.qname.exec(sel)) {
          sel = sel.substring(cap[0].length);
          qname = decodeid(cap[1]);
          buff.push(tok(qname, true));
        } else if (cap = rules.simple.exec(sel)) {
          sel = sel.substring(cap[0].length);
          qname = "*";
          buff.push(tok(qname, true));
          buff.push(tok(cap));
        } else {
          throw new SyntaxError("Invalid selector.");
        }
        while (cap = rules.simple.exec(sel)) {
          sel = sel.substring(cap[0].length);
          buff.push(tok(cap));
        }
        if (sel[0] === "!") {
          sel = sel.substring(1);
          subject = makeSubject();
          subject.qname = qname;
          buff.push(subject.simple);
        }
        if (cap = rules.ref.exec(sel)) {
          sel = sel.substring(cap[0].length);
          ref = combinators.ref(makeSimple(buff), decodeid(cap[1]));
          filter2.push(ref.combinator);
          buff = [];
          continue;
        }
        if (cap = rules.combinator.exec(sel)) {
          sel = sel.substring(cap[0].length);
          op = cap[1] || cap[2] || cap[3];
          if (op === ",") {
            filter2.push(combinators.noop(makeSimple(buff)));
            break;
          }
        } else {
          op = "noop";
        }
        if (!combinators[op]) {
          throw new SyntaxError("Bad combinator.");
        }
        filter2.push(combinators[op](makeSimple(buff)));
        buff = [];
      }
      test = makeTest(filter2);
      test.qname = qname;
      test.sel = sel;
      if (subject) {
        subject.lname = test.qname;
        subject.test = test;
        subject.qname = subject.qname;
        subject.sel = test.sel;
        test = subject;
      }
      if (ref) {
        ref.test = test;
        ref.qname = test.qname;
        ref.sel = test.sel;
        test = ref;
      }
      return test;
    };
    var tok = function(cap, qname) {
      if (qname) {
        return cap === "*" ? selectors["*"] : selectors.type(cap);
      }
      if (cap[1]) {
        return cap[1][0] === "." ? selectors.attr("class", "~=", decodeid(cap[1].substring(1)), false) : selectors.attr("id", "=", decodeid(cap[1].substring(1)), false);
      }
      if (cap[2]) {
        return cap[3] ? selectors[decodeid(cap[2])](unquote(cap[3])) : selectors[decodeid(cap[2])];
      }
      if (cap[4]) {
        var value = cap[6];
        var i = /["'\s]\s*I$/i.test(value);
        if (i) {
          value = value.replace(/\s*I$/i, "");
        }
        return selectors.attr(decodeid(cap[4]), cap[5] || "-", unquote(value), i);
      }
      throw new SyntaxError("Unknown Selector.");
    };
    var makeSimple = function(func) {
      var l = func.length, i;
      if (l < 2) return func[0];
      return function(el) {
        if (!el) return;
        for (i = 0; i < l; i++) {
          if (!func[i](el)) return;
        }
        return true;
      };
    };
    var makeTest = function(func) {
      if (func.length < 2) {
        return function(el) {
          return !!func[0](el);
        };
      }
      return function(el) {
        var i = func.length;
        while (i--) {
          if (!(el = func[i](el))) return;
        }
        return true;
      };
    };
    var makeSubject = function() {
      var target;
      function subject(el) {
        var node2 = el.ownerDocument, scope = node2.getElementsByTagName(subject.lname), i = scope.length;
        while (i--) {
          if (subject.test(scope[i]) && target === el) {
            target = null;
            return true;
          }
        }
        target = null;
      }
      subject.simple = function(el) {
        target = el;
        return true;
      };
      return subject;
    };
    var compileGroup = function(sel) {
      var test = compile2(sel), tests = [test];
      while (test.sel) {
        test = compile2(test.sel);
        tests.push(test);
      }
      if (tests.length < 2) return test;
      return function(el) {
        var l = tests.length, i = 0;
        for (; i < l; i++) {
          if (tests[i](el)) return true;
        }
      };
    };
    var find2 = function(sel, node2) {
      var results = [], test = compile2(sel), scope = node2.getElementsByTagName(test.qname), i = 0, el;
      while (el = scope[i++]) {
        if (test(el)) results.push(el);
      }
      if (test.sel) {
        while (test.sel) {
          test = compile2(test.sel);
          scope = node2.getElementsByTagName(test.qname);
          i = 0;
          while (el = scope[i++]) {
            if (test(el) && indexOf.call(results, el) === -1) {
              results.push(el);
            }
          }
        }
        results.sort(order);
      }
      return results;
    };
    module.exports = exports = function(sel, context) {
      var id, r;
      if (context.nodeType !== 11 && sel.indexOf(" ") === -1) {
        if (sel[0] === "#" && context.rooted && /^#[A-Z_][-A-Z0-9_]*$/i.test(sel)) {
          if (context.doc._hasMultipleElementsWithId) {
            id = sel.substring(1);
            if (!context.doc._hasMultipleElementsWithId(id)) {
              r = context.doc.getElementById(id);
              return r ? [r] : [];
            }
          }
        }
        if (sel[0] === "." && /^\.\w+$/.test(sel)) {
          return context.getElementsByClassName(sel.substring(1));
        }
        if (/^\w+$/.test(sel)) {
          return context.getElementsByTagName(sel);
        }
      }
      return find2(sel, context);
    };
    exports.selectors = selectors;
    exports.operators = operators;
    exports.combinators = combinators;
    exports.matches = function(el, sel) {
      var test = {
        sel
      };
      do {
        test = compile2(test.sel);
        if (test(el)) {
          return true;
        }
      } while (test.sel);
      return false;
    };
  })(select, select.exports);
  return select.exports;
}
var ChildNode_1;
var hasRequiredChildNode;
function requireChildNode() {
  if (hasRequiredChildNode) return ChildNode_1;
  hasRequiredChildNode = 1;
  var Node2 = requireNode();
  var LinkedList2 = requireLinkedList();
  var createDocumentFragmentFromArguments = function(document2, args) {
    var docFrag = document2.createDocumentFragment();
    for (var i = 0; i < args.length; i++) {
      var argItem = args[i];
      var isNode = argItem instanceof Node2;
      docFrag.appendChild(isNode ? argItem : document2.createTextNode(String(argItem)));
    }
    return docFrag;
  };
  var ChildNode = {
    // Inserts a set of Node or String objects in the children list of this
    // ChildNode's parent, just after this ChildNode.  String objects are
    // inserted as the equivalent Text nodes.
    after: {
      value: function after() {
        var argArr = Array.prototype.slice.call(arguments);
        var parentNode = this.parentNode, nextSibling = this.nextSibling;
        if (parentNode === null) {
          return;
        }
        while (nextSibling && argArr.some(function(v) {
          return v === nextSibling;
        })) nextSibling = nextSibling.nextSibling;
        var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
        parentNode.insertBefore(docFrag, nextSibling);
      }
    },
    // Inserts a set of Node or String objects in the children list of this
    // ChildNode's parent, just before this ChildNode.  String objects are
    // inserted as the equivalent Text nodes.
    before: {
      value: function before() {
        var argArr = Array.prototype.slice.call(arguments);
        var parentNode = this.parentNode, prevSibling = this.previousSibling;
        if (parentNode === null) {
          return;
        }
        while (prevSibling && argArr.some(function(v) {
          return v === prevSibling;
        })) prevSibling = prevSibling.previousSibling;
        var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
        var nextSibling = prevSibling ? prevSibling.nextSibling : parentNode.firstChild;
        parentNode.insertBefore(docFrag, nextSibling);
      }
    },
    // Remove this node from its parent
    remove: {
      value: function remove() {
        if (this.parentNode === null) return;
        if (this.doc) {
          this.doc._preremoveNodeIterators(this);
          if (this.rooted) {
            this.doc.mutateRemove(this);
          }
        }
        this._remove();
        this.parentNode = null;
      }
    },
    // Remove this node w/o uprooting or sending mutation events
    // (But do update the structure id for all ancestors)
    _remove: {
      value: function _remove() {
        var parent = this.parentNode;
        if (parent === null) return;
        if (parent._childNodes) {
          parent._childNodes.splice(this.index, 1);
        } else if (parent._firstChild === this) {
          if (this._nextSibling === this) {
            parent._firstChild = null;
          } else {
            parent._firstChild = this._nextSibling;
          }
        }
        LinkedList2.remove(this);
        parent.modify();
      }
    },
    // Replace this node with the nodes or strings provided as arguments.
    replaceWith: {
      value: function replaceWith() {
        var argArr = Array.prototype.slice.call(arguments);
        var parentNode = this.parentNode, nextSibling = this.nextSibling;
        if (parentNode === null) {
          return;
        }
        while (nextSibling && argArr.some(function(v) {
          return v === nextSibling;
        })) nextSibling = nextSibling.nextSibling;
        var docFrag = createDocumentFragmentFromArguments(this.doc, argArr);
        if (this.parentNode === parentNode) {
          parentNode.replaceChild(docFrag, this);
        } else {
          parentNode.insertBefore(docFrag, nextSibling);
        }
      }
    }
  };
  ChildNode_1 = ChildNode;
  return ChildNode_1;
}
var NonDocumentTypeChildNode_1;
var hasRequiredNonDocumentTypeChildNode;
function requireNonDocumentTypeChildNode() {
  if (hasRequiredNonDocumentTypeChildNode) return NonDocumentTypeChildNode_1;
  hasRequiredNonDocumentTypeChildNode = 1;
  var Node2 = requireNode();
  var NonDocumentTypeChildNode = {
    nextElementSibling: {
      get: function() {
        if (this.parentNode) {
          for (var kid = this.nextSibling; kid !== null; kid = kid.nextSibling) {
            if (kid.nodeType === Node2.ELEMENT_NODE) return kid;
          }
        }
        return null;
      }
    },
    previousElementSibling: {
      get: function() {
        if (this.parentNode) {
          for (var kid = this.previousSibling; kid !== null; kid = kid.previousSibling) {
            if (kid.nodeType === Node2.ELEMENT_NODE) return kid;
          }
        }
        return null;
      }
    }
  };
  NonDocumentTypeChildNode_1 = NonDocumentTypeChildNode;
  return NonDocumentTypeChildNode_1;
}
var NamedNodeMap_1;
var hasRequiredNamedNodeMap;
function requireNamedNodeMap() {
  if (hasRequiredNamedNodeMap) return NamedNodeMap_1;
  hasRequiredNamedNodeMap = 1;
  NamedNodeMap_1 = NamedNodeMap;
  var utils2 = requireUtils();
  function NamedNodeMap(element) {
    this.element = element;
  }
  Object.defineProperties(NamedNodeMap.prototype, {
    length: {
      get: utils2.shouldOverride
    },
    item: {
      value: utils2.shouldOverride
    },
    getNamedItem: {
      value: function getNamedItem(qualifiedName) {
        return this.element.getAttributeNode(qualifiedName);
      }
    },
    getNamedItemNS: {
      value: function getNamedItemNS(namespace, localName) {
        return this.element.getAttributeNodeNS(namespace, localName);
      }
    },
    setNamedItem: {
      value: utils2.nyi
    },
    setNamedItemNS: {
      value: utils2.nyi
    },
    removeNamedItem: {
      value: function removeNamedItem(qualifiedName) {
        var attr = this.element.getAttributeNode(qualifiedName);
        if (attr) {
          this.element.removeAttribute(qualifiedName);
          return attr;
        }
        utils2.NotFoundError();
      }
    },
    removeNamedItemNS: {
      value: function removeNamedItemNS(ns, lname) {
        var attr = this.element.getAttributeNodeNS(ns, lname);
        if (attr) {
          this.element.removeAttributeNS(ns, lname);
          return attr;
        }
        utils2.NotFoundError();
      }
    }
  });
  return NamedNodeMap_1;
}
var Element_1;
var hasRequiredElement;
function requireElement() {
  if (hasRequiredElement) return Element_1;
  hasRequiredElement = 1;
  Element_1 = Element2;
  var xml = requireXmlnames();
  var utils2 = requireUtils();
  var NAMESPACE = utils2.NAMESPACE;
  var attributes2 = requireAttributes();
  var Node2 = requireNode();
  var NodeList = requireNodeList();
  var NodeUtils2 = requireNodeUtils();
  var FilteredElementList = requireFilteredElementList();
  var DOMTokenList = requireDOMTokenList();
  var select2 = requireSelect();
  var ContainerNode = requireContainerNode();
  var ChildNode = requireChildNode();
  var NonDocumentTypeChildNode = requireNonDocumentTypeChildNode();
  var NamedNodeMap = requireNamedNodeMap();
  var uppercaseCache = /* @__PURE__ */ Object.create(null);
  function Element2(doc, localName, namespaceURI, prefix) {
    ContainerNode.call(this);
    this.nodeType = Node2.ELEMENT_NODE;
    this.ownerDocument = doc;
    this.localName = localName;
    this.namespaceURI = namespaceURI;
    this.prefix = prefix;
    this._tagName = void 0;
    this._attrsByQName = /* @__PURE__ */ Object.create(null);
    this._attrsByLName = /* @__PURE__ */ Object.create(null);
    this._attrKeys = [];
  }
  function recursiveGetText(node2, a) {
    if (node2.nodeType === Node2.TEXT_NODE) {
      a.push(node2._data);
    } else {
      for (var i = 0, n = node2.childNodes.length; i < n; i++) recursiveGetText(node2.childNodes[i], a);
    }
  }
  Element2.prototype = Object.create(ContainerNode.prototype, {
    isHTML: {
      get: function isHTML() {
        return this.namespaceURI === NAMESPACE.HTML && this.ownerDocument.isHTML;
      }
    },
    tagName: {
      get: function tagName() {
        if (this._tagName === void 0) {
          var tn;
          if (this.prefix === null) {
            tn = this.localName;
          } else {
            tn = this.prefix + ":" + this.localName;
          }
          if (this.isHTML) {
            var up = uppercaseCache[tn];
            if (!up) {
              uppercaseCache[tn] = up = utils2.toASCIIUpperCase(tn);
            }
            tn = up;
          }
          this._tagName = tn;
        }
        return this._tagName;
      }
    },
    nodeName: {
      get: function() {
        return this.tagName;
      }
    },
    nodeValue: {
      get: function() {
        return null;
      },
      set: function() {
      }
    },
    textContent: {
      get: function() {
        var strings = [];
        recursiveGetText(this, strings);
        return strings.join("");
      },
      set: function(newtext) {
        this.removeChildren();
        if (newtext !== null && newtext !== void 0 && newtext !== "") {
          this._appendChild(this.ownerDocument.createTextNode(newtext));
        }
      }
    },
    innerText: {
      get: function() {
        var strings = [];
        recursiveGetText(this, strings);
        return strings.join("").replace(/[ \t\n\f\r]+/g, " ").trim();
      },
      set: function(newtext) {
        this.removeChildren();
        if (newtext !== null && newtext !== void 0 && newtext !== "") {
          this._appendChild(this.ownerDocument.createTextNode(newtext));
        }
      }
    },
    innerHTML: {
      get: function() {
        return this.serialize();
      },
      set: utils2.nyi
    },
    outerHTML: {
      get: function() {
        return NodeUtils2.serializeOne(this, {
          nodeType: 0
        });
      },
      set: function(v) {
        var document2 = this.ownerDocument;
        var parent = this.parentNode;
        if (parent === null) {
          return;
        }
        if (parent.nodeType === Node2.DOCUMENT_NODE) {
          utils2.NoModificationAllowedError();
        }
        if (parent.nodeType === Node2.DOCUMENT_FRAGMENT_NODE) {
          parent = parent.ownerDocument.createElement("body");
        }
        var parser2 = document2.implementation.mozHTMLParser(document2._address, parent);
        parser2.parse(v === null ? "" : String(v), true);
        this.replaceWith(parser2._asDocumentFragment());
      }
    },
    _insertAdjacent: {
      value: function _insertAdjacent(position, node2) {
        var first = false;
        switch (position) {
          case "beforebegin":
            first = true;
          /* falls through */
          case "afterend":
            var parent = this.parentNode;
            if (parent === null) {
              return null;
            }
            return parent.insertBefore(node2, first ? this : this.nextSibling);
          case "afterbegin":
            first = true;
          /* falls through */
          case "beforeend":
            return this.insertBefore(node2, first ? this.firstChild : null);
          default:
            return utils2.SyntaxError();
        }
      }
    },
    insertAdjacentElement: {
      value: function insertAdjacentElement(position, element) {
        if (element.nodeType !== Node2.ELEMENT_NODE) {
          throw new TypeError("not an element");
        }
        position = utils2.toASCIILowerCase(String(position));
        return this._insertAdjacent(position, element);
      }
    },
    insertAdjacentText: {
      value: function insertAdjacentText(position, data) {
        var textNode = this.ownerDocument.createTextNode(data);
        position = utils2.toASCIILowerCase(String(position));
        this._insertAdjacent(position, textNode);
      }
    },
    insertAdjacentHTML: {
      value: function insertAdjacentHTML(position, text) {
        position = utils2.toASCIILowerCase(String(position));
        text = String(text);
        var context;
        switch (position) {
          case "beforebegin":
          case "afterend":
            context = this.parentNode;
            if (context === null || context.nodeType === Node2.DOCUMENT_NODE) {
              utils2.NoModificationAllowedError();
            }
            break;
          case "afterbegin":
          case "beforeend":
            context = this;
            break;
          default:
            utils2.SyntaxError();
        }
        if (!(context instanceof Element2) || context.ownerDocument.isHTML && context.localName === "html" && context.namespaceURI === NAMESPACE.HTML) {
          context = context.ownerDocument.createElementNS(NAMESPACE.HTML, "body");
        }
        var parser2 = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, context);
        parser2.parse(text, true);
        this._insertAdjacent(position, parser2._asDocumentFragment());
      }
    },
    children: {
      get: function() {
        if (!this._children) {
          this._children = new ChildrenCollection(this);
        }
        return this._children;
      }
    },
    attributes: {
      get: function() {
        if (!this._attributes) {
          this._attributes = new AttributesArray(this);
        }
        return this._attributes;
      }
    },
    firstElementChild: {
      get: function() {
        for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
          if (kid.nodeType === Node2.ELEMENT_NODE) return kid;
        }
        return null;
      }
    },
    lastElementChild: {
      get: function() {
        for (var kid = this.lastChild; kid !== null; kid = kid.previousSibling) {
          if (kid.nodeType === Node2.ELEMENT_NODE) return kid;
        }
        return null;
      }
    },
    childElementCount: {
      get: function() {
        return this.children.length;
      }
    },
    // Return the next element, in source order, after this one or
    // null if there are no more.  If root element is specified,
    // then don't traverse beyond its subtree.
    //
    // This is not a DOM method, but is convenient for
    // lazy traversals of the tree.
    nextElement: {
      value: function(root2) {
        if (!root2) root2 = this.ownerDocument.documentElement;
        var next = this.firstElementChild;
        if (!next) {
          if (this === root2) return null;
          next = this.nextElementSibling;
        }
        if (next) return next;
        for (var parent = this.parentElement; parent && parent !== root2; parent = parent.parentElement) {
          next = parent.nextElementSibling;
          if (next) return next;
        }
        return null;
      }
    },
    // XXX:
    // Tests are currently failing for this function.
    // Awaiting resolution of:
    // http://lists.w3.org/Archives/Public/www-dom/2011JulSep/0016.html
    getElementsByTagName: {
      value: function getElementsByTagName2(lname) {
        var filter2;
        if (!lname) return new NodeList();
        if (lname === "*") filter2 = function() {
          return true;
        };
        else if (this.isHTML) filter2 = htmlLocalNameElementFilter(lname);
        else filter2 = localNameElementFilter(lname);
        return new FilteredElementList(this, filter2);
      }
    },
    getElementsByTagNameNS: {
      value: function getElementsByTagNameNS(ns, lname) {
        var filter2;
        if (ns === "*" && lname === "*") filter2 = function() {
          return true;
        };
        else if (ns === "*") filter2 = localNameElementFilter(lname);
        else if (lname === "*") filter2 = namespaceElementFilter(ns);
        else filter2 = namespaceLocalNameElementFilter(ns, lname);
        return new FilteredElementList(this, filter2);
      }
    },
    getElementsByClassName: {
      value: function getElementsByClassName2(names) {
        names = String(names).trim();
        if (names === "") {
          var result2 = new NodeList();
          return result2;
        }
        names = names.split(/[ \t\r\n\f]+/);
        return new FilteredElementList(this, classNamesElementFilter(names));
      }
    },
    getElementsByName: {
      value: function getElementsByName(name) {
        return new FilteredElementList(this, elementNameFilter(String(name)));
      }
    },
    // Utility methods used by the public API methods above
    clone: {
      value: function clone() {
        var e;
        if (this.namespaceURI !== NAMESPACE.HTML || this.prefix || !this.ownerDocument.isHTML) {
          e = this.ownerDocument.createElementNS(this.namespaceURI, this.prefix !== null ? this.prefix + ":" + this.localName : this.localName);
        } else {
          e = this.ownerDocument.createElement(this.localName);
        }
        for (var i = 0, n = this._attrKeys.length; i < n; i++) {
          var lname = this._attrKeys[i];
          var a = this._attrsByLName[lname];
          var b = a.cloneNode();
          b._setOwnerElement(e);
          e._attrsByLName[lname] = b;
          e._addQName(b);
        }
        e._attrKeys = this._attrKeys.concat();
        return e;
      }
    },
    isEqual: {
      value: function isEqual(that) {
        if (this.localName !== that.localName || this.namespaceURI !== that.namespaceURI || this.prefix !== that.prefix || this._numattrs !== that._numattrs) return false;
        for (var i = 0, n = this._numattrs; i < n; i++) {
          var a = this._attr(i);
          if (!that.hasAttributeNS(a.namespaceURI, a.localName)) return false;
          if (that.getAttributeNS(a.namespaceURI, a.localName) !== a.value) return false;
        }
        return true;
      }
    },
    // This is the 'locate a namespace prefix' algorithm from the
    // DOM specification.  It is used by Node.lookupPrefix()
    // (Be sure to compare DOM3 and DOM4 versions of spec.)
    _lookupNamespacePrefix: {
      value: function _lookupNamespacePrefix(ns, originalElement) {
        if (this.namespaceURI && this.namespaceURI === ns && this.prefix !== null && originalElement.lookupNamespaceURI(this.prefix) === ns) {
          return this.prefix;
        }
        for (var i = 0, n = this._numattrs; i < n; i++) {
          var a = this._attr(i);
          if (a.prefix === "xmlns" && a.value === ns && originalElement.lookupNamespaceURI(a.localName) === ns) {
            return a.localName;
          }
        }
        var parent = this.parentElement;
        return parent ? parent._lookupNamespacePrefix(ns, originalElement) : null;
      }
    },
    // This is the 'locate a namespace' algorithm for Element nodes
    // from the DOM Core spec.  It is used by Node#lookupNamespaceURI()
    lookupNamespaceURI: {
      value: function lookupNamespaceURI(prefix) {
        if (prefix === "" || prefix === void 0) {
          prefix = null;
        }
        if (this.namespaceURI !== null && this.prefix === prefix) return this.namespaceURI;
        for (var i = 0, n = this._numattrs; i < n; i++) {
          var a = this._attr(i);
          if (a.namespaceURI === NAMESPACE.XMLNS) {
            if (a.prefix === "xmlns" && a.localName === prefix || prefix === null && a.prefix === null && a.localName === "xmlns") {
              return a.value || null;
            }
          }
        }
        var parent = this.parentElement;
        return parent ? parent.lookupNamespaceURI(prefix) : null;
      }
    },
    //
    // Attribute handling methods and utilities
    //
    /*
     * Attributes in the DOM are tricky:
     *
     * - there are the 8 basic get/set/has/removeAttribute{NS} methods
     *
     * - but many HTML attributes are also 'reflected' through IDL
     *   attributes which means that they can be queried and set through
     *   regular properties of the element.  There is just one attribute
     *   value, but two ways to get and set it.
     *
     * - Different HTML element types have different sets of reflected
       attributes.
     *
     * - attributes can also be queried and set through the .attributes
     *   property of an element.  This property behaves like an array of
     *   Attr objects.  The value property of each Attr is writeable, so
     *   this is a third way to read and write attributes.
     *
     * - for efficiency, we really want to store attributes in some kind
     *   of name->attr map.  But the attributes[] array is an array, not a
     *   map, which is kind of unnatural.
     *
     * - When using namespaces and prefixes, and mixing the NS methods
     *   with the non-NS methods, it is apparently actually possible for
     *   an attributes[] array to have more than one attribute with the
     *   same qualified name.  And certain methods must operate on only
     *   the first attribute with such a name.  So for these methods, an
     *   inefficient array-like data structure would be easier to
     *   implement.
     *
     * - The attributes[] array is live, not a snapshot, so changes to the
     *   attributes must be immediately visible through existing arrays.
     *
     * - When attributes are queried and set through IDL properties
     *   (instead of the get/setAttributes() method or the attributes[]
     *   array) they may be subject to type conversions, URL
     *   normalization, etc., so some extra processing is required in that
     *   case.
     *
     * - But access through IDL properties is probably the most common
     *   case, so we'd like that to be as fast as possible.
     *
     * - We can't just store attribute values in their parsed idl form,
     *   because setAttribute() has to return whatever string is passed to
     *   getAttribute even if it is not a legal, parseable value. So
     *   attribute values must be stored in unparsed string form.
     *
     * - We need to be able to send change notifications or mutation
     *   events of some sort to the renderer whenever an attribute value
     *   changes, regardless of the way in which it changes.
     *
     * - Some attributes, such as id and class affect other parts of the
     *   DOM API, like getElementById and getElementsByClassName and so
     *   for efficiency, we need to specially track changes to these
     *   special attributes.
     *
     * - Some attributes like class have different names (className) when
     *   reflected.
     *
     * - Attributes whose names begin with the string 'data-' are treated
       specially.
     *
     * - Reflected attributes that have a boolean type in IDL have special
     *   behavior: setting them to false (in IDL) is the same as removing
     *   them with removeAttribute()
     *
     * - numeric attributes (like HTMLElement.tabIndex) can have default
     *   values that must be returned by the idl getter even if the
     *   content attribute does not exist. (The default tabIndex value
     *   actually varies based on the type of the element, so that is a
     *   tricky one).
     *
     * See
     * http://www.whatwg.org/specs/web-apps/current-work/multipage/urls.html#reflect
     * for rules on how attributes are reflected.
     *
     */
    getAttribute: {
      value: function getAttribute(qname) {
        var attr = this.getAttributeNode(qname);
        return attr ? attr.value : null;
      }
    },
    getAttributeNS: {
      value: function getAttributeNS(ns, lname) {
        var attr = this.getAttributeNodeNS(ns, lname);
        return attr ? attr.value : null;
      }
    },
    getAttributeNode: {
      value: function getAttributeNode(qname) {
        qname = String(qname);
        if (/[A-Z]/.test(qname) && this.isHTML) qname = utils2.toASCIILowerCase(qname);
        var attr = this._attrsByQName[qname];
        if (!attr) return null;
        if (Array.isArray(attr))
          attr = attr[0];
        return attr;
      }
    },
    getAttributeNodeNS: {
      value: function getAttributeNodeNS(ns, lname) {
        ns = ns === void 0 || ns === null ? "" : String(ns);
        lname = String(lname);
        var attr = this._attrsByLName[ns + "|" + lname];
        return attr ? attr : null;
      }
    },
    hasAttribute: {
      value: function hasAttribute(qname) {
        qname = String(qname);
        if (/[A-Z]/.test(qname) && this.isHTML) qname = utils2.toASCIILowerCase(qname);
        return this._attrsByQName[qname] !== void 0;
      }
    },
    hasAttributeNS: {
      value: function hasAttributeNS(ns, lname) {
        ns = ns === void 0 || ns === null ? "" : String(ns);
        lname = String(lname);
        var key = ns + "|" + lname;
        return this._attrsByLName[key] !== void 0;
      }
    },
    hasAttributes: {
      value: function hasAttributes() {
        return this._numattrs > 0;
      }
    },
    toggleAttribute: {
      value: function toggleAttribute(qname, force) {
        qname = String(qname);
        if (!xml.isValidName(qname)) utils2.InvalidCharacterError();
        if (/[A-Z]/.test(qname) && this.isHTML) qname = utils2.toASCIILowerCase(qname);
        var a = this._attrsByQName[qname];
        if (a === void 0) {
          if (force === void 0 || force === true) {
            this._setAttribute(qname, "");
            return true;
          }
          return false;
        } else {
          if (force === void 0 || force === false) {
            this.removeAttribute(qname);
            return false;
          }
          return true;
        }
      }
    },
    // Set the attribute without error checking. The parser uses this.
    _setAttribute: {
      value: function _setAttribute(qname, value) {
        var attr = this._attrsByQName[qname];
        var isnew;
        if (!attr) {
          attr = this._newattr(qname);
          isnew = true;
        } else {
          if (Array.isArray(attr)) attr = attr[0];
        }
        attr.value = value;
        if (this._attributes) this._attributes[qname] = attr;
        if (isnew && this._newattrhook) this._newattrhook(qname, value);
      }
    },
    // Check for errors, and then set the attribute
    setAttribute: {
      value: function setAttribute(qname, value) {
        qname = String(qname);
        if (!xml.isValidName(qname)) utils2.InvalidCharacterError();
        if (/[A-Z]/.test(qname) && this.isHTML) qname = utils2.toASCIILowerCase(qname);
        this._setAttribute(qname, String(value));
      }
    },
    // The version with no error checking used by the parser
    _setAttributeNS: {
      value: function _setAttributeNS(ns, qname, value) {
        var pos = qname.indexOf(":"), prefix, lname;
        if (pos < 0) {
          prefix = null;
          lname = qname;
        } else {
          prefix = qname.substring(0, pos);
          lname = qname.substring(pos + 1);
        }
        if (ns === "" || ns === void 0) ns = null;
        var key = (ns === null ? "" : ns) + "|" + lname;
        var attr = this._attrsByLName[key];
        var isnew;
        if (!attr) {
          attr = new Attr(this, lname, prefix, ns);
          isnew = true;
          this._attrsByLName[key] = attr;
          if (this._attributes) {
            this._attributes[this._attrKeys.length] = attr;
          }
          this._attrKeys.push(key);
          this._addQName(attr);
        }
        attr.value = value;
        if (isnew && this._newattrhook) this._newattrhook(qname, value);
      }
    },
    // Do error checking then call _setAttributeNS
    setAttributeNS: {
      value: function setAttributeNS(ns, qname, value) {
        ns = ns === null || ns === void 0 || ns === "" ? null : String(ns);
        qname = String(qname);
        if (!xml.isValidQName(qname)) utils2.InvalidCharacterError();
        var pos = qname.indexOf(":");
        var prefix = pos < 0 ? null : qname.substring(0, pos);
        if (prefix !== null && ns === null || prefix === "xml" && ns !== NAMESPACE.XML || (qname === "xmlns" || prefix === "xmlns") && ns !== NAMESPACE.XMLNS || ns === NAMESPACE.XMLNS && !(qname === "xmlns" || prefix === "xmlns")) utils2.NamespaceError();
        this._setAttributeNS(ns, qname, String(value));
      }
    },
    setAttributeNode: {
      value: function setAttributeNode(attr) {
        if (attr.ownerElement !== null && attr.ownerElement !== this) {
          utils2.InUseAttributeError();
        }
        var result2 = null;
        var oldAttrs = this._attrsByQName[attr.name];
        if (oldAttrs) {
          if (!Array.isArray(oldAttrs)) {
            oldAttrs = [oldAttrs];
          }
          if (oldAttrs.some(function(a) {
            return a === attr;
          })) {
            return attr;
          } else if (attr.ownerElement !== null) {
            utils2.InUseAttributeError();
          }
          oldAttrs.forEach(function(a) {
            this.removeAttributeNode(a);
          }, this);
          result2 = oldAttrs[0];
        }
        this.setAttributeNodeNS(attr);
        return result2;
      }
    },
    setAttributeNodeNS: {
      value: function setAttributeNodeNS(attr) {
        if (attr.ownerElement !== null) {
          utils2.InUseAttributeError();
        }
        var ns = attr.namespaceURI;
        var key = (ns === null ? "" : ns) + "|" + attr.localName;
        var oldAttr = this._attrsByLName[key];
        if (oldAttr) {
          this.removeAttributeNode(oldAttr);
        }
        attr._setOwnerElement(this);
        this._attrsByLName[key] = attr;
        if (this._attributes) {
          this._attributes[this._attrKeys.length] = attr;
        }
        this._attrKeys.push(key);
        this._addQName(attr);
        if (this._newattrhook) this._newattrhook(attr.name, attr.value);
        return oldAttr || null;
      }
    },
    removeAttribute: {
      value: function removeAttribute(qname) {
        qname = String(qname);
        if (/[A-Z]/.test(qname) && this.isHTML) qname = utils2.toASCIILowerCase(qname);
        var attr = this._attrsByQName[qname];
        if (!attr) return;
        if (Array.isArray(attr)) {
          if (attr.length > 2) {
            attr = attr.shift();
          } else {
            this._attrsByQName[qname] = attr[1];
            attr = attr[0];
          }
        } else {
          this._attrsByQName[qname] = void 0;
        }
        var ns = attr.namespaceURI;
        var key = (ns === null ? "" : ns) + "|" + attr.localName;
        this._attrsByLName[key] = void 0;
        var i = this._attrKeys.indexOf(key);
        if (this._attributes) {
          Array.prototype.splice.call(this._attributes, i, 1);
          this._attributes[qname] = void 0;
        }
        this._attrKeys.splice(i, 1);
        var onchange = attr.onchange;
        attr._setOwnerElement(null);
        if (onchange) {
          onchange.call(attr, this, attr.localName, attr.value, null);
        }
        if (this.rooted) this.ownerDocument.mutateRemoveAttr(attr);
      }
    },
    removeAttributeNS: {
      value: function removeAttributeNS(ns, lname) {
        ns = ns === void 0 || ns === null ? "" : String(ns);
        lname = String(lname);
        var key = ns + "|" + lname;
        var attr = this._attrsByLName[key];
        if (!attr) return;
        this._attrsByLName[key] = void 0;
        var i = this._attrKeys.indexOf(key);
        if (this._attributes) {
          Array.prototype.splice.call(this._attributes, i, 1);
        }
        this._attrKeys.splice(i, 1);
        this._removeQName(attr);
        var onchange = attr.onchange;
        attr._setOwnerElement(null);
        if (onchange) {
          onchange.call(attr, this, attr.localName, attr.value, null);
        }
        if (this.rooted) this.ownerDocument.mutateRemoveAttr(attr);
      }
    },
    removeAttributeNode: {
      value: function removeAttributeNode(attr) {
        var ns = attr.namespaceURI;
        var key = (ns === null ? "" : ns) + "|" + attr.localName;
        if (this._attrsByLName[key] !== attr) {
          utils2.NotFoundError();
        }
        this.removeAttributeNS(ns, attr.localName);
        return attr;
      }
    },
    getAttributeNames: {
      value: function getAttributeNames() {
        var elt = this;
        return this._attrKeys.map(function(key) {
          return elt._attrsByLName[key].name;
        });
      }
    },
    // This 'raw' version of getAttribute is used by the getter functions
    // of reflected attributes. It skips some error checking and
    // namespace steps
    _getattr: {
      value: function _getattr(qname) {
        var attr = this._attrsByQName[qname];
        return attr ? attr.value : null;
      }
    },
    // The raw version of setAttribute for reflected idl attributes.
    _setattr: {
      value: function _setattr(qname, value) {
        var attr = this._attrsByQName[qname];
        var isnew;
        if (!attr) {
          attr = this._newattr(qname);
          isnew = true;
        }
        attr.value = String(value);
        if (this._attributes) this._attributes[qname] = attr;
        if (isnew && this._newattrhook) this._newattrhook(qname, value);
      }
    },
    // Create a new Attr object, insert it, and return it.
    // Used by setAttribute() and by set()
    _newattr: {
      value: function _newattr(qname) {
        var attr = new Attr(this, qname, null, null);
        var key = "|" + qname;
        this._attrsByQName[qname] = attr;
        this._attrsByLName[key] = attr;
        if (this._attributes) {
          this._attributes[this._attrKeys.length] = attr;
        }
        this._attrKeys.push(key);
        return attr;
      }
    },
    // Add a qname->Attr mapping to the _attrsByQName object, taking into
    // account that there may be more than one attr object with the
    // same qname
    _addQName: {
      value: function(attr) {
        var qname = attr.name;
        var existing = this._attrsByQName[qname];
        if (!existing) {
          this._attrsByQName[qname] = attr;
        } else if (Array.isArray(existing)) {
          existing.push(attr);
        } else {
          this._attrsByQName[qname] = [existing, attr];
        }
        if (this._attributes) this._attributes[qname] = attr;
      }
    },
    // Remove a qname->Attr mapping to the _attrsByQName object, taking into
    // account that there may be more than one attr object with the
    // same qname
    _removeQName: {
      value: function(attr) {
        var qname = attr.name;
        var target = this._attrsByQName[qname];
        if (Array.isArray(target)) {
          var idx = target.indexOf(attr);
          utils2.assert(idx !== -1);
          if (target.length === 2) {
            this._attrsByQName[qname] = target[1 - idx];
            if (this._attributes) {
              this._attributes[qname] = this._attrsByQName[qname];
            }
          } else {
            target.splice(idx, 1);
            if (this._attributes && this._attributes[qname] === attr) {
              this._attributes[qname] = target[0];
            }
          }
        } else {
          utils2.assert(target === attr);
          this._attrsByQName[qname] = void 0;
          if (this._attributes) {
            this._attributes[qname] = void 0;
          }
        }
      }
    },
    // Return the number of attributes
    _numattrs: {
      get: function() {
        return this._attrKeys.length;
      }
    },
    // Return the nth Attr object
    _attr: {
      value: function(n) {
        return this._attrsByLName[this._attrKeys[n]];
      }
    },
    // Define getters and setters for an 'id' property that reflects
    // the content attribute 'id'.
    id: attributes2.property({
      name: "id"
    }),
    // Define getters and setters for a 'className' property that reflects
    // the content attribute 'class'.
    className: attributes2.property({
      name: "class"
    }),
    classList: {
      get: function() {
        var self = this;
        if (this._classList) {
          return this._classList;
        }
        var dtlist = new DOMTokenList(function() {
          return self.className || "";
        }, function(v) {
          self.className = v;
        });
        this._classList = dtlist;
        return dtlist;
      },
      set: function(v) {
        this.className = v;
      }
    },
    matches: {
      value: function(selector) {
        return select2.matches(this, selector);
      }
    },
    closest: {
      value: function(selector) {
        var el = this;
        do {
          if (el.matches && el.matches(selector)) {
            return el;
          }
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === Node2.ELEMENT_NODE);
        return null;
      }
    },
    querySelector: {
      value: function(selector) {
        return select2(selector, this)[0];
      }
    },
    querySelectorAll: {
      value: function(selector) {
        var nodes = select2(selector, this);
        return nodes.item ? nodes : new NodeList(nodes);
      }
    }
  });
  Object.defineProperties(Element2.prototype, ChildNode);
  Object.defineProperties(Element2.prototype, NonDocumentTypeChildNode);
  attributes2.registerChangeHandler(Element2, "id", function(element, lname, oldval, newval) {
    if (element.rooted) {
      if (oldval) {
        element.ownerDocument.delId(oldval, element);
      }
      if (newval) {
        element.ownerDocument.addId(newval, element);
      }
    }
  });
  attributes2.registerChangeHandler(Element2, "class", function(element, lname, oldval, newval) {
    if (element._classList) {
      element._classList._update();
    }
  });
  function Attr(elt, lname, prefix, namespace, value) {
    this.localName = lname;
    this.prefix = prefix === null || prefix === "" ? null : "" + prefix;
    this.namespaceURI = namespace === null || namespace === "" ? null : "" + namespace;
    this.data = value;
    this._setOwnerElement(elt);
  }
  Attr.prototype = Object.create(Object.prototype, {
    ownerElement: {
      get: function() {
        return this._ownerElement;
      }
    },
    _setOwnerElement: {
      value: function _setOwnerElement(elt) {
        this._ownerElement = elt;
        if (this.prefix === null && this.namespaceURI === null && elt) {
          this.onchange = elt._attributeChangeHandlers[this.localName];
        } else {
          this.onchange = null;
        }
      }
    },
    name: {
      get: function() {
        return this.prefix ? this.prefix + ":" + this.localName : this.localName;
      }
    },
    specified: {
      get: function() {
        return true;
      }
    },
    value: {
      get: function() {
        return this.data;
      },
      set: function(value) {
        var oldval = this.data;
        value = value === void 0 ? "" : value + "";
        if (value === oldval) return;
        this.data = value;
        if (this.ownerElement) {
          if (this.onchange) this.onchange(this.ownerElement, this.localName, oldval, value);
          if (this.ownerElement.rooted) this.ownerElement.ownerDocument.mutateAttr(this, oldval);
        }
      }
    },
    cloneNode: {
      value: function cloneNode2(deep) {
        return new Attr(null, this.localName, this.prefix, this.namespaceURI, this.data);
      }
    },
    // Legacy aliases (see gh#70 and https://dom.spec.whatwg.org/#interface-attr)
    nodeType: {
      get: function() {
        return Node2.ATTRIBUTE_NODE;
      }
    },
    nodeName: {
      get: function() {
        return this.name;
      }
    },
    nodeValue: {
      get: function() {
        return this.value;
      },
      set: function(v) {
        this.value = v;
      }
    },
    textContent: {
      get: function() {
        return this.value;
      },
      set: function(v) {
        if (v === null || v === void 0) {
          v = "";
        }
        this.value = v;
      }
    },
    innerText: {
      get: function() {
        return this.value;
      },
      set: function(v) {
        if (v === null || v === void 0) {
          v = "";
        }
        this.value = v;
      }
    }
  });
  Element2._Attr = Attr;
  function AttributesArray(elt) {
    NamedNodeMap.call(this, elt);
    for (var name in elt._attrsByQName) {
      this[name] = elt._attrsByQName[name];
    }
    for (var i = 0; i < elt._attrKeys.length; i++) {
      this[i] = elt._attrsByLName[elt._attrKeys[i]];
    }
  }
  AttributesArray.prototype = Object.create(NamedNodeMap.prototype, {
    length: {
      get: function() {
        return this.element._attrKeys.length;
      },
      set: function() {
      }
    },
    item: {
      value: function(n) {
        n = n >>> 0;
        if (n >= this.length) {
          return null;
        }
        return this.element._attrsByLName[this.element._attrKeys[n]];
      }
    }
  });
  if (globalThis.Symbol?.iterator) {
    AttributesArray.prototype[globalThis.Symbol.iterator] = function() {
      var i = 0, n = this.length, self = this;
      return {
        next: function() {
          if (i < n) return {
            value: self.item(i++)
          };
          return {
            done: true
          };
        }
      };
    };
  }
  function ChildrenCollection(e) {
    this.element = e;
    this.updateCache();
  }
  ChildrenCollection.prototype = Object.create(Object.prototype, {
    length: {
      get: function() {
        this.updateCache();
        return this.childrenByNumber.length;
      }
    },
    item: {
      value: function item(n) {
        this.updateCache();
        return this.childrenByNumber[n] || null;
      }
    },
    namedItem: {
      value: function namedItem(name) {
        this.updateCache();
        return this.childrenByName[name] || null;
      }
    },
    // This attribute returns the entire name->element map.
    // It is not part of the HTMLCollection API, but we need it in
    // src/HTMLCollectionProxy
    namedItems: {
      get: function() {
        this.updateCache();
        return this.childrenByName;
      }
    },
    updateCache: {
      value: function updateCache() {
        var namedElts = /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
        if (this.lastModTime !== this.element.lastModTime) {
          this.lastModTime = this.element.lastModTime;
          var n = this.childrenByNumber && this.childrenByNumber.length || 0;
          for (var i = 0; i < n; i++) {
            this[i] = void 0;
          }
          this.childrenByNumber = [];
          this.childrenByName = /* @__PURE__ */ Object.create(null);
          for (var c = this.element.firstChild; c !== null; c = c.nextSibling) {
            if (c.nodeType === Node2.ELEMENT_NODE) {
              this[this.childrenByNumber.length] = c;
              this.childrenByNumber.push(c);
              var id = c.getAttribute("id");
              if (id && !this.childrenByName[id]) this.childrenByName[id] = c;
              var name = c.getAttribute("name");
              if (name && this.element.namespaceURI === NAMESPACE.HTML && namedElts.test(this.element.localName) && !this.childrenByName[name]) this.childrenByName[id] = c;
            }
          }
        }
      }
    }
  });
  function localNameElementFilter(lname) {
    return function(e) {
      return e.localName === lname;
    };
  }
  function htmlLocalNameElementFilter(lname) {
    var lclname = utils2.toASCIILowerCase(lname);
    if (lclname === lname) return localNameElementFilter(lname);
    return function(e) {
      return e.isHTML ? e.localName === lclname : e.localName === lname;
    };
  }
  function namespaceElementFilter(ns) {
    return function(e) {
      return e.namespaceURI === ns;
    };
  }
  function namespaceLocalNameElementFilter(ns, lname) {
    return function(e) {
      return e.namespaceURI === ns && e.localName === lname;
    };
  }
  function classNamesElementFilter(names) {
    return function(e) {
      return names.every(function(n) {
        return e.classList.contains(n);
      });
    };
  }
  function elementNameFilter(name) {
    return function(e) {
      if (e.namespaceURI !== NAMESPACE.HTML) {
        return false;
      }
      return e.getAttribute("name") === name;
    };
  }
  return Element_1;
}
var Leaf_1;
var hasRequiredLeaf;
function requireLeaf() {
  if (hasRequiredLeaf) return Leaf_1;
  hasRequiredLeaf = 1;
  Leaf_1 = Leaf;
  var Node2 = requireNode();
  var NodeList = requireNodeList();
  var utils2 = requireUtils();
  var HierarchyRequestError = utils2.HierarchyRequestError;
  var NotFoundError = utils2.NotFoundError;
  function Leaf() {
    Node2.call(this);
  }
  Leaf.prototype = Object.create(Node2.prototype, {
    hasChildNodes: {
      value: function() {
        return false;
      }
    },
    firstChild: {
      value: null
    },
    lastChild: {
      value: null
    },
    insertBefore: {
      value: function(node2, child) {
        if (!node2.nodeType) throw new TypeError("not a node");
        HierarchyRequestError();
      }
    },
    replaceChild: {
      value: function(node2, child) {
        if (!node2.nodeType) throw new TypeError("not a node");
        HierarchyRequestError();
      }
    },
    removeChild: {
      value: function(node2) {
        if (!node2.nodeType) throw new TypeError("not a node");
        NotFoundError();
      }
    },
    removeChildren: {
      value: function() {
      }
    },
    childNodes: {
      get: function() {
        if (!this._childNodes) this._childNodes = new NodeList();
        return this._childNodes;
      }
    }
  });
  return Leaf_1;
}
var CharacterData_1;
var hasRequiredCharacterData;
function requireCharacterData() {
  if (hasRequiredCharacterData) return CharacterData_1;
  hasRequiredCharacterData = 1;
  CharacterData_1 = CharacterData;
  var Leaf = requireLeaf();
  var utils2 = requireUtils();
  var ChildNode = requireChildNode();
  var NonDocumentTypeChildNode = requireNonDocumentTypeChildNode();
  function CharacterData() {
    Leaf.call(this);
  }
  CharacterData.prototype = Object.create(Leaf.prototype, {
    // DOMString substringData(unsigned long offset,
    //               unsigned long count);
    // The substringData(offset, count) method must run these steps:
    //
    //     If offset is greater than the context object's
    //     length, throw an INDEX_SIZE_ERR exception and
    //     terminate these steps.
    //
    //     If offset+count is greater than the context
    //     object's length, return a DOMString whose value is
    //     the UTF-16 code units from the offsetth UTF-16 code
    //     unit to the end of data.
    //
    //     Return a DOMString whose value is the UTF-16 code
    //     units from the offsetth UTF-16 code unit to the
    //     offset+countth UTF-16 code unit in data.
    substringData: {
      value: function substringData(offset, count) {
        if (arguments.length < 2) {
          throw new TypeError("Not enough arguments");
        }
        offset = offset >>> 0;
        count = count >>> 0;
        if (offset > this.data.length || offset < 0 || count < 0) {
          utils2.IndexSizeError();
        }
        return this.data.substring(offset, offset + count);
      }
    },
    // void appendData(DOMString data);
    // The appendData(data) method must append data to the context
    // object's data.
    appendData: {
      value: function appendData(data) {
        if (arguments.length < 1) {
          throw new TypeError("Not enough arguments");
        }
        this.data += String(data);
      }
    },
    // void insertData(unsigned long offset, DOMString data);
    // The insertData(offset, data) method must run these steps:
    //
    //     If offset is greater than the context object's
    //     length, throw an INDEX_SIZE_ERR exception and
    //     terminate these steps.
    //
    //     Insert data into the context object's data after
    //     offset UTF-16 code units.
    //
    insertData: {
      value: function insertData(offset, data) {
        return this.replaceData(offset, 0, data);
      }
    },
    // void deleteData(unsigned long offset, unsigned long count);
    // The deleteData(offset, count) method must run these steps:
    //
    //     If offset is greater than the context object's
    //     length, throw an INDEX_SIZE_ERR exception and
    //     terminate these steps.
    //
    //     If offset+count is greater than the context
    //     object's length var count be length-offset.
    //
    //     Starting from offset UTF-16 code units remove count
    //     UTF-16 code units from the context object's data.
    deleteData: {
      value: function deleteData(offset, count) {
        return this.replaceData(offset, count, "");
      }
    },
    // void replaceData(unsigned long offset, unsigned long count,
    //          DOMString data);
    //
    // The replaceData(offset, count, data) method must act as
    // if the deleteData() method is invoked with offset and
    // count as arguments followed by the insertData() method
    // with offset and data as arguments and re-throw any
    // exceptions these methods might have thrown.
    replaceData: {
      value: function replaceData(offset, count, data) {
        var curtext = this.data, len = curtext.length;
        offset = offset >>> 0;
        count = count >>> 0;
        data = String(data);
        if (offset > len || offset < 0) utils2.IndexSizeError();
        if (offset + count > len) count = len - offset;
        var prefix = curtext.substring(0, offset), suffix = curtext.substring(offset + count);
        this.data = prefix + data + suffix;
      }
    },
    // Utility method that Node.isEqualNode() calls to test Text and
    // Comment nodes for equality.  It is okay to put it here, since
    // Node will have already verified that nodeType is equal
    isEqual: {
      value: function isEqual(n) {
        return this._data === n._data;
      }
    },
    length: {
      get: function() {
        return this.data.length;
      }
    }
  });
  Object.defineProperties(CharacterData.prototype, ChildNode);
  Object.defineProperties(CharacterData.prototype, NonDocumentTypeChildNode);
  return CharacterData_1;
}
var Text_1;
var hasRequiredText;
function requireText() {
  if (hasRequiredText) return Text_1;
  hasRequiredText = 1;
  Text_1 = Text2;
  var utils2 = requireUtils();
  var Node2 = requireNode();
  var CharacterData = requireCharacterData();
  function Text2(doc, data) {
    CharacterData.call(this);
    this.nodeType = Node2.TEXT_NODE;
    this.ownerDocument = doc;
    this._data = data;
    this._index = void 0;
  }
  var nodeValue = {
    get: function() {
      return this._data;
    },
    set: function(v) {
      if (v === null || v === void 0) {
        v = "";
      } else {
        v = String(v);
      }
      if (v === this._data) return;
      this._data = v;
      if (this.rooted) this.ownerDocument.mutateValue(this);
      if (this.parentNode && this.parentNode._textchangehook) this.parentNode._textchangehook(this);
    }
  };
  Text2.prototype = Object.create(CharacterData.prototype, {
    nodeName: {
      value: "#text"
    },
    // These three attributes are all the same.
    // The data attribute has a [TreatNullAs=EmptyString] but we'll
    // implement that at the interface level
    nodeValue,
    textContent: nodeValue,
    innerText: nodeValue,
    data: {
      get: nodeValue.get,
      set: function(v) {
        nodeValue.set.call(this, v === null ? "" : String(v));
      }
    },
    splitText: {
      value: function splitText(offset) {
        if (offset > this._data.length || offset < 0) utils2.IndexSizeError();
        var newdata = this._data.substring(offset), newnode = this.ownerDocument.createTextNode(newdata);
        this.data = this.data.substring(0, offset);
        var parent = this.parentNode;
        if (parent !== null) parent.insertBefore(newnode, this.nextSibling);
        return newnode;
      }
    },
    wholeText: {
      get: function wholeText() {
        var result2 = this.textContent;
        for (var next = this.nextSibling; next; next = next.nextSibling) {
          if (next.nodeType !== Node2.TEXT_NODE) {
            break;
          }
          result2 += next.textContent;
        }
        return result2;
      }
    },
    // Obsolete, removed from spec.
    replaceWholeText: {
      value: utils2.nyi
    },
    // Utility methods
    clone: {
      value: function clone() {
        return new Text2(this.ownerDocument, this._data);
      }
    }
  });
  return Text_1;
}
var Comment_1;
var hasRequiredComment;
function requireComment() {
  if (hasRequiredComment) return Comment_1;
  hasRequiredComment = 1;
  Comment_1 = Comment2;
  var Node2 = requireNode();
  var CharacterData = requireCharacterData();
  function Comment2(doc, data) {
    CharacterData.call(this);
    this.nodeType = Node2.COMMENT_NODE;
    this.ownerDocument = doc;
    this._data = data;
  }
  var nodeValue = {
    get: function() {
      return this._data;
    },
    set: function(v) {
      if (v === null || v === void 0) {
        v = "";
      } else {
        v = String(v);
      }
      this._data = v;
      if (this.rooted) this.ownerDocument.mutateValue(this);
    }
  };
  Comment2.prototype = Object.create(CharacterData.prototype, {
    nodeName: {
      value: "#comment"
    },
    nodeValue,
    textContent: nodeValue,
    innerText: nodeValue,
    data: {
      get: nodeValue.get,
      set: function(v) {
        nodeValue.set.call(this, v === null ? "" : String(v));
      }
    },
    // Utility methods
    clone: {
      value: function clone() {
        return new Comment2(this.ownerDocument, this._data);
      }
    }
  });
  return Comment_1;
}
var DocumentFragment_1;
var hasRequiredDocumentFragment;
function requireDocumentFragment() {
  if (hasRequiredDocumentFragment) return DocumentFragment_1;
  hasRequiredDocumentFragment = 1;
  DocumentFragment_1 = DocumentFragment;
  var Node2 = requireNode();
  var NodeList = requireNodeList();
  var ContainerNode = requireContainerNode();
  var Element2 = requireElement();
  var select2 = requireSelect();
  var utils2 = requireUtils();
  function DocumentFragment(doc) {
    ContainerNode.call(this);
    this.nodeType = Node2.DOCUMENT_FRAGMENT_NODE;
    this.ownerDocument = doc;
  }
  DocumentFragment.prototype = Object.create(ContainerNode.prototype, {
    nodeName: {
      value: "#document-fragment"
    },
    nodeValue: {
      get: function() {
        return null;
      },
      set: function() {
      }
    },
    // Copy the text content getter/setter from Element
    textContent: Object.getOwnPropertyDescriptor(Element2.prototype, "textContent"),
    // Copy the text content getter/setter from Element
    innerText: Object.getOwnPropertyDescriptor(Element2.prototype, "innerText"),
    querySelector: {
      value: function(selector) {
        var nodes = this.querySelectorAll(selector);
        return nodes.length ? nodes[0] : null;
      }
    },
    querySelectorAll: {
      value: function(selector) {
        var context = Object.create(this);
        context.isHTML = true;
        context.getElementsByTagName = Element2.prototype.getElementsByTagName;
        context.nextElement = Object.getOwnPropertyDescriptor(Element2.prototype, "firstElementChild").get;
        var nodes = select2(selector, context);
        return nodes.item ? nodes : new NodeList(nodes);
      }
    },
    // Utility methods
    clone: {
      value: function clone() {
        return new DocumentFragment(this.ownerDocument);
      }
    },
    isEqual: {
      value: function isEqual(n) {
        return true;
      }
    },
    // Non-standard, but useful (github issue #73)
    innerHTML: {
      get: function() {
        return this.serialize();
      },
      set: utils2.nyi
    },
    outerHTML: {
      get: function() {
        return this.serialize();
      },
      set: utils2.nyi
    }
  });
  return DocumentFragment_1;
}
var ProcessingInstruction_1;
var hasRequiredProcessingInstruction;
function requireProcessingInstruction() {
  if (hasRequiredProcessingInstruction) return ProcessingInstruction_1;
  hasRequiredProcessingInstruction = 1;
  ProcessingInstruction_1 = ProcessingInstruction2;
  var Node2 = requireNode();
  var CharacterData = requireCharacterData();
  function ProcessingInstruction2(doc, target, data) {
    CharacterData.call(this);
    this.nodeType = Node2.PROCESSING_INSTRUCTION_NODE;
    this.ownerDocument = doc;
    this.target = target;
    this._data = data;
  }
  var nodeValue = {
    get: function() {
      return this._data;
    },
    set: function(v) {
      if (v === null || v === void 0) {
        v = "";
      } else {
        v = String(v);
      }
      this._data = v;
      if (this.rooted) this.ownerDocument.mutateValue(this);
    }
  };
  ProcessingInstruction2.prototype = Object.create(CharacterData.prototype, {
    nodeName: {
      get: function() {
        return this.target;
      }
    },
    nodeValue,
    textContent: nodeValue,
    innerText: nodeValue,
    data: {
      get: nodeValue.get,
      set: function(v) {
        nodeValue.set.call(this, v === null ? "" : String(v));
      }
    },
    // Utility methods
    clone: {
      value: function clone() {
        return new ProcessingInstruction2(this.ownerDocument, this.target, this._data);
      }
    },
    isEqual: {
      value: function isEqual(n) {
        return this.target === n.target && this._data === n._data;
      }
    }
  });
  return ProcessingInstruction_1;
}
var NodeFilter_1;
var hasRequiredNodeFilter;
function requireNodeFilter() {
  if (hasRequiredNodeFilter) return NodeFilter_1;
  hasRequiredNodeFilter = 1;
  var NodeFilter = {
    // Constants for acceptNode()
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    FILTER_SKIP: 3,
    // Constants for whatToShow
    SHOW_ALL: 4294967295,
    SHOW_ELEMENT: 1,
    SHOW_ATTRIBUTE: 2,
    // historical
    SHOW_TEXT: 4,
    SHOW_CDATA_SECTION: 8,
    // historical
    SHOW_ENTITY_REFERENCE: 16,
    // historical
    SHOW_ENTITY: 32,
    // historical
    SHOW_PROCESSING_INSTRUCTION: 64,
    SHOW_COMMENT: 128,
    SHOW_DOCUMENT: 256,
    SHOW_DOCUMENT_TYPE: 512,
    SHOW_DOCUMENT_FRAGMENT: 1024,
    SHOW_NOTATION: 2048
    // historical
  };
  NodeFilter_1 = NodeFilter.constructor = NodeFilter.prototype = NodeFilter;
  return NodeFilter_1;
}
var NodeTraversal = {
  exports: {}
};
var hasRequiredNodeTraversal;
function requireNodeTraversal() {
  if (hasRequiredNodeTraversal) return NodeTraversal.exports;
  hasRequiredNodeTraversal = 1;
  NodeTraversal.exports = {
    nextSkippingChildren,
    nextAncestorSibling,
    next,
    previous,
    deepLastChild
  };
  function nextSkippingChildren(node2, stayWithin) {
    if (node2 === stayWithin) {
      return null;
    }
    if (node2.nextSibling !== null) {
      return node2.nextSibling;
    }
    return nextAncestorSibling(node2, stayWithin);
  }
  function nextAncestorSibling(node2, stayWithin) {
    for (node2 = node2.parentNode; node2 !== null; node2 = node2.parentNode) {
      if (node2 === stayWithin) {
        return null;
      }
      if (node2.nextSibling !== null) {
        return node2.nextSibling;
      }
    }
    return null;
  }
  function next(node2, stayWithin) {
    var n;
    n = node2.firstChild;
    if (n !== null) {
      return n;
    }
    if (node2 === stayWithin) {
      return null;
    }
    n = node2.nextSibling;
    if (n !== null) {
      return n;
    }
    return nextAncestorSibling(node2, stayWithin);
  }
  function deepLastChild(node2) {
    while (node2.lastChild) {
      node2 = node2.lastChild;
    }
    return node2;
  }
  function previous(node2, stayWithin) {
    var p;
    p = node2.previousSibling;
    if (p !== null) {
      return deepLastChild(p);
    }
    p = node2.parentNode;
    if (p === stayWithin) {
      return null;
    }
    return p;
  }
  return NodeTraversal.exports;
}
var TreeWalker_1;
var hasRequiredTreeWalker;
function requireTreeWalker() {
  if (hasRequiredTreeWalker) return TreeWalker_1;
  hasRequiredTreeWalker = 1;
  TreeWalker_1 = TreeWalker;
  var Node2 = requireNode();
  var NodeFilter = requireNodeFilter();
  var NodeTraversal2 = requireNodeTraversal();
  var utils2 = requireUtils();
  var mapChild = {
    first: "firstChild",
    last: "lastChild",
    next: "firstChild",
    previous: "lastChild"
  };
  var mapSibling = {
    first: "nextSibling",
    last: "previousSibling",
    next: "nextSibling",
    previous: "previousSibling"
  };
  function traverseChildren(tw, type) {
    var child, node2, parent, result2, sibling;
    node2 = tw._currentNode[mapChild[type]];
    while (node2 !== null) {
      result2 = tw._internalFilter(node2);
      if (result2 === NodeFilter.FILTER_ACCEPT) {
        tw._currentNode = node2;
        return node2;
      }
      if (result2 === NodeFilter.FILTER_SKIP) {
        child = node2[mapChild[type]];
        if (child !== null) {
          node2 = child;
          continue;
        }
      }
      while (node2 !== null) {
        sibling = node2[mapSibling[type]];
        if (sibling !== null) {
          node2 = sibling;
          break;
        }
        parent = node2.parentNode;
        if (parent === null || parent === tw.root || parent === tw._currentNode) {
          return null;
        } else {
          node2 = parent;
        }
      }
    }
    return null;
  }
  function traverseSiblings(tw, type) {
    var node2, result2, sibling;
    node2 = tw._currentNode;
    if (node2 === tw.root) {
      return null;
    }
    while (true) {
      sibling = node2[mapSibling[type]];
      while (sibling !== null) {
        node2 = sibling;
        result2 = tw._internalFilter(node2);
        if (result2 === NodeFilter.FILTER_ACCEPT) {
          tw._currentNode = node2;
          return node2;
        }
        sibling = node2[mapChild[type]];
        if (result2 === NodeFilter.FILTER_REJECT || sibling === null) {
          sibling = node2[mapSibling[type]];
        }
      }
      node2 = node2.parentNode;
      if (node2 === null || node2 === tw.root) {
        return null;
      }
      if (tw._internalFilter(node2) === NodeFilter.FILTER_ACCEPT) {
        return null;
      }
    }
  }
  function TreeWalker(root2, whatToShow, filter2) {
    if (!root2 || !root2.nodeType) {
      utils2.NotSupportedError();
    }
    this._root = root2;
    this._whatToShow = Number(whatToShow) || 0;
    this._filter = filter2 || null;
    this._active = false;
    this._currentNode = root2;
  }
  Object.defineProperties(TreeWalker.prototype, {
    root: {
      get: function() {
        return this._root;
      }
    },
    whatToShow: {
      get: function() {
        return this._whatToShow;
      }
    },
    filter: {
      get: function() {
        return this._filter;
      }
    },
    currentNode: {
      get: function currentNode() {
        return this._currentNode;
      },
      set: function setCurrentNode(v) {
        if (!(v instanceof Node2)) {
          throw new TypeError("Not a Node");
        }
        this._currentNode = v;
      }
    },
    /**
     * @method
     * @param {Node} node
     * @return {Number} Constant NodeFilter.FILTER_ACCEPT,
     *  NodeFilter.FILTER_REJECT or NodeFilter.FILTER_SKIP.
     */
    _internalFilter: {
      value: function _internalFilter(node2) {
        var result2, filter2;
        if (this._active) {
          utils2.InvalidStateError();
        }
        if (!(1 << node2.nodeType - 1 & this._whatToShow)) {
          return NodeFilter.FILTER_SKIP;
        }
        filter2 = this._filter;
        if (filter2 === null) {
          result2 = NodeFilter.FILTER_ACCEPT;
        } else {
          this._active = true;
          try {
            if (typeof filter2 === "function") {
              result2 = filter2(node2);
            } else {
              result2 = filter2.acceptNode(node2);
            }
          } finally {
            this._active = false;
          }
        }
        return +result2;
      }
    },
    /**
     * @spec https://dom.spec.whatwg.org/#dom-treewalker-parentnode
     * @based on WebKit's TreeWalker::parentNode
     * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/dom/TreeWalker.cpp?rev=220453#L50
     * @method
     * @return {Node|null}
     */
    parentNode: {
      value: function parentNode() {
        var node2 = this._currentNode;
        while (node2 !== this.root) {
          node2 = node2.parentNode;
          if (node2 === null) {
            return null;
          }
          if (this._internalFilter(node2) === NodeFilter.FILTER_ACCEPT) {
            this._currentNode = node2;
            return node2;
          }
        }
        return null;
      }
    },
    /**
     * @spec https://dom.spec.whatwg.org/#dom-treewalker-firstchild
     * @method
     * @return {Node|null}
     */
    firstChild: {
      value: function firstChild() {
        return traverseChildren(this, "first");
      }
    },
    /**
     * @spec https://dom.spec.whatwg.org/#dom-treewalker-lastchild
     * @method
     * @return {Node|null}
     */
    lastChild: {
      value: function lastChild() {
        return traverseChildren(this, "last");
      }
    },
    /**
     * @spec http://www.w3.org/TR/dom/#dom-treewalker-previoussibling
     * @method
     * @return {Node|null}
     */
    previousSibling: {
      value: function previousSibling() {
        return traverseSiblings(this, "previous");
      }
    },
    /**
     * @spec http://www.w3.org/TR/dom/#dom-treewalker-nextsibling
     * @method
     * @return {Node|null}
     */
    nextSibling: {
      value: function nextSibling() {
        return traverseSiblings(this, "next");
      }
    },
    /**
     * @spec https://dom.spec.whatwg.org/#dom-treewalker-previousnode
     * @based on WebKit's TreeWalker::previousNode
     * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/dom/TreeWalker.cpp?rev=220453#L181
     * @method
     * @return {Node|null}
     */
    previousNode: {
      value: function previousNode() {
        var node2, result2, previousSibling, lastChild;
        node2 = this._currentNode;
        while (node2 !== this._root) {
          for (previousSibling = node2.previousSibling; previousSibling; previousSibling = node2.previousSibling) {
            node2 = previousSibling;
            result2 = this._internalFilter(node2);
            if (result2 === NodeFilter.FILTER_REJECT) {
              continue;
            }
            for (lastChild = node2.lastChild; lastChild; lastChild = node2.lastChild) {
              node2 = lastChild;
              result2 = this._internalFilter(node2);
              if (result2 === NodeFilter.FILTER_REJECT) {
                break;
              }
            }
            if (result2 === NodeFilter.FILTER_ACCEPT) {
              this._currentNode = node2;
              return node2;
            }
          }
          if (node2 === this.root || node2.parentNode === null) {
            return null;
          }
          node2 = node2.parentNode;
          if (this._internalFilter(node2) === NodeFilter.FILTER_ACCEPT) {
            this._currentNode = node2;
            return node2;
          }
        }
        return null;
      }
    },
    /**
     * @spec https://dom.spec.whatwg.org/#dom-treewalker-nextnode
     * @based on WebKit's TreeWalker::nextNode
     * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/dom/TreeWalker.cpp?rev=220453#L228
     * @method
     * @return {Node|null}
     */
    nextNode: {
      value: function nextNode() {
        var node2, result2, firstChild, nextSibling;
        node2 = this._currentNode;
        result2 = NodeFilter.FILTER_ACCEPT;
        CHILDREN: while (true) {
          for (firstChild = node2.firstChild; firstChild; firstChild = node2.firstChild) {
            node2 = firstChild;
            result2 = this._internalFilter(node2);
            if (result2 === NodeFilter.FILTER_ACCEPT) {
              this._currentNode = node2;
              return node2;
            } else if (result2 === NodeFilter.FILTER_REJECT) {
              break;
            }
          }
          for (nextSibling = NodeTraversal2.nextSkippingChildren(node2, this.root); nextSibling; nextSibling = NodeTraversal2.nextSkippingChildren(node2, this.root)) {
            node2 = nextSibling;
            result2 = this._internalFilter(node2);
            if (result2 === NodeFilter.FILTER_ACCEPT) {
              this._currentNode = node2;
              return node2;
            } else if (result2 === NodeFilter.FILTER_SKIP) {
              continue CHILDREN;
            }
          }
          return null;
        }
      }
    },
    /** For compatibility with web-platform-tests. */
    toString: {
      value: function toString() {
        return "[object TreeWalker]";
      }
    }
  });
  return TreeWalker_1;
}
var NodeIterator_1;
var hasRequiredNodeIterator;
function requireNodeIterator() {
  if (hasRequiredNodeIterator) return NodeIterator_1;
  hasRequiredNodeIterator = 1;
  NodeIterator_1 = NodeIterator;
  var NodeFilter = requireNodeFilter();
  var NodeTraversal2 = requireNodeTraversal();
  var utils2 = requireUtils();
  function move(node2, stayWithin, directionIsNext) {
    if (directionIsNext) {
      return NodeTraversal2.next(node2, stayWithin);
    } else {
      if (node2 === stayWithin) {
        return null;
      }
      return NodeTraversal2.previous(node2, null);
    }
  }
  function isInclusiveAncestor(node2, possibleChild) {
    for (; possibleChild; possibleChild = possibleChild.parentNode) {
      if (node2 === possibleChild) {
        return true;
      }
    }
    return false;
  }
  function traverse(ni, directionIsNext) {
    var node2, beforeNode;
    node2 = ni._referenceNode;
    beforeNode = ni._pointerBeforeReferenceNode;
    while (true) {
      if (beforeNode === directionIsNext) {
        beforeNode = !beforeNode;
      } else {
        node2 = move(node2, ni._root, directionIsNext);
        if (node2 === null) {
          return null;
        }
      }
      var result2 = ni._internalFilter(node2);
      if (result2 === NodeFilter.FILTER_ACCEPT) {
        break;
      }
    }
    ni._referenceNode = node2;
    ni._pointerBeforeReferenceNode = beforeNode;
    return node2;
  }
  function NodeIterator(root2, whatToShow, filter2) {
    if (!root2 || !root2.nodeType) {
      utils2.NotSupportedError();
    }
    this._root = root2;
    this._referenceNode = root2;
    this._pointerBeforeReferenceNode = true;
    this._whatToShow = Number(whatToShow) || 0;
    this._filter = filter2 || null;
    this._active = false;
    root2.doc._attachNodeIterator(this);
  }
  Object.defineProperties(NodeIterator.prototype, {
    root: {
      get: function root2() {
        return this._root;
      }
    },
    referenceNode: {
      get: function referenceNode() {
        return this._referenceNode;
      }
    },
    pointerBeforeReferenceNode: {
      get: function pointerBeforeReferenceNode() {
        return this._pointerBeforeReferenceNode;
      }
    },
    whatToShow: {
      get: function whatToShow() {
        return this._whatToShow;
      }
    },
    filter: {
      get: function filter2() {
        return this._filter;
      }
    },
    /**
     * @method
     * @param {Node} node
     * @return {Number} Constant NodeFilter.FILTER_ACCEPT,
     *  NodeFilter.FILTER_REJECT or NodeFilter.FILTER_SKIP.
     */
    _internalFilter: {
      value: function _internalFilter(node2) {
        var result2, filter2;
        if (this._active) {
          utils2.InvalidStateError();
        }
        if (!(1 << node2.nodeType - 1 & this._whatToShow)) {
          return NodeFilter.FILTER_SKIP;
        }
        filter2 = this._filter;
        if (filter2 === null) {
          result2 = NodeFilter.FILTER_ACCEPT;
        } else {
          this._active = true;
          try {
            if (typeof filter2 === "function") {
              result2 = filter2(node2);
            } else {
              result2 = filter2.acceptNode(node2);
            }
          } finally {
            this._active = false;
          }
        }
        return +result2;
      }
    },
    /**
     * @spec https://dom.spec.whatwg.org/#nodeiterator-pre-removing-steps
     * @method
     * @return void
     */
    _preremove: {
      value: function _preremove(toBeRemovedNode) {
        if (isInclusiveAncestor(toBeRemovedNode, this._root)) {
          return;
        }
        if (!isInclusiveAncestor(toBeRemovedNode, this._referenceNode)) {
          return;
        }
        if (this._pointerBeforeReferenceNode) {
          var next = toBeRemovedNode;
          while (next.lastChild) {
            next = next.lastChild;
          }
          next = NodeTraversal2.next(next, this.root);
          if (next) {
            this._referenceNode = next;
            return;
          }
          this._pointerBeforeReferenceNode = false;
        }
        if (toBeRemovedNode.previousSibling === null) {
          this._referenceNode = toBeRemovedNode.parentNode;
        } else {
          this._referenceNode = toBeRemovedNode.previousSibling;
          var lastChild;
          for (lastChild = this._referenceNode.lastChild; lastChild; lastChild = this._referenceNode.lastChild) {
            this._referenceNode = lastChild;
          }
        }
      }
    },
    /**
     * @spec http://www.w3.org/TR/dom/#dom-nodeiterator-nextnode
     * @method
     * @return {Node|null}
     */
    nextNode: {
      value: function nextNode() {
        return traverse(this, true);
      }
    },
    /**
     * @spec http://www.w3.org/TR/dom/#dom-nodeiterator-previousnode
     * @method
     * @return {Node|null}
     */
    previousNode: {
      value: function previousNode() {
        return traverse(this, false);
      }
    },
    /**
     * @spec http://www.w3.org/TR/dom/#dom-nodeiterator-detach
     * @method
     * @return void
     */
    detach: {
      value: function detach() {
      }
    },
    /** For compatibility with web-platform-tests. */
    toString: {
      value: function toString() {
        return "[object NodeIterator]";
      }
    }
  });
  return NodeIterator_1;
}
var URL_1;
var hasRequiredURL;
function requireURL() {
  if (hasRequiredURL) return URL_1;
  hasRequiredURL = 1;
  URL_1 = URL2;
  function URL2(url) {
    if (!url) return Object.create(URL2.prototype);
    this.url = url.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
    var match = URL2.pattern.exec(this.url);
    if (match) {
      if (match[2]) this.scheme = match[2];
      if (match[4]) {
        var userinfo = match[4].match(URL2.userinfoPattern);
        if (userinfo) {
          this.username = userinfo[1];
          this.password = userinfo[3];
          match[4] = match[4].substring(userinfo[0].length);
        }
        if (match[4].match(URL2.portPattern)) {
          var pos = match[4].lastIndexOf(":");
          this.host = match[4].substring(0, pos);
          this.port = match[4].substring(pos + 1);
        } else {
          this.host = match[4];
        }
      }
      if (match[5]) this.path = match[5];
      if (match[6]) this.query = match[7];
      if (match[8]) this.fragment = match[9];
    }
  }
  URL2.pattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
  URL2.userinfoPattern = /^([^@:]*)(:([^@]*))?@/;
  URL2.portPattern = /:\d+$/;
  URL2.authorityPattern = /^[^:\/?#]+:\/\//;
  URL2.hierarchyPattern = /^[^:\/?#]+:\//;
  URL2.percentEncode = function percentEncode(s) {
    var c = s.charCodeAt(0);
    if (c < 256) return "%" + c.toString(16);
    else throw Error("can't percent-encode codepoints > 255 yet");
  };
  URL2.prototype = {
    constructor: URL2,
    // XXX: not sure if this is the precise definition of absolute
    isAbsolute: function() {
      return !!this.scheme;
    },
    isAuthorityBased: function() {
      return URL2.authorityPattern.test(this.url);
    },
    isHierarchical: function() {
      return URL2.hierarchyPattern.test(this.url);
    },
    toString: function() {
      var s = "";
      if (this.scheme !== void 0) s += this.scheme + ":";
      if (this.isAbsolute()) {
        s += "//";
        if (this.username || this.password) {
          s += this.username || "";
          if (this.password) {
            s += ":" + this.password;
          }
          s += "@";
        }
        if (this.host) {
          s += this.host;
        }
      }
      if (this.port !== void 0) s += ":" + this.port;
      if (this.path !== void 0) s += this.path;
      if (this.query !== void 0) s += "?" + this.query;
      if (this.fragment !== void 0) s += "#" + this.fragment;
      return s;
    },
    // See: http://tools.ietf.org/html/rfc3986#section-5.2
    // and https://url.spec.whatwg.org/#constructors
    resolve: function(relative2) {
      var base = this;
      var r = new URL2(relative2);
      var t = new URL2();
      if (r.scheme !== void 0) {
        t.scheme = r.scheme;
        t.username = r.username;
        t.password = r.password;
        t.host = r.host;
        t.port = r.port;
        t.path = remove_dot_segments(r.path);
        t.query = r.query;
      } else {
        t.scheme = base.scheme;
        if (r.host !== void 0) {
          t.username = r.username;
          t.password = r.password;
          t.host = r.host;
          t.port = r.port;
          t.path = remove_dot_segments(r.path);
          t.query = r.query;
        } else {
          t.username = base.username;
          t.password = base.password;
          t.host = base.host;
          t.port = base.port;
          if (!r.path) {
            t.path = base.path;
            if (r.query !== void 0) t.query = r.query;
            else t.query = base.query;
          } else {
            if (r.path.charAt(0) === "/") {
              t.path = remove_dot_segments(r.path);
            } else {
              t.path = merge(base.path, r.path);
              t.path = remove_dot_segments(t.path);
            }
            t.query = r.query;
          }
        }
      }
      t.fragment = r.fragment;
      return t.toString();
      function merge(basepath, refpath) {
        if (base.host !== void 0 && !base.path) return "/" + refpath;
        var lastslash = basepath.lastIndexOf("/");
        if (lastslash === -1) return refpath;
        else return basepath.substring(0, lastslash + 1) + refpath;
      }
      function remove_dot_segments(path2) {
        if (!path2) return path2;
        var output = "";
        while (path2.length > 0) {
          if (path2 === "." || path2 === "..") {
            path2 = "";
            break;
          }
          var twochars = path2.substring(0, 2);
          var threechars = path2.substring(0, 3);
          var fourchars = path2.substring(0, 4);
          if (threechars === "../") {
            path2 = path2.substring(3);
          } else if (twochars === "./") {
            path2 = path2.substring(2);
          } else if (threechars === "/./") {
            path2 = "/" + path2.substring(3);
          } else if (twochars === "/." && path2.length === 2) {
            path2 = "/";
          } else if (fourchars === "/../" || threechars === "/.." && path2.length === 3) {
            path2 = "/" + path2.substring(4);
            output = output.replace(/\/?[^\/]*$/, "");
          } else {
            var segment = path2.match(/(\/?([^\/]*))/)[0];
            output += segment;
            path2 = path2.substring(segment.length);
          }
        }
        return output;
      }
    }
  };
  return URL_1;
}
var CustomEvent_1;
var hasRequiredCustomEvent;
function requireCustomEvent() {
  if (hasRequiredCustomEvent) return CustomEvent_1;
  hasRequiredCustomEvent = 1;
  CustomEvent_1 = CustomEvent;
  var Event = requireEvent();
  function CustomEvent(type, dictionary) {
    Event.call(this, type, dictionary);
  }
  CustomEvent.prototype = Object.create(Event.prototype, {
    constructor: {
      value: CustomEvent
    }
  });
  return CustomEvent_1;
}
var events;
var hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events;
  hasRequiredEvents = 1;
  events = {
    Event: requireEvent(),
    UIEvent: requireUIEvent(),
    MouseEvent: requireMouseEvent(),
    CustomEvent: requireCustomEvent()
  };
  return events;
}
var htmlelts = {};
var style_parser = {};
var hasRequiredStyle_parser;
function requireStyle_parser() {
  if (hasRequiredStyle_parser) return style_parser;
  hasRequiredStyle_parser = 1;
  Object.defineProperty(style_parser, "__esModule", {
    value: true
  });
  style_parser.hyphenate = style_parser.parse = void 0;
  function parse2(value) {
    const styles = [];
    let i = 0;
    let parenDepth = 0;
    let quote = 0;
    let valueStart = 0;
    let propStart = 0;
    let currentProp = null;
    while (i < value.length) {
      const token = value.charCodeAt(i++);
      switch (token) {
        case 40:
          parenDepth++;
          break;
        case 41:
          parenDepth--;
          break;
        case 39:
          if (quote === 0) {
            quote = 39;
          } else if (quote === 39 && value.charCodeAt(i - 1) !== 92) {
            quote = 0;
          }
          break;
        case 34:
          if (quote === 0) {
            quote = 34;
          } else if (quote === 34 && value.charCodeAt(i - 1) !== 92) {
            quote = 0;
          }
          break;
        case 58:
          if (!currentProp && parenDepth === 0 && quote === 0) {
            currentProp = hyphenate(value.substring(propStart, i - 1).trim());
            valueStart = i;
          }
          break;
        case 59:
          if (currentProp && valueStart > 0 && parenDepth === 0 && quote === 0) {
            const styleVal = value.substring(valueStart, i - 1).trim();
            styles.push(currentProp, styleVal);
            propStart = i;
            valueStart = 0;
            currentProp = null;
          }
          break;
      }
    }
    if (currentProp && valueStart) {
      const styleVal = value.slice(valueStart).trim();
      styles.push(currentProp, styleVal);
    }
    return styles;
  }
  style_parser.parse = parse2;
  function hyphenate(value) {
    return value.replace(/[a-z][A-Z]/g, (v) => {
      return v.charAt(0) + "-" + v.charAt(1);
    }).toLowerCase();
  }
  style_parser.hyphenate = hyphenate;
  return style_parser;
}
var CSSStyleDeclaration_1;
var hasRequiredCSSStyleDeclaration;
function requireCSSStyleDeclaration() {
  if (hasRequiredCSSStyleDeclaration) return CSSStyleDeclaration_1;
  hasRequiredCSSStyleDeclaration = 1;
  const {
    parse: parse2
  } = requireStyle_parser();
  CSSStyleDeclaration_1 = function(elt) {
    const style = new CSSStyleDeclaration(elt);
    const handler = {
      get: function(target, property) {
        return property in target ? target[property] : target.getPropertyValue(dasherizeProperty(property));
      },
      has: function(target, key) {
        return true;
      },
      set: function(target, property, value) {
        if (property in target) {
          target[property] = value;
        } else {
          target.setProperty(dasherizeProperty(property), value ?? void 0);
        }
        return true;
      }
    };
    return new Proxy(style, handler);
  };
  function dasherizeProperty(property) {
    return property.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function CSSStyleDeclaration(elt) {
    this._element = elt;
  }
  const IMPORTANT_BANG = "!important";
  function parseStyles(value) {
    const result2 = {
      property: {},
      priority: {}
    };
    if (!value) {
      return result2;
    }
    const styleValues = parse2(value);
    if (styleValues.length < 2) {
      return result2;
    }
    for (let i = 0; i < styleValues.length; i += 2) {
      const name = styleValues[i];
      let value2 = styleValues[i + 1];
      if (value2.endsWith(IMPORTANT_BANG)) {
        result2.priority[name] = "important";
        value2 = value2.slice(0, -IMPORTANT_BANG.length).trim();
      }
      result2.property[name] = value2;
    }
    return result2;
  }
  var NO_CHANGE = {};
  CSSStyleDeclaration.prototype = Object.create(Object.prototype, {
    // Return the parsed form of the element's style attribute.
    // If the element's style attribute has never been parsed
    // or if it has changed since the last parse, then reparse it
    // Note that the styles don't get parsed until they're actually needed
    _parsed: {
      get: function() {
        if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
          var text = this.cssText;
          this._parsedStyles = parseStyles(text);
          this._lastParsedText = text;
          delete this._names;
        }
        return this._parsedStyles;
      }
    },
    // Call this method any time the parsed representation of the
    // style changes.  It converts the style properties to a string and
    // sets cssText and the element's style attribute
    _serialize: {
      value: function() {
        var styles = this._parsed;
        var s = "";
        for (var name in styles.property) {
          if (s) s += " ";
          s += name + ": " + styles.property[name];
          if (styles.priority[name]) {
            s += " !" + styles.priority[name];
          }
          s += ";";
        }
        this.cssText = s;
        this._lastParsedText = s;
        delete this._names;
      }
    },
    cssText: {
      get: function() {
        return this._element.getAttribute("style");
      },
      set: function(value) {
        this._element.setAttribute("style", value);
      }
    },
    length: {
      get: function() {
        if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
        return this._names.length;
      }
    },
    item: {
      value: function(n) {
        if (!this._names) this._names = Object.getOwnPropertyNames(this._parsed.property);
        return this._names[n];
      }
    },
    getPropertyValue: {
      value: function(property) {
        property = property.toLowerCase();
        return this._parsed.property[property] || "";
      }
    },
    getPropertyPriority: {
      value: function(property) {
        property = property.toLowerCase();
        return this._parsed.priority[property] || "";
      }
    },
    setProperty: {
      value: function(property, value, priority) {
        property = property.toLowerCase();
        if (value === null || value === void 0) {
          value = "";
        }
        if (priority === null || priority === void 0) {
          priority = "";
        }
        if (value !== NO_CHANGE) {
          value = "" + value;
        }
        value = value.trim();
        if (value === "") {
          this.removeProperty(property);
          return;
        }
        if (priority !== "" && priority !== NO_CHANGE && !/^important$/i.test(priority)) {
          return;
        }
        var styles = this._parsed;
        if (value === NO_CHANGE) {
          if (!styles.property[property]) {
            return;
          }
          if (priority !== "") {
            styles.priority[property] = "important";
          } else {
            delete styles.priority[property];
          }
        } else {
          if (value.includes(";") && !value.includes("data:")) return;
          var newprops = parseStyles(property + ":" + value);
          if (Object.getOwnPropertyNames(newprops.property).length === 0) {
            return;
          }
          if (Object.getOwnPropertyNames(newprops.priority).length !== 0) {
            return;
          }
          for (var p in newprops.property) {
            styles.property[p] = newprops.property[p];
            if (priority === NO_CHANGE) {
              continue;
            } else if (priority !== "") {
              styles.priority[p] = "important";
            } else if (styles.priority[p]) {
              delete styles.priority[p];
            }
          }
        }
        this._serialize();
      }
    },
    setPropertyValue: {
      value: function(property, value) {
        return this.setProperty(property, value, NO_CHANGE);
      }
    },
    setPropertyPriority: {
      value: function(property, priority) {
        return this.setProperty(property, NO_CHANGE, priority);
      }
    },
    removeProperty: {
      value: function(property) {
        property = property.toLowerCase();
        var styles = this._parsed;
        if (property in styles.property) {
          delete styles.property[property];
          delete styles.priority[property];
          this._serialize();
        }
      }
    }
  });
  return CSSStyleDeclaration_1;
}
var URLUtils_1;
var hasRequiredURLUtils;
function requireURLUtils() {
  if (hasRequiredURLUtils) return URLUtils_1;
  hasRequiredURLUtils = 1;
  var URL2 = requireURL();
  URLUtils_1 = URLUtils;
  function URLUtils() {
  }
  URLUtils.prototype = Object.create(Object.prototype, {
    _url: {
      get: function() {
        return new URL2(this.href);
      }
    },
    protocol: {
      get: function() {
        var url = this._url;
        if (url && url.scheme) return url.scheme + ":";
        else return ":";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute()) {
          v = v.replace(/:+$/, "");
          v = v.replace(/[^-+\.a-zA-Z0-9]/g, URL2.percentEncode);
          if (v.length > 0) {
            url.scheme = v;
            output = url.toString();
          }
        }
        this.href = output;
      }
    },
    host: {
      get: function() {
        var url = this._url;
        if (url.isAbsolute() && url.isAuthorityBased()) return url.host + (url.port ? ":" + url.port : "");
        else return "";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute() && url.isAuthorityBased()) {
          v = v.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, URL2.percentEncode);
          if (v.length > 0) {
            url.host = v;
            delete url.port;
            output = url.toString();
          }
        }
        this.href = output;
      }
    },
    hostname: {
      get: function() {
        var url = this._url;
        if (url.isAbsolute() && url.isAuthorityBased()) return url.host;
        else return "";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute() && url.isAuthorityBased()) {
          v = v.replace(/^\/+/, "");
          v = v.replace(/[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g, URL2.percentEncode);
          if (v.length > 0) {
            url.host = v;
            output = url.toString();
          }
        }
        this.href = output;
      }
    },
    port: {
      get: function() {
        var url = this._url;
        if (url.isAbsolute() && url.isAuthorityBased() && url.port !== void 0) return url.port;
        else return "";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute() && url.isAuthorityBased()) {
          v = "" + v;
          v = v.replace(/[^0-9].*$/, "");
          v = v.replace(/^0+/, "");
          if (v.length === 0) v = "0";
          if (parseInt(v, 10) <= 65535) {
            url.port = v;
            output = url.toString();
          }
        }
        this.href = output;
      }
    },
    pathname: {
      get: function() {
        var url = this._url;
        if (url.isAbsolute() && url.isHierarchical()) return url.path;
        else return "";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute() && url.isHierarchical()) {
          if (v.charAt(0) !== "/") v = "/" + v;
          v = v.replace(/[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g, URL2.percentEncode);
          url.path = v;
          output = url.toString();
        }
        this.href = output;
      }
    },
    search: {
      get: function() {
        var url = this._url;
        if (url.isAbsolute() && url.isHierarchical() && url.query !== void 0) return "?" + url.query;
        else return "";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute() && url.isHierarchical()) {
          if (v.charAt(0) === "?") v = v.substring(1);
          v = v.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, URL2.percentEncode);
          url.query = v;
          output = url.toString();
        }
        this.href = output;
      }
    },
    hash: {
      get: function() {
        var url = this._url;
        if (url == null || url.fragment == null || url.fragment === "") {
          return "";
        } else {
          return "#" + url.fragment;
        }
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (v.charAt(0) === "#") v = v.substring(1);
        v = v.replace(/[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g, URL2.percentEncode);
        url.fragment = v;
        output = url.toString();
        this.href = output;
      }
    },
    username: {
      get: function() {
        var url = this._url;
        return url.username || "";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute()) {
          v = v.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g, URL2.percentEncode);
          url.username = v;
          output = url.toString();
        }
        this.href = output;
      }
    },
    password: {
      get: function() {
        var url = this._url;
        return url.password || "";
      },
      set: function(v) {
        var output = this.href;
        var url = new URL2(output);
        if (url.isAbsolute()) {
          if (v === "") {
            url.password = null;
          } else {
            v = v.replace(/[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g, URL2.percentEncode);
            url.password = v;
          }
          output = url.toString();
        }
        this.href = output;
      }
    },
    origin: {
      get: function() {
        var url = this._url;
        if (url == null) {
          return "";
        }
        var originForPort = function(defaultPort) {
          var origin = [url.scheme, url.host, +url.port || defaultPort];
          return origin[0] + "://" + origin[1] + (origin[2] === defaultPort ? "" : ":" + origin[2]);
        };
        switch (url.scheme) {
          case "ftp":
            return originForPort(21);
          case "gopher":
            return originForPort(70);
          case "http":
          case "ws":
            return originForPort(80);
          case "https":
          case "wss":
            return originForPort(443);
          default:
            return url.scheme + "://";
        }
      }
    }
    /*
    searchParams: {
      get: function() {
        var url = this._url;
        // XXX
      },
      set: function(v) {
        var output = this.href;
        var url = new URL(output);
        // XXX
        this.href = output;
      },
    },
    */
  });
  URLUtils._inherit = function(proto) {
    Object.getOwnPropertyNames(URLUtils.prototype).forEach(function(p) {
      if (p === "constructor" || p === "href") {
        return;
      }
      var desc = Object.getOwnPropertyDescriptor(URLUtils.prototype, p);
      Object.defineProperty(proto, p, desc);
    });
  };
  return URLUtils_1;
}
var defineElement;
var hasRequiredDefineElement;
function requireDefineElement() {
  if (hasRequiredDefineElement) return defineElement;
  hasRequiredDefineElement = 1;
  var attributes2 = requireAttributes();
  var isApiWritable = requireConfig().isApiWritable;
  defineElement = function(spec, defaultConstructor, tagList, tagNameToImpl) {
    var c = spec.ctor;
    if (c) {
      var props = spec.props || {};
      if (spec.attributes) {
        for (var n in spec.attributes) {
          var attr = spec.attributes[n];
          if (typeof attr !== "object" || Array.isArray(attr)) attr = {
            type: attr
          };
          if (!attr.name) attr.name = n.toLowerCase();
          props[n] = attributes2.property(attr);
        }
      }
      props.constructor = {
        value: c,
        writable: isApiWritable
      };
      c.prototype = Object.create((spec.superclass || defaultConstructor).prototype, props);
      if (spec.events) {
        addEventHandlers(c, spec.events);
      }
      tagList[spec.name] = c;
    } else {
      c = defaultConstructor;
    }
    (spec.tags || spec.tag && [spec.tag] || []).forEach(function(tag) {
      tagNameToImpl[tag] = c;
    });
    return c;
  };
  function EventHandlerBuilder(body, document2, form, element) {
    this.body = body;
    this.document = document2;
    this.form = form;
    this.element = element;
  }
  EventHandlerBuilder.prototype.build = function() {
    return () => {
    };
  };
  function EventHandlerChangeHandler(elt, name, oldval, newval) {
    var doc = elt.ownerDocument || /* @__PURE__ */ Object.create(null);
    var form = elt.form || /* @__PURE__ */ Object.create(null);
    elt[name] = new EventHandlerBuilder(newval, doc, form, elt).build();
  }
  function addEventHandlers(c, eventHandlerTypes) {
    var p = c.prototype;
    eventHandlerTypes.forEach(function(type) {
      Object.defineProperty(p, "on" + type, {
        get: function() {
          return this._getEventHandler(type);
        },
        set: function(v) {
          this._setEventHandler(type, v);
        }
      });
      attributes2.registerChangeHandler(c, "on" + type, EventHandlerChangeHandler);
    });
  }
  return defineElement;
}
var hasRequiredHtmlelts;
function requireHtmlelts() {
  if (hasRequiredHtmlelts) return htmlelts;
  hasRequiredHtmlelts = 1;
  var Node2 = requireNode();
  var Element2 = requireElement();
  var CSSStyleDeclaration = requireCSSStyleDeclaration();
  var utils2 = requireUtils();
  var URLUtils = requireURLUtils();
  var defineElement2 = requireDefineElement();
  var htmlElements = htmlelts.elements = {};
  var htmlNameToImpl = /* @__PURE__ */ Object.create(null);
  htmlelts.createElement = function(doc, localName, prefix) {
    var impl2 = htmlNameToImpl[localName] || HTMLUnknownElement;
    return new impl2(doc, localName, prefix);
  };
  function define(spec) {
    return defineElement2(spec, HTMLElement, htmlElements, htmlNameToImpl);
  }
  function URL2(attr) {
    return {
      get: function() {
        var v = this._getattr(attr);
        if (v === null) {
          return "";
        }
        var url = this.doc._resolve(v);
        return url === null ? v : url;
      },
      set: function(value) {
        this._setattr(attr, value);
      }
    };
  }
  function CORS(attr) {
    return {
      get: function() {
        var v = this._getattr(attr);
        if (v === null) {
          return null;
        }
        if (v.toLowerCase() === "use-credentials") {
          return "use-credentials";
        }
        return "anonymous";
      },
      set: function(value) {
        if (value === null || value === void 0) {
          this.removeAttribute(attr);
        } else {
          this._setattr(attr, value);
        }
      }
    };
  }
  const REFERRER = {
    type: ["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"],
    missing: ""
  };
  var focusableElements = {
    "A": true,
    "LINK": true,
    "BUTTON": true,
    "INPUT": true,
    "SELECT": true,
    "TEXTAREA": true,
    "COMMAND": true
  };
  var HTMLFormElement = function(doc, localName, prefix) {
    HTMLElement.call(this, doc, localName, prefix);
    this._form = null;
  };
  var HTMLElement = htmlelts.HTMLElement = define({
    superclass: Element2,
    name: "HTMLElement",
    ctor: function HTMLElement2(doc, localName, prefix) {
      Element2.call(this, doc, localName, utils2.NAMESPACE.HTML, prefix);
    },
    props: {
      dangerouslySetInnerHTML: {
        set: function(v) {
          this._innerHTML = v;
        }
      },
      innerHTML: {
        get: function() {
          return this.serialize();
        },
        set: function(v) {
          var parser2 = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, this);
          parser2.parse(v === null ? "" : String(v), true);
          var target = this instanceof htmlNameToImpl.template ? this.content : this;
          while (target.hasChildNodes()) target.removeChild(target.firstChild);
          target.appendChild(parser2._asDocumentFragment());
        }
      },
      style: {
        get: function() {
          if (!this._style) this._style = new CSSStyleDeclaration(this);
          return this._style;
        },
        set: function(v) {
          if (v === null || v === void 0) {
            v = "";
          }
          this._setattr("style", String(v));
        }
      },
      // These can't really be implemented server-side in a reasonable way.
      blur: {
        value: function() {
        }
      },
      focus: {
        value: function() {
        }
      },
      forceSpellCheck: {
        value: function() {
        }
      },
      click: {
        value: function() {
          if (this._click_in_progress) return;
          this._click_in_progress = true;
          try {
            if (this._pre_click_activation_steps) this._pre_click_activation_steps();
            var event = this.ownerDocument.createEvent("MouseEvent");
            event.initMouseEvent(
              "click",
              true,
              true,
              this.ownerDocument.defaultView,
              1,
              0,
              0,
              0,
              0,
              // These 4 should be initialized with
              // the actually current keyboard state
              // somehow...
              false,
              false,
              false,
              false,
              0,
              null
            );
            var success = this.dispatchEvent(event);
            if (success) {
              if (this._post_click_activation_steps) this._post_click_activation_steps(event);
            } else {
              if (this._cancelled_activation_steps) this._cancelled_activation_steps();
            }
          } finally {
            this._click_in_progress = false;
          }
        }
      },
      submit: {
        value: utils2.nyi
      }
    },
    attributes: {
      title: String,
      lang: String,
      dir: {
        type: ["ltr", "rtl", "auto"],
        missing: ""
      },
      draggable: {
        type: ["true", "false"],
        treatNullAsEmptyString: true
      },
      spellcheck: {
        type: ["true", "false"],
        missing: ""
      },
      enterKeyHint: {
        type: ["enter", "done", "go", "next", "previous", "search", "send"],
        missing: ""
      },
      autoCapitalize: {
        type: ["off", "on", "none", "sentences", "words", "characters"],
        missing: ""
      },
      autoFocus: Boolean,
      accessKey: String,
      nonce: String,
      hidden: Boolean,
      translate: {
        type: ["no", "yes"],
        missing: ""
      },
      tabIndex: {
        type: "long",
        default: function() {
          if (this.tagName in focusableElements || this.contentEditable) return 0;
          else return -1;
        }
      }
    },
    events: [
      "abort",
      "canplay",
      "canplaythrough",
      "change",
      "click",
      "contextmenu",
      "cuechange",
      "dblclick",
      "drag",
      "dragend",
      "dragenter",
      "dragleave",
      "dragover",
      "dragstart",
      "drop",
      "durationchange",
      "emptied",
      "ended",
      "input",
      "invalid",
      "keydown",
      "keypress",
      "keyup",
      "loadeddata",
      "loadedmetadata",
      "loadstart",
      "mousedown",
      "mousemove",
      "mouseout",
      "mouseover",
      "mouseup",
      "mousewheel",
      "pause",
      "play",
      "playing",
      "progress",
      "ratechange",
      "readystatechange",
      "reset",
      "seeked",
      "seeking",
      "select",
      "show",
      "stalled",
      "submit",
      "suspend",
      "timeupdate",
      "volumechange",
      "waiting",
      // These last 5 event types will be overriden by HTMLBodyElement
      "blur",
      "error",
      "focus",
      "load",
      "scroll"
    ]
  });
  var HTMLUnknownElement = define({
    name: "HTMLUnknownElement",
    ctor: function HTMLUnknownElement2(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    }
  });
  var formAssociatedProps = {
    // See http://www.w3.org/TR/html5/association-of-controls-and-forms.html#form-owner
    form: {
      get: function() {
        return this._form;
      }
    }
  };
  define({
    tag: "a",
    name: "HTMLAnchorElement",
    ctor: function HTMLAnchorElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      _post_click_activation_steps: {
        value: function(e) {
          if (this.href) {
            this.ownerDocument.defaultView.location = this.href;
          }
        }
      }
    },
    attributes: {
      href: URL2,
      ping: String,
      download: String,
      target: String,
      rel: String,
      media: String,
      hreflang: String,
      type: String,
      referrerPolicy: REFERRER,
      // Obsolete
      coords: String,
      charset: String,
      name: String,
      rev: String,
      shape: String
    }
  });
  URLUtils._inherit(htmlNameToImpl.a.prototype);
  define({
    tag: "area",
    name: "HTMLAreaElement",
    ctor: function HTMLAreaElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      alt: String,
      target: String,
      download: String,
      rel: String,
      media: String,
      href: URL2,
      hreflang: String,
      type: String,
      shape: String,
      coords: String,
      ping: String,
      // XXX: also reflect relList
      referrerPolicy: REFERRER,
      // Obsolete
      noHref: Boolean
    }
  });
  URLUtils._inherit(htmlNameToImpl.area.prototype);
  define({
    tag: "br",
    name: "HTMLBRElement",
    ctor: function HTMLBRElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      clear: String
    }
  });
  define({
    tag: "base",
    name: "HTMLBaseElement",
    ctor: function HTMLBaseElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      "target": String
    }
  });
  define({
    tag: "body",
    name: "HTMLBodyElement",
    ctor: function HTMLBodyElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    // Certain event handler attributes on a <body> tag actually set
    // handlers for the window rather than just that element.  Define
    // getters and setters for those here.  Note that some of these override
    // properties on HTMLElement.prototype.
    // XXX: If I add support for <frameset>, these have to go there, too
    // XXX
    // When the Window object is implemented, these attribute will have
    // to work with the same-named attributes on the Window.
    events: ["afterprint", "beforeprint", "beforeunload", "blur", "error", "focus", "hashchange", "load", "message", "offline", "online", "pagehide", "pageshow", "popstate", "resize", "scroll", "storage", "unload"],
    attributes: {
      // Obsolete
      text: {
        type: String,
        treatNullAsEmptyString: true
      },
      link: {
        type: String,
        treatNullAsEmptyString: true
      },
      vLink: {
        type: String,
        treatNullAsEmptyString: true
      },
      aLink: {
        type: String,
        treatNullAsEmptyString: true
      },
      bgColor: {
        type: String,
        treatNullAsEmptyString: true
      },
      background: String
    }
  });
  define({
    tag: "button",
    name: "HTMLButtonElement",
    ctor: function HTMLButtonElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps,
    attributes: {
      name: String,
      value: String,
      disabled: Boolean,
      autofocus: Boolean,
      type: {
        type: ["submit", "reset", "button", "menu"],
        missing: "submit"
      },
      formTarget: String,
      formAction: URL2,
      formNoValidate: Boolean,
      formMethod: {
        type: ["get", "post", "dialog"],
        invalid: "get",
        missing: ""
      },
      formEnctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: ""
      }
    }
  });
  define({
    tag: "dl",
    name: "HTMLDListElement",
    ctor: function HTMLDListElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      compact: Boolean
    }
  });
  define({
    tag: "data",
    name: "HTMLDataElement",
    ctor: function HTMLDataElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      value: String
    }
  });
  define({
    tag: "datalist",
    name: "HTMLDataListElement",
    ctor: function HTMLDataListElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    }
  });
  define({
    tag: "details",
    name: "HTMLDetailsElement",
    ctor: function HTMLDetailsElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      "open": Boolean
    }
  });
  define({
    tag: "div",
    name: "HTMLDivElement",
    ctor: function HTMLDivElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      align: String
    }
  });
  define({
    tag: "embed",
    name: "HTMLEmbedElement",
    ctor: function HTMLEmbedElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      src: URL2,
      type: String,
      width: String,
      height: String,
      // Obsolete
      align: String,
      name: String
    }
  });
  define({
    tag: "fieldset",
    name: "HTMLFieldSetElement",
    ctor: function HTMLFieldSetElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps,
    attributes: {
      disabled: Boolean,
      name: String
    }
  });
  define({
    tag: "form",
    name: "HTMLFormElement",
    ctor: function HTMLFormElement2(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      action: String,
      autocomplete: {
        type: ["on", "off"],
        missing: "on"
      },
      name: String,
      acceptCharset: {
        name: "accept-charset"
      },
      target: String,
      noValidate: Boolean,
      method: {
        type: ["get", "post", "dialog"],
        invalid: "get",
        missing: "get"
      },
      // Both enctype and encoding reflect the enctype content attribute
      enctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "application/x-www-form-urlencoded"
      },
      encoding: {
        name: "enctype",
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: "application/x-www-form-urlencoded"
      }
    }
  });
  define({
    tag: "hr",
    name: "HTMLHRElement",
    ctor: function HTMLHRElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      align: String,
      color: String,
      noShade: Boolean,
      size: String,
      width: String
    }
  });
  define({
    tag: "head",
    name: "HTMLHeadElement",
    ctor: function HTMLHeadElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    }
  });
  define({
    tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
    name: "HTMLHeadingElement",
    ctor: function HTMLHeadingElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      align: String
    }
  });
  define({
    tag: "html",
    name: "HTMLHtmlElement",
    ctor: function HTMLHtmlElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      xmlns: URL2,
      // Obsolete
      version: String
    }
  });
  define({
    tag: "iframe",
    name: "HTMLIFrameElement",
    ctor: function HTMLIFrameElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      src: URL2,
      srcdoc: String,
      name: String,
      width: String,
      height: String,
      // XXX: sandbox is a reflected settable token list
      seamless: Boolean,
      allow: Boolean,
      allowFullscreen: Boolean,
      allowUserMedia: Boolean,
      allowPaymentRequest: Boolean,
      referrerPolicy: REFERRER,
      loading: {
        type: ["eager", "lazy"],
        treatNullAsEmptyString: true
      },
      // Obsolete
      align: String,
      scrolling: String,
      frameBorder: String,
      longDesc: URL2,
      marginHeight: {
        type: String,
        treatNullAsEmptyString: true
      },
      marginWidth: {
        type: String,
        treatNullAsEmptyString: true
      }
    }
  });
  define({
    tag: "img",
    name: "HTMLImageElement",
    ctor: function HTMLImageElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      alt: String,
      src: URL2,
      srcset: String,
      crossOrigin: CORS,
      useMap: String,
      isMap: Boolean,
      sizes: String,
      height: {
        type: "unsigned long",
        default: 0
      },
      width: {
        type: "unsigned long",
        default: 0
      },
      referrerPolicy: REFERRER,
      loading: {
        type: ["eager", "lazy"],
        missing: ""
      },
      // Obsolete:
      name: String,
      lowsrc: URL2,
      align: String,
      hspace: {
        type: "unsigned long",
        default: 0
      },
      vspace: {
        type: "unsigned long",
        default: 0
      },
      longDesc: URL2,
      border: {
        type: String,
        treatNullAsEmptyString: true
      }
    }
  });
  define({
    tag: "input",
    name: "HTMLInputElement",
    ctor: function HTMLInputElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: {
      form: formAssociatedProps.form,
      _post_click_activation_steps: {
        value: function(e) {
          if (this.type === "checkbox") {
            this.checked = !this.checked;
          } else if (this.type === "radio") {
            var group = this.form.getElementsByName(this.name);
            for (var i = group.length - 1; i >= 0; i--) {
              var el = group[i];
              el.checked = el === this;
            }
          }
        }
      }
    },
    attributes: {
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      accept: String,
      alt: String,
      max: String,
      min: String,
      pattern: String,
      placeholder: String,
      step: String,
      dirName: String,
      defaultValue: {
        name: "value"
      },
      multiple: Boolean,
      required: Boolean,
      readOnly: Boolean,
      checked: Boolean,
      value: String,
      src: URL2,
      defaultChecked: {
        name: "checked",
        type: Boolean
      },
      size: {
        type: "unsigned long",
        default: 20,
        min: 1,
        setmin: 1
      },
      width: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: 0
      },
      height: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: 0
      },
      minLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      maxLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      autocomplete: String,
      // It's complicated
      type: {
        type: ["text", "hidden", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"],
        missing: "text"
      },
      formTarget: String,
      formNoValidate: Boolean,
      formMethod: {
        type: ["get", "post"],
        invalid: "get",
        missing: ""
      },
      formEnctype: {
        type: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        invalid: "application/x-www-form-urlencoded",
        missing: ""
      },
      inputMode: {
        type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
        missing: ""
      },
      // Obsolete
      align: String,
      useMap: String
    }
  });
  define({
    tag: "keygen",
    name: "HTMLKeygenElement",
    ctor: function HTMLKeygenElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps,
    attributes: {
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      challenge: String,
      keytype: {
        type: ["rsa"],
        missing: ""
      }
    }
  });
  define({
    tag: "li",
    name: "HTMLLIElement",
    ctor: function HTMLLIElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      value: {
        type: "long",
        default: 0
      },
      // Obsolete
      type: String
    }
  });
  define({
    tag: "label",
    name: "HTMLLabelElement",
    ctor: function HTMLLabelElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps,
    attributes: {
      htmlFor: {
        name: "for",
        type: String
      }
    }
  });
  define({
    tag: "legend",
    name: "HTMLLegendElement",
    ctor: function HTMLLegendElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      align: String
    }
  });
  define({
    tag: "link",
    name: "HTMLLinkElement",
    ctor: function HTMLLinkElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // XXX Reflect DOMSettableTokenList sizes also DOMTokenList relList
      href: URL2,
      rel: String,
      media: String,
      hreflang: String,
      type: String,
      crossOrigin: CORS,
      nonce: String,
      integrity: String,
      referrerPolicy: REFERRER,
      imageSizes: String,
      imageSrcset: String,
      // Obsolete
      charset: String,
      rev: String,
      target: String
    }
  });
  define({
    tag: "map",
    name: "HTMLMapElement",
    ctor: function HTMLMapElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      name: String
    }
  });
  define({
    tag: "menu",
    name: "HTMLMenuElement",
    ctor: function HTMLMenuElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // XXX: not quite right, default should be popup if parent element is
      // popup.
      type: {
        type: ["context", "popup", "toolbar"],
        missing: "toolbar"
      },
      label: String,
      // Obsolete
      compact: Boolean
    }
  });
  define({
    tag: "meta",
    name: "HTMLMetaElement",
    ctor: function HTMLMetaElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      name: String,
      content: String,
      httpEquiv: {
        name: "http-equiv",
        type: String
      },
      // Obsolete
      scheme: String
    }
  });
  define({
    tag: "meter",
    name: "HTMLMeterElement",
    ctor: function HTMLMeterElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps
  });
  define({
    tags: ["ins", "del"],
    name: "HTMLModElement",
    ctor: function HTMLModElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      cite: URL2,
      dateTime: String
    }
  });
  define({
    tag: "ol",
    name: "HTMLOListElement",
    ctor: function HTMLOListElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      // Utility function (see the start attribute default value). Returns
      // the number of <li> children of this element
      _numitems: {
        get: function() {
          var items = 0;
          this.childNodes.forEach(function(n) {
            if (n.nodeType === Node2.ELEMENT_NODE && n.tagName === "LI") items++;
          });
          return items;
        }
      }
    },
    attributes: {
      type: String,
      reversed: Boolean,
      start: {
        type: "long",
        default: function() {
          if (this.reversed) return this._numitems;
          else return 1;
        }
      },
      // Obsolete
      compact: Boolean
    }
  });
  define({
    tag: "object",
    name: "HTMLObjectElement",
    ctor: function HTMLObjectElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps,
    attributes: {
      data: URL2,
      type: String,
      name: String,
      useMap: String,
      typeMustMatch: Boolean,
      width: String,
      height: String,
      // Obsolete
      align: String,
      archive: String,
      code: String,
      declare: Boolean,
      hspace: {
        type: "unsigned long",
        default: 0
      },
      standby: String,
      vspace: {
        type: "unsigned long",
        default: 0
      },
      codeBase: URL2,
      codeType: String,
      border: {
        type: String,
        treatNullAsEmptyString: true
      }
    }
  });
  define({
    tag: "optgroup",
    name: "HTMLOptGroupElement",
    ctor: function HTMLOptGroupElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      disabled: Boolean,
      label: String
    }
  });
  define({
    tag: "option",
    name: "HTMLOptionElement",
    ctor: function HTMLOptionElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      form: {
        get: function() {
          var p = this.parentNode;
          while (p && p.nodeType === Node2.ELEMENT_NODE) {
            if (p.localName === "select") return p.form;
            p = p.parentNode;
          }
        }
      },
      value: {
        get: function() {
          return this._getattr("value") || this.text;
        },
        set: function(v) {
          this._setattr("value", v);
        }
      },
      text: {
        get: function() {
          return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim();
        },
        set: function(v) {
          this.textContent = v;
        }
      }
      // missing: index
    },
    attributes: {
      disabled: Boolean,
      defaultSelected: {
        name: "selected",
        type: Boolean
      },
      label: String
    }
  });
  define({
    tag: "output",
    name: "HTMLOutputElement",
    ctor: function HTMLOutputElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps,
    attributes: {
      // XXX Reflect for/htmlFor as a settable token list
      name: String
    }
  });
  define({
    tag: "p",
    name: "HTMLParagraphElement",
    ctor: function HTMLParagraphElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      align: String
    }
  });
  define({
    tag: "param",
    name: "HTMLParamElement",
    ctor: function HTMLParamElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      name: String,
      value: String,
      // Obsolete
      type: String,
      valueType: String
    }
  });
  define({
    tags: [
      "pre",
      /*legacy elements:*/
      "listing",
      "xmp"
    ],
    name: "HTMLPreElement",
    ctor: function HTMLPreElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      width: {
        type: "long",
        default: 0
      }
    }
  });
  define({
    tag: "progress",
    name: "HTMLProgressElement",
    ctor: function HTMLProgressElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: formAssociatedProps,
    attributes: {
      max: {
        type: Number,
        float: true,
        default: 1,
        min: 0
      }
    }
  });
  define({
    tags: ["q", "blockquote"],
    name: "HTMLQuoteElement",
    ctor: function HTMLQuoteElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      cite: URL2
    }
  });
  define({
    tag: "script",
    name: "HTMLScriptElement",
    ctor: function HTMLScriptElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      text: {
        get: function() {
          var s = "";
          for (var i = 0, n = this.childNodes.length; i < n; i++) {
            var child = this.childNodes[i];
            if (child.nodeType === Node2.TEXT_NODE) s += child._data;
          }
          return s;
        },
        set: function(value) {
          this.removeChildren();
          if (value !== null && value !== "") {
            this.appendChild(this.ownerDocument.createTextNode(value));
          }
        }
      }
    },
    attributes: {
      src: URL2,
      type: String,
      charset: String,
      referrerPolicy: REFERRER,
      defer: Boolean,
      async: Boolean,
      nomodule: Boolean,
      crossOrigin: CORS,
      nonce: String,
      integrity: String
    }
  });
  define({
    tag: "select",
    name: "HTMLSelectElement",
    ctor: function HTMLSelectElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: {
      form: formAssociatedProps.form,
      options: {
        get: function() {
          return this.getElementsByTagName("option");
        }
      }
    },
    attributes: {
      autocomplete: String,
      // It's complicated
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      multiple: Boolean,
      required: Boolean,
      size: {
        type: "unsigned long",
        default: 0
      }
    }
  });
  define({
    tag: "span",
    name: "HTMLSpanElement",
    ctor: function HTMLSpanElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    }
  });
  define({
    tag: "style",
    name: "HTMLStyleElement",
    ctor: function HTMLStyleElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      media: String,
      type: String,
      scoped: Boolean
    }
  });
  define({
    tag: "caption",
    name: "HTMLTableCaptionElement",
    ctor: function HTMLTableCaptionElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      // Obsolete
      align: String
    }
  });
  define({
    name: "HTMLTableCellElement",
    ctor: function HTMLTableCellElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      colSpan: {
        type: "unsigned long",
        default: 1
      },
      rowSpan: {
        type: "unsigned long",
        default: 1
      },
      //XXX Also reflect settable token list headers
      scope: {
        type: ["row", "col", "rowgroup", "colgroup"],
        missing: ""
      },
      abbr: String,
      // Obsolete
      align: String,
      axis: String,
      height: String,
      width: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      noWrap: Boolean,
      vAlign: String,
      bgColor: {
        type: String,
        treatNullAsEmptyString: true
      }
    }
  });
  define({
    tags: ["col", "colgroup"],
    name: "HTMLTableColElement",
    ctor: function HTMLTableColElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      span: {
        type: "limited unsigned long with fallback",
        default: 1,
        min: 1
      },
      // Obsolete
      align: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      vAlign: String,
      width: String
    }
  });
  define({
    tag: "table",
    name: "HTMLTableElement",
    ctor: function HTMLTableElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      rows: {
        get: function() {
          return this.getElementsByTagName("tr");
        }
      }
    },
    attributes: {
      // Obsolete
      align: String,
      border: String,
      frame: String,
      rules: String,
      summary: String,
      width: String,
      bgColor: {
        type: String,
        treatNullAsEmptyString: true
      },
      cellPadding: {
        type: String,
        treatNullAsEmptyString: true
      },
      cellSpacing: {
        type: String,
        treatNullAsEmptyString: true
      }
    }
  });
  define({
    tag: "template",
    name: "HTMLTemplateElement",
    ctor: function HTMLTemplateElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
      this._contentFragment = doc._templateDoc.createDocumentFragment();
    },
    props: {
      content: {
        get: function() {
          return this._contentFragment;
        }
      },
      serialize: {
        value: function() {
          return this.content.serialize();
        }
      }
    }
  });
  define({
    tag: "tr",
    name: "HTMLTableRowElement",
    ctor: function HTMLTableRowElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      cells: {
        get: function() {
          return this.querySelectorAll("td,th");
        }
      }
    },
    attributes: {
      // Obsolete
      align: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      vAlign: String,
      bgColor: {
        type: String,
        treatNullAsEmptyString: true
      }
    }
  });
  define({
    tags: ["thead", "tfoot", "tbody"],
    name: "HTMLTableSectionElement",
    ctor: function HTMLTableSectionElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      rows: {
        get: function() {
          return this.getElementsByTagName("tr");
        }
      }
    },
    attributes: {
      // Obsolete
      align: String,
      ch: {
        name: "char",
        type: String
      },
      chOff: {
        name: "charoff",
        type: String
      },
      vAlign: String
    }
  });
  define({
    tag: "textarea",
    name: "HTMLTextAreaElement",
    ctor: function HTMLTextAreaElement(doc, localName, prefix) {
      HTMLFormElement.call(this, doc, localName, prefix);
    },
    props: {
      form: formAssociatedProps.form,
      type: {
        get: function() {
          return "textarea";
        }
      },
      defaultValue: {
        get: function() {
          return this.textContent;
        },
        set: function(v) {
          this.textContent = v;
        }
      },
      value: {
        get: function() {
          return this.defaultValue;
        },
        set: function(v) {
          this.defaultValue = v;
        }
      },
      textLength: {
        get: function() {
          return this.value.length;
        }
      }
    },
    attributes: {
      autocomplete: String,
      // It's complicated
      name: String,
      disabled: Boolean,
      autofocus: Boolean,
      placeholder: String,
      wrap: String,
      dirName: String,
      required: Boolean,
      readOnly: Boolean,
      rows: {
        type: "limited unsigned long with fallback",
        default: 2
      },
      cols: {
        type: "limited unsigned long with fallback",
        default: 20
      },
      maxLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      minLength: {
        type: "unsigned long",
        min: 0,
        setmin: 0,
        default: -1
      },
      inputMode: {
        type: ["verbatim", "latin", "latin-name", "latin-prose", "full-width-latin", "kana", "kana-name", "katakana", "numeric", "tel", "email", "url"],
        missing: ""
      }
    }
  });
  define({
    tag: "time",
    name: "HTMLTimeElement",
    ctor: function HTMLTimeElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      dateTime: String,
      pubDate: Boolean
    }
  });
  define({
    tag: "title",
    name: "HTMLTitleElement",
    ctor: function HTMLTitleElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      text: {
        get: function() {
          return this.textContent;
        }
      }
    }
  });
  define({
    tag: "ul",
    name: "HTMLUListElement",
    ctor: function HTMLUListElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      type: String,
      // Obsolete
      compact: Boolean
    }
  });
  define({
    name: "HTMLMediaElement",
    ctor: function HTMLMediaElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      src: URL2,
      crossOrigin: CORS,
      preload: {
        type: ["metadata", "none", "auto", {
          value: "",
          alias: "auto"
        }],
        missing: "auto"
      },
      loop: Boolean,
      autoplay: Boolean,
      mediaGroup: String,
      controls: Boolean,
      defaultMuted: {
        name: "muted",
        type: Boolean
      }
    }
  });
  define({
    name: "HTMLAudioElement",
    tag: "audio",
    superclass: htmlElements.HTMLMediaElement,
    ctor: function HTMLAudioElement(doc, localName, prefix) {
      htmlElements.HTMLMediaElement.call(this, doc, localName, prefix);
    }
  });
  define({
    name: "HTMLVideoElement",
    tag: "video",
    superclass: htmlElements.HTMLMediaElement,
    ctor: function HTMLVideoElement(doc, localName, prefix) {
      htmlElements.HTMLMediaElement.call(this, doc, localName, prefix);
    },
    attributes: {
      poster: URL2,
      width: {
        type: "unsigned long",
        min: 0,
        default: 0
      },
      height: {
        type: "unsigned long",
        min: 0,
        default: 0
      }
    }
  });
  define({
    tag: "td",
    name: "HTMLTableDataCellElement",
    superclass: htmlElements.HTMLTableCellElement,
    ctor: function HTMLTableDataCellElement(doc, localName, prefix) {
      htmlElements.HTMLTableCellElement.call(this, doc, localName, prefix);
    }
  });
  define({
    tag: "th",
    name: "HTMLTableHeaderCellElement",
    superclass: htmlElements.HTMLTableCellElement,
    ctor: function HTMLTableHeaderCellElement(doc, localName, prefix) {
      htmlElements.HTMLTableCellElement.call(this, doc, localName, prefix);
    }
  });
  define({
    tag: "frameset",
    name: "HTMLFrameSetElement",
    ctor: function HTMLFrameSetElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    }
  });
  define({
    tag: "frame",
    name: "HTMLFrameElement",
    ctor: function HTMLFrameElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    }
  });
  define({
    tag: "canvas",
    name: "HTMLCanvasElement",
    ctor: function HTMLCanvasElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      getContext: {
        value: utils2.nyi
      },
      probablySupportsContext: {
        value: utils2.nyi
      },
      setContext: {
        value: utils2.nyi
      },
      transferControlToProxy: {
        value: utils2.nyi
      },
      toDataURL: {
        value: utils2.nyi
      },
      toBlob: {
        value: utils2.nyi
      }
    },
    attributes: {
      width: {
        type: "unsigned long",
        default: 300
      },
      height: {
        type: "unsigned long",
        default: 150
      }
    }
  });
  define({
    tag: "dialog",
    name: "HTMLDialogElement",
    ctor: function HTMLDialogElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      show: {
        value: utils2.nyi
      },
      showModal: {
        value: utils2.nyi
      },
      close: {
        value: utils2.nyi
      }
    },
    attributes: {
      open: Boolean,
      returnValue: String
    }
  });
  define({
    tag: "menuitem",
    name: "HTMLMenuItemElement",
    ctor: function HTMLMenuItemElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    props: {
      // The menuitem's label
      _label: {
        get: function() {
          var val = this._getattr("label");
          if (val !== null && val !== "") {
            return val;
          }
          val = this.textContent;
          return val.replace(/[ \t\n\f\r]+/g, " ").trim();
        }
      },
      // The menuitem label IDL attribute
      label: {
        get: function() {
          var val = this._getattr("label");
          if (val !== null) {
            return val;
          }
          return this._label;
        },
        set: function(v) {
          this._setattr("label", v);
        }
      }
    },
    attributes: {
      type: {
        type: ["command", "checkbox", "radio"],
        missing: "command"
      },
      icon: URL2,
      disabled: Boolean,
      checked: Boolean,
      radiogroup: String,
      default: Boolean
    }
  });
  define({
    tag: "source",
    name: "HTMLSourceElement",
    ctor: function HTMLSourceElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      srcset: String,
      sizes: String,
      media: String,
      src: URL2,
      type: String,
      width: String,
      height: String
    }
  });
  define({
    tag: "track",
    name: "HTMLTrackElement",
    ctor: function HTMLTrackElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      src: URL2,
      srclang: String,
      label: String,
      default: Boolean,
      kind: {
        type: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
        missing: "subtitles",
        invalid: "metadata"
      }
    },
    props: {
      NONE: {
        get: function() {
          return 0;
        }
      },
      LOADING: {
        get: function() {
          return 1;
        }
      },
      LOADED: {
        get: function() {
          return 2;
        }
      },
      ERROR: {
        get: function() {
          return 3;
        }
      },
      readyState: {
        get: utils2.nyi
      },
      track: {
        get: utils2.nyi
      }
    }
  });
  define({
    // obsolete
    tag: "font",
    name: "HTMLFontElement",
    ctor: function HTMLFontElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      color: {
        type: String,
        treatNullAsEmptyString: true
      },
      face: {
        type: String
      },
      size: {
        type: String
      }
    }
  });
  define({
    // obsolete
    tag: "dir",
    name: "HTMLDirectoryElement",
    ctor: function HTMLDirectoryElement(doc, localName, prefix) {
      HTMLElement.call(this, doc, localName, prefix);
    },
    attributes: {
      compact: Boolean
    }
  });
  define({
    tags: [
      "abbr",
      "address",
      "article",
      "aside",
      "b",
      "bdi",
      "bdo",
      "cite",
      "content",
      "code",
      "dd",
      "dfn",
      "dt",
      "em",
      "figcaption",
      "figure",
      "footer",
      "header",
      "hgroup",
      "i",
      "kbd",
      "main",
      "mark",
      "nav",
      "noscript",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "section",
      "small",
      "strong",
      "sub",
      "summary",
      "sup",
      "u",
      "var",
      "wbr",
      // Legacy elements
      "acronym",
      "basefont",
      "big",
      "center",
      "nobr",
      "noembed",
      "noframes",
      "plaintext",
      "strike",
      "tt"
    ]
  });
  return htmlelts;
}
var svg = {};
var hasRequiredSvg;
function requireSvg() {
  if (hasRequiredSvg) return svg;
  hasRequiredSvg = 1;
  (function(exports) {
    var Element2 = requireElement();
    var defineElement2 = requireDefineElement();
    var utils2 = requireUtils();
    var CSSStyleDeclaration = requireCSSStyleDeclaration();
    var svgElements = exports.elements = {};
    var svgNameToImpl = /* @__PURE__ */ Object.create(null);
    exports.createElement = function(doc, localName, prefix) {
      var impl2 = svgNameToImpl[localName] || SVGElement;
      return new impl2(doc, localName, prefix);
    };
    function define(spec) {
      return defineElement2(spec, SVGElement, svgElements, svgNameToImpl);
    }
    var SVGElement = define({
      superclass: Element2,
      name: "SVGElement",
      ctor: function SVGElement2(doc, localName, prefix) {
        Element2.call(this, doc, localName, utils2.NAMESPACE.SVG, prefix);
      },
      props: {
        style: {
          get: function() {
            if (!this._style) this._style = new CSSStyleDeclaration(this);
            return this._style;
          }
        }
      }
    });
    define({
      name: "SVGSVGElement",
      ctor: function SVGSVGElement(doc, localName, prefix) {
        SVGElement.call(this, doc, localName, prefix);
      },
      tag: "svg",
      props: {
        createSVGRect: {
          value: function() {
            return exports.createElement(this.ownerDocument, "rect", null);
          }
        }
      }
    });
    define({
      tags: ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"]
    });
  })(svg);
  return svg;
}
var MutationConstants;
var hasRequiredMutationConstants;
function requireMutationConstants() {
  if (hasRequiredMutationConstants) return MutationConstants;
  hasRequiredMutationConstants = 1;
  MutationConstants = {
    VALUE: 1,
    // The value of a Text, Comment or PI node changed
    ATTR: 2,
    // A new attribute was added or an attribute value and/or prefix changed
    REMOVE_ATTR: 3,
    // An attribute was removed
    REMOVE: 4,
    // A node was removed
    MOVE: 5,
    // A node was moved
    INSERT: 6
    // A node (or a subtree of nodes) was inserted
  };
  return MutationConstants;
}
var Document_1;
var hasRequiredDocument;
function requireDocument() {
  if (hasRequiredDocument) return Document_1;
  hasRequiredDocument = 1;
  Document_1 = Document2;
  var Node2 = requireNode();
  var NodeList = requireNodeList();
  var ContainerNode = requireContainerNode();
  var Element2 = requireElement();
  var Text2 = requireText();
  var Comment2 = requireComment();
  var Event = requireEvent();
  var DocumentFragment = requireDocumentFragment();
  var ProcessingInstruction2 = requireProcessingInstruction();
  var DOMImplementation = requireDOMImplementation();
  var TreeWalker = requireTreeWalker();
  var NodeIterator = requireNodeIterator();
  var NodeFilter = requireNodeFilter();
  var URL2 = requireURL();
  var select2 = requireSelect();
  var events2 = requireEvents();
  var xml = requireXmlnames();
  var html = requireHtmlelts();
  var svg2 = requireSvg();
  var utils2 = requireUtils();
  var MUTATE = requireMutationConstants();
  var NAMESPACE = utils2.NAMESPACE;
  var isApiWritable = requireConfig().isApiWritable;
  function Document2(isHTML, address) {
    ContainerNode.call(this);
    this.nodeType = Node2.DOCUMENT_NODE;
    this.isHTML = isHTML;
    this._address = address || "about:blank";
    this.readyState = "loading";
    this.implementation = new DOMImplementation(this);
    this.ownerDocument = null;
    this._contentType = isHTML ? "text/html" : "application/xml";
    this.doctype = null;
    this.documentElement = null;
    this._templateDocCache = null;
    this._nodeIterators = null;
    this._nid = 1;
    this._nextnid = 2;
    this._nodes = [null, this];
    this.byId = /* @__PURE__ */ Object.create(null);
    this.modclock = 0;
  }
  var supportedEvents = {
    event: "Event",
    customevent: "CustomEvent",
    uievent: "UIEvent",
    mouseevent: "MouseEvent"
  };
  var replacementEvent = {
    events: "event",
    htmlevents: "event",
    mouseevents: "mouseevent",
    mutationevents: "mutationevent",
    uievents: "uievent"
  };
  var mirrorAttr = function(f, name, defaultValue) {
    return {
      get: function() {
        var o = f.call(this);
        if (o) {
          return o[name];
        }
        return defaultValue;
      },
      set: function(value) {
        var o = f.call(this);
        if (o) {
          o[name] = value;
        }
      }
    };
  };
  function validateAndExtract(namespace, qualifiedName) {
    var prefix, localName, pos;
    if (namespace === "") {
      namespace = null;
    }
    if (!xml.isValidQName(qualifiedName)) {
      utils2.InvalidCharacterError();
    }
    prefix = null;
    localName = qualifiedName;
    pos = qualifiedName.indexOf(":");
    if (pos >= 0) {
      prefix = qualifiedName.substring(0, pos);
      localName = qualifiedName.substring(pos + 1);
    }
    if (prefix !== null && namespace === null) {
      utils2.NamespaceError();
    }
    if (prefix === "xml" && namespace !== NAMESPACE.XML) {
      utils2.NamespaceError();
    }
    if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== NAMESPACE.XMLNS) {
      utils2.NamespaceError();
    }
    if (namespace === NAMESPACE.XMLNS && !(prefix === "xmlns" || qualifiedName === "xmlns")) {
      utils2.NamespaceError();
    }
    return {
      namespace,
      prefix,
      localName
    };
  }
  Document2.prototype = Object.create(ContainerNode.prototype, {
    // This method allows dom.js to communicate with a renderer
    // that displays the document in some way
    // XXX: I should probably move this to the window object
    _setMutationHandler: {
      value: function(handler) {
        this.mutationHandler = handler;
      }
    },
    // This method allows dom.js to receive event notifications
    // from the renderer.
    // XXX: I should probably move this to the window object
    _dispatchRendererEvent: {
      value: function(targetNid, type, details) {
        var target = this._nodes[targetNid];
        if (!target) return;
        target._dispatchEvent(new Event(type, details), true);
      }
    },
    nodeName: {
      value: "#document"
    },
    nodeValue: {
      get: function() {
        return null;
      },
      set: function() {
      }
    },
    // XXX: DOMCore may remove documentURI, so it is NYI for now
    documentURI: {
      get: function() {
        return this._address;
      },
      set: utils2.nyi
    },
    compatMode: {
      get: function() {
        return this._quirks ? "BackCompat" : "CSS1Compat";
      }
    },
    createTextNode: {
      value: function(data) {
        return new Text2(this, String(data));
      }
    },
    createComment: {
      value: function(data) {
        return new Comment2(this, data);
      }
    },
    createDocumentFragment: {
      value: function() {
        return new DocumentFragment(this);
      }
    },
    createProcessingInstruction: {
      value: function(target, data) {
        if (!xml.isValidName(target) || data.indexOf("?>") !== -1) utils2.InvalidCharacterError();
        return new ProcessingInstruction2(this, target, data);
      }
    },
    createAttribute: {
      value: function(localName) {
        localName = String(localName);
        if (!xml.isValidName(localName)) utils2.InvalidCharacterError();
        if (this.isHTML) {
          localName = utils2.toASCIILowerCase(localName);
        }
        return new Element2._Attr(null, localName, null, null, "");
      }
    },
    createAttributeNS: {
      value: function(namespace, qualifiedName) {
        namespace = namespace === null || namespace === void 0 || namespace === "" ? null : String(namespace);
        qualifiedName = String(qualifiedName);
        var ve = validateAndExtract(namespace, qualifiedName);
        return new Element2._Attr(null, ve.localName, ve.prefix, ve.namespace, "");
      }
    },
    createElement: {
      value: function(localName) {
        localName = String(localName);
        if (!xml.isValidName(localName)) utils2.InvalidCharacterError();
        if (this.isHTML) {
          if (/[A-Z]/.test(localName)) localName = utils2.toASCIILowerCase(localName);
          return html.createElement(this, localName, null);
        } else if (this.contentType === "application/xhtml+xml") {
          return html.createElement(this, localName, null);
        } else {
          return new Element2(this, localName, null, null);
        }
      },
      writable: isApiWritable
    },
    createElementNS: {
      value: function(namespace, qualifiedName) {
        namespace = namespace === null || namespace === void 0 || namespace === "" ? null : String(namespace);
        qualifiedName = String(qualifiedName);
        var ve = validateAndExtract(namespace, qualifiedName);
        return this._createElementNS(ve.localName, ve.namespace, ve.prefix);
      },
      writable: isApiWritable
    },
    // This is used directly by HTML parser, which allows it to create
    // elements with localNames containing ':' and non-default namespaces
    _createElementNS: {
      value: function(localName, namespace, prefix) {
        if (namespace === NAMESPACE.HTML) {
          return html.createElement(this, localName, prefix);
        } else if (namespace === NAMESPACE.SVG) {
          return svg2.createElement(this, localName, prefix);
        }
        return new Element2(this, localName, namespace, prefix);
      }
    },
    createEvent: {
      value: function createEvent(interfaceName) {
        interfaceName = interfaceName.toLowerCase();
        var name = replacementEvent[interfaceName] || interfaceName;
        var constructor = events2[supportedEvents[name]];
        if (constructor) {
          var e = new constructor();
          e._initialized = false;
          return e;
        } else {
          utils2.NotSupportedError();
        }
      }
    },
    // See: http://www.w3.org/TR/dom/#dom-document-createtreewalker
    createTreeWalker: {
      value: function(root3, whatToShow, filter2) {
        if (!root3) {
          throw new TypeError("root argument is required");
        }
        if (!(root3 instanceof Node2)) {
          throw new TypeError("root not a node");
        }
        whatToShow = whatToShow === void 0 ? NodeFilter.SHOW_ALL : +whatToShow;
        filter2 = filter2 === void 0 ? null : filter2;
        return new TreeWalker(root3, whatToShow, filter2);
      }
    },
    // See: http://www.w3.org/TR/dom/#dom-document-createnodeiterator
    createNodeIterator: {
      value: function(root3, whatToShow, filter2) {
        if (!root3) {
          throw new TypeError("root argument is required");
        }
        if (!(root3 instanceof Node2)) {
          throw new TypeError("root not a node");
        }
        whatToShow = whatToShow === void 0 ? NodeFilter.SHOW_ALL : +whatToShow;
        filter2 = filter2 === void 0 ? null : filter2;
        return new NodeIterator(root3, whatToShow, filter2);
      }
    },
    _attachNodeIterator: {
      value: function(ni) {
        if (!this._nodeIterators) {
          this._nodeIterators = [];
        }
        this._nodeIterators.push(ni);
      }
    },
    _detachNodeIterator: {
      value: function(ni) {
        var idx = this._nodeIterators.indexOf(ni);
        this._nodeIterators.splice(idx, 1);
      }
    },
    _preremoveNodeIterators: {
      value: function(toBeRemoved) {
        if (this._nodeIterators) {
          this._nodeIterators.forEach(function(ni) {
            ni._preremove(toBeRemoved);
          });
        }
      }
    },
    // Maintain the documentElement and
    // doctype properties of the document.  Each of the following
    // methods chains to the Node implementation of the method
    // to do the actual inserting, removal or replacement.
    _updateDocTypeElement: {
      value: function _updateDocTypeElement() {
        this.doctype = this.documentElement = null;
        for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
          if (kid.nodeType === Node2.DOCUMENT_TYPE_NODE) this.doctype = kid;
          else if (kid.nodeType === Node2.ELEMENT_NODE) this.documentElement = kid;
        }
      }
    },
    insertBefore: {
      value: function insertBefore(child, refChild) {
        Node2.prototype.insertBefore.call(this, child, refChild);
        this._updateDocTypeElement();
        return child;
      }
    },
    replaceChild: {
      value: function replaceChild(node2, child) {
        Node2.prototype.replaceChild.call(this, node2, child);
        this._updateDocTypeElement();
        return child;
      }
    },
    removeChild: {
      value: function removeChild(child) {
        Node2.prototype.removeChild.call(this, child);
        this._updateDocTypeElement();
        return child;
      }
    },
    getElementById: {
      value: function(id) {
        var n = this.byId[id];
        if (!n) return null;
        if (n instanceof MultiId) {
          return n.getFirst();
        }
        return n;
      }
    },
    _hasMultipleElementsWithId: {
      value: function(id) {
        return this.byId[id] instanceof MultiId;
      }
    },
    // Just copy this method from the Element prototype
    getElementsByName: {
      value: Element2.prototype.getElementsByName
    },
    getElementsByTagName: {
      value: Element2.prototype.getElementsByTagName
    },
    getElementsByTagNameNS: {
      value: Element2.prototype.getElementsByTagNameNS
    },
    getElementsByClassName: {
      value: Element2.prototype.getElementsByClassName
    },
    adoptNode: {
      value: function adoptNode(node2) {
        if (node2.nodeType === Node2.DOCUMENT_NODE) utils2.NotSupportedError();
        if (node2.nodeType === Node2.ATTRIBUTE_NODE) {
          return node2;
        }
        if (node2.parentNode) node2.parentNode.removeChild(node2);
        if (node2.ownerDocument !== this) recursivelySetOwner(node2, this);
        return node2;
      }
    },
    importNode: {
      value: function importNode(node2, deep) {
        return this.adoptNode(node2.cloneNode(deep));
      },
      writable: isApiWritable
    },
    // The following attributes and methods are from the HTML spec
    origin: {
      get: function origin() {
        return null;
      }
    },
    characterSet: {
      get: function characterSet() {
        return "UTF-8";
      }
    },
    contentType: {
      get: function contentType() {
        return this._contentType;
      }
    },
    URL: {
      get: function URL3() {
        return this._address;
      }
    },
    domain: {
      get: utils2.nyi,
      set: utils2.nyi
    },
    referrer: {
      get: utils2.nyi
    },
    cookie: {
      get: utils2.nyi,
      set: utils2.nyi
    },
    lastModified: {
      get: utils2.nyi
    },
    location: {
      get: function() {
        return this.defaultView ? this.defaultView.location : null;
      },
      set: utils2.nyi
    },
    _titleElement: {
      get: function() {
        return this.getElementsByTagName("title").item(0) || null;
      }
    },
    title: {
      get: function() {
        var elt = this._titleElement;
        var value = elt ? elt.textContent : "";
        return value.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "");
      },
      set: function(value) {
        var elt = this._titleElement;
        var head = this.head;
        if (!elt && !head) {
          return;
        }
        if (!elt) {
          elt = this.createElement("title");
          head.appendChild(elt);
        }
        elt.textContent = value;
      }
    },
    dir: mirrorAttr(function() {
      var htmlElement = this.documentElement;
      if (htmlElement && htmlElement.tagName === "HTML") {
        return htmlElement;
      }
    }, "dir", ""),
    fgColor: mirrorAttr(function() {
      return this.body;
    }, "text", ""),
    linkColor: mirrorAttr(function() {
      return this.body;
    }, "link", ""),
    vlinkColor: mirrorAttr(function() {
      return this.body;
    }, "vLink", ""),
    alinkColor: mirrorAttr(function() {
      return this.body;
    }, "aLink", ""),
    bgColor: mirrorAttr(function() {
      return this.body;
    }, "bgColor", ""),
    // Historical aliases of Document#characterSet
    charset: {
      get: function() {
        return this.characterSet;
      }
    },
    inputEncoding: {
      get: function() {
        return this.characterSet;
      }
    },
    scrollingElement: {
      get: function() {
        return this._quirks ? this.body : this.documentElement;
      }
    },
    // Return the first <body> child of the document element.
    // XXX For now, setting this attribute is not implemented.
    body: {
      get: function() {
        return namedHTMLChild(this.documentElement, "body");
      },
      set: utils2.nyi
    },
    // Return the first <head> child of the document element.
    head: {
      get: function() {
        return namedHTMLChild(this.documentElement, "head");
      }
    },
    images: {
      get: utils2.nyi
    },
    embeds: {
      get: utils2.nyi
    },
    plugins: {
      get: utils2.nyi
    },
    links: {
      get: utils2.nyi
    },
    forms: {
      get: utils2.nyi
    },
    scripts: {
      get: utils2.nyi
    },
    applets: {
      get: function() {
        return [];
      }
    },
    activeElement: {
      get: function() {
        return null;
      }
    },
    innerHTML: {
      get: function() {
        return this.serialize();
      },
      set: utils2.nyi
    },
    outerHTML: {
      get: function() {
        return this.serialize();
      },
      set: utils2.nyi
    },
    write: {
      value: function(args) {
        if (!this.isHTML) utils2.InvalidStateError();
        if (!this._parser) return;
        var s = arguments.join("");
        this._parser.parse(s);
      }
    },
    writeln: {
      value: function writeln(args) {
        this.write(Array.prototype.join.call(arguments, "") + "\n");
      }
    },
    open: {
      value: function() {
        this.documentElement = null;
      }
    },
    close: {
      value: function() {
        this.readyState = "interactive";
        this._dispatchEvent(new Event("readystatechange"), true);
        this._dispatchEvent(new Event("DOMContentLoaded"), true);
        this.readyState = "complete";
        this._dispatchEvent(new Event("readystatechange"), true);
        if (this.defaultView) {
          this.defaultView._dispatchEvent(new Event("load"), true);
        }
      }
    },
    // Utility methods
    clone: {
      value: function clone() {
        var d = new Document2(this.isHTML, this._address);
        d._quirks = this._quirks;
        d._contentType = this._contentType;
        return d;
      }
    },
    // We need to adopt the nodes if we do a deep clone
    cloneNode: {
      value: function cloneNode2(deep) {
        var clone = Node2.prototype.cloneNode.call(this, false);
        if (deep) {
          for (var kid = this.firstChild; kid !== null; kid = kid.nextSibling) {
            clone._appendChild(clone.importNode(kid, true));
          }
        }
        clone._updateDocTypeElement();
        return clone;
      }
    },
    isEqual: {
      value: function isEqual(n) {
        return true;
      }
    },
    // Implementation-specific function.  Called when a text, comment,
    // or pi value changes.
    mutateValue: {
      value: function(node2) {
        if (this.mutationHandler) {
          this.mutationHandler({
            type: MUTATE.VALUE,
            target: node2,
            data: node2.data
          });
        }
      }
    },
    // Invoked when an attribute's value changes. Attr holds the new
    // value.  oldval is the old value.  Attribute mutations can also
    // involve changes to the prefix (and therefore the qualified name)
    mutateAttr: {
      value: function(attr, oldval) {
        if (this.mutationHandler) {
          this.mutationHandler({
            type: MUTATE.ATTR,
            target: attr.ownerElement,
            attr
          });
        }
      }
    },
    // Used by removeAttribute and removeAttributeNS for attributes.
    mutateRemoveAttr: {
      value: function(attr) {
        if (this.mutationHandler) {
          this.mutationHandler({
            type: MUTATE.REMOVE_ATTR,
            target: attr.ownerElement,
            attr
          });
        }
      }
    },
    // Called by Node.removeChild, etc. to remove a rooted element from
    // the tree. Only needs to generate a single mutation event when a
    // node is removed, but must recursively mark all descendants as not
    // rooted.
    mutateRemove: {
      value: function(node2) {
        if (this.mutationHandler) {
          this.mutationHandler({
            type: MUTATE.REMOVE,
            target: node2.parentNode,
            node: node2
          });
        }
        recursivelyUproot(node2);
      }
    },
    // Called when a new element becomes rooted.  It must recursively
    // generate mutation events for each of the children, and mark them all
    // as rooted.
    mutateInsert: {
      value: function(node2) {
        recursivelyRoot(node2);
        if (this.mutationHandler) {
          this.mutationHandler({
            type: MUTATE.INSERT,
            target: node2.parentNode,
            node: node2
          });
        }
      }
    },
    // Called when a rooted element is moved within the document
    mutateMove: {
      value: function(node2) {
        if (this.mutationHandler) {
          this.mutationHandler({
            type: MUTATE.MOVE,
            target: node2
          });
        }
      }
    },
    // Add a mapping from  id to n for n.ownerDocument
    addId: {
      value: function addId(id, n) {
        var val = this.byId[id];
        if (!val) {
          this.byId[id] = n;
        } else {
          if (!(val instanceof MultiId)) {
            val = new MultiId(val);
            this.byId[id] = val;
          }
          val.add(n);
        }
      }
    },
    // Delete the mapping from id to n for n.ownerDocument
    delId: {
      value: function delId(id, n) {
        var val = this.byId[id];
        utils2.assert(val);
        if (val instanceof MultiId) {
          val.del(n);
          if (val.length === 1) {
            this.byId[id] = val.downgrade();
          }
        } else {
          this.byId[id] = void 0;
        }
      }
    },
    _resolve: {
      value: function(href) {
        return new URL2(this._documentBaseURL).resolve(href);
      }
    },
    _documentBaseURL: {
      get: function() {
        var url = this._address;
        if (url === "about:blank") url = "/";
        var base = this.querySelector("base[href]");
        if (base) {
          return new URL2(url).resolve(base.getAttribute("href"));
        }
        return url;
      }
    },
    _templateDoc: {
      get: function() {
        if (!this._templateDocCache) {
          var newDoc = new Document2(this.isHTML, this._address);
          this._templateDocCache = newDoc._templateDocCache = newDoc;
        }
        return this._templateDocCache;
      }
    },
    querySelector: {
      value: function(selector) {
        return select2(selector, this)[0];
      }
    },
    querySelectorAll: {
      value: function(selector) {
        var nodes = select2(selector, this);
        return nodes.item ? nodes : new NodeList(nodes);
      }
    }
  });
  var eventHandlerTypes = ["abort", "canplay", "canplaythrough", "change", "click", "contextmenu", "cuechange", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "pause", "play", "playing", "progress", "ratechange", "readystatechange", "reset", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "blur", "error", "focus", "load", "scroll"];
  eventHandlerTypes.forEach(function(type) {
    Object.defineProperty(Document2.prototype, "on" + type, {
      get: function() {
        return this._getEventHandler(type);
      },
      set: function(v) {
        this._setEventHandler(type, v);
      }
    });
  });
  function namedHTMLChild(parent, name) {
    if (parent && parent.isHTML) {
      for (var kid = parent.firstChild; kid !== null; kid = kid.nextSibling) {
        if (kid.nodeType === Node2.ELEMENT_NODE && kid.localName === name && kid.namespaceURI === NAMESPACE.HTML) {
          return kid;
        }
      }
    }
    return null;
  }
  function root2(n) {
    n._nid = n.ownerDocument._nextnid++;
    n.ownerDocument._nodes[n._nid] = n;
    if (n.nodeType === Node2.ELEMENT_NODE) {
      var id = n.getAttribute("id");
      if (id) n.ownerDocument.addId(id, n);
      if (n._roothook) n._roothook();
    }
  }
  function uproot(n) {
    if (n.nodeType === Node2.ELEMENT_NODE) {
      var id = n.getAttribute("id");
      if (id) n.ownerDocument.delId(id, n);
    }
    n.ownerDocument._nodes[n._nid] = void 0;
    n._nid = void 0;
  }
  function recursivelyRoot(node2) {
    root2(node2);
    if (node2.nodeType === Node2.ELEMENT_NODE) {
      for (var kid = node2.firstChild; kid !== null; kid = kid.nextSibling) recursivelyRoot(kid);
    }
  }
  function recursivelyUproot(node2) {
    uproot(node2);
    for (var kid = node2.firstChild; kid !== null; kid = kid.nextSibling) recursivelyUproot(kid);
  }
  function recursivelySetOwner(node2, owner) {
    node2.ownerDocument = owner;
    node2._lastModTime = void 0;
    if (Object.prototype.hasOwnProperty.call(node2, "_tagName")) {
      node2._tagName = void 0;
    }
    for (var kid = node2.firstChild; kid !== null; kid = kid.nextSibling) recursivelySetOwner(kid, owner);
  }
  function MultiId(node2) {
    this.nodes = /* @__PURE__ */ Object.create(null);
    this.nodes[node2._nid] = node2;
    this.length = 1;
    this.firstNode = void 0;
  }
  MultiId.prototype.add = function(node2) {
    if (!this.nodes[node2._nid]) {
      this.nodes[node2._nid] = node2;
      this.length++;
      this.firstNode = void 0;
    }
  };
  MultiId.prototype.del = function(node2) {
    if (this.nodes[node2._nid]) {
      delete this.nodes[node2._nid];
      this.length--;
      this.firstNode = void 0;
    }
  };
  MultiId.prototype.getFirst = function() {
    if (!this.firstNode) {
      var nid;
      for (nid in this.nodes) {
        if (this.firstNode === void 0 || this.firstNode.compareDocumentPosition(this.nodes[nid]) & Node2.DOCUMENT_POSITION_PRECEDING) {
          this.firstNode = this.nodes[nid];
        }
      }
    }
    return this.firstNode;
  };
  MultiId.prototype.downgrade = function() {
    if (this.length === 1) {
      var nid;
      for (nid in this.nodes) {
        return this.nodes[nid];
      }
    }
    return this;
  };
  return Document_1;
}
var DocumentType_1;
var hasRequiredDocumentType;
function requireDocumentType() {
  if (hasRequiredDocumentType) return DocumentType_1;
  hasRequiredDocumentType = 1;
  DocumentType_1 = DocumentType;
  var Node2 = requireNode();
  var Leaf = requireLeaf();
  var ChildNode = requireChildNode();
  function DocumentType(ownerDocument, name, publicId, systemId) {
    Leaf.call(this);
    this.nodeType = Node2.DOCUMENT_TYPE_NODE;
    this.ownerDocument = ownerDocument || null;
    this.name = name;
    this.publicId = publicId || "";
    this.systemId = systemId || "";
  }
  DocumentType.prototype = Object.create(Leaf.prototype, {
    nodeName: {
      get: function() {
        return this.name;
      }
    },
    nodeValue: {
      get: function() {
        return null;
      },
      set: function() {
      }
    },
    // Utility methods
    clone: {
      value: function clone() {
        return new DocumentType(this.ownerDocument, this.name, this.publicId, this.systemId);
      }
    },
    isEqual: {
      value: function isEqual(n) {
        return this.name === n.name && this.publicId === n.publicId && this.systemId === n.systemId;
      }
    }
  });
  Object.defineProperties(DocumentType.prototype, ChildNode);
  return DocumentType_1;
}
var HTMLParser_1;
var hasRequiredHTMLParser;
function requireHTMLParser() {
  if (hasRequiredHTMLParser) return HTMLParser_1;
  hasRequiredHTMLParser = 1;
  HTMLParser_1 = HTMLParser;
  var Document2 = requireDocument();
  var DocumentType = requireDocumentType();
  var Node2 = requireNode();
  var NAMESPACE = requireUtils().NAMESPACE;
  var html = requireHtmlelts();
  var impl2 = html.elements;
  var pushAll = Function.prototype.apply.bind(Array.prototype.push);
  var EOF = -1;
  var TEXT = 1;
  var TAG = 2;
  var ENDTAG = 3;
  var COMMENT = 4;
  var DOCTYPE = 5;
  var NOATTRS = [];
  var quirkyPublicIds = /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i;
  var quirkySystemId = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
  var conditionallyQuirkyPublicIds = /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i;
  var limitedQuirkyPublicIds = /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i;
  var specialSet = /* @__PURE__ */ Object.create(null);
  specialSet[NAMESPACE.HTML] = {
    __proto__: null,
    "address": true,
    "applet": true,
    "area": true,
    "article": true,
    "aside": true,
    "base": true,
    "basefont": true,
    "bgsound": true,
    "blockquote": true,
    "body": true,
    "br": true,
    "button": true,
    "caption": true,
    "center": true,
    "col": true,
    "colgroup": true,
    "dd": true,
    "details": true,
    "dir": true,
    "div": true,
    "dl": true,
    "dt": true,
    "embed": true,
    "fieldset": true,
    "figcaption": true,
    "figure": true,
    "footer": true,
    "form": true,
    "frame": true,
    "frameset": true,
    "h1": true,
    "h2": true,
    "h3": true,
    "h4": true,
    "h5": true,
    "h6": true,
    "head": true,
    "header": true,
    "hgroup": true,
    "hr": true,
    "html": true,
    "iframe": true,
    "img": true,
    "input": true,
    "li": true,
    "link": true,
    "listing": true,
    "main": true,
    "marquee": true,
    "menu": true,
    "meta": true,
    "nav": true,
    "noembed": true,
    "noframes": true,
    "noscript": true,
    "object": true,
    "ol": true,
    "p": true,
    "param": true,
    "plaintext": true,
    "pre": true,
    "script": true,
    "section": true,
    "select": true,
    "source": true,
    "style": true,
    "summary": true,
    "table": true,
    "tbody": true,
    "td": true,
    "template": true,
    "textarea": true,
    "tfoot": true,
    "th": true,
    "thead": true,
    "title": true,
    "tr": true,
    "track": true,
    // Note that "xmp" was removed from the "special" set in the latest
    // spec, apparently by accident; see
    // https://github.com/whatwg/html/pull/1919
    "ul": true,
    "wbr": true,
    "xmp": true
  };
  specialSet[NAMESPACE.SVG] = {
    __proto__: null,
    "foreignObject": true,
    "desc": true,
    "title": true
  };
  specialSet[NAMESPACE.MATHML] = {
    __proto__: null,
    "mi": true,
    "mo": true,
    "mn": true,
    "ms": true,
    "mtext": true,
    "annotation-xml": true
  };
  var addressdivpSet = /* @__PURE__ */ Object.create(null);
  addressdivpSet[NAMESPACE.HTML] = {
    __proto__: null,
    "address": true,
    "div": true,
    "p": true
  };
  var dddtSet = /* @__PURE__ */ Object.create(null);
  dddtSet[NAMESPACE.HTML] = {
    __proto__: null,
    "dd": true,
    "dt": true
  };
  var tablesectionrowSet = /* @__PURE__ */ Object.create(null);
  tablesectionrowSet[NAMESPACE.HTML] = {
    __proto__: null,
    "table": true,
    "thead": true,
    "tbody": true,
    "tfoot": true,
    "tr": true
  };
  var impliedEndTagsSet = /* @__PURE__ */ Object.create(null);
  impliedEndTagsSet[NAMESPACE.HTML] = {
    __proto__: null,
    "dd": true,
    "dt": true,
    "li": true,
    "menuitem": true,
    "optgroup": true,
    "option": true,
    "p": true,
    "rb": true,
    "rp": true,
    "rt": true,
    "rtc": true
  };
  var thoroughImpliedEndTagsSet = /* @__PURE__ */ Object.create(null);
  thoroughImpliedEndTagsSet[NAMESPACE.HTML] = {
    __proto__: null,
    "caption": true,
    "colgroup": true,
    "dd": true,
    "dt": true,
    "li": true,
    "optgroup": true,
    "option": true,
    "p": true,
    "rb": true,
    "rp": true,
    "rt": true,
    "rtc": true,
    "tbody": true,
    "td": true,
    "tfoot": true,
    "th": true,
    "thead": true,
    "tr": true
  };
  var tableContextSet = /* @__PURE__ */ Object.create(null);
  tableContextSet[NAMESPACE.HTML] = {
    __proto__: null,
    "table": true,
    "template": true,
    "html": true
  };
  var tableBodyContextSet = /* @__PURE__ */ Object.create(null);
  tableBodyContextSet[NAMESPACE.HTML] = {
    __proto__: null,
    "tbody": true,
    "tfoot": true,
    "thead": true,
    "template": true,
    "html": true
  };
  var tableRowContextSet = /* @__PURE__ */ Object.create(null);
  tableRowContextSet[NAMESPACE.HTML] = {
    __proto__: null,
    "tr": true,
    "template": true,
    "html": true
  };
  var formassociatedSet = /* @__PURE__ */ Object.create(null);
  formassociatedSet[NAMESPACE.HTML] = {
    __proto__: null,
    "button": true,
    "fieldset": true,
    "input": true,
    "keygen": true,
    "object": true,
    "output": true,
    "select": true,
    "textarea": true,
    "img": true
  };
  var inScopeSet = /* @__PURE__ */ Object.create(null);
  inScopeSet[NAMESPACE.HTML] = {
    __proto__: null,
    "applet": true,
    "caption": true,
    "html": true,
    "table": true,
    "td": true,
    "th": true,
    "marquee": true,
    "object": true,
    "template": true
  };
  inScopeSet[NAMESPACE.MATHML] = {
    __proto__: null,
    "mi": true,
    "mo": true,
    "mn": true,
    "ms": true,
    "mtext": true,
    "annotation-xml": true
  };
  inScopeSet[NAMESPACE.SVG] = {
    __proto__: null,
    "foreignObject": true,
    "desc": true,
    "title": true
  };
  var inListItemScopeSet = Object.create(inScopeSet);
  inListItemScopeSet[NAMESPACE.HTML] = Object.create(inScopeSet[NAMESPACE.HTML]);
  inListItemScopeSet[NAMESPACE.HTML].ol = true;
  inListItemScopeSet[NAMESPACE.HTML].ul = true;
  var inButtonScopeSet = Object.create(inScopeSet);
  inButtonScopeSet[NAMESPACE.HTML] = Object.create(inScopeSet[NAMESPACE.HTML]);
  inButtonScopeSet[NAMESPACE.HTML].button = true;
  var inTableScopeSet = /* @__PURE__ */ Object.create(null);
  inTableScopeSet[NAMESPACE.HTML] = {
    __proto__: null,
    "html": true,
    "table": true,
    "template": true
  };
  var invertedSelectScopeSet = /* @__PURE__ */ Object.create(null);
  invertedSelectScopeSet[NAMESPACE.HTML] = {
    __proto__: null,
    "optgroup": true,
    "option": true
  };
  var mathmlTextIntegrationPointSet = /* @__PURE__ */ Object.create(null);
  mathmlTextIntegrationPointSet[NAMESPACE.MATHML] = {
    __proto__: null,
    mi: true,
    mo: true,
    mn: true,
    ms: true,
    mtext: true
  };
  var htmlIntegrationPointSet = /* @__PURE__ */ Object.create(null);
  htmlIntegrationPointSet[NAMESPACE.SVG] = {
    __proto__: null,
    foreignObject: true,
    desc: true,
    title: true
  };
  var foreignAttributes = {
    __proto__: null,
    "xlink:actuate": NAMESPACE.XLINK,
    "xlink:arcrole": NAMESPACE.XLINK,
    "xlink:href": NAMESPACE.XLINK,
    "xlink:role": NAMESPACE.XLINK,
    "xlink:show": NAMESPACE.XLINK,
    "xlink:title": NAMESPACE.XLINK,
    "xlink:type": NAMESPACE.XLINK,
    "xml:base": NAMESPACE.XML,
    "xml:lang": NAMESPACE.XML,
    "xml:space": NAMESPACE.XML,
    "xmlns": NAMESPACE.XMLNS,
    "xmlns:xlink": NAMESPACE.XMLNS
  };
  var svgAttrAdjustments = {
    __proto__: null,
    attributename: "attributeName",
    attributetype: "attributeType",
    basefrequency: "baseFrequency",
    baseprofile: "baseProfile",
    calcmode: "calcMode",
    clippathunits: "clipPathUnits",
    diffuseconstant: "diffuseConstant",
    edgemode: "edgeMode",
    filterunits: "filterUnits",
    glyphref: "glyphRef",
    gradienttransform: "gradientTransform",
    gradientunits: "gradientUnits",
    kernelmatrix: "kernelMatrix",
    kernelunitlength: "kernelUnitLength",
    keypoints: "keyPoints",
    keysplines: "keySplines",
    keytimes: "keyTimes",
    lengthadjust: "lengthAdjust",
    limitingconeangle: "limitingConeAngle",
    markerheight: "markerHeight",
    markerunits: "markerUnits",
    markerwidth: "markerWidth",
    maskcontentunits: "maskContentUnits",
    maskunits: "maskUnits",
    numoctaves: "numOctaves",
    pathlength: "pathLength",
    patterncontentunits: "patternContentUnits",
    patterntransform: "patternTransform",
    patternunits: "patternUnits",
    pointsatx: "pointsAtX",
    pointsaty: "pointsAtY",
    pointsatz: "pointsAtZ",
    preservealpha: "preserveAlpha",
    preserveaspectratio: "preserveAspectRatio",
    primitiveunits: "primitiveUnits",
    refx: "refX",
    refy: "refY",
    repeatcount: "repeatCount",
    repeatdur: "repeatDur",
    requiredextensions: "requiredExtensions",
    requiredfeatures: "requiredFeatures",
    specularconstant: "specularConstant",
    specularexponent: "specularExponent",
    spreadmethod: "spreadMethod",
    startoffset: "startOffset",
    stddeviation: "stdDeviation",
    stitchtiles: "stitchTiles",
    surfacescale: "surfaceScale",
    systemlanguage: "systemLanguage",
    tablevalues: "tableValues",
    targetx: "targetX",
    targety: "targetY",
    textlength: "textLength",
    viewbox: "viewBox",
    viewtarget: "viewTarget",
    xchannelselector: "xChannelSelector",
    ychannelselector: "yChannelSelector",
    zoomandpan: "zoomAndPan"
  };
  var svgTagNameAdjustments = {
    __proto__: null,
    altglyph: "altGlyph",
    altglyphdef: "altGlyphDef",
    altglyphitem: "altGlyphItem",
    animatecolor: "animateColor",
    animatemotion: "animateMotion",
    animatetransform: "animateTransform",
    clippath: "clipPath",
    feblend: "feBlend",
    fecolormatrix: "feColorMatrix",
    fecomponenttransfer: "feComponentTransfer",
    fecomposite: "feComposite",
    feconvolvematrix: "feConvolveMatrix",
    fediffuselighting: "feDiffuseLighting",
    fedisplacementmap: "feDisplacementMap",
    fedistantlight: "feDistantLight",
    feflood: "feFlood",
    fefunca: "feFuncA",
    fefuncb: "feFuncB",
    fefuncg: "feFuncG",
    fefuncr: "feFuncR",
    fegaussianblur: "feGaussianBlur",
    feimage: "feImage",
    femerge: "feMerge",
    femergenode: "feMergeNode",
    femorphology: "feMorphology",
    feoffset: "feOffset",
    fepointlight: "fePointLight",
    fespecularlighting: "feSpecularLighting",
    fespotlight: "feSpotLight",
    fetile: "feTile",
    feturbulence: "feTurbulence",
    foreignobject: "foreignObject",
    glyphref: "glyphRef",
    lineargradient: "linearGradient",
    radialgradient: "radialGradient",
    textpath: "textPath"
  };
  var numericCharRefReplacements = {
    __proto__: null,
    0: 65533,
    128: 8364,
    130: 8218,
    131: 402,
    132: 8222,
    133: 8230,
    134: 8224,
    135: 8225,
    136: 710,
    137: 8240,
    138: 352,
    139: 8249,
    140: 338,
    142: 381,
    145: 8216,
    146: 8217,
    147: 8220,
    148: 8221,
    149: 8226,
    150: 8211,
    151: 8212,
    152: 732,
    153: 8482,
    154: 353,
    155: 8250,
    156: 339,
    158: 382,
    159: 376
  };
  var namedCharRefs = {
    __proto__: null,
    "AElig": 198,
    "AElig;": 198,
    "AMP": 38,
    "AMP;": 38,
    "Aacute": 193,
    "Aacute;": 193,
    "Abreve;": 258,
    "Acirc": 194,
    "Acirc;": 194,
    "Acy;": 1040,
    "Afr;": [55349, 56580],
    "Agrave": 192,
    "Agrave;": 192,
    "Alpha;": 913,
    "Amacr;": 256,
    "And;": 10835,
    "Aogon;": 260,
    "Aopf;": [55349, 56632],
    "ApplyFunction;": 8289,
    "Aring": 197,
    "Aring;": 197,
    "Ascr;": [55349, 56476],
    "Assign;": 8788,
    "Atilde": 195,
    "Atilde;": 195,
    "Auml": 196,
    "Auml;": 196,
    "Backslash;": 8726,
    "Barv;": 10983,
    "Barwed;": 8966,
    "Bcy;": 1041,
    "Because;": 8757,
    "Bernoullis;": 8492,
    "Beta;": 914,
    "Bfr;": [55349, 56581],
    "Bopf;": [55349, 56633],
    "Breve;": 728,
    "Bscr;": 8492,
    "Bumpeq;": 8782,
    "CHcy;": 1063,
    "COPY": 169,
    "COPY;": 169,
    "Cacute;": 262,
    "Cap;": 8914,
    "CapitalDifferentialD;": 8517,
    "Cayleys;": 8493,
    "Ccaron;": 268,
    "Ccedil": 199,
    "Ccedil;": 199,
    "Ccirc;": 264,
    "Cconint;": 8752,
    "Cdot;": 266,
    "Cedilla;": 184,
    "CenterDot;": 183,
    "Cfr;": 8493,
    "Chi;": 935,
    "CircleDot;": 8857,
    "CircleMinus;": 8854,
    "CirclePlus;": 8853,
    "CircleTimes;": 8855,
    "ClockwiseContourIntegral;": 8754,
    "CloseCurlyDoubleQuote;": 8221,
    "CloseCurlyQuote;": 8217,
    "Colon;": 8759,
    "Colone;": 10868,
    "Congruent;": 8801,
    "Conint;": 8751,
    "ContourIntegral;": 8750,
    "Copf;": 8450,
    "Coproduct;": 8720,
    "CounterClockwiseContourIntegral;": 8755,
    "Cross;": 10799,
    "Cscr;": [55349, 56478],
    "Cup;": 8915,
    "CupCap;": 8781,
    "DD;": 8517,
    "DDotrahd;": 10513,
    "DJcy;": 1026,
    "DScy;": 1029,
    "DZcy;": 1039,
    "Dagger;": 8225,
    "Darr;": 8609,
    "Dashv;": 10980,
    "Dcaron;": 270,
    "Dcy;": 1044,
    "Del;": 8711,
    "Delta;": 916,
    "Dfr;": [55349, 56583],
    "DiacriticalAcute;": 180,
    "DiacriticalDot;": 729,
    "DiacriticalDoubleAcute;": 733,
    "DiacriticalGrave;": 96,
    "DiacriticalTilde;": 732,
    "Diamond;": 8900,
    "DifferentialD;": 8518,
    "Dopf;": [55349, 56635],
    "Dot;": 168,
    "DotDot;": 8412,
    "DotEqual;": 8784,
    "DoubleContourIntegral;": 8751,
    "DoubleDot;": 168,
    "DoubleDownArrow;": 8659,
    "DoubleLeftArrow;": 8656,
    "DoubleLeftRightArrow;": 8660,
    "DoubleLeftTee;": 10980,
    "DoubleLongLeftArrow;": 10232,
    "DoubleLongLeftRightArrow;": 10234,
    "DoubleLongRightArrow;": 10233,
    "DoubleRightArrow;": 8658,
    "DoubleRightTee;": 8872,
    "DoubleUpArrow;": 8657,
    "DoubleUpDownArrow;": 8661,
    "DoubleVerticalBar;": 8741,
    "DownArrow;": 8595,
    "DownArrowBar;": 10515,
    "DownArrowUpArrow;": 8693,
    "DownBreve;": 785,
    "DownLeftRightVector;": 10576,
    "DownLeftTeeVector;": 10590,
    "DownLeftVector;": 8637,
    "DownLeftVectorBar;": 10582,
    "DownRightTeeVector;": 10591,
    "DownRightVector;": 8641,
    "DownRightVectorBar;": 10583,
    "DownTee;": 8868,
    "DownTeeArrow;": 8615,
    "Downarrow;": 8659,
    "Dscr;": [55349, 56479],
    "Dstrok;": 272,
    "ENG;": 330,
    "ETH": 208,
    "ETH;": 208,
    "Eacute": 201,
    "Eacute;": 201,
    "Ecaron;": 282,
    "Ecirc": 202,
    "Ecirc;": 202,
    "Ecy;": 1069,
    "Edot;": 278,
    "Efr;": [55349, 56584],
    "Egrave": 200,
    "Egrave;": 200,
    "Element;": 8712,
    "Emacr;": 274,
    "EmptySmallSquare;": 9723,
    "EmptyVerySmallSquare;": 9643,
    "Eogon;": 280,
    "Eopf;": [55349, 56636],
    "Epsilon;": 917,
    "Equal;": 10869,
    "EqualTilde;": 8770,
    "Equilibrium;": 8652,
    "Escr;": 8496,
    "Esim;": 10867,
    "Eta;": 919,
    "Euml": 203,
    "Euml;": 203,
    "Exists;": 8707,
    "ExponentialE;": 8519,
    "Fcy;": 1060,
    "Ffr;": [55349, 56585],
    "FilledSmallSquare;": 9724,
    "FilledVerySmallSquare;": 9642,
    "Fopf;": [55349, 56637],
    "ForAll;": 8704,
    "Fouriertrf;": 8497,
    "Fscr;": 8497,
    "GJcy;": 1027,
    "GT": 62,
    "GT;": 62,
    "Gamma;": 915,
    "Gammad;": 988,
    "Gbreve;": 286,
    "Gcedil;": 290,
    "Gcirc;": 284,
    "Gcy;": 1043,
    "Gdot;": 288,
    "Gfr;": [55349, 56586],
    "Gg;": 8921,
    "Gopf;": [55349, 56638],
    "GreaterEqual;": 8805,
    "GreaterEqualLess;": 8923,
    "GreaterFullEqual;": 8807,
    "GreaterGreater;": 10914,
    "GreaterLess;": 8823,
    "GreaterSlantEqual;": 10878,
    "GreaterTilde;": 8819,
    "Gscr;": [55349, 56482],
    "Gt;": 8811,
    "HARDcy;": 1066,
    "Hacek;": 711,
    "Hat;": 94,
    "Hcirc;": 292,
    "Hfr;": 8460,
    "HilbertSpace;": 8459,
    "Hopf;": 8461,
    "HorizontalLine;": 9472,
    "Hscr;": 8459,
    "Hstrok;": 294,
    "HumpDownHump;": 8782,
    "HumpEqual;": 8783,
    "IEcy;": 1045,
    "IJlig;": 306,
    "IOcy;": 1025,
    "Iacute": 205,
    "Iacute;": 205,
    "Icirc": 206,
    "Icirc;": 206,
    "Icy;": 1048,
    "Idot;": 304,
    "Ifr;": 8465,
    "Igrave": 204,
    "Igrave;": 204,
    "Im;": 8465,
    "Imacr;": 298,
    "ImaginaryI;": 8520,
    "Implies;": 8658,
    "Int;": 8748,
    "Integral;": 8747,
    "Intersection;": 8898,
    "InvisibleComma;": 8291,
    "InvisibleTimes;": 8290,
    "Iogon;": 302,
    "Iopf;": [55349, 56640],
    "Iota;": 921,
    "Iscr;": 8464,
    "Itilde;": 296,
    "Iukcy;": 1030,
    "Iuml": 207,
    "Iuml;": 207,
    "Jcirc;": 308,
    "Jcy;": 1049,
    "Jfr;": [55349, 56589],
    "Jopf;": [55349, 56641],
    "Jscr;": [55349, 56485],
    "Jsercy;": 1032,
    "Jukcy;": 1028,
    "KHcy;": 1061,
    "KJcy;": 1036,
    "Kappa;": 922,
    "Kcedil;": 310,
    "Kcy;": 1050,
    "Kfr;": [55349, 56590],
    "Kopf;": [55349, 56642],
    "Kscr;": [55349, 56486],
    "LJcy;": 1033,
    "LT": 60,
    "LT;": 60,
    "Lacute;": 313,
    "Lambda;": 923,
    "Lang;": 10218,
    "Laplacetrf;": 8466,
    "Larr;": 8606,
    "Lcaron;": 317,
    "Lcedil;": 315,
    "Lcy;": 1051,
    "LeftAngleBracket;": 10216,
    "LeftArrow;": 8592,
    "LeftArrowBar;": 8676,
    "LeftArrowRightArrow;": 8646,
    "LeftCeiling;": 8968,
    "LeftDoubleBracket;": 10214,
    "LeftDownTeeVector;": 10593,
    "LeftDownVector;": 8643,
    "LeftDownVectorBar;": 10585,
    "LeftFloor;": 8970,
    "LeftRightArrow;": 8596,
    "LeftRightVector;": 10574,
    "LeftTee;": 8867,
    "LeftTeeArrow;": 8612,
    "LeftTeeVector;": 10586,
    "LeftTriangle;": 8882,
    "LeftTriangleBar;": 10703,
    "LeftTriangleEqual;": 8884,
    "LeftUpDownVector;": 10577,
    "LeftUpTeeVector;": 10592,
    "LeftUpVector;": 8639,
    "LeftUpVectorBar;": 10584,
    "LeftVector;": 8636,
    "LeftVectorBar;": 10578,
    "Leftarrow;": 8656,
    "Leftrightarrow;": 8660,
    "LessEqualGreater;": 8922,
    "LessFullEqual;": 8806,
    "LessGreater;": 8822,
    "LessLess;": 10913,
    "LessSlantEqual;": 10877,
    "LessTilde;": 8818,
    "Lfr;": [55349, 56591],
    "Ll;": 8920,
    "Lleftarrow;": 8666,
    "Lmidot;": 319,
    "LongLeftArrow;": 10229,
    "LongLeftRightArrow;": 10231,
    "LongRightArrow;": 10230,
    "Longleftarrow;": 10232,
    "Longleftrightarrow;": 10234,
    "Longrightarrow;": 10233,
    "Lopf;": [55349, 56643],
    "LowerLeftArrow;": 8601,
    "LowerRightArrow;": 8600,
    "Lscr;": 8466,
    "Lsh;": 8624,
    "Lstrok;": 321,
    "Lt;": 8810,
    "Map;": 10501,
    "Mcy;": 1052,
    "MediumSpace;": 8287,
    "Mellintrf;": 8499,
    "Mfr;": [55349, 56592],
    "MinusPlus;": 8723,
    "Mopf;": [55349, 56644],
    "Mscr;": 8499,
    "Mu;": 924,
    "NJcy;": 1034,
    "Nacute;": 323,
    "Ncaron;": 327,
    "Ncedil;": 325,
    "Ncy;": 1053,
    "NegativeMediumSpace;": 8203,
    "NegativeThickSpace;": 8203,
    "NegativeThinSpace;": 8203,
    "NegativeVeryThinSpace;": 8203,
    "NestedGreaterGreater;": 8811,
    "NestedLessLess;": 8810,
    "NewLine;": 10,
    "Nfr;": [55349, 56593],
    "NoBreak;": 8288,
    "NonBreakingSpace;": 160,
    "Nopf;": 8469,
    "Not;": 10988,
    "NotCongruent;": 8802,
    "NotCupCap;": 8813,
    "NotDoubleVerticalBar;": 8742,
    "NotElement;": 8713,
    "NotEqual;": 8800,
    "NotEqualTilde;": [8770, 824],
    "NotExists;": 8708,
    "NotGreater;": 8815,
    "NotGreaterEqual;": 8817,
    "NotGreaterFullEqual;": [8807, 824],
    "NotGreaterGreater;": [8811, 824],
    "NotGreaterLess;": 8825,
    "NotGreaterSlantEqual;": [10878, 824],
    "NotGreaterTilde;": 8821,
    "NotHumpDownHump;": [8782, 824],
    "NotHumpEqual;": [8783, 824],
    "NotLeftTriangle;": 8938,
    "NotLeftTriangleBar;": [10703, 824],
    "NotLeftTriangleEqual;": 8940,
    "NotLess;": 8814,
    "NotLessEqual;": 8816,
    "NotLessGreater;": 8824,
    "NotLessLess;": [8810, 824],
    "NotLessSlantEqual;": [10877, 824],
    "NotLessTilde;": 8820,
    "NotNestedGreaterGreater;": [10914, 824],
    "NotNestedLessLess;": [10913, 824],
    "NotPrecedes;": 8832,
    "NotPrecedesEqual;": [10927, 824],
    "NotPrecedesSlantEqual;": 8928,
    "NotReverseElement;": 8716,
    "NotRightTriangle;": 8939,
    "NotRightTriangleBar;": [10704, 824],
    "NotRightTriangleEqual;": 8941,
    "NotSquareSubset;": [8847, 824],
    "NotSquareSubsetEqual;": 8930,
    "NotSquareSuperset;": [8848, 824],
    "NotSquareSupersetEqual;": 8931,
    "NotSubset;": [8834, 8402],
    "NotSubsetEqual;": 8840,
    "NotSucceeds;": 8833,
    "NotSucceedsEqual;": [10928, 824],
    "NotSucceedsSlantEqual;": 8929,
    "NotSucceedsTilde;": [8831, 824],
    "NotSuperset;": [8835, 8402],
    "NotSupersetEqual;": 8841,
    "NotTilde;": 8769,
    "NotTildeEqual;": 8772,
    "NotTildeFullEqual;": 8775,
    "NotTildeTilde;": 8777,
    "NotVerticalBar;": 8740,
    "Nscr;": [55349, 56489],
    "Ntilde": 209,
    "Ntilde;": 209,
    "Nu;": 925,
    "OElig;": 338,
    "Oacute": 211,
    "Oacute;": 211,
    "Ocirc": 212,
    "Ocirc;": 212,
    "Ocy;": 1054,
    "Odblac;": 336,
    "Ofr;": [55349, 56594],
    "Ograve": 210,
    "Ograve;": 210,
    "Omacr;": 332,
    "Omega;": 937,
    "Omicron;": 927,
    "Oopf;": [55349, 56646],
    "OpenCurlyDoubleQuote;": 8220,
    "OpenCurlyQuote;": 8216,
    "Or;": 10836,
    "Oscr;": [55349, 56490],
    "Oslash": 216,
    "Oslash;": 216,
    "Otilde": 213,
    "Otilde;": 213,
    "Otimes;": 10807,
    "Ouml": 214,
    "Ouml;": 214,
    "OverBar;": 8254,
    "OverBrace;": 9182,
    "OverBracket;": 9140,
    "OverParenthesis;": 9180,
    "PartialD;": 8706,
    "Pcy;": 1055,
    "Pfr;": [55349, 56595],
    "Phi;": 934,
    "Pi;": 928,
    "PlusMinus;": 177,
    "Poincareplane;": 8460,
    "Popf;": 8473,
    "Pr;": 10939,
    "Precedes;": 8826,
    "PrecedesEqual;": 10927,
    "PrecedesSlantEqual;": 8828,
    "PrecedesTilde;": 8830,
    "Prime;": 8243,
    "Product;": 8719,
    "Proportion;": 8759,
    "Proportional;": 8733,
    "Pscr;": [55349, 56491],
    "Psi;": 936,
    "QUOT": 34,
    "QUOT;": 34,
    "Qfr;": [55349, 56596],
    "Qopf;": 8474,
    "Qscr;": [55349, 56492],
    "RBarr;": 10512,
    "REG": 174,
    "REG;": 174,
    "Racute;": 340,
    "Rang;": 10219,
    "Rarr;": 8608,
    "Rarrtl;": 10518,
    "Rcaron;": 344,
    "Rcedil;": 342,
    "Rcy;": 1056,
    "Re;": 8476,
    "ReverseElement;": 8715,
    "ReverseEquilibrium;": 8651,
    "ReverseUpEquilibrium;": 10607,
    "Rfr;": 8476,
    "Rho;": 929,
    "RightAngleBracket;": 10217,
    "RightArrow;": 8594,
    "RightArrowBar;": 8677,
    "RightArrowLeftArrow;": 8644,
    "RightCeiling;": 8969,
    "RightDoubleBracket;": 10215,
    "RightDownTeeVector;": 10589,
    "RightDownVector;": 8642,
    "RightDownVectorBar;": 10581,
    "RightFloor;": 8971,
    "RightTee;": 8866,
    "RightTeeArrow;": 8614,
    "RightTeeVector;": 10587,
    "RightTriangle;": 8883,
    "RightTriangleBar;": 10704,
    "RightTriangleEqual;": 8885,
    "RightUpDownVector;": 10575,
    "RightUpTeeVector;": 10588,
    "RightUpVector;": 8638,
    "RightUpVectorBar;": 10580,
    "RightVector;": 8640,
    "RightVectorBar;": 10579,
    "Rightarrow;": 8658,
    "Ropf;": 8477,
    "RoundImplies;": 10608,
    "Rrightarrow;": 8667,
    "Rscr;": 8475,
    "Rsh;": 8625,
    "RuleDelayed;": 10740,
    "SHCHcy;": 1065,
    "SHcy;": 1064,
    "SOFTcy;": 1068,
    "Sacute;": 346,
    "Sc;": 10940,
    "Scaron;": 352,
    "Scedil;": 350,
    "Scirc;": 348,
    "Scy;": 1057,
    "Sfr;": [55349, 56598],
    "ShortDownArrow;": 8595,
    "ShortLeftArrow;": 8592,
    "ShortRightArrow;": 8594,
    "ShortUpArrow;": 8593,
    "Sigma;": 931,
    "SmallCircle;": 8728,
    "Sopf;": [55349, 56650],
    "Sqrt;": 8730,
    "Square;": 9633,
    "SquareIntersection;": 8851,
    "SquareSubset;": 8847,
    "SquareSubsetEqual;": 8849,
    "SquareSuperset;": 8848,
    "SquareSupersetEqual;": 8850,
    "SquareUnion;": 8852,
    "Sscr;": [55349, 56494],
    "Star;": 8902,
    "Sub;": 8912,
    "Subset;": 8912,
    "SubsetEqual;": 8838,
    "Succeeds;": 8827,
    "SucceedsEqual;": 10928,
    "SucceedsSlantEqual;": 8829,
    "SucceedsTilde;": 8831,
    "SuchThat;": 8715,
    "Sum;": 8721,
    "Sup;": 8913,
    "Superset;": 8835,
    "SupersetEqual;": 8839,
    "Supset;": 8913,
    "THORN": 222,
    "THORN;": 222,
    "TRADE;": 8482,
    "TSHcy;": 1035,
    "TScy;": 1062,
    "Tab;": 9,
    "Tau;": 932,
    "Tcaron;": 356,
    "Tcedil;": 354,
    "Tcy;": 1058,
    "Tfr;": [55349, 56599],
    "Therefore;": 8756,
    "Theta;": 920,
    "ThickSpace;": [8287, 8202],
    "ThinSpace;": 8201,
    "Tilde;": 8764,
    "TildeEqual;": 8771,
    "TildeFullEqual;": 8773,
    "TildeTilde;": 8776,
    "Topf;": [55349, 56651],
    "TripleDot;": 8411,
    "Tscr;": [55349, 56495],
    "Tstrok;": 358,
    "Uacute": 218,
    "Uacute;": 218,
    "Uarr;": 8607,
    "Uarrocir;": 10569,
    "Ubrcy;": 1038,
    "Ubreve;": 364,
    "Ucirc": 219,
    "Ucirc;": 219,
    "Ucy;": 1059,
    "Udblac;": 368,
    "Ufr;": [55349, 56600],
    "Ugrave": 217,
    "Ugrave;": 217,
    "Umacr;": 362,
    "UnderBar;": 95,
    "UnderBrace;": 9183,
    "UnderBracket;": 9141,
    "UnderParenthesis;": 9181,
    "Union;": 8899,
    "UnionPlus;": 8846,
    "Uogon;": 370,
    "Uopf;": [55349, 56652],
    "UpArrow;": 8593,
    "UpArrowBar;": 10514,
    "UpArrowDownArrow;": 8645,
    "UpDownArrow;": 8597,
    "UpEquilibrium;": 10606,
    "UpTee;": 8869,
    "UpTeeArrow;": 8613,
    "Uparrow;": 8657,
    "Updownarrow;": 8661,
    "UpperLeftArrow;": 8598,
    "UpperRightArrow;": 8599,
    "Upsi;": 978,
    "Upsilon;": 933,
    "Uring;": 366,
    "Uscr;": [55349, 56496],
    "Utilde;": 360,
    "Uuml": 220,
    "Uuml;": 220,
    "VDash;": 8875,
    "Vbar;": 10987,
    "Vcy;": 1042,
    "Vdash;": 8873,
    "Vdashl;": 10982,
    "Vee;": 8897,
    "Verbar;": 8214,
    "Vert;": 8214,
    "VerticalBar;": 8739,
    "VerticalLine;": 124,
    "VerticalSeparator;": 10072,
    "VerticalTilde;": 8768,
    "VeryThinSpace;": 8202,
    "Vfr;": [55349, 56601],
    "Vopf;": [55349, 56653],
    "Vscr;": [55349, 56497],
    "Vvdash;": 8874,
    "Wcirc;": 372,
    "Wedge;": 8896,
    "Wfr;": [55349, 56602],
    "Wopf;": [55349, 56654],
    "Wscr;": [55349, 56498],
    "Xfr;": [55349, 56603],
    "Xi;": 926,
    "Xopf;": [55349, 56655],
    "Xscr;": [55349, 56499],
    "YAcy;": 1071,
    "YIcy;": 1031,
    "YUcy;": 1070,
    "Yacute": 221,
    "Yacute;": 221,
    "Ycirc;": 374,
    "Ycy;": 1067,
    "Yfr;": [55349, 56604],
    "Yopf;": [55349, 56656],
    "Yscr;": [55349, 56500],
    "Yuml;": 376,
    "ZHcy;": 1046,
    "Zacute;": 377,
    "Zcaron;": 381,
    "Zcy;": 1047,
    "Zdot;": 379,
    "ZeroWidthSpace;": 8203,
    "Zeta;": 918,
    "Zfr;": 8488,
    "Zopf;": 8484,
    "Zscr;": [55349, 56501],
    "aacute": 225,
    "aacute;": 225,
    "abreve;": 259,
    "ac;": 8766,
    "acE;": [8766, 819],
    "acd;": 8767,
    "acirc": 226,
    "acirc;": 226,
    "acute": 180,
    "acute;": 180,
    "acy;": 1072,
    "aelig": 230,
    "aelig;": 230,
    "af;": 8289,
    "afr;": [55349, 56606],
    "agrave": 224,
    "agrave;": 224,
    "alefsym;": 8501,
    "aleph;": 8501,
    "alpha;": 945,
    "amacr;": 257,
    "amalg;": 10815,
    "amp": 38,
    "amp;": 38,
    "and;": 8743,
    "andand;": 10837,
    "andd;": 10844,
    "andslope;": 10840,
    "andv;": 10842,
    "ang;": 8736,
    "ange;": 10660,
    "angle;": 8736,
    "angmsd;": 8737,
    "angmsdaa;": 10664,
    "angmsdab;": 10665,
    "angmsdac;": 10666,
    "angmsdad;": 10667,
    "angmsdae;": 10668,
    "angmsdaf;": 10669,
    "angmsdag;": 10670,
    "angmsdah;": 10671,
    "angrt;": 8735,
    "angrtvb;": 8894,
    "angrtvbd;": 10653,
    "angsph;": 8738,
    "angst;": 197,
    "angzarr;": 9084,
    "aogon;": 261,
    "aopf;": [55349, 56658],
    "ap;": 8776,
    "apE;": 10864,
    "apacir;": 10863,
    "ape;": 8778,
    "apid;": 8779,
    "apos;": 39,
    "approx;": 8776,
    "approxeq;": 8778,
    "aring": 229,
    "aring;": 229,
    "ascr;": [55349, 56502],
    "ast;": 42,
    "asymp;": 8776,
    "asympeq;": 8781,
    "atilde": 227,
    "atilde;": 227,
    "auml": 228,
    "auml;": 228,
    "awconint;": 8755,
    "awint;": 10769,
    "bNot;": 10989,
    "backcong;": 8780,
    "backepsilon;": 1014,
    "backprime;": 8245,
    "backsim;": 8765,
    "backsimeq;": 8909,
    "barvee;": 8893,
    "barwed;": 8965,
    "barwedge;": 8965,
    "bbrk;": 9141,
    "bbrktbrk;": 9142,
    "bcong;": 8780,
    "bcy;": 1073,
    "bdquo;": 8222,
    "becaus;": 8757,
    "because;": 8757,
    "bemptyv;": 10672,
    "bepsi;": 1014,
    "bernou;": 8492,
    "beta;": 946,
    "beth;": 8502,
    "between;": 8812,
    "bfr;": [55349, 56607],
    "bigcap;": 8898,
    "bigcirc;": 9711,
    "bigcup;": 8899,
    "bigodot;": 10752,
    "bigoplus;": 10753,
    "bigotimes;": 10754,
    "bigsqcup;": 10758,
    "bigstar;": 9733,
    "bigtriangledown;": 9661,
    "bigtriangleup;": 9651,
    "biguplus;": 10756,
    "bigvee;": 8897,
    "bigwedge;": 8896,
    "bkarow;": 10509,
    "blacklozenge;": 10731,
    "blacksquare;": 9642,
    "blacktriangle;": 9652,
    "blacktriangledown;": 9662,
    "blacktriangleleft;": 9666,
    "blacktriangleright;": 9656,
    "blank;": 9251,
    "blk12;": 9618,
    "blk14;": 9617,
    "blk34;": 9619,
    "block;": 9608,
    "bne;": [61, 8421],
    "bnequiv;": [8801, 8421],
    "bnot;": 8976,
    "bopf;": [55349, 56659],
    "bot;": 8869,
    "bottom;": 8869,
    "bowtie;": 8904,
    "boxDL;": 9559,
    "boxDR;": 9556,
    "boxDl;": 9558,
    "boxDr;": 9555,
    "boxH;": 9552,
    "boxHD;": 9574,
    "boxHU;": 9577,
    "boxHd;": 9572,
    "boxHu;": 9575,
    "boxUL;": 9565,
    "boxUR;": 9562,
    "boxUl;": 9564,
    "boxUr;": 9561,
    "boxV;": 9553,
    "boxVH;": 9580,
    "boxVL;": 9571,
    "boxVR;": 9568,
    "boxVh;": 9579,
    "boxVl;": 9570,
    "boxVr;": 9567,
    "boxbox;": 10697,
    "boxdL;": 9557,
    "boxdR;": 9554,
    "boxdl;": 9488,
    "boxdr;": 9484,
    "boxh;": 9472,
    "boxhD;": 9573,
    "boxhU;": 9576,
    "boxhd;": 9516,
    "boxhu;": 9524,
    "boxminus;": 8863,
    "boxplus;": 8862,
    "boxtimes;": 8864,
    "boxuL;": 9563,
    "boxuR;": 9560,
    "boxul;": 9496,
    "boxur;": 9492,
    "boxv;": 9474,
    "boxvH;": 9578,
    "boxvL;": 9569,
    "boxvR;": 9566,
    "boxvh;": 9532,
    "boxvl;": 9508,
    "boxvr;": 9500,
    "bprime;": 8245,
    "breve;": 728,
    "brvbar": 166,
    "brvbar;": 166,
    "bscr;": [55349, 56503],
    "bsemi;": 8271,
    "bsim;": 8765,
    "bsime;": 8909,
    "bsol;": 92,
    "bsolb;": 10693,
    "bsolhsub;": 10184,
    "bull;": 8226,
    "bullet;": 8226,
    "bump;": 8782,
    "bumpE;": 10926,
    "bumpe;": 8783,
    "bumpeq;": 8783,
    "cacute;": 263,
    "cap;": 8745,
    "capand;": 10820,
    "capbrcup;": 10825,
    "capcap;": 10827,
    "capcup;": 10823,
    "capdot;": 10816,
    "caps;": [8745, 65024],
    "caret;": 8257,
    "caron;": 711,
    "ccaps;": 10829,
    "ccaron;": 269,
    "ccedil": 231,
    "ccedil;": 231,
    "ccirc;": 265,
    "ccups;": 10828,
    "ccupssm;": 10832,
    "cdot;": 267,
    "cedil": 184,
    "cedil;": 184,
    "cemptyv;": 10674,
    "cent": 162,
    "cent;": 162,
    "centerdot;": 183,
    "cfr;": [55349, 56608],
    "chcy;": 1095,
    "check;": 10003,
    "checkmark;": 10003,
    "chi;": 967,
    "cir;": 9675,
    "cirE;": 10691,
    "circ;": 710,
    "circeq;": 8791,
    "circlearrowleft;": 8634,
    "circlearrowright;": 8635,
    "circledR;": 174,
    "circledS;": 9416,
    "circledast;": 8859,
    "circledcirc;": 8858,
    "circleddash;": 8861,
    "cire;": 8791,
    "cirfnint;": 10768,
    "cirmid;": 10991,
    "cirscir;": 10690,
    "clubs;": 9827,
    "clubsuit;": 9827,
    "colon;": 58,
    "colone;": 8788,
    "coloneq;": 8788,
    "comma;": 44,
    "commat;": 64,
    "comp;": 8705,
    "compfn;": 8728,
    "complement;": 8705,
    "complexes;": 8450,
    "cong;": 8773,
    "congdot;": 10861,
    "conint;": 8750,
    "copf;": [55349, 56660],
    "coprod;": 8720,
    "copy": 169,
    "copy;": 169,
    "copysr;": 8471,
    "crarr;": 8629,
    "cross;": 10007,
    "cscr;": [55349, 56504],
    "csub;": 10959,
    "csube;": 10961,
    "csup;": 10960,
    "csupe;": 10962,
    "ctdot;": 8943,
    "cudarrl;": 10552,
    "cudarrr;": 10549,
    "cuepr;": 8926,
    "cuesc;": 8927,
    "cularr;": 8630,
    "cularrp;": 10557,
    "cup;": 8746,
    "cupbrcap;": 10824,
    "cupcap;": 10822,
    "cupcup;": 10826,
    "cupdot;": 8845,
    "cupor;": 10821,
    "cups;": [8746, 65024],
    "curarr;": 8631,
    "curarrm;": 10556,
    "curlyeqprec;": 8926,
    "curlyeqsucc;": 8927,
    "curlyvee;": 8910,
    "curlywedge;": 8911,
    "curren": 164,
    "curren;": 164,
    "curvearrowleft;": 8630,
    "curvearrowright;": 8631,
    "cuvee;": 8910,
    "cuwed;": 8911,
    "cwconint;": 8754,
    "cwint;": 8753,
    "cylcty;": 9005,
    "dArr;": 8659,
    "dHar;": 10597,
    "dagger;": 8224,
    "daleth;": 8504,
    "darr;": 8595,
    "dash;": 8208,
    "dashv;": 8867,
    "dbkarow;": 10511,
    "dblac;": 733,
    "dcaron;": 271,
    "dcy;": 1076,
    "dd;": 8518,
    "ddagger;": 8225,
    "ddarr;": 8650,
    "ddotseq;": 10871,
    "deg": 176,
    "deg;": 176,
    "delta;": 948,
    "demptyv;": 10673,
    "dfisht;": 10623,
    "dfr;": [55349, 56609],
    "dharl;": 8643,
    "dharr;": 8642,
    "diam;": 8900,
    "diamond;": 8900,
    "diamondsuit;": 9830,
    "diams;": 9830,
    "die;": 168,
    "digamma;": 989,
    "disin;": 8946,
    "div;": 247,
    "divide": 247,
    "divide;": 247,
    "divideontimes;": 8903,
    "divonx;": 8903,
    "djcy;": 1106,
    "dlcorn;": 8990,
    "dlcrop;": 8973,
    "dollar;": 36,
    "dopf;": [55349, 56661],
    "dot;": 729,
    "doteq;": 8784,
    "doteqdot;": 8785,
    "dotminus;": 8760,
    "dotplus;": 8724,
    "dotsquare;": 8865,
    "doublebarwedge;": 8966,
    "downarrow;": 8595,
    "downdownarrows;": 8650,
    "downharpoonleft;": 8643,
    "downharpoonright;": 8642,
    "drbkarow;": 10512,
    "drcorn;": 8991,
    "drcrop;": 8972,
    "dscr;": [55349, 56505],
    "dscy;": 1109,
    "dsol;": 10742,
    "dstrok;": 273,
    "dtdot;": 8945,
    "dtri;": 9663,
    "dtrif;": 9662,
    "duarr;": 8693,
    "duhar;": 10607,
    "dwangle;": 10662,
    "dzcy;": 1119,
    "dzigrarr;": 10239,
    "eDDot;": 10871,
    "eDot;": 8785,
    "eacute": 233,
    "eacute;": 233,
    "easter;": 10862,
    "ecaron;": 283,
    "ecir;": 8790,
    "ecirc": 234,
    "ecirc;": 234,
    "ecolon;": 8789,
    "ecy;": 1101,
    "edot;": 279,
    "ee;": 8519,
    "efDot;": 8786,
    "efr;": [55349, 56610],
    "eg;": 10906,
    "egrave": 232,
    "egrave;": 232,
    "egs;": 10902,
    "egsdot;": 10904,
    "el;": 10905,
    "elinters;": 9191,
    "ell;": 8467,
    "els;": 10901,
    "elsdot;": 10903,
    "emacr;": 275,
    "empty;": 8709,
    "emptyset;": 8709,
    "emptyv;": 8709,
    "emsp13;": 8196,
    "emsp14;": 8197,
    "emsp;": 8195,
    "eng;": 331,
    "ensp;": 8194,
    "eogon;": 281,
    "eopf;": [55349, 56662],
    "epar;": 8917,
    "eparsl;": 10723,
    "eplus;": 10865,
    "epsi;": 949,
    "epsilon;": 949,
    "epsiv;": 1013,
    "eqcirc;": 8790,
    "eqcolon;": 8789,
    "eqsim;": 8770,
    "eqslantgtr;": 10902,
    "eqslantless;": 10901,
    "equals;": 61,
    "equest;": 8799,
    "equiv;": 8801,
    "equivDD;": 10872,
    "eqvparsl;": 10725,
    "erDot;": 8787,
    "erarr;": 10609,
    "escr;": 8495,
    "esdot;": 8784,
    "esim;": 8770,
    "eta;": 951,
    "eth": 240,
    "eth;": 240,
    "euml": 235,
    "euml;": 235,
    "euro;": 8364,
    "excl;": 33,
    "exist;": 8707,
    "expectation;": 8496,
    "exponentiale;": 8519,
    "fallingdotseq;": 8786,
    "fcy;": 1092,
    "female;": 9792,
    "ffilig;": 64259,
    "fflig;": 64256,
    "ffllig;": 64260,
    "ffr;": [55349, 56611],
    "filig;": 64257,
    "fjlig;": [102, 106],
    "flat;": 9837,
    "fllig;": 64258,
    "fltns;": 9649,
    "fnof;": 402,
    "fopf;": [55349, 56663],
    "forall;": 8704,
    "fork;": 8916,
    "forkv;": 10969,
    "fpartint;": 10765,
    "frac12": 189,
    "frac12;": 189,
    "frac13;": 8531,
    "frac14": 188,
    "frac14;": 188,
    "frac15;": 8533,
    "frac16;": 8537,
    "frac18;": 8539,
    "frac23;": 8532,
    "frac25;": 8534,
    "frac34": 190,
    "frac34;": 190,
    "frac35;": 8535,
    "frac38;": 8540,
    "frac45;": 8536,
    "frac56;": 8538,
    "frac58;": 8541,
    "frac78;": 8542,
    "frasl;": 8260,
    "frown;": 8994,
    "fscr;": [55349, 56507],
    "gE;": 8807,
    "gEl;": 10892,
    "gacute;": 501,
    "gamma;": 947,
    "gammad;": 989,
    "gap;": 10886,
    "gbreve;": 287,
    "gcirc;": 285,
    "gcy;": 1075,
    "gdot;": 289,
    "ge;": 8805,
    "gel;": 8923,
    "geq;": 8805,
    "geqq;": 8807,
    "geqslant;": 10878,
    "ges;": 10878,
    "gescc;": 10921,
    "gesdot;": 10880,
    "gesdoto;": 10882,
    "gesdotol;": 10884,
    "gesl;": [8923, 65024],
    "gesles;": 10900,
    "gfr;": [55349, 56612],
    "gg;": 8811,
    "ggg;": 8921,
    "gimel;": 8503,
    "gjcy;": 1107,
    "gl;": 8823,
    "glE;": 10898,
    "gla;": 10917,
    "glj;": 10916,
    "gnE;": 8809,
    "gnap;": 10890,
    "gnapprox;": 10890,
    "gne;": 10888,
    "gneq;": 10888,
    "gneqq;": 8809,
    "gnsim;": 8935,
    "gopf;": [55349, 56664],
    "grave;": 96,
    "gscr;": 8458,
    "gsim;": 8819,
    "gsime;": 10894,
    "gsiml;": 10896,
    "gt": 62,
    "gt;": 62,
    "gtcc;": 10919,
    "gtcir;": 10874,
    "gtdot;": 8919,
    "gtlPar;": 10645,
    "gtquest;": 10876,
    "gtrapprox;": 10886,
    "gtrarr;": 10616,
    "gtrdot;": 8919,
    "gtreqless;": 8923,
    "gtreqqless;": 10892,
    "gtrless;": 8823,
    "gtrsim;": 8819,
    "gvertneqq;": [8809, 65024],
    "gvnE;": [8809, 65024],
    "hArr;": 8660,
    "hairsp;": 8202,
    "half;": 189,
    "hamilt;": 8459,
    "hardcy;": 1098,
    "harr;": 8596,
    "harrcir;": 10568,
    "harrw;": 8621,
    "hbar;": 8463,
    "hcirc;": 293,
    "hearts;": 9829,
    "heartsuit;": 9829,
    "hellip;": 8230,
    "hercon;": 8889,
    "hfr;": [55349, 56613],
    "hksearow;": 10533,
    "hkswarow;": 10534,
    "hoarr;": 8703,
    "homtht;": 8763,
    "hookleftarrow;": 8617,
    "hookrightarrow;": 8618,
    "hopf;": [55349, 56665],
    "horbar;": 8213,
    "hscr;": [55349, 56509],
    "hslash;": 8463,
    "hstrok;": 295,
    "hybull;": 8259,
    "hyphen;": 8208,
    "iacute": 237,
    "iacute;": 237,
    "ic;": 8291,
    "icirc": 238,
    "icirc;": 238,
    "icy;": 1080,
    "iecy;": 1077,
    "iexcl": 161,
    "iexcl;": 161,
    "iff;": 8660,
    "ifr;": [55349, 56614],
    "igrave": 236,
    "igrave;": 236,
    "ii;": 8520,
    "iiiint;": 10764,
    "iiint;": 8749,
    "iinfin;": 10716,
    "iiota;": 8489,
    "ijlig;": 307,
    "imacr;": 299,
    "image;": 8465,
    "imagline;": 8464,
    "imagpart;": 8465,
    "imath;": 305,
    "imof;": 8887,
    "imped;": 437,
    "in;": 8712,
    "incare;": 8453,
    "infin;": 8734,
    "infintie;": 10717,
    "inodot;": 305,
    "int;": 8747,
    "intcal;": 8890,
    "integers;": 8484,
    "intercal;": 8890,
    "intlarhk;": 10775,
    "intprod;": 10812,
    "iocy;": 1105,
    "iogon;": 303,
    "iopf;": [55349, 56666],
    "iota;": 953,
    "iprod;": 10812,
    "iquest": 191,
    "iquest;": 191,
    "iscr;": [55349, 56510],
    "isin;": 8712,
    "isinE;": 8953,
    "isindot;": 8949,
    "isins;": 8948,
    "isinsv;": 8947,
    "isinv;": 8712,
    "it;": 8290,
    "itilde;": 297,
    "iukcy;": 1110,
    "iuml": 239,
    "iuml;": 239,
    "jcirc;": 309,
    "jcy;": 1081,
    "jfr;": [55349, 56615],
    "jmath;": 567,
    "jopf;": [55349, 56667],
    "jscr;": [55349, 56511],
    "jsercy;": 1112,
    "jukcy;": 1108,
    "kappa;": 954,
    "kappav;": 1008,
    "kcedil;": 311,
    "kcy;": 1082,
    "kfr;": [55349, 56616],
    "kgreen;": 312,
    "khcy;": 1093,
    "kjcy;": 1116,
    "kopf;": [55349, 56668],
    "kscr;": [55349, 56512],
    "lAarr;": 8666,
    "lArr;": 8656,
    "lAtail;": 10523,
    "lBarr;": 10510,
    "lE;": 8806,
    "lEg;": 10891,
    "lHar;": 10594,
    "lacute;": 314,
    "laemptyv;": 10676,
    "lagran;": 8466,
    "lambda;": 955,
    "lang;": 10216,
    "langd;": 10641,
    "langle;": 10216,
    "lap;": 10885,
    "laquo": 171,
    "laquo;": 171,
    "larr;": 8592,
    "larrb;": 8676,
    "larrbfs;": 10527,
    "larrfs;": 10525,
    "larrhk;": 8617,
    "larrlp;": 8619,
    "larrpl;": 10553,
    "larrsim;": 10611,
    "larrtl;": 8610,
    "lat;": 10923,
    "latail;": 10521,
    "late;": 10925,
    "lates;": [10925, 65024],
    "lbarr;": 10508,
    "lbbrk;": 10098,
    "lbrace;": 123,
    "lbrack;": 91,
    "lbrke;": 10635,
    "lbrksld;": 10639,
    "lbrkslu;": 10637,
    "lcaron;": 318,
    "lcedil;": 316,
    "lceil;": 8968,
    "lcub;": 123,
    "lcy;": 1083,
    "ldca;": 10550,
    "ldquo;": 8220,
    "ldquor;": 8222,
    "ldrdhar;": 10599,
    "ldrushar;": 10571,
    "ldsh;": 8626,
    "le;": 8804,
    "leftarrow;": 8592,
    "leftarrowtail;": 8610,
    "leftharpoondown;": 8637,
    "leftharpoonup;": 8636,
    "leftleftarrows;": 8647,
    "leftrightarrow;": 8596,
    "leftrightarrows;": 8646,
    "leftrightharpoons;": 8651,
    "leftrightsquigarrow;": 8621,
    "leftthreetimes;": 8907,
    "leg;": 8922,
    "leq;": 8804,
    "leqq;": 8806,
    "leqslant;": 10877,
    "les;": 10877,
    "lescc;": 10920,
    "lesdot;": 10879,
    "lesdoto;": 10881,
    "lesdotor;": 10883,
    "lesg;": [8922, 65024],
    "lesges;": 10899,
    "lessapprox;": 10885,
    "lessdot;": 8918,
    "lesseqgtr;": 8922,
    "lesseqqgtr;": 10891,
    "lessgtr;": 8822,
    "lesssim;": 8818,
    "lfisht;": 10620,
    "lfloor;": 8970,
    "lfr;": [55349, 56617],
    "lg;": 8822,
    "lgE;": 10897,
    "lhard;": 8637,
    "lharu;": 8636,
    "lharul;": 10602,
    "lhblk;": 9604,
    "ljcy;": 1113,
    "ll;": 8810,
    "llarr;": 8647,
    "llcorner;": 8990,
    "llhard;": 10603,
    "lltri;": 9722,
    "lmidot;": 320,
    "lmoust;": 9136,
    "lmoustache;": 9136,
    "lnE;": 8808,
    "lnap;": 10889,
    "lnapprox;": 10889,
    "lne;": 10887,
    "lneq;": 10887,
    "lneqq;": 8808,
    "lnsim;": 8934,
    "loang;": 10220,
    "loarr;": 8701,
    "lobrk;": 10214,
    "longleftarrow;": 10229,
    "longleftrightarrow;": 10231,
    "longmapsto;": 10236,
    "longrightarrow;": 10230,
    "looparrowleft;": 8619,
    "looparrowright;": 8620,
    "lopar;": 10629,
    "lopf;": [55349, 56669],
    "loplus;": 10797,
    "lotimes;": 10804,
    "lowast;": 8727,
    "lowbar;": 95,
    "loz;": 9674,
    "lozenge;": 9674,
    "lozf;": 10731,
    "lpar;": 40,
    "lparlt;": 10643,
    "lrarr;": 8646,
    "lrcorner;": 8991,
    "lrhar;": 8651,
    "lrhard;": 10605,
    "lrm;": 8206,
    "lrtri;": 8895,
    "lsaquo;": 8249,
    "lscr;": [55349, 56513],
    "lsh;": 8624,
    "lsim;": 8818,
    "lsime;": 10893,
    "lsimg;": 10895,
    "lsqb;": 91,
    "lsquo;": 8216,
    "lsquor;": 8218,
    "lstrok;": 322,
    "lt": 60,
    "lt;": 60,
    "ltcc;": 10918,
    "ltcir;": 10873,
    "ltdot;": 8918,
    "lthree;": 8907,
    "ltimes;": 8905,
    "ltlarr;": 10614,
    "ltquest;": 10875,
    "ltrPar;": 10646,
    "ltri;": 9667,
    "ltrie;": 8884,
    "ltrif;": 9666,
    "lurdshar;": 10570,
    "luruhar;": 10598,
    "lvertneqq;": [8808, 65024],
    "lvnE;": [8808, 65024],
    "mDDot;": 8762,
    "macr": 175,
    "macr;": 175,
    "male;": 9794,
    "malt;": 10016,
    "maltese;": 10016,
    "map;": 8614,
    "mapsto;": 8614,
    "mapstodown;": 8615,
    "mapstoleft;": 8612,
    "mapstoup;": 8613,
    "marker;": 9646,
    "mcomma;": 10793,
    "mcy;": 1084,
    "mdash;": 8212,
    "measuredangle;": 8737,
    "mfr;": [55349, 56618],
    "mho;": 8487,
    "micro": 181,
    "micro;": 181,
    "mid;": 8739,
    "midast;": 42,
    "midcir;": 10992,
    "middot": 183,
    "middot;": 183,
    "minus;": 8722,
    "minusb;": 8863,
    "minusd;": 8760,
    "minusdu;": 10794,
    "mlcp;": 10971,
    "mldr;": 8230,
    "mnplus;": 8723,
    "models;": 8871,
    "mopf;": [55349, 56670],
    "mp;": 8723,
    "mscr;": [55349, 56514],
    "mstpos;": 8766,
    "mu;": 956,
    "multimap;": 8888,
    "mumap;": 8888,
    "nGg;": [8921, 824],
    "nGt;": [8811, 8402],
    "nGtv;": [8811, 824],
    "nLeftarrow;": 8653,
    "nLeftrightarrow;": 8654,
    "nLl;": [8920, 824],
    "nLt;": [8810, 8402],
    "nLtv;": [8810, 824],
    "nRightarrow;": 8655,
    "nVDash;": 8879,
    "nVdash;": 8878,
    "nabla;": 8711,
    "nacute;": 324,
    "nang;": [8736, 8402],
    "nap;": 8777,
    "napE;": [10864, 824],
    "napid;": [8779, 824],
    "napos;": 329,
    "napprox;": 8777,
    "natur;": 9838,
    "natural;": 9838,
    "naturals;": 8469,
    "nbsp": 160,
    "nbsp;": 160,
    "nbump;": [8782, 824],
    "nbumpe;": [8783, 824],
    "ncap;": 10819,
    "ncaron;": 328,
    "ncedil;": 326,
    "ncong;": 8775,
    "ncongdot;": [10861, 824],
    "ncup;": 10818,
    "ncy;": 1085,
    "ndash;": 8211,
    "ne;": 8800,
    "neArr;": 8663,
    "nearhk;": 10532,
    "nearr;": 8599,
    "nearrow;": 8599,
    "nedot;": [8784, 824],
    "nequiv;": 8802,
    "nesear;": 10536,
    "nesim;": [8770, 824],
    "nexist;": 8708,
    "nexists;": 8708,
    "nfr;": [55349, 56619],
    "ngE;": [8807, 824],
    "nge;": 8817,
    "ngeq;": 8817,
    "ngeqq;": [8807, 824],
    "ngeqslant;": [10878, 824],
    "nges;": [10878, 824],
    "ngsim;": 8821,
    "ngt;": 8815,
    "ngtr;": 8815,
    "nhArr;": 8654,
    "nharr;": 8622,
    "nhpar;": 10994,
    "ni;": 8715,
    "nis;": 8956,
    "nisd;": 8954,
    "niv;": 8715,
    "njcy;": 1114,
    "nlArr;": 8653,
    "nlE;": [8806, 824],
    "nlarr;": 8602,
    "nldr;": 8229,
    "nle;": 8816,
    "nleftarrow;": 8602,
    "nleftrightarrow;": 8622,
    "nleq;": 8816,
    "nleqq;": [8806, 824],
    "nleqslant;": [10877, 824],
    "nles;": [10877, 824],
    "nless;": 8814,
    "nlsim;": 8820,
    "nlt;": 8814,
    "nltri;": 8938,
    "nltrie;": 8940,
    "nmid;": 8740,
    "nopf;": [55349, 56671],
    "not": 172,
    "not;": 172,
    "notin;": 8713,
    "notinE;": [8953, 824],
    "notindot;": [8949, 824],
    "notinva;": 8713,
    "notinvb;": 8951,
    "notinvc;": 8950,
    "notni;": 8716,
    "notniva;": 8716,
    "notnivb;": 8958,
    "notnivc;": 8957,
    "npar;": 8742,
    "nparallel;": 8742,
    "nparsl;": [11005, 8421],
    "npart;": [8706, 824],
    "npolint;": 10772,
    "npr;": 8832,
    "nprcue;": 8928,
    "npre;": [10927, 824],
    "nprec;": 8832,
    "npreceq;": [10927, 824],
    "nrArr;": 8655,
    "nrarr;": 8603,
    "nrarrc;": [10547, 824],
    "nrarrw;": [8605, 824],
    "nrightarrow;": 8603,
    "nrtri;": 8939,
    "nrtrie;": 8941,
    "nsc;": 8833,
    "nsccue;": 8929,
    "nsce;": [10928, 824],
    "nscr;": [55349, 56515],
    "nshortmid;": 8740,
    "nshortparallel;": 8742,
    "nsim;": 8769,
    "nsime;": 8772,
    "nsimeq;": 8772,
    "nsmid;": 8740,
    "nspar;": 8742,
    "nsqsube;": 8930,
    "nsqsupe;": 8931,
    "nsub;": 8836,
    "nsubE;": [10949, 824],
    "nsube;": 8840,
    "nsubset;": [8834, 8402],
    "nsubseteq;": 8840,
    "nsubseteqq;": [10949, 824],
    "nsucc;": 8833,
    "nsucceq;": [10928, 824],
    "nsup;": 8837,
    "nsupE;": [10950, 824],
    "nsupe;": 8841,
    "nsupset;": [8835, 8402],
    "nsupseteq;": 8841,
    "nsupseteqq;": [10950, 824],
    "ntgl;": 8825,
    "ntilde": 241,
    "ntilde;": 241,
    "ntlg;": 8824,
    "ntriangleleft;": 8938,
    "ntrianglelefteq;": 8940,
    "ntriangleright;": 8939,
    "ntrianglerighteq;": 8941,
    "nu;": 957,
    "num;": 35,
    "numero;": 8470,
    "numsp;": 8199,
    "nvDash;": 8877,
    "nvHarr;": 10500,
    "nvap;": [8781, 8402],
    "nvdash;": 8876,
    "nvge;": [8805, 8402],
    "nvgt;": [62, 8402],
    "nvinfin;": 10718,
    "nvlArr;": 10498,
    "nvle;": [8804, 8402],
    "nvlt;": [60, 8402],
    "nvltrie;": [8884, 8402],
    "nvrArr;": 10499,
    "nvrtrie;": [8885, 8402],
    "nvsim;": [8764, 8402],
    "nwArr;": 8662,
    "nwarhk;": 10531,
    "nwarr;": 8598,
    "nwarrow;": 8598,
    "nwnear;": 10535,
    "oS;": 9416,
    "oacute": 243,
    "oacute;": 243,
    "oast;": 8859,
    "ocir;": 8858,
    "ocirc": 244,
    "ocirc;": 244,
    "ocy;": 1086,
    "odash;": 8861,
    "odblac;": 337,
    "odiv;": 10808,
    "odot;": 8857,
    "odsold;": 10684,
    "oelig;": 339,
    "ofcir;": 10687,
    "ofr;": [55349, 56620],
    "ogon;": 731,
    "ograve": 242,
    "ograve;": 242,
    "ogt;": 10689,
    "ohbar;": 10677,
    "ohm;": 937,
    "oint;": 8750,
    "olarr;": 8634,
    "olcir;": 10686,
    "olcross;": 10683,
    "oline;": 8254,
    "olt;": 10688,
    "omacr;": 333,
    "omega;": 969,
    "omicron;": 959,
    "omid;": 10678,
    "ominus;": 8854,
    "oopf;": [55349, 56672],
    "opar;": 10679,
    "operp;": 10681,
    "oplus;": 8853,
    "or;": 8744,
    "orarr;": 8635,
    "ord;": 10845,
    "order;": 8500,
    "orderof;": 8500,
    "ordf": 170,
    "ordf;": 170,
    "ordm": 186,
    "ordm;": 186,
    "origof;": 8886,
    "oror;": 10838,
    "orslope;": 10839,
    "orv;": 10843,
    "oscr;": 8500,
    "oslash": 248,
    "oslash;": 248,
    "osol;": 8856,
    "otilde": 245,
    "otilde;": 245,
    "otimes;": 8855,
    "otimesas;": 10806,
    "ouml": 246,
    "ouml;": 246,
    "ovbar;": 9021,
    "par;": 8741,
    "para": 182,
    "para;": 182,
    "parallel;": 8741,
    "parsim;": 10995,
    "parsl;": 11005,
    "part;": 8706,
    "pcy;": 1087,
    "percnt;": 37,
    "period;": 46,
    "permil;": 8240,
    "perp;": 8869,
    "pertenk;": 8241,
    "pfr;": [55349, 56621],
    "phi;": 966,
    "phiv;": 981,
    "phmmat;": 8499,
    "phone;": 9742,
    "pi;": 960,
    "pitchfork;": 8916,
    "piv;": 982,
    "planck;": 8463,
    "planckh;": 8462,
    "plankv;": 8463,
    "plus;": 43,
    "plusacir;": 10787,
    "plusb;": 8862,
    "pluscir;": 10786,
    "plusdo;": 8724,
    "plusdu;": 10789,
    "pluse;": 10866,
    "plusmn": 177,
    "plusmn;": 177,
    "plussim;": 10790,
    "plustwo;": 10791,
    "pm;": 177,
    "pointint;": 10773,
    "popf;": [55349, 56673],
    "pound": 163,
    "pound;": 163,
    "pr;": 8826,
    "prE;": 10931,
    "prap;": 10935,
    "prcue;": 8828,
    "pre;": 10927,
    "prec;": 8826,
    "precapprox;": 10935,
    "preccurlyeq;": 8828,
    "preceq;": 10927,
    "precnapprox;": 10937,
    "precneqq;": 10933,
    "precnsim;": 8936,
    "precsim;": 8830,
    "prime;": 8242,
    "primes;": 8473,
    "prnE;": 10933,
    "prnap;": 10937,
    "prnsim;": 8936,
    "prod;": 8719,
    "profalar;": 9006,
    "profline;": 8978,
    "profsurf;": 8979,
    "prop;": 8733,
    "propto;": 8733,
    "prsim;": 8830,
    "prurel;": 8880,
    "pscr;": [55349, 56517],
    "psi;": 968,
    "puncsp;": 8200,
    "qfr;": [55349, 56622],
    "qint;": 10764,
    "qopf;": [55349, 56674],
    "qprime;": 8279,
    "qscr;": [55349, 56518],
    "quaternions;": 8461,
    "quatint;": 10774,
    "quest;": 63,
    "questeq;": 8799,
    "quot": 34,
    "quot;": 34,
    "rAarr;": 8667,
    "rArr;": 8658,
    "rAtail;": 10524,
    "rBarr;": 10511,
    "rHar;": 10596,
    "race;": [8765, 817],
    "racute;": 341,
    "radic;": 8730,
    "raemptyv;": 10675,
    "rang;": 10217,
    "rangd;": 10642,
    "range;": 10661,
    "rangle;": 10217,
    "raquo": 187,
    "raquo;": 187,
    "rarr;": 8594,
    "rarrap;": 10613,
    "rarrb;": 8677,
    "rarrbfs;": 10528,
    "rarrc;": 10547,
    "rarrfs;": 10526,
    "rarrhk;": 8618,
    "rarrlp;": 8620,
    "rarrpl;": 10565,
    "rarrsim;": 10612,
    "rarrtl;": 8611,
    "rarrw;": 8605,
    "ratail;": 10522,
    "ratio;": 8758,
    "rationals;": 8474,
    "rbarr;": 10509,
    "rbbrk;": 10099,
    "rbrace;": 125,
    "rbrack;": 93,
    "rbrke;": 10636,
    "rbrksld;": 10638,
    "rbrkslu;": 10640,
    "rcaron;": 345,
    "rcedil;": 343,
    "rceil;": 8969,
    "rcub;": 125,
    "rcy;": 1088,
    "rdca;": 10551,
    "rdldhar;": 10601,
    "rdquo;": 8221,
    "rdquor;": 8221,
    "rdsh;": 8627,
    "real;": 8476,
    "realine;": 8475,
    "realpart;": 8476,
    "reals;": 8477,
    "rect;": 9645,
    "reg": 174,
    "reg;": 174,
    "rfisht;": 10621,
    "rfloor;": 8971,
    "rfr;": [55349, 56623],
    "rhard;": 8641,
    "rharu;": 8640,
    "rharul;": 10604,
    "rho;": 961,
    "rhov;": 1009,
    "rightarrow;": 8594,
    "rightarrowtail;": 8611,
    "rightharpoondown;": 8641,
    "rightharpoonup;": 8640,
    "rightleftarrows;": 8644,
    "rightleftharpoons;": 8652,
    "rightrightarrows;": 8649,
    "rightsquigarrow;": 8605,
    "rightthreetimes;": 8908,
    "ring;": 730,
    "risingdotseq;": 8787,
    "rlarr;": 8644,
    "rlhar;": 8652,
    "rlm;": 8207,
    "rmoust;": 9137,
    "rmoustache;": 9137,
    "rnmid;": 10990,
    "roang;": 10221,
    "roarr;": 8702,
    "robrk;": 10215,
    "ropar;": 10630,
    "ropf;": [55349, 56675],
    "roplus;": 10798,
    "rotimes;": 10805,
    "rpar;": 41,
    "rpargt;": 10644,
    "rppolint;": 10770,
    "rrarr;": 8649,
    "rsaquo;": 8250,
    "rscr;": [55349, 56519],
    "rsh;": 8625,
    "rsqb;": 93,
    "rsquo;": 8217,
    "rsquor;": 8217,
    "rthree;": 8908,
    "rtimes;": 8906,
    "rtri;": 9657,
    "rtrie;": 8885,
    "rtrif;": 9656,
    "rtriltri;": 10702,
    "ruluhar;": 10600,
    "rx;": 8478,
    "sacute;": 347,
    "sbquo;": 8218,
    "sc;": 8827,
    "scE;": 10932,
    "scap;": 10936,
    "scaron;": 353,
    "sccue;": 8829,
    "sce;": 10928,
    "scedil;": 351,
    "scirc;": 349,
    "scnE;": 10934,
    "scnap;": 10938,
    "scnsim;": 8937,
    "scpolint;": 10771,
    "scsim;": 8831,
    "scy;": 1089,
    "sdot;": 8901,
    "sdotb;": 8865,
    "sdote;": 10854,
    "seArr;": 8664,
    "searhk;": 10533,
    "searr;": 8600,
    "searrow;": 8600,
    "sect": 167,
    "sect;": 167,
    "semi;": 59,
    "seswar;": 10537,
    "setminus;": 8726,
    "setmn;": 8726,
    "sext;": 10038,
    "sfr;": [55349, 56624],
    "sfrown;": 8994,
    "sharp;": 9839,
    "shchcy;": 1097,
    "shcy;": 1096,
    "shortmid;": 8739,
    "shortparallel;": 8741,
    "shy": 173,
    "shy;": 173,
    "sigma;": 963,
    "sigmaf;": 962,
    "sigmav;": 962,
    "sim;": 8764,
    "simdot;": 10858,
    "sime;": 8771,
    "simeq;": 8771,
    "simg;": 10910,
    "simgE;": 10912,
    "siml;": 10909,
    "simlE;": 10911,
    "simne;": 8774,
    "simplus;": 10788,
    "simrarr;": 10610,
    "slarr;": 8592,
    "smallsetminus;": 8726,
    "smashp;": 10803,
    "smeparsl;": 10724,
    "smid;": 8739,
    "smile;": 8995,
    "smt;": 10922,
    "smte;": 10924,
    "smtes;": [10924, 65024],
    "softcy;": 1100,
    "sol;": 47,
    "solb;": 10692,
    "solbar;": 9023,
    "sopf;": [55349, 56676],
    "spades;": 9824,
    "spadesuit;": 9824,
    "spar;": 8741,
    "sqcap;": 8851,
    "sqcaps;": [8851, 65024],
    "sqcup;": 8852,
    "sqcups;": [8852, 65024],
    "sqsub;": 8847,
    "sqsube;": 8849,
    "sqsubset;": 8847,
    "sqsubseteq;": 8849,
    "sqsup;": 8848,
    "sqsupe;": 8850,
    "sqsupset;": 8848,
    "sqsupseteq;": 8850,
    "squ;": 9633,
    "square;": 9633,
    "squarf;": 9642,
    "squf;": 9642,
    "srarr;": 8594,
    "sscr;": [55349, 56520],
    "ssetmn;": 8726,
    "ssmile;": 8995,
    "sstarf;": 8902,
    "star;": 9734,
    "starf;": 9733,
    "straightepsilon;": 1013,
    "straightphi;": 981,
    "strns;": 175,
    "sub;": 8834,
    "subE;": 10949,
    "subdot;": 10941,
    "sube;": 8838,
    "subedot;": 10947,
    "submult;": 10945,
    "subnE;": 10955,
    "subne;": 8842,
    "subplus;": 10943,
    "subrarr;": 10617,
    "subset;": 8834,
    "subseteq;": 8838,
    "subseteqq;": 10949,
    "subsetneq;": 8842,
    "subsetneqq;": 10955,
    "subsim;": 10951,
    "subsub;": 10965,
    "subsup;": 10963,
    "succ;": 8827,
    "succapprox;": 10936,
    "succcurlyeq;": 8829,
    "succeq;": 10928,
    "succnapprox;": 10938,
    "succneqq;": 10934,
    "succnsim;": 8937,
    "succsim;": 8831,
    "sum;": 8721,
    "sung;": 9834,
    "sup1": 185,
    "sup1;": 185,
    "sup2": 178,
    "sup2;": 178,
    "sup3": 179,
    "sup3;": 179,
    "sup;": 8835,
    "supE;": 10950,
    "supdot;": 10942,
    "supdsub;": 10968,
    "supe;": 8839,
    "supedot;": 10948,
    "suphsol;": 10185,
    "suphsub;": 10967,
    "suplarr;": 10619,
    "supmult;": 10946,
    "supnE;": 10956,
    "supne;": 8843,
    "supplus;": 10944,
    "supset;": 8835,
    "supseteq;": 8839,
    "supseteqq;": 10950,
    "supsetneq;": 8843,
    "supsetneqq;": 10956,
    "supsim;": 10952,
    "supsub;": 10964,
    "supsup;": 10966,
    "swArr;": 8665,
    "swarhk;": 10534,
    "swarr;": 8601,
    "swarrow;": 8601,
    "swnwar;": 10538,
    "szlig": 223,
    "szlig;": 223,
    "target;": 8982,
    "tau;": 964,
    "tbrk;": 9140,
    "tcaron;": 357,
    "tcedil;": 355,
    "tcy;": 1090,
    "tdot;": 8411,
    "telrec;": 8981,
    "tfr;": [55349, 56625],
    "there4;": 8756,
    "therefore;": 8756,
    "theta;": 952,
    "thetasym;": 977,
    "thetav;": 977,
    "thickapprox;": 8776,
    "thicksim;": 8764,
    "thinsp;": 8201,
    "thkap;": 8776,
    "thksim;": 8764,
    "thorn": 254,
    "thorn;": 254,
    "tilde;": 732,
    "times": 215,
    "times;": 215,
    "timesb;": 8864,
    "timesbar;": 10801,
    "timesd;": 10800,
    "tint;": 8749,
    "toea;": 10536,
    "top;": 8868,
    "topbot;": 9014,
    "topcir;": 10993,
    "topf;": [55349, 56677],
    "topfork;": 10970,
    "tosa;": 10537,
    "tprime;": 8244,
    "trade;": 8482,
    "triangle;": 9653,
    "triangledown;": 9663,
    "triangleleft;": 9667,
    "trianglelefteq;": 8884,
    "triangleq;": 8796,
    "triangleright;": 9657,
    "trianglerighteq;": 8885,
    "tridot;": 9708,
    "trie;": 8796,
    "triminus;": 10810,
    "triplus;": 10809,
    "trisb;": 10701,
    "tritime;": 10811,
    "trpezium;": 9186,
    "tscr;": [55349, 56521],
    "tscy;": 1094,
    "tshcy;": 1115,
    "tstrok;": 359,
    "twixt;": 8812,
    "twoheadleftarrow;": 8606,
    "twoheadrightarrow;": 8608,
    "uArr;": 8657,
    "uHar;": 10595,
    "uacute": 250,
    "uacute;": 250,
    "uarr;": 8593,
    "ubrcy;": 1118,
    "ubreve;": 365,
    "ucirc": 251,
    "ucirc;": 251,
    "ucy;": 1091,
    "udarr;": 8645,
    "udblac;": 369,
    "udhar;": 10606,
    "ufisht;": 10622,
    "ufr;": [55349, 56626],
    "ugrave": 249,
    "ugrave;": 249,
    "uharl;": 8639,
    "uharr;": 8638,
    "uhblk;": 9600,
    "ulcorn;": 8988,
    "ulcorner;": 8988,
    "ulcrop;": 8975,
    "ultri;": 9720,
    "umacr;": 363,
    "uml": 168,
    "uml;": 168,
    "uogon;": 371,
    "uopf;": [55349, 56678],
    "uparrow;": 8593,
    "updownarrow;": 8597,
    "upharpoonleft;": 8639,
    "upharpoonright;": 8638,
    "uplus;": 8846,
    "upsi;": 965,
    "upsih;": 978,
    "upsilon;": 965,
    "upuparrows;": 8648,
    "urcorn;": 8989,
    "urcorner;": 8989,
    "urcrop;": 8974,
    "uring;": 367,
    "urtri;": 9721,
    "uscr;": [55349, 56522],
    "utdot;": 8944,
    "utilde;": 361,
    "utri;": 9653,
    "utrif;": 9652,
    "uuarr;": 8648,
    "uuml": 252,
    "uuml;": 252,
    "uwangle;": 10663,
    "vArr;": 8661,
    "vBar;": 10984,
    "vBarv;": 10985,
    "vDash;": 8872,
    "vangrt;": 10652,
    "varepsilon;": 1013,
    "varkappa;": 1008,
    "varnothing;": 8709,
    "varphi;": 981,
    "varpi;": 982,
    "varpropto;": 8733,
    "varr;": 8597,
    "varrho;": 1009,
    "varsigma;": 962,
    "varsubsetneq;": [8842, 65024],
    "varsubsetneqq;": [10955, 65024],
    "varsupsetneq;": [8843, 65024],
    "varsupsetneqq;": [10956, 65024],
    "vartheta;": 977,
    "vartriangleleft;": 8882,
    "vartriangleright;": 8883,
    "vcy;": 1074,
    "vdash;": 8866,
    "vee;": 8744,
    "veebar;": 8891,
    "veeeq;": 8794,
    "vellip;": 8942,
    "verbar;": 124,
    "vert;": 124,
    "vfr;": [55349, 56627],
    "vltri;": 8882,
    "vnsub;": [8834, 8402],
    "vnsup;": [8835, 8402],
    "vopf;": [55349, 56679],
    "vprop;": 8733,
    "vrtri;": 8883,
    "vscr;": [55349, 56523],
    "vsubnE;": [10955, 65024],
    "vsubne;": [8842, 65024],
    "vsupnE;": [10956, 65024],
    "vsupne;": [8843, 65024],
    "vzigzag;": 10650,
    "wcirc;": 373,
    "wedbar;": 10847,
    "wedge;": 8743,
    "wedgeq;": 8793,
    "weierp;": 8472,
    "wfr;": [55349, 56628],
    "wopf;": [55349, 56680],
    "wp;": 8472,
    "wr;": 8768,
    "wreath;": 8768,
    "wscr;": [55349, 56524],
    "xcap;": 8898,
    "xcirc;": 9711,
    "xcup;": 8899,
    "xdtri;": 9661,
    "xfr;": [55349, 56629],
    "xhArr;": 10234,
    "xharr;": 10231,
    "xi;": 958,
    "xlArr;": 10232,
    "xlarr;": 10229,
    "xmap;": 10236,
    "xnis;": 8955,
    "xodot;": 10752,
    "xopf;": [55349, 56681],
    "xoplus;": 10753,
    "xotime;": 10754,
    "xrArr;": 10233,
    "xrarr;": 10230,
    "xscr;": [55349, 56525],
    "xsqcup;": 10758,
    "xuplus;": 10756,
    "xutri;": 9651,
    "xvee;": 8897,
    "xwedge;": 8896,
    "yacute": 253,
    "yacute;": 253,
    "yacy;": 1103,
    "ycirc;": 375,
    "ycy;": 1099,
    "yen": 165,
    "yen;": 165,
    "yfr;": [55349, 56630],
    "yicy;": 1111,
    "yopf;": [55349, 56682],
    "yscr;": [55349, 56526],
    "yucy;": 1102,
    "yuml": 255,
    "yuml;": 255,
    "zacute;": 378,
    "zcaron;": 382,
    "zcy;": 1079,
    "zdot;": 380,
    "zeetrf;": 8488,
    "zeta;": 950,
    "zfr;": [55349, 56631],
    "zhcy;": 1078,
    "zigrarr;": 8669,
    "zopf;": [55349, 56683],
    "zscr;": [55349, 56527],
    "zwj;": 8205,
    "zwnj;": 8204
  };
  var NAMEDCHARREF = /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g;
  var DBLQUOTEATTRVAL = /[^\r"&\u0000]+/g;
  var SINGLEQUOTEATTRVAL = /[^\r'&\u0000]+/g;
  var UNQUOTEDATTRVAL = /[^\r\t\n\f &>\u0000]+/g;
  var TAGNAME = /[^\r\t\n\f \/>A-Z\u0000]+/g;
  var ATTRNAME = /[^\r\t\n\f \/=>A-Z\u0000]+/g;
  var CDATATEXT = /[^\]\r\u0000\uffff]*/g;
  var DATATEXT = /[^&<\r\u0000\uffff]*/g;
  var RAWTEXT = /[^<\r\u0000\uffff]*/g;
  var PLAINTEXT = /[^\r\u0000\uffff]*/g;
  var SIMPLETAG = /(?:(\/)?([a-z]+)>)|[\s\S]/g;
  var SIMPLEATTR = /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g;
  var NONWS = /[^\x09\x0A\x0C\x0D\x20]/;
  var ALLNONWS = /[^\x09\x0A\x0C\x0D\x20]/g;
  var NONWSNONNUL = /[^\x00\x09\x0A\x0C\x0D\x20]/;
  var LEADINGWS = /^[\x09\x0A\x0C\x0D\x20]+/;
  var NULCHARS = /\x00/g;
  function buf2str(buf) {
    var CHUNKSIZE = 16384;
    if (buf.length < CHUNKSIZE) {
      return String.fromCharCode.apply(String, buf);
    }
    var result2 = "";
    for (var i = 0; i < buf.length; i += CHUNKSIZE) {
      result2 += String.fromCharCode.apply(String, buf.slice(i, i + CHUNKSIZE));
    }
    return result2;
  }
  function str2buf(s) {
    var result2 = [];
    for (var i = 0; i < s.length; i++) {
      result2[i] = s.charCodeAt(i);
    }
    return result2;
  }
  function isA(elt, set) {
    if (typeof set === "string") {
      return elt.namespaceURI === NAMESPACE.HTML && elt.localName === set;
    }
    var tagnames = set[elt.namespaceURI];
    return tagnames && tagnames[elt.localName];
  }
  function isMathmlTextIntegrationPoint(n) {
    return isA(n, mathmlTextIntegrationPointSet);
  }
  function isHTMLIntegrationPoint(n) {
    if (isA(n, htmlIntegrationPointSet)) return true;
    if (n.namespaceURI === NAMESPACE.MATHML && n.localName === "annotation-xml") {
      var encoding = n.getAttribute("encoding");
      if (encoding) encoding = encoding.toLowerCase();
      if (encoding === "text/html" || encoding === "application/xhtml+xml") return true;
    }
    return false;
  }
  function adjustSVGTagName(name) {
    if (name in svgTagNameAdjustments) return svgTagNameAdjustments[name];
    else return name;
  }
  function adjustSVGAttributes(attrs) {
    for (var i = 0, n = attrs.length; i < n; i++) {
      if (attrs[i][0] in svgAttrAdjustments) {
        attrs[i][0] = svgAttrAdjustments[attrs[i][0]];
      }
    }
  }
  function adjustMathMLAttributes(attrs) {
    for (var i = 0, n = attrs.length; i < n; i++) {
      if (attrs[i][0] === "definitionurl") {
        attrs[i][0] = "definitionURL";
        break;
      }
    }
  }
  function adjustForeignAttributes(attrs) {
    for (var i = 0, n = attrs.length; i < n; i++) {
      if (attrs[i][0] in foreignAttributes) {
        attrs[i].push(foreignAttributes[attrs[i][0]]);
      }
    }
  }
  function transferAttributes(attrs, elt) {
    for (var i = 0, n = attrs.length; i < n; i++) {
      var name = attrs[i][0], value = attrs[i][1];
      if (elt.hasAttribute(name)) continue;
      elt._setAttribute(name, value);
    }
  }
  HTMLParser.ElementStack = function ElementStack() {
    this.elements = [];
    this.top = null;
  };
  HTMLParser.ElementStack.prototype.push = function(e) {
    this.elements.push(e);
    this.top = e;
  };
  HTMLParser.ElementStack.prototype.pop = function(e) {
    this.elements.pop();
    this.top = this.elements[this.elements.length - 1];
  };
  HTMLParser.ElementStack.prototype.popTag = function(tag) {
    for (var i = this.elements.length - 1; i > 0; i--) {
      var e = this.elements[i];
      if (isA(e, tag)) break;
    }
    this.elements.length = i;
    this.top = this.elements[i - 1];
  };
  HTMLParser.ElementStack.prototype.popElementType = function(type) {
    for (var i = this.elements.length - 1; i > 0; i--) {
      if (this.elements[i] instanceof type) break;
    }
    this.elements.length = i;
    this.top = this.elements[i - 1];
  };
  HTMLParser.ElementStack.prototype.popElement = function(e) {
    for (var i = this.elements.length - 1; i > 0; i--) {
      if (this.elements[i] === e) break;
    }
    this.elements.length = i;
    this.top = this.elements[i - 1];
  };
  HTMLParser.ElementStack.prototype.removeElement = function(e) {
    if (this.top === e) this.pop();
    else {
      var idx = this.elements.lastIndexOf(e);
      if (idx !== -1) this.elements.splice(idx, 1);
    }
  };
  HTMLParser.ElementStack.prototype.clearToContext = function(set) {
    for (var i = this.elements.length - 1; i > 0; i--) {
      if (isA(this.elements[i], set)) break;
    }
    this.elements.length = i + 1;
    this.top = this.elements[i];
  };
  HTMLParser.ElementStack.prototype.contains = function(tag) {
    return this.inSpecificScope(tag, /* @__PURE__ */ Object.create(null));
  };
  HTMLParser.ElementStack.prototype.inSpecificScope = function(tag, set) {
    for (var i = this.elements.length - 1; i >= 0; i--) {
      var elt = this.elements[i];
      if (isA(elt, tag)) return true;
      if (isA(elt, set)) return false;
    }
    return false;
  };
  HTMLParser.ElementStack.prototype.elementInSpecificScope = function(target, set) {
    for (var i = this.elements.length - 1; i >= 0; i--) {
      var elt = this.elements[i];
      if (elt === target) return true;
      if (isA(elt, set)) return false;
    }
    return false;
  };
  HTMLParser.ElementStack.prototype.elementTypeInSpecificScope = function(target, set) {
    for (var i = this.elements.length - 1; i >= 0; i--) {
      var elt = this.elements[i];
      if (elt instanceof target) return true;
      if (isA(elt, set)) return false;
    }
    return false;
  };
  HTMLParser.ElementStack.prototype.inScope = function(tag) {
    return this.inSpecificScope(tag, inScopeSet);
  };
  HTMLParser.ElementStack.prototype.elementInScope = function(e) {
    return this.elementInSpecificScope(e, inScopeSet);
  };
  HTMLParser.ElementStack.prototype.elementTypeInScope = function(type) {
    return this.elementTypeInSpecificScope(type, inScopeSet);
  };
  HTMLParser.ElementStack.prototype.inButtonScope = function(tag) {
    return this.inSpecificScope(tag, inButtonScopeSet);
  };
  HTMLParser.ElementStack.prototype.inListItemScope = function(tag) {
    return this.inSpecificScope(tag, inListItemScopeSet);
  };
  HTMLParser.ElementStack.prototype.inTableScope = function(tag) {
    return this.inSpecificScope(tag, inTableScopeSet);
  };
  HTMLParser.ElementStack.prototype.inSelectScope = function(tag) {
    for (var i = this.elements.length - 1; i >= 0; i--) {
      var elt = this.elements[i];
      if (elt.namespaceURI !== NAMESPACE.HTML) return false;
      var localname = elt.localName;
      if (localname === tag) return true;
      if (localname !== "optgroup" && localname !== "option") return false;
    }
    return false;
  };
  HTMLParser.ElementStack.prototype.generateImpliedEndTags = function(butnot, thorough) {
    var endTagSet = thorough ? thoroughImpliedEndTagsSet : impliedEndTagsSet;
    for (var i = this.elements.length - 1; i >= 0; i--) {
      var e = this.elements[i];
      if (butnot && isA(e, butnot)) break;
      if (!isA(this.elements[i], endTagSet)) break;
    }
    this.elements.length = i + 1;
    this.top = this.elements[i];
  };
  HTMLParser.ActiveFormattingElements = function AFE() {
    this.list = [];
    this.attrs = [];
  };
  HTMLParser.ActiveFormattingElements.prototype.MARKER = {
    localName: "|"
  };
  HTMLParser.ActiveFormattingElements.prototype.insertMarker = function() {
    this.list.push(this.MARKER);
    this.attrs.push(this.MARKER);
  };
  HTMLParser.ActiveFormattingElements.prototype.push = function(elt, attrs) {
    var count = 0;
    for (var i = this.list.length - 1; i >= 0; i--) {
      if (this.list[i] === this.MARKER) break;
      if (equal(elt, this.list[i], this.attrs[i])) {
        count++;
        if (count === 3) {
          this.list.splice(i, 1);
          this.attrs.splice(i, 1);
          break;
        }
      }
    }
    this.list.push(elt);
    var attrcopy = [];
    for (var ii = 0; ii < attrs.length; ii++) {
      attrcopy[ii] = attrs[ii];
    }
    this.attrs.push(attrcopy);
    function equal(newelt, oldelt, oldattrs) {
      if (newelt.localName !== oldelt.localName) return false;
      if (newelt._numattrs !== oldattrs.length) return false;
      for (var i2 = 0, n = oldattrs.length; i2 < n; i2++) {
        var oldname = oldattrs[i2][0];
        var oldval = oldattrs[i2][1];
        if (!newelt.hasAttribute(oldname)) return false;
        if (newelt.getAttribute(oldname) !== oldval) return false;
      }
      return true;
    }
  };
  HTMLParser.ActiveFormattingElements.prototype.clearToMarker = function() {
    for (var i = this.list.length - 1; i >= 0; i--) {
      if (this.list[i] === this.MARKER) break;
    }
    if (i < 0) i = 0;
    this.list.length = i;
    this.attrs.length = i;
  };
  HTMLParser.ActiveFormattingElements.prototype.findElementByTag = function(tag) {
    for (var i = this.list.length - 1; i >= 0; i--) {
      var elt = this.list[i];
      if (elt === this.MARKER) break;
      if (elt.localName === tag) return elt;
    }
    return null;
  };
  HTMLParser.ActiveFormattingElements.prototype.indexOf = function(e) {
    return this.list.lastIndexOf(e);
  };
  HTMLParser.ActiveFormattingElements.prototype.remove = function(e) {
    var idx = this.list.lastIndexOf(e);
    if (idx !== -1) {
      this.list.splice(idx, 1);
      this.attrs.splice(idx, 1);
    }
  };
  HTMLParser.ActiveFormattingElements.prototype.replace = function(a, b, attrs) {
    var idx = this.list.lastIndexOf(a);
    if (idx !== -1) {
      this.list[idx] = b;
      this.attrs[idx] = attrs;
    }
  };
  HTMLParser.ActiveFormattingElements.prototype.insertAfter = function(a, b) {
    var idx = this.list.lastIndexOf(a);
    if (idx !== -1) {
      this.list.splice(idx, 0, b);
      this.attrs.splice(idx, 0, b);
    }
  };
  function HTMLParser(address, fragmentContext, options) {
    var chars = null;
    var numchars = 0;
    var nextchar = 0;
    var input_complete = false;
    var scanner_skip_newline = false;
    var reentrant_invocations = 0;
    var saved_scanner_state = [];
    var leftovers = "";
    var first_batch = true;
    var paused = 0;
    var tokenizer = data_state;
    var return_state;
    var character_reference_code;
    var tagnamebuf = "";
    var lasttagname = "";
    var tempbuf = [];
    var attrnamebuf = "";
    var attrvaluebuf = "";
    var commentbuf = [];
    var doctypenamebuf = [];
    var doctypepublicbuf = [];
    var doctypesystembuf = [];
    var attributes2 = [];
    var is_end_tag = false;
    var parser2 = initial_mode;
    var originalInsertionMode = null;
    var templateInsertionModes = [];
    var stack = new HTMLParser.ElementStack();
    var afe = new HTMLParser.ActiveFormattingElements();
    var fragment = fragmentContext !== void 0;
    var head_element_pointer = null;
    var form_element_pointer = null;
    var scripting_enabled = true;
    if (fragmentContext) {
      scripting_enabled = fragmentContext.ownerDocument._scripting_enabled;
    }
    if (options && options.scripting_enabled === false) scripting_enabled = false;
    var frameset_ok = true;
    var force_quirks = false;
    var pending_table_text;
    var text_integration_mode;
    var textrun = [];
    var textIncludesNUL = false;
    var ignore_linefeed = false;
    var htmlparser = {
      document: function() {
        return doc;
      },
      // Convenience function for internal use. Can only be called once,
      // as it removes the nodes from `doc` to add them to fragment.
      _asDocumentFragment: function() {
        var frag = doc.createDocumentFragment();
        var root3 = doc.firstChild;
        while (root3.hasChildNodes()) {
          frag.appendChild(root3.firstChild);
        }
        return frag;
      },
      // Internal function used from HTMLScriptElement to pause the
      // parser while a script is being loaded from the network
      pause: function() {
        paused++;
      },
      // Called when a script finishes loading
      resume: function() {
        paused--;
        this.parse("");
      },
      // Parse the HTML text s.
      // The second argument should be true if there is no more
      // text to be parsed, and should be false or omitted otherwise.
      // The second argument must not be set for recursive invocations
      // from document.write()
      parse: function(s, end, shouldPauseFunc) {
        var moreToDo;
        if (paused > 0) {
          leftovers += s;
          return true;
        }
        if (reentrant_invocations === 0) {
          if (leftovers) {
            s = leftovers + s;
            leftovers = "";
          }
          if (end) {
            s += "￿";
            input_complete = true;
          }
          chars = s;
          numchars = s.length;
          nextchar = 0;
          if (first_batch) {
            first_batch = false;
            if (chars.charCodeAt(0) === 65279) nextchar = 1;
          }
          reentrant_invocations++;
          moreToDo = scanChars(shouldPauseFunc);
          leftovers = chars.substring(nextchar, numchars);
          reentrant_invocations--;
        } else {
          reentrant_invocations++;
          saved_scanner_state.push(chars, numchars, nextchar);
          chars = s;
          numchars = s.length;
          nextchar = 0;
          scanChars();
          moreToDo = false;
          leftovers = chars.substring(nextchar, numchars);
          nextchar = saved_scanner_state.pop();
          numchars = saved_scanner_state.pop();
          chars = saved_scanner_state.pop();
          if (leftovers) {
            chars = leftovers + chars.substring(nextchar);
            numchars = chars.length;
            nextchar = 0;
            leftovers = "";
          }
          reentrant_invocations--;
        }
        return moreToDo;
      }
    };
    var doc = new Document2(true, address);
    doc._parser = htmlparser;
    doc._scripting_enabled = scripting_enabled;
    if (fragmentContext) {
      if (fragmentContext.ownerDocument._quirks) doc._quirks = true;
      if (fragmentContext.ownerDocument._limitedQuirks) doc._limitedQuirks = true;
      if (fragmentContext.namespaceURI === NAMESPACE.HTML) {
        switch (fragmentContext.localName) {
          case "title":
          case "textarea":
            tokenizer = rcdata_state;
            break;
          case "style":
          case "xmp":
          case "iframe":
          case "noembed":
          case "noframes":
          case "script":
          case "plaintext":
            tokenizer = plaintext_state;
            break;
        }
      }
      var root2 = doc.createElement("html");
      doc._appendChild(root2);
      stack.push(root2);
      if (fragmentContext instanceof impl2.HTMLTemplateElement) {
        templateInsertionModes.push(in_template_mode);
      }
      resetInsertionMode();
      for (var e = fragmentContext; e !== null; e = e.parentElement) {
        if (e instanceof impl2.HTMLFormElement) {
          form_element_pointer = e;
          break;
        }
      }
    }
    function scanChars(shouldPauseFunc) {
      var codepoint, s, pattern, eof;
      while (nextchar < numchars) {
        if (paused > 0 || shouldPauseFunc && shouldPauseFunc()) {
          return true;
        }
        switch (typeof tokenizer.lookahead) {
          case "undefined":
            codepoint = chars.charCodeAt(nextchar++);
            if (scanner_skip_newline) {
              scanner_skip_newline = false;
              if (codepoint === 10) {
                nextchar++;
                continue;
              }
            }
            switch (codepoint) {
              case 13:
                if (nextchar < numchars) {
                  if (chars.charCodeAt(nextchar) === 10) nextchar++;
                } else {
                  scanner_skip_newline = true;
                }
                tokenizer(10);
                break;
              case 65535:
                if (input_complete && nextchar === numchars) {
                  tokenizer(EOF);
                  break;
                }
              /* falls through */
              default:
                tokenizer(codepoint);
                break;
            }
            break;
          case "number":
            codepoint = chars.charCodeAt(nextchar);
            var n = tokenizer.lookahead;
            var needsString = true;
            if (n < 0) {
              needsString = false;
              n = -n;
            }
            if (n < numchars - nextchar) {
              s = needsString ? chars.substring(nextchar, nextchar + n) : null;
              eof = false;
            } else {
              if (input_complete) {
                s = needsString ? chars.substring(nextchar, numchars) : null;
                eof = true;
                if (codepoint === 65535 && nextchar === numchars - 1) codepoint = EOF;
              } else {
                return true;
              }
            }
            tokenizer(codepoint, s, eof);
            break;
          case "string":
            codepoint = chars.charCodeAt(nextchar);
            pattern = tokenizer.lookahead;
            var pos = chars.indexOf(pattern, nextchar);
            if (pos !== -1) {
              s = chars.substring(nextchar, pos + pattern.length);
              eof = false;
            } else {
              if (!input_complete) return true;
              s = chars.substring(nextchar, numchars);
              if (codepoint === 65535 && nextchar === numchars - 1) codepoint = EOF;
              eof = true;
            }
            tokenizer(codepoint, s, eof);
            break;
        }
      }
      return false;
    }
    function addAttribute(name, value) {
      for (var i = 0; i < attributes2.length; i++) {
        if (attributes2[i][0] === name) return;
      }
      if (value !== void 0) {
        attributes2.push([name, value]);
      } else {
        attributes2.push([name]);
      }
    }
    function handleSimpleAttribute() {
      SIMPLEATTR.lastIndex = nextchar - 1;
      var matched = SIMPLEATTR.exec(chars);
      if (!matched) throw new Error("should never happen");
      var name = matched[1];
      if (!name) return false;
      var value = matched[2];
      var len = value.length;
      switch (value[0]) {
        case '"':
        case "'":
          value = value.substring(1, len - 1);
          nextchar += matched[0].length - 1;
          tokenizer = after_attribute_value_quoted_state;
          break;
        default:
          tokenizer = before_attribute_name_state;
          nextchar += matched[0].length - 1;
          value = value.substring(0, len - 1);
          break;
      }
      for (var i = 0; i < attributes2.length; i++) {
        if (attributes2[i][0] === name) return true;
      }
      attributes2.push([name, value]);
      return true;
    }
    function beginTagName() {
      is_end_tag = false;
      tagnamebuf = "";
      attributes2.length = 0;
    }
    function beginEndTagName() {
      is_end_tag = true;
      tagnamebuf = "";
      attributes2.length = 0;
    }
    function beginTempBuf() {
      tempbuf.length = 0;
    }
    function beginAttrName() {
      attrnamebuf = "";
    }
    function beginAttrValue() {
      attrvaluebuf = "";
    }
    function beginComment() {
      commentbuf.length = 0;
    }
    function beginDoctype() {
      doctypenamebuf.length = 0;
      doctypepublicbuf = null;
      doctypesystembuf = null;
    }
    function beginDoctypePublicId() {
      doctypepublicbuf = [];
    }
    function beginDoctypeSystemId() {
      doctypesystembuf = [];
    }
    function forcequirks() {
      force_quirks = true;
    }
    function cdataAllowed() {
      return stack.top && stack.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
    }
    function appropriateEndTag(buf) {
      return lasttagname === buf;
    }
    function flushText() {
      if (textrun.length > 0) {
        var s = buf2str(textrun);
        textrun.length = 0;
        if (ignore_linefeed) {
          ignore_linefeed = false;
          if (s[0] === "\n") s = s.substring(1);
          if (s.length === 0) return;
        }
        insertToken(TEXT, s);
        textIncludesNUL = false;
      }
      ignore_linefeed = false;
    }
    function getMatchingChars(pattern) {
      pattern.lastIndex = nextchar - 1;
      var match = pattern.exec(chars);
      if (match && match.index === nextchar - 1) {
        match = match[0];
        nextchar += match.length - 1;
        if (input_complete && nextchar === numchars) {
          match = match.slice(0, -1);
          nextchar--;
        }
        return match;
      } else {
        throw new Error("should never happen");
      }
    }
    function emitCharsWhile(pattern) {
      pattern.lastIndex = nextchar - 1;
      var match = pattern.exec(chars)[0];
      if (!match) return false;
      emitCharString(match);
      nextchar += match.length - 1;
      return true;
    }
    function emitCharString(s) {
      if (textrun.length > 0) flushText();
      if (ignore_linefeed) {
        ignore_linefeed = false;
        if (s[0] === "\n") s = s.substring(1);
        if (s.length === 0) return;
      }
      insertToken(TEXT, s);
    }
    function emitTag() {
      if (is_end_tag) insertToken(ENDTAG, tagnamebuf);
      else {
        var tagname = tagnamebuf;
        tagnamebuf = "";
        lasttagname = tagname;
        insertToken(TAG, tagname, attributes2);
      }
    }
    function emitSimpleTag() {
      if (nextchar === numchars) {
        return false;
      }
      SIMPLETAG.lastIndex = nextchar;
      var matched = SIMPLETAG.exec(chars);
      if (!matched) throw new Error("should never happen");
      var tagname = matched[2];
      if (!tagname) return false;
      var endtag = matched[1];
      if (endtag) {
        nextchar += tagname.length + 2;
        insertToken(ENDTAG, tagname);
      } else {
        nextchar += tagname.length + 1;
        lasttagname = tagname;
        insertToken(TAG, tagname, NOATTRS);
      }
      return true;
    }
    function emitSelfClosingTag() {
      if (is_end_tag) insertToken(ENDTAG, tagnamebuf, null, true);
      else {
        insertToken(TAG, tagnamebuf, attributes2, true);
      }
    }
    function emitDoctype() {
      insertToken(DOCTYPE, buf2str(doctypenamebuf), doctypepublicbuf ? buf2str(doctypepublicbuf) : void 0, doctypesystembuf ? buf2str(doctypesystembuf) : void 0);
    }
    function emitEOF() {
      flushText();
      parser2(EOF);
      doc.modclock = 1;
    }
    var insertToken = htmlparser.insertToken = function insertToken2(t, value, arg3, arg4) {
      flushText();
      var current = stack.top;
      if (!current || current.namespaceURI === NAMESPACE.HTML) {
        parser2(t, value, arg3, arg4);
      } else {
        if (t !== TAG && t !== TEXT) {
          insertForeignToken(t, value, arg3, arg4);
        } else {
          if (isMathmlTextIntegrationPoint(current) && (t === TEXT || t === TAG && value !== "mglyph" && value !== "malignmark") || t === TAG && value === "svg" && current.namespaceURI === NAMESPACE.MATHML && current.localName === "annotation-xml" || isHTMLIntegrationPoint(current)) {
            text_integration_mode = true;
            parser2(t, value, arg3, arg4);
            text_integration_mode = false;
          } else {
            insertForeignToken(t, value, arg3, arg4);
          }
        }
      }
    };
    function insertComment(data) {
      var parent = stack.top;
      if (foster_parent_mode && isA(parent, tablesectionrowSet)) {
        fosterParent(function(doc2) {
          return doc2.createComment(data);
        });
      } else {
        if (parent instanceof impl2.HTMLTemplateElement) {
          parent = parent.content;
        }
        parent._appendChild(parent.ownerDocument.createComment(data));
      }
    }
    function insertText(s) {
      var parent = stack.top;
      if (foster_parent_mode && isA(parent, tablesectionrowSet)) {
        fosterParent(function(doc2) {
          return doc2.createTextNode(s);
        });
      } else {
        if (parent instanceof impl2.HTMLTemplateElement) {
          parent = parent.content;
        }
        var lastChild = parent.lastChild;
        if (lastChild && lastChild.nodeType === Node2.TEXT_NODE) {
          lastChild.appendData(s);
        } else {
          parent._appendChild(parent.ownerDocument.createTextNode(s));
        }
      }
    }
    function createHTMLElt(doc2, name, attrs) {
      var elt = html.createElement(doc2, name, null);
      if (attrs) {
        for (var i = 0, n = attrs.length; i < n; i++) {
          elt._setAttribute(attrs[i][0], attrs[i][1]);
        }
      }
      return elt;
    }
    var foster_parent_mode = false;
    function insertHTMLElement(name, attrs) {
      var elt = insertElement(function(doc2) {
        return createHTMLElt(doc2, name, attrs);
      });
      if (isA(elt, formassociatedSet)) {
        elt._form = form_element_pointer;
      }
      return elt;
    }
    function insertElement(eltFunc) {
      var elt;
      if (foster_parent_mode && isA(stack.top, tablesectionrowSet)) {
        elt = fosterParent(eltFunc);
      } else if (stack.top instanceof impl2.HTMLTemplateElement) {
        elt = eltFunc(stack.top.content.ownerDocument);
        stack.top.content._appendChild(elt);
      } else {
        elt = eltFunc(stack.top.ownerDocument);
        stack.top._appendChild(elt);
      }
      stack.push(elt);
      return elt;
    }
    function insertForeignElement(name, attrs, ns) {
      return insertElement(function(doc2) {
        var elt = doc2._createElementNS(name, ns, null);
        if (attrs) {
          for (var i = 0, n = attrs.length; i < n; i++) {
            var attr = attrs[i];
            if (attr.length === 2) elt._setAttribute(attr[0], attr[1]);
            else {
              elt._setAttributeNS(attr[2], attr[0], attr[1]);
            }
          }
        }
        return elt;
      });
    }
    function lastElementOfType(type) {
      for (var i = stack.elements.length - 1; i >= 0; i--) {
        if (stack.elements[i] instanceof type) {
          return i;
        }
      }
      return -1;
    }
    function fosterParent(eltFunc) {
      var parent, before, lastTable = -1, lastTemplate = -1, elt;
      lastTable = lastElementOfType(impl2.HTMLTableElement);
      lastTemplate = lastElementOfType(impl2.HTMLTemplateElement);
      if (lastTemplate >= 0 && (lastTable < 0 || lastTemplate > lastTable)) {
        parent = stack.elements[lastTemplate];
      } else if (lastTable >= 0) {
        parent = stack.elements[lastTable].parentNode;
        if (parent) {
          before = stack.elements[lastTable];
        } else {
          parent = stack.elements[lastTable - 1];
        }
      }
      if (!parent) parent = stack.elements[0];
      if (parent instanceof impl2.HTMLTemplateElement) {
        parent = parent.content;
      }
      elt = eltFunc(parent.ownerDocument);
      if (elt.nodeType === Node2.TEXT_NODE) {
        var prev;
        if (before) prev = before.previousSibling;
        else prev = parent.lastChild;
        if (prev && prev.nodeType === Node2.TEXT_NODE) {
          prev.appendData(elt.data);
          return elt;
        }
      }
      if (before) parent.insertBefore(elt, before);
      else parent._appendChild(elt);
      return elt;
    }
    function resetInsertionMode() {
      var last = false;
      for (var i = stack.elements.length - 1; i >= 0; i--) {
        var node2 = stack.elements[i];
        if (i === 0) {
          last = true;
          if (fragment) {
            node2 = fragmentContext;
          }
        }
        if (node2.namespaceURI === NAMESPACE.HTML) {
          var tag = node2.localName;
          switch (tag) {
            case "select":
              for (var j = i; j > 0; ) {
                var ancestor = stack.elements[--j];
                if (ancestor instanceof impl2.HTMLTemplateElement) {
                  break;
                } else if (ancestor instanceof impl2.HTMLTableElement) {
                  parser2 = in_select_in_table_mode;
                  return;
                }
              }
              parser2 = in_select_mode;
              return;
            case "tr":
              parser2 = in_row_mode;
              return;
            case "tbody":
            case "tfoot":
            case "thead":
              parser2 = in_table_body_mode;
              return;
            case "caption":
              parser2 = in_caption_mode;
              return;
            case "colgroup":
              parser2 = in_column_group_mode;
              return;
            case "table":
              parser2 = in_table_mode;
              return;
            case "template":
              parser2 = templateInsertionModes[templateInsertionModes.length - 1];
              return;
            case "body":
              parser2 = in_body_mode;
              return;
            case "frameset":
              parser2 = in_frameset_mode;
              return;
            case "html":
              if (head_element_pointer === null) {
                parser2 = before_head_mode;
              } else {
                parser2 = after_head_mode;
              }
              return;
            default:
              if (!last) {
                if (tag === "head") {
                  parser2 = in_head_mode;
                  return;
                }
                if (tag === "td" || tag === "th") {
                  parser2 = in_cell_mode;
                  return;
                }
              }
          }
        }
        if (last) {
          parser2 = in_body_mode;
          return;
        }
      }
    }
    function parseRawText(name, attrs) {
      insertHTMLElement(name, attrs);
      tokenizer = rawtext_state;
      originalInsertionMode = parser2;
      parser2 = text_mode;
    }
    function parseRCDATA(name, attrs) {
      insertHTMLElement(name, attrs);
      tokenizer = rcdata_state;
      originalInsertionMode = parser2;
      parser2 = text_mode;
    }
    function afeclone(doc2, i) {
      return {
        elt: createHTMLElt(doc2, afe.list[i].localName, afe.attrs[i]),
        attrs: afe.attrs[i]
      };
    }
    function afereconstruct() {
      if (afe.list.length === 0) return;
      var entry = afe.list[afe.list.length - 1];
      if (entry === afe.MARKER) return;
      if (stack.elements.lastIndexOf(entry) !== -1) return;
      for (var i = afe.list.length - 2; i >= 0; i--) {
        entry = afe.list[i];
        if (entry === afe.MARKER) break;
        if (stack.elements.lastIndexOf(entry) !== -1) break;
      }
      for (i = i + 1; i < afe.list.length; i++) {
        var newelt = insertElement(function(doc2) {
          return afeclone(doc2, i).elt;
        });
        afe.list[i] = newelt;
      }
    }
    var BOOKMARK = {
      localName: "BM"
    };
    function adoptionAgency(tag) {
      if (isA(stack.top, tag) && afe.indexOf(stack.top) === -1) {
        stack.pop();
        return true;
      }
      var outer = 0;
      while (outer < 8) {
        outer++;
        var fmtelt = afe.findElementByTag(tag);
        if (!fmtelt) {
          return false;
        }
        var index2 = stack.elements.lastIndexOf(fmtelt);
        if (index2 === -1) {
          afe.remove(fmtelt);
          return true;
        }
        if (!stack.elementInScope(fmtelt)) {
          return true;
        }
        var furthestblock = null, furthestblockindex;
        for (var i = index2 + 1; i < stack.elements.length; i++) {
          if (isA(stack.elements[i], specialSet)) {
            furthestblock = stack.elements[i];
            furthestblockindex = i;
            break;
          }
        }
        if (!furthestblock) {
          stack.popElement(fmtelt);
          afe.remove(fmtelt);
          return true;
        } else {
          var ancestor = stack.elements[index2 - 1];
          afe.insertAfter(fmtelt, BOOKMARK);
          var node2 = furthestblock;
          var lastnode = furthestblock;
          var nodeindex = furthestblockindex;
          var nodeafeindex;
          var inner = 0;
          while (true) {
            inner++;
            node2 = stack.elements[--nodeindex];
            if (node2 === fmtelt) break;
            nodeafeindex = afe.indexOf(node2);
            if (inner > 3 && nodeafeindex !== -1) {
              afe.remove(node2);
              nodeafeindex = -1;
            }
            if (nodeafeindex === -1) {
              stack.removeElement(node2);
              continue;
            }
            var newelt = afeclone(ancestor.ownerDocument, nodeafeindex);
            afe.replace(node2, newelt.elt, newelt.attrs);
            stack.elements[nodeindex] = newelt.elt;
            node2 = newelt.elt;
            if (lastnode === furthestblock) {
              afe.remove(BOOKMARK);
              afe.insertAfter(newelt.elt, BOOKMARK);
            }
            node2._appendChild(lastnode);
            lastnode = node2;
          }
          if (foster_parent_mode && isA(ancestor, tablesectionrowSet)) {
            fosterParent(function() {
              return lastnode;
            });
          } else if (ancestor instanceof impl2.HTMLTemplateElement) {
            ancestor.content._appendChild(lastnode);
          } else {
            ancestor._appendChild(lastnode);
          }
          var newelt2 = afeclone(furthestblock.ownerDocument, afe.indexOf(fmtelt));
          while (furthestblock.hasChildNodes()) {
            newelt2.elt._appendChild(furthestblock.firstChild);
          }
          furthestblock._appendChild(newelt2.elt);
          afe.remove(fmtelt);
          afe.replace(BOOKMARK, newelt2.elt, newelt2.attrs);
          stack.removeElement(fmtelt);
          var pos = stack.elements.lastIndexOf(furthestblock);
          stack.elements.splice(pos + 1, 0, newelt2.elt);
        }
      }
      return true;
    }
    function handleScriptEnd() {
      stack.pop();
      parser2 = originalInsertionMode;
      return;
    }
    function stopParsing() {
      delete doc._parser;
      stack.elements.length = 0;
      if (doc.defaultView) {
        doc.defaultView.dispatchEvent(new impl2.Event("load", {}));
      }
    }
    function reconsume(c, new_state) {
      tokenizer = new_state;
      nextchar--;
    }
    function data_state(c) {
      switch (c) {
        case 38:
          return_state = data_state;
          tokenizer = character_reference_state;
          break;
        case 60:
          if (emitSimpleTag())
            break;
          tokenizer = tag_open_state;
          break;
        case 0:
          textrun.push(c);
          textIncludesNUL = true;
          break;
        case -1:
          emitEOF();
          break;
        default:
          emitCharsWhile(DATATEXT) || textrun.push(c);
          break;
      }
    }
    function rcdata_state(c) {
      switch (c) {
        case 38:
          return_state = rcdata_state;
          tokenizer = character_reference_state;
          break;
        case 60:
          tokenizer = rcdata_less_than_sign_state;
          break;
        case 0:
          textrun.push(65533);
          textIncludesNUL = true;
          break;
        case -1:
          emitEOF();
          break;
        default:
          textrun.push(c);
          break;
      }
    }
    function rawtext_state(c) {
      switch (c) {
        case 60:
          tokenizer = rawtext_less_than_sign_state;
          break;
        case 0:
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          emitCharsWhile(RAWTEXT) || textrun.push(c);
          break;
      }
    }
    function script_data_state(c) {
      switch (c) {
        case 60:
          tokenizer = script_data_less_than_sign_state;
          break;
        case 0:
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          emitCharsWhile(RAWTEXT) || textrun.push(c);
          break;
      }
    }
    function plaintext_state(c) {
      switch (c) {
        case 0:
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          emitCharsWhile(PLAINTEXT) || textrun.push(c);
          break;
      }
    }
    function tag_open_state(c) {
      switch (c) {
        case 33:
          tokenizer = markup_declaration_open_state;
          break;
        case 47:
          tokenizer = end_tag_open_state;
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          beginTagName();
          reconsume(c, tag_name_state);
          break;
        case 63:
          reconsume(c, bogus_comment_state);
          break;
        default:
          textrun.push(60);
          reconsume(c, data_state);
          break;
      }
    }
    function end_tag_open_state(c) {
      switch (c) {
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          beginEndTagName();
          reconsume(c, tag_name_state);
          break;
        case 62:
          tokenizer = data_state;
          break;
        case -1:
          textrun.push(60);
          textrun.push(47);
          emitEOF();
          break;
        default:
          reconsume(c, bogus_comment_state);
          break;
      }
    }
    function tag_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          tokenizer = before_attribute_name_state;
          break;
        case 47:
          tokenizer = self_closing_start_tag_state;
          break;
        case 62:
          tokenizer = data_state;
          emitTag();
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          tagnamebuf += String.fromCharCode(c + 32);
          break;
        case 0:
          tagnamebuf += String.fromCharCode(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case -1:
          emitEOF();
          break;
        default:
          tagnamebuf += getMatchingChars(TAGNAME);
          break;
      }
    }
    function rcdata_less_than_sign_state(c) {
      if (c === 47) {
        beginTempBuf();
        tokenizer = rcdata_end_tag_open_state;
      } else {
        textrun.push(60);
        reconsume(c, rcdata_state);
      }
    }
    function rcdata_end_tag_open_state(c) {
      switch (c) {
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          beginEndTagName();
          reconsume(c, rcdata_end_tag_name_state);
          break;
        default:
          textrun.push(60);
          textrun.push(47);
          reconsume(c, rcdata_state);
          break;
      }
    }
    function rcdata_end_tag_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = before_attribute_name_state;
            return;
          }
          break;
        case 47:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = self_closing_start_tag_state;
            return;
          }
          break;
        case 62:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = data_state;
            emitTag();
            return;
          }
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          tagnamebuf += String.fromCharCode(c + 32);
          tempbuf.push(c);
          return;
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          tagnamebuf += String.fromCharCode(c);
          tempbuf.push(c);
          return;
      }
      textrun.push(60);
      textrun.push(47);
      pushAll(textrun, tempbuf);
      reconsume(c, rcdata_state);
    }
    function rawtext_less_than_sign_state(c) {
      if (c === 47) {
        beginTempBuf();
        tokenizer = rawtext_end_tag_open_state;
      } else {
        textrun.push(60);
        reconsume(c, rawtext_state);
      }
    }
    function rawtext_end_tag_open_state(c) {
      switch (c) {
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          beginEndTagName();
          reconsume(c, rawtext_end_tag_name_state);
          break;
        default:
          textrun.push(60);
          textrun.push(47);
          reconsume(c, rawtext_state);
          break;
      }
    }
    function rawtext_end_tag_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = before_attribute_name_state;
            return;
          }
          break;
        case 47:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = self_closing_start_tag_state;
            return;
          }
          break;
        case 62:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = data_state;
            emitTag();
            return;
          }
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          tagnamebuf += String.fromCharCode(c + 32);
          tempbuf.push(c);
          return;
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          tagnamebuf += String.fromCharCode(c);
          tempbuf.push(c);
          return;
      }
      textrun.push(60);
      textrun.push(47);
      pushAll(textrun, tempbuf);
      reconsume(c, rawtext_state);
    }
    function script_data_less_than_sign_state(c) {
      switch (c) {
        case 47:
          beginTempBuf();
          tokenizer = script_data_end_tag_open_state;
          break;
        case 33:
          tokenizer = script_data_escape_start_state;
          textrun.push(60);
          textrun.push(33);
          break;
        default:
          textrun.push(60);
          reconsume(c, script_data_state);
          break;
      }
    }
    function script_data_end_tag_open_state(c) {
      switch (c) {
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          beginEndTagName();
          reconsume(c, script_data_end_tag_name_state);
          break;
        default:
          textrun.push(60);
          textrun.push(47);
          reconsume(c, script_data_state);
          break;
      }
    }
    function script_data_end_tag_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = before_attribute_name_state;
            return;
          }
          break;
        case 47:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = self_closing_start_tag_state;
            return;
          }
          break;
        case 62:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = data_state;
            emitTag();
            return;
          }
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          tagnamebuf += String.fromCharCode(c + 32);
          tempbuf.push(c);
          return;
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          tagnamebuf += String.fromCharCode(c);
          tempbuf.push(c);
          return;
      }
      textrun.push(60);
      textrun.push(47);
      pushAll(textrun, tempbuf);
      reconsume(c, script_data_state);
    }
    function script_data_escape_start_state(c) {
      if (c === 45) {
        tokenizer = script_data_escape_start_dash_state;
        textrun.push(45);
      } else {
        reconsume(c, script_data_state);
      }
    }
    function script_data_escape_start_dash_state(c) {
      if (c === 45) {
        tokenizer = script_data_escaped_dash_dash_state;
        textrun.push(45);
      } else {
        reconsume(c, script_data_state);
      }
    }
    function script_data_escaped_state(c) {
      switch (c) {
        case 45:
          tokenizer = script_data_escaped_dash_state;
          textrun.push(45);
          break;
        case 60:
          tokenizer = script_data_escaped_less_than_sign_state;
          break;
        case 0:
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          textrun.push(c);
          break;
      }
    }
    function script_data_escaped_dash_state(c) {
      switch (c) {
        case 45:
          tokenizer = script_data_escaped_dash_dash_state;
          textrun.push(45);
          break;
        case 60:
          tokenizer = script_data_escaped_less_than_sign_state;
          break;
        case 0:
          tokenizer = script_data_escaped_state;
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          tokenizer = script_data_escaped_state;
          textrun.push(c);
          break;
      }
    }
    function script_data_escaped_dash_dash_state(c) {
      switch (c) {
        case 45:
          textrun.push(45);
          break;
        case 60:
          tokenizer = script_data_escaped_less_than_sign_state;
          break;
        case 62:
          tokenizer = script_data_state;
          textrun.push(62);
          break;
        case 0:
          tokenizer = script_data_escaped_state;
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          tokenizer = script_data_escaped_state;
          textrun.push(c);
          break;
      }
    }
    function script_data_escaped_less_than_sign_state(c) {
      switch (c) {
        case 47:
          beginTempBuf();
          tokenizer = script_data_escaped_end_tag_open_state;
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          beginTempBuf();
          textrun.push(60);
          reconsume(c, script_data_double_escape_start_state);
          break;
        default:
          textrun.push(60);
          reconsume(c, script_data_escaped_state);
          break;
      }
    }
    function script_data_escaped_end_tag_open_state(c) {
      switch (c) {
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          beginEndTagName();
          reconsume(c, script_data_escaped_end_tag_name_state);
          break;
        default:
          textrun.push(60);
          textrun.push(47);
          reconsume(c, script_data_escaped_state);
          break;
      }
    }
    function script_data_escaped_end_tag_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = before_attribute_name_state;
            return;
          }
          break;
        case 47:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = self_closing_start_tag_state;
            return;
          }
          break;
        case 62:
          if (appropriateEndTag(tagnamebuf)) {
            tokenizer = data_state;
            emitTag();
            return;
          }
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          tagnamebuf += String.fromCharCode(c + 32);
          tempbuf.push(c);
          return;
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          tagnamebuf += String.fromCharCode(c);
          tempbuf.push(c);
          return;
      }
      textrun.push(60);
      textrun.push(47);
      pushAll(textrun, tempbuf);
      reconsume(c, script_data_escaped_state);
    }
    function script_data_double_escape_start_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
        // SPACE
        case 47:
        // SOLIDUS
        case 62:
          if (buf2str(tempbuf) === "script") {
            tokenizer = script_data_double_escaped_state;
          } else {
            tokenizer = script_data_escaped_state;
          }
          textrun.push(c);
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          tempbuf.push(c + 32);
          textrun.push(c);
          break;
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          tempbuf.push(c);
          textrun.push(c);
          break;
        default:
          reconsume(c, script_data_escaped_state);
          break;
      }
    }
    function script_data_double_escaped_state(c) {
      switch (c) {
        case 45:
          tokenizer = script_data_double_escaped_dash_state;
          textrun.push(45);
          break;
        case 60:
          tokenizer = script_data_double_escaped_less_than_sign_state;
          textrun.push(60);
          break;
        case 0:
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          textrun.push(c);
          break;
      }
    }
    function script_data_double_escaped_dash_state(c) {
      switch (c) {
        case 45:
          tokenizer = script_data_double_escaped_dash_dash_state;
          textrun.push(45);
          break;
        case 60:
          tokenizer = script_data_double_escaped_less_than_sign_state;
          textrun.push(60);
          break;
        case 0:
          tokenizer = script_data_double_escaped_state;
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          tokenizer = script_data_double_escaped_state;
          textrun.push(c);
          break;
      }
    }
    function script_data_double_escaped_dash_dash_state(c) {
      switch (c) {
        case 45:
          textrun.push(45);
          break;
        case 60:
          tokenizer = script_data_double_escaped_less_than_sign_state;
          textrun.push(60);
          break;
        case 62:
          tokenizer = script_data_state;
          textrun.push(62);
          break;
        case 0:
          tokenizer = script_data_double_escaped_state;
          textrun.push(65533);
          break;
        case -1:
          emitEOF();
          break;
        default:
          tokenizer = script_data_double_escaped_state;
          textrun.push(c);
          break;
      }
    }
    function script_data_double_escaped_less_than_sign_state(c) {
      if (c === 47) {
        beginTempBuf();
        tokenizer = script_data_double_escape_end_state;
        textrun.push(47);
      } else {
        reconsume(c, script_data_double_escaped_state);
      }
    }
    function script_data_double_escape_end_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
        // SPACE
        case 47:
        // SOLIDUS
        case 62:
          if (buf2str(tempbuf) === "script") {
            tokenizer = script_data_escaped_state;
          } else {
            tokenizer = script_data_double_escaped_state;
          }
          textrun.push(c);
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          tempbuf.push(c + 32);
          textrun.push(c);
          break;
        case 97:
        // [a-z]
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          tempbuf.push(c);
          textrun.push(c);
          break;
        default:
          reconsume(c, script_data_double_escaped_state);
          break;
      }
    }
    function before_attribute_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        // For SOLIDUS, GREATER-THAN SIGN, and EOF, spec says "reconsume in
        // the after attribute name state", but in our implementation that
        // state always has an active attribute in attrnamebuf.  Just clone
        // the rules here, without the addAttribute business.
        case 47:
          tokenizer = self_closing_start_tag_state;
          break;
        case 62:
          tokenizer = data_state;
          emitTag();
          break;
        case -1:
          emitEOF();
          break;
        case 61:
          beginAttrName();
          attrnamebuf += String.fromCharCode(c);
          tokenizer = attribute_name_state;
          break;
        default:
          if (handleSimpleAttribute()) break;
          beginAttrName();
          reconsume(c, attribute_name_state);
          break;
      }
    }
    function attribute_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
        // SPACE
        case 47:
        // SOLIDUS
        case 62:
        // GREATER-THAN SIGN
        case -1:
          reconsume(c, after_attribute_name_state);
          break;
        case 61:
          tokenizer = before_attribute_value_state;
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          attrnamebuf += String.fromCharCode(c + 32);
          break;
        case 0:
          attrnamebuf += String.fromCharCode(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case 34:
        // QUOTATION MARK
        case 39:
        // APOSTROPHE
        case 60:
        // LESS-THAN SIGN
        /* falls through */
        default:
          attrnamebuf += getMatchingChars(ATTRNAME);
          break;
      }
    }
    function after_attribute_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        case 47:
          addAttribute(attrnamebuf);
          tokenizer = self_closing_start_tag_state;
          break;
        case 61:
          tokenizer = before_attribute_value_state;
          break;
        case 62:
          tokenizer = data_state;
          addAttribute(attrnamebuf);
          emitTag();
          break;
        case -1:
          addAttribute(attrnamebuf);
          emitEOF();
          break;
        default:
          addAttribute(attrnamebuf);
          beginAttrName();
          reconsume(c, attribute_name_state);
          break;
      }
    }
    function before_attribute_value_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        case 34:
          beginAttrValue();
          tokenizer = attribute_value_double_quoted_state;
          break;
        case 39:
          beginAttrValue();
          tokenizer = attribute_value_single_quoted_state;
          break;
        case 62:
        // GREATER-THAN SIGN
        /* falls through */
        default:
          beginAttrValue();
          reconsume(c, attribute_value_unquoted_state);
          break;
      }
    }
    function attribute_value_double_quoted_state(c) {
      switch (c) {
        case 34:
          addAttribute(attrnamebuf, attrvaluebuf);
          tokenizer = after_attribute_value_quoted_state;
          break;
        case 38:
          return_state = attribute_value_double_quoted_state;
          tokenizer = character_reference_state;
          break;
        case 0:
          attrvaluebuf += String.fromCharCode(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case -1:
          emitEOF();
          break;
        case 10:
          attrvaluebuf += String.fromCharCode(c);
          break;
        default:
          attrvaluebuf += getMatchingChars(DBLQUOTEATTRVAL);
          break;
      }
    }
    function attribute_value_single_quoted_state(c) {
      switch (c) {
        case 39:
          addAttribute(attrnamebuf, attrvaluebuf);
          tokenizer = after_attribute_value_quoted_state;
          break;
        case 38:
          return_state = attribute_value_single_quoted_state;
          tokenizer = character_reference_state;
          break;
        case 0:
          attrvaluebuf += String.fromCharCode(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case -1:
          emitEOF();
          break;
        case 10:
          attrvaluebuf += String.fromCharCode(c);
          break;
        default:
          attrvaluebuf += getMatchingChars(SINGLEQUOTEATTRVAL);
          break;
      }
    }
    function attribute_value_unquoted_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          addAttribute(attrnamebuf, attrvaluebuf);
          tokenizer = before_attribute_name_state;
          break;
        case 38:
          return_state = attribute_value_unquoted_state;
          tokenizer = character_reference_state;
          break;
        case 62:
          addAttribute(attrnamebuf, attrvaluebuf);
          tokenizer = data_state;
          emitTag();
          break;
        case 0:
          attrvaluebuf += String.fromCharCode(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case -1:
          nextchar--;
          tokenizer = data_state;
          break;
        case 34:
        // QUOTATION MARK
        case 39:
        // APOSTROPHE
        case 60:
        // LESS-THAN SIGN
        case 61:
        // EQUALS SIGN
        case 96:
        // GRAVE ACCENT
        /* falls through */
        default:
          attrvaluebuf += getMatchingChars(UNQUOTEDATTRVAL);
          break;
      }
    }
    function after_attribute_value_quoted_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          tokenizer = before_attribute_name_state;
          break;
        case 47:
          tokenizer = self_closing_start_tag_state;
          break;
        case 62:
          tokenizer = data_state;
          emitTag();
          break;
        case -1:
          emitEOF();
          break;
        default:
          reconsume(c, before_attribute_name_state);
          break;
      }
    }
    function self_closing_start_tag_state(c) {
      switch (c) {
        case 62:
          tokenizer = data_state;
          emitSelfClosingTag();
          break;
        case -1:
          emitEOF();
          break;
        default:
          reconsume(c, before_attribute_name_state);
          break;
      }
    }
    function bogus_comment_state(c, lookahead, eof) {
      var len = lookahead.length;
      if (eof) {
        nextchar += len - 1;
      } else {
        nextchar += len;
      }
      var comment2 = lookahead.substring(0, len - 1);
      comment2 = comment2.replace(/\u0000/g, "�");
      comment2 = comment2.replace(/\u000D\u000A/g, "\n");
      comment2 = comment2.replace(/\u000D/g, "\n");
      insertToken(COMMENT, comment2);
      tokenizer = data_state;
    }
    bogus_comment_state.lookahead = ">";
    function markup_declaration_open_state(c, lookahead, eof) {
      if (lookahead[0] === "-" && lookahead[1] === "-") {
        nextchar += 2;
        beginComment();
        tokenizer = comment_start_state;
        return;
      }
      if (lookahead.toUpperCase() === "DOCTYPE") {
        nextchar += 7;
        tokenizer = doctype_state;
      } else if (lookahead === "[CDATA[" && cdataAllowed()) {
        nextchar += 7;
        tokenizer = cdata_section_state;
      } else {
        tokenizer = bogus_comment_state;
      }
    }
    markup_declaration_open_state.lookahead = 7;
    function comment_start_state(c) {
      beginComment();
      switch (c) {
        case 45:
          tokenizer = comment_start_dash_state;
          break;
        case 62:
          tokenizer = data_state;
          insertToken(COMMENT, buf2str(commentbuf));
          break;
        /* see comment in comment end state */
        default:
          reconsume(c, comment_state);
          break;
      }
    }
    function comment_start_dash_state(c) {
      switch (c) {
        case 45:
          tokenizer = comment_end_state;
          break;
        case 62:
          tokenizer = data_state;
          insertToken(COMMENT, buf2str(commentbuf));
          break;
        case -1:
          insertToken(COMMENT, buf2str(commentbuf));
          emitEOF();
          break;
        /* see comment in comment end state */
        default:
          commentbuf.push(
            45
            /* HYPHEN-MINUS */
          );
          reconsume(c, comment_state);
          break;
      }
    }
    function comment_state(c) {
      switch (c) {
        case 60:
          commentbuf.push(c);
          tokenizer = comment_less_than_sign_state;
          break;
        case 45:
          tokenizer = comment_end_dash_state;
          break;
        case 0:
          commentbuf.push(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case -1:
          insertToken(COMMENT, buf2str(commentbuf));
          emitEOF();
          break;
        /* see comment in comment end state */
        default:
          commentbuf.push(c);
          break;
      }
    }
    function comment_less_than_sign_state(c) {
      switch (c) {
        case 33:
          commentbuf.push(c);
          tokenizer = comment_less_than_sign_bang_state;
          break;
        case 60:
          commentbuf.push(c);
          break;
        default:
          reconsume(c, comment_state);
          break;
      }
    }
    function comment_less_than_sign_bang_state(c) {
      switch (c) {
        case 45:
          tokenizer = comment_less_than_sign_bang_dash_state;
          break;
        default:
          reconsume(c, comment_state);
          break;
      }
    }
    function comment_less_than_sign_bang_dash_state(c) {
      switch (c) {
        case 45:
          tokenizer = comment_less_than_sign_bang_dash_dash_state;
          break;
        default:
          reconsume(c, comment_end_dash_state);
          break;
      }
    }
    function comment_less_than_sign_bang_dash_dash_state(c) {
      switch (c) {
        case 62:
        // GREATER-THAN SIGN
        case -1:
          reconsume(c, comment_end_state);
          break;
        default:
          reconsume(c, comment_end_state);
          break;
      }
    }
    function comment_end_dash_state(c) {
      switch (c) {
        case 45:
          tokenizer = comment_end_state;
          break;
        case -1:
          insertToken(COMMENT, buf2str(commentbuf));
          emitEOF();
          break;
        /* see comment in comment end state */
        default:
          commentbuf.push(
            45
            /* HYPHEN-MINUS */
          );
          reconsume(c, comment_state);
          break;
      }
    }
    function comment_end_state(c) {
      switch (c) {
        case 62:
          tokenizer = data_state;
          insertToken(COMMENT, buf2str(commentbuf));
          break;
        case 33:
          tokenizer = comment_end_bang_state;
          break;
        case 45:
          commentbuf.push(45);
          break;
        case -1:
          insertToken(COMMENT, buf2str(commentbuf));
          emitEOF();
          break;
        /* For security reasons: otherwise, hostile user could put a script in a comment e.g. in a blog comment and then DOS the server so that the end tag isn't read, and then the commented script tag would be treated as live code */
        default:
          commentbuf.push(45);
          commentbuf.push(45);
          reconsume(c, comment_state);
          break;
      }
    }
    function comment_end_bang_state(c) {
      switch (c) {
        case 45:
          commentbuf.push(45);
          commentbuf.push(45);
          commentbuf.push(33);
          tokenizer = comment_end_dash_state;
          break;
        case 62:
          tokenizer = data_state;
          insertToken(COMMENT, buf2str(commentbuf));
          break;
        case -1:
          insertToken(COMMENT, buf2str(commentbuf));
          emitEOF();
          break;
        /* see comment in comment end state */
        default:
          commentbuf.push(45);
          commentbuf.push(45);
          commentbuf.push(33);
          reconsume(c, comment_state);
          break;
      }
    }
    function doctype_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          tokenizer = before_doctype_name_state;
          break;
        case -1:
          beginDoctype();
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          reconsume(c, before_doctype_name_state);
          break;
      }
    }
    function before_doctype_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          beginDoctype();
          doctypenamebuf.push(c + 32);
          tokenizer = doctype_name_state;
          break;
        case 0:
          beginDoctype();
          doctypenamebuf.push(65533);
          tokenizer = doctype_name_state;
          break;
        case 62:
          beginDoctype();
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          beginDoctype();
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          beginDoctype();
          doctypenamebuf.push(c);
          tokenizer = doctype_name_state;
          break;
      }
    }
    function doctype_name_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          tokenizer = after_doctype_name_state;
          break;
        case 62:
          tokenizer = data_state;
          emitDoctype();
          break;
        case 65:
        // [A-Z]
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
          doctypenamebuf.push(c + 32);
          break;
        case 0:
          doctypenamebuf.push(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          doctypenamebuf.push(c);
          break;
      }
    }
    function after_doctype_name_state(c, lookahead, eof) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          nextchar += 1;
          break;
        case 62:
          tokenizer = data_state;
          nextchar += 1;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          lookahead = lookahead.toUpperCase();
          if (lookahead === "PUBLIC") {
            nextchar += 6;
            tokenizer = after_doctype_public_keyword_state;
          } else if (lookahead === "SYSTEM") {
            nextchar += 6;
            tokenizer = after_doctype_system_keyword_state;
          } else {
            forcequirks();
            tokenizer = bogus_doctype_state;
          }
          break;
      }
    }
    after_doctype_name_state.lookahead = 6;
    function after_doctype_public_keyword_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          tokenizer = before_doctype_public_identifier_state;
          break;
        case 34:
          beginDoctypePublicId();
          tokenizer = doctype_public_identifier_double_quoted_state;
          break;
        case 39:
          beginDoctypePublicId();
          tokenizer = doctype_public_identifier_single_quoted_state;
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          forcequirks();
          tokenizer = bogus_doctype_state;
          break;
      }
    }
    function before_doctype_public_identifier_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        case 34:
          beginDoctypePublicId();
          tokenizer = doctype_public_identifier_double_quoted_state;
          break;
        case 39:
          beginDoctypePublicId();
          tokenizer = doctype_public_identifier_single_quoted_state;
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          forcequirks();
          tokenizer = bogus_doctype_state;
          break;
      }
    }
    function doctype_public_identifier_double_quoted_state(c) {
      switch (c) {
        case 34:
          tokenizer = after_doctype_public_identifier_state;
          break;
        case 0:
          doctypepublicbuf.push(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          doctypepublicbuf.push(c);
          break;
      }
    }
    function doctype_public_identifier_single_quoted_state(c) {
      switch (c) {
        case 39:
          tokenizer = after_doctype_public_identifier_state;
          break;
        case 0:
          doctypepublicbuf.push(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          doctypepublicbuf.push(c);
          break;
      }
    }
    function after_doctype_public_identifier_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          tokenizer = between_doctype_public_and_system_identifiers_state;
          break;
        case 62:
          tokenizer = data_state;
          emitDoctype();
          break;
        case 34:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_double_quoted_state;
          break;
        case 39:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_single_quoted_state;
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          forcequirks();
          tokenizer = bogus_doctype_state;
          break;
      }
    }
    function between_doctype_public_and_system_identifiers_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        case 62:
          tokenizer = data_state;
          emitDoctype();
          break;
        case 34:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_double_quoted_state;
          break;
        case 39:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_single_quoted_state;
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          forcequirks();
          tokenizer = bogus_doctype_state;
          break;
      }
    }
    function after_doctype_system_keyword_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          tokenizer = before_doctype_system_identifier_state;
          break;
        case 34:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_double_quoted_state;
          break;
        case 39:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_single_quoted_state;
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          forcequirks();
          tokenizer = bogus_doctype_state;
          break;
      }
    }
    function before_doctype_system_identifier_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        case 34:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_double_quoted_state;
          break;
        case 39:
          beginDoctypeSystemId();
          tokenizer = doctype_system_identifier_single_quoted_state;
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          forcequirks();
          tokenizer = bogus_doctype_state;
          break;
      }
    }
    function doctype_system_identifier_double_quoted_state(c) {
      switch (c) {
        case 34:
          tokenizer = after_doctype_system_identifier_state;
          break;
        case 0:
          doctypesystembuf.push(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          doctypesystembuf.push(c);
          break;
      }
    }
    function doctype_system_identifier_single_quoted_state(c) {
      switch (c) {
        case 39:
          tokenizer = after_doctype_system_identifier_state;
          break;
        case 0:
          doctypesystembuf.push(
            65533
            /* REPLACEMENT CHARACTER */
          );
          break;
        case 62:
          forcequirks();
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          doctypesystembuf.push(c);
          break;
      }
    }
    function after_doctype_system_identifier_state(c) {
      switch (c) {
        case 9:
        // CHARACTER TABULATION (tab)
        case 10:
        // LINE FEED (LF)
        case 12:
        // FORM FEED (FF)
        case 32:
          break;
        case 62:
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          forcequirks();
          emitDoctype();
          emitEOF();
          break;
        default:
          tokenizer = bogus_doctype_state;
          break;
      }
    }
    function bogus_doctype_state(c) {
      switch (c) {
        case 62:
          tokenizer = data_state;
          emitDoctype();
          break;
        case -1:
          emitDoctype();
          emitEOF();
          break;
      }
    }
    function cdata_section_state(c) {
      switch (c) {
        case 93:
          tokenizer = cdata_section_bracket_state;
          break;
        case -1:
          emitEOF();
          break;
        case 0:
          textIncludesNUL = true;
        /* fall through */
        default:
          emitCharsWhile(CDATATEXT) || textrun.push(c);
          break;
      }
    }
    function cdata_section_bracket_state(c) {
      switch (c) {
        case 93:
          tokenizer = cdata_section_end_state;
          break;
        default:
          textrun.push(93);
          reconsume(c, cdata_section_state);
          break;
      }
    }
    function cdata_section_end_state(c) {
      switch (c) {
        case 93:
          textrun.push(93);
          break;
        case 62:
          flushText();
          tokenizer = data_state;
          break;
        default:
          textrun.push(93);
          textrun.push(93);
          reconsume(c, cdata_section_state);
          break;
      }
    }
    function character_reference_state(c) {
      beginTempBuf();
      tempbuf.push(38);
      switch (c) {
        case 9:
        // TAB
        case 10:
        // LINE FEED
        case 12:
        // FORM FEED
        case 32:
        // SPACE
        case 60:
        // LESS-THAN SIGN
        case 38:
        // AMPERSAND
        case -1:
          reconsume(c, character_reference_end_state);
          break;
        case 35:
          tempbuf.push(c);
          tokenizer = numeric_character_reference_state;
          break;
        default:
          reconsume(c, named_character_reference_state);
          break;
      }
    }
    function named_character_reference_state(c) {
      NAMEDCHARREF.lastIndex = nextchar;
      var matched = NAMEDCHARREF.exec(chars);
      if (!matched) throw new Error("should never happen");
      var name = matched[1];
      if (!name) {
        tokenizer = character_reference_end_state;
        return;
      }
      nextchar += name.length;
      pushAll(tempbuf, str2buf(name));
      switch (return_state) {
        case attribute_value_double_quoted_state:
        case attribute_value_single_quoted_state:
        case attribute_value_unquoted_state:
          if (name[name.length - 1] !== ";") {
            if (/[=A-Za-z0-9]/.test(chars[nextchar])) {
              tokenizer = character_reference_end_state;
              return;
            }
          }
          break;
      }
      beginTempBuf();
      var rv = namedCharRefs[name];
      if (typeof rv === "number") {
        tempbuf.push(rv);
      } else {
        pushAll(tempbuf, rv);
      }
      tokenizer = character_reference_end_state;
    }
    named_character_reference_state.lookahead = -32;
    function numeric_character_reference_state(c) {
      character_reference_code = 0;
      switch (c) {
        case 120:
        // x
        case 88:
          tempbuf.push(c);
          tokenizer = hexadecimal_character_reference_start_state;
          break;
        default:
          reconsume(c, decimal_character_reference_start_state);
          break;
      }
    }
    function hexadecimal_character_reference_start_state(c) {
      switch (c) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        // [0-9]
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        // [A-F]
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
          reconsume(c, hexadecimal_character_reference_state);
          break;
        default:
          reconsume(c, character_reference_end_state);
          break;
      }
    }
    function decimal_character_reference_start_state(c) {
      switch (c) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          reconsume(c, decimal_character_reference_state);
          break;
        default:
          reconsume(c, character_reference_end_state);
          break;
      }
    }
    function hexadecimal_character_reference_state(c) {
      switch (c) {
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
          character_reference_code *= 16;
          character_reference_code += c - 55;
          break;
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
          character_reference_code *= 16;
          character_reference_code += c - 87;
          break;
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          character_reference_code *= 16;
          character_reference_code += c - 48;
          break;
        case 59:
          tokenizer = numeric_character_reference_end_state;
          break;
        default:
          reconsume(c, numeric_character_reference_end_state);
          break;
      }
    }
    function decimal_character_reference_state(c) {
      switch (c) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          character_reference_code *= 10;
          character_reference_code += c - 48;
          break;
        case 59:
          tokenizer = numeric_character_reference_end_state;
          break;
        default:
          reconsume(c, numeric_character_reference_end_state);
          break;
      }
    }
    function numeric_character_reference_end_state(c) {
      if (character_reference_code in numericCharRefReplacements) {
        character_reference_code = numericCharRefReplacements[character_reference_code];
      } else if (character_reference_code > 1114111 || character_reference_code >= 55296 && character_reference_code < 57344) {
        character_reference_code = 65533;
      }
      beginTempBuf();
      if (character_reference_code <= 65535) {
        tempbuf.push(character_reference_code);
      } else {
        character_reference_code = character_reference_code - 65536;
        tempbuf.push(55296 + (character_reference_code >> 10));
        tempbuf.push(56320 + (character_reference_code & 1023));
      }
      reconsume(c, character_reference_end_state);
    }
    function character_reference_end_state(c) {
      switch (return_state) {
        case attribute_value_double_quoted_state:
        case attribute_value_single_quoted_state:
        case attribute_value_unquoted_state:
          attrvaluebuf += buf2str(tempbuf);
          break;
        default:
          pushAll(textrun, tempbuf);
          break;
      }
      reconsume(c, return_state);
    }
    function initial_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          value = value.replace(LEADINGWS, "");
          if (value.length === 0) return;
          break;
        // Handle anything non-space text below
        case 4:
          doc._appendChild(doc.createComment(value));
          return;
        case 5:
          var name = value;
          var publicid = arg3;
          var systemid = arg4;
          doc.appendChild(new DocumentType(doc, name, publicid, systemid));
          if (force_quirks || name.toLowerCase() !== "html" || quirkyPublicIds.test(publicid) || systemid && systemid.toLowerCase() === quirkySystemId || systemid === void 0 && conditionallyQuirkyPublicIds.test(publicid)) doc._quirks = true;
          else if (limitedQuirkyPublicIds.test(publicid) || systemid !== void 0 && conditionallyQuirkyPublicIds.test(publicid)) doc._limitedQuirks = true;
          parser2 = before_html_mode;
          return;
      }
      doc._quirks = true;
      parser2 = before_html_mode;
      parser2(t, value, arg3, arg4);
    }
    function before_html_mode(t, value, arg3, arg4) {
      var elt;
      switch (t) {
        case 1:
          value = value.replace(LEADINGWS, "");
          if (value.length === 0) return;
          break;
        // Handle anything non-space text below
        case 5:
          return;
        case 4:
          doc._appendChild(doc.createComment(value));
          return;
        case 2:
          if (value === "html") {
            elt = createHTMLElt(doc, value, arg3);
            stack.push(elt);
            doc.appendChild(elt);
            parser2 = before_head_mode;
            return;
          }
          break;
        case 3:
          switch (value) {
            case "html":
            case "head":
            case "body":
            case "br":
              break;
            // fall through on these
            default:
              return;
          }
      }
      elt = createHTMLElt(doc, "html", null);
      stack.push(elt);
      doc.appendChild(elt);
      parser2 = before_head_mode;
      parser2(t, value, arg3, arg4);
    }
    function before_head_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          value = value.replace(LEADINGWS, "");
          if (value.length === 0) return;
          break;
        // Handle anything non-space text below
        case 5:
          return;
        case 4:
          insertComment(value);
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "head":
              var elt = insertHTMLElement(value, arg3);
              head_element_pointer = elt;
              parser2 = in_head_mode;
              return;
          }
          break;
        case 3:
          switch (value) {
            case "html":
            case "head":
            case "body":
            case "br":
              break;
            default:
              return;
          }
      }
      before_head_mode(TAG, "head", null);
      parser2(t, value, arg3, arg4);
    }
    function in_head_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          var ws = value.match(LEADINGWS);
          if (ws) {
            insertText(ws[0]);
            value = value.substring(ws[0].length);
          }
          if (value.length === 0) return;
          break;
        // Handle non-whitespace below
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "meta":
            // XXX:
            // May need to change the encoding based on this tag
            /* falls through */
            case "base":
            case "basefont":
            case "bgsound":
            case "link":
              insertHTMLElement(value, arg3);
              stack.pop();
              return;
            case "title":
              parseRCDATA(value, arg3);
              return;
            case "noscript":
              if (!scripting_enabled) {
                insertHTMLElement(value, arg3);
                parser2 = in_head_noscript_mode;
                return;
              }
            // Otherwise, if scripting is enabled...
            /* falls through */
            case "noframes":
            case "style":
              parseRawText(value, arg3);
              return;
            case "script":
              insertElement(function(doc2) {
                var elt = createHTMLElt(doc2, value, arg3);
                elt._parser_inserted = true;
                elt._force_async = false;
                if (fragment) elt._already_started = true;
                flushText();
                return elt;
              });
              tokenizer = script_data_state;
              originalInsertionMode = parser2;
              parser2 = text_mode;
              return;
            case "template":
              insertHTMLElement(value, arg3);
              afe.insertMarker();
              frameset_ok = false;
              parser2 = in_template_mode;
              templateInsertionModes.push(parser2);
              return;
            case "head":
              return;
          }
          break;
        case 3:
          switch (value) {
            case "head":
              stack.pop();
              parser2 = after_head_mode;
              return;
            case "body":
            case "html":
            case "br":
              break;
            // handle these at the bottom of the function
            case "template":
              if (!stack.contains("template")) {
                return;
              }
              stack.generateImpliedEndTags(null, "thorough");
              stack.popTag("template");
              afe.clearToMarker();
              templateInsertionModes.pop();
              resetInsertionMode();
              return;
            default:
              return;
          }
          break;
      }
      in_head_mode(ENDTAG, "head", null);
      parser2(t, value, arg3, arg4);
    }
    function in_head_noscript_mode(t, value, arg3, arg4) {
      switch (t) {
        case 5:
          return;
        case 4:
          in_head_mode(t, value);
          return;
        case 1:
          var ws = value.match(LEADINGWS);
          if (ws) {
            in_head_mode(t, ws[0]);
            value = value.substring(ws[0].length);
          }
          if (value.length === 0) return;
          break;
        // Handle non-whitespace below
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "basefont":
            case "bgsound":
            case "link":
            case "meta":
            case "noframes":
            case "style":
              in_head_mode(t, value, arg3);
              return;
            case "head":
            case "noscript":
              return;
          }
          break;
        case 3:
          switch (value) {
            case "noscript":
              stack.pop();
              parser2 = in_head_mode;
              return;
            case "br":
              break;
            // goes to the outer default
            default:
              return;
          }
          break;
      }
      in_head_noscript_mode(ENDTAG, "noscript", null);
      parser2(t, value, arg3, arg4);
    }
    function after_head_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          var ws = value.match(LEADINGWS);
          if (ws) {
            insertText(ws[0]);
            value = value.substring(ws[0].length);
          }
          if (value.length === 0) return;
          break;
        // Handle non-whitespace below
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "body":
              insertHTMLElement(value, arg3);
              frameset_ok = false;
              parser2 = in_body_mode;
              return;
            case "frameset":
              insertHTMLElement(value, arg3);
              parser2 = in_frameset_mode;
              return;
            case "base":
            case "basefont":
            case "bgsound":
            case "link":
            case "meta":
            case "noframes":
            case "script":
            case "style":
            case "template":
            case "title":
              stack.push(head_element_pointer);
              in_head_mode(TAG, value, arg3);
              stack.removeElement(head_element_pointer);
              return;
            case "head":
              return;
          }
          break;
        case 3:
          switch (value) {
            case "template":
              return in_head_mode(t, value, arg3, arg4);
            case "body":
            case "html":
            case "br":
              break;
            default:
              return;
          }
          break;
      }
      after_head_mode(TAG, "body", null);
      frameset_ok = true;
      parser2(t, value, arg3, arg4);
    }
    function in_body_mode(t, value, arg3, arg4) {
      var body, i, node2, elt;
      switch (t) {
        case 1:
          if (textIncludesNUL) {
            value = value.replace(NULCHARS, "");
            if (value.length === 0) return;
          }
          if (frameset_ok && NONWS.test(value)) frameset_ok = false;
          afereconstruct();
          insertText(value);
          return;
        case 5:
          return;
        case 4:
          insertComment(value);
          return;
        case -1:
          if (templateInsertionModes.length) {
            return in_template_mode(t);
          }
          stopParsing();
          return;
        case 2:
          switch (value) {
            case "html":
              if (stack.contains("template")) {
                return;
              }
              transferAttributes(arg3, stack.elements[0]);
              return;
            case "base":
            case "basefont":
            case "bgsound":
            case "link":
            case "meta":
            case "noframes":
            case "script":
            case "style":
            case "template":
            case "title":
              in_head_mode(TAG, value, arg3);
              return;
            case "body":
              body = stack.elements[1];
              if (!body || !(body instanceof impl2.HTMLBodyElement) || stack.contains("template")) return;
              frameset_ok = false;
              transferAttributes(arg3, body);
              return;
            case "frameset":
              if (!frameset_ok) return;
              body = stack.elements[1];
              if (!body || !(body instanceof impl2.HTMLBodyElement)) return;
              if (body.parentNode) body.parentNode.removeChild(body);
              while (!(stack.top instanceof impl2.HTMLHtmlElement)) stack.pop();
              insertHTMLElement(value, arg3);
              parser2 = in_frameset_mode;
              return;
            case "address":
            case "article":
            case "aside":
            case "blockquote":
            case "center":
            case "details":
            case "dialog":
            case "dir":
            case "div":
            case "dl":
            case "fieldset":
            case "figcaption":
            case "figure":
            case "footer":
            case "header":
            case "hgroup":
            case "main":
            case "nav":
            case "ol":
            case "p":
            case "section":
            case "summary":
            case "ul":
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              insertHTMLElement(value, arg3);
              return;
            case "menu":
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              if (isA(stack.top, "menuitem")) {
                stack.pop();
              }
              insertHTMLElement(value, arg3);
              return;
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              if (stack.top instanceof impl2.HTMLHeadingElement) stack.pop();
              insertHTMLElement(value, arg3);
              return;
            case "pre":
            case "listing":
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              insertHTMLElement(value, arg3);
              ignore_linefeed = true;
              frameset_ok = false;
              return;
            case "form":
              if (form_element_pointer && !stack.contains("template")) return;
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              elt = insertHTMLElement(value, arg3);
              if (!stack.contains("template")) form_element_pointer = elt;
              return;
            case "li":
              frameset_ok = false;
              for (i = stack.elements.length - 1; i >= 0; i--) {
                node2 = stack.elements[i];
                if (node2 instanceof impl2.HTMLLIElement) {
                  in_body_mode(ENDTAG, "li");
                  break;
                }
                if (isA(node2, specialSet) && !isA(node2, addressdivpSet)) break;
              }
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              insertHTMLElement(value, arg3);
              return;
            case "dd":
            case "dt":
              frameset_ok = false;
              for (i = stack.elements.length - 1; i >= 0; i--) {
                node2 = stack.elements[i];
                if (isA(node2, dddtSet)) {
                  in_body_mode(ENDTAG, node2.localName);
                  break;
                }
                if (isA(node2, specialSet) && !isA(node2, addressdivpSet)) break;
              }
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              insertHTMLElement(value, arg3);
              return;
            case "plaintext":
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              insertHTMLElement(value, arg3);
              tokenizer = plaintext_state;
              return;
            case "button":
              if (stack.inScope("button")) {
                in_body_mode(ENDTAG, "button");
                parser2(t, value, arg3, arg4);
              } else {
                afereconstruct();
                insertHTMLElement(value, arg3);
                frameset_ok = false;
              }
              return;
            case "a":
              var activeElement = afe.findElementByTag("a");
              if (activeElement) {
                in_body_mode(ENDTAG, value);
                afe.remove(activeElement);
                stack.removeElement(activeElement);
              }
            /* falls through */
            case "b":
            case "big":
            case "code":
            case "em":
            case "font":
            case "i":
            case "s":
            case "small":
            case "strike":
            case "strong":
            case "tt":
            case "u":
              afereconstruct();
              afe.push(insertHTMLElement(value, arg3), arg3);
              return;
            case "nobr":
              afereconstruct();
              if (stack.inScope(value)) {
                in_body_mode(ENDTAG, value);
                afereconstruct();
              }
              afe.push(insertHTMLElement(value, arg3), arg3);
              return;
            case "applet":
            case "marquee":
            case "object":
              afereconstruct();
              insertHTMLElement(value, arg3);
              afe.insertMarker();
              frameset_ok = false;
              return;
            case "table":
              if (!doc._quirks && stack.inButtonScope("p")) {
                in_body_mode(ENDTAG, "p");
              }
              insertHTMLElement(value, arg3);
              frameset_ok = false;
              parser2 = in_table_mode;
              return;
            case "area":
            case "br":
            case "embed":
            case "img":
            case "keygen":
            case "wbr":
              afereconstruct();
              insertHTMLElement(value, arg3);
              stack.pop();
              frameset_ok = false;
              return;
            case "input":
              afereconstruct();
              elt = insertHTMLElement(value, arg3);
              stack.pop();
              var type = elt.getAttribute("type");
              if (!type || type.toLowerCase() !== "hidden") frameset_ok = false;
              return;
            case "param":
            case "source":
            case "track":
              insertHTMLElement(value, arg3);
              stack.pop();
              return;
            case "hr":
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              if (isA(stack.top, "menuitem")) {
                stack.pop();
              }
              insertHTMLElement(value, arg3);
              stack.pop();
              frameset_ok = false;
              return;
            case "image":
              in_body_mode(TAG, "img", arg3, arg4);
              return;
            case "textarea":
              insertHTMLElement(value, arg3);
              ignore_linefeed = true;
              frameset_ok = false;
              tokenizer = rcdata_state;
              originalInsertionMode = parser2;
              parser2 = text_mode;
              return;
            case "xmp":
              if (stack.inButtonScope("p")) in_body_mode(ENDTAG, "p");
              afereconstruct();
              frameset_ok = false;
              parseRawText(value, arg3);
              return;
            case "iframe":
              frameset_ok = false;
              parseRawText(value, arg3);
              return;
            case "noembed":
              parseRawText(value, arg3);
              return;
            case "select":
              afereconstruct();
              insertHTMLElement(value, arg3);
              frameset_ok = false;
              if (parser2 === in_table_mode || parser2 === in_caption_mode || parser2 === in_table_body_mode || parser2 === in_row_mode || parser2 === in_cell_mode) parser2 = in_select_in_table_mode;
              else parser2 = in_select_mode;
              return;
            case "optgroup":
            case "option":
              if (stack.top instanceof impl2.HTMLOptionElement) {
                in_body_mode(ENDTAG, "option");
              }
              afereconstruct();
              insertHTMLElement(value, arg3);
              return;
            case "menuitem":
              if (isA(stack.top, "menuitem")) {
                stack.pop();
              }
              afereconstruct();
              insertHTMLElement(value, arg3);
              return;
            case "rb":
            case "rtc":
              if (stack.inScope("ruby")) {
                stack.generateImpliedEndTags();
              }
              insertHTMLElement(value, arg3);
              return;
            case "rp":
            case "rt":
              if (stack.inScope("ruby")) {
                stack.generateImpliedEndTags("rtc");
              }
              insertHTMLElement(value, arg3);
              return;
            case "math":
              afereconstruct();
              adjustMathMLAttributes(arg3);
              adjustForeignAttributes(arg3);
              insertForeignElement(value, arg3, NAMESPACE.MATHML);
              if (arg4)
                stack.pop();
              return;
            case "svg":
              afereconstruct();
              adjustSVGAttributes(arg3);
              adjustForeignAttributes(arg3);
              insertForeignElement(value, arg3, NAMESPACE.SVG);
              if (arg4)
                stack.pop();
              return;
            case "caption":
            case "col":
            case "colgroup":
            case "frame":
            case "head":
            case "tbody":
            case "td":
            case "tfoot":
            case "th":
            case "thead":
            case "tr":
              return;
          }
          afereconstruct();
          insertHTMLElement(value, arg3);
          return;
        case 3:
          switch (value) {
            case "template":
              in_head_mode(ENDTAG, value, arg3);
              return;
            case "body":
              if (!stack.inScope("body")) return;
              parser2 = after_body_mode;
              return;
            case "html":
              if (!stack.inScope("body")) return;
              parser2 = after_body_mode;
              parser2(t, value, arg3);
              return;
            case "address":
            case "article":
            case "aside":
            case "blockquote":
            case "button":
            case "center":
            case "details":
            case "dialog":
            case "dir":
            case "div":
            case "dl":
            case "fieldset":
            case "figcaption":
            case "figure":
            case "footer":
            case "header":
            case "hgroup":
            case "listing":
            case "main":
            case "menu":
            case "nav":
            case "ol":
            case "pre":
            case "section":
            case "summary":
            case "ul":
              if (!stack.inScope(value)) return;
              stack.generateImpliedEndTags();
              stack.popTag(value);
              return;
            case "form":
              if (!stack.contains("template")) {
                var openform = form_element_pointer;
                form_element_pointer = null;
                if (!openform || !stack.elementInScope(openform)) return;
                stack.generateImpliedEndTags();
                stack.removeElement(openform);
              } else {
                if (!stack.inScope("form")) return;
                stack.generateImpliedEndTags();
                stack.popTag("form");
              }
              return;
            case "p":
              if (!stack.inButtonScope(value)) {
                in_body_mode(TAG, value, null);
                parser2(t, value, arg3, arg4);
              } else {
                stack.generateImpliedEndTags(value);
                stack.popTag(value);
              }
              return;
            case "li":
              if (!stack.inListItemScope(value)) return;
              stack.generateImpliedEndTags(value);
              stack.popTag(value);
              return;
            case "dd":
            case "dt":
              if (!stack.inScope(value)) return;
              stack.generateImpliedEndTags(value);
              stack.popTag(value);
              return;
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              if (!stack.elementTypeInScope(impl2.HTMLHeadingElement)) return;
              stack.generateImpliedEndTags();
              stack.popElementType(impl2.HTMLHeadingElement);
              return;
            case "sarcasm":
              break;
            case "a":
            case "b":
            case "big":
            case "code":
            case "em":
            case "font":
            case "i":
            case "nobr":
            case "s":
            case "small":
            case "strike":
            case "strong":
            case "tt":
            case "u":
              var result2 = adoptionAgency(value);
              if (result2) return;
              break;
            // Go to the "any other end tag" case
            case "applet":
            case "marquee":
            case "object":
              if (!stack.inScope(value)) return;
              stack.generateImpliedEndTags();
              stack.popTag(value);
              afe.clearToMarker();
              return;
            case "br":
              in_body_mode(TAG, value, null);
              return;
          }
          for (i = stack.elements.length - 1; i >= 0; i--) {
            node2 = stack.elements[i];
            if (isA(node2, value)) {
              stack.generateImpliedEndTags(value);
              stack.popElement(node2);
              break;
            } else if (isA(node2, specialSet)) {
              return;
            }
          }
          return;
      }
    }
    function text_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          insertText(value);
          return;
        case -1:
          if (stack.top instanceof impl2.HTMLScriptElement) stack.top._already_started = true;
          stack.pop();
          parser2 = originalInsertionMode;
          parser2(t);
          return;
        case 3:
          if (value === "script") {
            handleScriptEnd();
          } else {
            stack.pop();
            parser2 = originalInsertionMode;
          }
          return;
        default:
          return;
      }
    }
    function in_table_mode(t, value, arg3, arg4) {
      function getTypeAttr(attrs) {
        for (var i = 0, n = attrs.length; i < n; i++) {
          if (attrs[i][0] === "type") return attrs[i][1].toLowerCase();
        }
        return null;
      }
      switch (t) {
        case 1:
          if (text_integration_mode) {
            in_body_mode(t, value, arg3, arg4);
            return;
          } else if (isA(stack.top, tablesectionrowSet)) {
            pending_table_text = [];
            originalInsertionMode = parser2;
            parser2 = in_table_text_mode;
            parser2(t, value, arg3, arg4);
            return;
          }
          break;
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case 2:
          switch (value) {
            case "caption":
              stack.clearToContext(tableContextSet);
              afe.insertMarker();
              insertHTMLElement(value, arg3);
              parser2 = in_caption_mode;
              return;
            case "colgroup":
              stack.clearToContext(tableContextSet);
              insertHTMLElement(value, arg3);
              parser2 = in_column_group_mode;
              return;
            case "col":
              in_table_mode(TAG, "colgroup", null);
              parser2(t, value, arg3, arg4);
              return;
            case "tbody":
            case "tfoot":
            case "thead":
              stack.clearToContext(tableContextSet);
              insertHTMLElement(value, arg3);
              parser2 = in_table_body_mode;
              return;
            case "td":
            case "th":
            case "tr":
              in_table_mode(TAG, "tbody", null);
              parser2(t, value, arg3, arg4);
              return;
            case "table":
              if (!stack.inTableScope(value)) {
                return;
              }
              in_table_mode(ENDTAG, value);
              parser2(t, value, arg3, arg4);
              return;
            case "style":
            case "script":
            case "template":
              in_head_mode(t, value, arg3, arg4);
              return;
            case "input":
              var type = getTypeAttr(arg3);
              if (type !== "hidden") break;
              insertHTMLElement(value, arg3);
              stack.pop();
              return;
            case "form":
              if (form_element_pointer || stack.contains("template")) return;
              form_element_pointer = insertHTMLElement(value, arg3);
              stack.popElement(form_element_pointer);
              return;
          }
          break;
        case 3:
          switch (value) {
            case "table":
              if (!stack.inTableScope(value)) return;
              stack.popTag(value);
              resetInsertionMode();
              return;
            case "body":
            case "caption":
            case "col":
            case "colgroup":
            case "html":
            case "tbody":
            case "td":
            case "tfoot":
            case "th":
            case "thead":
            case "tr":
              return;
            case "template":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
        case -1:
          in_body_mode(t, value, arg3, arg4);
          return;
      }
      foster_parent_mode = true;
      in_body_mode(t, value, arg3, arg4);
      foster_parent_mode = false;
    }
    function in_table_text_mode(t, value, arg3, arg4) {
      if (t === TEXT) {
        if (textIncludesNUL) {
          value = value.replace(NULCHARS, "");
          if (value.length === 0) return;
        }
        pending_table_text.push(value);
      } else {
        var s = pending_table_text.join("");
        pending_table_text.length = 0;
        if (NONWS.test(s)) {
          foster_parent_mode = true;
          in_body_mode(TEXT, s);
          foster_parent_mode = false;
        } else {
          insertText(s);
        }
        parser2 = originalInsertionMode;
        parser2(t, value, arg3, arg4);
      }
    }
    function in_caption_mode(t, value, arg3, arg4) {
      function end_caption() {
        if (!stack.inTableScope("caption")) return false;
        stack.generateImpliedEndTags();
        stack.popTag("caption");
        afe.clearToMarker();
        parser2 = in_table_mode;
        return true;
      }
      switch (t) {
        case 2:
          switch (value) {
            case "caption":
            case "col":
            case "colgroup":
            case "tbody":
            case "td":
            case "tfoot":
            case "th":
            case "thead":
            case "tr":
              if (end_caption()) parser2(t, value, arg3, arg4);
              return;
          }
          break;
        case 3:
          switch (value) {
            case "caption":
              end_caption();
              return;
            case "table":
              if (end_caption()) parser2(t, value, arg3, arg4);
              return;
            case "body":
            case "col":
            case "colgroup":
            case "html":
            case "tbody":
            case "td":
            case "tfoot":
            case "th":
            case "thead":
            case "tr":
              return;
          }
          break;
      }
      in_body_mode(t, value, arg3, arg4);
    }
    function in_column_group_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          var ws = value.match(LEADINGWS);
          if (ws) {
            insertText(ws[0]);
            value = value.substring(ws[0].length);
          }
          if (value.length === 0) return;
          break;
        // Handle non-whitespace below
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "col":
              insertHTMLElement(value, arg3);
              stack.pop();
              return;
            case "template":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
        case 3:
          switch (value) {
            case "colgroup":
              if (!isA(stack.top, "colgroup")) {
                return;
              }
              stack.pop();
              parser2 = in_table_mode;
              return;
            case "col":
              return;
            case "template":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
        case -1:
          in_body_mode(t, value, arg3, arg4);
          return;
      }
      if (!isA(stack.top, "colgroup")) {
        return;
      }
      in_column_group_mode(ENDTAG, "colgroup");
      parser2(t, value, arg3, arg4);
    }
    function in_table_body_mode(t, value, arg3, arg4) {
      function endsect() {
        if (!stack.inTableScope("tbody") && !stack.inTableScope("thead") && !stack.inTableScope("tfoot")) return;
        stack.clearToContext(tableBodyContextSet);
        in_table_body_mode(ENDTAG, stack.top.localName, null);
        parser2(t, value, arg3, arg4);
      }
      switch (t) {
        case 2:
          switch (value) {
            case "tr":
              stack.clearToContext(tableBodyContextSet);
              insertHTMLElement(value, arg3);
              parser2 = in_row_mode;
              return;
            case "th":
            case "td":
              in_table_body_mode(TAG, "tr", null);
              parser2(t, value, arg3, arg4);
              return;
            case "caption":
            case "col":
            case "colgroup":
            case "tbody":
            case "tfoot":
            case "thead":
              endsect();
              return;
          }
          break;
        case 3:
          switch (value) {
            case "table":
              endsect();
              return;
            case "tbody":
            case "tfoot":
            case "thead":
              if (stack.inTableScope(value)) {
                stack.clearToContext(tableBodyContextSet);
                stack.pop();
                parser2 = in_table_mode;
              }
              return;
            case "body":
            case "caption":
            case "col":
            case "colgroup":
            case "html":
            case "td":
            case "th":
            case "tr":
              return;
          }
          break;
      }
      in_table_mode(t, value, arg3, arg4);
    }
    function in_row_mode(t, value, arg3, arg4) {
      function endrow() {
        if (!stack.inTableScope("tr")) return false;
        stack.clearToContext(tableRowContextSet);
        stack.pop();
        parser2 = in_table_body_mode;
        return true;
      }
      switch (t) {
        case 2:
          switch (value) {
            case "th":
            case "td":
              stack.clearToContext(tableRowContextSet);
              insertHTMLElement(value, arg3);
              parser2 = in_cell_mode;
              afe.insertMarker();
              return;
            case "caption":
            case "col":
            case "colgroup":
            case "tbody":
            case "tfoot":
            case "thead":
            case "tr":
              if (endrow()) parser2(t, value, arg3, arg4);
              return;
          }
          break;
        case 3:
          switch (value) {
            case "tr":
              endrow();
              return;
            case "table":
              if (endrow()) parser2(t, value, arg3, arg4);
              return;
            case "tbody":
            case "tfoot":
            case "thead":
              if (stack.inTableScope(value)) {
                if (endrow()) parser2(t, value, arg3, arg4);
              }
              return;
            case "body":
            case "caption":
            case "col":
            case "colgroup":
            case "html":
            case "td":
            case "th":
              return;
          }
          break;
      }
      in_table_mode(t, value, arg3, arg4);
    }
    function in_cell_mode(t, value, arg3, arg4) {
      switch (t) {
        case 2:
          switch (value) {
            case "caption":
            case "col":
            case "colgroup":
            case "tbody":
            case "td":
            case "tfoot":
            case "th":
            case "thead":
            case "tr":
              if (stack.inTableScope("td")) {
                in_cell_mode(ENDTAG, "td");
                parser2(t, value, arg3, arg4);
              } else if (stack.inTableScope("th")) {
                in_cell_mode(ENDTAG, "th");
                parser2(t, value, arg3, arg4);
              }
              return;
          }
          break;
        case 3:
          switch (value) {
            case "td":
            case "th":
              if (!stack.inTableScope(value)) return;
              stack.generateImpliedEndTags();
              stack.popTag(value);
              afe.clearToMarker();
              parser2 = in_row_mode;
              return;
            case "body":
            case "caption":
            case "col":
            case "colgroup":
            case "html":
              return;
            case "table":
            case "tbody":
            case "tfoot":
            case "thead":
            case "tr":
              if (!stack.inTableScope(value)) return;
              in_cell_mode(ENDTAG, stack.inTableScope("td") ? "td" : "th");
              parser2(t, value, arg3, arg4);
              return;
          }
          break;
      }
      in_body_mode(t, value, arg3, arg4);
    }
    function in_select_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          if (textIncludesNUL) {
            value = value.replace(NULCHARS, "");
            if (value.length === 0) return;
          }
          insertText(value);
          return;
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case -1:
          in_body_mode(t, value, arg3, arg4);
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "option":
              if (stack.top instanceof impl2.HTMLOptionElement) in_select_mode(ENDTAG, value);
              insertHTMLElement(value, arg3);
              return;
            case "optgroup":
              if (stack.top instanceof impl2.HTMLOptionElement) in_select_mode(ENDTAG, "option");
              if (stack.top instanceof impl2.HTMLOptGroupElement) in_select_mode(ENDTAG, value);
              insertHTMLElement(value, arg3);
              return;
            case "select":
              in_select_mode(ENDTAG, value);
              return;
            case "input":
            case "keygen":
            case "textarea":
              if (!stack.inSelectScope("select")) return;
              in_select_mode(ENDTAG, "select");
              parser2(t, value, arg3, arg4);
              return;
            case "script":
            case "template":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
        case 3:
          switch (value) {
            case "optgroup":
              if (stack.top instanceof impl2.HTMLOptionElement && stack.elements[stack.elements.length - 2] instanceof impl2.HTMLOptGroupElement) {
                in_select_mode(ENDTAG, "option");
              }
              if (stack.top instanceof impl2.HTMLOptGroupElement) stack.pop();
              return;
            case "option":
              if (stack.top instanceof impl2.HTMLOptionElement) stack.pop();
              return;
            case "select":
              if (!stack.inSelectScope(value)) return;
              stack.popTag(value);
              resetInsertionMode();
              return;
            case "template":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
      }
    }
    function in_select_in_table_mode(t, value, arg3, arg4) {
      switch (value) {
        case "caption":
        case "table":
        case "tbody":
        case "tfoot":
        case "thead":
        case "tr":
        case "td":
        case "th":
          switch (t) {
            case 2:
              in_select_in_table_mode(ENDTAG, "select");
              parser2(t, value, arg3, arg4);
              return;
            case 3:
              if (stack.inTableScope(value)) {
                in_select_in_table_mode(ENDTAG, "select");
                parser2(t, value, arg3, arg4);
              }
              return;
          }
      }
      in_select_mode(t, value, arg3, arg4);
    }
    function in_template_mode(t, value, arg3, arg4) {
      function switchModeAndReprocess(mode) {
        parser2 = mode;
        templateInsertionModes[templateInsertionModes.length - 1] = parser2;
        parser2(t, value, arg3, arg4);
      }
      switch (t) {
        case 1:
        // TEXT
        case 4:
        // COMMENT
        case 5:
          in_body_mode(t, value, arg3, arg4);
          return;
        case -1:
          if (!stack.contains("template")) {
            stopParsing();
          } else {
            stack.popTag("template");
            afe.clearToMarker();
            templateInsertionModes.pop();
            resetInsertionMode();
            parser2(t, value, arg3, arg4);
          }
          return;
        case 2:
          switch (value) {
            case "base":
            case "basefont":
            case "bgsound":
            case "link":
            case "meta":
            case "noframes":
            case "script":
            case "style":
            case "template":
            case "title":
              in_head_mode(t, value, arg3, arg4);
              return;
            case "caption":
            case "colgroup":
            case "tbody":
            case "tfoot":
            case "thead":
              switchModeAndReprocess(in_table_mode);
              return;
            case "col":
              switchModeAndReprocess(in_column_group_mode);
              return;
            case "tr":
              switchModeAndReprocess(in_table_body_mode);
              return;
            case "td":
            case "th":
              switchModeAndReprocess(in_row_mode);
              return;
          }
          switchModeAndReprocess(in_body_mode);
          return;
        case 3:
          switch (value) {
            case "template":
              in_head_mode(t, value, arg3, arg4);
              return;
            default:
              return;
          }
      }
    }
    function after_body_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          if (NONWS.test(value)) break;
          in_body_mode(t, value);
          return;
        case 4:
          stack.elements[0]._appendChild(doc.createComment(value));
          return;
        case 5:
          return;
        case -1:
          stopParsing();
          return;
        case 2:
          if (value === "html") {
            in_body_mode(t, value, arg3, arg4);
            return;
          }
          break;
        // for any other tags
        case 3:
          if (value === "html") {
            if (fragment) return;
            parser2 = after_after_body_mode;
            return;
          }
          break;
      }
      parser2 = in_body_mode;
      parser2(t, value, arg3, arg4);
    }
    function in_frameset_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          value = value.replace(ALLNONWS, "");
          if (value.length > 0) insertText(value);
          return;
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case -1:
          stopParsing();
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "frameset":
              insertHTMLElement(value, arg3);
              return;
            case "frame":
              insertHTMLElement(value, arg3);
              stack.pop();
              return;
            case "noframes":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
        case 3:
          if (value === "frameset") {
            if (fragment && stack.top instanceof impl2.HTMLHtmlElement) return;
            stack.pop();
            if (!fragment && !(stack.top instanceof impl2.HTMLFrameSetElement)) parser2 = after_frameset_mode;
            return;
          }
          break;
      }
    }
    function after_frameset_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          value = value.replace(ALLNONWS, "");
          if (value.length > 0) insertText(value);
          return;
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case -1:
          stopParsing();
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "noframes":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
        case 3:
          if (value === "html") {
            parser2 = after_after_frameset_mode;
            return;
          }
          break;
      }
    }
    function after_after_body_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          if (NONWS.test(value)) break;
          in_body_mode(t, value, arg3, arg4);
          return;
        case 4:
          doc._appendChild(doc.createComment(value));
          return;
        case 5:
          in_body_mode(t, value, arg3, arg4);
          return;
        case -1:
          stopParsing();
          return;
        case 2:
          if (value === "html") {
            in_body_mode(t, value, arg3, arg4);
            return;
          }
          break;
      }
      parser2 = in_body_mode;
      parser2(t, value, arg3, arg4);
    }
    function after_after_frameset_mode(t, value, arg3, arg4) {
      switch (t) {
        case 1:
          value = value.replace(ALLNONWS, "");
          if (value.length > 0) in_body_mode(t, value, arg3, arg4);
          return;
        case 4:
          doc._appendChild(doc.createComment(value));
          return;
        case 5:
          in_body_mode(t, value, arg3, arg4);
          return;
        case -1:
          stopParsing();
          return;
        case 2:
          switch (value) {
            case "html":
              in_body_mode(t, value, arg3, arg4);
              return;
            case "noframes":
              in_head_mode(t, value, arg3, arg4);
              return;
          }
          break;
      }
    }
    function insertForeignToken(t, value, arg3, arg4) {
      function isHTMLFont(attrs) {
        for (var i2 = 0, n = attrs.length; i2 < n; i2++) {
          switch (attrs[i2][0]) {
            case "color":
            case "face":
            case "size":
              return true;
          }
        }
        return false;
      }
      var current;
      switch (t) {
        case 1:
          if (frameset_ok && NONWSNONNUL.test(value)) frameset_ok = false;
          if (textIncludesNUL) {
            value = value.replace(NULCHARS, "�");
          }
          insertText(value);
          return;
        case 4:
          insertComment(value);
          return;
        case 5:
          return;
        case 2:
          switch (value) {
            case "font":
              if (!isHTMLFont(arg3)) break;
            /* falls through */
            case "b":
            case "big":
            case "blockquote":
            case "body":
            case "br":
            case "center":
            case "code":
            case "dd":
            case "div":
            case "dl":
            case "dt":
            case "em":
            case "embed":
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
            case "head":
            case "hr":
            case "i":
            case "img":
            case "li":
            case "listing":
            case "menu":
            case "meta":
            case "nobr":
            case "ol":
            case "p":
            case "pre":
            case "ruby":
            case "s":
            case "small":
            case "span":
            case "strong":
            case "strike":
            case "sub":
            case "sup":
            case "table":
            case "tt":
            case "u":
            case "ul":
            case "var":
              if (fragment) {
                break;
              }
              do {
                stack.pop();
                current = stack.top;
              } while (current.namespaceURI !== NAMESPACE.HTML && !isMathmlTextIntegrationPoint(current) && !isHTMLIntegrationPoint(current));
              insertToken(t, value, arg3, arg4);
              return;
          }
          current = stack.elements.length === 1 && fragment ? fragmentContext : stack.top;
          if (current.namespaceURI === NAMESPACE.MATHML) {
            adjustMathMLAttributes(arg3);
          } else if (current.namespaceURI === NAMESPACE.SVG) {
            value = adjustSVGTagName(value);
            adjustSVGAttributes(arg3);
          }
          adjustForeignAttributes(arg3);
          insertForeignElement(value, arg3, current.namespaceURI);
          if (arg4) {
            stack.pop();
          }
          return;
        case 3:
          current = stack.top;
          if (value === "script" && current.namespaceURI === NAMESPACE.SVG && current.localName === "script") {
            stack.pop();
          } else {
            var i = stack.elements.length - 1;
            var node2 = stack.elements[i];
            for (; ; ) {
              if (node2.localName.toLowerCase() === value) {
                stack.popElement(node2);
                break;
              }
              node2 = stack.elements[--i];
              if (node2.namespaceURI !== NAMESPACE.HTML) continue;
              parser2(t, value, arg3, arg4);
              break;
            }
          }
          return;
      }
    }
    htmlparser.testTokenizer = function(input2, initialState, lastStartTag, charbychar) {
      var tokens = [];
      switch (initialState) {
        case "PCDATA state":
          tokenizer = data_state;
          break;
        case "RCDATA state":
          tokenizer = rcdata_state;
          break;
        case "RAWTEXT state":
          tokenizer = rawtext_state;
          break;
        case "PLAINTEXT state":
          tokenizer = plaintext_state;
          break;
      }
      if (lastStartTag) {
        lasttagname = lastStartTag;
      }
      insertToken = function(t, value, arg3, arg4) {
        flushText();
        switch (t) {
          case 1:
            if (tokens.length > 0 && tokens[tokens.length - 1][0] === "Character") {
              tokens[tokens.length - 1][1] += value;
            } else tokens.push(["Character", value]);
            break;
          case 4:
            tokens.push(["Comment", value]);
            break;
          case 5:
            tokens.push(["DOCTYPE", value, arg3 === void 0 ? null : arg3, arg4 === void 0 ? null : arg4, !force_quirks]);
            break;
          case 2:
            var attrs = /* @__PURE__ */ Object.create(null);
            for (var i2 = 0; i2 < arg3.length; i2++) {
              var a = arg3[i2];
              if (a.length === 1) {
                attrs[a[0]] = "";
              } else {
                attrs[a[0]] = a[1];
              }
            }
            var token = ["StartTag", value, attrs];
            if (arg4) token.push(true);
            tokens.push(token);
            break;
          case 3:
            tokens.push(["EndTag", value]);
            break;
        }
      };
      if (!charbychar) {
        this.parse(input2, true);
      } else {
        for (var i = 0; i < input2.length; i++) {
          this.parse(input2[i]);
        }
        this.parse("", true);
      }
      return tokens;
    };
    return htmlparser;
  }
  return HTMLParser_1;
}
var DOMImplementation_1;
var hasRequiredDOMImplementation;
function requireDOMImplementation() {
  if (hasRequiredDOMImplementation) return DOMImplementation_1;
  hasRequiredDOMImplementation = 1;
  DOMImplementation_1 = DOMImplementation;
  var Document2 = requireDocument();
  var DocumentType = requireDocumentType();
  var HTMLParser = requireHTMLParser();
  var utils2 = requireUtils();
  var xml = requireXmlnames();
  function DOMImplementation(contextObject) {
    this.contextObject = contextObject;
  }
  var supportedFeatures = {
    "xml": {
      "": true,
      "1.0": true,
      "2.0": true
    },
    // DOM Core
    "core": {
      "": true,
      "2.0": true
    },
    // DOM Core
    "html": {
      "": true,
      "1.0": true,
      "2.0": true
    },
    // HTML
    "xhtml": {
      "": true,
      "1.0": true,
      "2.0": true
    }
    // HTML
  };
  DOMImplementation.prototype = {
    hasFeature: function hasFeature(feature, version) {
      var f = supportedFeatures[(feature || "").toLowerCase()];
      return f && f[version || ""] || false;
    },
    createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
      if (!xml.isValidQName(qualifiedName)) utils2.InvalidCharacterError();
      return new DocumentType(this.contextObject, qualifiedName, publicId, systemId);
    },
    createDocument: function createDocument2(namespace, qualifiedName, doctype) {
      var d = new Document2(false, null);
      var e;
      if (qualifiedName) e = d.createElementNS(namespace, qualifiedName);
      else e = null;
      if (doctype) {
        d.appendChild(doctype);
      }
      if (e) d.appendChild(e);
      if (namespace === utils2.NAMESPACE.HTML) {
        d._contentType = "application/xhtml+xml";
      } else if (namespace === utils2.NAMESPACE.SVG) {
        d._contentType = "image/svg+xml";
      } else {
        d._contentType = "application/xml";
      }
      return d;
    },
    createHTMLDocument: function createHTMLDocument(titleText) {
      var d = new Document2(true, null);
      d.appendChild(new DocumentType(d, "html"));
      var html = d.createElement("html");
      d.appendChild(html);
      var head = d.createElement("head");
      html.appendChild(head);
      if (titleText !== void 0) {
        var title = d.createElement("title");
        head.appendChild(title);
        title.appendChild(d.createTextNode(titleText));
      }
      html.appendChild(d.createElement("body"));
      d.modclock = 1;
      return d;
    },
    mozSetOutputMutationHandler: function(doc, handler) {
      doc.mutationHandler = handler;
    },
    mozGetInputMutationHandler: function(doc) {
      utils2.nyi();
    },
    mozHTMLParser: HTMLParser
  };
  return DOMImplementation_1;
}
var Location_1;
var hasRequiredLocation;
function requireLocation() {
  if (hasRequiredLocation) return Location_1;
  hasRequiredLocation = 1;
  var URL2 = requireURL();
  var URLUtils = requireURLUtils();
  Location_1 = Location;
  function Location(window2, href) {
    this._window = window2;
    this._href = href;
  }
  Location.prototype = Object.create(URLUtils.prototype, {
    constructor: {
      value: Location
    },
    // Special behavior when href is set
    href: {
      get: function() {
        return this._href;
      },
      set: function(v) {
        this.assign(v);
      }
    },
    assign: {
      value: function(url) {
        var current = new URL2(this._href);
        var newurl = current.resolve(url);
        this._href = newurl;
      }
    },
    replace: {
      value: function(url) {
        this.assign(url);
      }
    },
    reload: {
      value: function() {
        this.assign(this.href);
      }
    },
    toString: {
      value: function() {
        return this.href;
      }
    }
  });
  return Location_1;
}
var NavigatorID_1;
var hasRequiredNavigatorID;
function requireNavigatorID() {
  if (hasRequiredNavigatorID) return NavigatorID_1;
  hasRequiredNavigatorID = 1;
  var NavigatorID = Object.create(null, {
    appCodeName: {
      value: "Mozilla"
    },
    appName: {
      value: "Netscape"
    },
    appVersion: {
      value: "4.0"
    },
    platform: {
      value: ""
    },
    product: {
      value: "Gecko"
    },
    productSub: {
      value: "20100101"
    },
    userAgent: {
      value: ""
    },
    vendor: {
      value: ""
    },
    vendorSub: {
      value: ""
    },
    taintEnabled: {
      value: function() {
        return false;
      }
    }
  });
  NavigatorID_1 = NavigatorID;
  return NavigatorID_1;
}
var WindowTimers_1;
var hasRequiredWindowTimers;
function requireWindowTimers() {
  if (hasRequiredWindowTimers) return WindowTimers_1;
  hasRequiredWindowTimers = 1;
  var WindowTimers = {
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval
  };
  WindowTimers_1 = WindowTimers;
  return WindowTimers_1;
}
var impl = {
  exports: {}
};
var hasRequiredImpl;
function requireImpl() {
  if (hasRequiredImpl) return impl.exports;
  hasRequiredImpl = 1;
  (function(module, exports) {
    var utils2 = requireUtils();
    exports = module.exports = {
      CSSStyleDeclaration: requireCSSStyleDeclaration(),
      CharacterData: requireCharacterData(),
      Comment: requireComment(),
      DOMImplementation: requireDOMImplementation(),
      DOMTokenList: requireDOMTokenList(),
      Document: requireDocument(),
      DocumentFragment: requireDocumentFragment(),
      DocumentType: requireDocumentType(),
      Element: requireElement(),
      HTMLParser: requireHTMLParser(),
      NamedNodeMap: requireNamedNodeMap(),
      Node: requireNode(),
      NodeList: requireNodeList(),
      NodeFilter: requireNodeFilter(),
      ProcessingInstruction: requireProcessingInstruction(),
      Text: requireText(),
      Window: requireWindow()
    };
    utils2.merge(exports, requireEvents());
    utils2.merge(exports, requireHtmlelts().elements);
    utils2.merge(exports, requireSvg().elements);
  })(impl, impl.exports);
  return impl.exports;
}
var Window_1;
var hasRequiredWindow;
function requireWindow() {
  if (hasRequiredWindow) return Window_1;
  hasRequiredWindow = 1;
  var DOMImplementation = requireDOMImplementation();
  var EventTarget = requireEventTarget();
  var Location = requireLocation();
  var utils2 = requireUtils();
  Window_1 = Window;
  function Window(document2) {
    this.document = document2 || new DOMImplementation(null).createHTMLDocument("");
    this.document._scripting_enabled = true;
    this.document.defaultView = this;
    this.location = new Location(this, this.document._address || "about:blank");
  }
  Window.prototype = Object.create(EventTarget.prototype, {
    console: {
      value: console
    },
    history: {
      value: {
        back: utils2.nyi,
        forward: utils2.nyi,
        go: utils2.nyi
      }
    },
    navigator: {
      value: requireNavigatorID()
    },
    // Self-referential properties
    window: {
      get: function() {
        return this;
      }
    },
    self: {
      get: function() {
        return this;
      }
    },
    frames: {
      get: function() {
        return this;
      }
    },
    // Self-referential properties for a top-level window
    parent: {
      get: function() {
        return this;
      }
    },
    top: {
      get: function() {
        return this;
      }
    },
    // We don't support any other windows for now
    length: {
      value: 0
    },
    // no frames
    frameElement: {
      value: null
    },
    // not part of a frame
    opener: {
      value: null
    },
    // not opened by another window
    // The onload event handler.
    // XXX: need to support a bunch of other event types, too,
    // and have them interoperate with document.body.
    onload: {
      get: function() {
        return this._getEventHandler("load");
      },
      set: function(v) {
        this._setEventHandler("load", v);
      }
    },
    // XXX This is a completely broken implementation
    getComputedStyle: {
      value: function getComputedStyle(elt) {
        return elt.style;
      }
    }
  });
  utils2.expose(requireWindowTimers(), Window);
  utils2.expose(requireImpl(), Window);
  return Window_1;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  (function(exports) {
    var DOMImplementation = requireDOMImplementation();
    var HTMLParser = requireHTMLParser();
    requireWindow();
    var impl2 = requireImpl();
    exports.createDOMImplementation = function() {
      return new DOMImplementation(null);
    };
    exports.createDocument = function(html, force) {
      if (html || force) {
        var parser2 = new HTMLParser();
        parser2.parse(html || "", true);
        return parser2.document();
      }
      return new DOMImplementation(null).createHTMLDocument("");
    };
    exports.createIncrementalHTMLParser = function() {
      var parser2 = new HTMLParser();
      return {
        /** Provide an additional chunk of text to be parsed. */
        write: function(s) {
          if (s.length > 0) {
            parser2.parse(s, false, function() {
              return true;
            });
          }
        },
        /**
         * Signal that we are done providing input text, optionally
         * providing one last chunk as a parameter.
         */
        end: function(s) {
          parser2.parse(s || "", true, function() {
            return true;
          });
        },
        /**
         * Performs a chunk of parsing work, returning at the end of
         * the next token as soon as shouldPauseFunc() returns true.
         * Returns true iff there is more work to do.
         *
         * For example:
         * ```
         *  var incrParser = domino.createIncrementalHTMLParser();
         *  incrParser.end('...long html document...');
         *  while (true) {
         *    // Pause every 10ms
         *    var start = Date.now();
         *    var pauseIn10 = function() { return (Date.now() - start) >= 10; };
         *    if (!incrParser.process(pauseIn10)) {
         *      break;
         *    }
         *    ...yield to other tasks, do other housekeeping, etc...
         *  }
         * ```
         */
        process: function(shouldPauseFunc) {
          return parser2.parse("", false, shouldPauseFunc);
        },
        /**
         * Returns the result of the incremental parse.  Valid after
         * `this.end()` has been called and `this.process()` has returned
         * false.
         */
        document: function() {
          return parser2.document();
        }
      };
    };
    exports.createWindow = function(html, address) {
      var document2 = exports.createDocument(html);
      if (address !== void 0) {
        document2._address = address;
      }
      return new impl2.Window(document2);
    };
    exports.impl = impl2;
  })(lib);
  return lib;
}
var libExports = requireLib();
var index = getDefaultExportFromCjs(libExports);
function setDomTypes() {
  Object.assign(globalThis, index.impl);
  globalThis["KeyboardEvent"] = index.impl.Event;
}
function parseDocument(html, url = "/") {
  let window2 = index.createWindow(html, url);
  let doc = window2.document;
  return doc;
}
function serializeDocument(doc) {
  return doc.serialize();
}
var DominoAdapter = class _DominoAdapter extends BrowserDomAdapter {
  static makeCurrent() {
    setDomTypes();
    setRootDomAdapter(new _DominoAdapter());
  }
  supportsDOMEvents = false;
  static defaultDoc;
  createHtmlDocument() {
    return parseDocument("<html><head><title>fakeTitle</title></head><body></body></html>");
  }
  getDefaultDocument() {
    if (!_DominoAdapter.defaultDoc) {
      _DominoAdapter.defaultDoc = index.createDocument();
    }
    return _DominoAdapter.defaultDoc;
  }
  isElementNode(node2) {
    return node2 ? node2.nodeType === _DominoAdapter.defaultDoc.ELEMENT_NODE : false;
  }
  isShadowRoot(node2) {
    return node2.shadowRoot == node2;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
  getGlobalEventTarget(doc, target) {
    if (target === "window") {
      return doc.defaultView;
    }
    if (target === "document") {
      return doc;
    }
    if (target === "body") {
      return doc.body;
    }
    return null;
  }
  getBaseHref(doc) {
    const length = doc.head.children.length;
    for (let i = 0; i < length; i++) {
      const child = doc.head.children[i];
      if (child.tagName === "BASE") {
        return child.getAttribute("href") || "";
      }
    }
    return "";
  }
  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
    const doc = el.ownerDocument || el;
    const win = doc.defaultView;
    if (win) {
      win.dispatchEvent(evt);
    }
  }
  getUserAgent() {
    return "Fake user agent";
  }
  getCookie(name) {
    throw new Error("getCookie has not been implemented");
  }
};
var INITIAL_CONFIG = new InjectionToken("Server.INITIAL_CONFIG");
var BEFORE_APP_SERIALIZED = new InjectionToken("Server.RENDER_MODULE_HOOK");
var ENABLE_DOM_EMULATION = new InjectionToken("ENABLE_DOM_EMULATION");
var PlatformState = class _PlatformState {
  _doc;
  /* @internal */
  _enableDomEmulation = enableDomEmulation(inject(Injector));
  constructor(_doc) {
    this._doc = _doc;
  }
  /**
   * Renders the current state of the platform to string.
   */
  renderToString() {
    if (ngDevMode && !this._enableDomEmulation && !window?.document) {
      throw new Error("Disabled DOM emulation should only run in browser environments");
    }
    const measuringLabel = "renderToString";
    startMeasuring(measuringLabel);
    const rendered = this._enableDomEmulation ? serializeDocument(this._doc) : (
      // In the case we run/test the platform-server in a browser environment
      this._doc.documentElement.outerHTML
    );
    stopMeasuring(measuringLabel);
    return rendered;
  }
  /**
   * Returns the current DOM state.
   */
  getDocument() {
    return this._doc;
  }
  static ɵfac = function PlatformState_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlatformState)(ɵɵinject(DOCUMENT));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _PlatformState,
    factory: _PlatformState.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformState, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
function enableDomEmulation(injector) {
  return injector.get(ENABLE_DOM_EMULATION, true);
}
var ServerXhr = class _ServerXhr {
  xhrImpl;
  // The `xhr2` dependency has a side-effect of accessing and modifying a
  // global scope. Loading `xhr2` dynamically allows us to delay the loading
  // and start the process once the global scope is established by the underlying
  // server platform (via shims, etc).
  async ɵloadImpl() {
    if (!this.xhrImpl) {
      const {
        default: xhr
      } = await import("./xhr2-E5RTESSH.js");
      this.xhrImpl = xhr;
    }
  }
  build() {
    const impl2 = this.xhrImpl;
    if (!impl2) {
      throw new Error("Unexpected state in ServerXhr: XHR implementation is not loaded.");
    }
    return new impl2.XMLHttpRequest();
  }
  static ɵfac = function ServerXhr_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServerXhr)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ServerXhr,
    factory: _ServerXhr.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerXhr, [{
    type: Injectable
  }], null, null);
})();
function relativeUrlsTransformerInterceptorFn(request, next) {
  const platformLocation = inject(PlatformLocation);
  const {
    href,
    protocol,
    hostname,
    port
  } = platformLocation;
  if (!protocol.startsWith("http")) {
    return next(request);
  }
  let urlPrefix = `${protocol}//${hostname}`;
  if (port) {
    urlPrefix += `:${port}`;
  }
  const baseHref = platformLocation.getBaseHrefFromDOM() || href;
  const baseUrl = new URL(baseHref, urlPrefix);
  const newUrl = new URL(request.url, baseUrl).toString();
  return next(request.clone({
    url: newUrl
  }));
}
var SERVER_HTTP_PROVIDERS = [{
  provide: XhrFactory,
  useClass: ServerXhr
}, {
  provide: HTTP_ROOT_INTERCEPTOR_FNS,
  useValue: relativeUrlsTransformerInterceptorFn,
  multi: true
}];
var RESOLVE_PROTOCOL = "resolve:";
function parseUrl(urlStr) {
  const {
    hostname,
    protocol,
    port,
    pathname,
    search,
    hash
  } = new URL(urlStr, RESOLVE_PROTOCOL + "//");
  return {
    hostname,
    protocol: protocol === RESOLVE_PROTOCOL ? "" : protocol,
    port,
    pathname,
    search,
    hash
  };
}
var ServerPlatformLocation = class _ServerPlatformLocation {
  _doc;
  href = "/";
  hostname = "/";
  protocol = "/";
  port = "/";
  pathname = "/";
  search = "";
  hash = "";
  _hashUpdate = new import_rxjs.Subject();
  constructor(_doc, _config) {
    this._doc = _doc;
    const config2 = _config;
    if (!config2) {
      return;
    }
    if (config2.url) {
      const url = parseUrl(config2.url);
      this.protocol = url.protocol;
      this.hostname = url.hostname;
      this.port = url.port;
      this.pathname = url.pathname;
      this.search = url.search;
      this.hash = url.hash;
      this.href = _doc.location.href;
    }
  }
  getBaseHrefFromDOM() {
    return getDOM().getBaseHref(this._doc);
  }
  onPopState(fn) {
    return () => {
    };
  }
  onHashChange(fn) {
    const subscription = this._hashUpdate.subscribe(fn);
    return () => subscription.unsubscribe();
  }
  get url() {
    return `${this.pathname}${this.search}${this.hash}`;
  }
  setHash(value, oldUrl) {
    if (this.hash === value) {
      return;
    }
    this.hash = value;
    const newUrl = this.url;
    queueMicrotask(() => this._hashUpdate.next({
      type: "hashchange",
      state: null,
      oldUrl,
      newUrl
    }));
  }
  replaceState(state, title, newUrl) {
    const oldUrl = this.url;
    const parsedUrl = parseUrl(newUrl);
    this.pathname = parsedUrl.pathname;
    this.search = parsedUrl.search;
    this.setHash(parsedUrl.hash, oldUrl);
  }
  pushState(state, title, newUrl) {
    this.replaceState(state, title, newUrl);
  }
  forward() {
    throw new Error("Not implemented");
  }
  back() {
    throw new Error("Not implemented");
  }
  // History API isn't available on server, therefore return undefined
  getState() {
    return void 0;
  }
  static ɵfac = function ServerPlatformLocation_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServerPlatformLocation)(ɵɵinject(DOCUMENT), ɵɵinject(INITIAL_CONFIG, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ServerPlatformLocation,
    factory: _ServerPlatformLocation.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerPlatformLocation, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [INITIAL_CONFIG]
    }]
  }], null);
})();
var ServerEventManagerPlugin = class _ServerEventManagerPlugin extends EventManagerPlugin {
  doc;
  constructor(doc) {
    super(doc);
    this.doc = doc;
  }
  // Handle all events on the server.
  supports(eventName) {
    return true;
  }
  addEventListener(element, eventName, handler, options) {
    return getDOM().onAndCancel(element, eventName, handler, options);
  }
  static ɵfac = function ServerEventManagerPlugin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServerEventManagerPlugin)(ɵɵinject(DOCUMENT));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ServerEventManagerPlugin,
    factory: _ServerEventManagerPlugin.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerEventManagerPlugin, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var TRANSFER_STATE_STATUS = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "TRANSFER_STATE_STATUS" : "", {
  providedIn: "root",
  factory: () => ({
    serialized: false
  })
});
var TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
  provide: BEFORE_APP_SERIALIZED,
  useFactory: serializeTransferStateFactory,
  multi: true
}];
function createScript(doc, textContent2, nonce) {
  const script = doc.createElement("script");
  script.textContent = textContent2;
  if (nonce) {
    script.setAttribute("nonce", nonce);
  }
  return script;
}
function warnIfStateTransferHappened(injector) {
  const transferStateStatus = injector.get(TRANSFER_STATE_STATUS);
  if (transferStateStatus.serialized) {
    console.warn(`Angular detected an incompatible configuration, which causes duplicate serialization of the server-side application state.

This can happen if the server providers have been provided more than once using different mechanisms. For example:

  imports: [ServerModule], // Registers server providers
  providers: [provideServerRendering()] // Also registers server providers

To fix this, ensure that the \`provideServerRendering()\` function is the only provider used and remove the other(s).`);
  }
  transferStateStatus.serialized = true;
}
function serializeTransferStateFactory() {
  const doc = inject(DOCUMENT);
  const appId = inject(APP_ID);
  const transferStore = inject(TransferState);
  const injector = inject(Injector);
  return () => {
    const measuringLabel = "serializeTransferStateFactory";
    startMeasuring(measuringLabel);
    const content = transferStore.toJson();
    if (transferStore.isEmpty) {
      return;
    }
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      warnIfStateTransferHappened(injector);
    }
    const script = createScript(
      doc,
      content,
      /**
       * `nonce` is not required for 'application/json'
       * See: https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type
       */
      null
    );
    script.id = appId + "-state";
    script.setAttribute("type", "application/json");
    doc.body.appendChild(script);
    stopMeasuring(measuringLabel);
  };
}
var INTERNAL_SERVER_PLATFORM_PROVIDERS = [{
  provide: DOCUMENT,
  useFactory: _document,
  deps: [Injector]
}, {
  provide: PLATFORM_ID,
  useValue: PLATFORM_SERVER_ID
}, {
  provide: PLATFORM_INITIALIZER,
  useFactory: initDominoAdapter,
  multi: true,
  deps: [Injector]
}, {
  provide: PlatformLocation,
  useClass: ServerPlatformLocation,
  deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
}, {
  provide: PlatformState,
  deps: [DOCUMENT]
}];
function initDominoAdapter(injector) {
  const _enableDomEmulation = enableDomEmulation(injector);
  return () => {
    if (_enableDomEmulation) {
      DominoAdapter.makeCurrent();
    } else {
      BrowserDomAdapter.makeCurrent();
    }
  };
}
var SERVER_RENDER_PROVIDERS = [{
  provide: EVENT_MANAGER_PLUGINS,
  multi: true,
  useClass: ServerEventManagerPlugin
}];
var PLATFORM_SERVER_PROVIDERS = [
  TRANSFER_STATE_SERIALIZATION_PROVIDERS,
  SERVER_RENDER_PROVIDERS,
  SERVER_HTTP_PROVIDERS,
  {
    provide: Testability,
    useValue: null
  },
  // Keep for backwards-compatibility.
  {
    provide: TESTABILITY,
    useValue: null
  },
  {
    provide: ViewportScroller,
    useClass: NullViewportScroller
  }
];
var ServerModule = class _ServerModule {
  static ɵfac = function ServerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ServerModule,
    exports: [BrowserModule]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: PLATFORM_SERVER_PROVIDERS,
    imports: [BrowserModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerModule, [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: PLATFORM_SERVER_PROVIDERS
    }]
  }], null, null);
})();
function _document(injector) {
  const config2 = injector.get(INITIAL_CONFIG, null);
  const _enableDomEmulation = enableDomEmulation(injector);
  let document2;
  if (config2 && config2.document) {
    document2 = typeof config2.document === "string" ? _enableDomEmulation ? parseDocument(config2.document, config2.url) : window.document : config2.document;
  } else {
    document2 = getDOM().createHtmlDocument();
  }
  setDocument(document2);
  return document2;
}
function platformServer(extraProviders) {
  const noServerModeSet = false;
  if (noServerModeSet) {
    globalThis["ngServerMode"] = true;
  }
  const platform = createPlatformFactory(platformCore, "server", INTERNAL_SERVER_PLATFORM_PROVIDERS)(extraProviders);
  if (noServerModeSet) {
    platform.onDestroy(() => {
      globalThis["ngServerMode"] = void 0;
    });
  }
  return platform;
}

// node_modules/@angular/platform-server/fesm2022/platform-server.mjs
var import_rxjs2 = __toESM(require_cjs(), 1);
function provideServerRendering() {
  if (false) {
    globalThis["ngServerMode"] = true;
  }
  return makeEnvironmentProviders([...PLATFORM_SERVER_PROVIDERS]);
}
var EVENT_DISPATCH_SCRIPT_ID = "ng-event-dispatch-contract";
function createServerPlatform(options) {
  const extraProviders = options.platformProviders ?? [];
  const measuringLabel = "createServerPlatform";
  startMeasuring(measuringLabel);
  const platform = platformServer([
    { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
    extraProviders
  ]);
  stopMeasuring(measuringLabel);
  return platform;
}
function findEventDispatchScript(doc) {
  return doc.getElementById(EVENT_DISPATCH_SCRIPT_ID);
}
function removeEventDispatchScript(doc) {
  findEventDispatchScript(doc)?.remove();
}
function prepareForHydration(platformState, applicationRef) {
  const measuringLabel = "prepareForHydration";
  startMeasuring(measuringLabel);
  const environmentInjector = applicationRef.injector;
  const doc = platformState.getDocument();
  if (!environmentInjector.get(IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
    removeEventDispatchScript(doc);
    return;
  }
  appendSsrContentIntegrityMarker(doc);
  const eventTypesToReplay = annotateForHydration(applicationRef, doc);
  if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) {
    insertEventRecordScript(environmentInjector.get(APP_ID), doc, eventTypesToReplay, environmentInjector.get(CSP_NONCE, null));
  } else {
    removeEventDispatchScript(doc);
  }
  stopMeasuring(measuringLabel);
}
function appendSsrContentIntegrityMarker(doc) {
  const comment2 = doc.createComment(SSR_CONTENT_INTEGRITY_MARKER);
  doc.body.firstChild ? doc.body.insertBefore(comment2, doc.body.firstChild) : doc.body.append(comment2);
}
function appendServerContextInfo(applicationRef) {
  const injector = applicationRef.injector;
  let serverContext = sanitizeServerContext(injector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
  applicationRef.components.forEach((componentRef) => {
    const renderer = componentRef.injector.get(Renderer2);
    const element = componentRef.location.nativeElement;
    if (element) {
      renderer.setAttribute(element, "ng-server-context", serverContext);
    }
  });
}
function insertEventRecordScript(appId, doc, eventTypesToReplay, nonce) {
  const measuringLabel = "insertEventRecordScript";
  startMeasuring(measuringLabel);
  const { regular, capture } = eventTypesToReplay;
  const eventDispatchScript = findEventDispatchScript(doc);
  if (eventDispatchScript) {
    const replayScriptContents = `window.__jsaction_bootstrap(document.body,"${appId}",${JSON.stringify(Array.from(regular))},${JSON.stringify(Array.from(capture))});`;
    const replayScript = createScript(doc, replayScriptContents, nonce);
    eventDispatchScript.after(replayScript);
  }
  stopMeasuring(measuringLabel);
}
async function renderInternal(platformRef, applicationRef) {
  const platformState = platformRef.injector.get(PlatformState);
  prepareForHydration(platformState, applicationRef);
  appendServerContextInfo(applicationRef);
  const environmentInjector = applicationRef.injector;
  const callbacks = environmentInjector.get(BEFORE_APP_SERIALIZED, null);
  if (callbacks) {
    const asyncCallbacks = [];
    for (const callback of callbacks) {
      try {
        const callbackResult = callback();
        if (callbackResult) {
          asyncCallbacks.push(callbackResult);
        }
      } catch (e) {
        console.warn("Ignoring BEFORE_APP_SERIALIZED Exception: ", e);
      }
    }
    if (asyncCallbacks.length) {
      for (const result2 of await Promise.allSettled(asyncCallbacks)) {
        if (result2.status === "rejected") {
          console.warn("Ignoring BEFORE_APP_SERIALIZED Exception: ", result2.reason);
        }
      }
    }
  }
  return platformState.renderToString();
}
function asyncDestroyPlatform(platformRef) {
  return new Promise((resolve2) => {
    setTimeout(() => {
      platformRef.destroy();
      resolve2();
    }, 0);
  });
}
var DEFAULT_SERVER_CONTEXT = "other";
var SERVER_CONTEXT = new InjectionToken("SERVER_CONTEXT");
function sanitizeServerContext(serverContext) {
  const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, "");
  return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
async function renderModule(moduleType, options) {
  const { document: document2, url, extraProviders: platformProviders } = options;
  const platformRef = createServerPlatform({ document: document2, url, platformProviders });
  try {
    const moduleRef = await platformRef.bootstrapModule(moduleType);
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    const measuringLabel = "whenStable";
    startMeasuring(measuringLabel);
    await applicationRef.whenStable();
    stopMeasuring(measuringLabel);
    return await renderInternal(platformRef, applicationRef);
  } finally {
    await asyncDestroyPlatform(platformRef);
  }
}
async function renderApplication(bootstrap, options) {
  const renderAppLabel = "renderApplication";
  const bootstrapLabel = "bootstrap";
  const _renderLabel = "_render";
  startMeasuring(renderAppLabel);
  const platformRef = createServerPlatform(options);
  try {
    startMeasuring(bootstrapLabel);
    const applicationRef = await bootstrap({ platformRef });
    stopMeasuring(bootstrapLabel);
    startMeasuring(_renderLabel);
    const measuringLabel = "whenStable";
    startMeasuring(measuringLabel);
    await applicationRef.whenStable();
    stopMeasuring(measuringLabel);
    const rendered = await renderInternal(platformRef, applicationRef);
    stopMeasuring(_renderLabel);
    return rendered;
  } finally {
    await asyncDestroyPlatform(platformRef);
    stopMeasuring(renderAppLabel);
  }
}
var VERSION = new Version("20.3.10");

// node_modules/@angular/ssr/third_party/beasties/index.js
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}
function notImplemented(name) {
  const fn = () => {
    throw createNotImplementedError(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
var access = notImplemented("fs.access");
var copyFile = notImplemented("fs.copyFile");
var cp = notImplemented("fs.cp");
var open = notImplemented("fs.open");
var opendir = notImplemented("fs.opendir");
var rename = notImplemented("fs.rename");
var truncate = notImplemented("fs.truncate");
var rm = notImplemented("fs.rm");
var rmdir = notImplemented("fs.rmdir");
var mkdir = notImplemented("fs.mkdir");
var readdir = notImplemented("fs.readdir");
var readlink = notImplemented("fs.readlink");
var symlink = notImplemented("fs.symlink");
var lstat = notImplemented("fs.lstat");
var stat = notImplemented("fs.stat");
var link = notImplemented("fs.link");
var unlink = notImplemented("fs.unlink");
var chmod = notImplemented("fs.chmod");
var lchmod = notImplemented("fs.lchmod");
var lchown = notImplemented("fs.lchown");
var chown = notImplemented("fs.chown");
var utimes = notImplemented("fs.utimes");
var lutimes = notImplemented("fs.lutimes");
var realpath = notImplemented("fs.realpath");
var mkdtemp = notImplemented("fs.mkdtemp");
var writeFile$1 = notImplemented("fs.writeFile");
var appendFile = notImplemented("fs.appendFile");
var readFile$1 = notImplemented("fs.readFile");
notImplemented("fs.watch");
var statfs = notImplemented("fs.statfs");
function notImplementedAsync(name) {
  const fn = notImplemented(name);
  fn.__promisify__ = () => notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
function callbackify(fn) {
  const fnc = function(...args) {
    const cb = args.pop();
    fn().catch((error) => cb(error)).then((val) => cb(void 0, val));
  };
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
callbackify(access);
callbackify(appendFile);
callbackify(chown);
callbackify(chmod);
callbackify(copyFile);
callbackify(cp);
callbackify(lchown);
callbackify(lchmod);
callbackify(link);
callbackify(lstat);
callbackify(lutimes);
callbackify(mkdir);
callbackify(mkdtemp);
callbackify(realpath);
callbackify(open);
callbackify(opendir);
callbackify(readdir);
var readFile = callbackify(readFile$1);
callbackify(readlink);
callbackify(rename);
callbackify(rm);
callbackify(rmdir);
callbackify(stat);
callbackify(symlink);
callbackify(truncate);
callbackify(unlink);
callbackify(utimes);
var writeFile = callbackify(writeFile$1);
callbackify(statfs);
notImplementedAsync("fs.close");
notImplementedAsync(
  "fs.createReadStream"
);
notImplementedAsync("fs.createWriteStream");
notImplementedAsync("fs.exists");
notImplementedAsync("fs.fchown");
notImplementedAsync("fs.fchmod");
notImplementedAsync("fs.fdatasync");
notImplementedAsync("fs.fstat");
notImplementedAsync("fs.fsync");
notImplementedAsync("fs.ftruncate");
notImplementedAsync("fs.futimes");
notImplementedAsync("fs.lstatSync");
notImplementedAsync("fs.read");
notImplementedAsync("fs.readv");
notImplementedAsync("fs.realpathSync");
notImplementedAsync("fs.statSync");
notImplementedAsync("fs.unwatchFile");
notImplementedAsync("fs.watch");
notImplementedAsync("fs.watchFile");
notImplementedAsync("fs.write");
notImplementedAsync("fs.writev");
notImplementedAsync("fs._toUnixTimestamp");
notImplementedAsync("fs.openAsBlob");
notImplemented("fs.appendFileSync");
notImplemented("fs.accessSync");
notImplemented("fs.chownSync");
notImplemented("fs.chmodSync");
notImplemented("fs.closeSync");
notImplemented("fs.copyFileSync");
notImplemented("fs.cpSync");
notImplemented("fs.fchownSync");
notImplemented("fs.fchmodSync");
notImplemented("fs.fdatasyncSync");
notImplemented("fs.fstatSync");
notImplemented("fs.fsyncSync");
notImplemented("fs.ftruncateSync");
notImplemented("fs.futimesSync");
notImplemented("fs.lchownSync");
notImplemented("fs.lchmodSync");
notImplemented("fs.linkSync");
notImplemented("fs.lutimesSync");
notImplemented("fs.mkdirSync");
notImplemented("fs.mkdtempSync");
notImplemented("fs.openSync");
notImplemented("fs.opendirSync");
notImplemented("fs.readdirSync");
notImplemented("fs.readSync");
notImplemented("fs.readvSync");
notImplemented("fs.readFileSync");
notImplemented("fs.readlinkSync");
notImplemented("fs.renameSync");
notImplemented("fs.rmSync");
notImplemented("fs.rmdirSync");
notImplemented("fs.symlinkSync");
notImplemented("fs.truncateSync");
notImplemented("fs.unlinkSync");
notImplemented("fs.utimesSync");
notImplemented("fs.writeFileSync");
notImplemented("fs.writeSync");
notImplemented("fs.writevSync");
notImplemented("fs.statfsSync");
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input2 = "") {
  if (!input2) {
    return input2;
  }
  return input2.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/;
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
var sep = "/";
var delimiter = ":";
var normalize = function(path2) {
  if (path2.length === 0) {
    return ".";
  }
  path2 = normalizeWindowsPath(path2);
  const isUNCPath = path2.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path2);
  const trailingSeparator = path2[path2.length - 1] === "/";
  path2 = normalizeString(path2, !isPathAbsolute);
  if (path2.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path2 += "/";
  }
  if (_DRIVE_LETTER_RE.test(path2)) {
    path2 += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path2}`;
    }
    return `//${path2}`;
  }
  return isPathAbsolute && !isAbsolute(path2) ? `/${path2}` : path2;
};
var join = function(...arguments_) {
  if (arguments_.length === 0) {
    return ".";
  }
  let joined;
  for (const argument of arguments_) {
    if (argument && argument.length > 0) {
      if (joined === void 0) {
        joined = argument;
      } else {
        joined += `/${argument}`;
      }
    }
  }
  if (joined === void 0) {
    return ".";
  }
  return normalize(joined.replace(/\/\/+/g, "/"));
};
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index2 = arguments_.length - 1; index2 >= -1 && !resolvedAbsolute; index2--) {
    const path2 = index2 >= 0 ? arguments_[index2] : cwd();
    if (!path2 || path2.length === 0) {
      continue;
    }
    resolvedPath = `${path2}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path2);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index2 = 0; index2 <= path2.length; ++index2) {
    if (index2 < path2.length) {
      char = path2[index2];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index2 - 1 || dots === 1) ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index2;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, index2)}`;
        } else {
          res = path2.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
var toNamespacedPath = function(p) {
  return normalizeWindowsPath(p);
};
var _EXTNAME_RE = /.(\.[^./]+)$/;
var extname = function(p) {
  const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match && match[1] || "";
};
var relative = function(from, to) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
var dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
var format = function(p) {
  const segments = [p.root, p.dir, p.base ?? p.name + p.ext].filter(Boolean);
  return normalizeWindowsPath(
    p.root ? resolve(...segments) : segments.join("/")
  );
};
var basename = function(p, extension) {
  const lastSegment = normalizeWindowsPath(p).split("/").pop();
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};
var parse$3 = function(p) {
  const root2 = normalizeWindowsPath(p).split("/").shift() || "/";
  const base = basename(p);
  const extension = extname(base);
  return {
    root: root2,
    dir: dirname(p),
    base,
    ext: extension,
    name: base.slice(0, base.length - extension.length)
  };
};
var path = {
  __proto__: null,
  basename,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  normalizeString,
  parse: parse$3,
  relative,
  resolve,
  sep,
  toNamespacedPath
};
var _path = Object.freeze({
  __proto__: null,
  basename,
  default: path,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  normalizeString,
  parse: parse$3,
  relative,
  resolve,
  sep,
  toNamespacedPath
});
var _pathModule = __spreadProps(__spreadValues({}, _path), {
  platform: "posix",
  posix: void 0,
  win32: void 0
});
_pathModule.posix = _pathModule;
_pathModule.win32 = _pathModule;
function getDefaultExportFromCjs2(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      var isInstance = false;
      try {
        isInstance = this instanceof a2;
      } catch {
      }
      if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var picocolors_browser = { exports: {} };
var hasRequiredPicocolors_browser;
function requirePicocolors_browser() {
  if (hasRequiredPicocolors_browser) return picocolors_browser.exports;
  hasRequiredPicocolors_browser = 1;
  var x = String;
  var create = function() {
    return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x, blackBright: x, redBright: x, greenBright: x, yellowBright: x, blueBright: x, magentaBright: x, cyanBright: x, whiteBright: x, bgBlackBright: x, bgRedBright: x, bgGreenBright: x, bgYellowBright: x, bgBlueBright: x, bgMagentaBright: x, bgCyanBright: x, bgWhiteBright: x };
  };
  picocolors_browser.exports = create();
  picocolors_browser.exports.createColors = create;
  return picocolors_browser.exports;
}
var _nodeResolve_empty = {};
var _nodeResolve_empty$1 = Object.freeze({
  __proto__: null,
  default: _nodeResolve_empty
});
var require$$2 = getAugmentedNamespace(_nodeResolve_empty$1);
var cssSyntaxError;
var hasRequiredCssSyntaxError;
function requireCssSyntaxError() {
  if (hasRequiredCssSyntaxError) return cssSyntaxError;
  hasRequiredCssSyntaxError = 1;
  let pico = requirePicocolors_browser();
  let terminalHighlight = require$$2;
  class CssSyntaxError extends Error {
    constructor(message, line, column, source, file, plugin) {
      super(message);
      this.name = "CssSyntaxError";
      this.reason = message;
      if (file) {
        this.file = file;
      }
      if (source) {
        this.source = source;
      }
      if (plugin) {
        this.plugin = plugin;
      }
      if (typeof line !== "undefined" && typeof column !== "undefined") {
        if (typeof line === "number") {
          this.line = line;
          this.column = column;
        } else {
          this.line = line.line;
          this.column = line.column;
          this.endLine = column.line;
          this.endColumn = column.column;
        }
      }
      this.setMessage();
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CssSyntaxError);
      }
    }
    setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "";
      this.message += this.file ? this.file : "<css input>";
      if (typeof this.line !== "undefined") {
        this.message += ":" + this.line + ":" + this.column;
      }
      this.message += ": " + this.reason;
    }
    showSourceCode(color) {
      if (!this.source) return "";
      let css = this.source;
      if (color == null) color = pico.isColorSupported;
      let aside = (text) => text;
      let mark = (text) => text;
      let highlight = (text) => text;
      if (color) {
        let { bold, gray, red } = pico.createColors(true);
        mark = (text) => bold(red(text));
        aside = (text) => gray(text);
        if (terminalHighlight) {
          highlight = (text) => terminalHighlight(text);
        }
      }
      let lines = css.split(/\r?\n/);
      let start = Math.max(this.line - 3, 0);
      let end = Math.min(this.line + 2, lines.length);
      let maxWidth = String(end).length;
      return lines.slice(start, end).map((line, index2) => {
        let number = start + 1 + index2;
        let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
        if (number === this.line) {
          if (line.length > 160) {
            let padding = 20;
            let subLineStart = Math.max(0, this.column - padding);
            let subLineEnd = Math.max(
              this.column + padding,
              this.endColumn + padding
            );
            let subLine = line.slice(subLineStart, subLineEnd);
            let spacing2 = aside(gutter.replace(/\d/g, " ")) + line.slice(0, Math.min(this.column - 1, padding - 1)).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + highlight(subLine) + "\n " + spacing2 + mark("^");
          }
          let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return mark(">") + aside(gutter) + highlight(line) + "\n " + spacing + mark("^");
        }
        return " " + aside(gutter) + highlight(line);
      }).join("\n");
    }
    toString() {
      let code = this.showSourceCode();
      if (code) {
        code = "\n\n" + code + "\n";
      }
      return this.name + ": " + this.message + code;
    }
  }
  cssSyntaxError = CssSyntaxError;
  CssSyntaxError.default = CssSyntaxError;
  return cssSyntaxError;
}
var stringifier;
var hasRequiredStringifier;
function requireStringifier() {
  if (hasRequiredStringifier) return stringifier;
  hasRequiredStringifier = 1;
  const DEFAULT_RAW = {
    after: "\n",
    beforeClose: "\n",
    beforeComment: "\n",
    beforeDecl: "\n",
    beforeOpen: " ",
    beforeRule: "\n",
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: false
  };
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  class Stringifier {
    constructor(builder) {
      this.builder = builder;
    }
    atrule(node2, semicolon) {
      let name = "@" + node2.name;
      let params = node2.params ? this.rawValue(node2, "params") : "";
      if (typeof node2.raws.afterName !== "undefined") {
        name += node2.raws.afterName;
      } else if (params) {
        name += " ";
      }
      if (node2.nodes) {
        this.block(node2, name + params);
      } else {
        let end = (node2.raws.between || "") + (semicolon ? ";" : "");
        this.builder(name + params + end, node2);
      }
    }
    beforeAfter(node2, detect) {
      let value;
      if (node2.type === "decl") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (node2.type === "comment") {
        value = this.raw(node2, null, "beforeComment");
      } else if (detect === "before") {
        value = this.raw(node2, null, "beforeRule");
      } else {
        value = this.raw(node2, null, "beforeClose");
      }
      let buf = node2.parent;
      let depth = 0;
      while (buf && buf.type !== "root") {
        depth += 1;
        buf = buf.parent;
      }
      if (value.includes("\n")) {
        let indent = this.raw(node2, null, "indent");
        if (indent.length) {
          for (let step = 0; step < depth; step++) value += indent;
        }
      }
      return value;
    }
    block(node2, start) {
      let between = this.raw(node2, "between", "beforeOpen");
      this.builder(start + between + "{", node2, "start");
      let after;
      if (node2.nodes && node2.nodes.length) {
        this.body(node2);
        after = this.raw(node2, "after");
      } else {
        after = this.raw(node2, "after", "emptyBody");
      }
      if (after) this.builder(after);
      this.builder("}", node2, "end");
    }
    body(node2) {
      let last = node2.nodes.length - 1;
      while (last > 0) {
        if (node2.nodes[last].type !== "comment") break;
        last -= 1;
      }
      let semicolon = this.raw(node2, "semicolon");
      for (let i = 0; i < node2.nodes.length; i++) {
        let child = node2.nodes[i];
        let before = this.raw(child, "before");
        if (before) this.builder(before);
        this.stringify(child, last !== i || semicolon);
      }
    }
    comment(node2) {
      let left = this.raw(node2, "left", "commentLeft");
      let right = this.raw(node2, "right", "commentRight");
      this.builder("/*" + left + node2.text + right + "*/", node2);
    }
    decl(node2, semicolon) {
      let between = this.raw(node2, "between", "colon");
      let string = node2.prop + between + this.rawValue(node2, "value");
      if (node2.important) {
        string += node2.raws.important || " !important";
      }
      if (semicolon) string += ";";
      this.builder(string, node2);
    }
    document(node2) {
      this.body(node2);
    }
    raw(node2, own, detect) {
      let value;
      if (!detect) detect = own;
      if (own) {
        value = node2.raws[own];
        if (typeof value !== "undefined") return value;
      }
      let parent = node2.parent;
      if (detect === "before") {
        if (!parent || parent.type === "root" && parent.first === node2) {
          return "";
        }
        if (parent && parent.type === "document") {
          return "";
        }
      }
      if (!parent) return DEFAULT_RAW[detect];
      let root2 = node2.root();
      if (!root2.rawCache) root2.rawCache = {};
      if (typeof root2.rawCache[detect] !== "undefined") {
        return root2.rawCache[detect];
      }
      if (detect === "before" || detect === "after") {
        return this.beforeAfter(node2, detect);
      } else {
        let method = "raw" + capitalize(detect);
        if (this[method]) {
          value = this[method](root2, node2);
        } else {
          root2.walk((i) => {
            value = i.raws[own];
            if (typeof value !== "undefined") return false;
          });
        }
      }
      if (typeof value === "undefined") value = DEFAULT_RAW[detect];
      root2.rawCache[detect] = value;
      return value;
    }
    rawBeforeClose(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && i.nodes.length > 0) {
          if (typeof i.raws.after !== "undefined") {
            value = i.raws.after;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
    rawBeforeComment(root2, node2) {
      let value;
      root2.walkComments((i) => {
        if (typeof i.raws.before !== "undefined") {
          value = i.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
    rawBeforeDecl(root2, node2) {
      let value;
      root2.walkDecls((i) => {
        if (typeof i.raws.before !== "undefined") {
          value = i.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeRule");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
    rawBeforeOpen(root2) {
      let value;
      root2.walk((i) => {
        if (i.type !== "decl") {
          value = i.raws.between;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
    rawBeforeRule(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && (i.parent !== root2 || root2.first !== i)) {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
    rawColon(root2) {
      let value;
      root2.walkDecls((i) => {
        if (typeof i.raws.between !== "undefined") {
          value = i.raws.between.replace(/[^\s:]/g, "");
          return false;
        }
      });
      return value;
    }
    rawEmptyBody(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && i.nodes.length === 0) {
          value = i.raws.after;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
    rawIndent(root2) {
      if (root2.raws.indent) return root2.raws.indent;
      let value;
      root2.walk((i) => {
        let p = i.parent;
        if (p && p !== root2 && p.parent && p.parent === root2) {
          if (typeof i.raws.before !== "undefined") {
            let parts = i.raws.before.split("\n");
            value = parts[parts.length - 1];
            value = value.replace(/\S/g, "");
            return false;
          }
        }
      });
      return value;
    }
    rawSemicolon(root2) {
      let value;
      root2.walk((i) => {
        if (i.nodes && i.nodes.length && i.last.type === "decl") {
          value = i.raws.semicolon;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
    rawValue(node2, prop) {
      let value = node2[prop];
      let raw = node2.raws[prop];
      if (raw && raw.value === value) {
        return raw.raw;
      }
      return value;
    }
    root(node2) {
      this.body(node2);
      if (node2.raws.after) this.builder(node2.raws.after);
    }
    rule(node2) {
      this.block(node2, this.rawValue(node2, "selector"));
      if (node2.raws.ownSemicolon) {
        this.builder(node2.raws.ownSemicolon, node2, "end");
      }
    }
    stringify(node2, semicolon) {
      if (!this[node2.type]) {
        throw new Error(
          "Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier."
        );
      }
      this[node2.type](node2, semicolon);
    }
  }
  stringifier = Stringifier;
  Stringifier.default = Stringifier;
  return stringifier;
}
var stringify_1;
var hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify_1;
  hasRequiredStringify = 1;
  let Stringifier = requireStringifier();
  function stringify2(node2, builder) {
    let str = new Stringifier(builder);
    str.stringify(node2);
  }
  stringify_1 = stringify2;
  stringify2.default = stringify2;
  return stringify_1;
}
var symbols = {};
var hasRequiredSymbols;
function requireSymbols() {
  if (hasRequiredSymbols) return symbols;
  hasRequiredSymbols = 1;
  symbols.isClean = Symbol("isClean");
  symbols.my = Symbol("my");
  return symbols;
}
var node;
var hasRequiredNode$1;
function requireNode$1() {
  if (hasRequiredNode$1) return node;
  hasRequiredNode$1 = 1;
  let CssSyntaxError = requireCssSyntaxError();
  let Stringifier = requireStringifier();
  let stringify2 = requireStringify();
  let { isClean, my } = requireSymbols();
  function cloneNode2(obj, parent) {
    let cloned = new obj.constructor();
    for (let i in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, i)) {
        continue;
      }
      if (i === "proxyCache") continue;
      let value = obj[i];
      let type = typeof value;
      if (i === "parent" && type === "object") {
        if (parent) cloned[i] = parent;
      } else if (i === "source") {
        cloned[i] = value;
      } else if (Array.isArray(value)) {
        cloned[i] = value.map((j) => cloneNode2(j, cloned));
      } else {
        if (type === "object" && value !== null) value = cloneNode2(value);
        cloned[i] = value;
      }
    }
    return cloned;
  }
  function sourceOffset(inputCSS, position) {
    if (position && typeof position.offset !== "undefined") {
      return position.offset;
    }
    let column = 1;
    let line = 1;
    let offset = 0;
    for (let i = 0; i < inputCSS.length; i++) {
      if (line === position.line && column === position.column) {
        offset = i;
        break;
      }
      if (inputCSS[i] === "\n") {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }
    return offset;
  }
  class Node2 {
    get proxyOf() {
      return this;
    }
    constructor(defaults = {}) {
      this.raws = {};
      this[isClean] = false;
      this[my] = true;
      for (let name in defaults) {
        if (name === "nodes") {
          this.nodes = [];
          for (let node2 of defaults[name]) {
            if (typeof node2.clone === "function") {
              this.append(node2.clone());
            } else {
              this.append(node2);
            }
          }
        } else {
          this[name] = defaults[name];
        }
      }
    }
    addToError(error) {
      error.postcssNode = this;
      if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
        let s = this.source;
        error.stack = error.stack.replace(
          /\n\s{4}at /,
          `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
        );
      }
      return error;
    }
    after(add) {
      this.parent.insertAfter(this, add);
      return this;
    }
    assign(overrides = {}) {
      for (let name in overrides) {
        this[name] = overrides[name];
      }
      return this;
    }
    before(add) {
      this.parent.insertBefore(this, add);
      return this;
    }
    cleanRaws(keepBetween) {
      delete this.raws.before;
      delete this.raws.after;
      if (!keepBetween) delete this.raws.between;
    }
    clone(overrides = {}) {
      let cloned = cloneNode2(this);
      for (let name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned;
    }
    cloneAfter(overrides = {}) {
      let cloned = this.clone(overrides);
      this.parent.insertAfter(this, cloned);
      return cloned;
    }
    cloneBefore(overrides = {}) {
      let cloned = this.clone(overrides);
      this.parent.insertBefore(this, cloned);
      return cloned;
    }
    error(message, opts = {}) {
      if (this.source) {
        let { end, start } = this.rangeBy(opts);
        return this.source.input.error(
          message,
          { column: start.column, line: start.line },
          { column: end.column, line: end.line },
          opts
        );
      }
      return new CssSyntaxError(message);
    }
    getProxyProcessor() {
      return {
        get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (prop === "root") {
            return () => node2.root().toProxy();
          } else {
            return node2[prop];
          }
        },
        set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
          prop === "text") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
    /* c8 ignore next 3 */
    markClean() {
      this[isClean] = true;
    }
    markDirty() {
      if (this[isClean]) {
        this[isClean] = false;
        let next = this;
        while (next = next.parent) {
          next[isClean] = false;
        }
      }
    }
    next() {
      if (!this.parent) return void 0;
      let index2 = this.parent.index(this);
      return this.parent.nodes[index2 + 1];
    }
    positionBy(opts = {}) {
      let pos = this.source.start;
      if (opts.index) {
        pos = this.positionInside(opts.index);
      } else if (opts.word) {
        let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
        let stringRepresentation = inputString.slice(
          sourceOffset(inputString, this.source.start),
          sourceOffset(inputString, this.source.end)
        );
        let index2 = stringRepresentation.indexOf(opts.word);
        if (index2 !== -1) pos = this.positionInside(index2);
      }
      return pos;
    }
    positionInside(index2) {
      let column = this.source.start.column;
      let line = this.source.start.line;
      let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
      let offset = sourceOffset(inputString, this.source.start);
      let end = offset + index2;
      for (let i = offset; i < end; i++) {
        if (inputString[i] === "\n") {
          column = 1;
          line += 1;
        } else {
          column += 1;
        }
      }
      return { column, line, offset: end };
    }
    prev() {
      if (!this.parent) return void 0;
      let index2 = this.parent.index(this);
      return this.parent.nodes[index2 - 1];
    }
    rangeBy(opts = {}) {
      let inputString = "document" in this.source.input ? this.source.input.document : this.source.input.css;
      let start = {
        column: this.source.start.column,
        line: this.source.start.line,
        offset: sourceOffset(inputString, this.source.start)
      };
      let end = this.source.end ? {
        column: this.source.end.column + 1,
        line: this.source.end.line,
        offset: typeof this.source.end.offset === "number" ? (
          // `source.end.offset` is exclusive, so we don't need to add 1
          this.source.end.offset
        ) : (
          // Since line/column in this.source.end is inclusive,
          // the `sourceOffset(... , this.source.end)` returns an inclusive offset.
          // So, we add 1 to convert it to exclusive.
          sourceOffset(inputString, this.source.end) + 1
        )
      } : {
        column: start.column + 1,
        line: start.line,
        offset: start.offset + 1
      };
      if (opts.word) {
        let stringRepresentation = inputString.slice(
          sourceOffset(inputString, this.source.start),
          sourceOffset(inputString, this.source.end)
        );
        let index2 = stringRepresentation.indexOf(opts.word);
        if (index2 !== -1) {
          start = this.positionInside(index2);
          end = this.positionInside(index2 + opts.word.length);
        }
      } else {
        if (opts.start) {
          start = {
            column: opts.start.column,
            line: opts.start.line,
            offset: sourceOffset(inputString, opts.start)
          };
        } else if (opts.index) {
          start = this.positionInside(opts.index);
        }
        if (opts.end) {
          end = {
            column: opts.end.column,
            line: opts.end.line,
            offset: sourceOffset(inputString, opts.end)
          };
        } else if (typeof opts.endIndex === "number") {
          end = this.positionInside(opts.endIndex);
        } else if (opts.index) {
          end = this.positionInside(opts.index + 1);
        }
      }
      if (end.line < start.line || end.line === start.line && end.column <= start.column) {
        end = {
          column: start.column + 1,
          line: start.line,
          offset: start.offset + 1
        };
      }
      return { end, start };
    }
    raw(prop, defaultType) {
      let str = new Stringifier();
      return str.raw(this, prop, defaultType);
    }
    remove() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.parent = void 0;
      return this;
    }
    replaceWith(...nodes) {
      if (this.parent) {
        let bookmark = this;
        let foundSelf = false;
        for (let node2 of nodes) {
          if (node2 === this) {
            foundSelf = true;
          } else if (foundSelf) {
            this.parent.insertAfter(bookmark, node2);
            bookmark = node2;
          } else {
            this.parent.insertBefore(bookmark, node2);
          }
        }
        if (!foundSelf) {
          this.remove();
        }
      }
      return this;
    }
    root() {
      let result2 = this;
      while (result2.parent && result2.parent.type !== "document") {
        result2 = result2.parent;
      }
      return result2;
    }
    toJSON(_, inputs) {
      let fixed = {};
      let emitInputs = inputs == null;
      inputs = inputs || /* @__PURE__ */ new Map();
      let inputsNextIndex = 0;
      for (let name in this) {
        if (!Object.prototype.hasOwnProperty.call(this, name)) {
          continue;
        }
        if (name === "parent" || name === "proxyCache") continue;
        let value = this[name];
        if (Array.isArray(value)) {
          fixed[name] = value.map((i) => {
            if (typeof i === "object" && i.toJSON) {
              return i.toJSON(null, inputs);
            } else {
              return i;
            }
          });
        } else if (typeof value === "object" && value.toJSON) {
          fixed[name] = value.toJSON(null, inputs);
        } else if (name === "source") {
          if (value == null) continue;
          let inputId = inputs.get(value.input);
          if (inputId == null) {
            inputId = inputsNextIndex;
            inputs.set(value.input, inputsNextIndex);
            inputsNextIndex++;
          }
          fixed[name] = {
            end: value.end,
            inputId,
            start: value.start
          };
        } else {
          fixed[name] = value;
        }
      }
      if (emitInputs) {
        fixed.inputs = [...inputs.keys()].map((input2) => input2.toJSON());
      }
      return fixed;
    }
    toProxy() {
      if (!this.proxyCache) {
        this.proxyCache = new Proxy(this, this.getProxyProcessor());
      }
      return this.proxyCache;
    }
    toString(stringifier2 = stringify2) {
      if (stringifier2.stringify) stringifier2 = stringifier2.stringify;
      let result2 = "";
      stringifier2(this, (i) => {
        result2 += i;
      });
      return result2;
    }
    warn(result2, text, opts = {}) {
      let data = { node: this };
      for (let i in opts) data[i] = opts[i];
      return result2.warn(text, data);
    }
  }
  node = Node2;
  Node2.default = Node2;
  return node;
}
var comment;
var hasRequiredComment2;
function requireComment2() {
  if (hasRequiredComment2) return comment;
  hasRequiredComment2 = 1;
  let Node2 = requireNode$1();
  class Comment2 extends Node2 {
    constructor(defaults) {
      super(defaults);
      this.type = "comment";
    }
  }
  comment = Comment2;
  Comment2.default = Comment2;
  return comment;
}
var declaration;
var hasRequiredDeclaration;
function requireDeclaration() {
  if (hasRequiredDeclaration) return declaration;
  hasRequiredDeclaration = 1;
  let Node2 = requireNode$1();
  class Declaration extends Node2 {
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
    constructor(defaults) {
      if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
        defaults = __spreadProps(__spreadValues({}, defaults), { value: String(defaults.value) });
      }
      super(defaults);
      this.type = "decl";
    }
  }
  declaration = Declaration;
  Declaration.default = Declaration;
  return declaration;
}
var container;
var hasRequiredContainer$1;
function requireContainer$1() {
  if (hasRequiredContainer$1) return container;
  hasRequiredContainer$1 = 1;
  let Comment2 = requireComment2();
  let Declaration = requireDeclaration();
  let Node2 = requireNode$1();
  let { isClean, my } = requireSymbols();
  let AtRule, parse2, Root2, Rule;
  function cleanSource(nodes) {
    return nodes.map((i) => {
      if (i.nodes) i.nodes = cleanSource(i.nodes);
      delete i.source;
      return i;
    });
  }
  function markTreeDirty(node2) {
    node2[isClean] = false;
    if (node2.proxyOf.nodes) {
      for (let i of node2.proxyOf.nodes) {
        markTreeDirty(i);
      }
    }
  }
  class Container2 extends Node2 {
    get first() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[0];
    }
    get last() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
    append(...children) {
      for (let child of children) {
        let nodes = this.normalize(child, this.last);
        for (let node2 of nodes) this.proxyOf.nodes.push(node2);
      }
      this.markDirty();
      return this;
    }
    cleanRaws(keepBetween) {
      super.cleanRaws(keepBetween);
      if (this.nodes) {
        for (let node2 of this.nodes) node2.cleanRaws(keepBetween);
      }
    }
    each(callback) {
      if (!this.proxyOf.nodes) return void 0;
      let iterator = this.getIterator();
      let index2, result2;
      while (this.indexes[iterator] < this.proxyOf.nodes.length) {
        index2 = this.indexes[iterator];
        result2 = callback(this.proxyOf.nodes[index2], index2);
        if (result2 === false) break;
        this.indexes[iterator] += 1;
      }
      delete this.indexes[iterator];
      return result2;
    }
    every(condition) {
      return this.nodes.every(condition);
    }
    getIterator() {
      if (!this.lastEach) this.lastEach = 0;
      if (!this.indexes) this.indexes = {};
      this.lastEach += 1;
      let iterator = this.lastEach;
      this.indexes[iterator] = 0;
      return iterator;
    }
    getProxyProcessor() {
      return {
        get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (!node2[prop]) {
            return node2[prop];
          } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
            return (...args) => {
              return node2[prop](
                ...args.map((i) => {
                  if (typeof i === "function") {
                    return (child, index2) => i(child.toProxy(), index2);
                  } else {
                    return i;
                  }
                })
              );
            };
          } else if (prop === "every" || prop === "some") {
            return (cb) => {
              return node2[prop](
                (child, ...other) => cb(child.toProxy(), ...other)
              );
            };
          } else if (prop === "root") {
            return () => node2.root().toProxy();
          } else if (prop === "nodes") {
            return node2.nodes.map((i) => i.toProxy());
          } else if (prop === "first" || prop === "last") {
            return node2[prop].toProxy();
          } else {
            return node2[prop];
          }
        },
        set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "name" || prop === "params" || prop === "selector") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
    index(child) {
      if (typeof child === "number") return child;
      if (child.proxyOf) child = child.proxyOf;
      return this.proxyOf.nodes.indexOf(child);
    }
    insertAfter(exist, add) {
      let existIndex = this.index(exist);
      let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
      existIndex = this.index(exist);
      for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node2);
      let index2;
      for (let id in this.indexes) {
        index2 = this.indexes[id];
        if (existIndex < index2) {
          this.indexes[id] = index2 + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
    insertBefore(exist, add) {
      let existIndex = this.index(exist);
      let type = existIndex === 0 ? "prepend" : false;
      let nodes = this.normalize(
        add,
        this.proxyOf.nodes[existIndex],
        type
      ).reverse();
      existIndex = this.index(exist);
      for (let node2 of nodes) this.proxyOf.nodes.splice(existIndex, 0, node2);
      let index2;
      for (let id in this.indexes) {
        index2 = this.indexes[id];
        if (existIndex <= index2) {
          this.indexes[id] = index2 + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
    normalize(nodes, sample) {
      if (typeof nodes === "string") {
        nodes = cleanSource(parse2(nodes).nodes);
      } else if (typeof nodes === "undefined") {
        nodes = [];
      } else if (Array.isArray(nodes)) {
        nodes = nodes.slice(0);
        for (let i of nodes) {
          if (i.parent) i.parent.removeChild(i, "ignore");
        }
      } else if (nodes.type === "root" && this.type !== "document") {
        nodes = nodes.nodes.slice(0);
        for (let i of nodes) {
          if (i.parent) i.parent.removeChild(i, "ignore");
        }
      } else if (nodes.type) {
        nodes = [nodes];
      } else if (nodes.prop) {
        if (typeof nodes.value === "undefined") {
          throw new Error("Value field is missed in node creation");
        } else if (typeof nodes.value !== "string") {
          nodes.value = String(nodes.value);
        }
        nodes = [new Declaration(nodes)];
      } else if (nodes.selector || nodes.selectors) {
        nodes = [new Rule(nodes)];
      } else if (nodes.name) {
        nodes = [new AtRule(nodes)];
      } else if (nodes.text) {
        nodes = [new Comment2(nodes)];
      } else {
        throw new Error("Unknown node type in node creation");
      }
      let processed = nodes.map((i) => {
        if (!i[my]) Container2.rebuild(i);
        i = i.proxyOf;
        if (i.parent) i.parent.removeChild(i);
        if (i[isClean]) markTreeDirty(i);
        if (!i.raws) i.raws = {};
        if (typeof i.raws.before === "undefined") {
          if (sample && typeof sample.raws.before !== "undefined") {
            i.raws.before = sample.raws.before.replace(/\S/g, "");
          }
        }
        i.parent = this.proxyOf;
        return i;
      });
      return processed;
    }
    prepend(...children) {
      children = children.reverse();
      for (let child of children) {
        let nodes = this.normalize(child, this.first, "prepend").reverse();
        for (let node2 of nodes) this.proxyOf.nodes.unshift(node2);
        for (let id in this.indexes) {
          this.indexes[id] = this.indexes[id] + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
    push(child) {
      child.parent = this;
      this.proxyOf.nodes.push(child);
      return this;
    }
    removeAll() {
      for (let node2 of this.proxyOf.nodes) node2.parent = void 0;
      this.proxyOf.nodes = [];
      this.markDirty();
      return this;
    }
    removeChild(child) {
      child = this.index(child);
      this.proxyOf.nodes[child].parent = void 0;
      this.proxyOf.nodes.splice(child, 1);
      let index2;
      for (let id in this.indexes) {
        index2 = this.indexes[id];
        if (index2 >= child) {
          this.indexes[id] = index2 - 1;
        }
      }
      this.markDirty();
      return this;
    }
    replaceValues(pattern, opts, callback) {
      if (!callback) {
        callback = opts;
        opts = {};
      }
      this.walkDecls((decl) => {
        if (opts.props && !opts.props.includes(decl.prop)) return;
        if (opts.fast && !decl.value.includes(opts.fast)) return;
        decl.value = decl.value.replace(pattern, callback);
      });
      this.markDirty();
      return this;
    }
    some(condition) {
      return this.nodes.some(condition);
    }
    walk(callback) {
      return this.each((child, i) => {
        let result2;
        try {
          result2 = callback(child, i);
        } catch (e) {
          throw child.addToError(e);
        }
        if (result2 !== false && child.walk) {
          result2 = child.walk(callback);
        }
        return result2;
      });
    }
    walkAtRules(name, callback) {
      if (!callback) {
        callback = name;
        return this.walk((child, i) => {
          if (child.type === "atrule") {
            return callback(child, i);
          }
        });
      }
      if (name instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === "atrule" && name.test(child.name)) {
            return callback(child, i);
          }
        });
      }
      return this.walk((child, i) => {
        if (child.type === "atrule" && child.name === name) {
          return callback(child, i);
        }
      });
    }
    walkComments(callback) {
      return this.walk((child, i) => {
        if (child.type === "comment") {
          return callback(child, i);
        }
      });
    }
    walkDecls(prop, callback) {
      if (!callback) {
        callback = prop;
        return this.walk((child, i) => {
          if (child.type === "decl") {
            return callback(child, i);
          }
        });
      }
      if (prop instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === "decl" && prop.test(child.prop)) {
            return callback(child, i);
          }
        });
      }
      return this.walk((child, i) => {
        if (child.type === "decl" && child.prop === prop) {
          return callback(child, i);
        }
      });
    }
    walkRules(selector, callback) {
      if (!callback) {
        callback = selector;
        return this.walk((child, i) => {
          if (child.type === "rule") {
            return callback(child, i);
          }
        });
      }
      if (selector instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === "rule" && selector.test(child.selector)) {
            return callback(child, i);
          }
        });
      }
      return this.walk((child, i) => {
        if (child.type === "rule" && child.selector === selector) {
          return callback(child, i);
        }
      });
    }
  }
  Container2.registerParse = (dependant) => {
    parse2 = dependant;
  };
  Container2.registerRule = (dependant) => {
    Rule = dependant;
  };
  Container2.registerAtRule = (dependant) => {
    AtRule = dependant;
  };
  Container2.registerRoot = (dependant) => {
    Root2 = dependant;
  };
  container = Container2;
  Container2.default = Container2;
  Container2.rebuild = (node2) => {
    if (node2.type === "atrule") {
      Object.setPrototypeOf(node2, AtRule.prototype);
    } else if (node2.type === "rule") {
      Object.setPrototypeOf(node2, Rule.prototype);
    } else if (node2.type === "decl") {
      Object.setPrototypeOf(node2, Declaration.prototype);
    } else if (node2.type === "comment") {
      Object.setPrototypeOf(node2, Comment2.prototype);
    } else if (node2.type === "root") {
      Object.setPrototypeOf(node2, Root2.prototype);
    }
    node2[my] = true;
    if (node2.nodes) {
      node2.nodes.forEach((child) => {
        Container2.rebuild(child);
      });
    }
  };
  return container;
}
var atRule;
var hasRequiredAtRule;
function requireAtRule() {
  if (hasRequiredAtRule) return atRule;
  hasRequiredAtRule = 1;
  let Container2 = requireContainer$1();
  class AtRule extends Container2 {
    constructor(defaults) {
      super(defaults);
      this.type = "atrule";
    }
    append(...children) {
      if (!this.proxyOf.nodes) this.nodes = [];
      return super.append(...children);
    }
    prepend(...children) {
      if (!this.proxyOf.nodes) this.nodes = [];
      return super.prepend(...children);
    }
  }
  atRule = AtRule;
  AtRule.default = AtRule;
  Container2.registerAtRule(AtRule);
  return atRule;
}
var document;
var hasRequiredDocument2;
function requireDocument2() {
  if (hasRequiredDocument2) return document;
  hasRequiredDocument2 = 1;
  let Container2 = requireContainer$1();
  let LazyResult, Processor;
  class Document2 extends Container2 {
    constructor(defaults) {
      super(__spreadValues({ type: "document" }, defaults));
      if (!this.nodes) {
        this.nodes = [];
      }
    }
    toResult(opts = {}) {
      let lazy = new LazyResult(new Processor(), this, opts);
      return lazy.stringify();
    }
  }
  Document2.registerLazyResult = (dependant) => {
    LazyResult = dependant;
  };
  Document2.registerProcessor = (dependant) => {
    Processor = dependant;
  };
  document = Document2;
  Document2.default = Document2;
  return document;
}
var nonSecure;
var hasRequiredNonSecure;
function requireNonSecure() {
  if (hasRequiredNonSecure) return nonSecure;
  hasRequiredNonSecure = 1;
  let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  let customAlphabet = (alphabet, defaultSize = 21) => {
    return (size = defaultSize) => {
      let id = "";
      let i = size | 0;
      while (i--) {
        id += alphabet[Math.random() * alphabet.length | 0];
      }
      return id;
    };
  };
  let nanoid = (size = 21) => {
    let id = "";
    let i = size | 0;
    while (i--) {
      id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
  };
  nonSecure = { nanoid, customAlphabet };
  return nonSecure;
}
var previousMap;
var hasRequiredPreviousMap;
function requirePreviousMap() {
  if (hasRequiredPreviousMap) return previousMap;
  hasRequiredPreviousMap = 1;
  let { existsSync, readFileSync } = require$$2;
  let { dirname: dirname2, join: join2 } = require$$2;
  let { SourceMapConsumer, SourceMapGenerator } = require$$2;
  function fromBase64(str) {
    if (Buffer) {
      return Buffer.from(str, "base64").toString();
    } else {
      return window.atob(str);
    }
  }
  class PreviousMap {
    constructor(css, opts) {
      if (opts.map === false) return;
      this.loadAnnotation(css);
      this.inline = this.startWith(this.annotation, "data:");
      let prev = opts.map ? opts.map.prev : void 0;
      let text = this.loadMap(opts.from, prev);
      if (!this.mapFile && opts.from) {
        this.mapFile = opts.from;
      }
      if (this.mapFile) this.root = dirname2(this.mapFile);
      if (text) this.text = text;
    }
    consumer() {
      if (!this.consumerCache) {
        this.consumerCache = new SourceMapConsumer(this.text);
      }
      return this.consumerCache;
    }
    decodeInline(text) {
      let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
      let baseUri = /^data:application\/json;base64,/;
      let charsetUri = /^data:application\/json;charset=utf-?8,/;
      let uri = /^data:application\/json,/;
      let uriMatch = text.match(charsetUri) || text.match(uri);
      if (uriMatch) {
        return decodeURIComponent(text.substr(uriMatch[0].length));
      }
      let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
      if (baseUriMatch) {
        return fromBase64(text.substr(baseUriMatch[0].length));
      }
      let encoding = text.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + encoding);
    }
    getAnnotationURL(sourceMapString) {
      return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(map) {
      if (typeof map !== "object") return false;
      return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
    }
    loadAnnotation(css) {
      let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
      if (!comments) return;
      let start = css.lastIndexOf(comments.pop());
      let end = css.indexOf("*/", start);
      if (start > -1 && end > -1) {
        this.annotation = this.getAnnotationURL(css.substring(start, end));
      }
    }
    loadFile(path2) {
      this.root = dirname2(path2);
      if (existsSync(path2)) {
        this.mapFile = path2;
        return readFileSync(path2, "utf-8").toString().trim();
      }
    }
    loadMap(file, prev) {
      if (prev === false) return false;
      if (prev) {
        if (typeof prev === "string") {
          return prev;
        } else if (typeof prev === "function") {
          let prevPath = prev(file);
          if (prevPath) {
            let map = this.loadFile(prevPath);
            if (!map) {
              throw new Error(
                "Unable to load previous source map: " + prevPath.toString()
              );
            }
            return map;
          }
        } else if (prev instanceof SourceMapConsumer) {
          return SourceMapGenerator.fromSourceMap(prev).toString();
        } else if (prev instanceof SourceMapGenerator) {
          return prev.toString();
        } else if (this.isMap(prev)) {
          return JSON.stringify(prev);
        } else {
          throw new Error(
            "Unsupported previous source map format: " + prev.toString()
          );
        }
      } else if (this.inline) {
        return this.decodeInline(this.annotation);
      } else if (this.annotation) {
        let map = this.annotation;
        if (file) map = join2(dirname2(file), map);
        return this.loadFile(map);
      }
    }
    startWith(string, start) {
      if (!string) return false;
      return string.substr(0, start.length) === start;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  previousMap = PreviousMap;
  PreviousMap.default = PreviousMap;
  return previousMap;
}
var input;
var hasRequiredInput;
function requireInput() {
  if (hasRequiredInput) return input;
  hasRequiredInput = 1;
  let { nanoid } = requireNonSecure();
  let { isAbsolute: isAbsolute2, resolve: resolve2 } = require$$2;
  let { SourceMapConsumer, SourceMapGenerator } = require$$2;
  let { fileURLToPath, pathToFileURL } = require$$2;
  let CssSyntaxError = requireCssSyntaxError();
  let PreviousMap = requirePreviousMap();
  let terminalHighlight = require$$2;
  let lineToIndexCache = Symbol("lineToIndexCache");
  let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
  let pathAvailable = Boolean(resolve2 && isAbsolute2);
  function getLineToIndex(input2) {
    if (input2[lineToIndexCache]) return input2[lineToIndexCache];
    let lines = input2.css.split("\n");
    let lineToIndex = new Array(lines.length);
    let prevIndex = 0;
    for (let i = 0, l = lines.length; i < l; i++) {
      lineToIndex[i] = prevIndex;
      prevIndex += lines[i].length + 1;
    }
    input2[lineToIndexCache] = lineToIndex;
    return lineToIndex;
  }
  class Input {
    get from() {
      return this.file || this.id;
    }
    constructor(css, opts = {}) {
      if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
        throw new Error(`PostCSS received ${css} instead of CSS string`);
      }
      this.css = css.toString();
      if (this.css[0] === "\uFEFF" || this.css[0] === "￾") {
        this.hasBOM = true;
        this.css = this.css.slice(1);
      } else {
        this.hasBOM = false;
      }
      this.document = this.css;
      if (opts.document) this.document = opts.document.toString();
      if (opts.from) {
        if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute2(opts.from)) {
          this.file = opts.from;
        } else {
          this.file = resolve2(opts.from);
        }
      }
      if (pathAvailable && sourceMapAvailable) {
        let map = new PreviousMap(this.css, opts);
        if (map.text) {
          this.map = map;
          let file = map.consumer().file;
          if (!this.file && file) this.file = this.mapResolve(file);
        }
      }
      if (!this.file) {
        this.id = "<input css " + nanoid(6) + ">";
      }
      if (this.map) this.map.file = this.from;
    }
    error(message, line, column, opts = {}) {
      let endColumn, endLine, endOffset, offset, result2;
      if (line && typeof line === "object") {
        let start = line;
        let end = column;
        if (typeof start.offset === "number") {
          offset = start.offset;
          let pos = this.fromOffset(offset);
          line = pos.line;
          column = pos.col;
        } else {
          line = start.line;
          column = start.column;
          offset = this.fromLineAndColumn(line, column);
        }
        if (typeof end.offset === "number") {
          endOffset = end.offset;
          let pos = this.fromOffset(endOffset);
          endLine = pos.line;
          endColumn = pos.col;
        } else {
          endLine = end.line;
          endColumn = end.column;
          endOffset = this.fromLineAndColumn(end.line, end.column);
        }
      } else if (!column) {
        offset = line;
        let pos = this.fromOffset(offset);
        line = pos.line;
        column = pos.col;
      } else {
        offset = this.fromLineAndColumn(line, column);
      }
      let origin = this.origin(line, column, endLine, endColumn);
      if (origin) {
        result2 = new CssSyntaxError(
          message,
          origin.endLine === void 0 ? origin.line : { column: origin.column, line: origin.line },
          origin.endLine === void 0 ? origin.column : { column: origin.endColumn, line: origin.endLine },
          origin.source,
          origin.file,
          opts.plugin
        );
      } else {
        result2 = new CssSyntaxError(
          message,
          endLine === void 0 ? line : { column, line },
          endLine === void 0 ? column : { column: endColumn, line: endLine },
          this.css,
          this.file,
          opts.plugin
        );
      }
      result2.input = { column, endColumn, endLine, endOffset, line, offset, source: this.css };
      if (this.file) {
        if (pathToFileURL) {
          result2.input.url = pathToFileURL(this.file).toString();
        }
        result2.input.file = this.file;
      }
      return result2;
    }
    fromLineAndColumn(line, column) {
      let lineToIndex = getLineToIndex(this);
      let index2 = lineToIndex[line - 1];
      return index2 + column - 1;
    }
    fromOffset(offset) {
      let lineToIndex = getLineToIndex(this);
      let lastLine = lineToIndex[lineToIndex.length - 1];
      let min = 0;
      if (offset >= lastLine) {
        min = lineToIndex.length - 1;
      } else {
        let max = lineToIndex.length - 2;
        let mid;
        while (min < max) {
          mid = min + (max - min >> 1);
          if (offset < lineToIndex[mid]) {
            max = mid - 1;
          } else if (offset >= lineToIndex[mid + 1]) {
            min = mid + 1;
          } else {
            min = mid;
            break;
          }
        }
      }
      return {
        col: offset - lineToIndex[min] + 1,
        line: min + 1
      };
    }
    mapResolve(file) {
      if (/^\w+:\/\//.test(file)) {
        return file;
      }
      return resolve2(this.map.consumer().sourceRoot || this.map.root || ".", file);
    }
    origin(line, column, endLine, endColumn) {
      if (!this.map) return false;
      let consumer = this.map.consumer();
      let from = consumer.originalPositionFor({ column, line });
      if (!from.source) return false;
      let to;
      if (typeof endLine === "number") {
        to = consumer.originalPositionFor({ column: endColumn, line: endLine });
      }
      let fromUrl;
      if (isAbsolute2(from.source)) {
        fromUrl = pathToFileURL(from.source);
      } else {
        fromUrl = new URL(
          from.source,
          this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
        );
      }
      let result2 = {
        column: from.column,
        endColumn: to && to.column,
        endLine: to && to.line,
        line: from.line,
        url: fromUrl.toString()
      };
      if (fromUrl.protocol === "file:") {
        if (fileURLToPath) {
          result2.file = fileURLToPath(fromUrl);
        } else {
          throw new Error(`file: protocol is not available in this PostCSS build`);
        }
      }
      let source = consumer.sourceContentFor(from.source);
      if (source) result2.source = source;
      return result2;
    }
    toJSON() {
      let json = {};
      for (let name of ["hasBOM", "css", "file", "id"]) {
        if (this[name] != null) {
          json[name] = this[name];
        }
      }
      if (this.map) {
        json.map = __spreadValues({}, this.map);
        if (json.map.consumerCache) {
          json.map.consumerCache = void 0;
        }
      }
      return json;
    }
  }
  input = Input;
  Input.default = Input;
  if (terminalHighlight && terminalHighlight.registerInput) {
    terminalHighlight.registerInput(Input);
  }
  return input;
}
var root;
var hasRequiredRoot;
function requireRoot() {
  if (hasRequiredRoot) return root;
  hasRequiredRoot = 1;
  let Container2 = requireContainer$1();
  let LazyResult, Processor;
  class Root2 extends Container2 {
    constructor(defaults) {
      super(defaults);
      this.type = "root";
      if (!this.nodes) this.nodes = [];
    }
    normalize(child, sample, type) {
      let nodes = super.normalize(child);
      if (sample) {
        if (type === "prepend") {
          if (this.nodes.length > 1) {
            sample.raws.before = this.nodes[1].raws.before;
          } else {
            delete sample.raws.before;
          }
        } else if (this.first !== sample) {
          for (let node2 of nodes) {
            node2.raws.before = sample.raws.before;
          }
        }
      }
      return nodes;
    }
    removeChild(child, ignore) {
      let index2 = this.index(child);
      if (!ignore && index2 === 0 && this.nodes.length > 1) {
        this.nodes[1].raws.before = this.nodes[index2].raws.before;
      }
      return super.removeChild(child);
    }
    toResult(opts = {}) {
      let lazy = new LazyResult(new Processor(), this, opts);
      return lazy.stringify();
    }
  }
  Root2.registerLazyResult = (dependant) => {
    LazyResult = dependant;
  };
  Root2.registerProcessor = (dependant) => {
    Processor = dependant;
  };
  root = Root2;
  Root2.default = Root2;
  Container2.registerRoot(Root2);
  return root;
}
var list_1;
var hasRequiredList;
function requireList() {
  if (hasRequiredList) return list_1;
  hasRequiredList = 1;
  let list = {
    comma(string) {
      return list.split(string, [","], true);
    },
    space(string) {
      let spaces = [" ", "\n", "	"];
      return list.split(string, spaces);
    },
    split(string, separators, last) {
      let array = [];
      let current = "";
      let split = false;
      let func = 0;
      let inQuote = false;
      let prevQuote = "";
      let escape = false;
      for (let letter of string) {
        if (escape) {
          escape = false;
        } else if (letter === "\\") {
          escape = true;
        } else if (inQuote) {
          if (letter === prevQuote) {
            inQuote = false;
          }
        } else if (letter === '"' || letter === "'") {
          inQuote = true;
          prevQuote = letter;
        } else if (letter === "(") {
          func += 1;
        } else if (letter === ")") {
          if (func > 0) func -= 1;
        } else if (func === 0) {
          if (separators.includes(letter)) split = true;
        }
        if (split) {
          if (current !== "") array.push(current.trim());
          current = "";
          split = false;
        } else {
          current += letter;
        }
      }
      if (last || current !== "") array.push(current.trim());
      return array;
    }
  };
  list_1 = list;
  list.default = list;
  return list_1;
}
var rule;
var hasRequiredRule;
function requireRule() {
  if (hasRequiredRule) return rule;
  hasRequiredRule = 1;
  let Container2 = requireContainer$1();
  let list = requireList();
  class Rule extends Container2 {
    get selectors() {
      return list.comma(this.selector);
    }
    set selectors(values) {
      let match = this.selector ? this.selector.match(/,\s*/) : null;
      let sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
      this.selector = values.join(sep2);
    }
    constructor(defaults) {
      super(defaults);
      this.type = "rule";
      if (!this.nodes) this.nodes = [];
    }
  }
  rule = Rule;
  Rule.default = Rule;
  Container2.registerRule(Rule);
  return rule;
}
var fromJSON_1;
var hasRequiredFromJSON;
function requireFromJSON() {
  if (hasRequiredFromJSON) return fromJSON_1;
  hasRequiredFromJSON = 1;
  let AtRule = requireAtRule();
  let Comment2 = requireComment2();
  let Declaration = requireDeclaration();
  let Input = requireInput();
  let PreviousMap = requirePreviousMap();
  let Root2 = requireRoot();
  let Rule = requireRule();
  function fromJSON(json, inputs) {
    if (Array.isArray(json)) return json.map((n) => fromJSON(n));
    let _a2 = json, { inputs: ownInputs } = _a2, defaults = __objRest(_a2, ["inputs"]);
    if (ownInputs) {
      inputs = [];
      for (let input2 of ownInputs) {
        let inputHydrated = __spreadProps(__spreadValues({}, input2), { __proto__: Input.prototype });
        if (inputHydrated.map) {
          inputHydrated.map = __spreadProps(__spreadValues({}, inputHydrated.map), {
            __proto__: PreviousMap.prototype
          });
        }
        inputs.push(inputHydrated);
      }
    }
    if (defaults.nodes) {
      defaults.nodes = json.nodes.map((n) => fromJSON(n, inputs));
    }
    if (defaults.source) {
      let _b = defaults.source, { inputId } = _b, source = __objRest(_b, ["inputId"]);
      defaults.source = source;
      if (inputId != null) {
        defaults.source.input = inputs[inputId];
      }
    }
    if (defaults.type === "root") {
      return new Root2(defaults);
    } else if (defaults.type === "decl") {
      return new Declaration(defaults);
    } else if (defaults.type === "rule") {
      return new Rule(defaults);
    } else if (defaults.type === "comment") {
      return new Comment2(defaults);
    } else if (defaults.type === "atrule") {
      return new AtRule(defaults);
    } else {
      throw new Error("Unknown node type: " + json.type);
    }
  }
  fromJSON_1 = fromJSON;
  fromJSON.default = fromJSON;
  return fromJSON_1;
}
var mapGenerator;
var hasRequiredMapGenerator;
function requireMapGenerator() {
  if (hasRequiredMapGenerator) return mapGenerator;
  hasRequiredMapGenerator = 1;
  let { dirname: dirname2, relative: relative2, resolve: resolve2, sep: sep2 } = require$$2;
  let { SourceMapConsumer, SourceMapGenerator } = require$$2;
  let { pathToFileURL } = require$$2;
  let Input = requireInput();
  let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
  let pathAvailable = Boolean(dirname2 && resolve2 && relative2 && sep2);
  class MapGenerator {
    constructor(stringify2, root2, opts, cssString) {
      this.stringify = stringify2;
      this.mapOpts = opts.map || {};
      this.root = root2;
      this.opts = opts;
      this.css = cssString;
      this.originalCSS = cssString;
      this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
      this.memoizedFileURLs = /* @__PURE__ */ new Map();
      this.memoizedPaths = /* @__PURE__ */ new Map();
      this.memoizedURLs = /* @__PURE__ */ new Map();
    }
    addAnnotation() {
      let content;
      if (this.isInline()) {
        content = "data:application/json;base64," + this.toBase64(this.map.toString());
      } else if (typeof this.mapOpts.annotation === "string") {
        content = this.mapOpts.annotation;
      } else if (typeof this.mapOpts.annotation === "function") {
        content = this.mapOpts.annotation(this.opts.to, this.root);
      } else {
        content = this.outputFile() + ".map";
      }
      let eol = "\n";
      if (this.css.includes("\r\n")) eol = "\r\n";
      this.css += eol + "/*# sourceMappingURL=" + content + " */";
    }
    applyPrevMaps() {
      for (let prev of this.previous()) {
        let from = this.toUrl(this.path(prev.file));
        let root2 = prev.root || dirname2(prev.file);
        let map;
        if (this.mapOpts.sourcesContent === false) {
          map = new SourceMapConsumer(prev.text);
          if (map.sourcesContent) {
            map.sourcesContent = null;
          }
        } else {
          map = prev.consumer();
        }
        this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation === false) return;
      if (this.root) {
        let node2;
        for (let i = this.root.nodes.length - 1; i >= 0; i--) {
          node2 = this.root.nodes[i];
          if (node2.type !== "comment") continue;
          if (node2.text.startsWith("# sourceMappingURL=")) {
            this.root.removeChild(i);
          }
        }
      } else if (this.css) {
        this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, "");
      }
    }
    generate() {
      this.clearAnnotation();
      if (pathAvailable && sourceMapAvailable && this.isMap()) {
        return this.generateMap();
      } else {
        let result2 = "";
        this.stringify(this.root, (i) => {
          result2 += i;
        });
        return [result2];
      }
    }
    generateMap() {
      if (this.root) {
        this.generateString();
      } else if (this.previous().length === 1) {
        let prev = this.previous()[0].consumer();
        prev.file = this.outputFile();
        this.map = SourceMapGenerator.fromSourceMap(prev, {
          ignoreInvalidMapping: true
        });
      } else {
        this.map = new SourceMapGenerator({
          file: this.outputFile(),
          ignoreInvalidMapping: true
        });
        this.map.addMapping({
          generated: { column: 0, line: 1 },
          original: { column: 0, line: 1 },
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
        });
      }
      if (this.isSourcesContent()) this.setSourcesContent();
      if (this.root && this.previous().length > 0) this.applyPrevMaps();
      if (this.isAnnotation()) this.addAnnotation();
      if (this.isInline()) {
        return [this.css];
      } else {
        return [this.css, this.map];
      }
    }
    generateString() {
      this.css = "";
      this.map = new SourceMapGenerator({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      });
      let line = 1;
      let column = 1;
      let noSource = "<no source>";
      let mapping = {
        generated: { column: 0, line: 0 },
        original: { column: 0, line: 0 },
        source: ""
      };
      let last, lines;
      this.stringify(this.root, (str, node2, type) => {
        this.css += str;
        if (node2 && type !== "end") {
          mapping.generated.line = line;
          mapping.generated.column = column - 1;
          if (node2.source && node2.source.start) {
            mapping.source = this.sourcePath(node2);
            mapping.original.line = node2.source.start.line;
            mapping.original.column = node2.source.start.column - 1;
            this.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            this.map.addMapping(mapping);
          }
        }
        lines = str.match(/\n/g);
        if (lines) {
          line += lines.length;
          last = str.lastIndexOf("\n");
          column = str.length - last;
        } else {
          column += str.length;
        }
        if (node2 && type !== "start") {
          let p = node2.parent || { raws: {} };
          let childless = node2.type === "decl" || node2.type === "atrule" && !node2.nodes;
          if (!childless || node2 !== p.last || p.raws.semicolon) {
            if (node2.source && node2.source.end) {
              mapping.source = this.sourcePath(node2);
              mapping.original.line = node2.source.end.line;
              mapping.original.column = node2.source.end.column - 1;
              mapping.generated.line = line;
              mapping.generated.column = column - 2;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              mapping.generated.line = line;
              mapping.generated.column = column - 1;
              this.map.addMapping(mapping);
            }
          }
        }
      });
    }
    isAnnotation() {
      if (this.isInline()) {
        return true;
      }
      if (typeof this.mapOpts.annotation !== "undefined") {
        return this.mapOpts.annotation;
      }
      if (this.previous().length) {
        return this.previous().some((i) => i.annotation);
      }
      return true;
    }
    isInline() {
      if (typeof this.mapOpts.inline !== "undefined") {
        return this.mapOpts.inline;
      }
      let annotation = this.mapOpts.annotation;
      if (typeof annotation !== "undefined" && annotation !== true) {
        return false;
      }
      if (this.previous().length) {
        return this.previous().some((i) => i.inline);
      }
      return true;
    }
    isMap() {
      if (typeof this.opts.map !== "undefined") {
        return !!this.opts.map;
      }
      return this.previous().length > 0;
    }
    isSourcesContent() {
      if (typeof this.mapOpts.sourcesContent !== "undefined") {
        return this.mapOpts.sourcesContent;
      }
      if (this.previous().length) {
        return this.previous().some((i) => i.withContent());
      }
      return true;
    }
    outputFile() {
      if (this.opts.to) {
        return this.path(this.opts.to);
      } else if (this.opts.from) {
        return this.path(this.opts.from);
      } else {
        return "to.css";
      }
    }
    path(file) {
      if (this.mapOpts.absolute) return file;
      if (file.charCodeAt(0) === 60) return file;
      if (/^\w+:\/\//.test(file)) return file;
      let cached = this.memoizedPaths.get(file);
      if (cached) return cached;
      let from = this.opts.to ? dirname2(this.opts.to) : ".";
      if (typeof this.mapOpts.annotation === "string") {
        from = dirname2(resolve2(from, this.mapOpts.annotation));
      }
      let path2 = relative2(from, file);
      this.memoizedPaths.set(file, path2);
      return path2;
    }
    previous() {
      if (!this.previousMaps) {
        this.previousMaps = [];
        if (this.root) {
          this.root.walk((node2) => {
            if (node2.source && node2.source.input.map) {
              let map = node2.source.input.map;
              if (!this.previousMaps.includes(map)) {
                this.previousMaps.push(map);
              }
            }
          });
        } else {
          let input2 = new Input(this.originalCSS, this.opts);
          if (input2.map) this.previousMaps.push(input2.map);
        }
      }
      return this.previousMaps;
    }
    setSourcesContent() {
      let already = {};
      if (this.root) {
        this.root.walk((node2) => {
          if (node2.source) {
            let from = node2.source.input.from;
            if (from && !already[from]) {
              already[from] = true;
              let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
              this.map.setSourceContent(fromUrl, node2.source.input.css);
            }
          }
        });
      } else if (this.css) {
        let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(from, this.css);
      }
    }
    sourcePath(node2) {
      if (this.mapOpts.from) {
        return this.toUrl(this.mapOpts.from);
      } else if (this.usesFileUrls) {
        return this.toFileUrl(node2.source.input.from);
      } else {
        return this.toUrl(this.path(node2.source.input.from));
      }
    }
    toBase64(str) {
      if (Buffer) {
        return Buffer.from(str).toString("base64");
      } else {
        return window.btoa(unescape(encodeURIComponent(str)));
      }
    }
    toFileUrl(path2) {
      let cached = this.memoizedFileURLs.get(path2);
      if (cached) return cached;
      if (pathToFileURL) {
        let fileURL = pathToFileURL(path2).toString();
        this.memoizedFileURLs.set(path2, fileURL);
        return fileURL;
      } else {
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
      }
    }
    toUrl(path2) {
      let cached = this.memoizedURLs.get(path2);
      if (cached) return cached;
      if (sep2 === "\\") {
        path2 = path2.replace(/\\/g, "/");
      }
      let url = encodeURI(path2).replace(/[#?]/g, encodeURIComponent);
      this.memoizedURLs.set(path2, url);
      return url;
    }
  }
  mapGenerator = MapGenerator;
  return mapGenerator;
}
var tokenize;
var hasRequiredTokenize;
function requireTokenize() {
  if (hasRequiredTokenize) return tokenize;
  hasRequiredTokenize = 1;
  const SINGLE_QUOTE = "'".charCodeAt(0);
  const DOUBLE_QUOTE = '"'.charCodeAt(0);
  const BACKSLASH = "\\".charCodeAt(0);
  const SLASH = "/".charCodeAt(0);
  const NEWLINE = "\n".charCodeAt(0);
  const SPACE = " ".charCodeAt(0);
  const FEED = "\f".charCodeAt(0);
  const TAB = "	".charCodeAt(0);
  const CR = "\r".charCodeAt(0);
  const OPEN_SQUARE = "[".charCodeAt(0);
  const CLOSE_SQUARE = "]".charCodeAt(0);
  const OPEN_PARENTHESES = "(".charCodeAt(0);
  const CLOSE_PARENTHESES = ")".charCodeAt(0);
  const OPEN_CURLY = "{".charCodeAt(0);
  const CLOSE_CURLY = "}".charCodeAt(0);
  const SEMICOLON = ";".charCodeAt(0);
  const ASTERISK = "*".charCodeAt(0);
  const COLON = ":".charCodeAt(0);
  const AT = "@".charCodeAt(0);
  const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
  const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
  const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
  const RE_HEX_ESCAPE = /[\da-f]/i;
  tokenize = function tokenizer(input2, options = {}) {
    let css = input2.css.valueOf();
    let ignore = options.ignoreErrors;
    let code, content, escape, next, quote;
    let currentToken, escaped, escapePos, n, prev;
    let length = css.length;
    let pos = 0;
    let buffer = [];
    let returned = [];
    function position() {
      return pos;
    }
    function unclosed(what) {
      throw input2.error("Unclosed " + what, pos);
    }
    function endOfFile() {
      return returned.length === 0 && pos >= length;
    }
    function nextToken(opts) {
      if (returned.length) return returned.pop();
      if (pos >= length) return;
      let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
      code = css.charCodeAt(pos);
      switch (code) {
        case NEWLINE:
        case SPACE:
        case TAB:
        case CR:
        case FEED: {
          next = pos;
          do {
            next += 1;
            code = css.charCodeAt(next);
          } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
          currentToken = ["space", css.slice(pos, next)];
          pos = next - 1;
          break;
        }
        case OPEN_SQUARE:
        case CLOSE_SQUARE:
        case OPEN_CURLY:
        case CLOSE_CURLY:
        case COLON:
        case SEMICOLON:
        case CLOSE_PARENTHESES: {
          let controlChar = String.fromCharCode(code);
          currentToken = [controlChar, controlChar, pos];
          break;
        }
        case OPEN_PARENTHESES: {
          prev = buffer.length ? buffer.pop()[1] : "";
          n = css.charCodeAt(pos + 1);
          if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(")", next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos;
                  break;
                } else {
                  unclosed("bracket");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            next = css.indexOf(")", pos + 1);
            content = css.slice(pos, next + 1);
            if (next === -1 || RE_BAD_BRACKET.test(content)) {
              currentToken = ["(", "(", pos];
            } else {
              currentToken = ["brackets", content, pos, next];
              pos = next;
            }
          }
          break;
        }
        case SINGLE_QUOTE:
        case DOUBLE_QUOTE: {
          quote = code === SINGLE_QUOTE ? "'" : '"';
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(quote, next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos + 1;
                break;
              } else {
                unclosed("string");
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);
          currentToken = ["string", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
        case AT: {
          RE_AT_END.lastIndex = pos + 1;
          RE_AT_END.test(css);
          if (RE_AT_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_AT_END.lastIndex - 2;
          }
          currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
        case BACKSLASH: {
          next = pos;
          escape = true;
          while (css.charCodeAt(next + 1) === BACKSLASH) {
            next += 1;
            escape = !escape;
          }
          code = css.charCodeAt(next + 1);
          if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
            next += 1;
            if (RE_HEX_ESCAPE.test(css.charAt(next))) {
              while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                next += 1;
              }
              if (css.charCodeAt(next + 1) === SPACE) {
                next += 1;
              }
            }
          }
          currentToken = ["word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
        default: {
          if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
            next = css.indexOf("*/", pos + 2) + 1;
            if (next === 0) {
              if (ignore || ignoreUnclosed) {
                next = css.length;
              } else {
                unclosed("comment");
              }
            }
            currentToken = ["comment", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            RE_WORD_END.lastIndex = pos + 1;
            RE_WORD_END.test(css);
            if (RE_WORD_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_WORD_END.lastIndex - 2;
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            buffer.push(currentToken);
            pos = next;
          }
          break;
        }
      }
      pos++;
      return currentToken;
    }
    function back(token) {
      returned.push(token);
    }
    return {
      back,
      endOfFile,
      nextToken,
      position
    };
  };
  return tokenize;
}
var parser;
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  let AtRule = requireAtRule();
  let Comment2 = requireComment2();
  let Declaration = requireDeclaration();
  let Root2 = requireRoot();
  let Rule = requireRule();
  let tokenizer = requireTokenize();
  const SAFE_COMMENT_NEIGHBOR = {
    empty: true,
    space: true
  };
  function findLastWithPosition(tokens) {
    for (let i = tokens.length - 1; i >= 0; i--) {
      let token = tokens[i];
      let pos = token[3] || token[2];
      if (pos) return pos;
    }
  }
  class Parser2 {
    constructor(input2) {
      this.input = input2;
      this.root = new Root2();
      this.current = this.root;
      this.spaces = "";
      this.semicolon = false;
      this.createTokenizer();
      this.root.source = { input: input2, start: { column: 1, line: 1, offset: 0 } };
    }
    atrule(token) {
      let node2 = new AtRule();
      node2.name = token[1].slice(1);
      if (node2.name === "") {
        this.unnamedAtrule(node2, token);
      }
      this.init(node2, token[2]);
      let type;
      let prev;
      let shift;
      let last = false;
      let open2 = false;
      let params = [];
      let brackets = [];
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        type = token[0];
        if (type === "(" || type === "[") {
          brackets.push(type === "(" ? ")" : "]");
        } else if (type === "{" && brackets.length > 0) {
          brackets.push("}");
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
        }
        if (brackets.length === 0) {
          if (type === ";") {
            node2.source.end = this.getPosition(token[2]);
            node2.source.end.offset++;
            this.semicolon = true;
            break;
          } else if (type === "{") {
            open2 = true;
            break;
          } else if (type === "}") {
            if (params.length > 0) {
              shift = params.length - 1;
              prev = params[shift];
              while (prev && prev[0] === "space") {
                prev = params[--shift];
              }
              if (prev) {
                node2.source.end = this.getPosition(prev[3] || prev[2]);
                node2.source.end.offset++;
              }
            }
            this.end(token);
            break;
          } else {
            params.push(token);
          }
        } else {
          params.push(token);
        }
        if (this.tokenizer.endOfFile()) {
          last = true;
          break;
        }
      }
      node2.raws.between = this.spacesAndCommentsFromEnd(params);
      if (params.length) {
        node2.raws.afterName = this.spacesAndCommentsFromStart(params);
        this.raw(node2, "params", params);
        if (last) {
          token = params[params.length - 1];
          node2.source.end = this.getPosition(token[3] || token[2]);
          node2.source.end.offset++;
          this.spaces = node2.raws.between;
          node2.raws.between = "";
        }
      } else {
        node2.raws.afterName = "";
        node2.params = "";
      }
      if (open2) {
        node2.nodes = [];
        this.current = node2;
      }
    }
    checkMissedSemicolon(tokens) {
      let colon = this.colon(tokens);
      if (colon === false) return;
      let founded = 0;
      let token;
      for (let j = colon - 1; j >= 0; j--) {
        token = tokens[j];
        if (token[0] !== "space") {
          founded += 1;
          if (founded === 2) break;
        }
      }
      throw this.input.error(
        "Missed semicolon",
        token[0] === "word" ? token[3] + 1 : token[2]
      );
    }
    colon(tokens) {
      let brackets = 0;
      let prev, token, type;
      for (let [i, element] of tokens.entries()) {
        token = element;
        type = token[0];
        if (type === "(") {
          brackets += 1;
        }
        if (type === ")") {
          brackets -= 1;
        }
        if (brackets === 0 && type === ":") {
          if (!prev) {
            this.doubleColon(token);
          } else if (prev[0] === "word" && prev[1] === "progid") {
            continue;
          } else {
            return i;
          }
        }
        prev = token;
      }
      return false;
    }
    comment(token) {
      let node2 = new Comment2();
      this.init(node2, token[2]);
      node2.source.end = this.getPosition(token[3] || token[2]);
      node2.source.end.offset++;
      let text = token[1].slice(2, -2);
      if (/^\s*$/.test(text)) {
        node2.text = "";
        node2.raws.left = text;
        node2.raws.right = "";
      } else {
        let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
        node2.text = match[2];
        node2.raws.left = match[1];
        node2.raws.right = match[3];
      }
    }
    createTokenizer() {
      this.tokenizer = tokenizer(this.input);
    }
    decl(tokens, customProperty) {
      let node2 = new Declaration();
      this.init(node2, tokens[0][2]);
      let last = tokens[tokens.length - 1];
      if (last[0] === ";") {
        this.semicolon = true;
        tokens.pop();
      }
      node2.source.end = this.getPosition(
        last[3] || last[2] || findLastWithPosition(tokens)
      );
      node2.source.end.offset++;
      while (tokens[0][0] !== "word") {
        if (tokens.length === 1) this.unknownWord(tokens);
        node2.raws.before += tokens.shift()[1];
      }
      node2.source.start = this.getPosition(tokens[0][2]);
      node2.prop = "";
      while (tokens.length) {
        let type = tokens[0][0];
        if (type === ":" || type === "space" || type === "comment") {
          break;
        }
        node2.prop += tokens.shift()[1];
      }
      node2.raws.between = "";
      let token;
      while (tokens.length) {
        token = tokens.shift();
        if (token[0] === ":") {
          node2.raws.between += token[1];
          break;
        } else {
          if (token[0] === "word" && /\w/.test(token[1])) {
            this.unknownWord([token]);
          }
          node2.raws.between += token[1];
        }
      }
      if (node2.prop[0] === "_" || node2.prop[0] === "*") {
        node2.raws.before += node2.prop[0];
        node2.prop = node2.prop.slice(1);
      }
      let firstSpaces = [];
      let next;
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        firstSpaces.push(tokens.shift());
      }
      this.precheckMissedSemicolon(tokens);
      for (let i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];
        if (token[1].toLowerCase() === "!important") {
          node2.important = true;
          let string = this.stringFrom(tokens, i);
          string = this.spacesFromEnd(tokens) + string;
          if (string !== " !important") node2.raws.important = string;
          break;
        } else if (token[1].toLowerCase() === "important") {
          let cache = tokens.slice(0);
          let str = "";
          for (let j = i; j > 0; j--) {
            let type = cache[j][0];
            if (str.trim().startsWith("!") && type !== "space") {
              break;
            }
            str = cache.pop()[1] + str;
          }
          if (str.trim().startsWith("!")) {
            node2.important = true;
            node2.raws.important = str;
            tokens = cache;
          }
        }
        if (token[0] !== "space" && token[0] !== "comment") {
          break;
        }
      }
      let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
      if (hasWord) {
        node2.raws.between += firstSpaces.map((i) => i[1]).join("");
        firstSpaces = [];
      }
      this.raw(node2, "value", firstSpaces.concat(tokens), customProperty);
      if (node2.value.includes(":") && !customProperty) {
        this.checkMissedSemicolon(tokens);
      }
    }
    doubleColon(token) {
      throw this.input.error(
        "Double colon",
        { offset: token[2] },
        { offset: token[2] + token[1].length }
      );
    }
    emptyRule(token) {
      let node2 = new Rule();
      this.init(node2, token[2]);
      node2.selector = "";
      node2.raws.between = "";
      this.current = node2;
    }
    end(token) {
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.semicolon = false;
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.spaces = "";
      if (this.current.parent) {
        this.current.source.end = this.getPosition(token[2]);
        this.current.source.end.offset++;
        this.current = this.current.parent;
      } else {
        this.unexpectedClose(token);
      }
    }
    endFile() {
      if (this.current.parent) this.unclosedBlock();
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.root.source.end = this.getPosition(this.tokenizer.position());
    }
    freeSemicolon(token) {
      this.spaces += token[1];
      if (this.current.nodes) {
        let prev = this.current.nodes[this.current.nodes.length - 1];
        if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
          prev.raws.ownSemicolon = this.spaces;
          this.spaces = "";
          prev.source.end = this.getPosition(token[2]);
          prev.source.end.offset += prev.raws.ownSemicolon.length;
        }
      }
    }
    // Helpers
    getPosition(offset) {
      let pos = this.input.fromOffset(offset);
      return {
        column: pos.col,
        line: pos.line,
        offset
      };
    }
    init(node2, offset) {
      this.current.push(node2);
      node2.source = {
        input: this.input,
        start: this.getPosition(offset)
      };
      node2.raws.before = this.spaces;
      this.spaces = "";
      if (node2.type !== "comment") this.semicolon = false;
    }
    other(start) {
      let end = false;
      let type = null;
      let colon = false;
      let bracket = null;
      let brackets = [];
      let customProperty = start[1].startsWith("--");
      let tokens = [];
      let token = start;
      while (token) {
        type = token[0];
        tokens.push(token);
        if (type === "(" || type === "[") {
          if (!bracket) bracket = token;
          brackets.push(type === "(" ? ")" : "]");
        } else if (customProperty && colon && type === "{") {
          if (!bracket) bracket = token;
          brackets.push("}");
        } else if (brackets.length === 0) {
          if (type === ";") {
            if (colon) {
              this.decl(tokens, customProperty);
              return;
            } else {
              break;
            }
          } else if (type === "{") {
            this.rule(tokens);
            return;
          } else if (type === "}") {
            this.tokenizer.back(tokens.pop());
            end = true;
            break;
          } else if (type === ":") {
            colon = true;
          }
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
          if (brackets.length === 0) bracket = null;
        }
        token = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile()) end = true;
      if (brackets.length > 0) this.unclosedBracket(bracket);
      if (end && colon) {
        if (!customProperty) {
          while (tokens.length) {
            token = tokens[tokens.length - 1][0];
            if (token !== "space" && token !== "comment") break;
            this.tokenizer.back(tokens.pop());
          }
        }
        this.decl(tokens, customProperty);
      } else {
        this.unknownWord(tokens);
      }
    }
    parse() {
      let token;
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        switch (token[0]) {
          case "space":
            this.spaces += token[1];
            break;
          case ";":
            this.freeSemicolon(token);
            break;
          case "}":
            this.end(token);
            break;
          case "comment":
            this.comment(token);
            break;
          case "at-word":
            this.atrule(token);
            break;
          case "{":
            this.emptyRule(token);
            break;
          default:
            this.other(token);
            break;
        }
      }
      this.endFile();
    }
    precheckMissedSemicolon() {
    }
    raw(node2, prop, tokens, customProperty) {
      let token, type;
      let length = tokens.length;
      let value = "";
      let clean = true;
      let next, prev;
      for (let i = 0; i < length; i += 1) {
        token = tokens[i];
        type = token[0];
        if (type === "space" && i === length - 1 && !customProperty) {
          clean = false;
        } else if (type === "comment") {
          prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
          next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
          if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
            if (value.slice(-1) === ",") {
              clean = false;
            } else {
              value += token[1];
            }
          } else {
            clean = false;
          }
        } else {
          value += token[1];
        }
      }
      if (!clean) {
        let raw = tokens.reduce((all, i) => all + i[1], "");
        node2.raws[prop] = { raw, value };
      }
      node2[prop] = value;
    }
    rule(tokens) {
      tokens.pop();
      let node2 = new Rule();
      this.init(node2, tokens[0][2]);
      node2.raws.between = this.spacesAndCommentsFromEnd(tokens);
      this.raw(node2, "selector", tokens);
      this.current = node2;
    }
    spacesAndCommentsFromEnd(tokens) {
      let lastTokenType;
      let spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space" && lastTokenType !== "comment") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
    // Errors
    spacesAndCommentsFromStart(tokens) {
      let next;
      let spaces = "";
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        spaces += tokens.shift()[1];
      }
      return spaces;
    }
    spacesFromEnd(tokens) {
      let lastTokenType;
      let spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
    stringFrom(tokens, from) {
      let result2 = "";
      for (let i = from; i < tokens.length; i++) {
        result2 += tokens[i][1];
      }
      tokens.splice(from, tokens.length - from);
      return result2;
    }
    unclosedBlock() {
      let pos = this.current.source.start;
      throw this.input.error("Unclosed block", pos.line, pos.column);
    }
    unclosedBracket(bracket) {
      throw this.input.error(
        "Unclosed bracket",
        { offset: bracket[2] },
        { offset: bracket[2] + 1 }
      );
    }
    unexpectedClose(token) {
      throw this.input.error(
        "Unexpected }",
        { offset: token[2] },
        { offset: token[2] + 1 }
      );
    }
    unknownWord(tokens) {
      throw this.input.error(
        "Unknown word " + tokens[0][1],
        { offset: tokens[0][2] },
        { offset: tokens[0][2] + tokens[0][1].length }
      );
    }
    unnamedAtrule(node2, token) {
      throw this.input.error(
        "At-rule without name",
        { offset: token[2] },
        { offset: token[2] + token[1].length }
      );
    }
  }
  parser = Parser2;
  return parser;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  let Container2 = requireContainer$1();
  let Input = requireInput();
  let Parser2 = requireParser();
  function parse2(css, opts) {
    let input2 = new Input(css, opts);
    let parser2 = new Parser2(input2);
    try {
      parser2.parse();
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        if (e.name === "CssSyntaxError" && opts && opts.from) {
          if (/\.scss$/i.test(opts.from)) {
            e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
          } else if (/\.sass/i.test(opts.from)) {
            e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
          } else if (/\.less$/i.test(opts.from)) {
            e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
          }
        }
      }
      throw e;
    }
    return parser2.root;
  }
  parse_1 = parse2;
  parse2.default = parse2;
  Container2.registerParse(parse2);
  return parse_1;
}
var warning;
var hasRequiredWarning;
function requireWarning() {
  if (hasRequiredWarning) return warning;
  hasRequiredWarning = 1;
  class Warning {
    constructor(text, opts = {}) {
      this.type = "warning";
      this.text = text;
      if (opts.node && opts.node.source) {
        let range = opts.node.rangeBy(opts);
        this.line = range.start.line;
        this.column = range.start.column;
        this.endLine = range.end.line;
        this.endColumn = range.end.column;
      }
      for (let opt in opts) this[opt] = opts[opt];
    }
    toString() {
      if (this.node) {
        return this.node.error(this.text, {
          index: this.index,
          plugin: this.plugin,
          word: this.word
        }).message;
      }
      if (this.plugin) {
        return this.plugin + ": " + this.text;
      }
      return this.text;
    }
  }
  warning = Warning;
  Warning.default = Warning;
  return warning;
}
var result;
var hasRequiredResult;
function requireResult() {
  if (hasRequiredResult) return result;
  hasRequiredResult = 1;
  let Warning = requireWarning();
  class Result {
    get content() {
      return this.css;
    }
    constructor(processor2, root2, opts) {
      this.processor = processor2;
      this.messages = [];
      this.root = root2;
      this.opts = opts;
      this.css = "";
      this.map = void 0;
    }
    toString() {
      return this.css;
    }
    warn(text, opts = {}) {
      if (!opts.plugin) {
        if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
          opts.plugin = this.lastPlugin.postcssPlugin;
        }
      }
      let warning2 = new Warning(text, opts);
      this.messages.push(warning2);
      return warning2;
    }
    warnings() {
      return this.messages.filter((i) => i.type === "warning");
    }
  }
  result = Result;
  Result.default = Result;
  return result;
}
var warnOnce;
var hasRequiredWarnOnce;
function requireWarnOnce() {
  if (hasRequiredWarnOnce) return warnOnce;
  hasRequiredWarnOnce = 1;
  let printed = {};
  warnOnce = function warnOnce2(message) {
    if (printed[message]) return;
    printed[message] = true;
    if (typeof console !== "undefined" && console.warn) {
      console.warn(message);
    }
  };
  return warnOnce;
}
var lazyResult;
var hasRequiredLazyResult;
function requireLazyResult() {
  if (hasRequiredLazyResult) return lazyResult;
  hasRequiredLazyResult = 1;
  let Container2 = requireContainer$1();
  let Document2 = requireDocument2();
  let MapGenerator = requireMapGenerator();
  let parse2 = requireParse();
  let Result = requireResult();
  let Root2 = requireRoot();
  let stringify2 = requireStringify();
  let { isClean, my } = requireSymbols();
  let warnOnce2 = requireWarnOnce();
  const TYPE_TO_CLASS_NAME = {
    atrule: "AtRule",
    comment: "Comment",
    decl: "Declaration",
    document: "Document",
    root: "Root",
    rule: "Rule"
  };
  const PLUGIN_PROPS = {
    AtRule: true,
    AtRuleExit: true,
    Comment: true,
    CommentExit: true,
    Declaration: true,
    DeclarationExit: true,
    Document: true,
    DocumentExit: true,
    Once: true,
    OnceExit: true,
    postcssPlugin: true,
    prepare: true,
    Root: true,
    RootExit: true,
    Rule: true,
    RuleExit: true
  };
  const NOT_VISITORS = {
    Once: true,
    postcssPlugin: true,
    prepare: true
  };
  const CHILDREN = 0;
  function isPromise(obj) {
    return typeof obj === "object" && typeof obj.then === "function";
  }
  function getEvents(node2) {
    let key = false;
    let type = TYPE_TO_CLASS_NAME[node2.type];
    if (node2.type === "decl") {
      key = node2.prop.toLowerCase();
    } else if (node2.type === "atrule") {
      key = node2.name.toLowerCase();
    }
    if (key && node2.append) {
      return [
        type,
        type + "-" + key,
        CHILDREN,
        type + "Exit",
        type + "Exit-" + key
      ];
    } else if (key) {
      return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
    } else if (node2.append) {
      return [type, CHILDREN, type + "Exit"];
    } else {
      return [type, type + "Exit"];
    }
  }
  function toStack(node2) {
    let events2;
    if (node2.type === "document") {
      events2 = ["Document", CHILDREN, "DocumentExit"];
    } else if (node2.type === "root") {
      events2 = ["Root", CHILDREN, "RootExit"];
    } else {
      events2 = getEvents(node2);
    }
    return {
      eventIndex: 0,
      events: events2,
      iterator: 0,
      node: node2,
      visitorIndex: 0,
      visitors: []
    };
  }
  function cleanMarks(node2) {
    node2[isClean] = false;
    if (node2.nodes) node2.nodes.forEach((i) => cleanMarks(i));
    return node2;
  }
  let postcss2 = {};
  class LazyResult {
    get content() {
      return this.stringify().content;
    }
    get css() {
      return this.stringify().css;
    }
    get map() {
      return this.stringify().map;
    }
    get messages() {
      return this.sync().messages;
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      return this.sync().root;
    }
    get [Symbol.toStringTag]() {
      return "LazyResult";
    }
    constructor(processor2, css, opts) {
      this.stringified = false;
      this.processed = false;
      let root2;
      if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
        root2 = cleanMarks(css);
      } else if (css instanceof LazyResult || css instanceof Result) {
        root2 = cleanMarks(css.root);
        if (css.map) {
          if (typeof opts.map === "undefined") opts.map = {};
          if (!opts.map.inline) opts.map.inline = false;
          opts.map.prev = css.map;
        }
      } else {
        let parser2 = parse2;
        if (opts.syntax) parser2 = opts.syntax.parse;
        if (opts.parser) parser2 = opts.parser;
        if (parser2.parse) parser2 = parser2.parse;
        try {
          root2 = parser2(css, opts);
        } catch (error) {
          this.processed = true;
          this.error = error;
        }
        if (root2 && !root2[my]) {
          Container2.rebuild(root2);
        }
      }
      this.result = new Result(processor2, root2, opts);
      this.helpers = __spreadProps(__spreadValues({}, postcss2), { postcss: postcss2, result: this.result });
      this.plugins = this.processor.plugins.map((plugin) => {
        if (typeof plugin === "object" && plugin.prepare) {
          return __spreadValues(__spreadValues({}, plugin), plugin.prepare(this.result));
        } else {
          return plugin;
        }
      });
    }
    async() {
      if (this.error) return Promise.reject(this.error);
      if (this.processed) return Promise.resolve(this.result);
      if (!this.processing) {
        this.processing = this.runAsync();
      }
      return this.processing;
    }
    catch(onRejected) {
      return this.async().catch(onRejected);
    }
    finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(error, node2) {
      let plugin = this.result.lastPlugin;
      try {
        if (node2) node2.addToError(error);
        this.error = error;
        if (error.name === "CssSyntaxError" && !error.plugin) {
          error.plugin = plugin.postcssPlugin;
          error.setMessage();
        } else if (plugin.postcssVersion) {
          if (process.env.NODE_ENV !== "production") {
            let pluginName = plugin.postcssPlugin;
            let pluginVer = plugin.postcssVersion;
            let runtimeVer = this.result.processor.version;
            let a = pluginVer.split(".");
            let b = runtimeVer.split(".");
            if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
              console.error(
                "Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below."
              );
            }
          }
        }
      } catch (err) {
        if (console && console.error) console.error(err);
      }
      return error;
    }
    prepareVisitors() {
      this.listeners = {};
      let add = (plugin, type, cb) => {
        if (!this.listeners[type]) this.listeners[type] = [];
        this.listeners[type].push([plugin, cb]);
      };
      for (let plugin of this.plugins) {
        if (typeof plugin === "object") {
          for (let event in plugin) {
            if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
              throw new Error(
                `Unknown event ${event} in ${plugin.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            }
            if (!NOT_VISITORS[event]) {
              if (typeof plugin[event] === "object") {
                for (let filter2 in plugin[event]) {
                  if (filter2 === "*") {
                    add(plugin, event, plugin[event][filter2]);
                  } else {
                    add(
                      plugin,
                      event + "-" + filter2.toLowerCase(),
                      plugin[event][filter2]
                    );
                  }
                }
              } else if (typeof plugin[event] === "function") {
                add(plugin, event, plugin[event]);
              }
            }
          }
        }
      }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    async runAsync() {
      this.plugin = 0;
      for (let i = 0; i < this.plugins.length; i++) {
        let plugin = this.plugins[i];
        let promise = this.runOnRoot(plugin);
        if (isPromise(promise)) {
          try {
            await promise;
          } catch (error) {
            throw this.handleError(error);
          }
        }
      }
      this.prepareVisitors();
      if (this.hasListener) {
        let root2 = this.result.root;
        while (!root2[isClean]) {
          root2[isClean] = true;
          let stack = [toStack(root2)];
          while (stack.length > 0) {
            let promise = this.visitTick(stack);
            if (isPromise(promise)) {
              try {
                await promise;
              } catch (e) {
                let node2 = stack[stack.length - 1].node;
                throw this.handleError(e, node2);
              }
            }
          }
        }
        if (this.listeners.OnceExit) {
          for (let [plugin, visitor] of this.listeners.OnceExit) {
            this.result.lastPlugin = plugin;
            try {
              if (root2.type === "document") {
                let roots = root2.nodes.map(
                  (subRoot) => visitor(subRoot, this.helpers)
                );
                await Promise.all(roots);
              } else {
                await visitor(root2, this.helpers);
              }
            } catch (e) {
              throw this.handleError(e);
            }
          }
        }
      }
      this.processed = true;
      return this.stringify();
    }
    runOnRoot(plugin) {
      this.result.lastPlugin = plugin;
      try {
        if (typeof plugin === "object" && plugin.Once) {
          if (this.result.root.type === "document") {
            let roots = this.result.root.nodes.map(
              (root2) => plugin.Once(root2, this.helpers)
            );
            if (isPromise(roots[0])) {
              return Promise.all(roots);
            }
            return roots;
          }
          return plugin.Once(this.result.root, this.helpers);
        } else if (typeof plugin === "function") {
          return plugin(this.result.root, this.result);
        }
      } catch (error) {
        throw this.handleError(error);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = true;
      this.sync();
      let opts = this.result.opts;
      let str = stringify2;
      if (opts.syntax) str = opts.syntax.stringify;
      if (opts.stringifier) str = opts.stringifier;
      if (str.stringify) str = str.stringify;
      let map = new MapGenerator(str, this.result.root, this.result.opts);
      let data = map.generate();
      this.result.css = data[0];
      this.result.map = data[1];
      return this.result;
    }
    sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      this.processed = true;
      if (this.processing) {
        throw this.getAsyncError();
      }
      for (let plugin of this.plugins) {
        let promise = this.runOnRoot(plugin);
        if (isPromise(promise)) {
          throw this.getAsyncError();
        }
      }
      this.prepareVisitors();
      if (this.hasListener) {
        let root2 = this.result.root;
        while (!root2[isClean]) {
          root2[isClean] = true;
          this.walkSync(root2);
        }
        if (this.listeners.OnceExit) {
          if (root2.type === "document") {
            for (let subRoot of root2.nodes) {
              this.visitSync(this.listeners.OnceExit, subRoot);
            }
          } else {
            this.visitSync(this.listeners.OnceExit, root2);
          }
        }
      }
      return this.result;
    }
    then(onFulfilled, onRejected) {
      if (process.env.NODE_ENV !== "production") {
        if (!("from" in this.opts)) {
          warnOnce2(
            "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
          );
        }
      }
      return this.async().then(onFulfilled, onRejected);
    }
    toString() {
      return this.css;
    }
    visitSync(visitors, node2) {
      for (let [plugin, visitor] of visitors) {
        this.result.lastPlugin = plugin;
        let promise;
        try {
          promise = visitor(node2, this.helpers);
        } catch (e) {
          throw this.handleError(e, node2.proxyOf);
        }
        if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
          return true;
        }
        if (isPromise(promise)) {
          throw this.getAsyncError();
        }
      }
    }
    visitTick(stack) {
      let visit = stack[stack.length - 1];
      let { node: node2, visitors } = visit;
      if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
        stack.pop();
        return;
      }
      if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
        let [plugin, visitor] = visitors[visit.visitorIndex];
        visit.visitorIndex += 1;
        if (visit.visitorIndex === visitors.length) {
          visit.visitors = [];
          visit.visitorIndex = 0;
        }
        this.result.lastPlugin = plugin;
        try {
          return visitor(node2.toProxy(), this.helpers);
        } catch (e) {
          throw this.handleError(e, node2);
        }
      }
      if (visit.iterator !== 0) {
        let iterator = visit.iterator;
        let child;
        while (child = node2.nodes[node2.indexes[iterator]]) {
          node2.indexes[iterator] += 1;
          if (!child[isClean]) {
            child[isClean] = true;
            stack.push(toStack(child));
            return;
          }
        }
        visit.iterator = 0;
        delete node2.indexes[iterator];
      }
      let events2 = visit.events;
      while (visit.eventIndex < events2.length) {
        let event = events2[visit.eventIndex];
        visit.eventIndex += 1;
        if (event === CHILDREN) {
          if (node2.nodes && node2.nodes.length) {
            node2[isClean] = true;
            visit.iterator = node2.getIterator();
          }
          return;
        } else if (this.listeners[event]) {
          visit.visitors = this.listeners[event];
          return;
        }
      }
      stack.pop();
    }
    walkSync(node2) {
      node2[isClean] = true;
      let events2 = getEvents(node2);
      for (let event of events2) {
        if (event === CHILDREN) {
          if (node2.nodes) {
            node2.each((child) => {
              if (!child[isClean]) this.walkSync(child);
            });
          }
        } else {
          let visitors = this.listeners[event];
          if (visitors) {
            if (this.visitSync(visitors, node2.toProxy())) return;
          }
        }
      }
    }
    warnings() {
      return this.sync().warnings();
    }
  }
  LazyResult.registerPostcss = (dependant) => {
    postcss2 = dependant;
  };
  lazyResult = LazyResult;
  LazyResult.default = LazyResult;
  Root2.registerLazyResult(LazyResult);
  Document2.registerLazyResult(LazyResult);
  return lazyResult;
}
var noWorkResult;
var hasRequiredNoWorkResult;
function requireNoWorkResult() {
  if (hasRequiredNoWorkResult) return noWorkResult;
  hasRequiredNoWorkResult = 1;
  let MapGenerator = requireMapGenerator();
  let parse2 = requireParse();
  const Result = requireResult();
  let stringify2 = requireStringify();
  let warnOnce2 = requireWarnOnce();
  class NoWorkResult {
    get content() {
      return this.result.css;
    }
    get css() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get messages() {
      return [];
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      if (this._root) {
        return this._root;
      }
      let root2;
      let parser2 = parse2;
      try {
        root2 = parser2(this._css, this._opts);
      } catch (error) {
        this.error = error;
      }
      if (this.error) {
        throw this.error;
      } else {
        this._root = root2;
        return root2;
      }
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
    constructor(processor2, css, opts) {
      css = css.toString();
      this.stringified = false;
      this._processor = processor2;
      this._css = css;
      this._opts = opts;
      this._map = void 0;
      let root2;
      let str = stringify2;
      this.result = new Result(this._processor, root2, this._opts);
      this.result.css = css;
      let self = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return self.root;
        }
      });
      let map = new MapGenerator(str, root2, this._opts, css);
      if (map.isMap()) {
        let [generatedCSS, generatedMap] = map.generate();
        if (generatedCSS) {
          this.result.css = generatedCSS;
        }
        if (generatedMap) {
          this.result.map = generatedMap;
        }
      } else {
        map.clearAnnotation();
        this.result.css = map.css;
      }
    }
    async() {
      if (this.error) return Promise.reject(this.error);
      return Promise.resolve(this.result);
    }
    catch(onRejected) {
      return this.async().catch(onRejected);
    }
    finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
    sync() {
      if (this.error) throw this.error;
      return this.result;
    }
    then(onFulfilled, onRejected) {
      if (process.env.NODE_ENV !== "production") {
        if (!("from" in this._opts)) {
          warnOnce2(
            "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
          );
        }
      }
      return this.async().then(onFulfilled, onRejected);
    }
    toString() {
      return this._css;
    }
    warnings() {
      return [];
    }
  }
  noWorkResult = NoWorkResult;
  NoWorkResult.default = NoWorkResult;
  return noWorkResult;
}
var processor;
var hasRequiredProcessor;
function requireProcessor() {
  if (hasRequiredProcessor) return processor;
  hasRequiredProcessor = 1;
  let Document2 = requireDocument2();
  let LazyResult = requireLazyResult();
  let NoWorkResult = requireNoWorkResult();
  let Root2 = requireRoot();
  class Processor {
    constructor(plugins = []) {
      this.version = "8.5.6";
      this.plugins = this.normalize(plugins);
    }
    normalize(plugins) {
      let normalized = [];
      for (let i of plugins) {
        if (i.postcss === true) {
          i = i();
        } else if (i.postcss) {
          i = i.postcss;
        }
        if (typeof i === "object" && Array.isArray(i.plugins)) {
          normalized = normalized.concat(i.plugins);
        } else if (typeof i === "object" && i.postcssPlugin) {
          normalized.push(i);
        } else if (typeof i === "function") {
          normalized.push(i);
        } else if (typeof i === "object" && (i.parse || i.stringify)) {
          if (process.env.NODE_ENV !== "production") {
            throw new Error(
              "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
            );
          }
        } else {
          throw new Error(i + " is not a PostCSS plugin");
        }
      }
      return normalized;
    }
    process(css, opts = {}) {
      if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) {
        return new NoWorkResult(this, css, opts);
      } else {
        return new LazyResult(this, css, opts);
      }
    }
    use(plugin) {
      this.plugins = this.plugins.concat(this.normalize([plugin]));
      return this;
    }
  }
  processor = Processor;
  Processor.default = Processor;
  Root2.registerProcessor(Processor);
  Document2.registerProcessor(Processor);
  return processor;
}
var postcss_1;
var hasRequiredPostcss;
function requirePostcss() {
  if (hasRequiredPostcss) return postcss_1;
  hasRequiredPostcss = 1;
  let AtRule = requireAtRule();
  let Comment2 = requireComment2();
  let Container2 = requireContainer$1();
  let CssSyntaxError = requireCssSyntaxError();
  let Declaration = requireDeclaration();
  let Document2 = requireDocument2();
  let fromJSON = requireFromJSON();
  let Input = requireInput();
  let LazyResult = requireLazyResult();
  let list = requireList();
  let Node2 = requireNode$1();
  let parse2 = requireParse();
  let Processor = requireProcessor();
  let Result = requireResult();
  let Root2 = requireRoot();
  let Rule = requireRule();
  let stringify2 = requireStringify();
  let Warning = requireWarning();
  function postcss2(...plugins) {
    if (plugins.length === 1 && Array.isArray(plugins[0])) {
      plugins = plugins[0];
    }
    return new Processor(plugins);
  }
  postcss2.plugin = function plugin(name, initializer) {
    let warningPrinted = false;
    function creator(...args) {
      if (console && console.warn && !warningPrinted) {
        warningPrinted = true;
        console.warn(
          name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
        );
        if (process.env.LANG && process.env.LANG.startsWith("cn")) {
          console.warn(
            name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226"
          );
        }
      }
      let transformer = initializer(...args);
      transformer.postcssPlugin = name;
      transformer.postcssVersion = new Processor().version;
      return transformer;
    }
    let cache;
    Object.defineProperty(creator, "postcss", {
      get() {
        if (!cache) cache = creator();
        return cache;
      }
    });
    creator.process = function(css, processOpts, pluginOpts) {
      return postcss2([creator(pluginOpts)]).process(css, processOpts);
    };
    return creator;
  };
  postcss2.stringify = stringify2;
  postcss2.parse = parse2;
  postcss2.fromJSON = fromJSON;
  postcss2.list = list;
  postcss2.comment = (defaults) => new Comment2(defaults);
  postcss2.atRule = (defaults) => new AtRule(defaults);
  postcss2.decl = (defaults) => new Declaration(defaults);
  postcss2.rule = (defaults) => new Rule(defaults);
  postcss2.root = (defaults) => new Root2(defaults);
  postcss2.document = (defaults) => new Document2(defaults);
  postcss2.CssSyntaxError = CssSyntaxError;
  postcss2.Declaration = Declaration;
  postcss2.Container = Container2;
  postcss2.Processor = Processor;
  postcss2.Document = Document2;
  postcss2.Comment = Comment2;
  postcss2.Warning = Warning;
  postcss2.AtRule = AtRule;
  postcss2.Result = Result;
  postcss2.Input = Input;
  postcss2.Rule = Rule;
  postcss2.Root = Root2;
  postcss2.Node = Node2;
  LazyResult.registerPostcss(postcss2);
  postcss_1 = postcss2;
  postcss2.default = postcss2;
  return postcss_1;
}
var postcssExports = requirePostcss();
var postcss = getDefaultExportFromCjs2(postcssExports);
var stringify = postcss.stringify;
postcss.fromJSON;
postcss.plugin;
var parse$2 = postcss.parse;
postcss.list;
postcss.document;
postcss.comment;
postcss.atRule;
postcss.rule;
postcss.decl;
postcss.root;
postcss.CssSyntaxError;
postcss.Declaration;
postcss.Container;
postcss.Processor;
postcss.Document;
postcss.Comment;
postcss.Warning;
postcss.AtRule;
postcss.Result;
postcss.Input;
postcss.Rule;
postcss.Root;
postcss.Node;
var dist = {};
var Container = {};
var Node$1 = {};
var hasRequiredNode2;
function requireNode2() {
  if (hasRequiredNode2) return Node$1;
  hasRequiredNode2 = 1;
  Object.defineProperty(Node$1, "__esModule", {
    value: true
  });
  function Node2(opts) {
    this.after = opts.after;
    this.before = opts.before;
    this.type = opts.type;
    this.value = opts.value;
    this.sourceIndex = opts.sourceIndex;
  }
  Node$1.default = Node2;
  return Node$1;
}
var hasRequiredContainer;
function requireContainer() {
  if (hasRequiredContainer) return Container;
  hasRequiredContainer = 1;
  Object.defineProperty(Container, "__esModule", {
    value: true
  });
  var _Node = requireNode2();
  var _Node2 = _interopRequireDefault(_Node);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function Container$1(opts) {
    var _this = this;
    this.constructor(opts);
    this.nodes = opts.nodes;
    if (this.after === void 0) {
      this.after = this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].after : "";
    }
    if (this.before === void 0) {
      this.before = this.nodes.length > 0 ? this.nodes[0].before : "";
    }
    if (this.sourceIndex === void 0) {
      this.sourceIndex = this.before.length;
    }
    this.nodes.forEach(function(node2) {
      node2.parent = _this;
    });
  }
  Container$1.prototype = Object.create(_Node2.default.prototype);
  Container$1.constructor = _Node2.default;
  Container$1.prototype.walk = function walk(filter2, cb) {
    var hasFilter = typeof filter2 === "string" || filter2 instanceof RegExp;
    var callback = hasFilter ? cb : filter2;
    var filterReg = typeof filter2 === "string" ? new RegExp(filter2) : filter2;
    for (var i = 0; i < this.nodes.length; i++) {
      var node2 = this.nodes[i];
      var filtered = hasFilter ? filterReg.test(node2.type) : true;
      if (filtered && callback && callback(node2, i, this.nodes) === false) {
        return false;
      }
      if (node2.nodes && node2.walk(filter2, cb) === false) {
        return false;
      }
    }
    return true;
  };
  Container$1.prototype.each = function each() {
    var cb = arguments.length <= 0 || arguments[0] === void 0 ? function() {
    } : arguments[0];
    for (var i = 0; i < this.nodes.length; i++) {
      var node2 = this.nodes[i];
      if (cb(node2, i, this.nodes) === false) {
        return false;
      }
    }
    return true;
  };
  Container.default = Container$1;
  return Container;
}
var parsers = {};
var hasRequiredParsers;
function requireParsers() {
  if (hasRequiredParsers) return parsers;
  hasRequiredParsers = 1;
  Object.defineProperty(parsers, "__esModule", {
    value: true
  });
  parsers.parseMediaFeature = parseMediaFeature;
  parsers.parseMediaQuery = parseMediaQuery;
  parsers.parseMediaList = parseMediaList;
  var _Node = requireNode2();
  var _Node2 = _interopRequireDefault(_Node);
  var _Container = requireContainer();
  var _Container2 = _interopRequireDefault(_Container);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function parseMediaFeature(string) {
    var index2 = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
    var modesEntered = [{
      mode: "normal",
      character: null
    }];
    var result2 = [];
    var lastModeIndex = 0;
    var mediaFeature = "";
    var colon = null;
    var mediaFeatureValue = null;
    var indexLocal = index2;
    var stringNormalized = string;
    if (string[0] === "(" && string[string.length - 1] === ")") {
      stringNormalized = string.substring(1, string.length - 1);
      indexLocal++;
    }
    for (var i = 0; i < stringNormalized.length; i++) {
      var character = stringNormalized[i];
      if (character === "'" || character === '"') {
        if (modesEntered[lastModeIndex].isCalculationEnabled === true) {
          modesEntered.push({
            mode: "string",
            isCalculationEnabled: false,
            character
          });
          lastModeIndex++;
        } else if (modesEntered[lastModeIndex].mode === "string" && modesEntered[lastModeIndex].character === character && stringNormalized[i - 1] !== "\\") {
          modesEntered.pop();
          lastModeIndex--;
        }
      }
      if (character === "{") {
        modesEntered.push({
          mode: "interpolation",
          isCalculationEnabled: true
        });
        lastModeIndex++;
      } else if (character === "}") {
        modesEntered.pop();
        lastModeIndex--;
      }
      if (modesEntered[lastModeIndex].mode === "normal" && character === ":") {
        var mediaFeatureValueStr = stringNormalized.substring(i + 1);
        mediaFeatureValue = {
          type: "value",
          before: /^(\s*)/.exec(mediaFeatureValueStr)[1],
          after: /(\s*)$/.exec(mediaFeatureValueStr)[1],
          value: mediaFeatureValueStr.trim()
        };
        mediaFeatureValue.sourceIndex = mediaFeatureValue.before.length + i + 1 + indexLocal;
        colon = {
          type: "colon",
          sourceIndex: i + indexLocal,
          after: mediaFeatureValue.before,
          value: ":"
        };
        break;
      }
      mediaFeature += character;
    }
    mediaFeature = {
      type: "media-feature",
      before: /^(\s*)/.exec(mediaFeature)[1],
      after: /(\s*)$/.exec(mediaFeature)[1],
      value: mediaFeature.trim()
    };
    mediaFeature.sourceIndex = mediaFeature.before.length + indexLocal;
    result2.push(mediaFeature);
    if (colon !== null) {
      colon.before = mediaFeature.after;
      result2.push(colon);
    }
    if (mediaFeatureValue !== null) {
      result2.push(mediaFeatureValue);
    }
    return result2;
  }
  function parseMediaQuery(string) {
    var index2 = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
    var result2 = [];
    var localLevel = 0;
    var insideSomeValue = false;
    var node2 = void 0;
    function resetNode() {
      return {
        before: "",
        after: "",
        value: ""
      };
    }
    node2 = resetNode();
    for (var i = 0; i < string.length; i++) {
      var character = string[i];
      if (!insideSomeValue) {
        if (character.search(/\s/) !== -1) {
          node2.before += character;
        } else {
          if (character === "(") {
            node2.type = "media-feature-expression";
            localLevel++;
          }
          node2.value = character;
          node2.sourceIndex = index2 + i;
          insideSomeValue = true;
        }
      } else {
        node2.value += character;
        if (character === "{" || character === "(") {
          localLevel++;
        }
        if (character === ")" || character === "}") {
          localLevel--;
        }
      }
      if (insideSomeValue && localLevel === 0 && (character === ")" || i === string.length - 1 || string[i + 1].search(/\s/) !== -1)) {
        if (["not", "only", "and"].indexOf(node2.value) !== -1) {
          node2.type = "keyword";
        }
        if (node2.type === "media-feature-expression") {
          node2.nodes = parseMediaFeature(node2.value, node2.sourceIndex);
        }
        result2.push(Array.isArray(node2.nodes) ? new _Container2.default(node2) : new _Node2.default(node2));
        node2 = resetNode();
        insideSomeValue = false;
      }
    }
    for (var _i = 0; _i < result2.length; _i++) {
      node2 = result2[_i];
      if (_i > 0) {
        result2[_i - 1].after = node2.before;
      }
      if (node2.type === void 0) {
        if (_i > 0) {
          if (result2[_i - 1].type === "media-feature-expression") {
            node2.type = "keyword";
            continue;
          }
          if (result2[_i - 1].value === "not" || result2[_i - 1].value === "only") {
            node2.type = "media-type";
            continue;
          }
          if (result2[_i - 1].value === "and") {
            node2.type = "media-feature-expression";
            continue;
          }
          if (result2[_i - 1].type === "media-type") {
            if (!result2[_i + 1]) {
              node2.type = "media-feature-expression";
            } else {
              node2.type = result2[_i + 1].type === "media-feature-expression" ? "keyword" : "media-feature-expression";
            }
          }
        }
        if (_i === 0) {
          if (!result2[_i + 1]) {
            node2.type = "media-type";
            continue;
          }
          if (result2[_i + 1] && (result2[_i + 1].type === "media-feature-expression" || result2[_i + 1].type === "keyword")) {
            node2.type = "media-type";
            continue;
          }
          if (result2[_i + 2]) {
            if (result2[_i + 2].type === "media-feature-expression") {
              node2.type = "media-type";
              result2[_i + 1].type = "keyword";
              continue;
            }
            if (result2[_i + 2].type === "keyword") {
              node2.type = "keyword";
              result2[_i + 1].type = "media-type";
              continue;
            }
          }
          if (result2[_i + 3]) {
            if (result2[_i + 3].type === "media-feature-expression") {
              node2.type = "keyword";
              result2[_i + 1].type = "media-type";
              result2[_i + 2].type = "keyword";
              continue;
            }
          }
        }
      }
    }
    return result2;
  }
  function parseMediaList(string) {
    var result2 = [];
    var interimIndex = 0;
    var levelLocal = 0;
    var doesHaveUrl = /^(\s*)url\s*\(/.exec(string);
    if (doesHaveUrl !== null) {
      var i = doesHaveUrl[0].length;
      var parenthesesLv = 1;
      while (parenthesesLv > 0) {
        var character = string[i];
        if (character === "(") {
          parenthesesLv++;
        }
        if (character === ")") {
          parenthesesLv--;
        }
        i++;
      }
      result2.unshift(new _Node2.default({
        type: "url",
        value: string.substring(0, i).trim(),
        sourceIndex: doesHaveUrl[1].length,
        before: doesHaveUrl[1],
        after: /^(\s*)/.exec(string.substring(i))[1]
      }));
      interimIndex = i;
    }
    for (var _i2 = interimIndex; _i2 < string.length; _i2++) {
      var _character = string[_i2];
      if (_character === "(") {
        levelLocal++;
      }
      if (_character === ")") {
        levelLocal--;
      }
      if (levelLocal === 0 && _character === ",") {
        var _mediaQueryString = string.substring(interimIndex, _i2);
        var _spaceBefore = /^(\s*)/.exec(_mediaQueryString)[1];
        result2.push(new _Container2.default({
          type: "media-query",
          value: _mediaQueryString.trim(),
          sourceIndex: interimIndex + _spaceBefore.length,
          nodes: parseMediaQuery(_mediaQueryString, interimIndex),
          before: _spaceBefore,
          after: /(\s*)$/.exec(_mediaQueryString)[1]
        }));
        interimIndex = _i2 + 1;
      }
    }
    var mediaQueryString = string.substring(interimIndex);
    var spaceBefore = /^(\s*)/.exec(mediaQueryString)[1];
    result2.push(new _Container2.default({
      type: "media-query",
      value: mediaQueryString.trim(),
      sourceIndex: interimIndex + spaceBefore.length,
      nodes: parseMediaQuery(mediaQueryString, interimIndex),
      before: spaceBefore,
      after: /(\s*)$/.exec(mediaQueryString)[1]
    }));
    return result2;
  }
  return parsers;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  Object.defineProperty(dist, "__esModule", {
    value: true
  });
  dist.default = parseMedia;
  var _Container = requireContainer();
  var _Container2 = _interopRequireDefault(_Container);
  var _parsers = requireParsers();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function parseMedia(value) {
    return new _Container2.default({
      nodes: (0, _parsers.parseMediaList)(value),
      type: "media-query-list",
      value: value.trim()
    });
  }
  return dist;
}
var distExports = requireDist();
var mediaParser = getDefaultExportFromCjs2(distExports);
var boolbase$1;
var hasRequiredBoolbase;
function requireBoolbase() {
  if (hasRequiredBoolbase) return boolbase$1;
  hasRequiredBoolbase = 1;
  boolbase$1 = {
    trueFunc: function trueFunc() {
      return true;
    },
    falseFunc: function falseFunc() {
      return false;
    }
  };
  return boolbase$1;
}
var boolbaseExports = requireBoolbase();
var boolbase = getDefaultExportFromCjs2(boolbaseExports);
var SelectorType;
(function(SelectorType2) {
  SelectorType2["Attribute"] = "attribute";
  SelectorType2["Pseudo"] = "pseudo";
  SelectorType2["PseudoElement"] = "pseudo-element";
  SelectorType2["Tag"] = "tag";
  SelectorType2["Universal"] = "universal";
  SelectorType2["Adjacent"] = "adjacent";
  SelectorType2["Child"] = "child";
  SelectorType2["Descendant"] = "descendant";
  SelectorType2["Parent"] = "parent";
  SelectorType2["Sibling"] = "sibling";
  SelectorType2["ColumnCombinator"] = "column-combinator";
})(SelectorType || (SelectorType = {}));
var AttributeAction;
(function(AttributeAction2) {
  AttributeAction2["Any"] = "any";
  AttributeAction2["Element"] = "element";
  AttributeAction2["End"] = "end";
  AttributeAction2["Equals"] = "equals";
  AttributeAction2["Exists"] = "exists";
  AttributeAction2["Hyphen"] = "hyphen";
  AttributeAction2["Not"] = "not";
  AttributeAction2["Start"] = "start";
})(AttributeAction || (AttributeAction = {}));
var reName = /^[^#\\]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\u00B0-\uFFFF-])+/;
var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
var CharCode;
(function(CharCode2) {
  CharCode2[CharCode2["LeftParenthesis"] = 40] = "LeftParenthesis";
  CharCode2[CharCode2["RightParenthesis"] = 41] = "RightParenthesis";
  CharCode2[CharCode2["LeftSquareBracket"] = 91] = "LeftSquareBracket";
  CharCode2[CharCode2["RightSquareBracket"] = 93] = "RightSquareBracket";
  CharCode2[CharCode2["Comma"] = 44] = "Comma";
  CharCode2[CharCode2["Period"] = 46] = "Period";
  CharCode2[CharCode2["Colon"] = 58] = "Colon";
  CharCode2[CharCode2["SingleQuote"] = 39] = "SingleQuote";
  CharCode2[CharCode2["DoubleQuote"] = 34] = "DoubleQuote";
  CharCode2[CharCode2["Plus"] = 43] = "Plus";
  CharCode2[CharCode2["Tilde"] = 126] = "Tilde";
  CharCode2[CharCode2["QuestionMark"] = 63] = "QuestionMark";
  CharCode2[CharCode2["ExclamationMark"] = 33] = "ExclamationMark";
  CharCode2[CharCode2["Slash"] = 47] = "Slash";
  CharCode2[CharCode2["Equal"] = 61] = "Equal";
  CharCode2[CharCode2["Dollar"] = 36] = "Dollar";
  CharCode2[CharCode2["Pipe"] = 124] = "Pipe";
  CharCode2[CharCode2["Circumflex"] = 94] = "Circumflex";
  CharCode2[CharCode2["Asterisk"] = 42] = "Asterisk";
  CharCode2[CharCode2["GreaterThan"] = 62] = "GreaterThan";
  CharCode2[CharCode2["LessThan"] = 60] = "LessThan";
  CharCode2[CharCode2["Hash"] = 35] = "Hash";
  CharCode2[CharCode2["LowerI"] = 105] = "LowerI";
  CharCode2[CharCode2["LowerS"] = 115] = "LowerS";
  CharCode2[CharCode2["BackSlash"] = 92] = "BackSlash";
  CharCode2[CharCode2["Space"] = 32] = "Space";
  CharCode2[CharCode2["Tab"] = 9] = "Tab";
  CharCode2[CharCode2["NewLine"] = 10] = "NewLine";
  CharCode2[CharCode2["FormFeed"] = 12] = "FormFeed";
  CharCode2[CharCode2["CarriageReturn"] = 13] = "CarriageReturn";
})(CharCode || (CharCode = {}));
var actionTypes = /* @__PURE__ */ new Map([
  [CharCode.Tilde, AttributeAction.Element],
  [CharCode.Circumflex, AttributeAction.Start],
  [CharCode.Dollar, AttributeAction.End],
  [CharCode.Asterisk, AttributeAction.Any],
  [CharCode.ExclamationMark, AttributeAction.Not],
  [CharCode.Pipe, AttributeAction.Hyphen]
]);
var unpackPseudos = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
var pseudosToPseudoElements = /* @__PURE__ */ new Set([
  "before",
  "after",
  "first-line",
  "first-letter"
]);
function isTraversal$1(selector) {
  switch (selector.type) {
    case SelectorType.Adjacent:
    case SelectorType.Child:
    case SelectorType.Descendant:
    case SelectorType.Parent:
    case SelectorType.Sibling:
    case SelectorType.ColumnCombinator: {
      return true;
    }
    default: {
      return false;
    }
  }
}
var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
function funescape(_, escaped, escapedWhitespace) {
  const high = Number.parseInt(escaped, 16) - 65536;
  return high !== high || escapedWhitespace ? escaped : high < 0 ? (
    // BMP codepoint
    String.fromCharCode(high + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
  );
}
function unescapeCSS(cssString) {
  return cssString.replace(reEscape, funescape);
}
function isQuote(c) {
  return c === CharCode.SingleQuote || c === CharCode.DoubleQuote;
}
function isWhitespace$1(c) {
  return c === CharCode.Space || c === CharCode.Tab || c === CharCode.NewLine || c === CharCode.FormFeed || c === CharCode.CarriageReturn;
}
function parse$1(selector) {
  const subselects2 = [];
  const endIndex = parseSelector(subselects2, `${selector}`, 0);
  if (endIndex < selector.length) {
    throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
  }
  return subselects2;
}
function parseSelector(subselects2, selector, selectorIndex) {
  let tokens = [];
  function getName2(offset) {
    const match = selector.slice(selectorIndex + offset).match(reName);
    if (!match) {
      throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
    }
    const [name] = match;
    selectorIndex += offset + name.length;
    return unescapeCSS(name);
  }
  function stripWhitespace(offset) {
    selectorIndex += offset;
    while (selectorIndex < selector.length && isWhitespace$1(selector.charCodeAt(selectorIndex))) {
      selectorIndex++;
    }
  }
  function readValueWithParenthesis() {
    selectorIndex += 1;
    const start = selectorIndex;
    for (let counter = 1; selectorIndex < selector.length; selectorIndex++) {
      switch (selector.charCodeAt(selectorIndex)) {
        case CharCode.BackSlash: {
          selectorIndex += 1;
          break;
        }
        case CharCode.LeftParenthesis: {
          counter += 1;
          break;
        }
        case CharCode.RightParenthesis: {
          counter -= 1;
          if (counter === 0) {
            return unescapeCSS(selector.slice(start, selectorIndex++));
          }
          break;
        }
      }
    }
    throw new Error("Parenthesis not matched");
  }
  function ensureNotTraversal() {
    if (tokens.length > 0 && isTraversal$1(tokens[tokens.length - 1])) {
      throw new Error("Did not expect successive traversals.");
    }
  }
  function addTraversal(type) {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens[tokens.length - 1].type = type;
      return;
    }
    ensureNotTraversal();
    tokens.push({ type });
  }
  function addSpecialAttribute(name, action) {
    tokens.push({
      type: SelectorType.Attribute,
      name,
      action,
      value: getName2(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function finalizeSubselector() {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens.pop();
    }
    if (tokens.length === 0) {
      throw new Error("Empty sub-selector");
    }
    subselects2.push(tokens);
  }
  stripWhitespace(0);
  if (selector.length === selectorIndex) {
    return selectorIndex;
  }
  loop: while (selectorIndex < selector.length) {
    const firstChar = selector.charCodeAt(selectorIndex);
    switch (firstChar) {
      // Whitespace
      case CharCode.Space:
      case CharCode.Tab:
      case CharCode.NewLine:
      case CharCode.FormFeed:
      case CharCode.CarriageReturn: {
        if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
          ensureNotTraversal();
          tokens.push({ type: SelectorType.Descendant });
        }
        stripWhitespace(1);
        break;
      }
      // Traversals
      case CharCode.GreaterThan: {
        addTraversal(SelectorType.Child);
        stripWhitespace(1);
        break;
      }
      case CharCode.LessThan: {
        addTraversal(SelectorType.Parent);
        stripWhitespace(1);
        break;
      }
      case CharCode.Tilde: {
        addTraversal(SelectorType.Sibling);
        stripWhitespace(1);
        break;
      }
      case CharCode.Plus: {
        addTraversal(SelectorType.Adjacent);
        stripWhitespace(1);
        break;
      }
      // Special attribute selectors: .class, #id
      case CharCode.Period: {
        addSpecialAttribute("class", AttributeAction.Element);
        break;
      }
      case CharCode.Hash: {
        addSpecialAttribute("id", AttributeAction.Equals);
        break;
      }
      case CharCode.LeftSquareBracket: {
        stripWhitespace(1);
        let name;
        let namespace = null;
        if (selector.charCodeAt(selectorIndex) === CharCode.Pipe) {
          name = getName2(1);
        } else if (selector.startsWith("*|", selectorIndex)) {
          namespace = "*";
          name = getName2(2);
        } else {
          name = getName2(0);
          if (selector.charCodeAt(selectorIndex) === CharCode.Pipe && selector.charCodeAt(selectorIndex + 1) !== CharCode.Equal) {
            namespace = name;
            name = getName2(1);
          }
        }
        stripWhitespace(0);
        let action = AttributeAction.Exists;
        const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
        if (possibleAction) {
          action = possibleAction;
          if (selector.charCodeAt(selectorIndex + 1) !== CharCode.Equal) {
            throw new Error("Expected `=`");
          }
          stripWhitespace(2);
        } else if (selector.charCodeAt(selectorIndex) === CharCode.Equal) {
          action = AttributeAction.Equals;
          stripWhitespace(1);
        }
        let value = "";
        let ignoreCase = null;
        if (action !== "exists") {
          if (isQuote(selector.charCodeAt(selectorIndex))) {
            const quote = selector.charCodeAt(selectorIndex);
            selectorIndex += 1;
            const sectionStart = selectorIndex;
            while (selectorIndex < selector.length && selector.charCodeAt(selectorIndex) !== quote) {
              selectorIndex += // Skip next character if it is escaped
              selector.charCodeAt(selectorIndex) === CharCode.BackSlash ? 2 : 1;
            }
            if (selector.charCodeAt(selectorIndex) !== quote) {
              throw new Error("Attribute value didn't end");
            }
            value = unescapeCSS(selector.slice(sectionStart, selectorIndex));
            selectorIndex += 1;
          } else {
            const valueStart = selectorIndex;
            while (selectorIndex < selector.length && !isWhitespace$1(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== CharCode.RightSquareBracket) {
              selectorIndex += // Skip next character if it is escaped
              selector.charCodeAt(selectorIndex) === CharCode.BackSlash ? 2 : 1;
            }
            value = unescapeCSS(selector.slice(valueStart, selectorIndex));
          }
          stripWhitespace(0);
          switch (selector.charCodeAt(selectorIndex) | 32) {
            // If the forceIgnore flag is set (either `i` or `s`), use that value
            case CharCode.LowerI: {
              ignoreCase = true;
              stripWhitespace(1);
              break;
            }
            case CharCode.LowerS: {
              ignoreCase = false;
              stripWhitespace(1);
              break;
            }
          }
        }
        if (selector.charCodeAt(selectorIndex) !== CharCode.RightSquareBracket) {
          throw new Error("Attribute selector didn't terminate");
        }
        selectorIndex += 1;
        const attributeSelector = {
          type: SelectorType.Attribute,
          name,
          action,
          value,
          namespace,
          ignoreCase
        };
        tokens.push(attributeSelector);
        break;
      }
      case CharCode.Colon: {
        if (selector.charCodeAt(selectorIndex + 1) === CharCode.Colon) {
          tokens.push({
            type: SelectorType.PseudoElement,
            name: getName2(2).toLowerCase(),
            data: selector.charCodeAt(selectorIndex) === CharCode.LeftParenthesis ? readValueWithParenthesis() : null
          });
          break;
        }
        const name = getName2(1).toLowerCase();
        if (pseudosToPseudoElements.has(name)) {
          tokens.push({
            type: SelectorType.PseudoElement,
            name,
            data: null
          });
          break;
        }
        let data = null;
        if (selector.charCodeAt(selectorIndex) === CharCode.LeftParenthesis) {
          if (unpackPseudos.has(name)) {
            if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
              throw new Error(`Pseudo-selector ${name} cannot be quoted`);
            }
            data = [];
            selectorIndex = parseSelector(data, selector, selectorIndex + 1);
            if (selector.charCodeAt(selectorIndex) !== CharCode.RightParenthesis) {
              throw new Error(`Missing closing parenthesis in :${name} (${selector})`);
            }
            selectorIndex += 1;
          } else {
            data = readValueWithParenthesis();
            if (stripQuotesFromPseudos.has(name)) {
              const quot = data.charCodeAt(0);
              if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) {
                data = data.slice(1, -1);
              }
            }
            data = unescapeCSS(data);
          }
        }
        tokens.push({ type: SelectorType.Pseudo, name, data });
        break;
      }
      case CharCode.Comma: {
        finalizeSubselector();
        tokens = [];
        stripWhitespace(1);
        break;
      }
      default: {
        if (selector.startsWith("/*", selectorIndex)) {
          const endIndex = selector.indexOf("*/", selectorIndex + 2);
          if (endIndex < 0) {
            throw new Error("Comment was not terminated");
          }
          selectorIndex = endIndex + 2;
          if (tokens.length === 0) {
            stripWhitespace(0);
          }
          break;
        }
        let namespace = null;
        let name;
        if (firstChar === CharCode.Asterisk) {
          selectorIndex += 1;
          name = "*";
        } else if (firstChar === CharCode.Pipe) {
          name = "";
          if (selector.charCodeAt(selectorIndex + 1) === CharCode.Pipe) {
            addTraversal(SelectorType.ColumnCombinator);
            stripWhitespace(2);
            break;
          }
        } else if (reName.test(selector.slice(selectorIndex))) {
          name = getName2(0);
        } else {
          break loop;
        }
        if (selector.charCodeAt(selectorIndex) === CharCode.Pipe && selector.charCodeAt(selectorIndex + 1) !== CharCode.Pipe) {
          namespace = name;
          if (selector.charCodeAt(selectorIndex + 1) === CharCode.Asterisk) {
            name = "*";
            selectorIndex += 2;
          } else {
            name = getName2(1);
          }
        }
        tokens.push(name === "*" ? { type: SelectorType.Universal, namespace } : { type: SelectorType.Tag, name, namespace });
      }
    }
  }
  finalizeSubselector();
  return selectorIndex;
}
var ElementType;
(function(ElementType2) {
  ElementType2["Root"] = "root";
  ElementType2["Text"] = "text";
  ElementType2["Directive"] = "directive";
  ElementType2["Comment"] = "comment";
  ElementType2["Script"] = "script";
  ElementType2["Style"] = "style";
  ElementType2["Tag"] = "tag";
  ElementType2["CDATA"] = "cdata";
  ElementType2["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
function isTag$1(elem) {
  return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
var Root = ElementType.Root;
var Text$1 = ElementType.Text;
var Directive = ElementType.Directive;
var Comment$1 = ElementType.Comment;
var Script = ElementType.Script;
var Style = ElementType.Style;
var Tag = ElementType.Tag;
var CDATA$1 = ElementType.CDATA;
var Doctype = ElementType.Doctype;
var Node = class {
  constructor() {
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.startIndex = null;
    this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(parent) {
    this.parent = parent;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(prev) {
    this.prev = prev;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(next) {
    this.next = next;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(recursive = false) {
    return cloneNode(this, recursive);
  }
};
var DataNode = class extends Node {
  /**
   * @param data The content of the data node
   */
  constructor(data) {
    super();
    this.data = data;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(data) {
    this.data = data;
  }
};
var Text = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Text;
  }
  get nodeType() {
    return 3;
  }
};
var Comment = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Comment;
  }
  get nodeType() {
    return 8;
  }
};
var ProcessingInstruction = class extends DataNode {
  constructor(name, data) {
    super(data);
    this.name = name;
    this.type = ElementType.Directive;
  }
  get nodeType() {
    return 1;
  }
};
var NodeWithChildren = class extends Node {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(children) {
    super();
    this.children = children;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var _a2;
    return (_a2 = this.children[0]) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(children) {
    this.children = children;
  }
};
var CDATA = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.CDATA;
  }
  get nodeType() {
    return 4;
  }
};
var Document = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.Root;
  }
  get nodeType() {
    return 9;
  }
};
var Element = class extends NodeWithChildren {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(name, attribs, children = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
    super(children);
    this.name = name;
    this.attribs = attribs;
    this.type = type;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(name) {
    this.name = name;
  }
  get attributes() {
    return Object.keys(this.attribs).map((name) => {
      var _a2, _b;
      return {
        name,
        value: this.attribs[name],
        namespace: (_a2 = this["x-attribsNamespace"]) === null || _a2 === void 0 ? void 0 : _a2[name],
        prefix: (_b = this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
      };
    });
  }
};
function isTag(node2) {
  return isTag$1(node2);
}
function isCDATA(node2) {
  return node2.type === ElementType.CDATA;
}
function isText(node2) {
  return node2.type === ElementType.Text;
}
function isComment(node2) {
  return node2.type === ElementType.Comment;
}
function isDirective(node2) {
  return node2.type === ElementType.Directive;
}
function isDocument(node2) {
  return node2.type === ElementType.Root;
}
function hasChildren(node2) {
  return Object.prototype.hasOwnProperty.call(node2, "children");
}
function cloneNode(node2, recursive = false) {
  let result2;
  if (isText(node2)) {
    result2 = new Text(node2.data);
  } else if (isComment(node2)) {
    result2 = new Comment(node2.data);
  } else if (isTag(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Element(node2.name, __spreadValues({}, node2.attribs), children);
    children.forEach((child) => child.parent = clone);
    if (node2.namespace != null) {
      clone.namespace = node2.namespace;
    }
    if (node2["x-attribsNamespace"]) {
      clone["x-attribsNamespace"] = __spreadValues({}, node2["x-attribsNamespace"]);
    }
    if (node2["x-attribsPrefix"]) {
      clone["x-attribsPrefix"] = __spreadValues({}, node2["x-attribsPrefix"]);
    }
    result2 = clone;
  } else if (isCDATA(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new CDATA(children);
    children.forEach((child) => child.parent = clone);
    result2 = clone;
  } else if (isDocument(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Document(children);
    children.forEach((child) => child.parent = clone);
    if (node2["x-mode"]) {
      clone["x-mode"] = node2["x-mode"];
    }
    result2 = clone;
  } else if (isDirective(node2)) {
    const instruction = new ProcessingInstruction(node2.name, node2.data);
    if (node2["x-name"] != null) {
      instruction["x-name"] = node2["x-name"];
      instruction["x-publicId"] = node2["x-publicId"];
      instruction["x-systemId"] = node2["x-systemId"];
    }
    result2 = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node2.type}`);
  }
  result2.startIndex = node2.startIndex;
  result2.endIndex = node2.endIndex;
  if (node2.sourceCodeLocation != null) {
    result2.sourceCodeLocation = node2.sourceCodeLocation;
  }
  return result2;
}
function cloneChildren(childs) {
  const children = childs.map((child) => cloneNode(child, true));
  for (let i = 1; i < children.length; i++) {
    children[i].prev = children[i - 1];
    children[i - 1].next = children[i];
  }
  return children;
}
var defaultOpts = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};
var DomHandler = class {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(callback, options, elementCB) {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
    if (typeof options === "function") {
      elementCB = options;
      options = defaultOpts;
    }
    if (typeof callback === "object") {
      options = callback;
      callback = void 0;
    }
    this.callback = callback !== null && callback !== void 0 ? callback : null;
    this.options = options !== null && options !== void 0 ? options : defaultOpts;
    this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
  }
  onparserinit(parser2) {
    this.parser = parser2;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    if (this.done)
      return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  }
  onerror(error) {
    this.handleCallback(error);
  }
  onclosetag() {
    this.lastNode = null;
    const elem = this.tagStack.pop();
    if (this.options.withEndIndices) {
      elem.endIndex = this.parser.endIndex;
    }
    if (this.elementCB)
      this.elementCB(elem);
  }
  onopentag(name, attribs) {
    const type = this.options.xmlMode ? ElementType.Tag : void 0;
    const element = new Element(name, attribs, void 0, type);
    this.addNode(element);
    this.tagStack.push(element);
  }
  ontext(data) {
    const { lastNode } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data += data;
      if (this.options.withEndIndices) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      const node2 = new Text(data);
      this.addNode(node2);
      this.lastNode = node2;
    }
  }
  oncomment(data) {
    if (this.lastNode && this.lastNode.type === ElementType.Comment) {
      this.lastNode.data += data;
      return;
    }
    const node2 = new Comment(data);
    this.addNode(node2);
    this.lastNode = node2;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const text = new Text("");
    const node2 = new CDATA([text]);
    this.addNode(node2);
    text.parent = node2;
    this.lastNode = text;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(name, data) {
    const node2 = new ProcessingInstruction(name, data);
    this.addNode(node2);
  }
  handleCallback(error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  }
  addNode(node2) {
    const parent = this.tagStack[this.tagStack.length - 1];
    const previousSibling = parent.children[parent.children.length - 1];
    if (this.options.withStartIndices) {
      node2.startIndex = this.parser.startIndex;
    }
    if (this.options.withEndIndices) {
      node2.endIndex = this.parser.endIndex;
    }
    parent.children.push(node2);
    if (previousSibling) {
      node2.prev = previousSibling;
      previousSibling.next = node2;
    }
    node2.parent = parent;
    this.lastNode = null;
  }
};
var xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
var xmlCodeMap = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]);
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (str, index2) => str.codePointAt(index2) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (c, index2) => (c.charCodeAt(index2) & 64512) === 55296 ? (c.charCodeAt(index2) - 55296) * 1024 + c.charCodeAt(index2 + 1) - 56320 + 65536 : c.charCodeAt(index2)
  )
);
function encodeXML(str) {
  let ret = "";
  let lastIdx = 0;
  let match;
  while ((match = xmlReplacer.exec(str)) !== null) {
    const i = match.index;
    const char = str.charCodeAt(i);
    const next = xmlCodeMap.get(char);
    if (next !== void 0) {
      ret += str.substring(lastIdx, i) + next;
      lastIdx = i + 1;
    } else {
      ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
      lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
    }
  }
  return ret + str.substr(lastIdx);
}
function getEscaper(regex, map) {
  return function escape(data) {
    let match;
    let lastIdx = 0;
    let result2 = "";
    while (match = regex.exec(data)) {
      if (lastIdx !== match.index) {
        result2 += data.substring(lastIdx, match.index);
      }
      result2 += map.get(match[0].charCodeAt(0));
      lastIdx = match.index + 1;
    }
    return result2 + data.substring(lastIdx);
  };
}
var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
]));
var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
]));
var elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((val) => [val.toLowerCase(), val]));
var attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((val) => [val.toLowerCase(), val]));
var unencodedElements = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function replaceQuotes(value) {
  return value.replace(/"/g, "&quot;");
}
function formatAttributes(attributes2, opts) {
  var _a2;
  if (!attributes2)
    return;
  const encode = ((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
  return Object.keys(attributes2).map((key) => {
    var _a3, _b;
    const value = (_a3 = attributes2[key]) !== null && _a3 !== void 0 ? _a3 : "";
    if (opts.xmlMode === "foreign") {
      key = (_b = attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
    }
    if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
      return key;
    }
    return `${key}="${encode(value)}"`;
  }).join(" ");
}
var singleTag = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function render(node2, options = {}) {
  const nodes = "length" in node2 ? node2 : [node2];
  let output = "";
  for (let i = 0; i < nodes.length; i++) {
    output += renderNode(nodes[i], options);
  }
  return output;
}
function renderNode(node2, options) {
  switch (node2.type) {
    case Root:
      return render(node2.children, options);
    // @ts-expect-error We don't use `Doctype` yet
    case Doctype:
    case Directive:
      return renderDirective(node2);
    case Comment$1:
      return renderComment(node2);
    case CDATA$1:
      return renderCdata(node2);
    case Script:
    case Style:
    case Tag:
      return renderTag(node2, options);
    case Text$1:
      return renderText(node2, options);
  }
}
var foreignModeIntegrationPoints = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]);
var foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
function renderTag(elem, opts) {
  var _a2;
  if (opts.xmlMode === "foreign") {
    elem.name = (_a2 = elementNames.get(elem.name)) !== null && _a2 !== void 0 ? _a2 : elem.name;
    if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
      opts = __spreadProps(__spreadValues({}, opts), { xmlMode: false });
    }
  }
  if (!opts.xmlMode && foreignElements.has(elem.name)) {
    opts = __spreadProps(__spreadValues({}, opts), { xmlMode: "foreign" });
  }
  let tag = `<${elem.name}`;
  const attribs = formatAttributes(elem.attribs, opts);
  if (attribs) {
    tag += ` ${attribs}`;
  }
  if (elem.children.length === 0 && (opts.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    opts.selfClosingTags !== false
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    opts.selfClosingTags && singleTag.has(elem.name)
  ))) {
    if (!opts.xmlMode)
      tag += " ";
    tag += "/>";
  } else {
    tag += ">";
    if (elem.children.length > 0) {
      tag += render(elem.children, opts);
    }
    if (opts.xmlMode || !singleTag.has(elem.name)) {
      tag += `</${elem.name}>`;
    }
  }
  return tag;
}
function renderDirective(elem) {
  return `<${elem.data}>`;
}
function renderText(elem, opts) {
  var _a2;
  let data = elem.data || "";
  if (((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
    data = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data) : escapeText(data);
  }
  return data;
}
function renderCdata(elem) {
  return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
  return `<!--${elem.data}-->`;
}
function getOuterHTML(node2, options) {
  return render(node2, options);
}
function getInnerHTML(node2, options) {
  return hasChildren(node2) ? node2.children.map((node3) => getOuterHTML(node3, options)).join("") : "";
}
function getText(node2) {
  if (Array.isArray(node2))
    return node2.map(getText).join("");
  if (isTag(node2))
    return node2.name === "br" ? "\n" : getText(node2.children);
  if (isCDATA(node2))
    return getText(node2.children);
  if (isText(node2))
    return node2.data;
  return "";
}
function textContent(node2) {
  if (Array.isArray(node2))
    return node2.map(textContent).join("");
  if (hasChildren(node2) && !isComment(node2)) {
    return textContent(node2.children);
  }
  if (isText(node2))
    return node2.data;
  return "";
}
function innerText(node2) {
  if (Array.isArray(node2))
    return node2.map(innerText).join("");
  if (hasChildren(node2) && (node2.type === ElementType.Tag || isCDATA(node2))) {
    return innerText(node2.children);
  }
  if (isText(node2))
    return node2.data;
  return "";
}
function getChildren(elem) {
  return hasChildren(elem) ? elem.children : [];
}
function getParent(elem) {
  return elem.parent || null;
}
function getSiblings(elem) {
  const parent = getParent(elem);
  if (parent != null)
    return getChildren(parent);
  const siblings = [elem];
  let { prev, next } = elem;
  while (prev != null) {
    siblings.unshift(prev);
    ({ prev } = prev);
  }
  while (next != null) {
    siblings.push(next);
    ({ next } = next);
  }
  return siblings;
}
function getAttributeValue(elem, name) {
  var _a2;
  return (_a2 = elem.attribs) === null || _a2 === void 0 ? void 0 : _a2[name];
}
function hasAttrib(elem, name) {
  return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
}
function getName(elem) {
  return elem.name;
}
function nextElementSibling(elem) {
  let { next } = elem;
  while (next !== null && !isTag(next))
    ({ next } = next);
  return next;
}
function prevElementSibling(elem) {
  let { prev } = elem;
  while (prev !== null && !isTag(prev))
    ({ prev } = prev);
  return prev;
}
function removeElement(elem) {
  if (elem.prev)
    elem.prev.next = elem.next;
  if (elem.next)
    elem.next.prev = elem.prev;
  if (elem.parent) {
    const childs = elem.parent.children;
    const childsIndex = childs.lastIndexOf(elem);
    if (childsIndex >= 0) {
      childs.splice(childsIndex, 1);
    }
  }
  elem.next = null;
  elem.prev = null;
  elem.parent = null;
}
function replaceElement(elem, replacement) {
  const prev = replacement.prev = elem.prev;
  if (prev) {
    prev.next = replacement;
  }
  const next = replacement.next = elem.next;
  if (next) {
    next.prev = replacement;
  }
  const parent = replacement.parent = elem.parent;
  if (parent) {
    const childs = parent.children;
    childs[childs.lastIndexOf(elem)] = replacement;
    elem.parent = null;
  }
}
function appendChild(parent, child) {
  removeElement(child);
  child.next = null;
  child.parent = parent;
  if (parent.children.push(child) > 1) {
    const sibling = parent.children[parent.children.length - 2];
    sibling.next = child;
    child.prev = sibling;
  } else {
    child.prev = null;
  }
}
function append(elem, next) {
  removeElement(next);
  const { parent } = elem;
  const currNext = elem.next;
  next.next = currNext;
  next.prev = elem;
  elem.next = next;
  next.parent = parent;
  if (currNext) {
    currNext.prev = next;
    if (parent) {
      const childs = parent.children;
      childs.splice(childs.lastIndexOf(currNext), 0, next);
    }
  } else if (parent) {
    parent.children.push(next);
  }
}
function prependChild(parent, child) {
  removeElement(child);
  child.parent = parent;
  child.prev = null;
  if (parent.children.unshift(child) !== 1) {
    const sibling = parent.children[1];
    sibling.prev = child;
    child.next = sibling;
  } else {
    child.next = null;
  }
}
function prepend(elem, prev) {
  removeElement(prev);
  const { parent } = elem;
  if (parent) {
    const childs = parent.children;
    childs.splice(childs.indexOf(elem), 0, prev);
  }
  if (elem.prev) {
    elem.prev.next = prev;
  }
  prev.parent = parent;
  prev.prev = elem.prev;
  prev.next = elem;
  elem.prev = prev;
}
function filter(test, node2, recurse = true, limit = Infinity) {
  return find(test, Array.isArray(node2) ? node2 : [node2], recurse, limit);
}
function find(test, nodes, recurse, limit) {
  const result2 = [];
  const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (indexStack.length === 1) {
        return result2;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (test(elem)) {
      result2.push(elem);
      if (--limit <= 0)
        return result2;
    }
    if (recurse && hasChildren(elem) && elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
function findOneChild(test, nodes) {
  return nodes.find(test);
}
function findOne$1(test, nodes, recurse = true) {
  const searchedNodes = Array.isArray(nodes) ? nodes : [nodes];
  for (let i = 0; i < searchedNodes.length; i++) {
    const node2 = searchedNodes[i];
    if (isTag(node2) && test(node2)) {
      return node2;
    }
    if (recurse && hasChildren(node2) && node2.children.length > 0) {
      const found = findOne$1(test, node2.children, true);
      if (found)
        return found;
    }
  }
  return null;
}
function existsOne(test, nodes) {
  return (Array.isArray(nodes) ? nodes : [nodes]).some((node2) => isTag(node2) && test(node2) || hasChildren(node2) && existsOne(test, node2.children));
}
function findAll$1(test, nodes) {
  const result2 = [];
  const nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (nodeStack.length === 1) {
        return result2;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (isTag(elem) && test(elem))
      result2.push(elem);
    if (hasChildren(elem) && elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
var Checks = {
  tag_name(name) {
    if (typeof name === "function") {
      return (elem) => isTag(elem) && name(elem.name);
    } else if (name === "*") {
      return isTag;
    }
    return (elem) => isTag(elem) && elem.name === name;
  },
  tag_type(type) {
    if (typeof type === "function") {
      return (elem) => type(elem.type);
    }
    return (elem) => elem.type === type;
  },
  tag_contains(data) {
    if (typeof data === "function") {
      return (elem) => isText(elem) && data(elem.data);
    }
    return (elem) => isText(elem) && elem.data === data;
  }
};
function getAttribCheck(attrib, value) {
  if (typeof value === "function") {
    return (elem) => isTag(elem) && value(elem.attribs[attrib]);
  }
  return (elem) => isTag(elem) && elem.attribs[attrib] === value;
}
function combineFuncs(a, b) {
  return (elem) => a(elem) || b(elem);
}
function compileTest(options) {
  const funcs = Object.keys(options).map((key) => {
    const value = options[key];
    return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
  });
  return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
function testElement(options, node2) {
  const test = compileTest(options);
  return test ? test(node2) : true;
}
function getElements(options, nodes, recurse, limit = Infinity) {
  const test = compileTest(options);
  return test ? filter(test, nodes, recurse, limit) : [];
}
function getElementById(id, nodes, recurse = true) {
  if (!Array.isArray(nodes))
    nodes = [nodes];
  return findOne$1(getAttribCheck("id", id), nodes, recurse);
}
function getElementsByTagName(tagName, nodes, recurse = true, limit = Infinity) {
  return filter(Checks["tag_name"](tagName), nodes, recurse, limit);
}
function getElementsByClassName(className, nodes, recurse = true, limit = Infinity) {
  return filter(getAttribCheck("class", className), nodes, recurse, limit);
}
function getElementsByTagType(type, nodes, recurse = true, limit = Infinity) {
  return filter(Checks["tag_type"](type), nodes, recurse, limit);
}
function removeSubsets(nodes) {
  let idx = nodes.length;
  while (--idx >= 0) {
    const node2 = nodes[idx];
    if (idx > 0 && nodes.lastIndexOf(node2, idx - 1) >= 0) {
      nodes.splice(idx, 1);
      continue;
    }
    for (let ancestor = node2.parent; ancestor; ancestor = ancestor.parent) {
      if (nodes.includes(ancestor)) {
        nodes.splice(idx, 1);
        break;
      }
    }
  }
  return nodes;
}
var DocumentPosition;
(function(DocumentPosition2) {
  DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
function compareDocumentPosition(nodeA, nodeB) {
  const aParents = [];
  const bParents = [];
  if (nodeA === nodeB) {
    return 0;
  }
  let current = hasChildren(nodeA) ? nodeA : nodeA.parent;
  while (current) {
    aParents.unshift(current);
    current = current.parent;
  }
  current = hasChildren(nodeB) ? nodeB : nodeB.parent;
  while (current) {
    bParents.unshift(current);
    current = current.parent;
  }
  const maxIdx = Math.min(aParents.length, bParents.length);
  let idx = 0;
  while (idx < maxIdx && aParents[idx] === bParents[idx]) {
    idx++;
  }
  if (idx === 0) {
    return DocumentPosition.DISCONNECTED;
  }
  const sharedParent = aParents[idx - 1];
  const siblings = sharedParent.children;
  const aSibling = aParents[idx];
  const bSibling = bParents[idx];
  if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
    if (sharedParent === nodeB) {
      return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
    }
    return DocumentPosition.FOLLOWING;
  }
  if (sharedParent === nodeA) {
    return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
  }
  return DocumentPosition.PRECEDING;
}
function uniqueSort(nodes) {
  nodes = nodes.filter((node2, i, arr) => !arr.includes(node2, i + 1));
  nodes.sort((a, b) => {
    const relative2 = compareDocumentPosition(a, b);
    if (relative2 & DocumentPosition.PRECEDING) {
      return -1;
    } else if (relative2 & DocumentPosition.FOLLOWING) {
      return 1;
    }
    return 0;
  });
  return nodes;
}
function getFeed(doc) {
  const feedRoot = getOneElement(isValidFeed, doc);
  return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
}
function getAtomFeed(feedRoot) {
  var _a2;
  const childs = feedRoot.children;
  const feed = {
    type: "atom",
    items: getElementsByTagName("entry", childs).map((item) => {
      var _a3;
      const { children } = item;
      const entry = { media: getMediaElements(children) };
      addConditionally(entry, "id", "id", children);
      addConditionally(entry, "title", "title", children);
      const href2 = (_a3 = getOneElement("link", children)) === null || _a3 === void 0 ? void 0 : _a3.attribs["href"];
      if (href2) {
        entry.link = href2;
      }
      const description = fetch("summary", children) || fetch("content", children);
      if (description) {
        entry.description = description;
      }
      const pubDate = fetch("updated", children);
      if (pubDate) {
        entry.pubDate = new Date(pubDate);
      }
      return entry;
    })
  };
  addConditionally(feed, "id", "id", childs);
  addConditionally(feed, "title", "title", childs);
  const href = (_a2 = getOneElement("link", childs)) === null || _a2 === void 0 ? void 0 : _a2.attribs["href"];
  if (href) {
    feed.link = href;
  }
  addConditionally(feed, "description", "subtitle", childs);
  const updated = fetch("updated", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "email", childs, true);
  return feed;
}
function getRssFeed(feedRoot) {
  var _a2, _b;
  const childs = (_b = (_a2 = getOneElement("channel", feedRoot.children)) === null || _a2 === void 0 ? void 0 : _a2.children) !== null && _b !== void 0 ? _b : [];
  const feed = {
    type: feedRoot.name.substr(0, 3),
    id: "",
    items: getElementsByTagName("item", feedRoot.children).map((item) => {
      const { children } = item;
      const entry = { media: getMediaElements(children) };
      addConditionally(entry, "id", "guid", children);
      addConditionally(entry, "title", "title", children);
      addConditionally(entry, "link", "link", children);
      addConditionally(entry, "description", "description", children);
      const pubDate = fetch("pubDate", children) || fetch("dc:date", children);
      if (pubDate)
        entry.pubDate = new Date(pubDate);
      return entry;
    })
  };
  addConditionally(feed, "title", "title", childs);
  addConditionally(feed, "link", "link", childs);
  addConditionally(feed, "description", "description", childs);
  const updated = fetch("lastBuildDate", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "managingEditor", childs, true);
  return feed;
}
var MEDIA_KEYS_STRING = ["url", "type", "lang"];
var MEDIA_KEYS_INT = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function getMediaElements(where) {
  return getElementsByTagName("media:content", where).map((elem) => {
    const { attribs } = elem;
    const media = {
      medium: attribs["medium"],
      isDefault: !!attribs["isDefault"]
    };
    for (const attrib of MEDIA_KEYS_STRING) {
      if (attribs[attrib]) {
        media[attrib] = attribs[attrib];
      }
    }
    for (const attrib of MEDIA_KEYS_INT) {
      if (attribs[attrib]) {
        media[attrib] = parseInt(attribs[attrib], 10);
      }
    }
    if (attribs["expression"]) {
      media.expression = attribs["expression"];
    }
    return media;
  });
}
function getOneElement(tagName, node2) {
  return getElementsByTagName(tagName, node2, true, 1)[0];
}
function fetch(tagName, where, recurse = false) {
  return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
}
function addConditionally(obj, prop, tagName, where, recurse = false) {
  const val = fetch(tagName, where, recurse);
  if (val)
    obj[prop] = val;
}
function isValidFeed(value) {
  return value === "rss" || value === "feed" || value === "rdf:RDF";
}
var DomUtils = Object.freeze({
  __proto__: null,
  get DocumentPosition() {
    return DocumentPosition;
  },
  append,
  appendChild,
  compareDocumentPosition,
  existsOne,
  filter,
  find,
  findAll: findAll$1,
  findOne: findOne$1,
  findOneChild,
  getAttributeValue,
  getChildren,
  getElementById,
  getElements,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagType,
  getFeed,
  getInnerHTML,
  getName,
  getOuterHTML,
  getParent,
  getSiblings,
  getText,
  hasAttrib,
  hasChildren,
  innerText,
  isCDATA,
  isComment,
  isDocument,
  isTag,
  isText,
  nextElementSibling,
  prepend,
  prependChild,
  prevElementSibling,
  removeElement,
  removeSubsets,
  replaceElement,
  testElement,
  textContent,
  uniqueSort
});
var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
function escapeRegex(value) {
  return value.replace(reChars, "\\$&");
}
var caseInsensitiveAttributes = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function shouldIgnoreCase(selector, options) {
  return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options.quirksMode : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
}
var attributeRules = {
  equals(next, data, options) {
    const { adapter } = options;
    const { name } = data;
    let { value } = data;
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && attr.length === value.length && attr.toLowerCase() === value && next(elem);
      };
    }
    return (elem) => adapter.getAttributeValue(elem, name) === value && next(elem);
  },
  hyphen(next, data, options) {
    const { adapter } = options;
    const { name } = data;
    let { value } = data;
    const len = value.length;
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return function hyphenIC(elem) {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len).toLowerCase() === value && next(elem);
      };
    }
    return function hyphen(elem) {
      const attr = adapter.getAttributeValue(elem, name);
      return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len) === value && next(elem);
    };
  },
  element(next, data, options) {
    const { adapter } = options;
    const { name, value } = data;
    if (/\s/.test(value)) {
      return boolbaseExports.falseFunc;
    }
    const regex = new RegExp(`(?:^|\\s)${escapeRegex(value)}(?:$|\\s)`, shouldIgnoreCase(data, options) ? "i" : "");
    return function element(elem) {
      const attr = adapter.getAttributeValue(elem, name);
      return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
    };
  },
  exists(next, { name }, { adapter }) {
    return (elem) => adapter.hasAttrib(elem, name) && next(elem);
  },
  start(next, data, options) {
    const { adapter } = options;
    const { name } = data;
    let { value } = data;
    const len = value.length;
    if (len === 0) {
      return boolbaseExports.falseFunc;
    }
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && attr.length >= len && attr.substr(0, len).toLowerCase() === value && next(elem);
      };
    }
    return (elem) => !!adapter.getAttributeValue(elem, name)?.startsWith(value) && next(elem);
  },
  end(next, data, options) {
    const { adapter } = options;
    const { name } = data;
    let { value } = data;
    const len = -value.length;
    if (len === 0) {
      return boolbaseExports.falseFunc;
    }
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => adapter.getAttributeValue(elem, name)?.substr(len).toLowerCase() === value && next(elem);
    }
    return (elem) => !!adapter.getAttributeValue(elem, name)?.endsWith(value) && next(elem);
  },
  any(next, data, options) {
    const { adapter } = options;
    const { name, value } = data;
    if (value === "") {
      return boolbaseExports.falseFunc;
    }
    if (shouldIgnoreCase(data, options)) {
      const regex = new RegExp(escapeRegex(value), "i");
      return function anyIC(elem) {
        const attr = adapter.getAttributeValue(elem, name);
        return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
      };
    }
    return (elem) => !!adapter.getAttributeValue(elem, name)?.includes(value) && next(elem);
  },
  not(next, data, options) {
    const { adapter } = options;
    const { name } = data;
    let { value } = data;
    if (value === "") {
      return (elem) => !!adapter.getAttributeValue(elem, name) && next(elem);
    }
    if (shouldIgnoreCase(data, options)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr = adapter.getAttributeValue(elem, name);
        return (attr == null || attr.length !== value.length || attr.toLowerCase() !== value) && next(elem);
      };
    }
    return (elem) => adapter.getAttributeValue(elem, name) !== value && next(elem);
  }
};
function findAll(query, elems, options) {
  const { adapter, xmlMode = false } = options;
  const result2 = [];
  const nodeStack = [elems];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (nodeStack.length === 1) {
        return result2;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (!adapter.isTag(elem)) {
      continue;
    }
    if (query(elem)) {
      result2.push(elem);
    }
    if (xmlMode || adapter.getName(elem) !== "template") {
      const children = adapter.getChildren(elem);
      if (children.length > 0) {
        nodeStack.unshift(children);
        indexStack.unshift(0);
      }
    }
  }
}
function findOne(query, elems, options) {
  const { adapter, xmlMode = false } = options;
  const nodeStack = [elems];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (nodeStack.length === 1) {
        return null;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (!adapter.isTag(elem)) {
      continue;
    }
    if (query(elem)) {
      return elem;
    }
    if (xmlMode || adapter.getName(elem) !== "template") {
      const children = adapter.getChildren(elem);
      if (children.length > 0) {
        nodeStack.unshift(children);
        indexStack.unshift(0);
      }
    }
  }
}
function getNextSiblings(elem, adapter) {
  const siblings = adapter.getSiblings(elem);
  if (siblings.length <= 1) {
    return [];
  }
  const elemIndex = siblings.indexOf(elem);
  if (elemIndex < 0 || elemIndex === siblings.length - 1) {
    return [];
  }
  return siblings.slice(elemIndex + 1).filter(adapter.isTag);
}
function getElementParent(node2, adapter) {
  const parent = adapter.getParent(node2);
  return parent != null && adapter.isTag(parent) ? parent : null;
}
var textControl = "input:is([type=text i],[type=search i],[type=url i],[type=tel i],[type=email i],[type=password i],[type=date i],[type=month i],[type=week i],[type=time i],[type=datetime-local i],[type=number i])";
var aliases = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], :selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  "read-only": `[readonly]:is(textarea, ${textControl})`,
  "read-write": `:not([readonly]):is(textarea, ${textControl})`,
  // JQuery extensions
  /**
   * `:selected` matches option elements that have the `selected` attribute,
   * or are the first option element in a select element that does not have
   * the `multiple` attribute and does not have any option elements with the
   * `selected` attribute.
   *
   * @see https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
   */
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
};
var whitespace = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
var ZERO = "0".charCodeAt(0);
var NINE = "9".charCodeAt(0);
function parse(formula) {
  formula = formula.trim().toLowerCase();
  if (formula === "even") {
    return [2, 0];
  } else if (formula === "odd") {
    return [2, 1];
  }
  let idx = 0;
  let a = 0;
  let sign = readSign();
  let number = readNumber();
  if (idx < formula.length && formula.charAt(idx) === "n") {
    idx++;
    a = sign * (number !== null && number !== void 0 ? number : 1);
    skipWhitespace();
    if (idx < formula.length) {
      sign = readSign();
      skipWhitespace();
      number = readNumber();
    } else {
      sign = number = 0;
    }
  }
  if (number === null || idx < formula.length) {
    throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
  }
  return [a, sign * number];
  function readSign() {
    if (formula.charAt(idx) === "-") {
      idx++;
      return -1;
    }
    if (formula.charAt(idx) === "+") {
      idx++;
    }
    return 1;
  }
  function readNumber() {
    const start = idx;
    let value = 0;
    while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
      value = value * 10 + (formula.charCodeAt(idx) - ZERO);
      idx++;
    }
    return idx === start ? null : value;
  }
  function skipWhitespace() {
    while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
      idx++;
    }
  }
}
function compile(parsed) {
  const a = parsed[0];
  const b = parsed[1] - 1;
  if (b < 0 && a <= 0)
    return boolbase.falseFunc;
  if (a === -1)
    return (index2) => index2 <= b;
  if (a === 0)
    return (index2) => index2 === b;
  if (a === 1)
    return b < 0 ? boolbase.trueFunc : (index2) => index2 >= b;
  const absA = Math.abs(a);
  const bMod = (b % absA + absA) % absA;
  return a > 1 ? (index2) => index2 >= b && index2 % absA === bMod : (index2) => index2 <= b && index2 % absA === bMod;
}
function nthCheck(formula) {
  return compile(parse(formula));
}
function cacheParentResults(next, { adapter, cacheResults }, matches) {
  if (cacheResults === false || typeof WeakMap === "undefined") {
    return (elem) => next(elem) && matches(elem);
  }
  const resultCache = /* @__PURE__ */ new WeakMap();
  function addResultToCache(elem) {
    const result2 = matches(elem);
    resultCache.set(elem, result2);
    return result2;
  }
  return function cachedMatcher(elem) {
    if (!next(elem)) {
      return false;
    }
    if (resultCache.has(elem)) {
      return resultCache.get(elem);
    }
    let node2 = elem;
    do {
      const parent = getElementParent(node2, adapter);
      if (parent === null) {
        return addResultToCache(elem);
      }
      node2 = parent;
    } while (!resultCache.has(node2));
    return resultCache.get(node2) && addResultToCache(elem);
  };
}
var filters = {
  contains(next, text, options) {
    const { getText: getText2 } = options.adapter;
    return cacheParentResults(next, options, (elem) => getText2(elem).includes(text));
  },
  icontains(next, text, options) {
    const itext = text.toLowerCase();
    const { getText: getText2 } = options.adapter;
    return cacheParentResults(next, options, (elem) => getText2(elem).toLowerCase().includes(itext));
  },
  // Location specific methods
  "nth-child"(next, rule2, { adapter, equals }) {
    const func = nthCheck(rule2);
    if (func === boolbaseExports.falseFunc) {
      return boolbaseExports.falseFunc;
    }
    if (func === boolbaseExports.trueFunc) {
      return (elem) => getElementParent(elem, adapter) !== null && next(elem);
    }
    return function nthChild(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = 0; i < siblings.length; i++) {
        if (equals(elem, siblings[i])) {
          break;
        }
        if (adapter.isTag(siblings[i])) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-child"(next, rule2, { adapter, equals }) {
    const func = nthCheck(rule2);
    if (func === boolbaseExports.falseFunc) {
      return boolbaseExports.falseFunc;
    }
    if (func === boolbaseExports.trueFunc) {
      return (elem) => getElementParent(elem, adapter) !== null && next(elem);
    }
    return function nthLastChild(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = siblings.length - 1; i >= 0; i--) {
        if (equals(elem, siblings[i])) {
          break;
        }
        if (adapter.isTag(siblings[i])) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-of-type"(next, rule2, { adapter, equals }) {
    const func = nthCheck(rule2);
    if (func === boolbaseExports.falseFunc) {
      return boolbaseExports.falseFunc;
    }
    if (func === boolbaseExports.trueFunc) {
      return (elem) => getElementParent(elem, adapter) !== null && next(elem);
    }
    return function nthOfType(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = 0; i < siblings.length; i++) {
        const currentSibling = siblings[i];
        if (equals(elem, currentSibling)) {
          break;
        }
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-of-type"(next, rule2, { adapter, equals }) {
    const func = nthCheck(rule2);
    if (func === boolbaseExports.falseFunc) {
      return boolbaseExports.falseFunc;
    }
    if (func === boolbaseExports.trueFunc) {
      return (elem) => getElementParent(elem, adapter) !== null && next(elem);
    }
    return function nthLastOfType(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = siblings.length - 1; i >= 0; i--) {
        const currentSibling = siblings[i];
        if (equals(elem, currentSibling)) {
          break;
        }
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  // TODO determine the actual root element
  root(next, _rule, { adapter }) {
    return (elem) => getElementParent(elem, adapter) === null && next(elem);
  },
  scope(next, rule2, options, context) {
    const { equals } = options;
    if (!context || context.length === 0) {
      return filters["root"](next, rule2, options);
    }
    if (context.length === 1) {
      return (elem) => equals(context[0], elem) && next(elem);
    }
    return (elem) => context.includes(elem) && next(elem);
  },
  hover: dynamicStatePseudo("isHovered"),
  visited: dynamicStatePseudo("isVisited"),
  active: dynamicStatePseudo("isActive")
};
function dynamicStatePseudo(name) {
  return function dynamicPseudo(next, _rule, { adapter }) {
    const func = adapter[name];
    if (typeof func !== "function") {
      return boolbaseExports.falseFunc;
    }
    return function active(elem) {
      return func(elem) && next(elem);
    };
  };
}
var isDocumentWhiteSpace = /^[ \t\r\n]*$/;
var pseudos = {
  empty(elem, { adapter }) {
    const children = adapter.getChildren(elem);
    return (
      // First, make sure the tag does not have any element children.
      children.every((elem2) => !adapter.isTag(elem2)) && // Then, check that the text content is only whitespace.
      children.every((elem2) => (
        // FIXME: `getText` call is potentially expensive.
        isDocumentWhiteSpace.test(adapter.getText(elem2))
      ))
    );
  },
  "first-child"(elem, { adapter, equals }) {
    if (adapter.prevElementSibling) {
      return adapter.prevElementSibling(elem) == null;
    }
    const firstChild = adapter.getSiblings(elem).find((elem2) => adapter.isTag(elem2));
    return firstChild != null && equals(elem, firstChild);
  },
  "last-child"(elem, { adapter, equals }) {
    const siblings = adapter.getSiblings(elem);
    for (let i = siblings.length - 1; i >= 0; i--) {
      if (equals(elem, siblings[i])) {
        return true;
      }
      if (adapter.isTag(siblings[i])) {
        break;
      }
    }
    return false;
  },
  "first-of-type"(elem, { adapter, equals }) {
    const siblings = adapter.getSiblings(elem);
    const elemName = adapter.getName(elem);
    for (let i = 0; i < siblings.length; i++) {
      const currentSibling = siblings[i];
      if (equals(elem, currentSibling)) {
        return true;
      }
      if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "last-of-type"(elem, { adapter, equals }) {
    const siblings = adapter.getSiblings(elem);
    const elemName = adapter.getName(elem);
    for (let i = siblings.length - 1; i >= 0; i--) {
      const currentSibling = siblings[i];
      if (equals(elem, currentSibling)) {
        return true;
      }
      if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "only-of-type"(elem, { adapter, equals }) {
    const elemName = adapter.getName(elem);
    return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elemName);
  },
  "only-child"(elem, { adapter, equals }) {
    return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling));
  }
};
function verifyPseudoArgs(func, name, subselect, argIndex) {
  if (subselect === null) {
    if (func.length > argIndex) {
      throw new Error(`Pseudo-class :${name} requires an argument`);
    }
  } else if (func.length === argIndex) {
    throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
  }
}
function isTraversal(token) {
  return token.type === "_flexibleDescendant" || isTraversal$1(token);
}
function sortRules(arr) {
  const ratings = arr.map(getQuality);
  for (let i = 1; i < arr.length; i++) {
    const procNew = ratings[i];
    if (procNew < 0) {
      continue;
    }
    for (let j = i; j > 0 && procNew < ratings[j - 1]; j--) {
      const token = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = token;
      ratings[j] = ratings[j - 1];
      ratings[j - 1] = procNew;
    }
  }
}
function getAttributeQuality(token) {
  switch (token.action) {
    case AttributeAction.Exists: {
      return 10;
    }
    case AttributeAction.Equals: {
      return token.name === "id" ? 9 : 8;
    }
    case AttributeAction.Not: {
      return 7;
    }
    case AttributeAction.Start: {
      return 6;
    }
    case AttributeAction.End: {
      return 6;
    }
    case AttributeAction.Any: {
      return 5;
    }
    case AttributeAction.Hyphen: {
      return 4;
    }
    case AttributeAction.Element: {
      return 3;
    }
  }
}
function getQuality(token) {
  switch (token.type) {
    case SelectorType.Universal: {
      return 50;
    }
    case SelectorType.Tag: {
      return 30;
    }
    case SelectorType.Attribute: {
      return Math.floor(getAttributeQuality(token) / // `ignoreCase` adds some overhead, half the result if applicable.
      (token.ignoreCase ? 2 : 1));
    }
    case SelectorType.Pseudo: {
      return !token.data ? 3 : token.name === "has" || token.name === "contains" || token.name === "icontains" ? (
        // Expensive in any case — run as late as possible.
        0
      ) : Array.isArray(token.data) ? (
        // Eg. `:is`, `:not`
        Math.max(
          // If we have traversals, try to avoid executing this selector
          0,
          Math.min(...token.data.map((d) => Math.min(...d.map(getQuality))))
        )
      ) : 2;
    }
    default: {
      return -1;
    }
  }
}
function includesScopePseudo(t) {
  return t.type === SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((data) => data.some(includesScopePseudo)));
}
var PLACEHOLDER_ELEMENT = {};
function hasDependsOnCurrentElement(selector) {
  return selector.some((sel) => sel.length > 0 && (isTraversal(sel[0]) || sel.some(includesScopePseudo)));
}
function copyOptions(options) {
  return {
    xmlMode: !!options.xmlMode,
    lowerCaseAttributeNames: !!options.lowerCaseAttributeNames,
    lowerCaseTags: !!options.lowerCaseTags,
    quirksMode: !!options.quirksMode,
    cacheResults: !!options.cacheResults,
    pseudos: options.pseudos,
    adapter: options.adapter,
    equals: options.equals
  };
}
var is = (next, token, options, context, compileToken2) => {
  const func = compileToken2(token, copyOptions(options), context);
  return func === boolbaseExports.trueFunc ? next : func === boolbaseExports.falseFunc ? boolbaseExports.falseFunc : (elem) => func(elem) && next(elem);
};
var subselects = {
  is,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: is,
  where: is,
  not(next, token, options, context, compileToken2) {
    const func = compileToken2(token, copyOptions(options), context);
    return func === boolbaseExports.falseFunc ? next : func === boolbaseExports.trueFunc ? boolbaseExports.falseFunc : (elem) => !func(elem) && next(elem);
  },
  has(next, subselect, options, _context, compileToken2) {
    const { adapter } = options;
    const opts = copyOptions(options);
    opts.relativeSelector = true;
    const context = subselect.some((s) => s.some(isTraversal)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [PLACEHOLDER_ELEMENT]
    ) : void 0;
    const skipCache = hasDependsOnCurrentElement(subselect);
    const compiled = compileToken2(subselect, opts, context);
    if (compiled === boolbaseExports.falseFunc) {
      return boolbaseExports.falseFunc;
    }
    if (context && compiled !== boolbaseExports.trueFunc) {
      return skipCache ? (elem) => {
        if (!next(elem)) {
          return false;
        }
        context[0] = elem;
        const childs = adapter.getChildren(elem);
        return findOne(compiled, compiled.shouldTestNextSiblings ? [
          ...childs,
          ...getNextSiblings(elem, adapter)
        ] : childs, options) !== null;
      } : cacheParentResults(next, options, (elem) => {
        context[0] = elem;
        return findOne(compiled, adapter.getChildren(elem), options) !== null;
      });
    }
    const hasOne = (elem) => findOne(compiled, adapter.getChildren(elem), options) !== null;
    return skipCache ? (elem) => next(elem) && hasOne(elem) : cacheParentResults(next, options, hasOne);
  }
};
function compilePseudoSelector(next, selector, options, context, compileToken2) {
  const { name, data } = selector;
  if (Array.isArray(data)) {
    if (!(name in subselects)) {
      throw new Error(`Unknown pseudo-class :${name}(${data})`);
    }
    return subselects[name](next, data, options, context, compileToken2);
  }
  const userPseudo = options.pseudos?.[name];
  const stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases[name];
  if (typeof stringPseudo === "string") {
    if (data != null) {
      throw new Error(`Pseudo ${name} doesn't have any arguments`);
    }
    const alias = parse$1(stringPseudo);
    return subselects["is"](next, alias, options, context, compileToken2);
  }
  if (typeof userPseudo === "function") {
    verifyPseudoArgs(userPseudo, name, data, 1);
    return (elem) => userPseudo(elem, data) && next(elem);
  }
  if (name in filters) {
    return filters[name](next, data, options, context);
  }
  if (name in pseudos) {
    const pseudo = pseudos[name];
    verifyPseudoArgs(pseudo, name, data, 2);
    return (elem) => pseudo(elem, options, data) && next(elem);
  }
  throw new Error(`Unknown pseudo-class :${name}`);
}
function compileGeneralSelector(next, selector, options, context, compileToken2, hasExpensiveSubselector) {
  const { adapter, equals, cacheResults } = options;
  switch (selector.type) {
    case SelectorType.PseudoElement: {
      throw new Error("Pseudo-elements are not supported by css-select");
    }
    case SelectorType.ColumnCombinator: {
      throw new Error("Column combinators are not yet supported by css-select");
    }
    case SelectorType.Attribute: {
      if (selector.namespace != null) {
        throw new Error("Namespaced attributes are not yet supported by css-select");
      }
      if (!options.xmlMode || options.lowerCaseAttributeNames) {
        selector.name = selector.name.toLowerCase();
      }
      return attributeRules[selector.action](next, selector, options);
    }
    case SelectorType.Pseudo: {
      return compilePseudoSelector(next, selector, options, context, compileToken2);
    }
    // Tags
    case SelectorType.Tag: {
      if (selector.namespace != null) {
        throw new Error("Namespaced tag names are not yet supported by css-select");
      }
      let { name } = selector;
      if (!options.xmlMode || options.lowerCaseTags) {
        name = name.toLowerCase();
      }
      return function tag(elem) {
        return adapter.getName(elem) === name && next(elem);
      };
    }
    // Traversal
    case SelectorType.Descendant: {
      if (!hasExpensiveSubselector || cacheResults === false || typeof WeakMap === "undefined") {
        return function descendant(elem) {
          let current = elem;
          while (current = getElementParent(current, adapter)) {
            if (next(current)) {
              return true;
            }
          }
          return false;
        };
      }
      const resultCache = /* @__PURE__ */ new WeakMap();
      return function cachedDescendant(elem) {
        let current = elem;
        let result2;
        while (current = getElementParent(current, adapter)) {
          const cached = resultCache.get(current);
          if (cached === void 0) {
            result2 ?? (result2 = { matches: false });
            result2.matches = next(current);
            resultCache.set(current, result2);
            if (result2.matches) {
              return true;
            }
          } else {
            if (result2) {
              result2.matches = cached.matches;
            }
            return cached.matches;
          }
        }
        return false;
      };
    }
    case "_flexibleDescendant": {
      return function flexibleDescendant(elem) {
        let current = elem;
        do {
          if (next(current)) {
            return true;
          }
          current = getElementParent(current, adapter);
        } while (current);
        return false;
      };
    }
    case SelectorType.Parent: {
      return function parent(elem) {
        return adapter.getChildren(elem).some((elem2) => adapter.isTag(elem2) && next(elem2));
      };
    }
    case SelectorType.Child: {
      return function child(elem) {
        const parent = getElementParent(elem, adapter);
        return parent !== null && next(parent);
      };
    }
    case SelectorType.Sibling: {
      return function sibling(elem) {
        const siblings = adapter.getSiblings(elem);
        for (let i = 0; i < siblings.length; i++) {
          const currentSibling = siblings[i];
          if (equals(elem, currentSibling)) {
            break;
          }
          if (adapter.isTag(currentSibling) && next(currentSibling)) {
            return true;
          }
        }
        return false;
      };
    }
    case SelectorType.Adjacent: {
      if (adapter.prevElementSibling) {
        return function adjacent(elem) {
          const previous = adapter.prevElementSibling(elem);
          return previous != null && next(previous);
        };
      }
      return function adjacent(elem) {
        const siblings = adapter.getSiblings(elem);
        let lastElement;
        for (let i = 0; i < siblings.length; i++) {
          const currentSibling = siblings[i];
          if (equals(elem, currentSibling)) {
            break;
          }
          if (adapter.isTag(currentSibling)) {
            lastElement = currentSibling;
          }
        }
        return !!lastElement && next(lastElement);
      };
    }
    case SelectorType.Universal: {
      if (selector.namespace != null && selector.namespace !== "*") {
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      }
      return next;
    }
  }
}
var DESCENDANT_TOKEN = { type: SelectorType.Descendant };
var FLEXIBLE_DESCENDANT_TOKEN = {
  type: "_flexibleDescendant"
};
var SCOPE_TOKEN = {
  type: SelectorType.Pseudo,
  name: "scope",
  data: null
};
function absolutize(token, { adapter }, context) {
  const hasContext = !!context?.every((e) => e === PLACEHOLDER_ELEMENT || adapter.isTag(e) && getElementParent(e, adapter) !== null);
  for (const t of token) {
    if (t.length > 0 && isTraversal(t[0]) && t[0].type !== SelectorType.Descendant) ;
    else if (hasContext && !t.some(includesScopePseudo)) {
      t.unshift(DESCENDANT_TOKEN);
    } else {
      continue;
    }
    t.unshift(SCOPE_TOKEN);
  }
}
function compileToken(token, options, ctx) {
  token.forEach(sortRules);
  const { context = ctx, rootFunc = boolbaseExports.trueFunc } = options;
  const isArrayContext = Array.isArray(context);
  const finalContext = context && (Array.isArray(context) ? context : [context]);
  if (options.relativeSelector !== false) {
    absolutize(token, options, finalContext);
  } else if (token.some((t) => t.length > 0 && isTraversal(t[0]))) {
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  }
  let shouldTestNextSiblings = false;
  let query = boolbaseExports.falseFunc;
  combineLoop: for (const rules of token) {
    if (rules.length >= 2) {
      const [first, second] = rules;
      if (first.type !== SelectorType.Pseudo || first.name !== "scope") ;
      else if (isArrayContext && second.type === SelectorType.Descendant) {
        rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
      } else if (second.type === SelectorType.Adjacent || second.type === SelectorType.Sibling) {
        shouldTestNextSiblings = true;
      }
    }
    let next = rootFunc;
    let hasExpensiveSubselector = false;
    for (const rule2 of rules) {
      next = compileGeneralSelector(next, rule2, options, finalContext, compileToken, hasExpensiveSubselector);
      const quality = getQuality(rule2);
      if (quality === 0) {
        hasExpensiveSubselector = true;
      }
      if (next === boolbaseExports.falseFunc) {
        continue combineLoop;
      }
    }
    if (next === rootFunc) {
      return rootFunc;
    }
    query = query === boolbaseExports.falseFunc ? next : or(query, next);
  }
  query.shouldTestNextSiblings = shouldTestNextSiblings;
  return query;
}
function or(a, b) {
  return (elem) => a(elem) || b(elem);
}
var defaultEquals = (a, b) => a === b;
var defaultOptions = {
  adapter: DomUtils,
  equals: defaultEquals
};
function convertOptionFormats(options) {
  const opts = options ?? defaultOptions;
  opts.adapter ?? (opts.adapter = DomUtils);
  opts.equals ?? (opts.equals = opts.adapter?.equals ?? defaultEquals);
  return opts;
}
function _compileUnsafe(selector, options, context) {
  return _compileToken(typeof selector === "string" ? parse$1(selector) : selector, options, context);
}
function _compileToken(selector, options, context) {
  return compileToken(selector, convertOptionFormats(options), context);
}
function getSelectorFunc(searchFunc) {
  return function select2(query, elements, options) {
    const opts = convertOptionFormats(options);
    if (typeof query !== "function") {
      query = _compileUnsafe(query, opts, elements);
    }
    const filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
    return searchFunc(query, filteredElements, opts);
  };
}
function prepareContext(elems, adapter, shouldTestNextSiblings = false) {
  if (shouldTestNextSiblings) {
    elems = appendNextSiblings(elems, adapter);
  }
  return Array.isArray(elems) ? adapter.removeSubsets(elems) : adapter.getChildren(elems);
}
function appendNextSiblings(elem, adapter) {
  const elems = Array.isArray(elem) ? elem.slice(0) : [elem];
  const elemsLength = elems.length;
  for (let i = 0; i < elemsLength; i++) {
    const nextSiblings = getNextSiblings(elems[i], adapter);
    elems.push(...nextSiblings);
  }
  return elems;
}
var selectAll = getSelectorFunc((query, elems, options) => query === boolbaseExports.falseFunc || !elems || elems.length === 0 ? [] : findAll(query, elems, options));
var selectOne = getSelectorFunc((query, elems, options) => query === boolbaseExports.falseFunc || !elems || elems.length === 0 ? null : findOne(query, elems, options));
var htmlDecodeTree = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0))
);
var xmlDecodeTree = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0))
);
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a2;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
}
var CharCodes$1;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes$1 || (CharCodes$1 = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
  return code >= CharCodes$1.ZERO && code <= CharCodes$1.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_F || code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
  return code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_Z || code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_Z || isNumber(code);
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes$1.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(input2, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (input2.charCodeAt(offset) === CharCodes$1.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(input2, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(input2, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(input2, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(input2, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(input2, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(input2, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(input2, offset) {
    if (offset >= input2.length) {
      return -1;
    }
    if ((input2.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes$1.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(input2, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(input2, offset);
  }
  addToNumericResult(input2, start, end, base) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + Number.parseInt(input2.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(input2, offset) {
    const startIndex = offset;
    while (offset < input2.length) {
      const char = input2.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(input2, startIndex, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(input2, startIndex, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(input2, offset) {
    const startIndex = offset;
    while (offset < input2.length) {
      const char = input2.charCodeAt(offset);
      if (isNumber(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(input2, startIndex, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(input2, startIndex, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a2;
    if (this.consumed <= expectedLength) {
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes$1.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes$1.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(input2, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < input2.length; offset++, this.excess++) {
      const char = input2.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes$1.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a2;
    const { result: result2, decodeTree } = this;
    const valueLength = (decodeTree[result2] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result2, valueLength, this.consumed);
    (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result2, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result2] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result2 + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result2 + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a2;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function determineBranch(decodeTree, current, nodeIndex, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
  }
  let lo = nodeIndex;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midValue = decodeTree[mid];
    if (midValue < char) {
      lo = mid + 1;
    } else if (midValue > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["Tab"] = 9] = "Tab";
  CharCodes2[CharCodes2["NewLine"] = 10] = "NewLine";
  CharCodes2[CharCodes2["FormFeed"] = 12] = "FormFeed";
  CharCodes2[CharCodes2["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes2[CharCodes2["Space"] = 32] = "Space";
  CharCodes2[CharCodes2["ExclamationMark"] = 33] = "ExclamationMark";
  CharCodes2[CharCodes2["Number"] = 35] = "Number";
  CharCodes2[CharCodes2["Amp"] = 38] = "Amp";
  CharCodes2[CharCodes2["SingleQuote"] = 39] = "SingleQuote";
  CharCodes2[CharCodes2["DoubleQuote"] = 34] = "DoubleQuote";
  CharCodes2[CharCodes2["Dash"] = 45] = "Dash";
  CharCodes2[CharCodes2["Slash"] = 47] = "Slash";
  CharCodes2[CharCodes2["Zero"] = 48] = "Zero";
  CharCodes2[CharCodes2["Nine"] = 57] = "Nine";
  CharCodes2[CharCodes2["Semi"] = 59] = "Semi";
  CharCodes2[CharCodes2["Lt"] = 60] = "Lt";
  CharCodes2[CharCodes2["Eq"] = 61] = "Eq";
  CharCodes2[CharCodes2["Gt"] = 62] = "Gt";
  CharCodes2[CharCodes2["Questionmark"] = 63] = "Questionmark";
  CharCodes2[CharCodes2["UpperA"] = 65] = "UpperA";
  CharCodes2[CharCodes2["LowerA"] = 97] = "LowerA";
  CharCodes2[CharCodes2["UpperF"] = 70] = "UpperF";
  CharCodes2[CharCodes2["LowerF"] = 102] = "LowerF";
  CharCodes2[CharCodes2["UpperZ"] = 90] = "UpperZ";
  CharCodes2[CharCodes2["LowerZ"] = 122] = "LowerZ";
  CharCodes2[CharCodes2["LowerX"] = 120] = "LowerX";
  CharCodes2[CharCodes2["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
var State;
(function(State2) {
  State2[State2["Text"] = 1] = "Text";
  State2[State2["BeforeTagName"] = 2] = "BeforeTagName";
  State2[State2["InTagName"] = 3] = "InTagName";
  State2[State2["InSelfClosingTag"] = 4] = "InSelfClosingTag";
  State2[State2["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
  State2[State2["InClosingTagName"] = 6] = "InClosingTagName";
  State2[State2["AfterClosingTagName"] = 7] = "AfterClosingTagName";
  State2[State2["BeforeAttributeName"] = 8] = "BeforeAttributeName";
  State2[State2["InAttributeName"] = 9] = "InAttributeName";
  State2[State2["AfterAttributeName"] = 10] = "AfterAttributeName";
  State2[State2["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
  State2[State2["InAttributeValueDq"] = 12] = "InAttributeValueDq";
  State2[State2["InAttributeValueSq"] = 13] = "InAttributeValueSq";
  State2[State2["InAttributeValueNq"] = 14] = "InAttributeValueNq";
  State2[State2["BeforeDeclaration"] = 15] = "BeforeDeclaration";
  State2[State2["InDeclaration"] = 16] = "InDeclaration";
  State2[State2["InProcessingInstruction"] = 17] = "InProcessingInstruction";
  State2[State2["BeforeComment"] = 18] = "BeforeComment";
  State2[State2["CDATASequence"] = 19] = "CDATASequence";
  State2[State2["InSpecialComment"] = 20] = "InSpecialComment";
  State2[State2["InCommentLike"] = 21] = "InCommentLike";
  State2[State2["BeforeSpecialS"] = 22] = "BeforeSpecialS";
  State2[State2["BeforeSpecialT"] = 23] = "BeforeSpecialT";
  State2[State2["SpecialStartSequence"] = 24] = "SpecialStartSequence";
  State2[State2["InSpecialTag"] = 25] = "InSpecialTag";
  State2[State2["InEntity"] = 26] = "InEntity";
})(State || (State = {}));
function isWhitespace(c) {
  return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
}
function isEndOfTagSection(c) {
  return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isASCIIAlpha(c) {
  return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
}
var QuoteType;
(function(QuoteType2) {
  QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
  QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
  QuoteType2[QuoteType2["Single"] = 2] = "Single";
  QuoteType2[QuoteType2["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
var Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `</script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ]),
  // `</textarea`
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112])
  // `</xmp`
};
var Tokenizer = class {
  constructor({ xmlMode = false, decodeEntities = true }, cbs) {
    this.cbs = cbs;
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.entityStart = 0;
    this.baseState = State.Text;
    this.isSpecial = false;
    this.running = true;
    this.offset = 0;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
    this.xmlMode = xmlMode;
    this.decodeEntities = decodeEntities;
    this.entityDecoder = new EntityDecoder(xmlMode ? xmlDecodeTree : htmlDecodeTree, (cp2, consumed) => this.emitCodePoint(cp2, consumed));
  }
  reset() {
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.currentSequence = void 0;
    this.running = true;
    this.offset = 0;
  }
  write(chunk) {
    this.offset += this.buffer.length;
    this.buffer = chunk;
    this.parse();
  }
  end() {
    if (this.running)
      this.finish();
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
    if (this.index < this.buffer.length + this.offset) {
      this.parse();
    }
  }
  stateText(c) {
    if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = State.BeforeTagName;
      this.sectionStart = this.index;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  stateSpecialStartSequence(c) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.isSpecial = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = State.InTagName;
    this.stateInTagName(c);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c === CharCodes.Gt || isWhitespace(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.isSpecial = false;
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd) {
        if (this.decodeEntities && c === CharCodes.Amp) {
          this.startEntity();
        }
      } else if (this.fastForwardTo(CharCodes.Lt)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === CharCodes.Lt);
    }
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = State.InCommentLike;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = State.InDeclaration;
      this.stateInDeclaration(c);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c) {
    while (++this.index < this.buffer.length + this.offset) {
      if (this.buffer.charCodeAt(this.index - this.offset) === c) {
        return true;
      }
    }
    this.index = this.buffer.length + this.offset - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c) {
    if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index, 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index, 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = State.Text;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(c) {
    return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
  }
  startSpecial(sequence, offset) {
    this.isSpecial = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
    this.state = State.SpecialStartSequence;
  }
  stateBeforeTagName(c) {
    if (c === CharCodes.ExclamationMark) {
      this.state = State.BeforeDeclaration;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Questionmark) {
      this.state = State.InProcessingInstruction;
      this.sectionStart = this.index + 1;
    } else if (this.isTagStartChar(c)) {
      const lower = c | 32;
      this.sectionStart = this.index;
      if (this.xmlMode) {
        this.state = State.InTagName;
      } else if (lower === Sequences.ScriptEnd[2]) {
        this.state = State.BeforeSpecialS;
      } else if (lower === Sequences.TitleEnd[2] || lower === Sequences.XmpEnd[2]) {
        this.state = State.BeforeSpecialT;
      } else {
        this.state = State.InTagName;
      }
    } else if (c === CharCodes.Slash) {
      this.state = State.BeforeClosingTagName;
    } else {
      this.state = State.Text;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace(c)) ;
    else if (c === CharCodes.Gt) {
      this.state = State.Text;
    } else {
      this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (c === CharCodes.Gt || isWhitespace(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterClosingTagName;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttributeName(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onopentagend(this.index);
      if (this.isSpecial) {
        this.state = State.InSpecialTag;
        this.sequenceIndex = 0;
      } else {
        this.state = State.Text;
      }
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Slash) {
      this.state = State.InSelfClosingTag;
    } else if (!isWhitespace(c)) {
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onselfclosingtag(this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
      this.isSpecial = false;
    } else if (!isWhitespace(c)) {
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateInAttributeName(c) {
    if (c === CharCodes.Eq || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.sectionStart = this.index;
      this.state = State.AfterAttributeName;
      this.stateAfterAttributeName(c);
    }
  }
  stateAfterAttributeName(c) {
    if (c === CharCodes.Eq) {
      this.state = State.BeforeAttributeValue;
    } else if (c === CharCodes.Slash || c === CharCodes.Gt) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (!isWhitespace(c)) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateBeforeAttributeValue(c) {
    if (c === CharCodes.DoubleQuote) {
      this.state = State.InAttributeValueDq;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.SingleQuote) {
      this.state = State.InAttributeValueSq;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c)) {
      this.sectionStart = this.index;
      this.state = State.InAttributeValueNq;
      this.stateInAttributeValueNoQuotes(c);
    }
  }
  handleInAttributeValue(c, quote) {
    if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
      this.state = State.BeforeAttributeName;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  stateInAttributeValueDoubleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.SingleQuote);
  }
  stateInAttributeValueNoQuotes(c) {
    if (isWhitespace(c) || c === CharCodes.Gt) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(QuoteType.Unquoted, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.startEntity();
    }
  }
  stateBeforeDeclaration(c) {
    if (c === CharCodes.OpeningSquareBracket) {
      this.state = State.CDATASequence;
      this.sequenceIndex = 0;
    } else {
      this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
    }
  }
  stateInDeclaration(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.ondeclaration(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c) {
    if (c === CharCodes.Dash) {
      this.state = State.InCommentLike;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State.InDeclaration;
    }
  }
  stateInSpecialComment(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c) {
    const lower = c | 32;
    if (lower === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (lower === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = State.InTagName;
      this.stateInTagName(c);
    }
  }
  stateBeforeSpecialT(c) {
    const lower = c | 32;
    switch (lower) {
      case Sequences.TitleEnd[3]: {
        this.startSpecial(Sequences.TitleEnd, 4);
        break;
      }
      case Sequences.TextareaEnd[3]: {
        this.startSpecial(Sequences.TextareaEnd, 4);
        break;
      }
      case Sequences.XmpEnd[3]: {
        this.startSpecial(Sequences.XmpEnd, 4);
        break;
      }
      default: {
        this.state = State.InTagName;
        this.stateInTagName(c);
      }
    }
  }
  startEntity() {
    this.baseState = this.state;
    this.state = State.InEntity;
    this.entityStart = this.index;
    this.entityDecoder.startEntity(this.xmlMode ? DecodingMode.Strict : this.baseState === State.Text || this.baseState === State.InSpecialTag ? DecodingMode.Legacy : DecodingMode.Attribute);
  }
  stateInEntity() {
    const length = this.entityDecoder.write(this.buffer, this.index - this.offset);
    if (length >= 0) {
      this.state = this.baseState;
      if (length === 0) {
        this.index = this.entityStart;
      }
    } else {
      this.index = this.offset + this.buffer.length - 1;
    }
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    while (this.shouldContinue()) {
      const c = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State.Text: {
          this.stateText(c);
          break;
        }
        case State.SpecialStartSequence: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case State.InSpecialTag: {
          this.stateInSpecialTag(c);
          break;
        }
        case State.CDATASequence: {
          this.stateCDATASequence(c);
          break;
        }
        case State.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(c);
          break;
        }
        case State.InAttributeName: {
          this.stateInAttributeName(c);
          break;
        }
        case State.InCommentLike: {
          this.stateInCommentLike(c);
          break;
        }
        case State.InSpecialComment: {
          this.stateInSpecialComment(c);
          break;
        }
        case State.BeforeAttributeName: {
          this.stateBeforeAttributeName(c);
          break;
        }
        case State.InTagName: {
          this.stateInTagName(c);
          break;
        }
        case State.InClosingTagName: {
          this.stateInClosingTagName(c);
          break;
        }
        case State.BeforeTagName: {
          this.stateBeforeTagName(c);
          break;
        }
        case State.AfterAttributeName: {
          this.stateAfterAttributeName(c);
          break;
        }
        case State.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(c);
          break;
        }
        case State.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(c);
          break;
        }
        case State.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case State.AfterClosingTagName: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case State.BeforeSpecialS: {
          this.stateBeforeSpecialS(c);
          break;
        }
        case State.BeforeSpecialT: {
          this.stateBeforeSpecialT(c);
          break;
        }
        case State.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(c);
          break;
        }
        case State.InSelfClosingTag: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case State.InDeclaration: {
          this.stateInDeclaration(c);
          break;
        }
        case State.BeforeDeclaration: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case State.BeforeComment: {
          this.stateBeforeComment(c);
          break;
        }
        case State.InProcessingInstruction: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case State.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === State.InEntity) {
      this.entityDecoder.end();
      this.state = this.baseState;
    }
    this.handleTrailingData();
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length + this.offset;
    if (this.sectionStart >= endIndex) {
      return;
    }
    if (this.state === State.InCommentLike) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex, 0);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex, 0);
      }
    } else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName) ;
    else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitCodePoint(cp2, consumed) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      if (this.sectionStart < this.entityStart) {
        this.cbs.onattribdata(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.onattribentity(cp2);
    } else {
      if (this.sectionStart < this.entityStart) {
        this.cbs.ontext(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.ontextentity(cp2, this.sectionStart);
    }
  }
};
var formTags = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]);
var pTag = /* @__PURE__ */ new Set(["p"]);
var tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
var ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
var rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
var openImpliesClose = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", pTag],
  ["h1", pTag],
  ["h2", pTag],
  ["h3", pTag],
  ["h4", pTag],
  ["h5", pTag],
  ["h6", pTag],
  ["select", formTags],
  ["input", formTags],
  ["output", formTags],
  ["button", formTags],
  ["datalist", formTags],
  ["textarea", formTags],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", ddtTags],
  ["dt", ddtTags],
  ["address", pTag],
  ["article", pTag],
  ["aside", pTag],
  ["blockquote", pTag],
  ["details", pTag],
  ["div", pTag],
  ["dl", pTag],
  ["fieldset", pTag],
  ["figcaption", pTag],
  ["figure", pTag],
  ["footer", pTag],
  ["form", pTag],
  ["header", pTag],
  ["hr", pTag],
  ["main", pTag],
  ["nav", pTag],
  ["ol", pTag],
  ["pre", pTag],
  ["section", pTag],
  ["table", pTag],
  ["ul", pTag],
  ["rt", rtpTags],
  ["rp", rtpTags],
  ["tbody", tableSectionTags],
  ["tfoot", tableSectionTags]
]);
var voidElements = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
var htmlIntegrationElements = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]);
var reNameEnd = /\s|\//;
var Parser = class {
  constructor(cbs, options = {}) {
    var _a2, _b, _c, _d, _e, _f;
    this.options = options;
    this.startIndex = 0;
    this.endIndex = 0;
    this.openTagStart = 0;
    this.tagname = "";
    this.attribname = "";
    this.attribvalue = "";
    this.attribs = null;
    this.stack = [];
    this.buffers = [];
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
    this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
    this.htmlMode = !this.options.xmlMode;
    this.lowerCaseTagNames = (_a2 = options.lowerCaseTags) !== null && _a2 !== void 0 ? _a2 : this.htmlMode;
    this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : this.htmlMode;
    this.recognizeSelfClosing = (_c = options.recognizeSelfClosing) !== null && _c !== void 0 ? _c : !this.htmlMode;
    this.tokenizer = new ((_d = options.Tokenizer) !== null && _d !== void 0 ? _d : Tokenizer)(this.options, this);
    this.foreignContext = [!this.htmlMode];
    (_f = (_e = this.cbs).onparserinit) === null || _f === void 0 ? void 0 : _f.call(_e, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(start, endIndex) {
    var _a2, _b;
    const data = this.getSlice(start, endIndex);
    this.endIndex = endIndex - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, data);
    this.startIndex = endIndex;
  }
  /** @internal */
  ontextentity(cp2, endIndex) {
    var _a2, _b;
    this.endIndex = endIndex - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, fromCodePoint(cp2));
    this.startIndex = endIndex;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   */
  isVoidElement(name) {
    return this.htmlMode && voidElements.has(name);
  }
  /** @internal */
  onopentagname(start, endIndex) {
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    this.emitOpenTag(name);
  }
  emitOpenTag(name) {
    var _a2, _b, _c, _d;
    this.openTagStart = this.startIndex;
    this.tagname = name;
    const impliesClose = this.htmlMode && openImpliesClose.get(name);
    if (impliesClose) {
      while (this.stack.length > 0 && impliesClose.has(this.stack[0])) {
        const element = this.stack.shift();
        (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, element, true);
      }
    }
    if (!this.isVoidElement(name)) {
      this.stack.unshift(name);
      if (this.htmlMode) {
        if (foreignContextElements.has(name)) {
          this.foreignContext.unshift(true);
        } else if (htmlIntegrationElements.has(name)) {
          this.foreignContext.unshift(false);
        }
      }
    }
    (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
    if (this.cbs.onopentag)
      this.attribs = {};
  }
  endOpenTag(isImplied) {
    var _a2, _b;
    this.startIndex = this.openTagStart;
    if (this.attribs) {
      (_b = (_a2 = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a2, this.tagname, this.attribs, isImplied);
      this.attribs = null;
    }
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
      this.cbs.onclosetag(this.tagname, true);
    }
    this.tagname = "";
  }
  /** @internal */
  onopentagend(endIndex) {
    this.endIndex = endIndex;
    this.endOpenTag(false);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onclosetag(start, endIndex) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    if (this.htmlMode && (foreignContextElements.has(name) || htmlIntegrationElements.has(name))) {
      this.foreignContext.shift();
    }
    if (!this.isVoidElement(name)) {
      const pos = this.stack.indexOf(name);
      if (pos !== -1) {
        for (let index2 = 0; index2 <= pos; index2++) {
          const element = this.stack.shift();
          (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, element, index2 !== pos);
        }
      } else if (this.htmlMode && name === "p") {
        this.emitOpenTag("p");
        this.closeCurrentTag(true);
      }
    } else if (this.htmlMode && name === "br") {
      (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, "br");
      (_f = (_e = this.cbs).onopentag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", {}, true);
      (_h = (_g = this.cbs).onclosetag) === null || _h === void 0 ? void 0 : _h.call(_g, "br", false);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onselfclosingtag(endIndex) {
    this.endIndex = endIndex;
    if (this.recognizeSelfClosing || this.foreignContext[0]) {
      this.closeCurrentTag(false);
      this.startIndex = endIndex + 1;
    } else {
      this.onopentagend(endIndex);
    }
  }
  closeCurrentTag(isOpenImplied) {
    var _a2, _b;
    const name = this.tagname;
    this.endOpenTag(isOpenImplied);
    if (this.stack[0] === name) {
      (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, name, !isOpenImplied);
      this.stack.shift();
    }
  }
  /** @internal */
  onattribname(start, endIndex) {
    this.startIndex = start;
    const name = this.getSlice(start, endIndex);
    this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
  }
  /** @internal */
  onattribdata(start, endIndex) {
    this.attribvalue += this.getSlice(start, endIndex);
  }
  /** @internal */
  onattribentity(cp2) {
    this.attribvalue += fromCodePoint(cp2);
  }
  /** @internal */
  onattribend(quote, endIndex) {
    var _a2, _b;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a2, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
    if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
      this.attribs[this.attribname] = this.attribvalue;
    }
    this.attribvalue = "";
  }
  getInstructionName(value) {
    const index2 = value.search(reNameEnd);
    let name = index2 < 0 ? value : value.substr(0, index2);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    return name;
  }
  /** @internal */
  ondeclaration(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onprocessinginstruction(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncomment(start, endIndex, offset) {
    var _a2, _b, _c, _d;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a2, this.getSlice(start, endIndex - offset));
    (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncdata(start, endIndex, offset) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex - offset);
    if (!this.htmlMode || this.options.recognizeCDATA) {
      (_b = (_a2 = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a2);
      (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
      (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
    } else {
      (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, `[CDATA[${value}]]`);
      (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onend() {
    var _a2, _b;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let index2 = 0; index2 < this.stack.length; index2++) {
        this.cbs.onclosetag(this.stack[index2], true);
      }
    }
    (_b = (_a2 = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a2);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var _a2, _b, _c, _d;
    (_b = (_a2 = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a2);
    this.tokenizer.reset();
    this.tagname = "";
    this.attribname = "";
    this.attribs = null;
    this.stack.length = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
    this.buffers.length = 0;
    this.foreignContext.length = 0;
    this.foreignContext.unshift(!this.htmlMode);
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(data) {
    this.reset();
    this.end(data);
  }
  getSlice(start, end) {
    while (start - this.bufferOffset >= this.buffers[0].length) {
      this.shiftBuffer();
    }
    let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
    while (end - this.bufferOffset > this.buffers[0].length) {
      this.shiftBuffer();
      slice += this.buffers[0].slice(0, end - this.bufferOffset);
    }
    return slice;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length;
    this.writeIndex--;
    this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(chunk);
    if (this.tokenizer.running) {
      this.tokenizer.write(chunk);
      this.writeIndex++;
    }
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".end() after done!"));
      return;
    }
    if (chunk)
      this.write(chunk);
    this.ended = true;
    this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    }
    if (this.ended)
      this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(chunk) {
    this.write(chunk);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(chunk) {
    this.end(chunk);
  }
};
function parseDocument2(data, options) {
  const handler = new DomHandler(void 0, options);
  new Parser(handler, options).end(data);
  return handler.root;
}
var picocolors_browserExports = requirePicocolors_browser();
var pc = getDefaultExportFromCjs2(picocolors_browserExports);
function parseStylesheet(stylesheet) {
  return parse$2(stylesheet);
}
function serializeStylesheet(ast, options) {
  const cssParts = [];
  stringify(ast, (result2, node2, type) => {
    if (node2?.type === "decl" && node2.value.includes("</style>")) {
      return;
    }
    if (!options.compress) {
      cssParts.push(result2);
      return;
    }
    if (node2?.type === "comment")
      return;
    if (node2?.type === "decl") {
      const prefix = node2.prop + node2.raws.between;
      cssParts.push(result2.replace(prefix, prefix.trim()));
      return;
    }
    if (type === "start") {
      if (node2?.type === "rule" && node2.selectors) {
        if (node2.selectors.length === 1) {
          cssParts.push(node2.selectors[0] ?? "", "{");
        } else {
          cssParts.push(node2.selectors.join(","), "{");
        }
      } else {
        cssParts.push(result2.trim());
      }
      return;
    }
    if (type === "end" && result2 === "}" && node2?.raws?.semicolon) {
      const lastItemIdx = cssParts.length - 2;
      if (lastItemIdx >= 0 && cssParts[lastItemIdx]) {
        cssParts[lastItemIdx] = cssParts[lastItemIdx].slice(0, -1);
      }
    }
    cssParts.push(result2.trim());
  });
  return cssParts.join("");
}
function markOnly(predicate) {
  return (rule2) => {
    const sel = "selectors" in rule2 ? rule2.selectors : void 0;
    if (predicate(rule2) === false) {
      rule2.$$remove = true;
    }
    if ("selectors" in rule2) {
      rule2.$$markedSelectors = rule2.selectors;
      rule2.selectors = sel;
    }
    if (rule2._other) {
      rule2._other.$$markedSelectors = rule2._other.selectors;
    }
  };
}
function applyMarkedSelectors(rule2) {
  if (rule2.$$markedSelectors) {
    rule2.selectors = rule2.$$markedSelectors;
  }
  if (rule2._other) {
    applyMarkedSelectors(rule2._other);
  }
}
function walkStyleRules(node2, iterator) {
  if (!("nodes" in node2)) {
    return;
  }
  node2.nodes = node2.nodes?.filter((rule2) => {
    if (hasNestedRules(rule2)) {
      walkStyleRules(rule2, iterator);
    }
    rule2._other = void 0;
    rule2.filterSelectors = filterSelectors;
    return iterator(rule2) !== false;
  });
}
function walkStyleRulesWithReverseMirror(node2, node22, iterator) {
  if (!node22)
    return walkStyleRules(node2, iterator);
  [node2.nodes, node22.nodes] = splitFilter(
    node2.nodes,
    node22.nodes,
    (rule2, index2, _rules, rules2) => {
      const rule22 = rules2?.[index2];
      if (hasNestedRules(rule2)) {
        walkStyleRulesWithReverseMirror(rule2, rule22, iterator);
      }
      rule2._other = rule22;
      rule2.filterSelectors = filterSelectors;
      return iterator(rule2) !== false;
    }
  );
}
function hasNestedRules(rule2) {
  return "nodes" in rule2 && !!rule2.nodes?.length && (!("name" in rule2) || rule2.name !== "keyframes" && rule2.name !== "-webkit-keyframes") && rule2.nodes.some((n) => n.type === "rule" || n.type === "atrule");
}
function splitFilter(a, b, predicate) {
  const aOut = [];
  const bOut = [];
  for (let index2 = 0; index2 < a.length; index2++) {
    const item = a[index2];
    if (predicate(item, index2, a, b)) {
      aOut.push(item);
    } else {
      bOut.push(item);
    }
  }
  return [aOut, bOut];
}
function filterSelectors(predicate) {
  if (this._other) {
    const [a, b] = splitFilter(
      this.selectors,
      this._other.selectors,
      predicate
    );
    this.selectors = a;
    this._other.selectors = b;
  } else {
    this.selectors = this.selectors.filter(predicate);
  }
}
var MEDIA_TYPES = /* @__PURE__ */ new Set(["all", "print", "screen", "speech"]);
var MEDIA_KEYWORDS = /* @__PURE__ */ new Set(["and", "not", ","]);
var MEDIA_FEATURES = new Set(
  [
    "width",
    "aspect-ratio",
    "color",
    "color-index",
    "grid",
    "height",
    "monochrome",
    "orientation",
    "resolution",
    "scan"
  ].flatMap((feature) => [feature, `min-${feature}`, `max-${feature}`])
);
function validateMediaType(node2) {
  const { type: nodeType, value: nodeValue } = node2;
  if (nodeType === "media-type") {
    return MEDIA_TYPES.has(nodeValue);
  } else if (nodeType === "keyword") {
    return MEDIA_KEYWORDS.has(nodeValue);
  } else if (nodeType === "media-feature") {
    return MEDIA_FEATURES.has(nodeValue);
  }
}
function validateMediaQuery(query) {
  const mediaParserFn = "default" in mediaParser ? mediaParser.default : mediaParser;
  const mediaTree = mediaParserFn(query);
  const nodeTypes = /* @__PURE__ */ new Set(["media-type", "keyword", "media-feature"]);
  const stack = [mediaTree];
  while (stack.length > 0) {
    const node2 = stack.pop();
    if (nodeTypes.has(node2.type) && !validateMediaType(node2)) {
      return false;
    }
    if (node2.nodes) {
      stack.push(...node2.nodes);
    }
  }
  return true;
}
var classCache = null;
var idCache = null;
function buildCache(container2) {
  classCache = /* @__PURE__ */ new Set();
  idCache = /* @__PURE__ */ new Set();
  const queue = [container2];
  while (queue.length) {
    const node2 = queue.shift();
    if (node2.hasAttribute?.("class")) {
      const classList = node2.getAttribute("class").trim().split(" ");
      classList.forEach((cls) => {
        classCache.add(cls);
      });
    }
    if (node2.hasAttribute?.("id")) {
      const id = node2.getAttribute("id").trim();
      idCache.add(id);
    }
    if ("children" in node2) {
      queue.push(...node2.children.filter((child) => child.type === "tag"));
    }
  }
}
function createDocument(html) {
  const document2 = parseDocument2(html, { decodeEntities: false });
  extendDocument(document2);
  extendElement(Element.prototype);
  let beastiesContainer = document2.querySelector("[data-beasties-container]");
  if (!beastiesContainer) {
    document2.documentElement?.setAttribute("data-beasties-container", "");
    beastiesContainer = document2.documentElement || document2;
  }
  document2.beastiesContainer = beastiesContainer;
  buildCache(beastiesContainer);
  return document2;
}
function serializeDocument2(document2) {
  return render(document2, { decodeEntities: false });
}
var extended = false;
function extendElement(element) {
  if (extended) {
    return;
  }
  extended = true;
  Object.defineProperties(element, {
    nodeName: {
      get() {
        return this.tagName.toUpperCase();
      }
    },
    id: {
      get() {
        return this.getAttribute("id");
      },
      set(value) {
        this.setAttribute("id", value);
      }
    },
    className: {
      get() {
        return this.getAttribute("class");
      },
      set(value) {
        this.setAttribute("class", value);
      }
    },
    insertBefore: {
      value(child, referenceNode) {
        if (!referenceNode)
          return this.appendChild(child);
        prepend(referenceNode, child);
        return child;
      }
    },
    appendChild: {
      value(child) {
        appendChild(this, child);
        return child;
      }
    },
    removeChild: {
      value(child) {
        removeElement(child);
      }
    },
    remove: {
      value() {
        removeElement(this);
      }
    },
    textContent: {
      get() {
        return getText(this);
      },
      set(text) {
        this.children = [];
        appendChild(this, new Text(text));
      }
    },
    setAttribute: {
      value(name, value) {
        if (this.attribs == null)
          this.attribs = {};
        if (value == null)
          value = "";
        this.attribs[name] = value;
      }
    },
    removeAttribute: {
      value(name) {
        if (this.attribs != null) {
          delete this.attribs[name];
        }
      }
    },
    getAttribute: {
      value(name) {
        return this.attribs != null && this.attribs[name];
      }
    },
    hasAttribute: {
      value(name) {
        return this.attribs != null && this.attribs[name] != null;
      }
    },
    getAttributeNode: {
      value(name) {
        const value = this.getAttribute(name);
        if (value != null)
          return { specified: true, value };
      }
    },
    exists: {
      value(sel) {
        return cachedQuerySelector(sel, this);
      }
    },
    querySelector: {
      value(sel) {
        return selectOne(sel, this);
      }
    },
    querySelectorAll: {
      value(sel) {
        return selectAll(sel, this);
      }
    }
  });
}
function extendDocument(document2) {
  Object.defineProperties(document2, {
    // document is just an Element in htmlparser2, giving it a nodeType of ELEMENT_NODE.
    // TODO: verify if these are needed for css-select
    nodeType: {
      get() {
        return 9;
      }
    },
    contentType: {
      get() {
        return "text/html";
      }
    },
    nodeName: {
      get() {
        return "#document";
      }
    },
    documentElement: {
      get() {
        return this.children.find(
          (child) => "tagName" in child && String(child.tagName).toLowerCase() === "html"
        );
      }
    },
    head: {
      get() {
        return this.querySelector("head");
      }
    },
    body: {
      get() {
        return this.querySelector("body");
      }
    },
    createElement: {
      value(name) {
        return new Element(name, {});
      }
    },
    createTextNode: {
      value(text) {
        return new Text(text);
      }
    },
    exists: {
      value(sel) {
        return cachedQuerySelector(sel, this);
      }
    },
    querySelector: {
      value(sel) {
        return selectOne(sel, this);
      }
    },
    querySelectorAll: {
      value(sel) {
        if (sel === ":root") {
          return this;
        }
        return selectAll(sel, this);
      }
    }
  });
}
var selectorTokensCache = /* @__PURE__ */ new Map();
function cachedQuerySelector(sel, node2) {
  let selectorTokens = selectorTokensCache.get(sel);
  if (selectorTokens === void 0) {
    selectorTokens = parseRelevantSelectors(sel);
    selectorTokensCache.set(sel, selectorTokens);
  }
  if (selectorTokens) {
    for (const token of selectorTokens) {
      if (token.name === "class") {
        return classCache.has(token.value);
      }
      if (token.name === "id") {
        return idCache.has(token.value);
      }
    }
  }
  return !!selectOne(sel, node2);
}
function parseRelevantSelectors(sel) {
  const tokens = parse$1(sel);
  const relevantTokens = [];
  for (let i = 0; i < tokens.length; i++) {
    const tokenGroup = tokens[i];
    if (tokenGroup?.length !== 1) {
      continue;
    }
    const token = tokenGroup[0];
    if (token?.type === "attribute" && (token.name === "class" || token.name === "id")) {
      relevantTokens.push(token);
    }
  }
  return relevantTokens.length > 0 ? relevantTokens : null;
}
var LOG_LEVELS = ["trace", "debug", "info", "warn", "error", "silent"];
var defaultLogger = {
  trace(msg) {
    console.trace(msg);
  },
  debug(msg) {
    console.debug(msg);
  },
  warn(msg) {
    console.warn(pc.yellow(msg));
  },
  error(msg) {
    console.error(pc.bold(pc.red(msg)));
  },
  info(msg) {
    console.info(pc.bold(pc.blue(msg)));
  },
  silent() {
  }
};
function createLogger(logLevel) {
  const logLevelIdx = LOG_LEVELS.indexOf(logLevel);
  return LOG_LEVELS.reduce((logger, type, index2) => {
    if (index2 >= logLevelIdx) {
      logger[type] = defaultLogger[type];
    } else {
      logger[type] = defaultLogger.silent;
    }
    return logger;
  }, {});
}
function isSubpath(basePath, currentPath) {
  return !_pathModule.relative(basePath, currentPath).startsWith("..");
}
var removePseudoClassesAndElementsPattern = new RegExp("(?<!\\\\)::?[a-z-]+(?:\\(.+\\))?", "gi");
var implicitUniversalPattern = /([>+~])\s*(?!\1)([>+~])/g;
var emptyCombinatorPattern = /([>+~])\s*(?=\1|$)/g;
var removeTrailingCommasPattern = /\(\s*,|,\s*\)/g;
var Beasties = class {
  #selectorCache = /* @__PURE__ */ new Map();
  options;
  logger;
  fs;
  constructor(options = {}) {
    this.options = Object.assign({
      logLevel: "info",
      path: "",
      publicPath: "",
      reduceInlineStyles: true,
      pruneSource: false,
      additionalStylesheets: [],
      allowRules: []
    }, options);
    this.logger = this.options.logger || createLogger(this.options.logLevel);
  }
  /**
   * Read the contents of a file from the specified filesystem or disk
   */
  readFile(filename) {
    const fs = this.fs;
    return new Promise((resolve2, reject) => {
      const callback = (err, data) => {
        if (err)
          reject(err);
        else resolve2(data.toString());
      };
      if (fs && fs.readFile) {
        fs.readFile(filename, callback);
      } else {
        readFile(filename, "utf-8", callback);
      }
    });
  }
  /**
   * Write content to a file
   */
  writeFile(filename, data) {
    const fs = this.fs;
    return new Promise((resolve2, reject) => {
      const callback = (err) => {
        if (err)
          reject(err);
        else resolve2();
      };
      if (fs && fs.writeFile) {
        fs.writeFile(filename, data, callback);
      } else {
        writeFile(filename, data, callback);
      }
    });
  }
  /**
   * Apply critical CSS processing to the html
   */
  async process(html) {
    const start = Date.now();
    const document2 = createDocument(html);
    if (this.options.additionalStylesheets.length > 0) {
      await this.embedAdditionalStylesheet(document2);
    }
    if (this.options.external !== false) {
      const externalSheets = [...document2.querySelectorAll('link[rel="stylesheet"]')];
      await Promise.all(
        externalSheets.map((link2) => this.embedLinkedStylesheet(link2, document2))
      );
    }
    const styles = this.getAffectedStyleTags(document2);
    for (const style of styles) {
      this.processStyle(style, document2);
    }
    if (this.options.mergeStylesheets !== false && styles.length !== 0) {
      this.mergeStylesheets(document2);
    }
    const output = serializeDocument2(document2);
    const end = Date.now();
    this.logger.info?.(`Time ${end - start}ms`);
    return output;
  }
  /**
   * Get the style tags that need processing
   */
  getAffectedStyleTags(document2) {
    const styles = [...document2.querySelectorAll("style")];
    if (this.options.reduceInlineStyles === false) {
      return styles.filter((style) => style.$$external);
    }
    return styles;
  }
  mergeStylesheets(document2) {
    const styles = this.getAffectedStyleTags(document2);
    if (styles.length === 0) {
      this.logger.warn?.(
        "Merging inline stylesheets into a single <style> tag skipped, no inline stylesheets to merge"
      );
      return;
    }
    const first = styles[0];
    let sheet = first.textContent;
    for (let i = 1; i < styles.length; i++) {
      const node2 = styles[i];
      sheet += node2.textContent;
      node2.remove();
    }
    first.textContent = sheet;
  }
  /**
   * Given href, find the corresponding CSS asset
   */
  async getCssAsset(href, _style) {
    const outputPath = this.options.path;
    const publicPath = this.options.publicPath;
    let normalizedPath = href.replace(/^\//, "");
    const pathPrefix = `${(publicPath || "").replace(/(^\/|\/$)/g, "")}/`;
    if (normalizedPath.startsWith(pathPrefix)) {
      normalizedPath = normalizedPath.substring(pathPrefix.length).replace(/^\//, "");
    }
    if (/^https?:\/\//.test(normalizedPath) || href.startsWith("//")) {
      return void 0;
    }
    const filename = _pathModule.resolve(outputPath, normalizedPath);
    if (!isSubpath(outputPath, filename)) {
      return void 0;
    }
    let sheet;
    try {
      sheet = await this.readFile(filename);
    } catch {
      this.logger.warn?.(`Unable to locate stylesheet: ${filename}`);
    }
    return sheet;
  }
  checkInlineThreshold(link2, style, sheet) {
    if (this.options.inlineThreshold && sheet.length < this.options.inlineThreshold) {
      const href = style.$$name;
      style.$$reduce = false;
      this.logger.info?.(
        `\x1B[32mInlined all of ${href} (${sheet.length} was below the threshold of ${this.options.inlineThreshold})\x1B[39m`
      );
      link2.remove();
      return true;
    }
    return false;
  }
  /**
   * Inline the stylesheets from options.additionalStylesheets (assuming it passes `options.filter`)
   */
  async embedAdditionalStylesheet(document2) {
    const styleSheetsIncluded = [];
    const sources = await Promise.all(
      this.options.additionalStylesheets.map((cssFile) => {
        if (styleSheetsIncluded.includes(cssFile)) {
          return [];
        }
        styleSheetsIncluded.push(cssFile);
        const style = document2.createElement("style");
        style.$$external = true;
        return this.getCssAsset(cssFile, style).then((sheet) => [sheet, style]);
      })
    );
    for (const [sheet, style] of sources) {
      if (sheet) {
        style.textContent = sheet;
        document2.head.appendChild(style);
      }
    }
  }
  /**
   * Inline the target stylesheet referred to by a <link rel="stylesheet"> (assuming it passes `options.filter`)
   */
  async embedLinkedStylesheet(link2, document2) {
    const href = link2.getAttribute("href");
    if (!href?.endsWith(".css")) {
      return void 0;
    }
    const style = document2.createElement("style");
    style.$$external = true;
    const sheet = await this.getCssAsset(href, style);
    if (!sheet) {
      return;
    }
    style.textContent = sheet;
    style.$$name = href;
    style.$$links = [link2];
    link2.parentNode?.insertBefore(style, link2);
    if (this.checkInlineThreshold(link2, style, sheet)) {
      return;
    }
    let media = link2.getAttribute("media");
    if (media && !validateMediaQuery(media)) {
      media = void 0;
    }
    const preloadMode = this.options.preload;
    let cssLoaderPreamble = "function $loadcss(u,m,l){(l=document.createElement('link')).rel='stylesheet';l.href=u;document.head.appendChild(l)}";
    const lazy = preloadMode === "js-lazy";
    if (lazy) {
      cssLoaderPreamble = cssLoaderPreamble.replace(
        "l.href",
        "l.media='print';l.onload=function(){l.media=m};l.href"
      );
    }
    if (preloadMode === false)
      return;
    let noscriptFallback = false;
    let updateLinkToPreload = false;
    const noscriptLink = link2.cloneNode(false);
    if (preloadMode === "body") {
      document2.body.appendChild(link2);
    } else {
      if (preloadMode === "js" || preloadMode === "js-lazy") {
        const script = document2.createElement("script");
        script.setAttribute("data-href", href);
        script.setAttribute("data-media", media || "all");
        const js = `${cssLoaderPreamble}$loadcss(document.currentScript.dataset.href,document.currentScript.dataset.media)`;
        script.textContent = js;
        link2.parentNode.insertBefore(script, link2.nextSibling);
        style.$$links.push(script);
        cssLoaderPreamble = "";
        noscriptFallback = true;
        updateLinkToPreload = true;
      } else if (preloadMode === "media") {
        link2.setAttribute("media", "print");
        link2.setAttribute("onload", `this.media='${media || "all"}'`);
        noscriptFallback = true;
      } else if (preloadMode === "swap-high") {
        link2.setAttribute("rel", "alternate stylesheet preload");
        link2.setAttribute("title", "styles");
        link2.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
        noscriptFallback = true;
      } else if (preloadMode === "swap-low") {
        link2.setAttribute("rel", "alternate stylesheet");
        link2.setAttribute("title", "styles");
        link2.setAttribute("onload", `this.title='';this.rel='stylesheet'`);
        noscriptFallback = true;
      } else if (preloadMode === "swap") {
        link2.setAttribute("onload", "this.rel='stylesheet'");
        updateLinkToPreload = true;
        noscriptFallback = true;
      } else {
        const bodyLink = link2.cloneNode(false);
        bodyLink.removeAttribute("id");
        document2.body.appendChild(bodyLink);
        style.$$links.push(bodyLink);
        updateLinkToPreload = true;
      }
    }
    if (this.options.noscriptFallback !== false && noscriptFallback && !href.includes("</noscript>")) {
      const noscript = document2.createElement("noscript");
      noscriptLink.removeAttribute("id");
      noscript.appendChild(noscriptLink);
      link2.parentNode.insertBefore(noscript, link2.nextSibling);
      style.$$links.push(noscript);
    }
    if (updateLinkToPreload) {
      link2.setAttribute("rel", "preload");
      link2.setAttribute("as", "style");
    }
  }
  /**
   * Prune the source CSS files
   */
  pruneSource(style, before, sheetInverse) {
    const minSize = this.options.minimumExternalSize;
    const name = style.$$name;
    const shouldInline = minSize && sheetInverse.length < minSize;
    if (shouldInline) {
      this.logger.info?.(
        `\x1B[32mInlined all of ${name} (non-critical external stylesheet would have been ${sheetInverse.length}b, which was below the threshold of ${minSize})\x1B[39m`
      );
    }
    if (shouldInline || !sheetInverse) {
      style.textContent = before;
      if (style.$$links) {
        for (const link2 of style.$$links) {
          const parent = link2.parentNode;
          parent?.removeChild(link2);
        }
      }
    }
    return !!shouldInline;
  }
  /**
   * Parse the stylesheet within a <style> element, then reduce it to contain only rules used by the document.
   */
  processStyle(style, document2) {
    if (style.$$reduce === false)
      return;
    const name = style.$$name ? style.$$name.replace(/^\//, "") : "inline CSS";
    const options = this.options;
    const beastiesContainer = document2.beastiesContainer;
    let keyframesMode = options.keyframes ?? "critical";
    if (keyframesMode === true)
      keyframesMode = "all";
    if (keyframesMode === false)
      keyframesMode = "none";
    let sheet = style.textContent;
    const before = sheet;
    if (!sheet)
      return;
    const ast = parseStylesheet(sheet);
    const astInverse = options.pruneSource ? parseStylesheet(sheet) : null;
    let criticalFonts = "";
    const failedSelectors = [];
    const criticalKeyframeNames = /* @__PURE__ */ new Set();
    let includeNext = false;
    let includeAll = false;
    let excludeNext = false;
    let excludeAll = false;
    const shouldPreloadFonts = options.fonts === true || options.preloadFonts === true;
    const shouldInlineFonts = options.fonts !== false && options.inlineFonts === true;
    walkStyleRules(
      ast,
      markOnly((rule2) => {
        if (rule2.type === "comment") {
          const beastiesComment = rule2.text.match(new RegExp("^(?<!! )beasties:(.*)"));
          const command = beastiesComment && beastiesComment[1];
          if (command) {
            switch (command) {
              case "include":
                includeNext = true;
                break;
              case "exclude":
                excludeNext = true;
                break;
              case "include start":
                includeAll = true;
                break;
              case "include end":
                includeAll = false;
                break;
              case "exclude start":
                excludeAll = true;
                break;
              case "exclude end":
                excludeAll = false;
                break;
            }
          }
        }
        if (rule2.type === "rule") {
          if (includeNext) {
            includeNext = false;
            return true;
          }
          if (excludeNext) {
            excludeNext = false;
            return false;
          }
          if (includeAll) {
            return true;
          }
          if (excludeAll) {
            return false;
          }
          rule2.filterSelectors?.((sel) => {
            const isAllowedRule = options.allowRules.some((exp) => {
              if (exp instanceof RegExp) {
                return exp.test(sel);
              }
              return exp === sel;
            });
            if (isAllowedRule)
              return true;
            if (sel === ":root" || sel === "html" || sel === "body" || sel[0] === ":" && /^::?(?:before|after)$/.test(sel)) {
              return true;
            }
            sel = this.normalizeCssSelector(sel);
            if (!sel)
              return false;
            try {
              return beastiesContainer.exists(sel);
            } catch (e) {
              failedSelectors.push(`${sel} -> ${e.message || e.toString()}`);
              return false;
            }
          });
          if (!rule2.selector) {
            return false;
          }
          if (rule2.nodes) {
            for (const decl of rule2.nodes) {
              if (!("prop" in decl)) {
                continue;
              }
              if (shouldInlineFonts && /\bfont(?:-family)?\b/i.test(decl.prop)) {
                criticalFonts += ` ${decl.value}`;
              }
              if (decl.prop === "animation" || decl.prop === "animation-name") {
                for (const name2 of decl.value.split(/\s+/)) {
                  const nameTrimmed = name2.trim();
                  if (nameTrimmed)
                    criticalKeyframeNames.add(nameTrimmed);
                }
              }
            }
          }
        }
        if (rule2.type === "atrule" && (rule2.name === "font-face" || rule2.name === "layer"))
          return;
        const hasRemainingRules = ("nodes" in rule2 && rule2.nodes?.some((rule22) => !rule22.$$remove)) ?? true;
        return hasRemainingRules;
      })
    );
    if (failedSelectors.length !== 0) {
      this.logger.warn?.(
        `${failedSelectors.length} rules skipped due to selector errors:
  ${failedSelectors.join("\n  ")}`
      );
    }
    const preloadedFonts = /* @__PURE__ */ new Set();
    walkStyleRulesWithReverseMirror(ast, astInverse, (rule2) => {
      if (rule2.$$remove === true)
        return false;
      if ("selectors" in rule2) {
        applyMarkedSelectors(rule2);
      }
      if (rule2.type === "atrule" && rule2.name === "keyframes") {
        if (keyframesMode === "none")
          return false;
        if (keyframesMode === "all")
          return true;
        return criticalKeyframeNames.has(rule2.params);
      }
      if (rule2.type === "atrule" && rule2.name === "font-face") {
        let family, src;
        if (rule2.nodes) {
          for (const decl of rule2.nodes) {
            if (!("prop" in decl)) {
              continue;
            }
            if (decl.prop === "src") {
              src = (decl.value.match(/url\s*\(\s*(['"]?)(.+?)\1\s*\)/) || [])[2];
            } else if (decl.prop === "font-family") {
              family = decl.value;
            }
          }
          if (src && shouldPreloadFonts && !preloadedFonts.has(src)) {
            preloadedFonts.add(src);
            const preload = document2.createElement("link");
            preload.setAttribute("rel", "preload");
            preload.setAttribute("as", "font");
            preload.setAttribute("crossorigin", "anonymous");
            preload.setAttribute("href", src.trim());
            document2.head.appendChild(preload);
          }
        }
        if (!shouldInlineFonts || !family || !src || !criticalFonts.includes(family)) {
          return false;
        }
      }
    });
    sheet = serializeStylesheet(ast, {
      compress: this.options.compress !== false
    });
    if (sheet.trim().length === 0) {
      if (style.parentNode) {
        style.remove();
      }
      return;
    }
    let afterText = "";
    let styleInlinedCompletely = false;
    if (options.pruneSource) {
      const sheetInverse = serializeStylesheet(astInverse, {
        compress: this.options.compress !== false
      });
      styleInlinedCompletely = this.pruneSource(style, before, sheetInverse);
      if (styleInlinedCompletely) {
        const percent2 = sheetInverse.length / before.length * 100;
        afterText = `, reducing non-inlined size ${percent2 | 0}% to ${formatSize(sheetInverse.length)}`;
      }
      const cssFilePath = _pathModule.resolve(this.options.path, name);
      this.writeFile(cssFilePath, sheetInverse).then(() => this.logger.info?.(`${name} was successfully updated`)).catch((err) => this.logger.error?.(err));
    }
    if (!styleInlinedCompletely) {
      style.textContent = sheet;
    }
    const percent = sheet.length / before.length * 100 | 0;
    this.logger.info?.(
      `\x1B[32mInlined ${formatSize(sheet.length)} (${percent}% of original ${formatSize(before.length)}) of ${name}${afterText}.\x1B[39m`
    );
  }
  normalizeCssSelector(sel) {
    let normalizedSelector = this.#selectorCache.get(sel);
    if (normalizedSelector !== void 0) {
      return normalizedSelector;
    }
    normalizedSelector = sel.replace(removePseudoClassesAndElementsPattern, "").replace(removeTrailingCommasPattern, (match) => match.includes("(") ? "(" : ")").replace(implicitUniversalPattern, "$1 * $2").replace(emptyCombinatorPattern, "$1 *").trim();
    this.#selectorCache.set(sel, normalizedSelector);
    return normalizedSelector;
  }
};
function formatSize(size) {
  if (size <= 0) {
    return "0 bytes";
  }
  const abbreviations = ["bytes", "kB", "MB", "GB"];
  const index2 = Math.floor(Math.log(size) / Math.log(1024));
  const roundedSize = size / 1024 ** index2;
  const fractionDigits = index2 === 0 ? 0 : 2;
  return `${roundedSize.toFixed(fractionDigits)} ${abbreviations[index2]}`;
}

// node_modules/@angular/ssr/fesm2022/ssr.mjs
var ServerAssets = class {
  manifest;
  /**
   * Creates an instance of ServerAsset.
   *
   * @param manifest - The manifest containing the server assets.
   */
  constructor(manifest) {
    this.manifest = manifest;
  }
  /**
   * Retrieves the content of a server-side asset using its path.
   *
   * @param path - The path to the server asset within the manifest.
   * @returns The server asset associated with the provided path, as a `ServerAsset` object.
   * @throws Error - Throws an error if the asset does not exist.
   */
  getServerAsset(path2) {
    const asset = this.manifest.assets[path2];
    if (!asset) {
      throw new Error(`Server asset '${path2}' does not exist.`);
    }
    return asset;
  }
  /**
   * Checks if a specific server-side asset exists.
   *
   * @param path - The path to the server asset.
   * @returns A boolean indicating whether the asset exists.
   */
  hasServerAsset(path2) {
    return !!this.manifest.assets[path2];
  }
  /**
   * Retrieves the asset for 'index.server.html'.
   *
   * @returns The `ServerAsset` object for 'index.server.html'.
   * @throws Error - Throws an error if 'index.server.html' does not exist.
   */
  getIndexServerHtml() {
    return this.getServerAsset("index.server.html");
  }
};
var IGNORED_LOGS = /* @__PURE__ */ new Set(["Angular is running in development mode."]);
var Console2 = class extends Console {
  /**
   * Logs a message to the console if it is not in the set of ignored messages.
   *
   * @param message - The message to log to the console.
   *
   * This method overrides the `log` method of the `ɵConsole` class. It checks if the
   * message is in the `IGNORED_LOGS` set. If it is not, it delegates the logging to
   * the parent class's `log` method. Otherwise, the message is suppressed.
   */
  log(message) {
    if (!IGNORED_LOGS.has(message)) {
      super.log(message);
    }
  }
};
var angularAppManifest;
function setAngularAppManifest(manifest) {
  angularAppManifest = manifest;
}
function getAngularAppManifest() {
  if (!angularAppManifest) {
    throw new Error(`Angular app manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.`);
  }
  return angularAppManifest;
}
var angularAppEngineManifest;
function setAngularAppEngineManifest(manifest) {
  angularAppEngineManifest = manifest;
}
function getAngularAppEngineManifest() {
  if (!angularAppEngineManifest) {
    throw new Error(`Angular app engine manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.`);
  }
  return angularAppEngineManifest;
}
function stripTrailingSlash(url) {
  return url.length > 1 && url[url.length - 1] === "/" ? url.slice(0, -1) : url;
}
function stripLeadingSlash(url) {
  return url.length > 1 && url[0] === "/" ? url.slice(1) : url;
}
function addLeadingSlash(url) {
  return url[0] === "/" ? url : `/${url}`;
}
function addTrailingSlash(url) {
  return url[url.length - 1] === "/" ? url : `${url}/`;
}
function joinUrlParts(...parts) {
  const normalizeParts = [];
  for (const part of parts) {
    if (part === "") {
      continue;
    }
    let normalizedPart = part;
    if (part[0] === "/") {
      normalizedPart = normalizedPart.slice(1);
    }
    if (part[part.length - 1] === "/") {
      normalizedPart = normalizedPart.slice(0, -1);
    }
    if (normalizedPart !== "") {
      normalizeParts.push(normalizedPart);
    }
  }
  return addLeadingSlash(normalizeParts.join("/"));
}
function stripIndexHtmlFromURL(url) {
  if (url.pathname.endsWith("/index.html")) {
    const modifiedURL = new URL(url);
    modifiedURL.pathname = modifiedURL.pathname.slice(
      0,
      /** '/index.html'.length */
      -11
    );
    return modifiedURL;
  }
  return url;
}
function buildPathWithParams(toPath, fromPath) {
  if (toPath[0] !== "/") {
    throw new Error(`Invalid toPath: The string must start with a '/'. Received: '${toPath}'`);
  }
  if (fromPath[0] !== "/") {
    throw new Error(`Invalid fromPath: The string must start with a '/'. Received: '${fromPath}'`);
  }
  if (!toPath.includes("/*")) {
    return toPath;
  }
  const fromPathParts = fromPath.split("/");
  const toPathParts = toPath.split("/");
  const resolvedParts = toPathParts.map((part, index2) => toPathParts[index2] === "*" ? fromPathParts[index2] : part);
  return joinUrlParts(...resolvedParts);
}
var MATRIX_PARAMS_REGEX = /;[^/]+/g;
function stripMatrixParams(pathname) {
  return pathname.includes(";") ? pathname.replace(MATRIX_PARAMS_REGEX, "") : pathname;
}
async function renderAngular(html, bootstrap, url, platformProviders, serverContext) {
  const urlToRender = stripIndexHtmlFromURL(url);
  const platformRef = platformServer([
    {
      provide: INITIAL_CONFIG,
      useValue: {
        url: urlToRender.href,
        document: html
      }
    },
    {
      provide: SERVER_CONTEXT,
      useValue: serverContext
    },
    {
      // An Angular Console Provider that does not print a set of predefined logs.
      provide: Console,
      // Using `useClass` would necessitate decorating `Console` with `@Injectable`,
      // which would require switching from `ts_library` to `ng_module`. This change
      // would also necessitate various patches of `@angular/bazel` to support ESM.
      useFactory: () => new Console2()
    },
    ...platformProviders
  ]);
  let redirectTo;
  let hasNavigationError = true;
  try {
    let applicationRef;
    if (isNgModule(bootstrap)) {
      const moduleRef = await platformRef.bootstrapModule(bootstrap);
      applicationRef = moduleRef.injector.get(ApplicationRef);
    } else {
      applicationRef = await bootstrap({ platformRef });
    }
    await applicationRef.whenStable();
    const envInjector = applicationRef.injector;
    const routerIsProvided = !!envInjector.get(ActivatedRoute, null);
    const router = envInjector.get(Router);
    const lastSuccessfulNavigation = router.lastSuccessfulNavigation;
    if (!routerIsProvided) {
      hasNavigationError = false;
    } else if (lastSuccessfulNavigation) {
      hasNavigationError = false;
      const { pathname, search, hash } = envInjector.get(PlatformLocation);
      const finalUrl = [stripTrailingSlash(pathname), search, hash].join("");
      if (urlToRender.href !== new URL(finalUrl, urlToRender.origin).href) {
        redirectTo = finalUrl;
      }
    }
    return {
      hasNavigationError,
      redirectTo,
      content: () => new Promise((resolve2, reject) => {
        setTimeout(() => {
          renderInternal(platformRef, applicationRef).then(resolve2).catch(reject).finally(() => void asyncDestroyPlatform2(platformRef));
        }, 0);
      })
    };
  } catch (error) {
    await asyncDestroyPlatform2(platformRef);
    throw error;
  } finally {
    if (hasNavigationError || redirectTo) {
      void asyncDestroyPlatform2(platformRef);
    }
  }
}
function isNgModule(value) {
  return "ɵmod" in value;
}
function asyncDestroyPlatform2(platformRef) {
  return new Promise((resolve2) => {
    setTimeout(() => {
      if (!platformRef.destroyed) {
        platformRef.destroy();
      }
      resolve2();
    }, 0);
  });
}
function promiseWithAbort(promise, signal, errorMessagePrefix) {
  return new Promise((resolve2, reject) => {
    const abortHandler = () => {
      reject(new DOMException(`${errorMessagePrefix} was aborted.
${signal.reason}`, "AbortError"));
    };
    if (signal.aborted) {
      abortHandler();
      return;
    }
    signal.addEventListener("abort", abortHandler, { once: true });
    promise.then(resolve2).catch(reject).finally(() => {
      signal.removeEventListener("abort", abortHandler);
    });
  });
}
var APP_SHELL_ROUTE = "ng-app-shell";
var ServerRenderingFeatureKind;
(function(ServerRenderingFeatureKind2) {
  ServerRenderingFeatureKind2[ServerRenderingFeatureKind2["AppShell"] = 0] = "AppShell";
  ServerRenderingFeatureKind2[ServerRenderingFeatureKind2["ServerRoutes"] = 1] = "ServerRoutes";
})(ServerRenderingFeatureKind || (ServerRenderingFeatureKind = {}));
var RenderMode;
(function(RenderMode2) {
  RenderMode2[RenderMode2["Server"] = 0] = "Server";
  RenderMode2[RenderMode2["Client"] = 1] = "Client";
  RenderMode2[RenderMode2["Prerender"] = 2] = "Prerender";
})(RenderMode || (RenderMode = {}));
var PrerenderFallback;
(function(PrerenderFallback2) {
  PrerenderFallback2[PrerenderFallback2["Server"] = 0] = "Server";
  PrerenderFallback2[PrerenderFallback2["Client"] = 1] = "Client";
  PrerenderFallback2[PrerenderFallback2["None"] = 2] = "None";
})(PrerenderFallback || (PrerenderFallback = {}));
var SERVER_ROUTES_CONFIG = new InjectionToken("SERVER_ROUTES_CONFIG");
function withRoutes(routes) {
  const config2 = { routes };
  return {
    ɵkind: ServerRenderingFeatureKind.ServerRoutes,
    ɵproviders: [
      {
        provide: SERVER_ROUTES_CONFIG,
        useValue: config2
      }
    ]
  };
}
function withAppShell(component) {
  const routeConfig = {
    path: APP_SHELL_ROUTE
  };
  if ("ɵcmp" in component) {
    routeConfig.component = component;
  } else {
    routeConfig.loadComponent = component;
  }
  return {
    ɵkind: ServerRenderingFeatureKind.AppShell,
    ɵproviders: [
      {
        provide: ROUTES,
        useValue: routeConfig,
        multi: true
      },
      provideEnvironmentInitializer(() => {
        const config2 = inject(SERVER_ROUTES_CONFIG);
        config2.appShellRoute = APP_SHELL_ROUTE;
      })
    ]
  };
}
function provideServerRendering2(...features) {
  let hasAppShell = false;
  let hasServerRoutes = false;
  const providers = [provideServerRendering()];
  for (const { ɵkind, ɵproviders } of features) {
    hasAppShell ||= ɵkind === ServerRenderingFeatureKind.AppShell;
    hasServerRoutes ||= ɵkind === ServerRenderingFeatureKind.ServerRoutes;
    providers.push(...ɵproviders);
  }
  if (!hasServerRoutes && hasAppShell) {
    throw new Error(`Configuration error: found 'withAppShell()' without 'withRoutes()' in the same call to 'provideServerRendering()'.The 'withAppShell()' function requires 'withRoutes()' to be used.`);
  }
  return makeEnvironmentProviders(providers);
}
var RouteTree = class _RouteTree {
  /**
   * The root node of the route tree.
   * All routes are stored and accessed relative to this root node.
   */
  root = this.createEmptyRouteTreeNode();
  /**
   * Inserts a new route into the route tree.
   * The route is broken down into segments, and each segment is added to the tree.
   * Parameterized segments (e.g., :id) are normalized to wildcards (*) for matching purposes.
   *
   * @param route - The route path to insert into the tree.
   * @param metadata - Metadata associated with the route, excluding the route path itself.
   */
  insert(route, metadata) {
    let node2 = this.root;
    const segments = this.getPathSegments(route);
    const normalizedSegments = [];
    for (const segment of segments) {
      const normalizedSegment = segment[0] === ":" ? "*" : segment;
      let childNode = node2.children.get(normalizedSegment);
      if (!childNode) {
        childNode = this.createEmptyRouteTreeNode();
        node2.children.set(normalizedSegment, childNode);
      }
      node2 = childNode;
      normalizedSegments.push(normalizedSegment);
    }
    node2.metadata = __spreadProps(__spreadValues({}, metadata), {
      route: addLeadingSlash(normalizedSegments.join("/"))
    });
  }
  /**
   * Matches a given route against the route tree and returns the best matching route's metadata.
   * The best match is determined by the lowest insertion index, meaning the earliest defined route
   * takes precedence.
   *
   * @param route - The route path to match against the route tree.
   * @returns The metadata of the best matching route or `undefined` if no match is found.
   */
  match(route) {
    const segments = this.getPathSegments(route);
    return this.traverseBySegments(segments)?.metadata;
  }
  /**
   * Converts the route tree into a serialized format representation.
   * This method converts the route tree into an array of metadata objects that describe the structure of the tree.
   * The array represents the routes in a nested manner where each entry includes the route and its associated metadata.
   *
   * @returns An array of `RouteTreeNodeMetadata` objects representing the route tree structure.
   *          Each object includes the `route` and associated metadata of a route.
   */
  toObject() {
    return Array.from(this.traverse());
  }
  /**
   * Constructs a `RouteTree` from an object representation.
   * This method is used to recreate a `RouteTree` instance from an array of metadata objects.
   * The array should be in the format produced by `toObject`, allowing for the reconstruction of the route tree
   * with the same routes and metadata.
   *
   * @param value - An array of `RouteTreeNodeMetadata` objects that represent the serialized format of the route tree.
   *                Each object should include a `route` and its associated metadata.
   * @returns A new `RouteTree` instance constructed from the provided metadata objects.
   */
  static fromObject(value) {
    const tree = new _RouteTree();
    for (const _a2 of value) {
      const _b = _a2, { route } = _b, metadata = __objRest(_b, ["route"]);
      tree.insert(route, metadata);
    }
    return tree;
  }
  /**
   * A generator function that recursively traverses the route tree and yields the metadata of each node.
   * This allows for easy and efficient iteration over all nodes in the tree.
   *
   * @param node - The current node to start the traversal from. Defaults to the root node of the tree.
   */
  *traverse(node2 = this.root) {
    if (node2.metadata) {
      yield node2.metadata;
    }
    for (const childNode of node2.children.values()) {
      yield* this.traverse(childNode);
    }
  }
  /**
   * Extracts the path segments from a given route string.
   *
   * @param route - The route string from which to extract segments.
   * @returns An array of path segments.
   */
  getPathSegments(route) {
    return route.split("/").filter(Boolean);
  }
  /**
   * Recursively traverses the route tree from a given node, attempting to match the remaining route segments.
   * If the node is a leaf node (no more segments to match) and contains metadata, the node is yielded.
   *
   * This function prioritizes exact segment matches first, followed by wildcard matches (`*`),
   * and finally deep wildcard matches (`**`) that consume all segments.
   *
   * @param segments - The array of route path segments to match against the route tree.
   * @param node - The current node in the route tree to start traversal from. Defaults to the root node.
   * @param currentIndex - The index of the segment in `remainingSegments` currently being matched.
   * Defaults to `0` (the first segment).
   *
   * @returns The node that best matches the remaining segments or `undefined` if no match is found.
   */
  traverseBySegments(segments, node2 = this.root, currentIndex = 0) {
    if (currentIndex >= segments.length) {
      return node2.metadata ? node2 : node2.children.get("**");
    }
    if (!node2.children.size) {
      return void 0;
    }
    const segment = segments[currentIndex];
    const exactMatch = node2.children.get(segment);
    if (exactMatch) {
      const match = this.traverseBySegments(segments, exactMatch, currentIndex + 1);
      if (match) {
        return match;
      }
    }
    const wildcardMatch = node2.children.get("*");
    if (wildcardMatch) {
      const match = this.traverseBySegments(segments, wildcardMatch, currentIndex + 1);
      if (match) {
        return match;
      }
    }
    return node2.children.get("**");
  }
  /**
   * Creates an empty route tree node.
   * This helper function is used during the tree construction.
   *
   * @returns A new, empty route tree node.
   */
  createEmptyRouteTreeNode() {
    return {
      children: /* @__PURE__ */ new Map()
    };
  }
};
var MODULE_PRELOAD_MAX = 10;
var CATCH_ALL_REGEXP = /\/(\*\*)$/;
var URL_PARAMETER_REGEXP = new RegExp("(?<!\\\\):([^/]+)", "g");
var VALID_REDIRECT_RESPONSE_CODES = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
async function* handleRoute(options) {
  try {
    const { metadata, currentRoutePath, route, compiler, parentInjector, serverConfigRouteTree, entryPointToBrowserMapping, invokeGetPrerenderParams, includePrerenderFallbackRoutes } = options;
    const { redirectTo, loadChildren: loadChildren2, loadComponent, children, ɵentryName } = route;
    if (ɵentryName && loadComponent) {
      appendPreloadToMetadata(ɵentryName, entryPointToBrowserMapping, metadata);
    }
    if (metadata.renderMode === RenderMode.Prerender) {
      yield* handleSSGRoute(serverConfigRouteTree, typeof redirectTo === "string" ? redirectTo : void 0, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes);
    } else if (redirectTo !== void 0) {
      if (metadata.status && !VALID_REDIRECT_RESPONSE_CODES.has(metadata.status)) {
        yield {
          error: `The '${metadata.status}' status code is not a valid redirect response code. Please use one of the following redirect response codes: ${[...VALID_REDIRECT_RESPONSE_CODES.values()].join(", ")}.`
        };
      } else if (typeof redirectTo === "string") {
        yield __spreadProps(__spreadValues({}, metadata), {
          redirectTo: resolveRedirectTo(metadata.route, redirectTo)
        });
      } else {
        yield metadata;
      }
    } else {
      yield metadata;
    }
    if (children?.length) {
      yield* traverseRoutesConfig(__spreadProps(__spreadValues({}, options), {
        routes: children,
        parentRoute: currentRoutePath,
        parentPreloads: metadata.preload
      }));
    }
    if (loadChildren2) {
      if (ɵentryName) {
        appendPreloadToMetadata(ɵentryName, entryPointToBrowserMapping, metadata);
      }
      const routeInjector = route.providers ? createEnvironmentInjector(route.providers, parentInjector.get(EnvironmentInjector), `Route: ${route.path}`) : parentInjector;
      const loadedChildRoutes = await loadChildren(route, compiler, routeInjector).toPromise();
      if (loadedChildRoutes) {
        const { routes: childRoutes, injector = routeInjector } = loadedChildRoutes;
        yield* traverseRoutesConfig(__spreadProps(__spreadValues({}, options), {
          routes: childRoutes,
          parentInjector: injector,
          parentRoute: currentRoutePath,
          parentPreloads: metadata.preload
        }));
      }
    }
  } catch (error) {
    yield {
      error: `Error in handleRoute for '${options.currentRoutePath}': ${error.message}`
    };
  }
}
async function* traverseRoutesConfig(options) {
  const { routes: routeConfigs, parentPreloads, parentRoute, serverConfigRouteTree } = options;
  for (const route of routeConfigs) {
    const { matcher, path: path2 = matcher ? "**" : "" } = route;
    const currentRoutePath = joinUrlParts(parentRoute, path2);
    if (matcher && serverConfigRouteTree) {
      const matches = [];
      for (const matchedMetaData2 of serverConfigRouteTree.traverse()) {
        if (matchedMetaData2.route.startsWith(currentRoutePath)) {
          matches.push(matchedMetaData2);
        }
      }
      if (!matches.length) {
        const matchedMetaData2 = serverConfigRouteTree.match(currentRoutePath);
        if (matchedMetaData2) {
          matches.push(matchedMetaData2);
        }
      }
      for (const matchedMetaData2 of matches) {
        matchedMetaData2.presentInClientRouter = true;
        if (matchedMetaData2.renderMode === RenderMode.Prerender) {
          yield {
            error: `The route '${stripLeadingSlash(currentRoutePath)}' is set for prerendering but has a defined matcher. Routes with matchers cannot use prerendering. Please specify a different 'renderMode'.`
          };
          continue;
        }
        yield* handleRoute(__spreadProps(__spreadValues({}, options), {
          currentRoutePath,
          route,
          metadata: __spreadProps(__spreadValues({}, matchedMetaData2), {
            preload: parentPreloads,
            route: matchedMetaData2.route,
            presentInClientRouter: void 0
          })
        }));
      }
      if (!matches.length) {
        yield {
          error: `The route '${stripLeadingSlash(currentRoutePath)}' has a defined matcher but does not match any route in the server routing configuration. Please ensure this route is added to the server routing configuration.`
        };
      }
      continue;
    }
    let matchedMetaData;
    if (serverConfigRouteTree) {
      matchedMetaData = serverConfigRouteTree.match(currentRoutePath);
      if (!matchedMetaData) {
        yield {
          error: `The '${stripLeadingSlash(currentRoutePath)}' route does not match any route defined in the server routing configuration. Please ensure this route is added to the server routing configuration.`
        };
        continue;
      }
      matchedMetaData.presentInClientRouter = true;
    }
    yield* handleRoute(__spreadProps(__spreadValues({}, options), {
      metadata: __spreadProps(__spreadValues({
        renderMode: RenderMode.Prerender
      }, matchedMetaData), {
        preload: parentPreloads,
        // Match Angular router behavior
        // ['one', 'two', ''] -> 'one/two/'
        // ['one', 'two', 'three'] -> 'one/two/three'
        route: path2 === "" ? addTrailingSlash(currentRoutePath) : currentRoutePath,
        presentInClientRouter: void 0
      }),
      currentRoutePath,
      route
    }));
  }
}
function appendPreloadToMetadata(entryName, entryPointToBrowserMapping, metadata) {
  const existingPreloads = metadata.preload ?? [];
  if (!entryPointToBrowserMapping || existingPreloads.length >= MODULE_PRELOAD_MAX) {
    return;
  }
  const preload = entryPointToBrowserMapping[entryName];
  if (!preload?.length) {
    return;
  }
  const combinedPreloads = new Set(existingPreloads);
  for (const href of preload) {
    combinedPreloads.add(href);
    if (combinedPreloads.size === MODULE_PRELOAD_MAX) {
      break;
    }
  }
  metadata.preload = Array.from(combinedPreloads);
}
async function* handleSSGRoute(serverConfigRouteTree, redirectTo, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes) {
  if (metadata.renderMode !== RenderMode.Prerender) {
    throw new Error(`'handleSSGRoute' was called for a route which rendering mode is not prerender.`);
  }
  const _a2 = metadata, { route: currentRoutePath, fallback } = _a2, meta = __objRest(_a2, ["route", "fallback"]);
  const getPrerenderParams = "getPrerenderParams" in meta ? meta.getPrerenderParams : void 0;
  if ("getPrerenderParams" in meta) {
    delete meta["getPrerenderParams"];
  }
  if (redirectTo !== void 0) {
    meta.redirectTo = resolveRedirectTo(currentRoutePath, redirectTo);
  }
  const isCatchAllRoute = CATCH_ALL_REGEXP.test(currentRoutePath);
  if (isCatchAllRoute && !getPrerenderParams || !isCatchAllRoute && !URL_PARAMETER_REGEXP.test(currentRoutePath)) {
    yield __spreadProps(__spreadValues({}, meta), {
      route: currentRoutePath
    });
    return;
  }
  if (invokeGetPrerenderParams) {
    if (!getPrerenderParams) {
      yield {
        error: `The '${stripLeadingSlash(currentRoutePath)}' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing. Please define 'getPrerenderParams' function for this route in your server routing configuration or specify a different 'renderMode'.`
      };
      return;
    }
    if (serverConfigRouteTree) {
      const catchAllRoutePath = isCatchAllRoute ? currentRoutePath : joinUrlParts(currentRoutePath, "**");
      const match = serverConfigRouteTree.match(catchAllRoutePath);
      if (match && match.renderMode === RenderMode.Prerender && !("getPrerenderParams" in match)) {
        serverConfigRouteTree.insert(catchAllRoutePath, __spreadProps(__spreadValues({}, match), {
          presentInClientRouter: true,
          getPrerenderParams
        }));
      }
    }
    const parameters = await runInInjectionContext(parentInjector, () => getPrerenderParams());
    try {
      for (const params of parameters) {
        const replacer = handlePrerenderParamsReplacement(params, currentRoutePath);
        const routeWithResolvedParams = currentRoutePath.replace(URL_PARAMETER_REGEXP, replacer).replace(CATCH_ALL_REGEXP, replacer);
        yield __spreadProps(__spreadValues({}, meta), {
          route: routeWithResolvedParams,
          redirectTo: redirectTo === void 0 ? void 0 : resolveRedirectTo(routeWithResolvedParams, redirectTo)
        });
      }
    } catch (error) {
      yield { error: `${error.message}` };
      return;
    }
  }
  if (includePrerenderFallbackRoutes && (fallback !== PrerenderFallback.None || !invokeGetPrerenderParams)) {
    yield __spreadProps(__spreadValues({}, meta), {
      route: currentRoutePath,
      renderMode: fallback === PrerenderFallback.Client ? RenderMode.Client : RenderMode.Server
    });
  }
}
function handlePrerenderParamsReplacement(params, currentRoutePath) {
  return (match) => {
    const parameterName = match.slice(1);
    const value = params[parameterName];
    if (typeof value !== "string") {
      throw new Error(`The 'getPrerenderParams' function defined for the '${stripLeadingSlash(currentRoutePath)}' route returned a non-string value for parameter '${parameterName}'. Please make sure the 'getPrerenderParams' function returns values for all parameters specified in this route.`);
    }
    return parameterName === "**" ? `/${value}` : value;
  };
}
function resolveRedirectTo(routePath, redirectTo) {
  if (redirectTo[0] === "/") {
    return redirectTo;
  }
  const segments = routePath.replace(URL_PARAMETER_REGEXP, "*").split("/");
  segments.pop();
  return joinUrlParts(...segments, redirectTo);
}
function buildServerConfigRouteTree({ routes, appShellRoute }) {
  const serverRoutes = [...routes];
  if (appShellRoute !== void 0) {
    serverRoutes.unshift({
      path: appShellRoute,
      renderMode: RenderMode.Prerender
    });
  }
  const serverConfigRouteTree = new RouteTree();
  const errors = [];
  for (const _a2 of serverRoutes) {
    const _b = _a2, { path: path2 } = _b, metadata = __objRest(_b, ["path"]);
    if (path2[0] === "/") {
      errors.push(`Invalid '${path2}' route configuration: the path cannot start with a slash.`);
      continue;
    }
    if ("getPrerenderParams" in metadata && (path2.includes("/*/") || path2.endsWith("/*"))) {
      errors.push(`Invalid '${path2}' route configuration: 'getPrerenderParams' cannot be used with a '*' route.`);
      continue;
    }
    serverConfigRouteTree.insert(path2, metadata);
  }
  return { serverConfigRouteTree, errors };
}
async function getRoutesFromAngularRouterConfig(bootstrap, document2, url, invokeGetPrerenderParams = false, includePrerenderFallbackRoutes = true, entryPointToBrowserMapping = void 0) {
  const { protocol, host } = url;
  const platformRef = platformServer([
    {
      provide: INITIAL_CONFIG,
      useValue: { document: document2, url: `${protocol}//${host}/` }
    },
    {
      // An Angular Console Provider that does not print a set of predefined logs.
      provide: Console,
      // Using `useClass` would necessitate decorating `Console` with `@Injectable`,
      // which would require switching from `ts_library` to `ng_module`. This change
      // would also necessitate various patches of `@angular/bazel` to support ESM.
      useFactory: () => new Console2()
    },
    {
      provide: ENABLE_ROOT_COMPONENT_BOOTSTRAP,
      useValue: false
    }
  ]);
  try {
    let applicationRef;
    if (isNgModule(bootstrap)) {
      const moduleRef = await platformRef.bootstrapModule(bootstrap);
      applicationRef = moduleRef.injector.get(ApplicationRef);
    } else {
      applicationRef = await bootstrap({ platformRef });
    }
    const injector = applicationRef.injector;
    const router = injector.get(Router);
    router.navigationTransitions.afterPreactivation()?.next?.();
    await applicationRef.whenStable();
    const errors = [];
    const rawBaseHref = injector.get(APP_BASE_HREF, null, { optional: true }) ?? injector.get(PlatformLocation).getBaseHrefFromDOM();
    const { pathname: baseHref } = new URL(rawBaseHref, "http://localhost");
    const compiler = injector.get(Compiler);
    const serverRoutesConfig = injector.get(SERVER_ROUTES_CONFIG, null, { optional: true });
    let serverConfigRouteTree;
    if (serverRoutesConfig) {
      const result2 = buildServerConfigRouteTree(serverRoutesConfig);
      serverConfigRouteTree = result2.serverConfigRouteTree;
      errors.push(...result2.errors);
    }
    if (errors.length) {
      return {
        baseHref,
        routes: [],
        errors
      };
    }
    const routesResults = [];
    if (router.config.length) {
      const traverseRoutes = traverseRoutesConfig({
        routes: router.config,
        compiler,
        parentInjector: injector,
        parentRoute: "",
        serverConfigRouteTree,
        invokeGetPrerenderParams,
        includePrerenderFallbackRoutes,
        entryPointToBrowserMapping
      });
      const seenRoutes = /* @__PURE__ */ new Set();
      for await (const routeMetadata of traverseRoutes) {
        if ("error" in routeMetadata) {
          errors.push(routeMetadata.error);
          continue;
        }
        const routePath = routeMetadata.route;
        if (!seenRoutes.has(routePath)) {
          routesResults.push(routeMetadata);
          seenRoutes.add(routePath);
        }
      }
      await new Promise((resolve2) => setTimeout(resolve2, 0));
      if (serverConfigRouteTree) {
        for (const { route, presentInClientRouter } of serverConfigRouteTree.traverse()) {
          if (presentInClientRouter || route.endsWith("/**")) {
            continue;
          }
          errors.push(`The '${stripLeadingSlash(route)}' server route does not match any routes defined in the Angular routing configuration (typically provided as a part of the 'provideRouter' call). Please make sure that the mentioned server route is present in the Angular routing configuration.`);
        }
      }
    } else {
      const rootRouteMetadata = serverConfigRouteTree?.match("") ?? {
        route: "",
        renderMode: RenderMode.Prerender
      };
      routesResults.push(__spreadProps(__spreadValues({}, rootRouteMetadata), {
        // Matched route might be `/*` or `/**`, which would make Angular serve all routes rather than just `/`.
        // So we limit to just `/` for the empty app router case.
        route: ""
      }));
    }
    return {
      baseHref,
      routes: routesResults,
      errors,
      appShellRoute: serverRoutesConfig?.appShellRoute
    };
  } finally {
    platformRef.destroy();
  }
}
function extractRoutesAndCreateRouteTree(options) {
  const { url, manifest = getAngularAppManifest(), invokeGetPrerenderParams = false, includePrerenderFallbackRoutes = true, signal } = options;
  async function extract() {
    const routeTree = new RouteTree();
    const document2 = await new ServerAssets(manifest).getIndexServerHtml().text();
    const bootstrap = await manifest.bootstrap();
    const { baseHref, appShellRoute, routes, errors } = await getRoutesFromAngularRouterConfig(bootstrap, document2, url, invokeGetPrerenderParams, includePrerenderFallbackRoutes, manifest.entryPointToBrowserMapping);
    for (const _a2 of routes) {
      const _b = _a2, { route } = _b, metadata = __objRest(_b, ["route"]);
      if (metadata.redirectTo !== void 0) {
        metadata.redirectTo = joinUrlParts(baseHref, metadata.redirectTo);
      }
      for (const [key, value] of Object.entries(metadata)) {
        if (value === void 0) {
          delete metadata[key];
        }
      }
      const fullRoute = joinUrlParts(baseHref, route);
      routeTree.insert(fullRoute, metadata);
    }
    return {
      appShellRoute,
      routeTree,
      errors
    };
  }
  return signal ? promiseWithAbort(extract(), signal, "Routes extraction") : extract();
}
var Hooks = class {
  /**
   * A map of hook names to arrays of hook functions.
   * Each hook name can have multiple associated functions, which are executed in sequence.
   */
  store = /* @__PURE__ */ new Map();
  /**
   * Executes all hooks associated with the specified name, passing the given argument to each hook function.
   * The hooks are invoked sequentially, and the argument may be modified by each hook.
   *
   * @template Hook - The type of the hook name. It should be one of the keys of `HooksMapping`.
   * @param name - The name of the hook whose functions will be executed.
   * @param context - The input value to be passed to each hook function. The value is mutated by each hook function.
   * @returns A promise that resolves once all hook functions have been executed.
   *
   * @example
   * ```typescript
   * const hooks = new Hooks();
   * hooks.on('html:transform:pre', async (ctx) => {
   *   ctx.html = ctx.html.replace(/foo/g, 'bar');
   *   return ctx.html;
   * });
   * const result = await hooks.run('html:transform:pre', { html: '<div>foo</div>' });
   * console.log(result); // '<div>bar</div>'
   * ```
   * @internal
   */
  async run(name, context) {
    const hooks = this.store.get(name);
    switch (name) {
      case "html:transform:pre": {
        if (!hooks) {
          return context.html;
        }
        const ctx = __spreadValues({}, context);
        for (const hook of hooks) {
          ctx.html = await hook(ctx);
        }
        return ctx.html;
      }
      default:
        throw new Error(`Running hook "${name}" is not supported.`);
    }
  }
  /**
   * Registers a new hook function under the specified hook name.
   * This function should be a function that takes an argument of type `T` and returns a `string` or `Promise<string>`.
   *
   * @template Hook - The type of the hook name. It should be one of the keys of `HooksMapping`.
   * @param name - The name of the hook under which the function will be registered.
   * @param handler - A function to be executed when the hook is triggered. The handler will be called with an argument
   *                  that may be modified by the hook functions.
   *
   * @remarks
   * - If there are existing handlers registered under the given hook name, the new handler will be added to the list.
   * - If no handlers are registered under the given hook name, a new list will be created with the handler as its first element.
   *
   * @example
   * ```typescript
   * hooks.on('html:transform:pre', async (ctx) => {
   *   return ctx.html.replace(/foo/g, 'bar');
   * });
   * ```
   */
  on(name, handler) {
    const hooks = this.store.get(name);
    if (hooks) {
      hooks.push(handler);
    } else {
      this.store.set(name, [handler]);
    }
  }
  /**
   * Checks if there are any hooks registered under the specified name.
   *
   * @param name - The name of the hook to check.
   * @returns `true` if there are hooks registered under the specified name, otherwise `false`.
   */
  has(name) {
    return !!this.store.get(name)?.length;
  }
};
var ServerRouter = class _ServerRouter {
  routeTree;
  /**
   * Creates an instance of the `ServerRouter`.
   *
   * @param routeTree - An instance of `RouteTree` that holds the routing information.
   * The `RouteTree` is used to match request URLs to the appropriate route metadata.
   */
  constructor(routeTree) {
    this.routeTree = routeTree;
  }
  /**
   * Static property to track the ongoing build promise.
   */
  static #extractionPromise;
  /**
   * Creates or retrieves a `ServerRouter` instance based on the provided manifest and URL.
   *
   * If the manifest contains pre-built routes, a new `ServerRouter` is immediately created.
   * Otherwise, it builds the router by extracting routes from the Angular configuration
   * asynchronously. This method ensures that concurrent builds are prevented by re-using
   * the same promise.
   *
   * @param manifest - An instance of `AngularAppManifest` that contains the route information.
   * @param url - The URL for server-side rendering. The URL is needed to configure `ServerPlatformLocation`.
   * This is necessary to ensure that API requests for relative paths succeed, which is crucial for correct route extraction.
   * [Reference](https://github.com/angular/angular/blob/d608b857c689d17a7ffa33bbb510301014d24a17/packages/platform-server/src/location.ts#L51)
   * @returns A promise resolving to a `ServerRouter` instance.
   */
  static from(manifest, url) {
    if (manifest.routes) {
      const routeTree = RouteTree.fromObject(manifest.routes);
      return Promise.resolve(new _ServerRouter(routeTree));
    }
    _ServerRouter.#extractionPromise ??= extractRoutesAndCreateRouteTree({ url, manifest }).then(({ routeTree, errors }) => {
      if (errors.length > 0) {
        throw new Error("Error(s) occurred while extracting routes:\n" + errors.map((error) => `- ${error}`).join("\n"));
      }
      return new _ServerRouter(routeTree);
    }).finally(() => {
      _ServerRouter.#extractionPromise = void 0;
    });
    return _ServerRouter.#extractionPromise;
  }
  /**
   * Matches a request URL against the route tree to retrieve route metadata.
   *
   * This method strips 'index.html' from the URL if it is present and then attempts
   * to find a match in the route tree. If a match is found, it returns the associated
   * route metadata; otherwise, it returns `undefined`.
   *
   * @param url - The URL to be matched against the route tree.
   * @returns The metadata for the matched route or `undefined` if no match is found.
   */
  match(url) {
    let { pathname } = stripIndexHtmlFromURL(url);
    pathname = stripMatrixParams(pathname);
    pathname = decodeURIComponent(pathname);
    return this.routeTree.match(pathname);
  }
};
async function sha256(data) {
  const encodedData = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
  const hashParts = [];
  for (const h of new Uint8Array(hashBuffer)) {
    hashParts.push(h.toString(16).padStart(2, "0"));
  }
  return hashParts.join("");
}
var MEDIA_SET_HANDLER_PATTERN = /^this\.media=["'](.*)["'];?$/;
var CSP_MEDIA_ATTR = "ngCspMedia";
var LINK_LOAD_SCRIPT_CONTENT = (() => `(() => {
  const CSP_MEDIA_ATTR = '${CSP_MEDIA_ATTR}';
  const documentElement = document.documentElement;

  // Listener for load events on link tags.
  const listener = (e) => {
    const target = e.target;
    if (
      !target ||
      target.tagName !== 'LINK' ||
      !target.hasAttribute(CSP_MEDIA_ATTR)
    ) {
      return;
    }

    target.media = target.getAttribute(CSP_MEDIA_ATTR);
    target.removeAttribute(CSP_MEDIA_ATTR);

    if (!document.head.querySelector(\`link[\${CSP_MEDIA_ATTR}]\`)) {
      documentElement.removeEventListener('load', listener);
    }
  };

  documentElement.addEventListener('load', listener, true);
})();`)();
var BeastiesBase = class extends Beasties {
};
var InlineCriticalCssProcessor = class extends BeastiesBase {
  readFile;
  outputPath;
  addedCspScriptsDocuments = /* @__PURE__ */ new WeakSet();
  documentNonces = /* @__PURE__ */ new WeakMap();
  constructor(readFile2, outputPath) {
    super({
      logger: {
        // eslint-disable-next-line no-console
        warn: (s) => console.warn(s),
        // eslint-disable-next-line no-console
        error: (s) => console.error(s),
        info: () => {
        }
      },
      logLevel: "warn",
      path: outputPath,
      publicPath: void 0,
      compress: false,
      pruneSource: false,
      reduceInlineStyles: false,
      mergeStylesheets: false,
      // Note: if `preload` changes to anything other than `media`, the logic in
      // `embedLinkedStylesheet` will have to be updated.
      preload: "media",
      noscriptFallback: true,
      inlineFonts: true
    });
    this.readFile = readFile2;
    this.outputPath = outputPath;
  }
  /**
   * Override of the Beasties `embedLinkedStylesheet` method
   * that makes it work with Angular's CSP APIs.
   */
  async embedLinkedStylesheet(link2, document2) {
    if (link2.getAttribute("media") === "print" && link2.next?.name === "noscript") {
      const media = link2.getAttribute("onload")?.match(MEDIA_SET_HANDLER_PATTERN);
      if (media) {
        link2.removeAttribute("onload");
        link2.setAttribute("media", media[1]);
        link2?.next?.remove();
      }
    }
    const returnValue = await super.embedLinkedStylesheet(link2, document2);
    const cspNonce = this.findCspNonce(document2);
    if (cspNonce) {
      const beastiesMedia = link2.getAttribute("onload")?.match(MEDIA_SET_HANDLER_PATTERN);
      if (beastiesMedia) {
        link2.removeAttribute("onload");
        link2.setAttribute(CSP_MEDIA_ATTR, beastiesMedia[1]);
        this.conditionallyInsertCspLoadingScript(document2, cspNonce, link2);
      }
      document2.head.children.forEach((child) => {
        if (child.tagName === "style" && !child.hasAttribute("nonce")) {
          child.setAttribute("nonce", cspNonce);
        }
      });
    }
    return returnValue;
  }
  /**
   * Finds the CSP nonce for a specific document.
   */
  findCspNonce(document2) {
    if (this.documentNonces.has(document2)) {
      return this.documentNonces.get(document2);
    }
    const nonceElement = document2.querySelector("[ngCspNonce], [ngcspnonce]");
    const cspNonce = nonceElement?.getAttribute("ngCspNonce") || nonceElement?.getAttribute("ngcspnonce") || null;
    this.documentNonces.set(document2, cspNonce);
    return cspNonce;
  }
  /**
   * Inserts the `script` tag that swaps the critical CSS at runtime,
   * if one hasn't been inserted into the document already.
   */
  conditionallyInsertCspLoadingScript(document2, nonce, link2) {
    if (this.addedCspScriptsDocuments.has(document2)) {
      return;
    }
    if (document2.head.textContent.includes(LINK_LOAD_SCRIPT_CONTENT)) {
      this.addedCspScriptsDocuments.add(document2);
      return;
    }
    const script = document2.createElement("script");
    script.setAttribute("nonce", nonce);
    script.textContent = LINK_LOAD_SCRIPT_CONTENT;
    document2.head.insertBefore(script, link2);
    this.addedCspScriptsDocuments.add(document2);
  }
};
var LRUCache = class {
  /**
   * The maximum number of items the cache can hold.
   */
  capacity;
  /**
   * Internal storage for the cache, mapping keys to their associated nodes in the linked list.
   */
  cache = /* @__PURE__ */ new Map();
  /**
   * Head of the doubly linked list, representing the most recently used item.
   */
  head;
  /**
   * Tail of the doubly linked list, representing the least recently used item.
   */
  tail;
  /**
   * Creates a new LRUCache instance.
   * @param capacity The maximum number of items the cache can hold.
   */
  constructor(capacity) {
    this.capacity = capacity;
  }
  /**
   * Gets the value associated with the given key.
   * @param key The key to retrieve the value for.
   * @returns The value associated with the key, or undefined if the key is not found.
   */
  get(key) {
    const node2 = this.cache.get(key);
    if (node2) {
      this.moveToHead(node2);
      return node2.value;
    }
    return void 0;
  }
  /**
   * Puts a key-value pair into the cache.
   * If the key already exists, the value is updated.
   * If the cache is full, the least recently used item is evicted.
   * @param key The key to insert or update.
   * @param value The value to associate with the key.
   */
  put(key, value) {
    const cachedNode = this.cache.get(key);
    if (cachedNode) {
      cachedNode.value = value;
      this.moveToHead(cachedNode);
      return;
    }
    const newNode = { key, value, prev: void 0, next: void 0 };
    this.cache.set(key, newNode);
    this.addToHead(newNode);
    if (this.cache.size > this.capacity) {
      const tail = this.removeTail();
      if (tail) {
        this.cache.delete(tail.key);
      }
    }
  }
  /**
   * Adds a node to the head of the linked list.
   * @param node The node to add.
   */
  addToHead(node2) {
    node2.next = this.head;
    node2.prev = void 0;
    if (this.head) {
      this.head.prev = node2;
    }
    this.head = node2;
    if (!this.tail) {
      this.tail = node2;
    }
  }
  /**
   * Removes a node from the linked list.
   * @param node The node to remove.
   */
  removeNode(node2) {
    if (node2.prev) {
      node2.prev.next = node2.next;
    } else {
      this.head = node2.next;
    }
    if (node2.next) {
      node2.next.prev = node2.prev;
    } else {
      this.tail = node2.prev;
    }
  }
  /**
   * Moves a node to the head of the linked list.
   * @param node The node to move.
   */
  moveToHead(node2) {
    this.removeNode(node2);
    this.addToHead(node2);
  }
  /**
   * Removes the tail node from the linked list.
   * @returns The removed tail node, or undefined if the list is empty.
   */
  removeTail() {
    const node2 = this.tail;
    if (node2) {
      this.removeNode(node2);
    }
    return node2;
  }
};
var MAX_INLINE_CSS_CACHE_ENTRIES = 50;
var SERVER_CONTEXT_VALUE = {
  [RenderMode.Prerender]: "ssg",
  [RenderMode.Server]: "ssr",
  [RenderMode.Client]: ""
};
var AngularServerApp = class {
  options;
  /**
   * Whether prerendered routes should be rendered on demand or served directly.
   *
   * @see {@link AngularServerAppOptions.allowStaticRouteRender} for more details.
   */
  allowStaticRouteRender;
  /**
   * Hooks for extending or modifying server behavior.
   *
   * @see {@link AngularServerAppOptions.hooks} for more details.
   */
  hooks;
  /**
   * Constructs an instance of `AngularServerApp`.
   *
   * @param options Optional configuration options for the server application.
   */
  constructor(options = {}) {
    this.options = options;
    this.allowStaticRouteRender = this.options.allowStaticRouteRender ?? false;
    this.hooks = options.hooks ?? new Hooks();
    if (this.manifest.inlineCriticalCss) {
      this.inlineCriticalCssProcessor = new InlineCriticalCssProcessor((path2) => {
        const fileName = path2.split("/").pop() ?? path2;
        return this.assets.getServerAsset(fileName).text();
      });
    }
  }
  /**
   * The manifest associated with this server application.
   */
  manifest = getAngularAppManifest();
  /**
   * An instance of ServerAsset that handles server-side asset.
   */
  assets = new ServerAssets(this.manifest);
  /**
   * The router instance used for route matching and handling.
   */
  router;
  /**
   * The `inlineCriticalCssProcessor` is responsible for handling critical CSS inlining.
   */
  inlineCriticalCssProcessor;
  /**
   * The bootstrap mechanism for the server application.
   */
  boostrap;
  /**
   * Decorder used to convert a string to a Uint8Array.
   */
  textDecoder = new TextEncoder();
  /**
   * A cache that stores critical CSS to avoid re-processing for every request, improving performance.
   * This cache uses a Least Recently Used (LRU) eviction policy.
   *
   * @see {@link MAX_INLINE_CSS_CACHE_ENTRIES} for the maximum number of entries this cache can hold.
   */
  criticalCssLRUCache = new LRUCache(MAX_INLINE_CSS_CACHE_ENTRIES);
  /**
   * Handles an incoming HTTP request by serving prerendered content, performing server-side rendering,
   * or delivering a static file for client-side rendered routes based on the `RenderMode` setting.
   *
   * @param request - The HTTP request to handle.
   * @param requestContext - Optional context for rendering, such as metadata associated with the request.
   * @returns A promise that resolves to the resulting HTTP response object, or `null` if no matching Angular route is found.
   *
   * @remarks A request to `https://www.example.com/page/index.html` will serve or render the Angular route
   * corresponding to `https://www.example.com/page`.
   */
  async handle(request, requestContext) {
    const url = new URL(request.url);
    this.router ??= await ServerRouter.from(this.manifest, url);
    const matchedRoute = this.router.match(url);
    if (!matchedRoute) {
      return null;
    }
    const { redirectTo, status, renderMode } = matchedRoute;
    if (redirectTo !== void 0) {
      return createRedirectResponse(buildPathWithParams(redirectTo, url.pathname), status);
    }
    if (renderMode === RenderMode.Prerender) {
      const response = await this.handleServe(request, matchedRoute);
      if (response) {
        return response;
      }
    }
    return promiseWithAbort(this.handleRendering(request, matchedRoute, requestContext), request.signal, `Request for: ${request.url}`);
  }
  /**
   * Handles serving a prerendered static asset if available for the matched route.
   *
   * This method only supports `GET` and `HEAD` requests.
   *
   * @param request - The incoming HTTP request for serving a static page.
   * @param matchedRoute - The metadata of the matched route for rendering.
   * @returns A promise that resolves to a `Response` object if the prerendered page is found, or `null`.
   */
  async handleServe(request, matchedRoute) {
    const { headers, renderMode } = matchedRoute;
    if (renderMode !== RenderMode.Prerender) {
      return null;
    }
    const { method } = request;
    if (method !== "GET" && method !== "HEAD") {
      return null;
    }
    const assetPath = this.buildServerAssetPathFromRequest(request);
    const { manifest: { locale }, assets } = this;
    if (!assets.hasServerAsset(assetPath)) {
      return null;
    }
    const { text, hash, size } = assets.getServerAsset(assetPath);
    const etag = `"${hash}"`;
    return request.headers.get("if-none-match") === etag ? new Response(void 0, { status: 304, statusText: "Not Modified" }) : new Response(await text(), {
      headers: __spreadValues(__spreadValues({
        "Content-Length": size.toString(),
        "ETag": etag,
        "Content-Type": "text/html;charset=UTF-8"
      }, locale !== void 0 ? { "Content-Language": locale } : {}), headers)
    });
  }
  /**
   * Handles the server-side rendering process for the given HTTP request.
   * This method matches the request URL to a route and performs rendering if a matching route is found.
   *
   * @param request - The incoming HTTP request to be processed.
   * @param matchedRoute - The metadata of the matched route for rendering.
   * @param requestContext - Optional additional context for rendering, such as request metadata.
   *
   * @returns A promise that resolves to the rendered response, or null if no matching route is found.
   */
  async handleRendering(request, matchedRoute, requestContext) {
    const { renderMode, headers, status, preload } = matchedRoute;
    if (!this.allowStaticRouteRender && renderMode === RenderMode.Prerender) {
      return null;
    }
    const url = new URL(request.url);
    const platformProviders = [];
    const { manifest: { bootstrap, locale }, assets } = this;
    const responseInit = {
      status,
      headers: new Headers(__spreadValues(__spreadValues({
        "Content-Type": "text/html;charset=UTF-8"
      }, locale !== void 0 ? { "Content-Language": locale } : {}), headers))
    };
    if (renderMode === RenderMode.Server) {
      platformProviders.push({
        provide: REQUEST,
        useValue: request
      }, {
        provide: REQUEST_CONTEXT,
        useValue: requestContext
      }, {
        provide: RESPONSE_INIT,
        useValue: responseInit
      });
    } else if (renderMode === RenderMode.Client) {
      let html2 = await this.assets.getServerAsset("index.csr.html").text();
      html2 = await this.runTransformsOnHtml(html2, url, preload);
      return new Response(html2, responseInit);
    }
    if (locale !== void 0) {
      platformProviders.push({
        provide: LOCALE_ID,
        useValue: locale
      });
    }
    this.boostrap ??= await bootstrap();
    let html = await assets.getIndexServerHtml().text();
    html = await this.runTransformsOnHtml(html, url, preload);
    const result2 = await renderAngular(html, this.boostrap, url, platformProviders, SERVER_CONTEXT_VALUE[renderMode]);
    if (result2.hasNavigationError) {
      return null;
    }
    if (result2.redirectTo) {
      return createRedirectResponse(result2.redirectTo, status);
    }
    if (renderMode === RenderMode.Prerender) {
      const renderedHtml = await result2.content();
      const finalHtml = await this.inlineCriticalCss(renderedHtml, url);
      return new Response(finalHtml, responseInit);
    }
    const stream = new ReadableStream({
      start: async (controller) => {
        const renderedHtml = await result2.content();
        const finalHtml = await this.inlineCriticalCssWithCache(renderedHtml, url);
        controller.enqueue(finalHtml);
        controller.close();
      }
    });
    return new Response(stream, responseInit);
  }
  /**
   * Inlines critical CSS into the given HTML content.
   *
   * @param html The HTML content to process.
   * @param url The URL associated with the request, for logging purposes.
   * @returns A promise that resolves to the HTML with inlined critical CSS.
   */
  async inlineCriticalCss(html, url) {
    const { inlineCriticalCssProcessor } = this;
    if (!inlineCriticalCssProcessor) {
      return html;
    }
    try {
      return await inlineCriticalCssProcessor.process(html);
    } catch (error) {
      console.error(`An error occurred while inlining critical CSS for: ${url}.`, error);
      return html;
    }
  }
  /**
   * Inlines critical CSS into the given HTML content.
   * This method uses a cache to avoid reprocessing the same HTML content multiple times.
   *
   * @param html The HTML content to process.
   * @param url The URL associated with the request, for logging purposes.
   * @returns A promise that resolves to the HTML with inlined critical CSS.
   */
  async inlineCriticalCssWithCache(html, url) {
    const { inlineCriticalCssProcessor, criticalCssLRUCache, textDecoder } = this;
    if (!inlineCriticalCssProcessor) {
      return textDecoder.encode(html);
    }
    const cacheKey = url.toString();
    const cached = criticalCssLRUCache.get(cacheKey);
    const shaOfContentPreInlinedCss = await sha256(html);
    if (cached?.shaOfContentPreInlinedCss === shaOfContentPreInlinedCss) {
      return cached.contentWithCriticialCSS;
    }
    const processedHtml = await this.inlineCriticalCss(html, url);
    const finalHtml = textDecoder.encode(processedHtml);
    criticalCssLRUCache.put(cacheKey, {
      shaOfContentPreInlinedCss,
      contentWithCriticialCSS: finalHtml
    });
    return finalHtml;
  }
  /**
   * Constructs the asset path on the server based on the provided HTTP request.
   *
   * This method processes the incoming request URL to derive a path corresponding
   * to the requested asset. It ensures the path points to the correct file (e.g.,
   * `index.html`) and removes any base href if it is not part of the asset path.
   *
   * @param request - The incoming HTTP request object.
   * @returns The server-relative asset path derived from the request.
   */
  buildServerAssetPathFromRequest(request) {
    let { pathname: assetPath } = new URL(request.url);
    if (!assetPath.endsWith("/index.html")) {
      assetPath = joinUrlParts(assetPath, "index.html");
    }
    const { baseHref } = this.manifest;
    if (baseHref.length > 1 && assetPath.startsWith(baseHref)) {
      assetPath = assetPath.slice(baseHref.length);
    }
    return stripLeadingSlash(assetPath);
  }
  /**
   * Runs the registered transform hooks on the given HTML content.
   *
   * @param html - The raw HTML content to be transformed.
   * @param url - The URL associated with the HTML content, used for context during transformations.
   * @param preload - An array of URLs representing the JavaScript resources to preload.
   * @returns A promise that resolves to the transformed HTML string.
   */
  async runTransformsOnHtml(html, url, preload) {
    if (this.hooks.has("html:transform:pre")) {
      html = await this.hooks.run("html:transform:pre", { html, url });
    }
    if (preload?.length) {
      html = appendPreloadHintsToHtml(html, preload);
    }
    return html;
  }
};
var angularServerApp;
function getOrCreateAngularServerApp(options) {
  return angularServerApp ??= new AngularServerApp(options);
}
function destroyAngularServerApp() {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    resetCompiledComponents();
  }
  angularServerApp = void 0;
}
function appendPreloadHintsToHtml(html, preload) {
  const bodyCloseIdx = html.lastIndexOf("</body>");
  if (bodyCloseIdx === -1) {
    return html;
  }
  return [
    html.slice(0, bodyCloseIdx),
    ...preload.map((val) => `<link rel="modulepreload" href="${val}">`),
    html.slice(bodyCloseIdx)
  ].join("\n");
}
function createRedirectResponse(location, status = 302) {
  return new Response(null, {
    status,
    headers: {
      "Location": location
    }
  });
}
function getPotentialLocaleIdFromUrl(url, basePath) {
  const { pathname } = url;
  let start = basePath.length;
  if (pathname[start] === "/") {
    start++;
  }
  let end = pathname.indexOf("/", start);
  if (end === -1) {
    end = pathname.length;
  }
  return pathname.slice(start, end);
}
function parseLanguageHeader(header) {
  if (header === "*") {
    return /* @__PURE__ */ new Map([["*", 1]]);
  }
  const parsedValues = header.split(",").map((item) => {
    const [locale, qualityValue] = item.split(";", 2).map((v) => v.trim());
    let quality = qualityValue?.startsWith("q=") ? parseFloat(qualityValue.slice(2)) : void 0;
    if (typeof quality !== "number" || isNaN(quality) || quality < 0 || quality > 1) {
      quality = 1;
    }
    return [locale, quality];
  }).sort(([_localeA, qualityA], [_localeB, qualityB]) => qualityB - qualityA);
  return new Map(parsedValues);
}
function getPreferredLocale(header, supportedLocales) {
  if (supportedLocales.length < 2) {
    return supportedLocales[0];
  }
  const parsedLocales = parseLanguageHeader(header);
  if (parsedLocales.size === 0 || parsedLocales.size === 1 && parsedLocales.has("*")) {
    return supportedLocales[0];
  }
  const normalizedSupportedLocales = /* @__PURE__ */ new Map();
  for (const locale of supportedLocales) {
    normalizedSupportedLocales.set(normalizeLocale(locale), locale);
  }
  let bestMatch;
  const qualityZeroNormalizedLocales = /* @__PURE__ */ new Set();
  for (const [locale, quality] of parsedLocales) {
    const normalizedLocale = normalizeLocale(locale);
    if (quality === 0) {
      qualityZeroNormalizedLocales.add(normalizedLocale);
      continue;
    }
    if (normalizedSupportedLocales.has(normalizedLocale)) {
      return normalizedSupportedLocales.get(normalizedLocale);
    }
    if (bestMatch !== void 0) {
      continue;
    }
    const [languagePrefix] = normalizedLocale.split("-", 1);
    for (const supportedLocale of normalizedSupportedLocales.keys()) {
      if (supportedLocale.startsWith(languagePrefix)) {
        bestMatch = normalizedSupportedLocales.get(supportedLocale);
        break;
      }
    }
  }
  if (bestMatch !== void 0) {
    return bestMatch;
  }
  for (const [normalizedLocale, locale] of normalizedSupportedLocales) {
    if (!qualityZeroNormalizedLocales.has(normalizedLocale)) {
      return locale;
    }
  }
}
function normalizeLocale(locale) {
  return locale.toLowerCase();
}
var AngularAppEngine = class _AngularAppEngine {
  /**
   * A flag to enable or disable the rendering of prerendered routes.
   *
   * Typically used during development to avoid prerendering all routes ahead of time,
   * allowing them to be rendered on the fly as requested.
   *
   * @private
   */
  static ɵallowStaticRouteRender = false;
  /**
   * Hooks for extending or modifying the behavior of the server application.
   * These hooks are used by the Angular CLI when running the development server and
   * provide extensibility points for the application lifecycle.
   *
   * @private
   */
  static ɵhooks = new Hooks();
  /**
   * The manifest for the server application.
   */
  manifest = getAngularAppEngineManifest();
  /**
   * A map of supported locales from the server application's manifest.
   */
  supportedLocales = Object.keys(this.manifest.supportedLocales);
  /**
   * A cache that holds entry points, keyed by their potential locale string.
   */
  entryPointsCache = /* @__PURE__ */ new Map();
  /**
   * Handles an incoming HTTP request by serving prerendered content, performing server-side rendering,
   * or delivering a static file for client-side rendered routes based on the `RenderMode` setting.
   *
   * @param request - The HTTP request to handle.
   * @param requestContext - Optional context for rendering, such as metadata associated with the request.
   * @returns A promise that resolves to the resulting HTTP response object, or `null` if no matching Angular route is found.
   *
   * @remarks A request to `https://www.example.com/page/index.html` will serve or render the Angular route
   * corresponding to `https://www.example.com/page`.
   */
  async handle(request, requestContext) {
    const serverApp = await this.getAngularServerAppForRequest(request);
    if (serverApp) {
      return serverApp.handle(request, requestContext);
    }
    if (this.supportedLocales.length > 1) {
      return this.redirectBasedOnAcceptLanguage(request);
    }
    return null;
  }
  /**
   * Handles requests for the base path when i18n is enabled.
   * Redirects the user to a locale-specific path based on the `Accept-Language` header.
   *
   * @param request The incoming request.
   * @returns A `Response` object with a 302 redirect, or `null` if i18n is not enabled
   *          or the request is not for the base path.
   */
  redirectBasedOnAcceptLanguage(request) {
    const { basePath, supportedLocales } = this.manifest;
    const { pathname } = new URL(request.url);
    if (pathname !== basePath) {
      return null;
    }
    const preferredLocale = getPreferredLocale(request.headers.get("Accept-Language") || "*", this.supportedLocales);
    if (preferredLocale) {
      const subPath = supportedLocales[preferredLocale];
      if (subPath !== void 0) {
        return new Response(null, {
          status: 302,
          // Use a 302 redirect as language preference may change.
          headers: {
            "Location": joinUrlParts(pathname, subPath),
            "Vary": "Accept-Language"
          }
        });
      }
    }
    return null;
  }
  /**
   * Retrieves the Angular server application instance for a given request.
   *
   * This method checks if the request URL corresponds to an Angular application entry point.
   * If so, it initializes or retrieves an instance of the Angular server application for that entry point.
   * Requests that resemble file requests (except for `/index.html`) are skipped.
   *
   * @param request - The incoming HTTP request object.
   * @returns A promise that resolves to an `AngularServerApp` instance if a valid entry point is found,
   * or `null` if no entry point matches the request URL.
   */
  async getAngularServerAppForRequest(request) {
    const url = new URL(request.url);
    const entryPoint = await this.getEntryPointExportsForUrl(url);
    if (!entryPoint) {
      return null;
    }
    const ɵgetOrCreateAngularServerApp = entryPoint.ɵgetOrCreateAngularServerApp;
    const serverApp = ɵgetOrCreateAngularServerApp({
      allowStaticRouteRender: _AngularAppEngine.ɵallowStaticRouteRender,
      hooks: _AngularAppEngine.ɵhooks
    });
    return serverApp;
  }
  /**
   * Retrieves the exports for a specific entry point, caching the result.
   *
   * @param potentialLocale - The locale string used to find the corresponding entry point.
   * @returns A promise that resolves to the entry point exports or `undefined` if not found.
   */
  getEntryPointExports(potentialLocale) {
    const cachedEntryPoint = this.entryPointsCache.get(potentialLocale);
    if (cachedEntryPoint) {
      return cachedEntryPoint;
    }
    const { entryPoints } = this.manifest;
    const entryPoint = entryPoints[potentialLocale];
    if (!entryPoint) {
      return void 0;
    }
    const entryPointExports = entryPoint();
    this.entryPointsCache.set(potentialLocale, entryPointExports);
    return entryPointExports;
  }
  /**
   * Retrieves the entry point for a given URL by determining the locale and mapping it to
   * the appropriate application bundle.
   *
   * This method determines the appropriate entry point and locale for rendering the application by examining the URL.
   * If there is only one entry point available, it is returned regardless of the URL.
   * Otherwise, the method extracts a potential locale identifier from the URL and looks up the corresponding entry point.
   *
   * @param url - The URL of the request.
   * @returns A promise that resolves to the entry point exports or `undefined` if not found.
   */
  getEntryPointExportsForUrl(url) {
    const { basePath, supportedLocales } = this.manifest;
    if (this.supportedLocales.length === 1) {
      return this.getEntryPointExports(supportedLocales[this.supportedLocales[0]]);
    }
    const potentialLocale = getPotentialLocaleIdFromUrl(url, basePath);
    return this.getEntryPointExports(potentialLocale) ?? this.getEntryPointExports("");
  }
};
function createRequestHandler(handler) {
  handler["__ng_request_handler__"] = true;
  return handler;
}

export {
  SERVER_CONTEXT,
  renderModule,
  renderApplication,
  setAngularAppManifest,
  setAngularAppEngineManifest,
  RenderMode,
  PrerenderFallback,
  withRoutes,
  withAppShell,
  provideServerRendering2 as provideServerRendering,
  getRoutesFromAngularRouterConfig,
  extractRoutesAndCreateRouteTree,
  InlineCriticalCssProcessor,
  getOrCreateAngularServerApp,
  destroyAngularServerApp,
  AngularAppEngine,
  createRequestHandler
};
/*! Bundled license information:

@angular/platform-server/fesm2022/server.mjs:
@angular/platform-server/fesm2022/platform-server.mjs:
  (**
   * @license Angular v20.3.10
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-TSPNSGTX.js.map
