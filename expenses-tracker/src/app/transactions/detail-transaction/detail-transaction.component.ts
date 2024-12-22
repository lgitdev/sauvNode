import {Component, OnInit} from '@angular/core';
import {TransactionsService} from "../transactions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Transaction} from "../transaction";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {TransactionTagFormatPipe} from "../transaction-tag-format.pipe";

@Component({
  selector: 'app-detail-transaction',
  imports: [
    NgIf,
    NgForOf,
    TransactionTagFormatPipe,
    CurrencyPipe,
    DatePipe,
    NgClass
  ],
  templateUrl: './detail-transaction.component.html',
  standalone: true,
  styles: ``
})
export class DetailTransactionComponent implements OnInit {
  transaction: Transaction|undefined;

  constructor(private transactionsService:TransactionsService,
              private route:ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const transactionId: string | null = this.route.snapshot.paramMap.get('id');
    if (transactionId) {
      this.transactionsService
          .getTransactionById(+transactionId)
          .subscribe((transaction) => {
            this.transaction = transaction;
          });
    }
  }

  goToTransactionList() {
    this.router.navigate(['/transactions']);
  }


  goToEditTransaction(transaction: Transaction){
    this.router.navigate(['/edit', transaction.id]);
  }

}
