import { Component } from '@angular/core';
import { Account } from '../../account';
import { Accountservice } from '../../services/accountservice';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
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

  goToTransfer(): void {
  // navigate to transfer screen
  // you can pass accountId if needed
  this.router.navigate(['/transfer']);
}

goToHistory(): void {
  // navigate to history screen
  this.router.navigate(['/history', this.accountId]);
}

logout(): void {
  // clear session and redirect to login
  // sessionStorage.clear();
  // if you have AuthService, call authService.logout()
  // then navigate back to login
}


  
}


