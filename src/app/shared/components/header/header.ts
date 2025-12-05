import { Component } from '@angular/core';
import { SvgComponent } from "../svg/svg";
import { ProfileComponent } from "../profile/profile";
import { SearchComponent } from "../search/search";

@Component({
  selector: 'app-header',
  imports: [ProfileComponent, SearchComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {

}
