import { Component } from '@angular/core';
import { HeaderPresenter } from '../../presenters/header.presenter';
import { CommonModule } from '@angular/common';
import { NavigationCoordinator } from '../../coordinator/inicioCordinator';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  navigator = new NavigationCoordinator();
  presenter = new HeaderPresenter();
}
