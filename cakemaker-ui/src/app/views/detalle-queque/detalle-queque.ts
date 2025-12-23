import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { QuequeDetailPresenter } from '../../presenters/detalle.presenter';
import { IngredientDialog } from '../ingredient-module/ingredient-module';

@Component({
  selector: 'app-detalle-queque',
  imports: [CommonModule, IngredientDialog],
  templateUrl: './detalle-queque.html',
  styleUrl: './detalle-queque.css',
})
export class DetalleQueque {
  presenter = new QuequeDetailPresenter();
}
