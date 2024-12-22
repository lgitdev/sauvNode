import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-transaction-form',
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './edit-transaction-form.component.html',
  standalone: true,
  styleUrls: ['edit-transaction-form.component.css']
})
export class EditTransactionFormComponent implements OnInit {
  categories: string[];
  paymentMethods: string[];
  tagsInput: string = '';

  @Input() transaction: Transaction;

  constructor(private transactionsService: TransactionsService,
              private router: Router) {
  }

  ngOnInit() {
    this.categories = this.transactionsService.getCategoryList();
    this.paymentMethods = this.transactionsService.getPaymentMethods();
    this.tagsInput = this.transaction.tags.join(', ');
  }

  onSubmit(){
    if (this.transaction) {
      this.transactionsService.updateTransaction(this.transaction).subscribe({
        next: (updatedTransaction) => {
          this.router.navigate(["/detail", updatedTransaction.id]);
        },
        error: (err) => {
          alert('An error occurred while updating the transaction.');
        }
      });
    }
  }

  selectCategory(category: string): void {
    this.transaction.category = category;
  }

  selectPayment(payment: string) {
    this.transaction.paymentMethod = payment;
  }

  updateTags(input: string): void {
    this.transaction.tags = input.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  }

  removeTag(index: number): void {
    this.transaction.tags.splice(index, 1);
    this.tagsInput = this.transaction.tags.join(', '); // Update the input field
  }
}
