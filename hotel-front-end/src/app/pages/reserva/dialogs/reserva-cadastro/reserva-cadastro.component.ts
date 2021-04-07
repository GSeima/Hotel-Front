import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva-cadastro',
  templateUrl: './reserva-cadastro.component.html',
  styleUrls: ['./reserva-cadastro.component.scss']
})

export class ReservaCadastroComponent implements OnInit {

  reserva = new FormGroup({
    cpf: new FormControl('', [
      Validators.minLength(11), 
      Validators.maxLength(11),
      Validators.required,
    ]),
    quartoId: new FormControl('', [
      Validators.min(1),
      Validators.max(50),
      Validators.required
    ])
  });

  constructor(
    private dialogRef: MatDialogRef<ReservaCadastroComponent>,
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    this.reservaService
      .cadastrar(this.reserva.value)
      .subscribe(() => {
        this.dialogRef.close();
        window.location.reload();
      });
      this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

}
