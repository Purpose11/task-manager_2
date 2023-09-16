import { useReducer, useContext } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import AddTaskModal from "../Components/AddTaskModal";
import Nav from "../Components/Nav";
import { TasksContext } from "../Context/TaskContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const initialState = {
  isOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const Home = () => {
  const { tasks } = useContext(TasksContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  // To open the modal
  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  // To close the modal
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <Nav />
      <div className="mt-[50px] mx-auto w-[90%] lg:w-[80%] z-0">
        <h1 className="text-xl">Tasks</h1>
      </div>
      <div className=" w-[90%] lg:w-[80%] h-fit mx-auto  font-Roboto overflow-x-auto lg:overflow-hidden">
        <div className="w-[500px] lg:w-full h-[50px] rounded-md mt-[20px] px-[25px] bg-[#EDF0F5] text-mainColor font-Roboto text-base grid grid-cols-5 lg:grid-cols-4  items-center">
          <h1 className="col-span-2">Task </h1>
          <h1 className="col-span-2 lg:col-span-1">Due Date </h1>
          <h1>Status</h1>
        </div>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => {
            return (
              <Link key={task.id} to={`/task-manager_2/task/${task.id}`}>
                <div className="w-[500px] lg:w-full h-[50px] rounded-md mt-[20px] px-[25px] bg-white hover:bg-[#EDF0F5] font-Roboto text-base grid grid-cols-5 lg:grid-cols-4 items-center cursor-pointer">
                  <h1
                    className="col-span-2"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "80%",
                    }}
                  >
                    {task.title}
                  </h1>
                  <h1 className=" w-fit col-span-2 lg:col-span-1">
                    {format(new Date(task.date), "do MMMM, yyyy")}
                  </h1>
                  <h1
                    className={task.status ? "text-green-500" : "text-red-500"}
                  >
                    {task.status ? "Completed" : "Pending"}
                  </h1>
                </div>
              </Link>
            );
          })
        ) : (
          <h1 className="lg:text-center mt-[30px] text-gray-500 font-Roboto">
            No task to show! Click plus button to add task.
          </h1>
        )}
      </div>
      <AddTaskModal isOpen={state.isOpen} closeModal={closeModal} />
      <AiFillPlusSquare
        className="text-mainColor text-[40px] fixed bottom-[30px] right-[30px] cursor-pointer"
        onClick={openModal}
      />
    </>
  );
};

export default Home;
