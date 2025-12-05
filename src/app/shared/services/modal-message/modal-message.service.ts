import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { IModalMessageData } from '../../models/interfaces/IModalMessageData';
import { ArtechException } from '../../utils/errors/ArtechException';
import { TypeModal } from '../../models/enums/type-modal.enums';

@Injectable({
  providedIn: 'root',
})
export class ModalMessageService {
  isOpen = false;
  modalData?: IModalMessageData;
  modalStack: Subject<IModalMessageData> = new Subject();
  stackArray: string[] = [];
  statusSituationError: 0 | 508 = 0; // 0 é tratamento regular, 508 é loop de errors

  public next(value: IModalMessageData) {
    if (this.stackArray.length <= 2) {
      this.statusSituationError = 0;
      this.modalStack.next(value);
      this.stackArray.push(value.type);
      return;
    }
    this.statusSituationError = 508;
    const error: IModalMessageData = {
      message: 'Pilha de tratamento de erro estourou.',
      details: 'Verifique os LOGs e acione a equipe responsável.',
      type: TypeModal.ERROR,
      status: 508,
      scope: 'top',
    };
    this.modalStack.next(error);
  }
}
