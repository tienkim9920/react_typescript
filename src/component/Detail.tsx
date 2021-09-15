import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

function Detail(props: any) {

    const { id } = useParams<{id: string}>()

    const history = useHistory()

    const [item, setItem] = useState<any>()

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            const data = await res.json()
            setItem(data)

        }

        fetchData()

    }, [])

    const handlerDelete = (value: any) => {

        const fetchData = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${value}`, {
                method: 'DELETE',
            });

            console.log(res)

            history.push('/list')
        }

        fetchData()
    
    }

    return (
        <div className="section-detail">
            <div className="layout-detail container">
                <h3>This is value {id}</h3>
                <div className="mt-4 mb-3">
                    <div>{item && item.title}</div>
                    <div>{item &&  item.body}</div>
                </div>
                <div className="btn btn-danger mt-3 btn-delete" onClick={() => handlerDelete(item && item.id)}>
                    Delete value
                </div>
            </div>
        </div>
    );
}

export default Detail;