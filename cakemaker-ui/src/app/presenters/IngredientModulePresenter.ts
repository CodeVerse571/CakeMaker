import { Injectable, signal } from '@angular/core';
import { IngredienteBase, IngredienteService } from '../models/ingrediente-service';
import { Ingredientes, QuequeService } from '../models/queque-service';

interface IngredientCantidadInput {
  id: number;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class IngredientModulePresenter {
  readonly ingredientes = signal<IngredienteBase[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  constructor(
    private readonly ingredienteService: IngredienteService,
    private readonly quequeService: QuequeService,
  ) {
    this.loadAllIngredientes();
  }

  loadAllIngredientes(): void {
    this.startLoading();

    this.ingredienteService.getAll().subscribe({
      next: (data) => this.ingredientes.set(data),
      error: () => this.handleError('Error cargando ingredientes'),
      complete: () => this.stopLoading(),
    });
  }

  agregarIngredientesAQueque(quequeId: number, ingredientes: IngredientCantidadInput[]): void {
    this.startLoading();
    this.successMessage.set(null);

    this.quequeService.addIngredientes(quequeId, ingredientes).subscribe({
      next: (response) => {
        // Recargar todos los ingredientes desde el backend para mantener consistencia
        this.loadAllIngredientes();

        // Mostrar mensaje de éxito
        this.successMessage.set(response.message);
      },
      error: () => this.handleError('Error agregando ingredientes al queque'),
      complete: () => this.stopLoading(),
    });
  }

  private startLoading(): void {
    this.loading.set(true);
    this.error.set(null);
  }

  private stopLoading(): void {
    this.loading.set(false);
  }

  private handleError(message: string): void {
    this.error.set(message);
    this.loading.set(false);
  }
}
