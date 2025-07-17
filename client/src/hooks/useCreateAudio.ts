import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AudioRequest } from "@/types/AudioRequest";
import type { AudioResponse } from "@/types/AudioResponse";

export function useCreateAudio(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData }: AudioRequest) => {
      const response = await fetch(
        `http://localhost:3333/salas/${roomId}/audios`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result: AudioResponse = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-rooms", roomId, "audios"],
      });
    },
  });
}
