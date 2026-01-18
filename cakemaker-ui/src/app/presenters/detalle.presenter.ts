import { computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredientes, Queque, QuequeService } from '../models/queque-service';
import { UiMessageService } from '../models/UiMessageService';

export class QuequeDetailPresenter {
  private readonly route = inject(ActivatedRoute);
  private readonly quequeService = inject(QuequeService);
  private readonly uiMessage = inject(UiMessageService); // 👈 AQUI

  private readonly quequeId = signal<number | null>(null);

  readonly queque = signal<Queque | null>(null);
  readonly ingredientes = signal<Ingredientes[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly showIngredientDialog = signal<boolean>(false);

  readonly costoTotal = computed(() =>
    this.ingredientes().reduce((total, ing) => total + ing.costoUnitario * ing.cantidad, 0),
  );

  constructor() {
    this.init();
  }

  // =========================
  // Init
  // =========================
  private init(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id)) {
      this.error.set('ID de queque inválido');
      this.loading.set(false);
      return;
    }

    this.quequeId.set(id);
    this.loadQueque(id);
    this.loadIngredientes(id);
  }

  // =========================
  // Loaders
  // =========================
  private loadQueque(id: number): void {
    this.loading.set(true);

    this.quequeService.getById(id).subscribe({
      next: (data) => this.queque.set(data),
      error: () => {
        this.error.set('Error al cargar el queque');
        this.uiMessage.error('No se pudo cargar el queque');
      },
      complete: () => this.loading.set(false),
    });
  }

  loadIngredientes(id: number): void {
    this.quequeService.getIngredientes(id).subscribe({
      next: (data) => this.ingredientes.set(data),
      error: () => {
        this.error.set('Error al cargar ingredientes');
        this.uiMessage.error('No se pudieron cargar los ingredientes');
      },
    });
  }

  // =========================
  // Remove Ingredient
  // =========================
  removeIngredient(ingredienteId: number): void {
    const quequeId = this.quequeId();
    if (!quequeId) return;

    this.loading.set(true);
    this.error.set(null);

    this.quequeService.removeIngrediente(quequeId, ingredienteId).subscribe({
      next: () => {
        this.uiMessage.success('Ingrediente eliminado correctamente');
        this.loadIngredientes(quequeId);
      },
      error: () => {
        this.uiMessage.error('Error al eliminar el ingrediente');
      },
      complete: () => this.loading.set(false),
    });
  }

  // =========================
  // Dialog control
  // =========================
  openIngredientDialog(): void {
    this.showIngredientDialog.set(true);
  }

  closeIngredientDialog(): void {
    this.showIngredientDialog.set(false);

    const id = this.quequeId();
    if (id) {
      this.loadIngredientes(id);
    }
  }
}
