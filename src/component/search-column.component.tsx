import React from "react";

function SearchColumn(props: any) {
    const { column } = props;
    const { filterValue, setFilter } = column;

    return (
        <div className="d-flex justify-content-center">
            <input
                className="width-225-1 input-custom radius-5 font-size-14"
                type="text"
                placeholder={`Enter Search`}
                value={filterValue}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    );
}

export default SearchColumn;
