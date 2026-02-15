import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../account';
import { TransactionLog } from '../transaction-log';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Accountservice {
  EMPURI = "http://localhost:8585/api/v1/accounts";
  constructor(private http : HttpClient){}
   // GET /accounts/{id}
  getAccount(id: number): Observable<Account>{
    return this.http.get<Account>(`${this.EMPURI}/${id}`);
  }

  // GET /accounts/{id}/balance
  getBalance(id: number): Observable<number>{
    return this.http.get<number>(`${this.EMPURI}/${id}/balance`);
  }

  // GET /accounts/{id}/transactions
  getTransactions(id: number): Observable<TransactionLog[]> {
    return this.http.get<TransactionLog[]>(`${this.EMPURI}/${id}/transactions`);
  }
}