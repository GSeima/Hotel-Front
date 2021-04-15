import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ObterReservaModel } from '../../models/obterReserva.model';

@Component({
  selector: 'app-obter-reserva',
  templateUrl: './obter-reserva.component.html',
  styleUrls: ['./obter-reserva.component.scss']
})
export class ObterReservaComponent implements OnInit {

  reserva: ObterReservaModel;

  constructor(
    private dialogRef: MatDialogRef<ObterReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObterReservaModel
  ) 
  { 
    this.reserva = data;
  }

  ngOnInit(): void {
  }
}
