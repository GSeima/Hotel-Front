import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { catchError, take } from 'rxjs/operators';
import { SnackBarService } from "src/app/shared/snackbar/snackBar.service";
import { environment } from "src/environments/environment";
import { CadastroReservaModel } from "./models/cadastroReserva.model";
import { HospedesCpfModel } from "./models/hospedesCpf.model";
import { ObterReservaModel } from "./models/obterReserva.model";

import { Reserva } from "./models/reserva.model"
import { TaxasReservaModel } from "./models/taxasReserva.model";

let apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ReservaService {

    constructor(
        private http: HttpClient,
        private snackBar: SnackBarService
    ) { }

    buscar(): Observable<Reserva[]> {
        return this.http
            .get<Reserva[]>(`${apiUrl}/reserva`)
            .pipe(
                take(1)
            );
    }

    obter(reservaId: number): Observable<ObterReservaModel> {
        return this.http
            .get<ObterReservaModel>(`${apiUrl}/reserva/${reservaId}`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(
                        error
                    );
                    throw error;
                })
            );
    }

    cadastrar(reserva: CadastroReservaModel): Observable<CadastroReservaModel> {
        return this.http
            .post<CadastroReservaModel>(`${apiUrl}/reserva/cadastro`, reserva)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(
                        error
                    );
                    throw error;
                })
            );
    }

    checkIn(reservaId: number, hospedesCpf: HospedesCpfModel[]) {
        return this.http
            .post(`${apiUrl}/reserva/${reservaId}/checkIn`, hospedesCpf)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(
                        error
                    );
                    throw error;
                })
            );
    }

    checkOut(reservaId: number, taxas: TaxasReservaModel) {
        return this.http
            .post(`${apiUrl}/reserva/${reservaId}/checkOut`, taxas)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(
                        error
                    );
                    throw error;
                })
            );
    }
}