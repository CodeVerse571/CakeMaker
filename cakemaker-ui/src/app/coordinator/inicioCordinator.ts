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

  goToMantenimientoIngredientes() {
    this.router.navigate(['/mantenimiento']);
  }

  goToEditarIngrediente(id: number) {
    this.router.navigate(['/mantenimiento', id]);
  }

  goToNuevoQueque(): void {
    this.router.navigate(['/queques', 'nuevo']);
  }

  goToEditarQueque(id: number): void {
    this.router.navigate(['/queques', 'actualizar', id]);
  }
}
