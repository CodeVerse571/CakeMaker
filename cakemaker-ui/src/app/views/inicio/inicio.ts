import { Component, inject } from '@angular/core';
import { QuequePresenter } from '../../presenters/inicio.presenter';
import { CommonModule } from '@angular/common';
import { QuequeService } from '../../models/queque-service';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  presenter = new QuequePresenter(inject(QuequeService));
  ngOnInit() {
    this.presenter.loadAll();
  }
}
