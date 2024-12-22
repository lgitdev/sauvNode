import { Routes } from '@angular/router';
import {transactionRoutes} from "./transactions/transactions.module";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
    { path:'', redirectTo:'dashboard', pathMatch: 'full' },
    ...transactionRoutes,
    { path:'**', component:PageNotFoundComponent}
];
