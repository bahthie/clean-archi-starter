import { Exception } from '../shared/domain/service/util/exception/exceptions.service';

import { ExceptionTypeEnum } from '../shared/domain/const/exception-type.enum';
import EmailSenderService, { EmailDto } from './../utils/emailSender.service';
class AddProductToCartService {
    private maxProductsOrder = 10;

    constructor(
        private readonly productRepository: ProductService,
        private readonly orderRepository: OrderService,
        private readonly emailSenderService: EmailSenderService
    ){}

    async addProductToCart(productId: number, orderId: number, productQuantity: number): Promise<Order> {
        const orderFromDb = await this.getOrderFromDB(orderId);

        const productFromDb = await this.getProductFromDB(productId);

        if(productQuantity > this.maxProductsOrder){
            throw new Exception(ExceptionTypeEnum.BadRequest, 'You can not order more than 10 products');
        }

        if (productFromDb.quantity < productQuantity){
            throw new Exception(ExceptionTypeEnum.BadRequest, 'Not enough products in stock');
        }

        const order = await this.saveProductInOrder(productFromDb, productQuantity, orderFromDb);
        
        const emaildto: EmailDto = {
            emailsTo: [order.user.email],
            emailSubject:"Order created",
            emailContent:"Order created successfully",
        } ;

        this.emailSenderService.sendEmail(emaildto)

        return order;
    }

    private async getProductFromDB(productId: number) {
        const productFromDb = await this.productRepository.find({ id: productId });

        if (!productFromDb) {
            throw new Exception(ExceptionTypeEnum.NotFound, 'product not found');
        }
        return productFromDb;
    }

    private async getOrderFromDB(orderId: number) {
        const orderFromDb = await this.orderRepository.find({ id: orderId });

        if (!orderFromDb) {
            throw new Exception(ExceptionTypeEnum.NotFound, 'Order not found');
        }
        return orderFromDb;
    }

    private async saveProductInOrder(productFromDb: Product, productQuantity: number, orderFromDb: Order): Promise<Order> {
        productFromDb.quantity -= productQuantity;
        orderFromDb.products.push(productFromDb);
        return await this.orderRepository.save(orderFromDb);
    }
}