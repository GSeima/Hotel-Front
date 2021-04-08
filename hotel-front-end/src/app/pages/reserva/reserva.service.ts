import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { catchError, take } from 'rxjs/operators';
import { SnackBarService } from "src/app/shared/snackBar/snackBar.service";
import { environment } from "src/environments/environment";
import { CadastroReservaModel } from "./models/cadastroReserva.model";
import { HospedesCpfModel } from "./models/hospedesCpf.model";
import { ObterReservaModel } from "./models/obterReserva.model";

import { Reserva } from "./models/reserva.model"
import { TaxasReservaModel } from "./models/taxasReserva.model";

@Injectable({
    providedIn: 'root'
})
export class ReservaService {

    apiUrl = environment.apiUrl

    constructor(
        private http: HttpClient,
        private snackBar: SnackBarService
        ) { }

    buscar(): Observable<Reserva[]> {
        return this.http
            .get<Reserva[]>(`${this.apiUrl}/reserva`)
            .pipe(
                take(1)
            )
    }

    buscarEmAndamento(): Observable<Reserva[]> {
        return this.http    
            .get<Reserva[]>(`${this.apiUrl}/reserva/andamento`)
            .pipe(
                take(1)
            )
    }

    obter(reservaId: number): Observable<ObterReservaModel> {
        return this.http
            .get<ObterReservaModel>(`${this.apiUrl}/reserva/${reservaId}`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(error.error.split(':', 2)[1].split(' at', 1));
                    throw error
                })
            )
    }

    cadastrar(reserva: CadastroReservaModel): Observable<CadastroReservaModel> {
        return this.http
            .post<CadastroReservaModel>(`${this.apiUrl}/reserva/cadastro`, reserva)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(error.error.split(':', 2)[1].split(' at', 1));
                    throw error
                })
            )
    }

    checkIn(reservaId: number, hospedesCpf: HospedesCpfModel[]) {
        return this.http
            .post(`${this.apiUrl}/reserva/${reservaId}/checkIn`, hospedesCpf)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(error.error.split(':', 2)[1].split(' at', 1));
                    throw error
                })
            )
    }

    checkOut(reservaId: number, taxas: TaxasReservaModel) {
        return this.http
            .post(`${this.apiUrl}/reserva/${reservaId}/checkOut`, taxas)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(error.error.split(':', 2)[1].split(' at', 1));
                    throw error
                })
            )
    }
}