import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards";
import { ReservaService } from "./reserva.service";
import { ReservaCadastroComponent } from './dialogs/reserva-cadastro/reserva-cadastro.component';
import { ReservaCheckinComponent } from './dialogs/reserva-checkin/reserva-checkin.component';
import { ReservaCheckoutComponent } from './dialogs/reserva-checkout/reserva-checkout.component';
import { ObterReservaComponent } from './dialogs/obter-reserva/obter-reserva.component';
import { ReservaPageComponent } from "./reserva-page.component";
import { ReservaCancelarComponent } from './dialogs/reserva-cancelar/reserva-cancelar.component';

const routes: Routes = [
    {
        path: '',
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
        ObterReservaComponent,
        ReservaCancelarComponent
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