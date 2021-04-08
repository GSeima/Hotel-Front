import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospedesCpfModel } from '../../models/hospedesCpf.model';
import { ReservaPageComponent } from '../../reserva-page.component';
import { ReservaService } from '../../reserva.service';

@Component({
  selector: 'app-reserva-checkin',
  templateUrl: './reserva-checkin.component.html',
  styleUrls: ['./reserva-checkin.component.scss']
})

export class ReservaCheckinComponent implements OnInit {

  reservaId: number;

  capacidade: number;

  hospedes: FormGroup;

  cpfs: FormArray;

  hospedesCpf: HospedesCpfModel[] = [];

  pagina: ReservaPageComponent;

  constructor(
    private dialogRef: MatDialogRef<ReservaCheckinComponent>,
    private formBuilder: FormBuilder,
    private reservaService: ReservaService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) 
  {
    this.reservaId = data[0];
    this.capacidade = data[1];
  }

  ngOnInit(): void {
    this.hospedes = new FormGroup({
      cpfs: new FormArray([])
    });
    this.cpfs = new FormArray([]);
  }

  checkIn() {
    this.hospedes.get('cpfs').value.forEach(element => {
      this.hospedesCpf.push(element);
    });
    this.reservaService
      .checkIn(this.reservaId, this.hospedesCpf)
      .subscribe(() => {
        this.dialogRef.close();
      })
      this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

  criarCampo(): FormGroup {
    return this.formBuilder.group({
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
    });
  }

  adicionarCpf() {
    this.cpfs = this.hospedes.get('cpfs') as FormArray;
    this.cpfs.push(this.criarCampo());
  }

  removerCpf(index: number) {
    this.cpfs = this.hospedes.get('cpfs') as FormArray;
    this.cpfs.removeAt(index)
  }
}
