// Interface Segregation Principle: Specific interface for fine calculation
export interface IFineStrategy {
  calculateFine(daysOverdue: number, bookPrice: number): number;
}

// Strategy Pattern: Different implementations for fine calculation
export class StandardFineStrategy implements IFineStrategy {
  calculateFine(daysOverdue: number, bookPrice: number): number {
    return Math.min(daysOverdue * 0.1 * bookPrice, bookPrice);
  }
}

export class HighDemandFineStrategy implements IFineStrategy {
  calculateFine(daysOverdue: number, bookPrice: number): number {
    return Math.min(daysOverdue * 0.2 * bookPrice, bookPrice * 1.5);
  }
}