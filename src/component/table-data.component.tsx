import React from 'react';
import { useFilters, useGlobalFilter, usePagination, useTable } from 'react-table';
import InputData from './input-data.component';
import PaginationButton from './pagination-button';

function TableData(props: any) {

    const { columns, data, defaultColumn } = props;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        // gotoPage,
        // pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter, usePagination)

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <div className="mt-5 mb-5">
            <InputData data={globalFilter} setData={setGlobalFilter} textHolder="Enter Search Global" />
            <table {...getTableProps()} className="table-todo mt-3 bg-white radius-5 w-100">
                <thead className="bg-color-main">
                    {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                        <th {...column.getHeaderProps()} className="text-center font-size-20 pb-3 color-white">
                            { column.render('Header') !== 'Table Todo' || 'Table Order' && column.render('Header') }
                            { column.canFilter ? column.render('Filter') : null }
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                            return (
                            <td className="text-center p-3" {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                            )
                        })}
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-4">
            <span className="mt-2-5">Page <strong>{pageIndex + 1} of {pageOptions.length} </strong></span> &nbsp;
                {/* <button onClick={() => gotoPage(0)}>{'<<<'}</button> */}
                {/* <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {
                        [5, 10, 15].map((item) => (
                            <option key={item} value={item}>
                                Show {item}
                            </option>
                        ))
                    }
                </select> */}
                <PaginationButton 
                    previousPage={previousPage} 
                    canPreviousPage={canPreviousPage}
                    nextPage={nextPage} 
                    canNextPage={canNextPage} 
                    />
                {/* <button onClick={() => gotoPage(pageCount - 1)}>{'>>>'}</button> */}
            </div>
        </div>
    );
}

export default TableData;