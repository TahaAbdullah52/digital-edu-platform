import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { payment_item } from '../models/payment';
import { MOCK_PAYMENTS } from '../mock-data/mock-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  getPayments(): Observable<payment_item[]> {
      return this.http.get<payment_item[]>('https://your-api-url.com/payments').pipe(
        catchError((err) => {
          console.warn('API not ready or failed. Falling back to mock data.');
          return of(MOCK_PAYMENTS);
        })
      );
    }
}
