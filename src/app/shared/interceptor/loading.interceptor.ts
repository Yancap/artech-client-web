import {
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';import { LoadingService } from '../services/loading/loading.service';
;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService);

  loader.show();

  return next(req).pipe(
    finalize(() => loader.hide())
  );
};
