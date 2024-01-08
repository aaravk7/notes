import useTasks from "../../hooks/useTasks";
import TaskItem from "./TaskItem";
import TasksMenu from "./TasksMenu";

function Tasks() {
  const { tasks } = useTasks();

  return (
    <div className="pb-8 flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}

function TasksContainer() {
  return (
    <div className="container mx-auto px-4">
      <TasksMenu />
      <Tasks />
    </div>
  );
}
export default TasksContainer;
