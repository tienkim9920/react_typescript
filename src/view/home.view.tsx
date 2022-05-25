import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BlogModel } from '../model/blogs.model';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getBlogs, patchBlogs, searchBlogs } from '../app/blog.redux';
import { FilterOption, SearchOption, ShowComponentHome } from '../pattern/home.pattern';
import InputBlogs from '../component/input-blog.component';
import { BlogsMapping } from '../mapping/blogs.mapping';
import { LIMIT_PAGINATION, VALUE_OPTION } from '../global/constant.global';
import Pagination from '../component/pagination.component';
import { AuthenticateLocal } from '../local/authenticate.local';
// import { ErrorService } from '../service/error.service';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Home(props: any) {
    const { blogs, backup } = useAppSelector((state: any) => state.blog);
    const dispatch = useAppDispatch();
    const [showComponent, setShowComponent] = useState<ShowComponentHome>({
        home: true,
        edit: false
    });
    const [blogEdit, setBlogEdit] = useState<BlogModel>();
    const [searchOption, setSearchOption] = useState<SearchOption>({
        search: '',
        option: {} as FilterOption
    });
    const [statusOption, setStatusOption] = useState<Boolean>(false);
    const router = useHistory();

    // pagination
    const currentPage = useQuery().get('page');
    const [totalPage, setTotalPage] = useState<Number>();

    const [first, setFirst] = useState<boolean>(false);
    const [visibleBlogs, setVisibleBlogs] = useState<any>([]);

    const backStep = () => {
        setShowComponent({
            home: true,
            edit: false
        });
    }

    const changeStatusComponent = (event: BlogModel) => {
        if (!AuthenticateLocal.getToken()){
            router.push('/login');
        }
        if (AuthenticateLocal.checkPermission() === 'client'){
            return;
        }
        setBlogEdit(event);
        setShowComponent({
            home: false,
            edit: true
        });
    }

    const handleEditBlog = (blog: BlogModel) => {
        dispatch(patchBlogs(BlogsMapping.Map2Service(blog)));
    }

    // pagination
    const onChangePage = (event: any) => {
        router.push(`/?page=${event}`)
    }

    useEffect(() => {
        if (!blogs.length && !first) {
            dispatch(getBlogs());
            setFirst(true);
        }
        if (blogs.length > 0 || !blogs.length) {
            setTotalPage(Math.ceil(blogs.length / LIMIT_PAGINATION));
            paginationBlogs();
        }
    }, [blogs, currentPage])

    const handleSearchOption = (event: any) => {
        const search = event.target.value;
        const cloneSearchOption = {
            search,
            option: searchOption.option
        } as SearchOption;
        methodSearchOption(cloneSearchOption);
        setSearchOption(cloneSearchOption);
    }

    const handleChooseOption = (option: FilterOption) => {
        const cloneSearchOption = {
            search: searchOption.search,
            option
        } as SearchOption;
        methodSearchOption(cloneSearchOption);
        setSearchOption(cloneSearchOption);
    }

    function methodSearchOption(valueSearchOption: SearchOption) {
        const search = valueSearchOption.search || '';
        const option = valueSearchOption.option?.value;
        if (!search && (option === 'all' || !option)) {
            dispatch(searchBlogs(backup));
            return;
        }
        const filterBlogs = backup.filter((item: BlogModel) => {
            return option === 'all' || !option ?
                item.title?.toString().toUpperCase().indexOf(search.toUpperCase()) !== -1 :
                item.title?.toString().toUpperCase().indexOf(search.toUpperCase()) !== -1 && item.body === option
        });
        dispatch(searchBlogs(filterBlogs));
        router.push(`/?page=1`);
    }

    function paginationBlogs() {
        const indexPage = currentPage ? currentPage : 1;
        const start = (Number(indexPage) - 1) * LIMIT_PAGINATION;
        const end = (Number(indexPage) * LIMIT_PAGINATION);
        const sliceBlogs = blogs.slice(start, end);
        setVisibleBlogs(sliceBlogs);
    }


    return (
        <div className="pb-5">
            {
                showComponent.home && <div>
                    <div className='d-flex justify-content-between'>
                        <div className='mt-5'>
                            <input
                                className='width-250 input-custom radius-5 color-dark'
                                type="text"
                                placeholder='Enter Search'
                                value={searchOption?.search?.toString()}
                                onChange={(event) => handleSearchOption(event)} />
                        </div>
                        <div className='mt-5 group-option' onClick={() => setStatusOption(!statusOption)}>
                            <div className='width-225 input-custom radius-5 color-dark pointer'>{!searchOption?.option?.label ? 'Choose Filter' : searchOption.option.label}</div>
                            <div className={`width-225 box-option radius-5 ${statusOption ? 'active' : 'inactive'}`}>
                                {
                                    VALUE_OPTION.map((item: FilterOption, index) => (
                                        <div
                                            key={index}
                                            className='input-custom item-option color-dark pointer'
                                            onClick={() => handleChooseOption(item)}>
                                            {item.label}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {!visibleBlogs.length && <div className='mt-5'>Loading...</div>}
                    {
                        visibleBlogs.length > 0 && <div className="group-todo">
                            {visibleBlogs && visibleBlogs.map((item: BlogModel, index: string) => (
                                <div className="box-todo p-3 mt-5 d-flex justify-content-between radius-5" key={`${index}`}>
                                    <div>
                                        <div className='font-weight-bold color-main font-size-25'>{item.title}</div>
                                        <div className='font-size-20 color-dark'>{item.body}</div>
                                    </div>
                                    <div className='mt-4 mb-2 d-flex'>
                                        <div><Link to={`/blogs/${item._id}`} className='bg-color-main text-center color-white pointer input-custom radius-5'>View</Link></div>
                                        &nbsp;
                                        &nbsp;
                                        <div><a className='bg-color-main text-center color-white pointer input-custom radius-5' onClick={() => changeStatusComponent(item)}>Edit</a></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="mt-5">
                        {/* pagination */}
                        <Pagination currentPage={currentPage ? currentPage : 1} onChangePage={onChangePage} totalPage={Number(totalPage) > 0 ? totalPage : 1} />
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