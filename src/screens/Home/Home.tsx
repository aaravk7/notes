import toast from "react-hot-toast";
import { Redirect } from "wouter";

import { TasksProvider } from "../../contexts/TaskContext/TaskContext";
import { useFetch } from "../../hooks/useFetch";
import Nav from "./Nav";
import TasksContainer from "./TasksContainer";
import { User } from "./home.controller";

function Home() {
  const { data: user, error } = useFetch<User>("/auth");

  if (error) {
    toast.error(error.message ?? "Something went wrong");
    if (error.message === "Unauthorized") {
      localStorage.removeItem("token");
      return <Redirect to="/login" />;
    }
  }
  return (
    <TasksProvider>
      <Nav user={user} />
      <TasksContainer />
    </TasksProvider>
  );
}
export default Home;
