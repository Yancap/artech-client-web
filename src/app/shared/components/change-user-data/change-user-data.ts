import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { SvgComponent } from '../svg/svg';
import { ModalMessageService } from '../../services/modal-message/modal-message.service';
import { AuthService } from '../../services/auth/auth.service';
import { concatMap } from 'rxjs';
import { InputTextComponent } from '../input-text/input-text';
import { TypeModal } from '../../models/enums/type-modal.enums';
import { UserService } from '../../services/user/user.service';
import { SrcImagePipe } from '../../pipes/src-image/src-image.pipe';

@Component({
  selector: 'app-change-user-data',
  standalone: true,
  imports: [ButtonComponent, SvgComponent, InputTextComponent],
  templateUrl: './change-user-data.html',
  styleUrl: './change-user-data.scss',
})
export class ChangeUserDataComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalMessageService: ModalMessageService,
    private srcImage: SrcImagePipe,
    private cd: ChangeDetectorRef
  ) {}

  public changeType: 'avatar' | 'password' | null = null;
  public errorConfirmPassword = false;

  private _password = '';
  private _confirmPassword = '';

  onClose!: () => void;
  imageBlob!: string | ArrayBuffer | null;

  ngOnInit(): void {
    this.authService.userAccess$.subscribe((userData) => {
      this.imageBlob = this.srcImage.transform(userData.urlAvatar);
    });
  }

  public getimageBlob(event: any) {
    let reader = new FileReader();
    reader.onload = () => {
      this.imageBlob = reader.result;
      this.cd.detectChanges();
    };
    if (event.target?.files) {
      try {
        reader.readAsDataURL(event.target.files[0]);
      } catch {}
    }

    //this.imageBlob.emit(event);
  }

  public changeAvatar(event: Event) {
    event.preventDefault();
    this.userService
      .changeAvatar(this.imageBlob)
      .pipe(concatMap(() => this.authService.getAccess()))
      .subscribe(() => {
        this.modalMessageService.modalStack$.next({
          message: 'Avatar alterado com sucesso.',
          details: '',
          scope: 'top',
          type: TypeModal.SUCCESS,
          status: 201,
        });
        this.onClose();
      });
  }

  public changePassword(event: Event) {
    event.preventDefault();
    this.errorConfirmPassword = this._password !== this._confirmPassword;

    if (!this.errorConfirmPassword) {
      this.userService
        .changePassword(this._password)
        .pipe(concatMap(() => this.authService.getAccess()))
        .subscribe(() => {
          this.modalMessageService.modalStack$.next({
            message: 'Senha alterada com sucesso.',
            details: '',
            scope: 'top',
            type: TypeModal.SUCCESS,
            status: 201,
          });
          this.onClose();
        });
    }
  }

  public getPassword(value: string) {
    this._password = value;
  }

  public getConfirmPassword(value: string) {
    this._confirmPassword = value;
  }

  setChangeType(type: 'avatar' | 'password') {
    this.changeType = type;
  }
}
