import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'transactionTagFormat'
})
export class TransactionTagFormatPipe implements PipeTransform {

  transform(tag: string): string {
    let colorClass: string;

    switch (tag) {
      case 'Refund':
        colorClass = 'badge bg-primary'; // Bleu Bootstrap
        break;
      case 'Hobbies':
        colorClass = 'badge bg-warning text-dark'; // Jaune Bootstrap
        break;
      case 'Transport':
        colorClass = 'badge bg-success'; // Vert Bootstrap
        break;
      case 'Income':
        colorClass = 'badge bg-info text-dark'; // Cyan Bootstrap
        break;
      case 'Restaurant':
        colorClass = 'badge bg-danger'; // Rouge Bootstrap
        break;
      default:
        colorClass = 'badge bg-secondary'; // Gris Bootstrap
        break;
    }

    return colorClass;
  }

}
