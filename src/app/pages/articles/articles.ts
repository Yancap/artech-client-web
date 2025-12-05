import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header";
import { Navbar } from "../../shared/components/navbar/navbar";

@Component({
  selector: 'app-articles',
  imports: [HeaderComponent, Navbar],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {

}
