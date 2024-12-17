import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden, Platillo } from '../models/orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = 'http://localhost:4000/api/orders';  // URL de la API para las órdenes
  private platillosApiUrl = 'http://localhost:4000/api/dishes';  // URL de la API para los platillos

  constructor(private http: HttpClient) { }

  // Obtener todas las órdenes
  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.apiUrl);
  }

  // Crear una nueva orden
  createOrden(orden: Orden): Observable<Orden> {
    return this.http.post<Orden>(this.apiUrl, orden);
  }

  // Actualizar una orden
  updateOrden(id: string, orden: Orden): Observable<Orden> {
    return this.http.put<Orden>(`${this.apiUrl}/${id}`, orden);
  }

  // Eliminar una orden
  deleteOrden(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los platillos disponibles
  getPlatillos(): Observable<Platillo[]> {
    return this.http.get<Platillo[]>(this.platillosApiUrl);
  }
}
