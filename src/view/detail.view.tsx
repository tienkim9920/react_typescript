import React, { useLayoutEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deleteBlogs } from '../app/blog.redux';
import { BlogModel } from '../model/blogs.model';
import { BlogService } from '../service/blogs.service';
import { OrderModel } from '../model/orders.model';
import { AuthenticateLocal } from '../local/authenticate.local';
import { OrderService } from '../service/orders.service';
import { getDetailOrder } from '../app/order.redux';
import { OrderDetailModel } from '../model/orders-detail.model';

function Detail(props: any) {

    const { id } = useParams<any>();
    const router = useHistory();

    const [blog, setBlog] = useState<BlogModel>({});
    const { blogs } = useAppSelector(state => state.blog);

    const order = useAppSelector(getDetailOrder(id));
    const [orderDetail, setOrderDetail] = useState<OrderDetailModel>() || null;

    const [permission, setPermission] = useState<String>(AuthenticateLocal.getPermission());
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        if (permission === 'client') {
            const index = blogs.findIndex((el: BlogModel) => el._id?.toString() === id);
            if (index !== -1) {
                setBlog(blogs[index]);
                return;
            }
            
            const fetchData = async () => {
                const res = (await BlogService.DetailBlogs(id)).data;
                setBlog(res);
            }
    
            fetchData();
        }else if (permission === 'admin') {
            const fetchData = async () => {
                const res = (await OrderService.DetailOrder(id)).data;
                setOrderDetail(res);
            }

            fetchData();
        }
        
    }, [])

    const handleDelete = () => {
        dispatch(deleteBlogs(id));
        router.replace('/');
    }

    const backStep = () => {
        router.goBack();
    }

    return (
        <div className="mt-2 p-3">
            <i className="fa fa-arrow-circle-left font-size-50 color-main mt-1 pointer" onClick={backStep}></i>
            { !permission && <div>Bạn chưa đăng nhập</div> }
            {
                permission === 'client' &&
                <div>
                    <div className='font-weight-bold color-main font-size-25 mt-2'>{blog.title}</div>
                    <div className='font-size-20 mt-2'>{blog.username}</div>
                    <div className='font-size-20 mt-2'>{blog.body}</div>
                    <div className='font-size-20 mt-2'>{blog.phone}</div>
                    <div className='mt-5 d-flex'>
                        <div className='bg-color-main text-center color-white pointer input-custom radius-5' onClick={handleDelete}>Delete</div>
                    </div>
                </div>
            }
            {
                (permission === 'admin' && order)  &&
                <div>
                    <div className='font-weight-bold color-main font-size-25 mt-2'>Mã đơn hàng: { order.id }</div>
                    <div className='font-size-20 mt-2'>Tên người đặt : 123123</div>
                    <div className='font-size-20 mt-2'>Địa chỉ: { order.address }</div>
                    <div className='font-size-20 mt-2'>Số điện thoại: { order.phone }</div>
                </div>
            }
        </div>
    );
}

export default Detail;