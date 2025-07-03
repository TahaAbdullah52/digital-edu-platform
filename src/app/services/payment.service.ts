import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { payment_item } from '../models/payment';
import { MOCK_PAYMENTS } from '../mock-data/mock-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

   // Helper method to get JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  
  getPayments(): Observable<payment_item[]> {
     const headers = this.getAuthHeaders();
      return this.http.get<payment_item[]>(`${this.apiUrl}/user/payments`, { headers }).pipe(
        catchError((err) => {
          console.warn('API not ready or failed. Falling back to mock data.');
          return of(MOCK_PAYMENTS);
        })
      );
    }
  createPayment(data: {
    user_id: number;
    course_id: number;
    type: string;
    trxId: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/payments`, data);
  }

}
