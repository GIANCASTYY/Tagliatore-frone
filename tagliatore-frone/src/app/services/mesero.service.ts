import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesero } from '../models/mesero.model';

@Injectable({
  providedIn: 'root'
})
export class MeseroService {
  private apiUrl = 'http://localhost:4000/api/waiters';

  constructor(private http: HttpClient) { }

  getMeseros(): Observable<Mesero[]> {
    return this.http.get<Mesero[]>(this.apiUrl);
  }

  createMesero(mesero: Mesero): Observable<Mesero> {
    return this.http.post<Mesero>(this.apiUrl, mesero);
  }

  updateMesero(id: string, mesero: Mesero): Observable<Mesero> {
    return this.http.put<Mesero>(`${this.apiUrl}/${id}`, mesero);
  }

  deleteMesero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
