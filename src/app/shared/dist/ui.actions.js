"use strict";
exports.__esModule = true;
exports.stopLoading = exports.isLoading = void 0;
var store_1 = require("@ngrx/store");
exports.isLoading = store_1.createAction('[UI Component] Is Loading');
exports.stopLoading = store_1.createAction('[UI Component] Stop Loading');
