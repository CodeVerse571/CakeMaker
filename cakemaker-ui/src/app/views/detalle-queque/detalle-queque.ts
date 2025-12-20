import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuequeDetailPresenter } from '../../presenters/detalle.presenter';

@Component({
  selector: 'app-detalle-queque',
  imports: [CommonModule],
  templateUrl: './detalle-queque.html',
  styleUrl: './detalle-queque.css',
})
export class DetalleQueque {
  presenter = new QuequeDetailPresenter();
}
