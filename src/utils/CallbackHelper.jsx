export default class CallbackHelper {
    static register(id, callback, override) {

        if(!window.callbacks) window.callbacks = {};

        if(id && (!window.callbacks[id] || override)) {
            window.callbacks[id] = callback;
            return true;
        }

        return false;
    }

    static call(id, ...params) {
        if(window.callbacks && window.callbacks[id]) {
            return window.callbacks[id](...params);
        }

        return undefined;
    }
}