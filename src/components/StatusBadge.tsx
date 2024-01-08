import { TaskStatus } from "../contexts/TaskContext/taskTypes";

function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`ml-2 py-1 px-2 text-white rounded-full text-[0.75rem] ${
        status === TaskStatus.Done
          ? "bg-red-500"
          : status === TaskStatus["In Progress"]
          ? "bg-green-500"
          : "bg-black"
      }`}
    >
      {status}
    </span>
  );
}
export default StatusBadge;
