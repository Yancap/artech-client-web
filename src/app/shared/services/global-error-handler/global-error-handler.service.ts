import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ArtechException } from '../../utils/errors/ArtechException';
import { TypeModal } from '../../models/enums/type-modal.enums';
import { ModalMessageService } from '../modal-message/modal-message.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private router: Router, private modalMessageService: ModalMessageService) {}

  handleError(error: any): void {
    console.error(error);
    if (this.modalMessageService.statusSituationError === 508) {
      return;
    }
    if (error instanceof ArtechException) {
      this.artechExceptionHandler(error);
    } else if (error instanceof HttpErrorResponse) {
      this.httpErrorResponseHandler(error);
    } else {
      this.anyExceptionHandler(error);
    }

    // console.error('An error occurred:', error);
    //throw error (Keep this line uncommented in development  in order to see the error in the console)
  }
  httpErrorResponseHandler(error: HttpErrorResponse) {
    console.log(Object.keys(error.error));

    if (error.error) {
      switch (error.status) {
        case 400:
          this.modalMessageService.next({
            message: error.error.message,
            details: error.error.details,
            scope: 'component',
            type: error.error.type,
            status: error.error.status,
          });
          return;
        case 401:
          this.modalMessageService.next({
            message: error.error.message,
            details: error.error.details,
            scope: 'top',
            type: error.error.type,
            status: error.error.status,
          });
          this.router.navigateByUrl('/login');
          return;
        case 403:
        case 404:
          this.modalMessageService.next({
            message: error.error.message,
            details: error.error.details,
            scope: 'top',
            type: error.error.type,
            status: error.error.status,
          });
          return;
        case 413:
          this.modalMessageService.next({
            message: "Conteudo da requisição estourou o limite disponível.",
            details: "Consulte a equipe de TI.",
            scope: 'top',
            type: error.error.type,
            status: error.error.status,
          });
          return;
        case 500:
          this.serverExceptionHandler(error.error);
          return;
        default:
          return;
      }
    }
    switch (error.status) {
      case 400:
        this.anyExceptionHandler(error);
        return;
      case 401:
        this.anyExceptionHandler(error);
        this.router.navigateByUrl('/login');
        return;
      case 500:
        this.serverExceptionHandler({
          message: error.name,
          details: error.message,
        } as ArtechException);
        return;
      default:
        return;
    }
  }

  artechExceptionHandler(error: ArtechException) {
    this.modalMessageService.next({
      message: error.message,
      details: error.details,
      scope: error.scope,
      type: error.type,
      status: error.status,
    });
  }

  anyExceptionHandler(error: Error) {
    this.modalMessageService.next({
      message: error.name,
      details: error.message,
      scope: 'top',
      type: TypeModal.ERROR,
      status: 400,
    });
  }

  serverExceptionHandler(error: ArtechException) {
    this.modalMessageService.next({
      message: error.message,
      details: error.details,
      scope: 'top',
      type: TypeModal.ERROR,
      status: 500,
    });
  }
}
