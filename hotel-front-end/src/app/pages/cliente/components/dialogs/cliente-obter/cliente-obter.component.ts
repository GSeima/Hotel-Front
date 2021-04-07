import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ObterClienteModel } from '../../../models/obterCliente.model';

@Component({
  selector: 'app-cliente-obter',
  templateUrl: './cliente-obter.component.html',
  styleUrls: ['./cliente-obter.component.scss']
})
export class ClienteObterComponent implements OnInit {

  cliente: ObterClienteModel;

  constructor(
    private dialogRef: MatDialogRef<ClienteObterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObterClienteModel
  ) 
  {
    this.cliente = data;
  }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
