import {Component, OnInit} from '@angular/core';
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-transaction',
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    NgClass
  ],
  templateUrl: './list-transaction.component.html',
  standalone: true,
  styles: ``
})
export class ListTransactionComponent implements OnInit {
  transactions: Transaction[];
  filteredTransactions: Transaction[] = [];

  constructor(private transactionsService: TransactionsService,
              private router:Router) {}

  ngOnInit() {
    this.transactions = this.transactionsService.getTransactions();
    this.filteredTransactions = this.getFilteredAndSortedTransactions();
  }

  // method to display only the recent transactions, and from newest to oldest
  getFilteredAndSortedTransactions(): Transaction[] {
    // extraxct the current date and last month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonthDate = new Date(currentYear, currentMonth - 1);

    return this.transactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          const transactionMonth = transactionDate.getMonth();
          const transactionYear = transactionDate.getFullYear();

          return (
              (transactionYear === currentYear && transactionMonth === currentMonth) ||
              (transactionYear === previousMonthDate.getFullYear() &&
                  transactionMonth === previousMonthDate.getMonth())
          );
        })
        // sort from the newest to the oldest
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  goToTransaction(transaction:Transaction){
    this.router.navigate(['/detail',transaction.id]);
  }

  redirectToTransactions() {
    this.router.navigate(["/transactions"])
  }
}
