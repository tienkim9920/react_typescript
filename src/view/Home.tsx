import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostModel } from '../model/posts.model';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getPosts } from '../app/post.redux';
import { ErrorService } from '../service/error.service';

function Home(props: any) {

    const { posts } = useAppSelector((state: any) => state.post);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!posts.length){
            dispatch(getPosts());
        }

        // ErrorService.getPosts().subscribe(res => console.log(res));
    }, [])


    return (
        <div className="section-home">.
            <div className="group-todo">
                {posts && posts.map((item: PostModel, index: string) => (
                    <div className="box-todo p-3 mt-3" key={`${index}`}>
                        <Link to={`/posts/${item.userId}`}>
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