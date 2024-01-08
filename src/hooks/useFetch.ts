import { useEffect, useReducer, useRef } from "react";

type State<T> = {
  data?: T;
  error?: Error;
};

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> {
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + url, {
          ...options,
          headers: {
            ...options?.headers,
            "auth-token": localStorage.getItem("token") ?? "",
          },
        });
        if (!response.ok) {
          if (
            response.headers.get("content-type")?.includes("application/json")
          ) {
            throw new Error((await response.json()).error);
          } else {
            throw new Error("Something went wrong!");
          }
        }

        const data = (await response.json()) as T;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, options]);

  return state;
}