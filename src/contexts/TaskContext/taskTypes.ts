export enum TaskStatus {
  "To Do" = "todo",
  "In Progress" = "inprogress",
  "Done" = "done",
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
