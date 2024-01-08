import { useContext } from "react";

import { TasksContext } from "../contexts/TaskContext/TaskContext";

const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }

  return context;
};

export default useTasks;
