import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './pages/auth/auth.module';
import { ClienteModule } from './pages/cliente/cliente.module';
import { HttpClientModule } from '@angular/common/http';
import { QuartoModule } from './pages/quarto/quarto.module';
import { ReservaModule } from './pages/reserva/reserva.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ClienteModule,
    QuartoModule,
    ReservaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
