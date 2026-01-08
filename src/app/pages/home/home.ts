import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header";
import { ButtonComponent } from "../../shared/components/button/button";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(
    private router: Router,
    private titleService: Title,
  ) {
    
    this.titleService.setTitle('Artech - Artigos de tecnologia');
  }
  
  public goArticles() {
    this.router.navigateByUrl('/articles');
  }
}
