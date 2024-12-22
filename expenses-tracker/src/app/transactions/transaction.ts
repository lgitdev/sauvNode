export class Transaction {
    id?: number;
    amount: number;
    isExpense: boolean; // expense (true) or income (false)
    date: Date;
    category: string;
    description: string;
    paymentMethod: string;
    tags: Array<string>;
}
