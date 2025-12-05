import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header";
import { ButtonComponent } from "../../shared/components/button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(
    private router: Router
  ) {}
  
  public goArticles() {
    this.router.navigateByUrl('/articles');
  }
}
