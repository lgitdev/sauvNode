import { Injectable } from '@angular/core';
import {Transaction} from "./transaction";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'http://localhost:4200/api/transactions'

  constructor(private http:HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
  // return all the expenses
  getExpenses(): Observable<Transaction[]> {
    return this.getTransactions().pipe(
        map((transactions: Transaction[]) => transactions.filter((transaction) => transaction.isExpense))
    );
  }

  // return all the incomes
  getIncomes(): Observable<Transaction[]> {
    return this.getTransactions().pipe(
        map((transactions) => transactions.filter((transaction) => !transaction.isExpense))
    );
  }

  // calculate the balance of our database
  calculateBalance(): Observable<number> {
    return this.getTransactions().pipe(
        map((transactions) => {
          const incomes = transactions
              .filter((transaction) => !transaction.isExpense)
              .reduce((total, transaction) => total + transaction.amount, 0);
          const expenses = transactions
              .filter((transaction) => transaction.isExpense)
              .reduce((total, transaction) => total + transaction.amount, 0);
          return incomes - expenses;
        })
    );
  }

  // find a transaction using its ID
  getTransactionById(transactionID: number): Observable<Transaction | undefined> {
    return this.getTransactions().pipe(
        map((transactions) => transactions.find((transaction) => transaction.id === transactionID))
    );
  }

  getCategoryList():string[]{
    return [
      'Salary',
      'Food',
      'Transport',
      'Hobbies',
      'Rent',
      'Utilities',
      'Healthcare',
      'Shopping',
      'Investment',
      'Gift',
      'Others'
    ];
  }

  getPaymentMethods(): string[]{
    return ["Transfer",'Cash',"Card"];
  }


}
