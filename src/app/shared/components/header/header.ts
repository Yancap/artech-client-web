import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg';
import { ProfileComponent } from '../profile/profile';
import { SearchEngineComponent } from '../search-engine/search-engine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ProfileComponent, SearchEngineComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  goToArticlesPage() {
    this.router.navigateByUrl('/articles');
  }
}
