import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentApiResponse } from '../../../models/payment';
import { PaymentManagementService } from '../../services/payment-management.service';

@Component({
  selector: 'app-payment-management',
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-management.component.html',
  styleUrl: './payment-management.component.css'
})
export class PaymentManagementComponent implements OnInit {
   
  paymentRequests: PaymentApiResponse[] = [];
  loading = false;
  error: string | null = null;
  selectedPayment: any = null;
  

  constructor(private paymentManagementService: PaymentManagementService){}

  ngOnInit(): void {
    this.loadPaymentRequests();
  }

  loadPaymentRequests(): void {
    this.loading = true;
    this.error = null;
    
    this.paymentManagementService.getPaymentRequests().subscribe({
      next: (payments) => {
        this.paymentRequests = payments;
        this.loading = false;
        console.log('Fetched payment requests:', this.paymentRequests);
      },
      error: (error) => {
        this.error = 'Failed to load payment requests';
        this.loading = false;
        console.error('Error loading payments:', error);
      }
    });
  }

  selectPayment(payment: PaymentApiResponse): void {
    if (this.selectedPayment?.id === payment.id) {
      this.selectedPayment = null;
    } else {
      console.log('Selected payment:', payment);
      this.selectedPayment = payment;
    }
  }

  closePaymentDetails(): void {
    this.selectedPayment = null;
  }

  acceptPayment(paymentId: number): void {
    this.paymentManagementService.acceptPayment(paymentId).subscribe({
      next: (response) => {
        // Remove from local array on success
        this.paymentRequests = this.paymentRequests.filter(payment => payment.id !== paymentId);
        console.log(`Payment ${paymentId} accepted:`, response);
      },
      error: (error) => {
        console.error(`Error accepting payment ${paymentId}:`, error);
        this.error = 'Failed to accept payment';
      }
    });
  }

  rejectPayment(paymentId: number): void {
    this.paymentManagementService.rejectPayment(paymentId).subscribe({
      next: (response) => {
        // Remove from local array on success
        this.paymentRequests = this.paymentRequests.filter(payment => payment.id !== paymentId);
        console.log(`Payment ${paymentId} rejected:`, response);
      },
      error: (error) => {
        console.error(`Error rejecting payment ${paymentId}:`, error);
        this.error = 'Failed to reject payment';
      }
    });
  }
}
