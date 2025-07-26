import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RoomRequest } from "@/types/RoomRequest";
import type { RoomResponse } from "@/types/RoomResponse";
import { toast } from "sonner";

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RoomRequest) => {
      const response = await fetch("http://localhost:3333/salas", {
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
    onError: (error) => {
      toast.error(`${error.message}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-rooms", ""] });
      toast.success("Sala Criada Com Sucesso!");
    },
  });
}
