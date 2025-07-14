import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList'
import SidePanel from '../components/sidePanel';
// import { set } from 'mongoose';

const Profile = () => {

    const navigate = useNavigate();

    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState({});
    const [filter, setFilter] = useState("all");
    const [sidePanel, setSidePanel] = useState(false);



    const sidePanelRef = useRef(null)

    useGSAP(function () {
        if (sidePanel) {
            gsap.to(sidePanelRef.current, {
                transform: 'translateX(0)'
            })
        }

        else {
            gsap.to(sidePanelRef.current, {
                transform: 'translateX(-100%)'
            })
        }
    }, [sidePanel])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data);
                }
            })
            .catch(err => console.error(err));
    }, []);


    const submitTodo = async (e) => {
        e.preventDefault();

        const newTodo = {
            todo: todo,
        }

        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/todo/add`,
            newTodo,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 201) {
            console.log("Todo added successfully");
            setTodos([response.data.todo, ...todos]);
            setTodo('');
        }
    }


    const logout = () => {
        const token = localStorage.getItem('token');
        axios.post(
            `${import.meta.env.VITE_BASE_URL}/user/logout`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/login')
            }

        });
    }

    return (
        <div className='bg-[#f9d9ce] h-screen p-3'>
            <div>
                <nav className='flex items-center justify-between bg-[#00223e] font- text-white p-4 shadow-gray-800 shadow-2xl rounded-full'>
                    <div className='flex items-center gap-2'>
                        <h5><i class="ri-user-line"></i></h5>
                        <h3>{user.fullname?.firstname}</h3>
                    </div>

                    <h5 className=" text-2xl font-bold">
                        <i onClick={logout} className="ri-logout-box-r-line cursor-pointer"></i>
                    </h5>

                </nav>

                <div ref={sidePanelRef} className='fixed top-0 left-0 h-screen w-[30vw] translate-x-[-100%] bg-white'>
                    <SidePanel
                        setSidePanel={setSidePanel}
                    />
                </div>

                <div className='te'>
                    <h1 className='text-center m-10 text-6xl font-serif font-stretch-200%'>
                        Todo List
                    </h1>
                </div>
                <div className='flex items-center justify-center '>
                    <div className='h-[60vh] w-[100vh] bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl shadow-gray-900 p-8 mt-5'>

                        <div className='mb-5'>
                            <form className='w-full flex items-center gap-3' action="" onSubmit={submitTodo}>
                                <input className='w-full border border-white/30 bg-transparent p-2 rounded-md' type="text" placeholder='Enter your todo'
                                    value={todo}
                                    onChange={(e) => {
                                        setTodo(e.target.value)

                                    }}
                                />
                                <button className='bg-[#00223e] text-white px-4 rounded-md h-10 hover:opacity-90 cursor-pointer flex items-center'>add</button>
                            </form>
                        </div>

                        <div>
                            <TodoList
                                todos={todos}
                                setTodos={setTodos}
                                setTodo={setTodo}
                                todo={todo}
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile
