declare global {
  interface Window {
    /** APIs for Electron IPC */
    ipcAPI?: typeof import('_preload/ipc-api').default
  }
}

declare module '*.scss'

// Makes TS sees this as an external modules so we can extend the global scope.
export { };
