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

export const HEADER_TODO_TABLE = [{
    Header: "Table Todo",
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

export const HEADER_ORDER_TABLE = [{
    Header: "Table Order",
    columns: [
        {
            Header: 'Mã Đơn Hàng',
            accessor: 'id',
        },
        {
            Header: 'Địa chỉ',
            accessor: 'address',
        },
        {
            Header: 'Số điện thoại',
            accessor: 'phone',
        },
        {
            Header: 'Tổng tiền',
            accessor: 'total',
        },
        {
            Header: 'Tình Trạng',
            accessor: 'delivery',
        },
        // {
        //     Header: 'Thanh Toán',
        //     accessor: 'pay',
        // },
        // {
        //     Header: 'Ghi Chú',
        //     accessor: 'note',
        // },
        // {
        //     Header: 'Mã Khách Hàng',
        //     accessor: 'userId',
        // },
        // {
        //     Header: 'Mã Thanh Toán',
        //     accessor: 'paymentId',
        // },
        // {
        //     Header: 'Mã Giảm Giá',
        //     accessor: 'couponId',
        // },
        // {
        //     Header: 'createAt',
        //     accessor: 'createAt',
        // },
        // {
        //     Header: 'updateAt',
        //     accessor: 'updateAt',
        // },
    ]
}]



// export const BODY_TABLE = [
//     {
//         title: '1',
//         username: '1',
//         body: '1',
//         phone: '1'
//     },
//     {
//         title: '2',
//         username: '2',
//         body: '2',
//         phone: '2'
//     },
//     {
//         title: '3',
//         username: '3',
//         body: '3',
//         phone: '3'
//     },
// ] as any[];