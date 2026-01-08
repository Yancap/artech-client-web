import { DatePipe } from '@angular/common';
import { Component, Input, LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/pt';
import { Router } from '@angular/router';
import { SrcImagePipe } from '../../pipes/src-image/src-image.pipe';

@Component({
  selector: 'app-card-article',
  imports: [DatePipe, SrcImagePipe],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  templateUrl: './card-article.html',
  styleUrl: './card-article.scss',
})
export class CardArticle {
  @Input() article!: ArticleDTO;

  constructor(private router: Router) {}

  goToArticle(slug: string) {
    this.router.navigateByUrl('/articles/' + slug);
  }
}
