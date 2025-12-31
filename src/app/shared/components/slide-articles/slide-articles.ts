import { Component, Input } from '@angular/core';
import { SvgComponent } from '../svg/svg';
import { CardArticle } from "../card-article/card-article";

@Component({
  selector: 'app-slide-articles',
  imports: [SvgComponent, CardArticle],
  templateUrl: './slide-articles.html',
  styleUrl: './slide-articles.scss',
})
export class SlideArticles {
  @Input() articlePage!: ArticleForPage;
  @Input() title: boolean = false;

  public timestampRef!: NodeJS.Timeout;

  public slideLeft(container: HTMLDivElement) {
    this.timestampRef = setInterval(function () {
      container.scrollBy({
        left: -3,
      });
    }, 1);
  }

  public slideRight(container: HTMLDivElement) {
    this.timestampRef = setInterval(function () {
      container.scrollBy({
        left: 3,
      });
    }, 1);
  }

  public cleanTimestamp() {
    clearInterval(this.timestampRef);
  }
}
