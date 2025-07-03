import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MOCK_PAYMENTS } from '../mock/payment-management-mock';
import { PaymentApiResponse } from '../../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentManagementService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPaymentRequests(): Observable<PaymentApiResponse[]> {
    return this.http.get<PaymentApiResponse[]>(`${this.baseUrl}/admin/payments`)
      .pipe(
        catchError((error) => {
          console.warn('API call failed, using mock data:', error.message);
          return of(MOCK_PAYMENTS);
        })
      );
  }

  acceptPayment(paymentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/payments/${paymentId}/accept`, {})
      .pipe(
        catchError((error) => {
          console.warn('Accept payment API call failed:', error.message);
          
          return of({ success: true, message: 'Payment accepted (offline mode)' });
        })
      );
  }

  rejectPayment(paymentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/payments/${paymentId}/reject`, {})
      .pipe(
        catchError((error) => {
          console.warn('Reject payment API call failed:', error.message);
          
          return of({ success: true, message: 'Payment rejected (offline mode)' });
        })
      );
  }
}
