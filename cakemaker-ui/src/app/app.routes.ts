import { Routes } from '@angular/router';
import { Inicio } from './views/inicio/inicio';
import { DetalleQueque } from './views/detalle-queque/detalle-queque';
import { Ingredientes } from './views/ingredientes/ingredientes';

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
];
