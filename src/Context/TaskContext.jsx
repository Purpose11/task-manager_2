import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

export const TasksContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = { ...action.payload, id: uuidv4(), status: false };
      return [...state, newTask];
    }

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "TOGGLE_TASK_STATUS":
      return state.map((task) =>
        task.id === action.payload ? { ...task, status: !task.status } : task
      );

    default:
      return state;
  }
};

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  const handleFormSubmit = (data) => {
    dispatch({ type: "ADD_TASK", payload: data });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const toggleTaskStatus = (id) => {
    dispatch({ type: "TOGGLE_TASK_STATUS", payload: id });
  };

  const getTask = (id) => {
    return tasks.find((task) => task.id === id);
  };

  TasksProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        handleFormSubmit,
        getTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
