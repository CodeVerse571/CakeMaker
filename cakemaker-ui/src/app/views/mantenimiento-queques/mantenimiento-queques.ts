import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CreateQuequeDto } from '../../models/queque-service';
import { ActivatedRoute } from '@angular/router';
import { QuequeFormPresenter } from '../../presenters/QuequeFormPresenter';

@Component({
  selector: 'app-mantenimiento-queques',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, MessageModule],
  templateUrl: './mantenimiento-queques.html',
  styleUrl: './mantenimiento-queques.css',
})
export class MantenimientoQueques {
  readonly presenter = new QuequeFormPresenter();
  readonly form;

  quequeId?: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
  ) {
    this.form = this.fb.nonNullable.group({
      nombre: ['', Validators.required],
    });

    // =========================
    // Route param
    // =========================
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quequeId = Number(id);
      this.presenter.loadById(this.quequeId);
    }

    // =========================
    // Sync presenter → form
    // =========================
    effect(() => {
      const ingrediente = this.presenter.queque();
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

    const payload = this.form.getRawValue() as CreateQuequeDto;

    if (this.quequeId) {
      this.presenter.update(this.quequeId, payload);
    } else {
      this.presenter.create(payload);
    }
  }
}
