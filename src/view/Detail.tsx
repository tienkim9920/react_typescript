import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addDetail, deletePosts } from '../app/post.redux';
import { PostModel } from '../model/posts.model';
import { PostService } from '../service/posts.service';

function Detail(props: any) {

    const { id } = useParams<any>();
    const [post, setPost] = useState<PostModel>({});

    const { store } = useAppSelector(state => state.post);
    const dispatch = useAppDispatch();

    const router = useHistory();

    useEffect(() => {
        const index = store.findIndex((el: PostModel) => el.id?.toString() === id);
        if (index !== -1) {
            setPost(store[index]);
            return;
        }
        const fetchPost = async () => {
            const res = (await PostService.DetailPosts(id)).data;
            setPost(res);
            dispatch(addDetail(res));
        }

        fetchPost();
    }, [])

    const handleDelete = () => {
        dispatch(deletePosts(id));
        router.replace('/');
    }

    return (
        <div className="mt-2 p-3">
            <div className='font-weight-bold color-main font-size-25 mt-2'>{post.title}</div>
            <div className='font-size-20 mt-2'>{post.userId}</div>
            <div className='font-size-20 mt-2'>{post.body}</div>
            <div className='mt-5 d-flex'>
                <div className='bg-color-main text-center input-custom color-white pointer' onClick={handleDelete}>Delete</div>
            </div>
        </div>
    );
}

export default Detail;