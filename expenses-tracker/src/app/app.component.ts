import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: 'app.component.html',
  styles: [],
  standalone: true
})
export class AppComponent {
  title = 'expenses-tracker';
}
