import { Component, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { CreateIngredienteDto } from '../../models/ingrediente-service';
import { IngredienteFormPresenter } from '../../presenters/IngredienteFormPresenter';

@Component({
  standalone: true,
  selector: 'app-mantenimiento-ingrediente',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './mantenimiento-ingrediente.html',
  styleUrl: './mantenimiento-ingrediente.css',
})
export class MantenimientoIngrediente {
  readonly presenter = new IngredienteFormPresenter();
  readonly form;

  private ingredienteId?: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
  ) {
    this.form = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
      costoUnitario: [0, [Validators.required, Validators.min(0)]],
      cantidadTotal: [0, [Validators.required, Validators.min(0)]],
    });

    // =========================
    // Route param
    // =========================
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ingredienteId = Number(id);
      this.presenter.loadById(this.ingredienteId);
    }

    // =========================
    // Sync presenter → form
    // =========================
    effect(() => {
      const ingrediente = this.presenter.ingrediente();
      if (ingrediente) {
        this.form.patchValue(ingrediente);
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as CreateIngredienteDto;

    if (this.ingredienteId) {
      this.presenter.update(this.ingredienteId, payload);
    } else {
      this.presenter.create(payload);
    }
  }
}
