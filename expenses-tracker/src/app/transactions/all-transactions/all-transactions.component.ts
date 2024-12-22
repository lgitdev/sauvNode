import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {NavigationEnd, Router} from "@angular/router";
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadTransactions(); // reload data every time
      }
    });
    this.loadTransactions();
  }

  private loadTransactions() {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filterTransactions();
      }});
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
    const sortedTransactions = this.getSortedTransactions();
    this.filteredTransactions = sortedTransactions.filter(transaction => {
      const matchesDescription = transaction.description?.toLowerCase().includes(term) || false;
      const matchesCategory = transaction.category?.toLowerCase().includes(term) || false;
      const matchesTags = transaction.tags?.some(tag => tag.toLowerCase().includes(term)) || false;
      const matchesAmount = transaction.amount?.toString().includes(term) || false;

      const matchesSearchTerm =
          matchesDescription || matchesCategory || matchesTags || matchesAmount;

      // Vérifie si la transaction correspond aux checkboxes Income/Expense
      const matchesIncome = this.showIncome && !transaction.isExpense;
      const matchesExpense = this.showExpense && transaction.isExpense;

      // Combine les deux conditions
      return matchesSearchTerm && (matchesIncome || matchesExpense);
    });
  }

  deleteTransaction(transactionId?: number) {
    if (transactionId !== undefined) {
      this.transactionsService.deleteTransaction(transactionId).subscribe({
        next: () => {
          this.router.navigate(['/delete-success']);
        },
        error: (err) => {
          console.error('Failed to delete transaction:', err);
          alert('An error occurred while deleting the transaction.');
        },
      });
    } else {
      alert('Transaction ID is missing.');
    }
  }




}
