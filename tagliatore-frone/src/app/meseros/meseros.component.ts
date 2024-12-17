import { Component, OnInit } from '@angular/core';
import { MeseroService } from '../services/mesero.service';
import { Mesero } from '../models/mesero.model';

@Component({
  selector: 'app-meseros',
  templateUrl: './meseros.component.html',
  styleUrls: ['./meseros.component.css']
})
export class MeserosComponent implements OnInit {
  meseros: Mesero[] = [];
  mesero: Mesero = { name: '', email: '', password: '', role: 'waiter' };
  editing = false;

  constructor(private meseroService: MeseroService) { }

  ngOnInit(): void {
    this.getMeseros();
  }

  getMeseros(): void {
    this.meseroService.getMeseros().subscribe((data: Mesero[]) => {
      this.meseros = data;
    });
  }

  createMesero(): void {
    if (this.mesero.name && this.mesero.email && this.mesero.password) {
      this.meseroService.createMesero(this.mesero).subscribe(
        response => {
          this.meseros.push(response);
          this.resetForm();
        },
        error => {
          console.error('Error al crear el mesero:', error);
        }
      );
    } else {
      console.error('Todos los campos son obligatorios');
    }
  }

  editMesero(mesero: Mesero): void {
    this.mesero = { ...mesero, password: '' };  // Vaciar la contraseña para editar
    this.editing = true;
  }

  updateMesero(): void {
    if (this.mesero._id) {
      this.meseroService.updateMesero(this.mesero._id, this.mesero).subscribe(
        response => {
          const index = this.meseros.findIndex(m => m._id === this.mesero._id);
          if (index !== -1) {
            this.meseros[index] = response;
          }
          this.resetForm();
        },
        error => {
          console.error('Error al actualizar el mesero:', error);
        }
      );
    } else {
      console.error('ID del mesero no encontrado');
    }
  }

  deleteMesero(id: string): void {
    this.meseroService.deleteMesero(id).subscribe(() => {
      this.meseros = this.meseros.filter(m => m._id !== id);
    });
  }

  resetForm(): void {
    this.mesero = { name: '', email: '', password: '', role: 'waiter' };
    this.editing = false;
  }
}
