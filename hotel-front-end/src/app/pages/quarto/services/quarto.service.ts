import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs"
import { catchError, take } from 'rxjs/operators';
import { SnackBarService } from "src/app/shared/snackBar/snackBar.service";
import { environment } from "src/environments/environment";

import { Quarto } from "../models/quarto.model"

@Injectable({
    providedIn: 'root'
})
export class QuartoService {

    apiUrl = environment.apiUrl

    constructor(
        private http: HttpClient,
        private snackBar: SnackBarService
        ) {}

    buscar(): Observable<Quarto[]>
    {
        return this.http
        .get<Quarto[]>(`${this.apiUrl}/quarto`)
        .pipe(
            take(1),
            catchError((error: HttpErrorResponse) => {
                this.snackBar.erroSnackBar(error.error.split(':', 2)[1].split(' at', 1));
                throw error
            })
        )
    }
}
