import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { deleteBlogs, getBlogs, patchBlogs } from '../app/blog.redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Modal from '../component/Modal.component';
import { BlogsMapping } from '../mapping/blogs.mapping';
import { BlogModel } from '../model/blogs.model';
import { BlogService } from '../service/blogs.service';

function Todo(props: any) {

    const tasks = [
        { id: '1', title: 'Chạy bộ' },
        { id: '2', title: 'Ăn cơm' },
        { id: '3', title: 'Ca Hát' },
        { id: '4', title: 'Học bài' },
        { id: '5', title: 'Nhảy dây' },
        { id: '6', title: 'Học bài' },
        { id: '7', title: 'Nhảy dây' },
        { id: '8', title: 'Xem phim' },
    ];

    const taskStatus = {
        toDo: {
            name: "To do",
            body: 'todo',
            items: [] as any
        },
        inProgress: {
            name: "In Progress",
            body: 'inprogress',
            items: [] as any
        },
        done: {
            name: "Done",
            body: 'done',
            items: [] as any
        }
    };

    const { blogs } = useAppSelector(state => state.blog);
    const dispatch = useAppDispatch();

    const [columns, setColumns] = useState(taskStatus);

    const [textTodo, setTextTodo] = useState<string>('');
    const [todo, setTodo] = useState<boolean>(false);
    const inputTodo = useRef<HTMLInputElement>(null)

    const onDragEnd = (result: any, columns: any, setColumns: any) => {
        if (!result.destination) return;
        const { source, destination } = result;

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];

        if (source.droppableId !== destination.droppableId) {
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1); // cut and get
            destItems.splice(destination.index, 0, removed);

            const blogModel = new BlogModel();
            blogModel._id = removed._id;
            blogModel.body = destColumn.body;
            dispatch(patchBlogs(BlogsMapping.Map2Service(blogModel)));

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const copiedItems = [...sourceColumn.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: copiedItems
                }
            });
        }
    };

    const addTodo = () => {
        setTodo(true);
    }

    const handleClickOutside = (event: any) => {
        if (inputTodo.current && !inputTodo.current.contains(event.target)) {
            setTodo(false);
        }
    };

    const modelTodo = async (event: any) => {
        setTextTodo(event.target.value)
        if (event.keyCode === 13) {
            const column = columns['toDo'];
            const blogModel = new BlogModel();
            blogModel.body = 'todo';
            blogModel.phone = '123';
            blogModel.title = textTodo;
            blogModel.username = 'Kim T';
            const res = (await BlogService.AddBlogs(BlogsMapping.Map2Service(blogModel))).data;
            const copiedItems = [res, ...column.items];
            setColumns({
                ...columns,
                'toDo': {
                    ...column,
                    items: copiedItems
                }
            });
            setTextTodo('');
            setTodo(false);
        }
    }

    const deleteTodo = (columnId: any, column: any, index: any) => {
        const copiedItems = [...column.items];
        dispatch(deleteBlogs(copiedItems[index]._id));
        copiedItems.splice(index, 1);
        setColumns({
            ...columns,
            [columnId]: {
                ...column,
                items: copiedItems
            }
        });
    }

    useEffect(() => {
        if (todo) {
            inputTodo.current!.focus();
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [todo])

    useEffect(() => {
        if (!blogs.length){
            dispatch(getBlogs());
        }

        const taskStatus = {
            toDo: {
                name: "To do",
                body: 'todo',
                items: blogs.filter((item: BlogModel) => item.body === 'todo') as any
            },
            inProgress: {
                name: "In Progress",
                body: 'inprogress',
                items: blogs.filter((item: BlogModel) => item.body === 'inprogress') as any
            },
            done: {
                name: "Done",
                body: 'done',
                items: blogs.filter((item: BlogModel) => item.body === 'done') as any
            }
        };
        
        setColumns(taskStatus);
    }, [blogs])

    function lineColor(columnId: string) {
        switch (columnId) {
            case 'toDo':
                return <div className='line-crimson'></div>
            case 'inProgress':
                return <div className='line-golden'></div>
            default:
                return <div className='line-blue'></div>
        }
    }

    function borderColor(columnId: string) {
        switch (columnId) {
            case 'toDo':
                return 'border-crimson'
            case 'inProgress':
                return 'border-golden'
            default:
                return 'border-blue'
        }
    }

    return (
        <div>
            {/* <Modal /> */}
            <h1 className='mt-5 text-center font-weight-bold'>To Do List</h1>
            <div className='section-todo'>
                <div className='grid-todo mt-5'>
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                        {Object.entries(columns).map(([columnId, column]) => {
                            return (
                                <div className='item-todo-list bg-white p-3' key={columnId}>
                                    <div className='d-flex justify-content-between'>
                                        <div className='font-weight-bold font-size-20'>{column.name}</div>
                                        {columnId === 'toDo' && <i className='fa fa-plus-square color-main pointer font-size-30' onClick={addTodo}></i>}
                                    </div>
                                    <div className="size-height-10"></div>
                                    {lineColor(columnId)}
                                    <div className='body-item-todo-list'>
                                        <div className={`${todo && columnId === 'toDo' ? 'mt-3 text-center radius-5 bg-color-gray-fade pointer border-crimson border-around-crimson todo-active' : 'todo-inactive'}`}>
                                            {todo && columnId === 'toDo' &&
                                                <input ref={inputTodo} onKeyUp={modelTodo} defaultValue={textTodo} className='input-transparent text-center w-100 h-100' type="text" placeholder='What you need done?' />
                                            }
                                        </div>
                                        <Droppable droppableId={columnId} key={columnId}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            width: '100%',
                                                            height: '500px',
                                                        }}
                                                    >
                                                        {column.items.map((item: any, index: any) => {
                                                            return (
                                                                <Draggable
                                                                    key={item._id}
                                                                    draggableId={item._id}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={{
                                                                                    userSelect: "none",
                                                                                    backgroundColor: snapshot.isDragging
                                                                                        ? columnId === 'toDo' ? '#dd8896' : columnId === 'inProgress' ? '#2e8b57' : '#6495ed'
                                                                                        : "",
                                                                                    color: snapshot.isDragging ? '#fff' : '',
                                                                                    ...provided.draggableProps.style
                                                                                }}
                                                                                className={`mt-3 pt-3 text-center radius-5 bg-color-gray-fade pointer ${borderColor(columnId)}`}
                                                                            >
                                                                                <div>{item.title}</div>
                                                                                <div className='p-2' onClick={() => deleteTodo(columnId, column, index)}><i className={`fa fa-trash font-size-20 ${snapshot.isDragging ? 'color-white' : 'color-main'}`}></i></div>
                                                                                
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>

                                </div>
                            );
                        })}
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
}

export default Todo;