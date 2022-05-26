import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import { getBlogs } from "../app/blog.redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import InputData from "../component/input-data.component";
import PaginationButton from "../component/pagination-button";
import SearchColumn from "../component/search-column.component";
import TableData from "../component/table-data.component";
import { HEADER_TODO_TABLE } from "../global/constant.global";

function Table() {

    const { blogs } = useAppSelector(state => state.blog);
    const dispatch = useAppDispatch();

    const defaultColumn = useMemo(() => {
        return {
            Filter: SearchColumn
        }
    }, [])

    const columns = useMemo(() => HEADER_TODO_TABLE, []);
    const data = useMemo(() => {
        if (!blogs.length) {
            dispatch(getBlogs());
        }
        return blogs;
    }, [blogs]);

    return (
        <TableData
            columns={columns}
            data={data}
            defaultColumn={defaultColumn}
        />
    );
}

export default Table;
