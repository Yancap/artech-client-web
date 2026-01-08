import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { TokenService } from '../../shared/services/token/token.service';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { concatMap, first, of } from 'rxjs';
import { ButtonComponent } from '../../shared/components/button/button';
import { InputTextComponent } from '../../shared/components/input-text/input-text';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message';
import { SvgComponent } from '../../shared/components/svg/svg';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [InputTextComponent, ButtonComponent, RouterLink, SvgComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private _email = '';
  private _password = '';
  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;
  private goTo: string = '/';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private modalMessageService: ModalMessageService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.activatedRoute.queryParams.subscribe((data) => {
      if ('goto' in data) {
        this.goTo = data['goto'];
      }
    });
    this.tokenService.resetUserToken();
    this.modalMessageService.modalStack$.subscribe((modalData) => {
      const componentRef = this.containerModalsRef.createComponent(ModalMessageComponent);
      componentRef.instance.details = modalData.details;
      componentRef.instance.message = modalData.message;
      componentRef.instance.scope = modalData.scope;
      componentRef.instance.status = modalData.status;
      componentRef.instance.type = modalData.type;
      componentRef.instance.closeAction = modalData.closeAction;
      componentRef.instance.componentRef = componentRef;
    });
  }

  public email(value: any) {
    this._email = value;
  }

  public password(value: any) {
    this._password = value;
  }

  public login(event: Event) {
    event.preventDefault();

    this.authService
      .login({
        email: this._email,
        password: this._password,
      })
      .pipe(
        first(),
        concatMap(() => {
          const token = this.tokenService.getUserToken();
          if (token) return this.router.navigateByUrl(this.goTo);
          return of();
        })
      )
      .subscribe();
  }

  public goToHome() {
    this.router.navigateByUrl('');
  }
}
