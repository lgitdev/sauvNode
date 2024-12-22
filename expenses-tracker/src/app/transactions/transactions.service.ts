import { Injectable } from '@angular/core';
import {TRANSACTIONS} from "./mock-transaction-list";
import {Transaction} from "./transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  getTransactions(): Transaction[] {
    return TRANSACTIONS;
  }
  // return all the expenses
  getExpenses(): Transaction[] {
    return TRANSACTIONS.filter((transaction) => transaction.isExpense);
  }

  // return all the incomes
  getIncomes(): Transaction[] {
    return TRANSACTIONS.filter((transaction) => !transaction.isExpense);
  }

  // calculate the balance of our database
  calculateBalance(): number {
    const incomes:number = this.getIncomes().reduce((total:number, transaction:Transaction):number => total + transaction.amount, 0);
    const expenses:number = this.getExpenses().reduce((total:number, transaction:Transaction):number => total + transaction.amount, 0);
    return incomes - expenses;
  }
}
