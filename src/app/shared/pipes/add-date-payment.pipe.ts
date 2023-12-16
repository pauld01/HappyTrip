import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
name: 'addDatePayment',
standalone: true, }
)

export class AddDatePaymentPipe implements PipeTransform {
  transform(value: string): string {
    const currentDate = new Date().toLocaleDateString();
    return `${value} - Date: ${currentDate}`;
  }
}
