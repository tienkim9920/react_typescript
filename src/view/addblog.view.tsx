import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { addBlogs } from '../app/blog.redux';
import { BlogsMapping } from '../mapping/blogs.mapping';
import { BlogModel } from '../model/blogs.model';
import { BlogService } from '../service/blogs.service';
import InputBlogs from '../component/InputBlogs';

function AddBlog(props: any) {

    const dispatch = useAppDispatch();

    const handleAddBlogs = (blog: BlogModel) => {
        const postAddBlogs = async () => {
            const res = await BlogService.AddBlogs(BlogsMapping.Map2Service(blog));
            if (res.status === 200) {
                dispatch(addBlogs(res.data));
            }
        }
        postAddBlogs();
    }

    return (
        <InputBlogs categoryInput='Add' onHandler={handleAddBlogs} />
    );
}

export default AddBlog;