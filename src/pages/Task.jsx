import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import { TasksContext } from "../Context/TaskContext";
import { AiTwotoneCalendar, AiOutlineArrowLeft } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { format } from "date-fns";
import { toast } from "react-toastify";

const UPDATE_TASK = "UPDATE_TASK";

// Reducer function to handle state updates
const taskReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TASK:
      return { ...state, task: action.payload };
    default:
      return state;
  }
};

const Task = () => {
  const { getTask, toggleTaskStatus, deleteTask } = useContext(TasksContext);
  //   const [task, setTask] = useState(null);
  const [state, dispatch] = useReducer(taskReducer, { task: null });
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTask(id);
        dispatch({ type: UPDATE_TASK, payload: taskData });
      } catch (error) {
        // Handle errors, e.g., display an error message
        console.log(error);
      }
    };

    fetchData();
  }, [getTask, id]);

  const handleCheckboxChange = (taskId) => {
    toggleTaskStatus(taskId);
  };

  const { task } = state;
  return (
    <>
      {task ? (
        <div className="w-[95%] lg:w-[60%] mx-auto mt-[40px] font-Roboto bg-white rounded-md p-[20px] flex flex-col gap-5">
          <h1 className="text-lg font-Roboto break-words">{task.title}</h1>
          <p className="text-sm  border-y border-gray-300 py-3 break-words">
            {task.description}
          </p>
          <p className="text-base flex items-center gap-1 text-gray-500">
            <AiTwotoneCalendar className="text-mainColor flex-shrink-0" />
            <span>
              Due Date: {format(new Date(task.date), "do MMMM, yyyy")}
            </span>
          </p>
          <p className={task.status ? "text-green-500" : "text-red-500"}>
            {task.status ? "Completed" : "Pending"}
          </p>
          <div className=" w-full flex items-center justify-between mt-[20px] text-base">
            <p className="text-gray-500  font-semibold flex items-center gap-1">
              <input
                type="checkbox"
                checked={task.status}
                onChange={() => handleCheckboxChange(task.id)}
              />{" "}
              <span className="font-normal">Mark Complete</span>
            </p>
            <BsTrashFill
              className="text-[#FF5353] float-right cursor-pointer text-base"
              title="Delete Task"
              onClick={() => {
                deleteTask(task.id);
                toast.success("Task deleted successfully");
              }}
            />
          </div>
        </div>
      ) : (
        <h1 className="text-center text-gray-500 mt-[30px]">
          Task Cannot be found
        </h1>
      )}

      <Link
        to="/task-manager_2/"
        className=" w-[60%] flex items-center gap-1 text-gray-500  mt-[30px] mx-auto cursor-pointer"
      >
        <AiOutlineArrowLeft />
        <p className="font-Roboto">Back To Home</p>
      </Link>
    </>
  );
};

export default Task;
