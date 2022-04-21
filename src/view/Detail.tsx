import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { decrement, increment } from '../app/counter.redux';

function Detail(props: any) {

    const count = useAppSelector((state: any) => state.counter.value);
    const dispatch = useAppDispatch();

    const handlerDown = () => {
        dispatch(decrement());
    }

    return (
        <div className="mt-2 p-3">
            <div className='font-weight-bold color-main font-size-25 mt-2'>Nguyen Kim Tien</div>
            <div className='font-size-20 mt-2'>hello work</div>
            <div className='font-size-20 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ut sapiente harum, commodi sequi numquam officia, 
            voluptas enim alias explicabo quos. Facilis ut aspernatur minus voluptatem perspiciatis illo earum nam.</div>

            <button onClick={handlerDown}>Down</button>
            <div>{ count }</div>
            <button>Up</button>
        </div>
    );
}

export default Detail;