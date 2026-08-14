// legacyApp.js expects a window.storage.get/set API (async key-value store).
// This shim backs it with localStorage so persistence works in a plain browser.
if (!window.storage) {
  window.storage = {
    async get(key) {
      const value = localStorage.getItem(key);
      return value === null ? null : { value };
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return true;
    },
  };
}
