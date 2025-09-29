import instance from "@/utils/axios";
import { AxiosInstance } from "axios";

export const useApi = (
  route: string,
  method: "get" | "post" | "put" | "delete",
  data: any
) => {
  const fetch = async () => {
    await (instance as AxiosInstance)[method](route, data);
  };
  return { fetch };
};
