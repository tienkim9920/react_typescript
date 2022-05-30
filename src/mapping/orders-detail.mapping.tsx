import { IOrderDetail } from "../interface/orders-detail.interface";
import { OrderDetailModel } from "../model/orders-detail.model";

export class OrderDetailMapping {
    public static ConvertFromJSONtoData(model: OrderDetailModel) : IOrderDetail {
        if (!model){
            return null as any;
        }
        const result: IOrderDetail = {
            id: model.id,
            count: model.count,
            size: model.size,
            nameProduct: model.product?.name,
            priceProduct: model.product?.price,
            imageProduct: model.product?.image,
        }
        return result;
    }
}