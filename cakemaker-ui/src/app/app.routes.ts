import { Routes } from '@angular/router';
import { Inicio } from './views/inicio/inicio';
import { DetalleQueque } from './views/detalle-queque/detalle-queque';
import { Ingredientes } from './views/ingredientes/ingredientes';
import { MantenimientoIngrediente } from './views/mantenimiento-ingrediente/mantenimiento-ingrediente';
import { MantenimientoQueques } from './views/mantenimiento-queques/mantenimiento-queques';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
  },

  {
    path: 'detail/:id',
    component: DetalleQueque,
  },
  {
    path: 'ingredientes',
    component: Ingredientes,
  },
  {
    path: 'mantenimiento',
    component: MantenimientoIngrediente,
  },

  {
    path: 'mantenimiento/:id',
    component: MantenimientoIngrediente,
  },

  {
    path: 'queques/nuevo',
    component: MantenimientoQueques,
  },

  {
    path: 'queques/actualizar/:id',
    component: MantenimientoQueques,
  },
];
