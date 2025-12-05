import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [SafeHtmlPipe],
  template: `<i class="svg-icon" [innerHTML]="svgContent | safeHtml"></i>`,
  styleUrl: './svg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgComponent implements OnChanges {
  @Input() name!: string;
  svgContent: string = '';

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.name || this.name !== '') {
      this.getIcon(this.name).subscribe((svg) => {
        this.svgContent = svg;
        this.cd.detectChanges();
      });
    }
  }

  private getIcon(name: string) {
    return this.http.get(`/svg/${name}.svg`, { responseType: 'text' });
  }
}
