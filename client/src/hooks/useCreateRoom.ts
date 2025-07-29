import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RoomRequest } from "@/types/RoomRequest";
import type { RoomResponse } from "@/types/RoomResponse";

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RoomRequest) => {
      const response = await fetch(`${process.env.BACKEND!}/salas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Já existe uma sala com esse nome");
      }
      const result: RoomResponse = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rooms", ""] });
    },
  });
}
