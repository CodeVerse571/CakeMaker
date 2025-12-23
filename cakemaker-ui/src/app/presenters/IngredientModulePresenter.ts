import { Injectable, signal } from '@angular/core';
import { IngredienteBase, IngredienteService } from '../models/ingrediente-service';
import { QuequeService } from '../models/queque-service';

interface IngredientCantidadInput {
  id: number;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class IngredientModulePresenter {
  // =========================
  // State
  // =========================
  readonly ingredientes = signal<IngredienteBase[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  constructor(
    private readonly ingredienteService: IngredienteService,
    private readonly quequeService: QuequeService,
  ) {
    console.log('[IngredientPresenter] Constructed');
    this.loadAllIngredientes();
  }

  // =========================
  // Ingredientes (catálogo)
  // =========================
  loadAllIngredientes(): void {
    console.log('[IngredientPresenter] Loading all ingredientes...');
    this.loading.set(true);
    this.error.set(null);

    this.ingredienteService.getAll().subscribe({
      next: (data: IngredienteBase[]) => {
        console.log('[IngredientPresenter] Ingredientes loaded:', data);
        this.ingredientes.set(data);
      },
      error: (err) => {
        console.error('[IngredientPresenter] Error loading ingredientes:', err);
        this.error.set('Error cargando ingredientes');
      },
      complete: () => {
        console.log('[IngredientPresenter] Finished loading ingredientes');
        this.loading.set(false);
      },
    });
  }

  // =========================
  // Asociar ingredientes a un queque
  // =========================
  agregarIngredientesAQueque(quequeId: number, ingredientes: IngredientCantidadInput[]): void {
    console.log('[IngredientPresenter] Adding ingredientes to queque:', {
      quequeId,
      ingredientes,
    });

    this.loading.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    this.quequeService.addIngredientes(quequeId, ingredientes).subscribe({
      next: (response) => {
        console.log(
          '[IngredientPresenter] Ingredientes added successfully. Backend response:',
          response,
        );
        this.successMessage.set(response.message);
      },
      error: (err) => {
        console.error('[IngredientPresenter] Error adding ingredientes to queque:', err);
        this.error.set('Error agregando ingredientes al queque');
        this.loading.set(false);
      },
      complete: () => {
        console.log('[IngredientPresenter] Finished addIngredientes request');
        this.loading.set(false);
      },
    });
  }
}
