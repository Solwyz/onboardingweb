import React, { useEffect, useState } from 'react';
import ToDo from "../../../../Assets/HrTas/ToDoList.svg";
import AddBtn from "../../../../Assets/HrTas/add.svg";
import TodoArrow from "../../../../Assets/HrTas/ToDoArrow.svg";
import Unchecked from "../../../../Assets/HrTas/uncheckBox.svg";
import Checked from "../../../../Assets/HrTas/checkBox.svg";
import CloseBtn from "../../../../Assets/HrTas/close.svg";
import DeleteBtn from "../../../../Assets/HrTas/delete.svg";
import editIcon from '../../../../Assets/Superadmin/edit-svgrepo-com.svg'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg'
import "./ToDoList.css"
import Api from '../../../../Services/Api';
import { ClipLoader } from 'react-spinners';

function ToDoListPage() {
    const [checkedTasks, setCheckedTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [todoList, setTodoList] = useState([])
    const [todoListError, setTodoListError] = useState('');
    const [newTodo, setNewTodo] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const [updatedTodo, setUpdatedTodo] = useState(null)
    const [deleteId, setDeleteId] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const [newTask, setNewTask] = useState('');

    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAdding(true)
        if (newTodo.trim() !== '') {
            Api.post('api/todo', {
                "title": newTodo
            }, { 'Authorization': `Bearer ${token}` })
                .then(response => {
                    setIsAdding(false);
                    setNewTodo('')
                    setIsModalOpen(false);
                    if (response && response.data) {
                        console.log('New Todo added', response.data)
                        setRefreshKey(prev => prev + 1);
                    } else {
                        console.log('Failed to add new Todo. Please try again.')
                        alert('Todo not added. please try again.')
                    }
                })

        }
    };

    const handleEditClick = (id) => {
        const todoTobeUpdated = todoList.find(todo => todo.id === id)
        setUpdatedTodo(todoTobeUpdated);
        setIsModalOpen(true);
        setNewTodo(todoTobeUpdated.title)
    }

    const handleUpdate = () => {
        setIsAdding(true);
        Api.put('api/todo', {
            "id": updatedTodo.id,
            "title": newTodo
        }, { 'Authorization': `Bearer ${token}` })
            .then(response => {
                setUpdatedTodo(null)
                setNewTodo('')
                setIsAdding(false)
                setRefreshKey(prev => prev + 1)
                setIsModalOpen(false)
                console.log('updateStats:', response)
            })
    }

    const handleDeleteClick = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    }

    const handleDeleteModalCancel =()=> {
        setDeleteModal(false);
    }

    const handleDeleteModalConfirm =()=> {
        setIsDeleting(true)
        console.log('delete ID:' ,deleteId)
        Api.delete(`api/todo/${deleteId}`, {
            'Authorization': `Bearer ${token}`
        })
        .then(response => {
            setIsDeleting(false);
            if(response && response.data) {
                console.log(response.data.message)
                setRefreshKey(prev => prev + 1)
                setDeleteModal(false)
            } else {
                console.error('Invalid response data: ', response)
                alert('Can not delete. Please try again.')
            }
        })
    }


    const handleCheckToggle = (index) => {
        setCheckedTasks((prevCheckedTasks) => {
            if (prevCheckedTasks.includes(index)) {
                return prevCheckedTasks.filter(taskIndex => taskIndex !== index);
            } else {
                return [...prevCheckedTasks, index];
            }
        });
    };


    const deleteCheckedTasks = () => {
        setTasks((prevTasks) => {
            return prevTasks.filter((_, index) => !checkedTasks.includes(index));
        });
        setCheckedTasks([]);
    };

    const handleCreateTask = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUpdatedTodo(null)
    };

    // const addTask = (newTask) => {
    //     setTasks((prevTasks) => [...prevTasks, newTask]);
    // };

    useEffect(() => {
        Api.get('api/todo', {
            'Authorization': `Bearer ${token}`
        })
            .then(response => {
                if (response && response.data) {
                    console.log('aa', response.data.content);
                    setTodoList(response.data.content)
                } else {
                    console.error('Invalid response data:', response)
                    setTodoListError('Failed to fetch todolist data')
                }
            })
    }, [refreshKey])

    return (
        <div>
            <div className='flex justify-between '>
                <div className='flex items-center justify-start '>
                    <img className='w-5 h-5' src={ToDo} alt="Notification" />
                    <h1 className='text-[20px] font-medium text-[#1255D0] ml-1'>To-Do List</h1>
                </div>
                <div className='flex'>

                    {/* <button
                        onClick={deleteCheckedTasks}
                        className='border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg'
                    >
                        <img className='w-4 h-4 mr-1' src={DeleteBtn} alt="" />Delete
                    </button> */}

                    <button
                        onClick={handleCreateTask}
                        className='border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg ml-2'
                    >
                        <img className='w-4 h-4 mr-1' src={AddBtn} alt="" /> Create New
                    </button>
                </div>
            </div>


            {todoList.length > 0 && (
                <div className='max-h-[224px] overflow-y-auto custom-scrollbar mr-6 mt-[20px] '>
                    {todoList.map((task, index) => (
                        <div key={index} className='bg-[#F6F6F8] h-[50px] rounded-lg mt-[20px] '>
                            <div className='flex items-center py-4 pl-4 pr-6'>
                                <img src={TodoArrow} alt="" />
                                <h1 className='ml-4 text-[14px] font-medium text-[#9819B0]'>{task.title}</h1>
                                <div className='flex items-center justify-center gap-4 ml-auto'>
                                    <img src={editIcon} className='h-3 w-3 hover:cursor-pointer' onClick={() => handleEditClick(task.id)}></img>
                                    <img src={deleteIcon} className='hover:cursor-pointer' onClick={() => handleDeleteClick(task.id)}></img>
                                </div>

                                {/* <img
                                    className='ml-auto cursor-pointer'
                                    src={checkedTasks.includes(index) ? Checked : Unchecked}
                                    alt="Checkbox"
                                    onClick={() => handleCheckToggle(index)}
                                /> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deleteModal && (
                <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-auto p-10  shadow-lg">
                        {isDeleting ?
                            <div className='flex gap-4 px-4'>
                                <div>
                                    <ClipLoader
                                        color={'#465062'}
                                        loading={true}
                                        size={35}
                                        aria-label="Loading Spinner"
                                        data-testid="Loader"
                                    />
                                </div>
                                <div className='mt-2'>Deleing Please wait..</div>
                            </div> :
                            <div>
                                <div className='text-[18px] text-[#373737]'>Are you sure to delete this Todo ?</div>
                                <div className='flex gap-4 mt-8 w-fit ml-auto'>
                                    <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalCancel}>Cancel</button>
                                    <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalConfirm}>Delete</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}

            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
                        <div className="bg-white p-6  w-[504px]">
                            <div className='flex items-center justify-between'>
                                <h2 className="text-[16px] font-medium">Add To-Do List</h2>
                                <img
                                    onClick={closeModal}
                                    src={CloseBtn} alt="" />
                            </div>

                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Enter To-Do Task"
                                className="border px-6 py-2 w-full mt-6 h-[88px] placeholder:mt-2"
                            />
                            <div className="flex justify-end mt-8">
                                <button
                                    onClick={closeModal}
                                    className="bg-[#ffffff] text-[#2C2B2B] border px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={updatedTodo ? handleUpdate : handleSubmit}
                                    className="bg-[#6C55B2] ml-4 text-white px-4 py-2 rounded-lg"
                                >
                                    {isAdding ?
                                        <div>
                                            <ClipLoader
                                                color={'#ffffff'}
                                                loading={true}
                                                size={20}
                                                aria-label="Loading Spinner"
                                                data-testid="Loader"
                                            />
                                        </div> :
                                        <div>{updatedTodo ? 'Update' : 'Add'}</div>}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* <Modal isOpen={isModalOpen} closeModal={closeModal} addTask={addTask} /> */}
        </div>
    );
}

export default ToDoListPage;
