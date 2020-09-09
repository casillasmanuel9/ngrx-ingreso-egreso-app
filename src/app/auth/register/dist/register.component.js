"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var ui_actions_1 = require("./../../shared/ui.actions");
var sweetalert2_1 = require("sweetalert2");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, authService, router, store) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.store = store;
        this.loading = false;
    }
    RegisterComponent.prototype.ngOnDestroy = function () {
        this.uiSuscription.unsubscribe();
    };
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formGroup = this.formBuilder.group({
            nombre: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            password: ['', forms_1.Validators.required]
        });
        this.uiSuscription = this.store
            .select('ui')
            .subscribe(function (_a) {
            var isLoading = _a.isLoading;
            return (_this.loading = isLoading);
        });
    };
    RegisterComponent.prototype.crearUsuario = function () {
        var _this = this;
        if (this.formGroup.invalid)
            return;
        this.store.dispatch(ui_actions_1.isLoading());
        /*Swal.fire({
          title: 'Espere por favor',
          onBeforeOpen: () => Swal.showLoading(),
        });*/
        var _a = this.formGroup.value, nombre = _a.nombre, email = _a.email, password = _a.password;
        this.authService
            .crearUsuario(nombre, email, password)
            .then(function () {
            _this.store.dispatch(ui_actions_1.stopLoading());
            //Swal.close();
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
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
