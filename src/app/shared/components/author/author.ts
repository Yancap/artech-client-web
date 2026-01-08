import { DatePipe } from '@angular/common';
import { Component, Input, LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/pt';
import { SrcImagePipe } from '../../pipes/src-image/src-image.pipe';

@Component({
  selector: 'app-author',
  imports: [DatePipe, SrcImagePipe],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  templateUrl: './author.html',
  styleUrl: './author.scss',
})
export class AuthorComponent {
 @Input() userData!: IUserData;
 @Input() createdAt: string = '';

}
  