import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


function Todo(props: any) {

    const [todo, setTodo] = useState<any>(
        [
            { id: '1', title: 'Chạy bộ' },
            { id: '2', title: 'Ăn cơm' },
            { id: '3', title: 'Ca Hát' },
        ]
    )

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
        const items = Array.from(todo);
        const [reorderedItem] = items.splice(result.source.index, 1); // cut element position
        items.splice(result.destination.index, 0, reorderedItem);

        setTodo(items);
    }

    return (
        <div className="section-todo">
            <div className="grid-todo mt-6">
                <div className="item-todo-list bg-white p-3">
                    <div className='d-flex justify-content-between'>
                        <div className='font-weight-bold font-size-20'>To Do</div>
                        <i className='fa fa-plus-square color-main pointer font-size-30'></i>
                    </div>
                    <div className="size-height-10"></div>
                    <div className='line-crimson'></div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="todo">
                            {(provided) => (
                                <div className='body-item-todo-list' {...provided.droppableProps} ref={provided.innerRef}>
                                    {todo.map((item: any, index: any) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className='mt-3 p-3 text-center radius-5 bg-color-gray-fade pointer border-crimson'>{item.title}</div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                </div>
                <div className="item-todo-list bg-white p-3">
                    <div className='font-weight-bold font-size-20'>In Progress</div>
                    <div className="size-height-10"></div>
                    <div className='line-golden'></div>
                    <div className='body-item-todo-list'>
                        <div className='mt-3 p-3 text-center radius-5 bg-color-gray-fade pointer border-golden'>Học bài</div>
                    </div>
                </div>
                <div className="item-todo-list bg-white p-3">
                    <div className='font-weight-bold font-size-20'>Done</div>
                    <div className="size-height-10"></div>
                    <div className='line-blue'></div>
                    <div className='body-item-todo-list'>
                        <div className='mt-3 p-3 text-center radius-5 bg-color-gray-fade pointer border-blue'>Nhảy dây</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;