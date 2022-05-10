import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addBlogs } from '../app/blog.redux';
import { BlogsMapping } from '../mapping/blogs.mapping';
import { BlogModel } from '../model/blogs.model';
import { BlogService } from '../service/blogs.service';
import { ErrorService } from '../service/error.service';

function AddBlog(props: any) {

    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const handleAddBlogs = () => {
        const postModel = new BlogModel();
        postModel.title = title;
        postModel.username = username;
        postModel.body = body;
        postModel.phone = phone;

        setLoading(true);

        const postAddBlogs = async () => {
            const res = await BlogService.AddBlogs(BlogsMapping.Map2Service(postModel));
            if (res.status === 200) {
                setLoading(false);
                setTitle('');
                setUsername('');
                setBody('');
                setPhone('');
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
                    <input className='width-300 input-custom' type="text" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <input className='width-300 input-custom' type="text" placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <input className='width-300 input-custom' type="text" placeholder='Enter Body'  value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <input className='width-300 input-custom' type="text" placeholder='Enter Phone'  value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <div className='width-300 bg-color-main text-center input-custom color-white pointer' onClick={handleAddBlogs}>Add Blogs</div>
                </div>
            </div>

        </div>
    );
}

export default AddBlog;