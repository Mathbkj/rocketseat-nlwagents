import type { GetRoomsAPIResponse } from "@/types/GetRoomsAPIResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useRooms(name: string) {
  return useQuery({
    queryKey: ["get-rooms", name],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/salas?name=${encodeURIComponent(name)}`
      );
      const data: GetRoomsAPIResponse = await response.json();
      return data;
    },
    /*IMPORTANTE: placeholderData não guarda uma data em cache como o initialData.
    O placeholder data permitirá que um loading spinner não seja carregado na transição entre datas
    e guarde o estado anterior enquanto a nova requisição é feita. 
    */
    placeholderData: keepPreviousData,
  });
}
