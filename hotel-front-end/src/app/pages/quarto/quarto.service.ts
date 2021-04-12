import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { catchError, take } from 'rxjs/operators';
import { SnackBarService } from "src/app/shared/snackbar/snackBar.service";
import { environment } from "src/environments/environment";

import { Quarto } from "./models/quarto.model"

let apiUrl = environment.apiUrl

@Injectable({
    providedIn: 'root'
})
export class QuartoService {

    constructor(
        private http: HttpClient,
        private snackBar: SnackBarService
        ) {}

    buscar(): Observable<Quarto[]>
    {
        return this.http
        .get<Quarto[]>(`${apiUrl}/quarto`)
        .pipe(
            take(1),
            catchError((error: HttpErrorResponse) => {
                this.snackBar.erroSnackBar(
                    error
                );
                throw error
            })
        )
    }
}
