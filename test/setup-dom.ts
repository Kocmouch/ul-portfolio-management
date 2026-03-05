import { Window } from 'happy-dom';

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

const window = new Window({
  url: 'http://localhost/',
});

// Some libraries expect these constructors to exist on `window`.
(window as unknown as { SyntaxError?: typeof SyntaxError }).SyntaxError = SyntaxError;

globalThis.window = window as unknown as Window & typeof globalThis;
globalThis.document = window.document;
globalThis.navigator = window.navigator as unknown as Navigator;
globalThis.HTMLElement = window.HTMLElement;

// React 18+ expects this to reduce "act(...)" warnings in tests.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(() => callback(Date.now()), 0);
globalThis.cancelAnimationFrame = (handle: number) => window.clearTimeout(handle);

// mark for components that need to avoid heavy client-only imports
;(globalThis.window as any).__TEST__ = true;


