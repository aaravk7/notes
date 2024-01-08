import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import TextArea from "../../components/Textarea";
import { Task, TaskStatus } from "../../contexts/TaskContext/taskTypes";
import useMutation from "../../hooks/useMutation";
import useTasks from "../../hooks/useTasks";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddTaskModal(props: AddTaskModalProps) {
  const { addTask } = useTasks();
  const { loading, mutate } = useMutation<Task, Omit<Task, "_id">>(addTask, {
    onSuccess: () => {
      toast.success("Task added successfully");
    },
    onError: (error) => toast.error(error.message),
  });
  const [state, setState] = useState<Omit<Task, "_id">>({
    title: "",
    description: "",
    status: TaskStatus["To Do"],
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await mutate(state);
    setState({ title: "", description: "", status: TaskStatus["To Do"] });
    props.onClose();
  }

  return (
    <Modal title="Add New Task" {...props}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          value={state.title}
          onChange={(title) => setState((prev) => ({ ...prev, title }))}
        />
        <TextArea
          placeholder="Description"
          value={state.description}
          onChange={(description) =>
            setState((prev) => ({ ...prev, description }))
          }
        />
        <Select
          placeholder="Select Status"
          value={state.status}
          onChange={(status) =>
            setState((prev) => ({ ...prev, status: status as TaskStatus }))
          }
        >
          {Object.keys(TaskStatus).map((status) => (
            <option
              key={status}
              value={TaskStatus[status as keyof typeof TaskStatus]}
            >
              {status}
            </option>
          ))}
        </Select>
        <Button isLoading={loading}>Add</Button>
      </form>
    </Modal>
  );
}
export default AddTaskModal;
