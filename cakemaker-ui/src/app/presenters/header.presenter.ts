import { signal } from '@angular/core';
import { NavigationCoordinator } from '../coordinator/inicioCordinator';

export class HeaderPresenter {
  isMenuOpen = signal(false);
  private navigator = new NavigationCoordinator();
  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
