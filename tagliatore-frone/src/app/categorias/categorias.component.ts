import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoria: Categoria = { name: '', description: '' };
  editing = false;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  createCategoria(): void {
    if (this.categoria.name) {
      this.categoriaService.createCategoria(this.categoria).subscribe(
        response => {
          this.categorias.push(response);
          this.resetForm();
        },
        error => {
          console.error('Error al crear la categoría:', error);
        }
      );
    } else {
      console.error('El nombre de la categoría es obligatorio');
    }
  }

  editCategoria(categoria: Categoria): void {
    this.categoria = { ...categoria };
    this.editing = true;
  }

  updateCategoria(): void {
    if (this.categoria._id) {
      this.categoriaService.updateCategoria(this.categoria._id, this.categoria).subscribe(
        response => {
          const index = this.categorias.findIndex(c => c._id === this.categoria._id);
          if (index !== -1) {
            this.categorias[index] = response;
          }
          this.resetForm();
        },
        error => {
          console.error('Error al actualizar la categoría:', error);
        }
      );
    } else {
      console.error('ID de la categoría no encontrado');
    }
  }

  deleteCategoria(id: string): void {
    this.categoriaService.deleteCategoria(id).subscribe(() => {
      this.categorias = this.categorias.filter(c => c._id !== id);
    });
  }

  resetForm(): void {
    this.categoria = { name: '', description: '' };
    this.editing = false;
  }
}
