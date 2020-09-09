"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var ui_actions_1 = require("./../../shared/ui.actions");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var ui_actions_2 = require("src/app/shared/ui.actions");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, authService, router, store) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.store = store;
        this.loading = false;
    }
    LoginComponent.prototype.ngOnDestroy = function () {
        this.uiSubscription.unsubscribe();
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginForm = this.formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            password: ['', forms_1.Validators.required]
        });
        this.uiSubscription = this.store.select('ui').subscribe(function (_a) {
            var isLoading = _a.isLoading;
            return _this.loading = isLoading;
        });
    };
    LoginComponent.prototype.loginUsuario = function () {
        var _this = this;
        if (this.loginForm.invalid)
            return;
        this.store.dispatch(ui_actions_2.isLoading());
        /*Swal.fire({
          title: 'Espere por favor',
          onBeforeOpen: () => Swal.showLoading(),
        });*/
        var _a = this.loginForm.value, email = _a.email, password = _a.password;
        this.authService
            .loginUsuario(email, password)
            .then(function (_a) {
            var user = _a.user;
            // Swal.close();
            _this.store.dispatch(ui_actions_1.stopLoading());
            _this.router.navigate(['/']);
        })["catch"](function (err) {
            _this.store.dispatch(ui_actions_1.stopLoading());
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message
            });
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
