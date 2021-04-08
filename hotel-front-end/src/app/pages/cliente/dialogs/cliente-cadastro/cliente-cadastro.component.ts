import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../cliente.service';
import { CadastroClienteModel } from '../../models/cadastroCliente.model';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {

  cliente = new FormGroup({
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11), 
      Validators.maxLength(11),
      Validators.pattern('[0-9]*')
      
    ]),
    nomeCompleto: new FormControl('', [
      Validators.maxLength(50),
      Validators.pattern('([a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂçÇ]+[ ]*)+'),
      Validators.required
    ]),
    dataNascimento: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    telefone: new FormControl('', [
      Validators.minLength(11), 
      Validators.maxLength(11),
      Validators.pattern('[0-9]*'),
      Validators.required
    ])
  })

  constructor(
    private dialogRef: MatDialogRef<ClienteCadastroComponent>,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    let cliente: CadastroClienteModel = { } as CadastroClienteModel;

    cliente = this.cliente.value;

    this.clienteService
      .cadastrar(cliente)
      .subscribe(() => {
        this.dialogRef.close();
      });
      this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
