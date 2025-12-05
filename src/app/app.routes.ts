import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Articles } from './pages/articles/articles';

export const routes: Routes = [
  {
    component: Login,
    path: 'login',
  },
  {
    component: Register,
    path: 'register',
  },
  {
    component: Home,
    path: '',
  },
  {
    component: Articles,
    path: 'articles',
  },
];
