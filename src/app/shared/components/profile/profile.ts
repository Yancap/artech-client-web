import { catchError, of, take } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SvgComponent } from '../svg/svg';
import { ChangeUserDataComponent } from '../change-user-data/change-user-data';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent implements OnInit {
  @Input() userData?: IUserData;
  @Input() direction: 'right' | 'left' = 'right';
  @Input() logout: boolean = false;
  @Input() disabledActions: boolean = false;
  @Input() keepAvatar: boolean = false;

  @ViewChild('changeAvatar', { read: ViewContainerRef, static: true })
  changeAvatarRef!: ViewContainerRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userData) {
      if (this.authService.userAccess['_buffer'].length === 0) {
        this.authService
          .getAccess()
          .pipe(
            take(1),
            catchError(() => {
              return of(null);
            })
          )
          .subscribe();
      }
      this.authService.userAccess.subscribe((userData) => {
        if (userData) {
          this.userData = userData;
          this.logout = true;
        }
      });
    }
  }

  openChangeAvatarModal() {
    if (!this.disabledActions) {
      const componentRef = this.changeAvatarRef.createComponent(ChangeUserDataComponent);
      componentRef.instance.onClose = () => componentRef.destroy();
    }
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

}
