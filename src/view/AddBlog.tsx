import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addBlogs } from '../app/blog.redux';
import { BlogsMapping } from '../mapping/blogs.mapping';
import { BlogModel } from '../model/blogs.model';
import { BlogService } from '../service/blogs.service';
import { ErrorService } from '../service/error.service';

function AddBlog(props: any) {

    const dispatch = useAppDispatch();

    const [blogModel, setBlogModel] = useState<BlogModel>({
        title: '',
        username: '',
        body: '',
        phone: ''
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleAddBlogs = () => {
        setLoading(true);
        const postAddBlogs = async () => {
            const res = await BlogService.AddBlogs(BlogsMapping.Map2Service(blogModel));
            if (res.status === 200) {
                setLoading(false);
                setBlogModel({
                    title: '',
                    username: '',
                    body: '',
                    phone: ''
                })
                dispatch(addBlogs(res.data));
            }
        }
        postAddBlogs();
    }

    return (
        <div className="section-addblog">
            <div>
                <div className="font-size-30 color-main text-center">Add Blogs</div>
                <div className='mt-5'>
                    <input 
                        className='width-300 input-custom' 
                        type="text" 
                        placeholder='Enter Title' 
                        value={blogModel.title?.toString()} 
                        onChange={(e) => setBlogModel({...blogModel, title: e.target.value})} />
                </div>
                <div className='mt-5'>
                    <input 
                        className='width-300 input-custom' 
                        type="text" 
                        placeholder='Enter Username' 
                        value={blogModel.username?.toString()} 
                        onChange={(e) => setBlogModel({...blogModel, username: e.target.value})} />
                </div>
                <div className='mt-5'>
                    <input 
                        className='width-300 input-custom' 
                        type="text" placeholder='Enter Body'  
                        value={blogModel.body?.toString()}
                        onChange={(e) => setBlogModel({...blogModel, body: e.target.value})} />
                </div>
                <div className='mt-5'>
                    <input 
                        className='width-300 input-custom' 
                        type="text" placeholder='Enter Phone'  
                        value={blogModel.phone?.toString()}
                        onChange={(e) => setBlogModel({...blogModel, phone: e.target.value})} />
                </div>
                <div className='mt-5'>
                    <div className='width-300 bg-color-main text-center input-custom color-white pointer' onClick={handleAddBlogs}>Add Blogs</div>
                </div>
            </div>
        </div>
    );
}

export default AddBlog;