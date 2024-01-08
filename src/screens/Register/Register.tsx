import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Redirect, useLocation } from "wouter";
import Button from "../../components/Button";
import Input from "../../components/Input";
import MyLink from "../../components/MyLink";
import useMutation from "../../hooks/useMutation";
import { RegisterArgs, register } from "./register.controller";

function Register() {
  const [, setLocation] = useLocation();
  const { loading, mutate } = useMutation<{ token: string }, RegisterArgs>(
    register,
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setLocation("/");
        toast.success("Registered successfully");
      },
      onError: (error) => toast.error(error.message),
    }
  );
  const [state, setState] = useState<RegisterArgs>({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await mutate(state);
  }

  if (localStorage.getItem("token")?.length) return <Redirect to="/" />;
  return (
    <div className="grid place-content-center min-h-screen">
      <form
        className="flex flex-col gap-4 w-[30rem] max-w-[90%]"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-4xl text-center">Sign Up</h2>
        <p className="mb-8 text-center">Create your account in seconds.</p>
        <Input
          required
          minLength={3}
          value={state.name}
          onChange={(name: string) => setState((prev) => ({ ...prev, name }))}
          placeholder="Full Name"
        />
        <Input
          required
          type="email"
          value={state.email}
          onChange={(email) => setState((prev) => ({ ...prev, email }))}
          placeholder="Email Address"
        />
        <Input
          required
          minLength={8}
          value={state.password}
          onChange={(password) => setState((prev) => ({ ...prev, password }))}
          placeholder="Password"
          type="password"
        />
        <Button type="submit" isLoading={loading}>
          Create Account
        </Button>
        <p className="text-center">
          Already have an account? <MyLink href="/login">Log in</MyLink>
        </p>
      </form>
    </div>
  );
}
export default Register;
