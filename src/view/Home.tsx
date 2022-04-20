import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostModel } from '../model/posts.model';
import { PostService } from '../service/posts.service';


function Home(props: any) {

    const [blogs, setBlogs] = useState<any>();

    useEffect(() => {
        PostService.GetBlogs().subscribe(res => {
            setBlogs(res);
            console.log(res);
        });
    }, [])


    return (
        <div className="section-home">
            <div className="group-todo">
                {blogs && blogs.map((item: PostModel, index: string) => (
                    <div className="box-todo p-3 mt-3" key={`${index}`}>
                        <Link to={`/blogs/${item.userId}`}>
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