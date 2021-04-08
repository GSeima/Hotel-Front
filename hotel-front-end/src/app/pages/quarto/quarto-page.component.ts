import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Quarto } from './models/quarto.model';
import { QuartoService } from './quarto.service';


@Component({
  selector: 'app-quarto-page',
  templateUrl: './quarto-page.component.html',
  styleUrls: ['./quarto-page.component.scss']
})
export class QuartoPageComponent implements OnInit, AfterViewInit {

  matDataSource = new MatTableDataSource<Quarto>();

  quartos: Quarto[]

  displayedColumns = ['quartoId', 'tipoQuarto', 'situacao']

  constructor(private quartoService: QuartoService) { }

  @ViewChild(MatPaginator) paginator:MatPaginator

  ngOnInit(): void {
    this.quartoService
    .buscar()
    .subscribe(quartos => {
      this.matDataSource.data = quartos
    })
  }

  ngAfterViewInit(): void {
    this.matDataSource.paginator = this.paginator; 
  }

}
