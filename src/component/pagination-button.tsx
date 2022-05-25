import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PaginationButton(props: any) {
    const { nextPage, previousPage, canNextPage, canPreviousPage } = props;
    // you can canNextPage and canPreviousPage to set up disabled for button
    // ex: disabled={!canNextPage}
    // ex: disabled={!canPreviousPage}

    return (
        <nav className="pagination-outer" aria-label="Page navigation">
            <ul className="pagination">
            <li className="page-item" onClick={previousPage}>
                <a className="page-link disable pointer">
                    <span aria-hidden="true">«</span>
                </a>
            </li>
            <li className="page-item" onClick={nextPage}>
                <a className="page-link pointer">
                <span aria-hidden="true">»</span>
                </a>
            </li>
            </ul>
        </nav>
    );
}

export default PaginationButton;
