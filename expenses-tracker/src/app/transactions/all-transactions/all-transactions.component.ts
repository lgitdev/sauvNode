import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";
import {TRANSACTIONS} from "../mock-transaction-list";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-all-transactions',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgClass,
    FormsModule
  ],
  templateUrl: './all-transactions.component.html',
  standalone: true,
  styles: ``
})
export class AllTransactionsComponent implements OnInit {
  transactions: Transaction[];
  searchTerm: string = '';
  filteredTransactions: Transaction[];

  constructor(private router:Router) {}

  ngOnInit() {
    this.transactions = this.getSortedTransactions();
    this.filteredTransactions = this.transactions;
  }

  getSortedTransactions(): Transaction[] {
    return TRANSACTIONS
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  goToTransaction(transaction:Transaction){
    this.router.navigate(['/detail',transaction.id]);
  }

  filterTransactions() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesDescription = transaction.description.toLowerCase().includes(term);
      const matchesCategory = transaction.category.toLowerCase().includes(term);
      const matchesTags = transaction.tags.some(tag => tag.toLowerCase().includes(term));
      const matchesDate = transaction.date.toISOString().toLowerCase().includes(term);
      const matchesAmount = transaction.amount.toString().includes(term);
      return matchesDescription || matchesCategory || matchesTags || matchesDate || matchesAmount;
    });
  }

}
