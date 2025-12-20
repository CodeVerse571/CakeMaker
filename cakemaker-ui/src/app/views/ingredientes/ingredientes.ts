import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IngredientePresenter } from '../../presenters/ingrediente.presenter';
import { IngredienteService } from '../../models/ingrediente-service';

@Component({
  selector: 'app-ingredientes',
  imports: [CommonModule],
  templateUrl: './ingredientes.html',
  styleUrls: ['./ingredientes.css'],
})
export class Ingredientes implements OnInit {
  presenter = new IngredientePresenter(inject(IngredienteService));

  ngOnInit() {
    console.log('IngredientePresenter:', this.presenter);
  }
}
