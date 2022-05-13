import React, { useLayoutEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deleteBlogs } from '../app/blog.redux';
import { BlogModel } from '../model/blogs.model';
import { BlogService } from '../service/blogs.service';

function Detail(props: any) {

    const { id } = useParams<any>();
    const [blog, setBlog] = useState<BlogModel>({});

    const { blogs } = useAppSelector(state => state.blog);
    const dispatch = useAppDispatch();

    const router = useHistory();

    useLayoutEffect(() => {
        const index = blogs.findIndex((el: BlogModel) => el._id?.toString() === id);
        if (index !== -1) {
            setBlog(blogs[index]);
            return;
        }
        
        const fetchPost = async () => {
            const res = (await BlogService.DetailBlogs(id)).data;
            setBlog(res);
        }

        fetchPost();
    }, [])

    const handleDelete = () => {
        dispatch(deleteBlogs(id));
        router.replace('/');
    }

    return (
        <div className="mt-2 p-3">
            <div className='font-weight-bold color-main font-size-25 mt-2'>{blog.title}</div>
            <div className='font-size-20 mt-2'>{blog.username}</div>
            <div className='font-size-20 mt-2'>{blog.body}</div>
            <div className='font-size-20 mt-2'>{blog.phone}</div>
            <div className='mt-5 d-flex'>
                <div className='bg-color-main text-center color-white pointer input-custom radius-5' onClick={handleDelete}>Delete</div>
            </div>
        </div>
    );
}

export default Detail;