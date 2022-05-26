import httpAdmin from "./http-admin.service";

export const OrderService = {
    GetOrder: () => {
        return httpAdmin.get('/order')
            .then(res => res)
            .catch(err => handleError(err));
    },
}

function handleError(err: any): any {
    console.error(err);
}