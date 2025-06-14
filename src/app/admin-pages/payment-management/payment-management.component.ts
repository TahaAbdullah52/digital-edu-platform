import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PaymentRequest {
  id: string;
  name: string;
  transactionId: string;
  initials: string;
  amount: number;
}

@Component({
  selector: 'app-payment-management',
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-management.component.html',
  styleUrl: './payment-management.component.css'
})
export class PaymentManagementComponent {
    paymentRequests: PaymentRequest[] = [
    {
      id: '1',
      name: 'John Smith',
      transactionId: 'TXN-001234567',
      initials: 'JS',
      amount: 299
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      transactionId: 'TXN-001234568',
      initials: 'SJ',
      amount: 199
    },
    {
      id: '3',
      name: 'Michael Chen',
      transactionId: 'TXN-001234569',
      initials: 'MC',
      amount: 399
    },
    {
      id: '4',
      name: 'Emily Davis',
      transactionId: 'TXN-001234570',
      initials: 'ED',
      amount: 149
    },
    {
      id: '5',
      name: 'Robert Wilson',
      transactionId: 'TXN-001234571',
      initials: 'RW',
      amount: 249
    }
  ];

  acceptPayment(paymentId: string): void {
    this.paymentRequests = this.paymentRequests.filter(payment => payment.id !== paymentId);
    console.log(`Payment ${paymentId} accepted`);
    // Here you would typically make an API call to accept the payment
  }

  rejectPayment(paymentId: string): void {
    this.paymentRequests = this.paymentRequests.filter(payment => payment.id !== paymentId);
    console.log(`Payment ${paymentId} rejected`);
    // Here you would typically make an API call to reject the payment
  }
}
