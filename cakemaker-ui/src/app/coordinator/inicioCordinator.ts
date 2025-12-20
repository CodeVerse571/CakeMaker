// navigation.coordinator.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export class NavigationCoordinator {
  private router = inject(Router);

  goToQuequeDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  goToIngredientes() {
    this.router.navigate(['ingredientes']);
  }
}
