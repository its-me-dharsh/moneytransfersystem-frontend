import { Component } from '@angular/core';
import { Account } from '../../account';
import { Accountservice } from '../../services/accountservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  standalone: false,
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})

export class DashboardComponent{

  account?: Account;
  balance?: number;
  accountId!: number;

  constructor(
    private accountService: Accountservice,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get id from route
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAccount(this.accountId);
  }

  loadAccount(id: number): void {
    this.accountService.getAccount(id).subscribe({
      next: (acc) => this.account = acc,
      error: (err) => console.error('Error fetching account:', err)
    });

    this.accountService.getBalance(id).subscribe({
      next: (bal) => this.balance = bal,
      error: (err) => console.error('Error fetching balance:', err)
    });
  }
}
