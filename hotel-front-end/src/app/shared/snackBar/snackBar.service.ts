import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()

export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    erroSnackBar(erro: string) {
        this.snackBar.open(erro, 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: "right"
        })
    }
}
