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
    console.log('🟢 ngOnInit');
    console.log('quequeId:', this.quequeId);
    console.log('visible:', this.visible);
    console.log('ingredientes disponibles:', this.presenter.ingredientes());

    this.syncMultiSelect();
  }

  ngOnDestroy(): void {
    console.log('🔴 ngOnDestroy');

    this.destroy$.next();
    this.destroy$.complete();
  }

  // =========================
  // Getters
  // =========================

  get ingredientesForm(): FormArray {
    console.log('📦 Getter ingredientesForm llamado');
    return this.form.get('ingredientes') as FormArray;
  }

  // =========================
  // Sync MultiSelect → FormArray
  // =========================

  private syncMultiSelect(): void {
    console.log('🔁 syncMultiSelect inicializado');

    this.form
      .get('seleccionados')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((ids: number[] | null) => {
        console.log('✅ valueChanges disparado');
        console.log('IDs seleccionados:', ids);

        if (!ids) {
          console.log('⚠️ ids es null, limpiando FormArray');
          this.ingredientesForm.clear();
          return;
        }

        const actuales = this.ingredientesForm.value as any[];

        console.log('📋 Ingredientes actuales antes de clear():', actuales);

        this.ingredientesForm.clear();

        ids.forEach((id) => {
          console.log('➡️ Procesando ID:', id);

          const ingrediente = this.presenter.ingredientes().find((i) => i.id === id);

          console.log('🍅 Ingrediente encontrado:', ingrediente);

          if (!ingrediente) {
            console.log('🚫 Ingrediente no existe, saltando');
            return;
          }

          const existente = actuales.find((i) => i.id === id);

          console.log('♻️ Existente previo:', existente);

          const group = this.fb.group({
            id: [id, Validators.required],
            nombre: [ingrediente.nombre],
            cantidadTotal: [ingrediente.cantidadTotal],
            cantidad: [
              existente?.cantidad ?? 1,
              [Validators.required, Validators.min(1), Validators.max(ingrediente.cantidadTotal)],
            ],
          });

          console.log('➕ Agregando FormGroup:', group.value);

          this.ingredientesForm.push(group);
        });

        console.log('✅ FormArray final:', this.ingredientesForm.value);
        console.log('✅ Form completo:', this.form.value);
      });
  }

  // =========================
  // Actions
  // =========================

  eliminarIngrediente(index: number): void {
    console.log('🗑️ eliminarIngrediente');
    console.log('Índice:', index);
    console.log('Antes FormArray:', this.ingredientesForm.value);
    console.log('Antes seleccionados:', this.form.get('seleccionados')!.value);

    this.ingredientesForm.removeAt(index);

    const seleccionados = this.form.get('seleccionados')!.value as number[];
    seleccionados.splice(index, 1);

    this.form.get('seleccionados')!.setValue(seleccionados);

    console.log('Después FormArray:', this.ingredientesForm.value);
    console.log('Después seleccionados:', seleccionados);
  }

  guardar(): void {
    console.log('💾 guardar() llamado');

    if (this.form.invalid) {
      console.log('❌ Formulario inválido');
      console.log(this.form);
      return;
    }

    const payload = this.ingredientesForm.value.map(({ id, cantidad }: any) => {
      console.log('Enviando:', id, cantidad);
      return { id, cantidad };
    });

    console.log('📤 Payload a enviar:', payload);

    this.presenter.agregarIngredientesAQueque(this.quequeId, payload);
  }

  close(): void {
    console.log('❎ close()');
    this.visible = false;
    this.closed.emit();
  }
}
