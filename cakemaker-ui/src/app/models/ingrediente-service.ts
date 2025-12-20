import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';

export type IngredienteBase = {
  id: number;
  nombre: string;
  costoUnitario: number;
  createdAt: Date;
  cantidadTotal: number;
};

export type CreateIngredienteDto = {
  nombre: string;
  costoUnitario: number;
  cantidadTotal: number;
};

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiURL}/${environment.ingredientesEndpoint}`;

  // =========================
  // Queries
  // =========================
  getAll() {
    return this.http.get<IngredienteBase[]>(this.apiUrl, { observe: 'body' }).pipe(
      // parsea costoUnitario a number
      map((data: any[]) =>
        data.map((ing) => ({
          ...ing,
          costoUnitario: Number(ing.costoUnitario),
        })),
      ),
    );
  }

  getById(id: number) {
    return this.http.get<IngredienteBase>(`${this.apiUrl}/${id}`).pipe(
      map((ing: any) => ({
        ...ing,
        costoUnitario: Number(ing.costoUnitario),
      })),
    );
  }

  // =========================
  // Commands
  // =========================
  create(payload: CreateIngredienteDto) {
    return this.http.post<IngredienteBase>(this.apiUrl, payload).pipe(
      map((ing: any) => ({
        ...ing,
        costoUnitario: Number(ing.costoUnitario),
      })),
    );
  }

  update(id: number, payload: Partial<CreateIngredienteDto>) {
    return this.http.put<IngredienteBase>(`${this.apiUrl}/${id}`, payload).pipe(
      map((ing: any) => ({
        ...ing,
        costoUnitario: Number(ing.costoUnitario),
      })),
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
