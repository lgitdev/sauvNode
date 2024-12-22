import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BorderDirective} from "../border.directive";

@Component({
  selector: 'app-all-transactions',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgClass,
    FormsModule,
    BorderDirective
  ],
  templateUrl: './all-transactions.component.html',
  standalone: true,
  styles: ``
})
export class AllTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  searchTerm: string = '';
  filteredTransactions: Transaction[]  = [];
  showIncome: boolean = true;
  showExpense: boolean = true;

  constructor(private router:Router, private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.getTransactions().subscribe(
        (data) => {
          this.transactions = data;
          this.filteredTransactions = [...this.transactions];
        },
        (error) => {
          console.error('Failed to fetch transactions:', error);
        }
    );
  }

  getSortedTransactions(): Transaction[] {
    return this.transactions
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

      const matchesSearchTerm =
          matchesDescription || matchesCategory || matchesTags || matchesDate || matchesAmount;

      const matchesIncome = this.showIncome && !transaction.isExpense;
      const matchesExpense = this.showExpense && transaction.isExpense;


      return matchesSearchTerm && (matchesIncome || matchesExpense);
    });
  }

}
