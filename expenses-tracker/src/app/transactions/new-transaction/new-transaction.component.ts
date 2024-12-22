import { Component } from '@angular/core';
import {Transaction} from "../transaction";
import {EditTransactionFormComponent} from "../edit-transaction-form/edit-transaction-form.component";
import {NgIf} from "@angular/common";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-transaction',
  imports: [
    EditTransactionFormComponent,
    NgIf
  ],
  template: `
    <app-edit-transaction-form *ngIf="transaction" [transaction]="transaction"
                               (submit)="createTransaction()"></app-edit-transaction-form>
  `,
  standalone: true,
  styles: ``
})
export class NewTransactionComponent {
  transaction: Transaction = {
    amount: 0,
    isExpense: true, // by default but we can change it
    date: new Date(),
    category: '',
    description: '',
    paymentMethod: '',
    tags: []
  };

  constructor(
      private transactionsService: TransactionsService,
      private router: Router
  ) {
  }

  createTransaction() {
    this.transactionsService.createTransaction(this.transaction).subscribe({
      next: () => {
        alert('Transaction created successfully!');
        this.router.navigate(['/transactions']);
      },
      error: (err: any) => {
        console.error('Failed to create transaction:', err);
        alert('An error occurred while creating the transaction.');
      }
    });
  }
}
