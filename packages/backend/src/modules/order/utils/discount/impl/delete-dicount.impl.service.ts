import { DiscountCalculatorServiceInterface } from '@src/modules/order/utils/discount-calculator.interface';
import { DiscountDeleteInterface } from '../delete-discount.interface';

export class DiscountCalculatorByJeanPierreService implements DiscountDeleteInterface {

  deleteDiscount(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      order.discount = 0;
    }
  }
}