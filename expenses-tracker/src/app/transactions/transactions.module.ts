import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {ListTransactionComponent} from "./list-transaction/list-transaction.component";
import {ExpensesComponent} from "./expenses/expenses.component";
import {IncomesComponent} from "./incomes/incomes.component";

export const transactionRoutes: Routes = [
  { path:'dashboard', component: ListTransactionComponent},
  { path:'expenses/:id', component: ExpensesComponent},
  { path:'incomes/:id', component: IncomesComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TransactionsModule { }
