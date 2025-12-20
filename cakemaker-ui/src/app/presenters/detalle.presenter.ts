import { computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredientes, Queque, QuequeService } from '../models/queque-service';

export class QuequeDetailPresenter {
  private route = inject(ActivatedRoute);
  private quequeService = inject(QuequeService);

  // Estado
  queque = signal<Queque | null>(null);

  ingredientes = signal<Ingredientes[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  readonly costoTotal = computed(() =>
    this.ingredientes().reduce((total, ing) => total + ing.costoUnitario * ing.cantidad, 0),
  );

  constructor() {
    this.loadData();
  }

  private loadData() {
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

  private fetchQueque(quequeId: number) {
    this.quequeService.getById(quequeId).subscribe({
      next: (data) => this.queque.set(data),
      error: () => this.error.set('Error al cargar el queque'),
      complete: () => this.loading.set(false),
    });
  }

  private fetchIngredientes(quequeId: number) {
    this.quequeService.getIngredientes(quequeId).subscribe({
      next: (data) => this.ingredientes.set(data),
      error: () => this.error.set('Error al cargar ingredientes'),
    });
  }
}
