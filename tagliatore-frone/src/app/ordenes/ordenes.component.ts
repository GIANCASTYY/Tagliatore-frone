import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../services/orden.service';
import { Orden, Platillo } from '../models/orden.model';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
  ordenes: Orden[] = [];
  orden: Orden = { tableId: '', dishes: [], status: '' };
  platillos: Platillo[] = [];
  selectedPlatillo: Platillo | null = null;
  editing = false;

  constructor(private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.getOrdenes();
    this.getPlatillos();
  }

  // Obtener todas las órdenes
  getOrdenes(): void {
    this.ordenService.getOrdenes().subscribe((data: Orden[]) => {
      console.log(data);  // Imprimir los datos para verificar
      this.ordenes = data;
    });
  }
  

  // Obtener los platillos disponibles
  getPlatillos(): void {
    this.ordenService.getPlatillos().subscribe((data: Platillo[]) => {
      this.platillos = data;
    });
  }

  // Crear una nueva orden
  createOrden(): void {
    if (this.orden.tableId && this.orden.status && this.orden.dishes.length > 0) {
      const nuevaOrden: Orden = {
        tableId: this.orden.tableId,
        dishes: this.orden.dishes.map((platillo: Platillo) => ({
          dishId: platillo.dishId,  // Añadimos dishId
          name: platillo.name,
          quantity: platillo.quantity
        })),
        status: this.orden.status
      };

      this.ordenService.createOrden(nuevaOrden).subscribe(
        response => {
          this.ordenes.push(response);
          this.resetForm();
        },
        error => {
          console.error('Error al crear la orden:', error);
        }
      );
    } else {
      console.error('Faltan datos para crear la orden');
    }
  }

  // Editar una orden
  editOrden(orden: Orden): void {
    this.orden = { ...orden };
    this.editing = true;
  }

  // Actualizar una orden
  updateOrden(): void {
    if (this.orden._id) {
      const updatedOrden: Orden = {
        tableId: this.orden.tableId,
        dishes: this.orden.dishes.map((platillo: Platillo) => ({
          dishId: platillo.dishId,  // Añadimos dishId
          name: platillo.name,
          quantity: platillo.quantity
        })),
        status: this.orden.status
      };

      this.ordenService.updateOrden(this.orden._id, updatedOrden).subscribe(
        response => {
          const index = this.ordenes.findIndex(o => o._id === this.orden._id);
          if (index !== -1) {
            this.ordenes[index] = response;
          }
          this.resetForm();
        },
        error => {
          console.error('Error al actualizar la orden:', error);
        }
      );
    } else {
      console.error('ID de la orden no encontrado');
    }
  }

  // Eliminar una orden
  deleteOrden(id: string): void {
    this.ordenService.deleteOrden(id).subscribe(() => {
      this.ordenes = this.ordenes.filter(o => o._id !== id);
    });
  }

  // Agregar un platillo a la orden
  addPlatillo(): void {
    if (this.selectedPlatillo) {
      const platilloExistente = this.orden.dishes.find(p => p.name === this.selectedPlatillo?.name);
      if (platilloExistente) {
        platilloExistente.quantity += 1;
      } else {
        this.orden.dishes.push({
          dishId: this.selectedPlatillo.dishId,  // Añadimos dishId
          name: this.selectedPlatillo.name,
          quantity: 1
        });
      }
    }
  }

  // Quitar un platillo de la orden
  removePlatillo(index: number): void {
    this.orden.dishes.splice(index, 1);
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.orden = { tableId: '', dishes: [], status: '' };
    this.editing = false;
  }
}
