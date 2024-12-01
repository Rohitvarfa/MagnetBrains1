import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  const lowPriorityTasks = tasks.filter(task => task.priority === "low");
  const mediumPriorityTasks = tasks.filter(task => task.priority === "medium");
  const highPriorityTasks = tasks.filter(task => task.priority === "high");


  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">

        {tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : (
              <>
                {
                  highPriorityTasks.length > 0 && (<>
                    <h3 className='my-2 ml-2 md:ml-0 text-lg'>High priority</h3>
                    {highPriorityTasks?.map((task, index) => (
                      <div key={task._id} className={`bg-white my-4 p-4 text-gray-600 rounded-md shadow-md ${task.status === "pending" ? "bg-yellow-100" : task.status === "in-progress" ? "bg-blue-100" : "bg-green-100"}`}>
                        <div className='flex'>

                          <span className='font-medium'>Task #{index + 1}</span>
                          <select className='ml-2 bg-gray-100 px-2 py-1 rounded-md text-gray-600' value={task.status} onChange={(e) => {
                            const config = { url: `/tasks/${task._id}`, method: "put", headers: { Authorization: authState.token }, data: { description: task.description, status: e.target.value, priority: task.priority } };
                            fetchData(config).then(() => fetchTasks());
                          }}>
                            <option value="pending" className={task.status === "pending" ? "bg-yellow-200" : ""}>pending</option>
                            <option value="in-progress" className={task.status === "in-progress" ? "bg-blue-200" : ""}>in-progress</option>
                            <option value="completed" className={task.status === "completed" ? "bg-green-200" : ""}>completed</option>
                          </select>

                          <Tooltip text={"Edit this task"} position={"top"}>
                            <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                              <i className="fa-solid fa-pen"></i>
                            </Link>
                          </Tooltip>

                          <Tooltip text={"Delete this task"} position={"top"}>
                            <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </Tooltip>

                        </div>
                        <div className='whitespace-pre'>{task.description}</div>
                      </div>
                    ))}
                                        <hr className='my-4' />

                  </>
                  )
                }
                {
                  mediumPriorityTasks.length > 0 && (<>
                    <h3 className='my-2 ml-2 md:ml-0 text-lg'>Medium priority</h3>
                    {mediumPriorityTasks?.map((task, index) => (
                      <div key={task._id} className={`bg-white my-4 p-4 text-gray-600 rounded-md shadow-md ${task.status === "pending" ? "bg-yellow-100" : task.status === "in-progress" ? "bg-blue-100" : "bg-green-100"}`}>
                        <div className='flex'>

                          <span className='font-medium'>Task #{index + 1}</span>
                          <select className='ml-2 bg-gray-100 px-2 py-1 rounded-md text-gray-600' value={task.status} onChange={(e) => {
                            const config = { url: `/tasks/${task._id}`, method: "put", headers: { Authorization: authState.token }, data: { description: task.description, status: e.target.value, priority: task.priority } };
                            fetchData(config).then(() => fetchTasks());
                          }}>
                            <option value="pending" className={task.status === "pending" ? "bg-yellow-200" : ""}>pending</option>
                            <option value="in-progress" className={task.status === "in-progress" ? "bg-blue-200" : ""}>in-progress</option>
                            <option value="completed" className={task.status === "completed" ? "bg-green-200" : ""}>completed</option>
                          </select>

                          <Tooltip text={"Edit this task"} position={"top"}>
                            <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                              <i className="fa-solid fa-pen"></i>
                            </Link>
                          </Tooltip>

                          <Tooltip text={"Delete this task"} position={"top"}>
                            <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </Tooltip>

                        </div>
                        <div className='whitespace-pre'>{task.description}</div>
                      </div>
                    ))}
                                        <hr className='my-4' />

                  </>
                  )
                }
                {
                  lowPriorityTasks.length > 0 && (<>
                    <h3 className='my-2 ml-2 md:ml-0 text-lg'>Low priority</h3>
                    {lowPriorityTasks?.map((task, index) => (
                      <div key={task._id} className={`bg-white my-4 p-4 text-gray-600 rounded-md shadow-md ${task.status === "pending" ? "bg-yellow-100" : task.status === "in-progress" ? "bg-blue-100" : "bg-green-100"}`}>
                        <div className='flex'>

                          <span className='font-medium'>Task #{index + 1}</span>
                          <select className='ml-2 bg-gray-100 px-2 py-1 rounded-md text-gray-600' value={task.status} onChange={(e) => {
                            const config = { url: `/tasks/${task._id}`, method: "put", headers: { Authorization: authState.token }, data: { description: task.description, status: e.target.value, priority: task.priority } };
                            fetchData(config).then(() => fetchTasks());
                          }}>
                            <option value="pending" className={task.status === "pending" ? "bg-yellow-200" : ""}>pending</option>
                            <option value="in-progress" className={task.status === "in-progress" ? "bg-blue-200" : ""}>in-progress</option>
                            <option value="completed" className={task.status === "completed" ? "bg-green-200" : ""}>completed</option>
                          </select>

                          <Tooltip text={"Edit this task"} position={"top"}>
                            <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                              <i className="fa-solid fa-pen"></i>
                            </Link>
                          </Tooltip>

                          <Tooltip text={"Delete this task"} position={"top"}>
                            <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </Tooltip>

                        </div>
                        <div className='whitespace-pre'>{task.description}</div>
                      </div>
                    ))}
                  </>
                  )
                }




              </>
            )
            }
          </div>
        )}
      </div>
    </>
  )
}

export default Tasks
