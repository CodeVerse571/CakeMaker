import { computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredientes, Queque, QuequeService } from '../models/queque-service';

export class QuequeDetailPresenter {
  private readonly route = inject(ActivatedRoute);
  private readonly quequeService = inject(QuequeService);

  // =========================
  // State
  // =========================

  readonly queque = signal<Queque | null>(null);
  readonly ingredientes = signal<Ingredientes[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly showIngredientDialog = signal(false);

  readonly costoTotal = computed(() =>
    this.ingredientes().reduce((total, ing) => total + ing.costoUnitario * ing.cantidad, 0),
  );

  constructor() {
    this.loadData();
  }

  // =========================
  // Initial Load
  // =========================

  private loadData(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const quequeId = Number(idParam);

    if (Number.isNaN(quequeId)) {
      this.error.set('ID de queque inválido');
      this.loading.set(false);
      return;
    }

    this.fetchQueque(quequeId);
    this.fetchIngredientes(quequeId);
  }

  // =========================
  // Fetchers
  // =========================

  private fetchQueque(quequeId: number): void {
    this.quequeService.getById(quequeId).subscribe({
      next: (data) => this.queque.set(data),
      error: () => {
        this.error.set('Error al cargar el queque');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  fetchIngredientes(quequeId: number): void {
    this.quequeService.getIngredientes(quequeId).subscribe({
      next: (data) => this.ingredientes.set(data),
      error: () => this.error.set('Error al cargar ingredientes'),
    });
  }



  openIngredientDialog(): void {
    this.showIngredientDialog.set(true);
  }

  closeIngredientDialog(): void {
    this.showIngredientDialog.set(false);

    const quequeId = this.queque()?.id;
    if (quequeId) {
      // ✅ refrescar tras agregar ingredientes
      this.fetchIngredientes(quequeId);
    }
  }
}
