import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Platillo } from '../models/platillo.model';

@Injectable({
  providedIn: 'root'
})
export class PlatilloService {
  private apiUrl = 'http://localhost:4000/api/dishes'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Obtener todos los platillos y mapear '_id' a 'id'
  getPlatillos(): Observable<Platillo[]> {
    return this.http.get<Platillo[]>(this.apiUrl).pipe(
      map((data: any[]) => 
        data.map(platillo => ({
          ...platillo,
          id: platillo._id // Mapear _id a id
        }))
      ),
      catchError(this.handleError)
    );
  }

  // Crear un nuevo platillo
  createPlatillo(platillo: Platillo): Observable<Platillo> {
    return this.http.post<Platillo>(this.apiUrl, platillo).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un platillo
  updatePlatillo(id: string, platillo: Platillo): Observable<Platillo> {
    return this.http.put<Platillo>(`${this.apiUrl}/${id}`, platillo).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un platillo
  deleteDish(id: string): Observable<void> {
    console.log('Deleting dish with ID:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejar errores HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
