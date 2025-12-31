import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import '@angular/common/locales/global/pt';
import { SvgComponent } from "../svg/svg";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-container-comment',
  standalone: true,
  imports: [DatePipe, SvgComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './container-comment.html',
  styleUrl: './container-comment.scss',
})
export class ContainerCommentComponent {
  @Input() comment!: CommentDTO;
  @Input() user!: IUserData;
  @Output() action: EventEmitter<any> = new EventEmitter();

  public slug!: string;


  handleClick(){
    this.action.emit();
  }

}
