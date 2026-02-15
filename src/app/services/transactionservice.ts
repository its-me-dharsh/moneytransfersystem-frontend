import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferRequest } from '../transfer-request';
import { TransactionLog } from '../transaction-log';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Transactionservice {
  EMPURI = "http://localhost:8585/api/v1";
  constructor(private http : HttpClient){}

  // POST /api/v/transfer 
  transfer(request: TransferRequest): Observable<TransactionLog> { 
    return this.http.post<TransactionLog>(`${this.EMPURI}/transfer`, request); 
  }
}
