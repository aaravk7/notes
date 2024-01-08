import toast, { LoaderIcon } from "react-hot-toast";
import { Redirect } from "wouter";

import { TasksProvider } from "../../contexts/TaskContext/TaskContext";
import { useFetch } from "../../hooks/useFetch";
import Nav from "./Nav";
import TasksContainer from "./TasksContainer";
import { User } from "./home.controller";

function Home() {
  const { data: user, error, status } = useFetch<User>("/auth");

  if (error) {
    toast.error(error.message ?? "Something went wrong");
    if (error.message === "Unauthorized") {
      localStorage.removeItem("token");
      return <Redirect to="/login" />;
    }
  }
  if (status === "loading" || !user)
    return (
      <div className="h-screen grid place-content-center">
        <LoaderIcon className="h-16 w-16" />
      </div>
    );
  return (
    <TasksProvider>
      <Nav user={user} />
      <TasksContainer />
    </TasksProvider>
  );
}
export default Home;
