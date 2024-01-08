import { FormEvent, useState } from "react";

import toast from "react-hot-toast";
import { Redirect, useLocation } from "wouter";
import Button from "../../components/Button";
import Input from "../../components/Input";
import MyLink from "../../components/MyLink";
import useMutation from "../../hooks/useMutation";
import { LoginArgs, login } from "./login.controller";

function Login() {
  const [, setLocation] = useLocation();
  const { loading, mutate } = useMutation<{ token: string }, LoginArgs>(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setLocation("/");
      toast.success("Logged in successfully");
    },
    onError: (error) => toast.error(error.message),
  });
  const [state, setState] = useState<LoginArgs>({
    email: "",
    password: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await mutate(state);
  }

  if (localStorage.getItem("token")) return <Redirect to="/" />;
  return (
    <div className="grid place-content-center min-h-screen">
      <form
        className="flex flex-col gap-4 w-[30rem] max-w-[90%]"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-4xl text-center">Login</h2>
        <p className="mb-8 text-center">
          Please enter your login details to sigin in.
        </p>
        <Input
          value={state.email}
          type="email"
          onChange={(email) => setState((prev) => ({ ...prev, email }))}
          placeholder="Email Address"
        />
        <Input
          value={state.password}
          onChange={(password) => setState((prev) => ({ ...prev, password }))}
          placeholder="Password"
          type="password"
        />
        <Button type="submit" isLoading={loading}>
          Log in
        </Button>
        <p className="text-center">
          Don't have an account? <MyLink href="/register">Sign up</MyLink>
        </p>
      </form>
    </div>
  );
}
export default Login;
