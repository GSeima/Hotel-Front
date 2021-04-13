import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CadastroReservaModel } from '../../models/cadastroReserva.model';
import { ReservaService } from '../../reserva.service';


@Component({
  selector: 'app-reserva-cadastro',
  templateUrl: './reserva-cadastro.component.html',
  styleUrls: ['./reserva-cadastro.component.scss']
})

export class ReservaCadastroComponent implements OnInit {

  reserva = new FormGroup({
    cpf: new FormControl('', [
      Validators.pattern('[0-9]*'),
      Validators.minLength(11), 
      Validators.maxLength(11),
      Validators.required,
    ]),
    quartoId: new FormControl('', [
      Validators.min(1),
      Validators.max(50),
      Validators.required
    ]),
    dataEntrada: new FormControl('', [
      Validators.required,
    ]),
    dataSaida: new FormControl('', [
      Validators.required,
    ]),
  });

  entradaMin = new Date();

  constructor(
    private dialogRef: MatDialogRef<ReservaCadastroComponent>,
    private reservaService: ReservaService,
  ) 
  {
    this.entradaMin.setDate(this.entradaMin.getDate());
  } 

  ngOnInit(): void {
    
  }

  cadastrar() {
    let reserva: CadastroReservaModel = {
      cpf: this.reserva.get('cpf').value,
      quartoId: this.reserva.get('quartoId').value,
      dataEntrada: this.reserva.get('dataEntrada').value,
      dataSaida: this.reserva.get('dataSaida').value
    } as CadastroReservaModel;

    this.reservaService
      .cadastrar(reserva)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
