import { signal } from '@angular/core';
import { Queque, QuequeService, CreateQuequeDto } from '../models/queque-service';
import { NavigationCoordinator } from '../coordinator/inicioCordinator';

export class QuequePresenter {
  // =========================
  // State
  // =========================
  readonly queques = signal<Queque[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private navigator = new NavigationCoordinator();

  constructor(private readonly service: QuequeService) {}

  // =========================
  // Actions
  // =========================
  loadAll() {
    this.loading.set(true);
    this.error.set(null);

    this.service.getAll().subscribe({
      next: (data: Queque[]) => this.queques.set(data),
      error: () => this.error.set('Error cargando queques'),
      complete: () => this.loading.set(false),
    });
  }

  openDetail(quequeId: number) {
    this.navigator.goToQuequeDetail(quequeId);
  }
}
