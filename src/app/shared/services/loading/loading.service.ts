import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private componentRef?: ComponentRef<LoadingComponent>;
  private counter = 0;

  
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  show(): void {
    this.counter++;

    if (this.componentRef) return;

    this.componentRef = createComponent(LoadingComponent, {
      environmentInjector: this.injector
    });

    this.appRef.attachView(this.componentRef.hostView);
    document.body.appendChild(
      this.componentRef.location.nativeElement
    );
  }

  hide(): void {
    this.counter = Math.max(0, this.counter - 1);

    if (this.counter === 0) {
      this.destroy();
    }
  }

  private destroy(): void {
    if (!this.componentRef) return;

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = undefined;
  }
}
