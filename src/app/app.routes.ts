import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'character-details',
    loadComponent: () => import('./character-details/character-details.page').then( m => m.CharacterDetailsPage),
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./character-details/character-details.page').then( m => m.CharacterDetailsPage),
  }
];
