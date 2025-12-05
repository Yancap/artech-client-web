import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { RouterLink } from '@angular/router';
import { SvgComponent } from '../svg/svg';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SvgComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit {
  public categories: string[] = [
    'inteligencia artificial',
    'computação quantica',
    'front-end',
    'back-end',
    'data science',
    'cloud',
    'mobile',
    'design',
    'devops',
  ];
  public categoriesToNavbar: string[] = [];
  public categoriesToMenu: string[] = [];
  public isMenuOpened = false;

  constructor(
    private categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.isBrowser()) {
      this.handleScreenChange(window);
      window.addEventListener('resize', (event) => {
        if (event.currentTarget instanceof Window) this.handleScreenChange(event.currentTarget);
      });
    }
    // this.categoryService.getAll().subscribe(({ categories }) => {
    //   this.categories = categories;
    // });
  }

  public handleScreenChange(window: Window) {
    let maxWords = 0;
    let sumWordCategories = 0;
    if (window.innerWidth >= 1280) {
      maxWords = 85;
    } else if (window.innerWidth >= 990) {
      maxWords = 75;
    } else if (window.innerWidth >= 768) {
      maxWords = 62;
    } else if (window.innerWidth >= 600) {
      maxWords = 52;
    } else {
      maxWords = 32;
    }
    this.categoriesToNavbar = this.categories.filter((category) => {
      if (category.length <= maxWords) {
        sumWordCategories = sumWordCategories + category.length;
        if (sumWordCategories <= maxWords) return true;
        sumWordCategories = sumWordCategories - category.length;
      }
      return false;
    });

    this.categoriesToMenu = this.categories.filter(
      (elemento) => !this.categoriesToNavbar.includes(elemento)
    );

    //Menor de 400px = 32 palavras
    //Maior 600px = 52 palavras
    //Maior de 768px e Menor de 990px = 62 palavras
    //Maior de 990px e Menor de 1280px = 75 palavras
    //Maior de 1280px = 90 palavras
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  public toggleMenu() {
    console.log('click');

    this.isMenuOpened = !this.isMenuOpened;
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
