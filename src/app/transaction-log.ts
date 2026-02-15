export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export interface TransactionLog {
  id: string;                // UUID (36 chars)
  fromAccountID: number;     // Foreign key
  toAccountID: number;       // Foreign key
  amount: number;            // Decimal(18,2)
  status: TransactionStatus; // Enum
  failureReason?: string;    // Nullable
  idempotencyKey: string;    // Unique
  createdOn?: Date;          // Timestamp
}
