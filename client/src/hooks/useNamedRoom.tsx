import type { GetRoomsAPIResponse } from "@/types/GetRoomsAPIResponse";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useNamedRoom(name: string) {
  const client = useQueryClient();
  console.log(client.getQueryData(["get-rooms"]));
  return useQuery({
    queryKey: ["get-rooms", { name }],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/salas?name=${name}`);
      const data: GetRoomsAPIResponse = await response.json();
      return data;
    },
      throwOnError: true,
  });
}
