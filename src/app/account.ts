export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
  CLOSED = 'CLOSED'
}

export interface Account {
  id: number;                // Primary key
  holderName: string;        // VARCHAR(225), not null
  balance: number;           // Decimal(18,2), not null
  status: AccountStatus;     // Enum type, not null
  version?: number;          // Default = 0, optional
  lastUpdated?: Date;        // Timestamp, auto-updated
}
