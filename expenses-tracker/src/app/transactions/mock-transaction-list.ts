// mock-transaction-list.ts
import { Transaction } from './transaction';

export const TRANSACTIONS: Transaction[] = [
    {
        id: 1,
        amount: 50.0,
        isExpense: true,
        date: new Date('2024-12-01'),
        category: 'Food',
        description: 'Restaurant dinner',
        paymentMethod: 'Card',
        tags: ['restaurant', 'hobbies']
    },
    {
        id: 2,
        amount: 1500.0,
        isExpense: false,
        date: new Date('2024-12-05'),
        category: 'Salary',
        description: 'Mensual salary',
        paymentMethod: 'Transfer',
        tags: ['Income', 'Salary']
    },
    {
        id: 3,
        amount: 80.0,
        isExpense: true,
        date: new Date('2024-12-07'),
        category: 'Transport',
        description: 'Mensual transport card payment',
        paymentMethod: 'Card',
        tags: ['transport']
    },
    {
        id: 4,
        amount: 20.0,
        isExpense: true,
        date: new Date('2024-12-08'),
        category: 'Hobbies',
        description: 'Movies',
        paymentMethod: 'Cash',
        tags: ['Movies', 'Hobbies']
    },
    {
        id: 5,
        amount: 200.0,
        isExpense: false,
        date: new Date('2024-12-10'),
        category: 'Others',
        description: 'Refund from a friend',
        paymentMethod: 'Transfer',
        tags: ['Refund']
    }
];
