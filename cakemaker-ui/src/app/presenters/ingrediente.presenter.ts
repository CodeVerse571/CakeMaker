import { signal } from '@angular/core';
import { IngredienteBase, IngredienteService } from '../models/ingrediente-service';

export class IngredientePresenter {
  // =========================
  // Estado
  // =========================
  readonly ingredientes = signal<IngredienteBase[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly service: IngredienteService) {
    this.loadAll();
  }

  // =========================
  // Acciones
  // =========================
  loadAll() {
    this.loading.set(true);
    this.error.set(null);

    this.service.getAll().subscribe({
      next: (data: IngredienteBase[]) => {
        this.ingredientes.set(data);
      },
      error: (err) => this.error.set('Error cargando ingredientes'),
      complete: () => this.loading.set(false),
    });
  }
}
