import SearchColumn from "../component/search-column.component";

export const VALUE_OPTION = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'To do',
        value: 'todo'
    },
    {
        label: 'In Progress',
        value: 'inprogress'
    },
    {
        label: 'Done',
        value: 'done'
    }
];

export const LIMIT_PAGINATION = 3;

export const HEADER_TEXT_TODO = 'Table Todo';
export const HEADER_TODO_TABLE = [{
    Header: HEADER_TEXT_TODO,
    columns: [
        // {
        //     Header: "Id",
        //     accessor: "_id",
        //     Filter: SearchColumn,
        //     disableFilters: true,
        // },
        {
            Header: "Title",
            accessor: "title",
            // Filter: SearchColumn
        },
        {
            Header: "Username",
            accessor: "username",
            // Filter: SearchColumn
        },
        {
            Header: "Body",
            accessor: "body",
            // Filter: SearchColumn
        },
        {
            Header: "Phone",
            accessor: "phone",
            // Filter: SearchColumn
        },
    ]
}];

export const HEADER_TEXT_ORDER = 'Table Order';
export const HEADER_ORDER_TABLE = [{
    Header: HEADER_TEXT_ORDER,
    columns: [
        {
            Header: 'Id',
            accessor: 'id',
        },
        {
            Header: 'Address',
            accessor: 'address',
        },
        {
            Header: 'Phone',
            accessor: 'phone',
        },
        {
            Header: 'Total',
            accessor: 'total',
        },
        {
            Header: 'Delivery',
            accessor: 'delivery',
        },
        {
            Header: 'Action',
            accessor: 'action',
        },
    ]
}]

export const FILTER_LABEL_DELIVERY = [
    {
        label: 'Tất cả',
        value: 'all',
    },
    {
        label: 'Đang xử lý',
        value: '0',
    },
    {
        label: 'Đã xác nhận',
        value: '1',
    },
    {
        label: 'Đang vận chuyển',
        value: '2',
    },
    {
        label: 'Hoàn thành',
        value: '3',
    },
    {
        label: 'Đã hủy',
        value: '4',
    },
]


export const HEADER_TEXT_ORDER_DETAIL = 'Table Order Detail';
export const HEADER_ORDER_DETAIL_TABLE = [{
    Header: HEADER_TEXT_ORDER_DETAIL,
    columns: [
        {
            Header: 'Id',
            accessor: 'id',
        },
        {
            Header: 'Name',
            accessor: 'nameProduct',
        },
        {
            Header: 'Image',
            accessor: 'imageProduct',
        },
        {
            Header: 'Price',
            accessor: 'priceProduct',
        },
        {
            Header: 'Size',
            accessor: 'size',
        },
        {
            Header: 'Count',
            accessor: 'count',
        }
    ]
}]