import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'

function List(props: any) {

    const [items, setItems] = useState<any[]>([])

    const [list, setList] = useState<any>(null)

    const [search, setSearch] = useState<any>()

    const delaySearch = useRef<any>(null)

    const [page, setPage] = useState<any>(1)

    const [loading, setLoading] = useState<any>(true)

    useEffect(() => {

        if (search){

            if (delaySearch.current){
                clearTimeout(delaySearch.current)
            }

            delaySearch.current = setTimeout(() => {
                setItems(filterItems())
                setPage(1)
            }, 500)

            return
        }

        callback()

    }, [search, page])

    const callback = async () => {

        if (list){
            const newData = list.slice((page - 1) * 10, page * 10)

            console.log(newData)

            if (newData.length < 1){
                setLoading(false)
            }
    
            setTimeout(() => {
                setItems(prev => [...prev, ...newData])
            }, 2000)

            return
        }

        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json()
        setItems(data.slice(0, page * 10))
        setList(data)

    }

    const filterItems = () => {
        const filter = items.filter((value: any) => {
            return value.title.toUpperCase().indexOf(search.toUpperCase()) !== -1
        })

        return filter
    }


    return (
        <div className="section-list">
            <div className="layout-list container">
                <div className="d-flex justify-content-between">
                    <h4 className="mt-2">All List MoneyK</h4>
                    <div className="form-input-create w-25">
                        <input onChange={(e) => setSearch(e.target.value)} className="input-search" type="text" placeholder="Enter Search" />
                    </div>
                </div>
                <div className="group-list-moneyk">
                <InfiniteScroll
                    style={{ overflow: 'none' }}
                    dataLength={items.length}
                    next={() => setPage(page + 1)}
                    hasMore={true}
                    loader={loading ? (<div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>)
                    : <h4 className="text-center" style={{ paddingTop: '3rem', color: '#323232' }}>Yay! You have seen it all</h4>}
                    >
                    {
                        items && items.map((value: any) => (
                        <div className="content-list-moneyk" key={value.id}>
                            <Link to={`/detail/${value.id}`}>{value.title}</Link>
                        </div>
                        ))
                    }                
                </InfiniteScroll>
                
                </div>
            </div>
        </div>
    );
}

export default List;