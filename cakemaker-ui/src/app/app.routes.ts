import { Routes } from '@angular/router';
import { Inicio } from './views/inicio/inicio';
import { DetalleQueque } from './views/detalle-queque/detalle-queque';
import { Ingredientes } from './views/ingredientes/ingredientes';
import { MantenimientoIngrediente } from './views/mantenimiento-ingrediente/mantenimiento-ingrediente';

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
];
