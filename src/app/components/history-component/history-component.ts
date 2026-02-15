import { Component } from '@angular/core';
import { TransactionLog } from '../../transaction-log';
import { Accountservice } from '../../services/accountservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-component',
  standalone: false,
  templateUrl: './history-component.html',
  styleUrl: './history-component.css',
})
export class HistoryComponent {

  transactions: TransactionLog[] = [];
  accountId!: number;

  constructor(
    private accountService: Accountservice,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get accountId from route parameter
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTransactions(this.accountId);
  }

  loadTransactions(id: number): void {
    this.accountService.getTransactions(id).subscribe({
      next: (logs) => this.transactions = logs,
      error: (err) => console.error('Error fetching transactions:', err)
    });
  }
}

