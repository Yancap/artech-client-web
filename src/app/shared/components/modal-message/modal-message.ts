import { Component, ComponentRef, ViewContainerRef } from '@angular/core';

import { SvgComponent } from '../svg/svg';
import { TypeModal } from '../../models/enums/type-modal.enums';
import { ModalMessageService } from '../../services/modal-message/modal-message.service';

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './modal-message.html',
  styleUrl: './modal-message.scss',
})
export class ModalMessageComponent {
  message: string = 'Permissão negada.';
  details: string = 'Você não tem acesso para realizar essa ação.';
  scope: 'top' | 'component' = 'top';
  type: TypeModal | string = TypeModal.INFO;
  status = 500;
  closeAction: (() => void ) | undefined  = () => {};
  componentRef!: ComponentRef<ModalMessageComponent>;

  constructor(private modalMessageService: ModalMessageService) {}

  closeModal() {
    this.modalMessageService.stackArray.pop();
    if(this.modalMessageService.stackArray.length === 0){
      this.modalMessageService.statusSituationError = 0;
    }
    if(this.closeAction) this.closeAction();
    this.componentRef?.destroy();
  }

  getType() {
    if(this.type) return this.type.toLowerCase();
    return TypeModal.ERROR.toLowerCase();
  }
}
