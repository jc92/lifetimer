// Create a mock storage for development
const mockStorage = {
  data: {},
  get(key) {
    return Promise.resolve(this.data[key] !== undefined ? { [key]: this.data[key] } : {});
  },
  set(items) {
    Object.assign(this.data, items);
    return Promise.resolve();
  }
};

// Use browser.storage.local in extension environment, mock storage in development
export const storage = typeof browser !== 'undefined' && browser.storage 
  ? browser.storage.local 
  : mockStorage;
