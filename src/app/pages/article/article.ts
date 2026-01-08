import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { HeaderComponent } from '../../shared/components/header/header';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb';
import { ArticleService } from '../../shared/services/article/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, ReplaySubject, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthorComponent } from '../../shared/components/author/author';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html/safe-html.pipe';
import { ButtonComponent } from '../../shared/components/button/button';
import { InputTextComponent } from '../../shared/components/input-text/input-text';
import { ContainerCommentComponent } from '../../shared/components/container-comment/container-comment';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommentsService } from '../../shared/services/comments/comments.service';
import { SrcImagePipe } from '../../shared/pipes/src-image/src-image.pipe';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  imports: [
    NavbarComponent,
    HeaderComponent,
    BreadcrumbComponent,
    AsyncPipe,
    AuthorComponent,
    SafeHtmlPipe,
    ButtonComponent,
    ContainerCommentComponent,
    SrcImagePipe
  ],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class Article implements OnInit {
  public article$: ReplaySubject<ArticleDTO> = new ReplaySubject(1);
  public slug: string = '';
  public userData!: IUserData;
  @ViewChild('textAreaRef') textArea!: ElementRef<HTMLTextAreaElement>;

  public textareaContent: string = '';
  public linksBreadcrumb: {
    text: string;
    url: string;
  }[] = [
    {
      text: 'Artigos',
      url: '/articles/',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService,
    private commentsService: CommentsService,
    private titleService: Title,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.getAccess().subscribe((userData) => {
      if (userData) {
        this.userData = userData;
      }
    });

    this.activatedRoute.queryParams.subscribe((data) => {
      if ('textarea' in data) {
        this.textareaContent = data['textarea'];
      }
    });

    this.activatedRoute.params
      .pipe(
        take(1),
        concatMap((params) => {
          this.slug = params['slug'];
          return this.articleService.getArticleBySlug(this.slug);
        })
      )
      .subscribe(({ article }) => {
        
        this.titleService.setTitle(article.title);
        this.linksBreadcrumb.push({
          text: article.category,
          url: '/articles/category/' + article.category,
        });

        this.linksBreadcrumb.push({
          text: article.title,
          url: '/articles/' + article.slug,
        });
        this.article$.next(article);
        this.cd.detectChanges();
      });
  }

  createComment(event: Event) {
    event.preventDefault();
    if (!this.userData) {
      if (!this.textArea.nativeElement.value) {
        this.router.navigateByUrl('login');
        return;
      }
      this.activatedRoute.url.subscribe((urlSegmentArray) => {
        let buildUrlGoTo = '';
        let commentContent = this.textArea.nativeElement.value;
        buildUrlGoTo = urlSegmentArray.map((urlSeg) => urlSeg.path).join('/');
        buildUrlGoTo = buildUrlGoTo + `?textarea=${commentContent}`;
        this.router.navigateByUrl(`login?goto=${buildUrlGoTo}`);
        return;
      });
    }

    if (this.textArea.nativeElement) {
      const reqCreateComment = {
        articleSlug: this.slug,
        text: this.textArea.nativeElement.value,
      };
      this.commentsService
        .createComment(reqCreateComment)
        .pipe(
          take(1),
          concatMap(() => this.articleService.getArticleBySlug(this.slug)),
          tap(({ article }) => this.article$.next(article))
        )
        .subscribe(() => {
          this.textArea.nativeElement.value = '';
        });
    }
  }
}
