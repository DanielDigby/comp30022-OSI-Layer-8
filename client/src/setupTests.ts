// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable */
import "@testing-library/jest-dom";

class LocalStorageMock {
    store: Record<string, unknown>;
    constructor() {
        this.store = {};
    }
    clear() {
        this.store = {};
    }
    getItem(key: string) {
        return this.store[key] || null;
    }
    setItem(key: string, value: any) {
        this.store[key] = value.toString();
    }
    removeItem(key: string) {
        delete this.store[key];
    }
}

const localStorage = new LocalStorageMock();

// https://github.com/redux-offline/redux-offline/issues/308
// jest test environment expects these to exist
window.localStorage = localStorage;
