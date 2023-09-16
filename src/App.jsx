import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Task from "./pages/Task";

function App() {
  return (
    <>
      <Routes>
        <Route path="/task-manager_2/" exact element={<Home />} />
        <Route path="/task-manager_2/task/:id" element={<Task />} />
      </Routes>
    </>
  );
}

export default App;
