import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = { name: '', email: '', phone: '', dni: '' }; // Cliente vacío
  editing: boolean = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  createOrUpdateCliente(): void {
    if (this.editing) {
      // Si estamos editando, actualizamos
      this.clienteService.updateCliente(this.cliente._id!, this.cliente).subscribe((updatedCliente) => {
        const index = this.clientes.findIndex(c => c._id === updatedCliente._id);
        if (index !== -1) {
          this.clientes[index] = updatedCliente;
        }
        this.resetForm();
      });
    } else {
      // Si no, creamos un nuevo cliente
      this.clienteService.createCliente(this.cliente).subscribe((newCliente) => {
        this.clientes.push(newCliente);
        this.resetForm();
      });
    }
  }

  deleteCliente(id: string): void {
    this.clienteService.deleteCliente(id).subscribe(() => {
      // Verifica que el cliente se elimine del array de clientes
      this.clientes = this.clientes.filter(c => c._id !== id);
    }, error => {
      console.error('Error al eliminar el cliente:', error);
    });
  }
  

  editCliente(cliente: Cliente): void {
    this.cliente = { ...cliente }; // Clonamos para no afectar la lista directamente
    this.editing = true;
  }

  resetForm(): void {
    this.cliente = { name: '', email: '', phone: '', dni: '' }; // Resetear el formulario
    this.editing = false;
  }
}
