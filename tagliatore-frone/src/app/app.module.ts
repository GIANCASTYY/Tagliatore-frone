import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PlatillosComponent } from './platillos/platillos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MeserosComponent } from './meseros/meseros.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Importar RouterModule y Routes

const appRoutes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }, // Ruta por defecto que redirige a la pantalla de inicio
  { path: 'clientes', component: ClientesComponent }, // Vista para el cliente, donde puede ver los platillos, su carrito, etc.
  { path: 'platillos', component: PlatillosComponent }, // Vista para ver los platillos disponibles
  { path: 'ordenes', component: OrdenesComponent }, // Vista para que el mesero vea y gestione las órdenes
  { path: 'categorias', component: CategoriasComponent }, // Vista para la gestión de categorías (solo admins o empleados)
  { path: 'meseros', component: MeserosComponent }, // Vista para que los meseros gestionen su información
];


@NgModule({
  declarations: [
    AppComponent,
    PlatillosComponent,
    ClientesComponent,
    OrdenesComponent,
    CategoriasComponent,
    MeserosComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) // Añadir RouterModule a los imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
