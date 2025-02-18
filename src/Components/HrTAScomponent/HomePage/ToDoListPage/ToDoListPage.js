import React, { useEffect, useState } from "react";
import ToDo from "../../../../Assets/HrTas/ToDoList.svg";
import AddBtn from "../../../../Assets/HrTas/add.svg";
import TodoArrow from "../../../../Assets/HrTas/ToDoArrow.svg";
import CloseBtn from "../../../../Assets/HrTas/close.svg";
import { ClipLoader } from "react-spinners";
import Api from "../../../../Services/Api";
import "./ToDoList.css";

function ToDoListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [completedModal, setCompletedModal] = useState(false);
  const [completedTaskId, setCompletedTaskId] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [inProgressTaskId, setInProgressTaskId] = useState(null); // Track the task that is in progress

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAdding(true);
    if (newTodo.trim() !== "") {
      Api.post(
        "api/todo",
        {
          title: newTodo,
        },
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        setIsAdding(false);
        setNewTodo("");
        setIsModalOpen(false);
        if (response && response.data) {
          console.log("New Todo added", response.data);
          setRefreshKey((prev) => prev + 1);
        } else {
          console.log("Failed to add new Todo. Please try again.");
          alert("Todo not added. please try again.");
        }
      });
    }
  };

  const handleInProgressClick = (id) => {
    setInProgressTaskId(id); // Set the task ID that is in progress
    setCompletedModal(true);
  };

  const handleCompleteTask = () => {
    Api.put(
      "api/todo",
      {
        id: inProgressTaskId,
        completed: true, // Mark the task as completed
      },
      { Authorization: `Bearer ${token}` }
    )
      .then((response) => {
        setCompletedModal(false);
        setInProgressTaskId(null); // Clear the in-progress task ID
        setRefreshKey((prev) => prev + 1); // Refresh the todo list
        console.log("Task marked as completed:", response);
      })
      .catch((error) => {
        console.error("Error marking task as completed:", error);
        alert("Failed to mark task as completed. Please try again.");
      });
  };

  const handleTaskClick = (task) => {
    setTaskDetails(task);
  };

  useEffect(() => {
    Api.get("api/todo", {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      if (response && response.data) {
        console.log("Fetched todo list:", response.data.content);
        setTodoList(response.data.content);
      } else {
        console.error("Invalid response data:", response);
      }
    });
  }, [refreshKey]);

  return (
    <div>
      <div className="">
        <div className="flex justify-between items-center ">
          <div className="flex items-center justify-start ">
            <img className="w-5 h-5" src={ToDo} alt="Notification" />
            <h1 className="text-[20px] font-medium text-[#1255D0] ml-1">
              To-Do List
            </h1>
          </div>
          <div className="flex">
            <button
              onClick={() => setIsModalOpen(true)}
              className="border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg ml-2"
            >
              <img className="w-4 h-4 mr-1" src={AddBtn} alt="" /> Create New
            </button>
          </div>
        </div>

        {todoList.length > 0 && (
            <div className="">
  <div className="h-[224px] overflow-y-auto custom-scrollbar mr-6 mt-[20px]">
    {todoList.map((task, index) => (
      <div
        key={index}
        className="bg-[#F6F6F8] h-[50px] rounded-lg mt-[20px]"
      >
        <div className="flex justify-between items-center py-4 pl-4 pr-6">
          <div className="flex items-center">
            <img src={TodoArrow} alt="" />
            <h1
              className="ml-4 text-[14px] text-start font-medium text-[#9819B0]"
              onClick={() => handleTaskClick(task)}
            >
              {task.title}
            </h1>
          </div>
          <div
            className={`text-sm font-medium cursor-pointer ${
              task.completed ? "text-green-500" : "text-yellow-500"
            }`}
            onClick={() => !task.completed && handleInProgressClick(task.id)}
          >
            {task.completed ? "Completed" : "In Progress"}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        )}
      </div>

      {completedModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto p-10 shadow-lg">
            <div className="text-[18px] text-[#373737]">
              Are you sure you completed this task?
            </div>
            <div className="flex gap-4 mt-8 w-fit ml-auto">
              <button
                className="bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]"
                onClick={() => setCompletedModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]"
                onClick={handleCompleteTask}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {taskDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
          <div className="bg-white  p-6 w-[504px]">
            <h2 className="text-[16px] font-medium">Task Details</h2>
            <p className="mt-4">
              {taskDetails.title}
            </p>
            {taskDetails.description && (
              <p>
                <strong>Description:</strong> {taskDetails.description}
              </p>
            )}
            
            <button
              onClick={() => setTaskDetails(null)}
              className="bg-[#6C55B2] justify-end  text-white px-4 py-2 rounded-lg mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
          <div className="bg-white p-6 w-[504px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-medium">Add To-Do List</h2>
              <img
                onClick={() => setIsModalOpen(false)}
                src={CloseBtn}
                alt=""
              />
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
                onClick={() => setIsModalOpen(false)}
                className="bg-[#ffffff] text-[#2C2B2B] border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#6C55B2] ml-4 text-white px-4 py-2 rounded-lg"
              >
                {isAdding ? (
                  <ClipLoader
                    color={"#ffffff"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="Loader"
                  />
                ) : (
                  <div>Add</div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDoListPage;
