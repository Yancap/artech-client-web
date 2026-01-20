import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Articles } from './pages/articles/articles';
import { Categories } from './pages/categories/categories';
import { Article } from './pages/article/article';
import { Search } from './pages/search/search';

export const routes: Routes = [
  {
    component: Login,
    path: 'login',
    data: { title: 'Login' }
  },
  {
    component: Register,
    path: 'register',
    data: { title: '' }
  },
  {
    component: Home,
    path: '',
  },
  {
    component: Articles,
    path: 'articles',
  },
  {
    component: Article,
    path: 'articles/:slug',
  
  },
  {
    component: Categories,
    path: 'articles/category/:category',
  },
  {
    component: Search,
    path: 'search',
    
  },
];
