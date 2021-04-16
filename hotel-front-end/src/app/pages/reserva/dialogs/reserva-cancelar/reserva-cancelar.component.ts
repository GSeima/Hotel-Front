import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ReservaService } from '../../reserva.service';

@Component({
  selector: 'app-reserva-cancelar',
  templateUrl: './reserva-cancelar.component.html',
  styleUrls: ['./reserva-cancelar.component.scss']
})
export class ReservaCancelarComponent implements OnInit {

  reservaId: number;

  constructor(
    private dialogRef: MatDialogRef<ReservaCancelarComponent>,
    private reservaService: ReservaService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) 
  {
    this.reservaId = data;
  }


  ngOnInit(): void {
  }

  cancelar() {
    this.reservaService
      .cancelar(this.reservaId)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

}
