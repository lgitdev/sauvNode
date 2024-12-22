import {Component, OnInit} from '@angular/core';
import { Transaction } from "../transaction";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-new-transaction-form',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './new-transaction-form.component.html',
  standalone: true,
  styles: ``
})
export class NewTransactionFormComponent implements OnInit {
  categories: string[];
  paymentMethods: string[];
  tagsInput: string = '';
  transaction: Transaction;

  constructor(
      private transactionsService: TransactionsService,
      private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.transactionsService.getCategoryList();
    this.paymentMethods = this.transactionsService.getPaymentMethods();

    this.transaction = {
      amount: 0,
      isExpense: true,
      date: new Date(),
      category: '',
      description: '',
      paymentMethod: '',
      tags: []
    };
  }

  onSubmit() {
    this.transactionsService.createTransaction(this.transaction).subscribe({
      next: (createdTransaction) => {
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        alert('An error occurred while creating the transaction.');
      }
    });
  }

  selectType(isExpense: boolean): void {
    this.transaction.isExpense = isExpense;
  }


  selectCategory(category: string): void {
    this.transaction.category = category;
  }

  selectPayment(payment: string): void {
    this.transaction.paymentMethod = payment;
  }

  updateTags(input: string): void {
    this.transaction.tags = input.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  }

  removeTag(index: number): void {
    this.transaction.tags.splice(index, 1);
    this.tagsInput = this.transaction.tags.join(', '); // Met à jour le champ des tags
  }
}
