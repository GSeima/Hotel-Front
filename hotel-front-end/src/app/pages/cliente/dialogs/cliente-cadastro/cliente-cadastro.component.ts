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

  mensagemCadastro(campo: string) {
    if (this.cliente.get('cpf').hasError('required') && campo == "cpf") {
      return 'Digite o cpf do cliente.';
    }

    if (this.cliente.get('nomeCompleto').hasError('required') && campo == "nomeCompleto") {
      return 'Digite o nome do cliente.';
    }

    if (this.cliente.get('dataNascimento').hasError('required') && campo == "dataNascimento") {
      return 'Digite a data de nascimento do cliente.'
    }

    if (this.cliente.get('email').hasError('required') && campo == "email") {
      return 'Digite o email do cliente.';
    }

    if (this.cliente.get('telefone').hasError('required') && campo == "telefone") {
      return 'Digite o telefone do cliente.';
    }
  }

  cadastrar() {
    let cliente: CadastroClienteModel = {
      cpf: this.cliente.get('cpf').value,
      nomeCompleto: this.cliente.get('nomeCompleto').value,
      dataNascimento: this.cliente.get('dataNascimento').value,
      email: this.cliente.get('email').value,
      telefone: this.cliente.get('telefone').value,
     } as CadastroClienteModel;

    this.clienteService
      .cadastrar(cliente)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
