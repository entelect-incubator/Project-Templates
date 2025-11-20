import { createSignal, render, lazy, setupStyleSheet, createComponent, mergeProps } from './chunk/CXOMC62J.js';

// src/TanstackQueryDevtools.tsx
var TanstackQueryDevtools = class {
  #client;
  #onlineManager;
  #queryFlavor;
  #version;
  #isMounted = false;
  #styleNonce;
  #shadowDOMTarget;
  #buttonPosition;
  #position;
  #initialIsOpen;
  #errorTypes;
  #hideDisabledQueries;
  #Component;
  #dispose;
  constructor(config) {
    const {
      client,
      queryFlavor,
      version,
      onlineManager,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      hideDisabledQueries
    } = config;
    this.#client = createSignal(client);
    this.#queryFlavor = queryFlavor;
    this.#version = version;
    this.#onlineManager = onlineManager;
    this.#styleNonce = styleNonce;
    this.#shadowDOMTarget = shadowDOMTarget;
    this.#buttonPosition = createSignal(buttonPosition);
    this.#position = createSignal(position);
    this.#initialIsOpen = createSignal(initialIsOpen);
    this.#errorTypes = createSignal(errorTypes);
    this.#hideDisabledQueries = createSignal(hideDisabledQueries);
  }
  setButtonPosition(position) {
    this.#buttonPosition[1](position);
  }
  setPosition(position) {
    this.#position[1](position);
  }
  setInitialIsOpen(isOpen) {
    this.#initialIsOpen[1](isOpen);
  }
  setErrorTypes(errorTypes) {
    this.#errorTypes[1](errorTypes);
  }
  setClient(client) {
    this.#client[1](client);
  }
  mount(el) {
    if (this.#isMounted) {
      throw new Error("Devtools is already mounted");
    }
    const dispose = render(() => {
      const _self$ = this;
      const [btnPosition] = this.#buttonPosition;
      const [pos] = this.#position;
      const [isOpen] = this.#initialIsOpen;
      const [errors] = this.#errorTypes;
      const [hideDisabledQueries] = this.#hideDisabledQueries;
      const [queryClient] = this.#client;
      let Devtools;
      if (this.#Component) {
        Devtools = this.#Component;
      } else {
        Devtools = lazy(() => import('./DevtoolsComponent/6ELMOJL2.js'));
        this.#Component = Devtools;
      }
      setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
      return createComponent(Devtools, mergeProps({
        get queryFlavor() {
          return _self$.#queryFlavor;
        },
        get version() {
          return _self$.#version;
        },
        get onlineManager() {
          return _self$.#onlineManager;
        },
        get shadowDOMTarget() {
          return _self$.#shadowDOMTarget;
        }
      }, {
        get client() {
          return queryClient();
        },
        get buttonPosition() {
          return btnPosition();
        },
        get position() {
          return pos();
        },
        get initialIsOpen() {
          return isOpen();
        },
        get errorTypes() {
          return errors();
        },
        get hideDisabledQueries() {
          return hideDisabledQueries();
        }
      }));
    }, el);
    this.#isMounted = true;
    this.#dispose = dispose;
  }
  unmount() {
    if (!this.#isMounted) {
      throw new Error("Devtools is not mounted");
    }
    this.#dispose?.();
    this.#isMounted = false;
  }
};

// src/TanstackQueryDevtoolsPanel.tsx
var TanstackQueryDevtoolsPanel = class {
  #client;
  #onlineManager;
  #queryFlavor;
  #version;
  #isMounted = false;
  #styleNonce;
  #shadowDOMTarget;
  #buttonPosition;
  #position;
  #initialIsOpen;
  #errorTypes;
  #hideDisabledQueries;
  #onClose;
  #Component;
  #dispose;
  constructor(config) {
    const {
      client,
      queryFlavor,
      version,
      onlineManager,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      onClose,
      hideDisabledQueries
    } = config;
    this.#client = createSignal(client);
    this.#queryFlavor = queryFlavor;
    this.#version = version;
    this.#onlineManager = onlineManager;
    this.#styleNonce = styleNonce;
    this.#shadowDOMTarget = shadowDOMTarget;
    this.#buttonPosition = createSignal(buttonPosition);
    this.#position = createSignal(position);
    this.#initialIsOpen = createSignal(initialIsOpen);
    this.#errorTypes = createSignal(errorTypes);
    this.#hideDisabledQueries = createSignal(hideDisabledQueries);
    this.#onClose = createSignal(onClose);
  }
  setButtonPosition(position) {
    this.#buttonPosition[1](position);
  }
  setPosition(position) {
    this.#position[1](position);
  }
  setInitialIsOpen(isOpen) {
    this.#initialIsOpen[1](isOpen);
  }
  setErrorTypes(errorTypes) {
    this.#errorTypes[1](errorTypes);
  }
  setClient(client) {
    this.#client[1](client);
  }
  setOnClose(onClose) {
    this.#onClose[1](() => onClose);
  }
  mount(el) {
    if (this.#isMounted) {
      throw new Error("Devtools is already mounted");
    }
    const dispose = render(() => {
      const _self$ = this;
      const [btnPosition] = this.#buttonPosition;
      const [pos] = this.#position;
      const [isOpen] = this.#initialIsOpen;
      const [errors] = this.#errorTypes;
      const [hideDisabledQueries] = this.#hideDisabledQueries;
      const [queryClient] = this.#client;
      const [onClose] = this.#onClose;
      let Devtools;
      if (this.#Component) {
        Devtools = this.#Component;
      } else {
        Devtools = lazy(() => import('./DevtoolsPanelComponent/PULY4AJ7.js'));
        this.#Component = Devtools;
      }
      setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
      return createComponent(Devtools, mergeProps({
        get queryFlavor() {
          return _self$.#queryFlavor;
        },
        get version() {
          return _self$.#version;
        },
        get onlineManager() {
          return _self$.#onlineManager;
        },
        get shadowDOMTarget() {
          return _self$.#shadowDOMTarget;
        }
      }, {
        get client() {
          return queryClient();
        },
        get buttonPosition() {
          return btnPosition();
        },
        get position() {
          return pos();
        },
        get initialIsOpen() {
          return isOpen();
        },
        get errorTypes() {
          return errors();
        },
        get hideDisabledQueries() {
          return hideDisabledQueries();
        },
        get onClose() {
          return onClose();
        }
      }));
    }, el);
    this.#isMounted = true;
    this.#dispose = dispose;
  }
  unmount() {
    if (!this.#isMounted) {
      throw new Error("Devtools is not mounted");
    }
    this.#dispose?.();
    this.#isMounted = false;
  }
};

export { TanstackQueryDevtools, TanstackQueryDevtoolsPanel };
