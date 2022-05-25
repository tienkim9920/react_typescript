import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Pagination(props: any) {

    const { currentPage, onChangePage, totalPage } = props;
    const [pages, setPages] = useState<any>();

    const handlerChangePage = (event: Number) => {
        if (event === 0) {
            return;
        }
        onChangePage(event);
    }

    useEffect(() => {
        let listPage = [];
        if (Number(currentPage) - 1 !== 0){
            listPage.push(Number(currentPage) - 1);
            listPage.push(Number(currentPage));
        }else {
            listPage.push(Number(currentPage));
        }
        if (totalPage > 1) {
            listPage.push(Number(currentPage) + 1);
        }
        setPages(listPage);
    }, [currentPage, totalPage])

    return (
        <div className="demo">
            <nav className="pagination-outer" aria-label="Page navigation">
                <ul className="pagination">
                    {
                        Number(currentPage - 1) !== 0 && <li className="page-item">
                            <a className="page-link pointer" onClick={() => handlerChangePage(Number(currentPage) - 1)}>
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                    }
                    {
                        pages && pages.map((item: any) => (
                            <li className={`page-item ${Number(item) === Number(currentPage) && 'active'}`} key={item}>
                                <Link to={`/?page=${item}`} className="page-link pointer">{item}</Link>
                            </li>
                        ))
                    }
                    {
                        Number(currentPage) < Number(totalPage) && <li className="page-item">
                            <a className="page-link pointer" onClick={() => handlerChangePage(Number(currentPage) + 1)}>
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;