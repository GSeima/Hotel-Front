import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards";

import { ClientePageComponent } from "./components/cliente-page/cliente-page.component";
import { ClienteService } from "./services/cliente.service";
import { ClienteCadastroComponent } from "./components/dialogs/cliente-cadastro/cliente-cadastro.component";
import { ClienteObterComponent } from "./components/dialogs/cliente-obter/cliente-obter.component";

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      canActivate: [AuthGuard],
      component: ClientePageComponent
    },
]

@NgModule({
    declarations: [
        ClientePageComponent,
        ClienteCadastroComponent,
        ClienteObterComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ClienteService
    ]
})
export class ClienteModule { }