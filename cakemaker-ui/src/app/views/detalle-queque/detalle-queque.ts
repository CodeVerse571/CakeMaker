import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { QuequeDetailPresenter } from '../../presenters/detalle.presenter';
import { IngredientDialog } from '../ingredient-module/ingredient-module';

@Component({
  selector: 'app-detalle-queque',
  standalone: true,
  imports: [CommonModule, ToastModule, IngredientDialog],
  providers: [MessageService], // 👈 IMPORTANTE
  templateUrl: './detalle-queque.html',
  styleUrl: './detalle-queque.css',
})
export class DetalleQueque {
  presenter = new QuequeDetailPresenter();
}
