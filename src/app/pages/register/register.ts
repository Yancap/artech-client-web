import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SvgComponent } from '../../shared/components/svg/svg';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button';
import { InputTextComponent } from '../../shared/components/input-text/input-text';
import { InputImageComponent } from '../../shared/components/input-image/input-image';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { UserService } from '../../shared/services/user/user.service';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message';
import { TypeModal } from '../../shared/models/enums/type-modal.enums';

@Component({
  selector: 'app-register',
  imports: [InputTextComponent, ButtonComponent, RouterLink, SvgComponent, InputImageComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  public formRegister: IUserRegister = {
    name: '',
    email: '',
    imageBlob: '',
    password: '',
    confirmPassword: '',
  };
  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;

  constructor(
    private userService: UserService,
    private modalMessageService: ModalMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modalMessageService.modalStack.subscribe((modalData) => {
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

  public onInput(value: any, key: keyof IUserRegister) {
    this.formRegister[key] = value;
  }

  public register(event: Event) {
    event.preventDefault();
    this.userService.registerUser(this.formRegister).subscribe(() => {
      this.modalMessageService.modalStack.next({
        message: `Registro realizado com sucesso.`,
        details: '',
        scope: 'top',
        status: 201,
        type: TypeModal.SUCCESS,
        closeAction: () => {
          this.router.navigateByUrl('/login');
        },
      });
    });
  }
}
