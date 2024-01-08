import toast from "react-hot-toast";
import { useLocation } from "wouter";
import Button from "../../components/Button";
import { User } from "./home.controller";

function Nav({ user }: { user?: User }) {
  const [, setLocation] = useLocation();

  return (
    <div className="py-4 px-4 shadow shadow-indigo-200">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex gap-4 items-center">
          <img
            width={100}
            className="h-16 w-16 rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <h2 className="text-2xl font-semibold">Hey! {user?.name}</h2>
        </div>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            setLocation("/login", { replace: true });
            return toast.success("Logged out successfully");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Nav;
