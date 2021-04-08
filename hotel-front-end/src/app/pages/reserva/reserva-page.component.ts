import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ObterReservaComponent } from './dialogs/obter-reserva/obter-reserva.component';
import { ReservaCadastroComponent } from './dialogs/reserva-cadastro/reserva-cadastro.component';
import { ReservaCheckinComponent } from './dialogs/reserva-checkin/reserva-checkin.component';
import { ReservaCheckoutComponent } from './dialogs/reserva-checkout/reserva-checkout.component';
import { ObterReservaModel } from './models/obterReserva.model';
import { Reserva } from './models/reserva.model';
import { ReservaService } from './reserva.service';


@Component({
  selector: 'app-reserva-page',
  templateUrl: './reserva-page.component.html',
  styleUrls: ['./reserva-page.component.scss']
})
export class ReservaPageComponent implements OnInit, AfterViewInit {

  checkboxFinalizados: boolean = true;

  matDataSource = new MatTableDataSource<Reserva>();

  reservas: Reserva[]

  displayedColumns = ['menu', 'reservaId', 'quartoId', 'cpf', 'checkIn', 'checkOut']

  constructor(
    private reservaService: ReservaService, 
    private dialog: MatDialog
    ) { }

  @ViewChild(MatPaginator) paginator:MatPaginator

  ngOnInit(): void {
    this.atualizarLista();
    console.log(this.checkboxFinalizados);
  }

  ngAfterViewInit(): void {
    this.matDataSource.paginator = this.paginator;
  }

  buscarReservas() {
    this.reservaService
    .buscar()
    .subscribe(reservas => {
      this.matDataSource.data = reservas;
    });
  }

  buscarReservasAndamento() {
    this.reservaService
    .buscarEmAndamento()
    .subscribe(reservas => {
      this.matDataSource.data = reservas;
    });
  }

  atualizarLista() {
    console.log(this.checkboxFinalizados);
    if (!this.checkboxFinalizados) {
      this.buscarReservas();
      console.log("Buscando reservas finalizadas: ",this.checkboxFinalizados);
    }
    else
    {
      this.buscarReservasAndamento();
      console.log("Buscando reservas em andamento: ",this.checkboxFinalizados);
    }
    this.checkboxFinalizados = !this.checkboxFinalizados;
    console.log(this.checkboxFinalizados);
  }

  obterReserva(reservaId: number) {
    this.reservaService
      .obter(reservaId)
      .subscribe((reserva: ObterReservaModel) => {
        this.dialog.open(ObterReservaComponent, {
          data: reserva
        });
        console.log(reservaId);
      })
  }

  cadastroReserva(){
    let dialogRef = this.dialog.open(ReservaCadastroComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.buscarReservasAndamento();
    });
  }

  checkIn(reservaId: number, capacidade: number){
    let dialogRef = this.dialog.open(ReservaCheckinComponent, {
      data: [reservaId, capacidade]
    });
    dialogRef.afterClosed().subscribe(() => {
      this.buscarReservasAndamento();
    });
  }

  checkOut(reservaId: number){
    let dialogRef = this.dialog.open(ReservaCheckoutComponent, {
      data: reservaId
    });
    dialogRef.afterClosed().subscribe(() => {
      this.buscarReservasAndamento();
    });
  }

}
