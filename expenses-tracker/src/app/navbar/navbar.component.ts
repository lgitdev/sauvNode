import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styles: ``
})
export class NavbarComponent {

  constructor(private router: Router) {
  }

  navigateToTransactions(filters: { showIncome: boolean; showExpense: boolean }) {
    this.router.navigate(['/transactions'], {
      queryParams: filters,
    });
  }
}
