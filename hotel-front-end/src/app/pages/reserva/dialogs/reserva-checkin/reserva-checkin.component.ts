import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckInModel } from '../../models/checkIn.model';
import { HospedesCpfModel } from '../../models/hospedesCpf.model';
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

  cpfs: FormArray = new FormArray([]);

  constructor(
    private dialogRef: MatDialogRef<ReservaCheckinComponent>,
    private formBuilder: FormBuilder,
    private reservaService: ReservaService,
    @Inject(MAT_DIALOG_DATA) public data: CheckInModel
  ) 
  {
    this.reservaId = data.reservaId;
    this.capacidade = data.capacidade;
  }

  ngOnInit(): void {
    this.hospedes = this.formBuilder.group({
      cpfs: this.formBuilder.array([ this.criarCampo()])
    });
  }

  checkIn() {
    let hospedesCpf: HospedesCpfModel[] = [];
    this.hospedes.get('cpfs').value.forEach(element => {
      hospedesCpf.push(element);
    });
    this.reservaService
      .checkIn(this.reservaId, hospedesCpf)
      .subscribe(() => {
        this.dialogRef.close();
      });
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
