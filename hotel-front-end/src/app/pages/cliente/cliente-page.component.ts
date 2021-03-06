import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ClienteService } from './cliente.service';
import { ClienteCadastroComponent } from './dialogs/cliente-cadastro/cliente-cadastro.component';
import { ClienteObterComponent } from './dialogs/cliente-obter/cliente-obter.component';
import { CadastroClienteModel } from './models/cadastroCliente.model';
import { Cliente } from './models/cliente.model';
import { ObterClienteModel } from './models/obterCliente.model';


@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.scss']
})

export class ClientePageComponent implements OnInit, AfterViewInit {

  matDataSource = new MatTableDataSource<Cliente>();

  clientes: Cliente[];

  displayedColumns = ['menu', 'cpf', 'nomeCompleto', 'email', 'telefone'];

  constructor(private clienteService: ClienteService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    this.buscarCliente();
  }

  ngAfterViewInit(): void {
    this.matDataSource.paginator = this.paginator;
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matDataSource.filter = filterValue.trim().toLowerCase();
  }

  buscarCliente(){
    this.clienteService
    .buscar()
    .subscribe(clientes => {
    this.matDataSource.data = clientes;
    });
  }

  cadastroCliente() {
    let modoEditar = false;
    let dialogRef = this.dialog.open(ClienteCadastroComponent, {
      data: modoEditar
    });
    dialogRef.afterClosed().subscribe(() => {
      this.buscarCliente();
    });
  }

  obterCliente(cpf: string) {
    this.clienteService
      .obter(cpf)
      .subscribe((cliente: ObterClienteModel) => {
        this.dialog.open(ClienteObterComponent, {
          data: cliente
        })
      })
  }

  editarCliente(cliente: CadastroClienteModel) {
    let modoEditar = true;
    let dialogRef = this.dialog.open(ClienteCadastroComponent, {
      data: {cliente: cliente, modoEditar: modoEditar}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.buscarCliente();
    });
  }
}

