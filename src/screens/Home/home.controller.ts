import { Task } from "../../contexts/TaskContext/taskTypes";

export interface User {
  name: string;
  email: string;
}

interface FetchTasksArgs {
  query?: string;
  filter?: string;
}

export async function fetchTasks({ query, filter }: FetchTasksArgs) {
  console.log(import.meta.env.VITE_SERVER_URL);
  const url = new URL(import.meta.env.VITE_SERVER_URL + "/tasks");
  if (query) url.searchParams.append("query", query);
  if (filter) url.searchParams.append("status", filter);
  const response = await fetch(url.toString(), {
    headers: { "auth-token": localStorage.getItem("token") ?? "" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch initial tasks");
  }
  const data = await response.json();
  return data.tasks;
}

export async function addTaskToDb(args: Omit<Task, "_id">) {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + "/tasks/add", {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "content-type": "application/json",
      "auth-token": localStorage.getItem("token") ?? "",
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error ?? "Something went wrong");
  }
  return data;
}

export async function removeTaskFromDb(_id: string) {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/tasks/${_id}`,
    {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token") ?? "",
      },
    }
  );
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error ?? "Something went wrong");
  }
  return data;
}
