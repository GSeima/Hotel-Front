import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

import { QuartoPageComponent } from "./quarto-page.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards";
import { QuartoService } from "./quarto.service";

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: QuartoPageComponent
    }
];

@NgModule({
    declarations: [
        QuartoPageComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        QuartoService
    ]
})
export class QuartoModule { }