import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

// Modelos (ajusta rutas según tu proyecto)
export type Queque = {
  id: number;
  nombre: string;
  createdAt: Date;
};

export type Ingredientes = {
  id: number;
  nombre: string;
  costoUnitario: number;
  cantidad: number;
  createdAt: Date;
};

export type CreateQuequeDto = {
  id: number;
  nombre: string;
  createdAt: Date;
};

@Injectable({
  providedIn: 'root',
})
export class QuequeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiURL}/${environment.quequesEndpoint}`;

  // =========================
  // Queries
  // =========================
  getAll() {
    return this.http.get<Queque[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Queque>(`${this.apiUrl}/${id}`);
  }

  getIngredientes(id: number) {
    return this.http.get<Ingredientes[]>(`${this.apiUrl}/${id}/ingredientes`);
  }

  addIngredientes(quequeId: number, ingredientes: { id: number; cantidad: number }[]) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/${quequeId}/ingredientes`,
      ingredientes,
    );
  }

  create(payload: CreateQuequeDto) {
    return this.http.post<Queque>(this.apiUrl, payload);
  }

  update(id: number, payload: Partial<CreateQuequeDto>) {
    return this.http.put<Queque>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
