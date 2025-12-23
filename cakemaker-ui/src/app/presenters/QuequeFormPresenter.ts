import { Injectable, signal, computed, inject } from '@angular/core';
import { CreateQuequeDto, QuequeService } from '../models/queque-service';

@Injectable()
export class QuequeFormPresenter {
  private readonly quequeService = inject(QuequeService);

  // =========================
  // State
  // =========================
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _message = signal<string | null>(null);
  private readonly _queque = signal<any | null>(null);

  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly message = computed(() => this._message());
  readonly queque = computed(() => this._queque());

  // =========================
  // Commands
  // =========================
  create(payload: CreateQuequeDto): void {
    this._execute(() => this.quequeService.create(payload));
  }

  update(id: number, payload: Partial<CreateQuequeDto>): void {
    this._execute(() => this.quequeService.update(id, payload));
  }

  loadById(id: number): void {
    this._startRequest();

    this.quequeService.getById(id).subscribe({
      next: (queque) => {
        this._queque.set(queque);
        this._loading.set(false);
      },
      error: () => this._handleError('Error al cargar el queque'),
    });
  }

  // =========================
  // Internal helpers
  // =========================
  private _execute(requestFn: () => any): void {
    this._startRequest();

    requestFn().subscribe({
      next: (response: any) => this._handleSuccess(response),
      error: () => this._handleError('Error al guardar el queque'),
    });
  }

  private _startRequest(): void {
    this._loading.set(true);
    this._error.set(null);
    this._message.set(null);
  }

  private _handleSuccess(response: any): void {
    this._loading.set(false);
    this._setMessage(response?.message ?? 'Operación exitosa');

    if (response?.id) {
      this.loadById(response.id);
    }
  }

  private _handleError(message: string): void {
    this._loading.set(false);
    this._error.set(message);
  }

  private _setMessage(message?: string): void {
    if (message) {
      this._message.set(message);
    }
  }
}
