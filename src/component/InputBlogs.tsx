import React, { useState } from "react";
import { BlogModel } from "../model/blogs.model";

function InputBlogs(props: any) {

    const { blogModel, categoryInput, onHandler, backStep } = props;

    const [blogBackup, setBlogBackup] = useState<BlogModel>({
        _id: blogModel ? blogModel._id : null,
        title: blogModel ? blogModel.title : '',
        username: blogModel ? blogModel.username : '',
        body: blogModel ? blogModel.body : '',
        phone: blogModel ? blogModel.phone : ''
    })

    const onEventAddBlog = () => {
        setBlogBackup({
            title: '',
            username: '',
            body: '',
            phone: ''
        });
        onHandler(blogBackup);
    }

    const onEventEditBlog = () => {
        onHandler(blogBackup);
    }

    return (
        <div className="section-addblog">
            <div>
                <div className="d-flex">
                    { categoryInput === 'Edit' && <i className="fa fa-arrow-circle-left font-size-35 color-main mt-1 pointer" onClick={backStep}></i>}
                    <div className={`font-size-30 color-main ${categoryInput === 'Add' ? 'ml-10' : 'ml-9'}`}>{categoryInput} Blogs</div>
                </div>

                <div className='mt-5'>
                    <input
                        className='width-300 input-custom radius-5'
                        type="text"
                        placeholder='Enter Title'
                        value={blogBackup.title?.toString()}
                        onChange={(e) => setBlogBackup({ ...blogBackup, title: e.target.value })} />
                </div>
                <div className='mt-5'>
                    <input
                        className='width-300 input-custom radius-5'
                        type="text"
                        placeholder='Enter Username'
                        value={blogBackup.username?.toString()}
                        onChange={(e) => setBlogBackup({ ...blogBackup, username: e.target.value })} />
                </div>
                <div className='mt-5'>
                    <input
                        className='width-300 input-custom radius-5'
                        type="text" placeholder='Enter Body'
                        value={blogBackup.body?.toString()}
                        onChange={(e) => setBlogBackup({ ...blogBackup, body: e.target.value })} />
                </div>
                <div className='mt-5'>
                    <input
                        className='width-300 input-custom radius-5'
                        type="text" placeholder='Enter Phone'
                        value={blogBackup.phone?.toString()}
                        onChange={(e) => setBlogBackup({ ...blogBackup, phone: e.target.value })} />
                </div>
                {
                    categoryInput === 'Add' ? 
                    <div className='mt-5'>
                        <div className='width-300 bg-color-main text-center input-custom radius-5 color-white pointer' onClick={onEventAddBlog}>Add Blogs</div>
                    </div> : 
                    <div className='mt-5'>
                        <div className='width-300 bg-color-main text-center input-custom radius-5 color-white pointer' onClick={onEventEditBlog}>Edit Blogs</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default InputBlogs;