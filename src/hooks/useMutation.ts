import { useState } from "react";

type MutationFunction<T, P> = (params: P) => Promise<T>;

interface UseMutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

function useMutation<T, P>(
  mutationFn: MutationFunction<T, P>,
  options?: UseMutationOptions<T>
) {
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = async (params: P) => {
    try {
      setLoading(true);
      const result = await mutationFn(params);
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred.");
      if (options?.onError) {
        options.onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, mutate } as const;
}

export default useMutation;
