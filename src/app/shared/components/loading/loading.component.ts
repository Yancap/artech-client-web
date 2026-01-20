import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
    <div class="loading-backdrop">
      <div class="spinner"></div>
      <span>Aguardando resposta do servidor...</span>
    </div>
  `,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

}
