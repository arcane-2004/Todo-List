import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Tabs from './tabs';

const TodoList = (props) => {

    const { todos, setTodos, filter, setFilter } = props;

    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/todo/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setTodos(res.data.todos);
                }
            })
            .catch(err => console.error(err));
    }, [setTodos]);

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true; // "all"
    });


    const deleteTodo = async (_id) => {

        const delId = {
            todoId: _id
        }

        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/todo/delete/`, delId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            console.log("Todo deleted successfully");
            setTodos(todos.filter(todo => todo._id !== _id));
        }
    }

    const handleUpdate = async (_id) => {
        const token = localStorage.getItem('token');

        const response = await axios.put(
            `${import.meta.env.VITE_BASE_URL}/todo/update`,
            {
                todoId: _id,
                newTodo: editValue,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            setTodos((prev) =>
                prev.map((todo) =>
                    todo._id === _id ? { ...todo, todo: editValue } : todo
                )
            );
            setEditingId(null);
            setEditValue('');
        }
    };

    const toggleTodo = async (_id) => {

        const toggleId = {
            todoId: _id
        }
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/todo/toggle/`, toggleId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            console.log("Todo toggled successfully");

            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === _id ? { ...todo, done: !todo.done } : todo
                )
            );
        }
    }

    const deleteCompleted = async () => {

        const completedTodos = todos.filter(todo => {
            return todo.done;
        });


        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/todo/delete/completed/`, completedTodos,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );



        if (response.status === 200) {
            console.log("Completed todos deleted");

            // 🔁 Refetch latest todos to update UI
            const updatedTodos = await axios.get(`${import.meta.env.VITE_BASE_URL}/todo/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTodos(updatedTodos.data.todos);
        }

    }



    return (
        <div >
            <div>
                <Tabs
                    filter={filter}
                    setFilter={setFilter}
                    deleteCompleted={deleteCompleted}
                />
            </div>

            <div className='h-[40vh] scrollbar-fade-thumb overflow-y-scroll  w-full p-2'>

                {filteredTodos.length === 0 ? (
                    <div className='text-center text-gray-500'>
                        {filter === "all" ? "All clear" :
                            filter === "active" ? "All clear, no active todo" :
                                "No completed todo yet"}
                    </div>
                ) :
                    (
                        filteredTodos.map((todo, idx) => {
                            return (
                                <div key={idx} className="flex items-center  mb-3 p-2 w-full bg-white/30 backdrop-blur-md rounded-md shadow-lg shadow-gray-900">

                                    <div className="w-full">
                                        {editingId === todo._id ? (
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleUpdate(todo._id);
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    className="w-full border-b border-[#00223e] bg-transparent text-black outline-none"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    autoFocus
                                                />
                                            </form>
                                        ) : (
                                            <div className='flex items-center gap-1 w-full'>
                                                <div className='w-8 flex items-center'>

                                                    <i onClick={() => toggleTodo(todo._id)}
                                                        className={`text-2xl font-bold ${todo.done ? 'text-green-500' : 'text-red-500'} 
                                                ri-checkbox-blank-circle-${todo.done ? 'fill' : 'line'}`}></i>

                                                </div>

                                                <span className={`font-medium text-lg ${todo.done ? 'line-through text-gray-600' : ''}`}>
                                                    {todo.todo}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex items-center gap-2 text-xl text-gray-600  cursor-pointer'>
                                        <i onClick={() => {
                                            setEditingId(todo._id);
                                            setEditValue(todo.todo);
                                        }} className="ri-file-edit-line hover:text-blue-500 "></i>

                                        <i onClick={() => deleteTodo(todo._id)} className="ri-delete-bin-5-line hover:text-red-600 "></i>
                                    </div>

                                </div>
                            );
                        })
                    )
                }
            </div>
        </div>
    )
}

export default TodoList
