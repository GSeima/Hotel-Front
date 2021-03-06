import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from "@angular/material/table";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { RouterModule } from "@angular/router";
import { HeaderModule } from "./header/header.module";
import { LayoutComponent } from "./layout/layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SnackBarService } from "./snackbar/snackBar.service";
import { HumanizeFormMessagesPipe } from "./humanize/humanize.pipe";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    SidebarComponent,
    LayoutComponent,
    HumanizeFormMessagesPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HeaderModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    NgxMaskModule.forRoot(options),
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    HumanizeFormMessagesPipe,
    SidebarComponent,
    LayoutComponent,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HeaderModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    NgxMaskModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [SnackBarService]
})
export class SharedModule { }
