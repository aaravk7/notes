import { PenSquare, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { useState } from "react";
import IconButton from "../../components/IconButton";
import StatusBadge from "../../components/StatusBadge";
import { Task } from "../../contexts/TaskContext/taskTypes";
import useMutation from "../../hooks/useMutation";
import useTasks from "../../hooks/useTasks";
import EditTaskModal from "./EditTaskModal";

function TaskItem({ task }: { task: Task }) {
  const { removeTask } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState<null | Task>(null);
  const { loading, mutate: remove } = useMutation<void, string>(removeTask, {
    onSuccess: () => {
      toast.success("Task removed successfully");
    },
    onError: (error) => toast.error(error.message),
  });
  return (
    <div className="shadow rounded-md p-4 border border-slate-100 hover:shadow-indigo-400 shadow-indigo-200">
      <h3 className="text-xl font-semibold">
        {task.title} <StatusBadge status={task.status} />
      </h3>
      <p>{task.description}</p>
      <div className="flex gap-4 pt-2">
        <IconButton onClick={() => setTaskToEdit(task)}>
          <PenSquare size={20} />
        </IconButton>
        <IconButton disabled={loading} onClick={() => remove(task._id)}>
          <Trash2 size={20} />
        </IconButton>
      </div>
      {taskToEdit && (
        <EditTaskModal
          isOpen={true}
          onClose={() => setTaskToEdit(null)}
          task={taskToEdit}
        />
      )}
    </div>
  );
}

export default TaskItem;
