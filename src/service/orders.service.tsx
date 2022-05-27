import httpAdmin from "./http-admin.service";

export const OrderService = {
    GetOrder: () => {
        return httpAdmin.get('/order')
            .then(res => res)
            .catch(err => err);
    },
    UpdateDelivery: (id?: String, delivery?: String) => {
        return httpAdmin.patch(`/order/${id}?delivery=${delivery}`)
            .then(res => res)
            .catch(err => err);
    }
}

function handleError(err: any): any {
    console.error(err);
}