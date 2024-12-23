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

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transaction.id}`, transaction);
  }

  deleteTransaction(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  getExpensesByCategory(): Observable<{ category: string; total: number }[]> {
    return this.getExpenses().pipe(
        map((expenses) => {
          const categoryTotals: { [key: string]: number } = {};
          expenses.forEach((expense) => {
            if (!categoryTotals[expense.category]) {
              categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
          });
          return Object.entries(categoryTotals).map(([category, total]) => ({
            category,
            total,
          }));
        })
    );
  }

  getMonthlyTransactions(): Observable<{ month: string; incomes: number; expenses: number }[]> {
    return this.getTransactions().pipe(
        map((transactions) => {
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const monthlyData: { [key: string]: { incomes: number; expenses: number } } = {};

          transactions.forEach((transaction) => {
            const date = new Date(transaction.date);
            const month = monthNames[date.getMonth()];
            if (!monthlyData[month]) {
              monthlyData[month] = { incomes: 0, expenses: 0 };
            }
            if (transaction.isExpense) {
              monthlyData[month].expenses += transaction.amount;
            } else {
              monthlyData[month].incomes += transaction.amount;
            }
          });

          return Object.entries(monthlyData).map(([month, { incomes, expenses }]) => ({
            month,
            incomes,
            expenses,
          }));
        })
    );
  }






}
