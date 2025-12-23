import { Injectable, signal, computed, inject } from '@angular/core';
import { CreateIngredienteDto, IngredienteService } from '../models/ingrediente-service';

@Injectable()
export class IngredienteFormPresenter {
  private readonly ingredienteService = inject(IngredienteService);

  // =========================
  // State
  // =========================
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _message = signal<string | null>(null);
  private readonly _ingrediente = signal<any | null>(null);

  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly message = computed(() => this._message());
  readonly ingrediente = computed(() => this._ingrediente());

  // =========================
  // Commands
  // =========================
  create(payload: CreateIngredienteDto) {
    this._execute(() => this.ingredienteService.create(payload));
  }

  update(id: number, payload: Partial<CreateIngredienteDto>) {
    this._execute(() => this.ingredienteService.update(id, payload));
  }

  // =========================
  // Internal
  // =========================
  private _execute(request: () => any) {
    this._startRequest();

    request().subscribe({
      next: (response: any) => this._handleSuccess(response),
    });
  }

  private _startRequest() {
    this._loading.set(true);
    this._error.set(null);
    this._message.set(null);
  }

  private _handleSuccess(response: any) {
    this._loading.set(false);
    this._setMessage(response?.message);

    // 👇 si viene un id, refrescamos el ingrediente
    if (response?.id) {
      this.loadById(response.id);
    }
  }

  loadById(id: number): void {
    this._startRequest();

    this.ingredienteService.getById(id).subscribe({
      next: (ingrediente) => {
        this._ingrediente.set(ingrediente);
        this._loading.set(false);
      },
    });
  }

  private _setMessage(message?: string) {
    if (message) {
      this._message.set(message);
    }
  }
}
