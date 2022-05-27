export class ShowComponentHome {
    home?: Boolean;
    edit?: Boolean;
}

export class SearchOption {
    search?: String;
    option?: FilterOption;
}

export interface FilterOption {
    label?: String,
    value?: String
}

export class UpdateDelivery {
    id?: String;
    delivery?: String;
}