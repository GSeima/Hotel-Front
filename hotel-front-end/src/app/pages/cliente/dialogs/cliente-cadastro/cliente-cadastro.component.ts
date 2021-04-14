import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from '../../cliente.service';
import { CadastroClienteModel } from '../../models/cadastroCliente.model';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {

  cliente: FormGroup;

  editarCliente: CadastroClienteModel;

  modoEditar: boolean;

  constructor(
    private dialogRef: MatDialogRef<ClienteCadastroComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: {
      cliente: CadastroClienteModel,
      modoEditar: boolean
    }) 
  {
    this.editarCliente = data.cliente;
    this.modoEditar = data.modoEditar;
  }

  formulario() {
    
    let cpf = "";
    let nomeCompleto = "";
    let dataNascimento = null;
    let email = "";
    let telefone = "";

    if (this.modoEditar) {
      cpf = this.editarCliente.cpf;
      nomeCompleto = this.editarCliente.nomeCompleto;
      dataNascimento = this.editarCliente.dataNascimento;
      email = this.editarCliente.email;
      telefone = this.editarCliente.telefone;
    }

    this.cliente = new FormGroup({
      cpf: new FormControl({ value: cpf, disabled: this.modoEditar },
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*')

        ]),
      nomeCompleto: new FormControl(nomeCompleto, [
        Validators.maxLength(50),
        Validators.pattern('([a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂçÇ]+[ ]*)+'),
        Validators.required
      ]),
      dataNascimento: new FormControl({ value: dataNascimento, disabled: this.modoEditar },
        [
          Validators.required,
        ]),
      email: new FormControl(email, [
        Validators.email,
        Validators.required,
      ]),
      telefone: new FormControl(telefone, [
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('[0-9]*'),
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
    this.formulario();
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

  editar() {
    let cliente: CadastroClienteModel = {
      cpf: this.cliente.get('cpf').value,
      nomeCompleto: this.cliente.get('nomeCompleto').value,
      dataNascimento: this.cliente.get('dataNascimento').value,
      email: this.cliente.get('email').value,
      telefone: this.cliente.get('telefone').value,
    } as CadastroClienteModel;
    
    this.clienteService
      .editar(cliente)
      .subscribe(() => {
        this.dialogRef.close();
      })
  }

  cancelar() {
    this.dialogRef.close();
  }
}
