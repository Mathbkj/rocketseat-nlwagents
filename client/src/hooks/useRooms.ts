import type { GetRoomsAPIResponse } from "@/types/GetRoomsAPIResponse";
import { useQuery } from "@tanstack/react-query";

export function useRooms(name: string) {
  return useQuery({
    queryKey: ["get-rooms", { name }],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/salas?name=${name}`
        );
        const data: GetRoomsAPIResponse = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error) {
          return "Falha ao carregar salas. Por favor, tente novamente.";
        }
      }
    },
  });
}
