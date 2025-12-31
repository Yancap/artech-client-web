import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import '@angular/common/locales/global/pt';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flat-article',
  imports: [DatePipe],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  templateUrl: './flat-article.html',
  styleUrl: './flat-article.scss',
})
export class FlatArticle implements OnChanges {
  @Input() article!: ArticleSearchedDTO;
  textArticle: string = '';
  isBrowser: boolean = false;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {

    const pElement = document.createElement('p');
    pElement.innerHTML = this.article.text;
    this.textArticle = pElement.textContent;
    pElement.remove();
  }

  goToArticle(slug: string) {
    this.router.navigateByUrl('/articles/' + slug);
  }
}
