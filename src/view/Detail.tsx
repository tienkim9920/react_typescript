import React from 'react';
// import { useAppSelector, useAppDispatch } from '../app/hooks';

function Detail(props: any) {

    // const count = useAppSelector((state: any) => state.counter.value);
    // const dispatch = useAppDispatch();

    return (
        <div className="mt-2 p-3">
            <div className='font-weight-bold color-main font-size-25 mt-2'>Nguyen Kim Tien</div>
            <div className='font-size-20 mt-2'>hello work</div>
            <div className='font-size-20 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ut sapiente harum, commodi sequi numquam officia, 
            voluptas enim alias explicabo quos. Facilis ut aspernatur minus voluptatem perspiciatis illo earum nam.</div>
        </div>
    );
}

export default Detail;