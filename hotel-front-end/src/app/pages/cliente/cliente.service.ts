import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, take } from 'rxjs/operators';
import { SnackBarService } from "src/app/shared/snackbar/snackBar.service";
import { environment } from "src/environments/environment";
import { CadastroClienteModel } from "./models/cadastroCliente.model";

import { Cliente } from "./models/cliente.model";
import { ObterClienteModel } from "./models/obterCliente.model";

let apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(
        private http: HttpClient,
        private snackBar: SnackBarService
        ) { }

    buscar(): Observable<Cliente[]> {
        return this.http
            .get<Cliente[]>(`${apiUrl}/cliente`)
            .pipe(
                take(1)
            );
    }

    obter(cpf: string): Observable<ObterClienteModel> {
        return this.http
            .get<ObterClienteModel>(`${apiUrl}/cliente/${cpf}`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(
                        error
                    );
                    throw error
                })
            );
    }

    cadastrar(cliente: CadastroClienteModel): Observable<CadastroClienteModel> {
        return this.http
            .post<CadastroClienteModel>(`${apiUrl}/cliente/cadastro`, cliente)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.erroSnackBar(
                        error
                    );
                    throw error
                })
            );
    }
}
