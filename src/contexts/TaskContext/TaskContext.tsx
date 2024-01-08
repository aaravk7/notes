import { ReactNode, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "../../hooks/useDebounce";
import {
  addTaskToDb,
  fetchTasks,
  removeTaskFromDb,
} from "../../screens/Home/home.controller";
import { Task } from "./taskTypes";

interface TasksContextState {
  tasks: Task[];
  filter: string;
  query: string;
  setQuery: (query: string) => void;
  setFilter: (filter: string) => void;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  addTask: (task: Omit<Task, "_id">) => Promise<Task>;
}

export const TasksContext = createContext<TasksContextState | undefined>(
  undefined
);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    (async function () {
      try {
        const initialTasks = await fetchTasks({
          query: debouncedQuery,
          filter,
        });
        setTasks(initialTasks);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong !"
        );
      }
    })();
  }, [debouncedQuery, filter]);

  const addTask = async (task: Omit<Task, "_id">) => {
    const data = await addTaskToDb(task);
    setTasks((prevTasks) => [...prevTasks, data.task]);
    return data.task;
  };

  const updateTask = async (task: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) => (item._id === task._id ? task : item))
    );
  };

  const removeTask = async (taskId: string) => {
    await removeTaskFromDb(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const contextValue: TasksContextState = {
    query,
    tasks,
    filter,
    addTask,
    setQuery,
    setFilter,
    removeTask,
    updateTask,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};
