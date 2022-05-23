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

export const HEADER_TABLE = [{
    Header: "Table Todo",
    columns: [
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Username",
            accessor: "username",
        },
        {
            Header: "Body",
            accessor: "body",
        },
        {
            Header: "Phone",
            accessor: "phone",
        },
    ]
}];

export const BODY_TABLE = [
    {
        title: '1',
        username: '1',
        body: '1',
        phone: '1'
    },
    {
        title: '2',
        username: '2',
        body: '2',
        phone: '2'
    },
    {
        title: '3',
        username: '3',
        body: '3',
        phone: '3'
    },
] as any[];