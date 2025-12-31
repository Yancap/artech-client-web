import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { SvgComponent } from '../svg/svg';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search-engine',
  imports: [SvgComponent],
  templateUrl: './search-engine.html',
  styleUrl: './search-engine.scss',
})
export class SearchEngineComponent {
  @Input() style: 'normal' | 'alternative' = 'normal';
  @Input() value: string = '';
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('editorRef') editorRef!: ElementRef<HTMLDivElement>;
  tags: string[] = []

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}


  public searchArticle() {
    if (this.tags.length > 0) {
      this.router.navigateByUrl(`search?hashtags=${this.tags.join()}`);
      this.tags = [];
      return;
    }
    const searchValue = this.inputRef.nativeElement.value;
    this.router.navigateByUrl(`search?q=${searchValue}`);
  }

  public onInput(event: Event) {
    if (
      'data' in event &&
      event.data === ' ' &&
      event.target instanceof HTMLInputElement &&
      event.target.value.length > 0 &&
      event.target.value.includes('#')
    ) {
      this.tags.push(event.target.value.replace('#', '').trim().toLowerCase())
      event.target.value = event.target.value.replace(event.target.value, '');
    }
  }

  public removeValue(tag: string) {
    this.tags = this.tags.filter((tagArr) => tagArr !== tag);
  }
}
