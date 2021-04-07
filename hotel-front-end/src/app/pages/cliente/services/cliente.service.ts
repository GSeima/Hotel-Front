import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError, take } from 'rxjs/operators';
import { SnackBarService } from "src/app/shared/snackBar/snackBar.service";
import { environment } from "src/environments/environment";
import { CadastroClienteModel } from "../models/cadastroCliente.model";

import { Cliente } from "../models/cliente.model";
import { ObterClienteModel } from "../models/obterCliente.model";


@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    apiUrl = environment.apiUrl

    constructor(
        private http: HttpClient,
        private snackBar: SnackBarService
        ) { }

    buscar(): Observable<Cliente[]> {
        return this.http
            .get<Cliente[]>(`${this.apiUrl}/cliente`)
            .pipe(
                take(1)
            );
    }

    obter(cpf: string): Observable<ObterClienteModel> {
        return this.http
            .get<ObterClienteModel>(`${this.apiUrl}/cliente/${cpf}`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(error.error.split(':', 2)[1].split(' at', 1));
                    throw error
                })
            );
    }

    cadastrar(cliente: CadastroClienteModel): Observable<CadastroClienteModel> {
        return this.http
            .post<CadastroClienteModel>(`${this.apiUrl}/cliente/cadastro`, cliente)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(error.error.split(':', 2)[1].split(' at', 1));
                    throw error
                })
            );
    }
}
