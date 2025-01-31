// Interface Segregation Principle: Specific interface for payment processing
export interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface IPaymentGateway {
  processPayment(details: PaymentDetails): Promise<PaymentResult>;
  verifyPayment(transactionId: string): Promise<boolean>;
}

// Strategy Pattern: Mock payment gateway implementation for testing
export class MockPaymentGateway implements IPaymentGateway {
  async processPayment(details: PaymentDetails): Promise<PaymentResult> {
    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate
    return {
      success,
      transactionId: success ? `mock_${Date.now()}` : undefined,
      error: success ? undefined : 'Payment failed'
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    return transactionId.startsWith('mock_');
  }
}