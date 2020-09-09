"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var app_reducer_1 = require("./app.reducer");
var environment_1 = require("./../environments/environment");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var forms_1 = require("@angular/forms");
// NGRX
var store_1 = require("@ngrx/store");
var store_devtools_1 = require("@ngrx/store-devtools");
// Angular Fire
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var auth_1 = require("@angular/fire/auth");
var app_component_1 = require("./app.component");
var login_component_1 = require("./auth/login/login.component");
var register_component_1 = require("./auth/register/register.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var ingreso_egreso_component_1 = require("./ingreso-egreso/ingreso-egreso.component");
var estadistica_component_1 = require("./ingreso-egreso/estadistica/estadistica.component");
var detalle_component_1 = require("./ingreso-egreso/detalle/detalle.component");
var footer_component_1 = require("./shared/footer/footer.component");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var sidebar_component_1 = require("./shared/sidebar/sidebar.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                dashboard_component_1.DashboardComponent,
                ingreso_egreso_component_1.IngresoEgresoComponent,
                estadistica_component_1.EstadisticaComponent,
                detalle_component_1.DetalleComponent,
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebase),
                firestore_1.AngularFirestoreModule,
                auth_1.AngularFireAuthModule,
                store_1.StoreModule.forRoot(app_reducer_1.appReducer),
                store_devtools_1.StoreDevtoolsModule.instrument({
                    maxAge: 25,
                    logOnly: environment_1.environment.production
                }),
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
