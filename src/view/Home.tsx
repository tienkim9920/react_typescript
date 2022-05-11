import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogModel } from '../model/blogs.model';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getBlogs, patchBlogs } from '../app/blog.redux';
import { ShowComponentHome } from '../pattern/home.pattern';
import InputBlogs from '../component/InputBlogs';
import { BlogsMapping } from '../mapping/blogs.mapping';
// import { ErrorService } from '../service/error.service';

function Home(props: any) {

    const { blogs } = useAppSelector((state: any) => state.blog);
    const dispatch = useAppDispatch();
    const [showComponent, setShowComponent] = useState<ShowComponentHome>({
        home: true,
        edit: false
    });
    const [blogEdit, setBlogEdit] = useState<BlogModel>();

    useEffect(() => {
        if (!blogs.length) {
            dispatch(getBlogs());
        }

        // ErrorService.getPosts().subscribe(res => console.log(res));
    }, [])

    const changeStatusComponent = (event: BlogModel) => {
        setBlogEdit(event);
        setShowComponent({
            home: false,
            edit: true
        });
    }

    const handleEditBlog = (blog: BlogModel) => {
        dispatch(patchBlogs(BlogsMapping.Map2Service(blog)));
        
    }

    const backStep = () => {
        setShowComponent({
            home: true,
            edit: false
        });
    }

    return (
        <div className="pb-5">
            {
                showComponent.home && <div>
                    {!blogs.length && <div className='mt-5'>Loading...</div>}
                    <div className="group-todo">
                        {blogs && blogs.map((item: BlogModel, index: string) => (
                            <div className="box-todo p-3 mt-5 d-flex justify-content-between" key={`${index}`}>
                                <div>
                                    <div className='font-weight-bold color-main font-size-25'>{item.title}</div>
                                    <div className='font-size-20'>{item.body}</div>
                                </div>
                                <div className='mt-2 mb-2 d-flex'>
                                    <Link to={`/blogs/${item._id}`} className='bg-color-main text-center color-white pointer input-custom'>View</Link>
                                    &nbsp;
                                    <div className='bg-color-main text-center color-white pointer input-custom' onClick={() => changeStatusComponent(item)}>Edit</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {
                showComponent.edit && <InputBlogs blogModel={blogEdit} categoryInput='Edit' onHandler={handleEditBlog} backStep={backStep} />
            }
        </div>
    );
}

export default Home;