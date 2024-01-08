export interface RegisterArgs {
  name: string;
  email: string;
  password: string;
}

export async function register(args: RegisterArgs) {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error ?? "Something went wrong");
  }
  return data;
}
