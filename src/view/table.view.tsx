import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import { getBlogs } from "../app/blog.redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputData from "../component/input-data.component";
import PaginationButton from "../component/pagination-button";
import SearchColumn from "../component/search-column.component";
import { HEADER_TABLE } from "../global/constant.global";

function Table() {

    const { blogs } = useAppSelector(state => state.blog);
    const dispatch = useAppDispatch();

    const defaultColumn = useMemo(() => {
        return {
            Filter: SearchColumn
        }
    }, [])

    const columns = useMemo(() => HEADER_TABLE, []);
    const data = useMemo(() => {
        if (!blogs.length) {
            dispatch(getBlogs());
        }
        return blogs;
    }, [blogs]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter, usePagination)

    const { globalFilter } = state;

    return (
        <div className="mt-5 mb-5">
            <InputData data={globalFilter} setData={setGlobalFilter} textHolder="Enter Search Global" />
            <table {...getTableProps()} className="table-todo mt-3 bg-white radius-5 w-100">
                <thead className="bg-color-main">
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="text-center font-size-20 pb-3 color-white">
                            { column.render('Header') !== 'Table Todo' && column.render('Header') }
                            { column.canFilter ? column.render('Filter') : null }
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
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
            <PaginationButton 
                previousPage={previousPage} 
                canPreviousPage={canPreviousPage}
                nextPage={nextPage} 
                canNextPage={canNextPage} 
                />
        </div>
        
    );
}

export default Table;
