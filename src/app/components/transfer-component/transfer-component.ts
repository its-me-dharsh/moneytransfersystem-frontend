import { Component } from '@angular/core';
import { Transactionservice } from '../../services/transactionservice';
import { TransferRequest } from '../../transfer-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionLog } from '../../transaction-log';

@Component({
  selector: 'app-transfer-component',
  standalone: false,
  templateUrl: './transfer-component.html',
  styleUrl: './transfer-component.css',
})

export class TransferComponent {

  transferForm!: FormGroup;          // <-- define the property
  transactionLog?: TransactionLog;   // to display result

  constructor(
    private fb: FormBuilder,
    private transactionService: Transactionservice
  ) {}

  ngOnInit(): void {
    // initialize the reactive form
    this.transferForm = this.fb.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      idempotencyKey: ['', Validators.required]
    });
  }

  doTransfer(): void {
    if (this.transferForm.valid) {
      const request: TransferRequest = this.transferForm.value;

      this.transactionService.transfer(request).subscribe({
        next: (log) => this.transactionLog = log,
        error: (err) => console.error('Transfer failed:', err)
      });
    }
  }
}
