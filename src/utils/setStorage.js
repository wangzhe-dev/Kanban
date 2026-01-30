export const Storage = {
    setItem: function (key, val) {
        window.localStorage.setItem(key, val == undefined ? '' : val)
    },
    getItem: function (key) {
        return window.localStorage.getItem(key) || '';
    },
    removeItem: function (key) {
        window.localStorage.removeItem(key)
    },
    clear: function() {
        window.localStorage.clear()
    }
}