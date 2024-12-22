import {Component, OnInit} from '@angular/core';
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";

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

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactions = this.transactionsService.getTransactions();
  }

}
