import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Pipe({
  name: 'srcImage',
})
export class SrcImagePipe implements PipeTransform {

  transform(urlImage: string | null): string {
    if (!urlImage || urlImage === '')  return '';
    if (urlImage.includes('/storage/images/')) return environment.serverUrl + urlImage;
    return urlImage;
  }

}
