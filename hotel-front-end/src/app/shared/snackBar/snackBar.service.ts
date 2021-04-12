import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()

export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    erroSnackBar(error: HttpErrorResponse) {
        let msg = error.error.split(':', 2)[1].split(' at', 1);
        this.snackBar.open(msg, 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: "right"
        })
    }
}
