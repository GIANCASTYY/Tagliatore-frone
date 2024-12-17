import { Component, OnInit } from '@angular/core';
import { PlatilloService } from '../services/platillo.service';
import { Platillo } from '../models/platillo.model';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css']
})
export class PlatillosComponent implements OnInit {
  platillos: Platillo[] = [];
  selectedPlatillo: Platillo | null = null; // Para el platillo seleccionado

  constructor(private platilloService: PlatilloService) { }

  ngOnInit(): void {
    this.getPlatillos();
  }

  getPlatillos(): void {
    this.platilloService.getPlatillos().subscribe((data: Platillo[]) => {
      this.platillos = data;
    });
  }

  createPlatillo(platillo: Platillo): void {
    this.platilloService.createPlatillo(platillo).subscribe(response => {
      this.platillos.push(response);
    });
  }

  selectPlatillo(platillo: Platillo): void {
    this.selectedPlatillo = { ...platillo }; // Clonar el platillo para editarlo
  }

  updatePlatillo(): void {
    if (this.selectedPlatillo && this.selectedPlatillo.id) {
      this.platilloService.updatePlatillo(this.selectedPlatillo.id, this.selectedPlatillo).subscribe(response => {
        const index = this.platillos.findIndex(p => p.id === this.selectedPlatillo!.id);
        if (index !== -1) {
          this.platillos[index] = response;
        }
      });
    } else {
      console.error('No Platillo selected or missing id');
    }
  }

  // Cerrar formulario de edición
  closeEditForm(): void {
    this.selectedPlatillo = null; // Restablecer para cerrar el formulario
  }

  deleteDish(id: string): void {
    this.platilloService.deleteDish(id).subscribe(() => {
      this.platillos = this.platillos.filter(p => p.id !== id);
    });
  }
}
