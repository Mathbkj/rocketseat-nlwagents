import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RoomRequest } from "@/types/RoomRequest";
import type { RoomResponse } from "@/types/RoomResponse";

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RoomRequest) => {
<<<<<<< HEAD
      const response = await fetch(`${import.meta.env.VITE_API_URL}/salas`, {
=======
      const response = await fetch("http://localhost:3333/salas", {
>>>>>>> 5f1a0ac (Initial commit)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
<<<<<<< HEAD
      if (!response.ok) {
        throw new Error("Já existe uma sala com esse nome");
      }
      const result: RoomResponse = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rooms", ""] });
    },
=======
      const result: RoomResponse = await response.json();
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey:["get-rooms"]}),
>>>>>>> 5f1a0ac (Initial commit)
  });
}
