"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.uiReducer = void 0;
var store_1 = require("@ngrx/store");
var ui_actions_1 = require("./ui.actions");
;
var initialState = {
    isLoading: false
};
var _uiReducer = store_1.createReducer(initialState, store_1.on(ui_actions_1.isLoading, function (state) { return (__assign(__assign({}, state), { isLoading: true })); }), store_1.on(ui_actions_1.stopLoading, function (state) { return (__assign(__assign({}, state), { isLoading: false })); }));
function uiReducer(state, action) {
    return _uiReducer(state, action);
}
exports.uiReducer = uiReducer;
