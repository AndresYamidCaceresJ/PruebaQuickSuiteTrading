import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesPeliculaComponent } from './componentes/detalles-pelicula/detalles.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detalles/:id', component: DetallesPeliculaComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
