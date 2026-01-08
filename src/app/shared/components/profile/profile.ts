import { catchError, of, take } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SvgComponent } from '../svg/svg';
import { ChangeUserDataComponent } from '../change-user-data/change-user-data';
import { SrcImagePipe } from '../../pipes/src-image/src-image.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SvgComponent, SrcImagePipe],
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
      
      this.authService
        .getAccess()
        .subscribe((userData) => {
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
