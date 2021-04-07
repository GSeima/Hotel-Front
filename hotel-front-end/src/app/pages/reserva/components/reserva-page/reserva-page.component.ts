import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ObterReservaComponent } from '../../dialogs/obter-reserva/obter-reserva.component';
import { ReservaCadastroComponent } from '../../dialogs/reserva-cadastro/reserva-cadastro.component';
import { ReservaCheckinComponent } from '../../dialogs/reserva-checkin/reserva-checkin.component';
import { ReservaCheckoutComponent } from '../../dialogs/reserva-checkout/reserva-checkout.component';
import { ObterReservaModel } from '../../models/obterReserva.model';

import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reserva-page',
  templateUrl: './reserva-page.component.html',
  styleUrls: ['./reserva-page.component.scss']
})
export class ReservaPageComponent implements OnInit, AfterViewInit {

  checked = false;

  matDataSource = new MatTableDataSource<Reserva>();

  reservas: Reserva[]

  displayedColumns = ['menu', 'reservaId', 'quartoId', 'cpf', 'checkIn', 'checkOut']

  constructor(private reservaService: ReservaService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator:MatPaginator

  ngOnInit(): void {
    this.reservaService
    .buscar()
    .subscribe(reservas => {
      this.matDataSource.data = reservas;
    })
  }

  ngAfterViewInit(): void {
    this.matDataSource.paginator = this.paginator;
  }

  obterReserva(reservaId: number) {
    this.reservaService
      .obter(reservaId)
      .subscribe((reserva: ObterReservaModel) => {
        this.dialog.open(ObterReservaComponent, {
          data: reserva
        });
      })
  }

  cadastroReserva(){
    this.dialog.open(ReservaCadastroComponent);
  }

  checkIn(reservaId: number){
    this.dialog.open(ReservaCheckinComponent, {
      data: reservaId
    });
  }

  checkOut(reservaId: number){
    this.dialog.open(ReservaCheckoutComponent, {
      data: reservaId
    });
  }

}
