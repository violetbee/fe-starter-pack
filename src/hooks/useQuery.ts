import instance from "@/utils/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useUser } from "./useUser";

type Props = {
  key: (string | number | boolean | null | undefined)[];
  route: string;
  params?: any;
  options?: Omit<UseQueryOptions<any, Error>, "queryKey" | "queryFn">;
};

/**
 * @deprecated Bu hook yerine useUniversityApiQuery kullanın
 * Eski projeler için backward compatibility sağlar
 */
export const useFetch = ({ key, route, params, options }: Props) => {
  const { session } = useUser();

  const fetch = useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await instance.get(route, { params });
      return response.data;
    },
    enabled: !!session?.user?.id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });

  return fetch;
};
