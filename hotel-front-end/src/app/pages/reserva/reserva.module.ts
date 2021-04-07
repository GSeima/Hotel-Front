import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards";
import { ReservaPageComponent } from "./components/reserva-page/reserva-page.component";
import { ReservaService } from "./services/reserva.service";
import { ReservaCadastroComponent } from './dialogs/reserva-cadastro/reserva-cadastro.component';
import { ReservaCheckinComponent } from './dialogs/reserva-checkin/reserva-checkin.component';
import { ReservaCheckoutComponent } from './dialogs/reserva-checkout/reserva-checkout.component';
import { ObterReservaComponent } from './dialogs/obter-reserva/obter-reserva.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ReservaPageComponent
    }
];

@NgModule({
    declarations: [
        ReservaPageComponent,
        ReservaCadastroComponent,
        ReservaCheckinComponent,
        ReservaCheckoutComponent,
        ObterReservaComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ReservaService
    ]
})
export class ReservaModule { }