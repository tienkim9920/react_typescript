import React, { useState } from 'react';
import { useFilters, useGlobalFilter, usePagination, useTable } from 'react-table';
import InputData from './input-data.component';
import PaginationButton from './pagination-button';

function TableData(props: any) {

    const { columns, data, defaultColumn, activeFilter, headerText, filterSelectBox, labelSelectBox, eventSelectBox } = props;

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
        filterRows
    } = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter, usePagination)

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <div className="mt-5 mb-5">
            <InputData data={globalFilter} setData={setGlobalFilter} textHolder="Enter Search Global" />
            {
                filterSelectBox && <select onChange={(e) => eventSelectBox(e.target.value)}>
                    { labelSelectBox.map((item: any, index: any) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    )) }
                </select>
            }
            <table {...getTableProps()} className="table-todo mt-3 bg-white radius-5 w-100">
                <thead className="bg-color-main">
                    {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                        <th {...column.getHeaderProps()} className="text-center font-size-18 pb-3 color-white">
                            { column.render('Header') !== headerText && column.render('Header') }
                            { (column.canFilter && activeFilter) ? column.render('Filter') : null }
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
                                {(() => {
                                    switch (cell.render('id')) {
                                        case "delivery":
                                            const delivery = cell.render('Cell').props.cell.row.values.delivery;
                                            if (delivery === '0'){
                                                return 'Đang xử lý';
                                            } else if (delivery === '1') {
                                                return 'Đã xác nhận';
                                            } else if (delivery === '2') {
                                                return 'Đang vận chuyển';
                                            } else if (delivery === '3') {
                                                return 'Hoàn thành';
                                            } else {
                                                return 'Đã hủy';
                                            }
                                        case "total":
                                            const total = cell.render('Cell').props.cell.row.values.total
                                            return new Intl.NumberFormat('vi-VN', { style: 'decimal', currency: 'VND' }).format(total) + ' VNĐ'
                                        case 'action':
                                            return (
                                                <div className='d-flex'>
                                                    <div className='bg-color-main text-center color-white pointer input-custom radius-5'>Xác nhận</div>
                                                    &nbsp;
                                                    <div className='bg-color-danger text-center color-white pointer input-custom radius-5'>Hủy</div>
                                                </div>
                                            )
                                        default: 
                                            return cell.render('Cell');
                                    }
                                })()}
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