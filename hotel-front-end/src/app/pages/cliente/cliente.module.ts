import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards";

import { ClienteService } from "./cliente.service";
import { ClienteCadastroComponent } from "./dialogs/cliente-cadastro/cliente-cadastro.component";
import { ClientePageComponent } from "./cliente-page.component";
import { ClienteObterComponent } from "./dialogs/cliente-obter/cliente-obter.component";

const routes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      component: ClientePageComponent
    },
]

@NgModule({
    declarations: [
        ClientePageComponent,
        ClienteCadastroComponent,
        ClienteObterComponent,
        ClientePageComponent
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