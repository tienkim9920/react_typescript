import React, { useState } from 'react';
import { PostsMapping } from '../mapping/posts.mapping';
import { PostModel } from '../model/posts.model';
import { PostService } from '../service/posts.service';

function AddBlog(props: any) {

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const handleAddBlogs = () => {
        const postModel = new PostModel();
        postModel.userId = Math.random().toString();
        postModel.title = title;
        postModel.body = body;

        PostService.PostBlogs(PostsMapping.Map2Service(postModel)).subscribe(res => console.log(res));
    }

    return (
        <div className="section-addblog">
            <div>
                <div className="font-size-30 color-main text-center">Add Blogs</div>
                <div className='mt-5'>
                    <input className='width-300 input-custom' type="text" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <input className='width-300 input-custom' type="text" placeholder='Enter Body'  value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <div className='width-300 bg-color-main text-center input-custom color-white pointer' onClick={handleAddBlogs}>Add Blogs</div>
                </div>
            </div>

        </div>
    );
}

export default AddBlog;