import type { GetRoomsAPIResponse } from "@/types/GetRoomsAPIResponse";
<<<<<<< HEAD
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
=======
import { useQuery } from "@tanstack/react-query";

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3333/salas");
        const data: GetRoomsAPIResponse = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error) {
          return "Falha ao carregar salas. Por favor, tente novamente.";
        }
      }
    },
>>>>>>> 5f1a0ac (Initial commit)
  });
}
