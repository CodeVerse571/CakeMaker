import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { IngredientModulePresenter } from '../../presenters/IngredientModulePresenter';
import { IngredienteBase } from '../../models/ingrediente-service';

@Component({
  selector: 'app-ingredient-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    MultiSelectModule,
    InputNumberModule,
    DividerModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './ingredient-module.html',
  styleUrl: './ingredient-module.css',
})
export class IngredientDialog implements OnInit, OnDestroy {
  // =========================
  // Inputs / Outputs
  // =========================

  @Input() visible = false;
  @Input() quequeId!: number;
  @Input() isEditMode = false;

  @Output() closed = new EventEmitter<void>();

  // =========================
  // Injections
  // =========================

  private readonly destroy$ = new Subject<void>();
  readonly presenter = inject(IngredientModulePresenter);
  private readonly fb = inject(FormBuilder);

  // =========================
  // Form
  // =========================

  readonly form = this.fb.group({
    seleccionados: [[] as number[]],
    ingredientes: this.fb.array([]),
  });

  // =========================
  // Lifecycle
  // =========================

  ngOnInit(): void {
    this.syncMultiSelect();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // =========================
  // Getters
  // =========================

  get ingredientesForm(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  // =========================
  // Sync MultiSelect → FormArray
  // =========================

  private syncMultiSelect(): void {
    this.form
      .get('seleccionados')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((ids: number[] | null) => {
        if (!ids) {
          this.ingredientesForm.clear();
          return;
        }

        const actuales = this.ingredientesForm.value as any[];
        this.ingredientesForm.clear();

        ids.forEach((id) => {
          const ingrediente = this.presenter.ingredientes().find((i) => i.id === id);
          if (!ingrediente) return;

          const existente = actuales.find((i) => i.id === id);

          const group = this.fb.group({
            id: [id, Validators.required],
            nombre: [ingrediente.nombre],
            cantidadTotal: [ingrediente.cantidadTotal],
            cantidad: [
              existente?.cantidad ?? 1,
              [Validators.required, Validators.min(1), Validators.max(ingrediente.cantidadTotal)],
            ],
          });

          this.ingredientesForm.push(group);
        });
      });
  }

  // =========================
  // Actions
  // =========================

  eliminarIngrediente(index: number): void {
    this.ingredientesForm.removeAt(index);

    const seleccionados = this.form.get('seleccionados')!.value as number[];
    seleccionados.splice(index, 1);

    this.form.get('seleccionados')!.setValue(seleccionados);
  }

  guardar(): void {
    if (this.form.invalid) return;

    const payload = this.ingredientesForm.value.map(({ id, cantidad }: any) => ({
      id,
      cantidad,
    }));

    this.presenter.agregarIngredientesAQueque(this.quequeId, payload);
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }
}
