import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxasReservaModel } from '../../models/taxasReserva.model';
import { ReservaService } from '../../reserva.service';


@Component({
  selector: 'app-reserva-checkout',
  templateUrl: './reserva-checkout.component.html',
  styleUrls: ['./reserva-checkout.component.scss']
})
export class ReservaCheckoutComponent implements OnInit {

  reservaId: number;

  taxasReserva = new FormGroup({
    taxasConsumo: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(5000)
    ])
  })

  constructor(
    private dialogRef: MatDialogRef<ReservaCheckoutComponent>,
    private reservaService: ReservaService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) 
  {
    this.reservaId = data;
  }

  ngOnInit(): void {
  }

  checkOut() {
    let taxasReserva: TaxasReservaModel = {
      taxasConsumo: this.taxasReserva.get('taxasConsumo').value
    } as TaxasReservaModel;

    this.reservaService
      .checkOut(this.reservaId, taxasReserva)
      .subscribe(() =>{
        this.dialogRef.close();
      });
  }
}
