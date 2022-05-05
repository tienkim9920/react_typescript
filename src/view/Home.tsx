import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogModel } from '../model/blogs.model';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getBlogs } from '../app/blog.redux';
// import { ErrorService } from '../service/error.service';

function Home(props: any) {

    const { blogs } = useAppSelector((state: any) => state.blog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!blogs.length){
            dispatch(getBlogs());
        }

        // ErrorService.getPosts().subscribe(res => console.log(res));
    }, [])


    return (
        <div className="section-home pb-5">
            { !blogs.length && <div className='mt-5'>Loading...</div>}
            <div className="group-todo">
                {blogs && blogs.map((item: BlogModel, index: string) => (
                    <div className="box-todo p-3 mt-5" key={`${index}`}>
                        <Link to={`/blogs/${item._id}`}>
                            <div className='font-weight-bold color-main font-size-25'>{item.title}</div>
                            <div className='font-size-20'>{item.body}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;