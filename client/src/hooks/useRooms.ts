import type { GetRoomsAPIResponse } from "@/types/GetRoomsAPIResponse";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useRooms() {
  const client = useQueryClient();
  console.log(client.getQueryData(["get-rooms"]));
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/salas");
      const data: GetRoomsAPIResponse = await response.json();
      return data;
    },
    throwOnError: true,
    //initialData: () => {
    //}
  });
}
