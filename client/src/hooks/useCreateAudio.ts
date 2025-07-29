import { useMutation } from "@tanstack/react-query";
import type { AudioRequest } from "@/types/AudioRequest";
import type { AudioResponse } from "@/types/AudioResponse";

export function useCreateAudio(roomId: string) {
  return useMutation({
    mutationFn: async ({ formData }: AudioRequest) => {
      const response = await fetch(
        `${process.env.BACKEND || "/api"}/salas/${roomId}/audios`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result: AudioResponse = await response.json();
      return result;
    },
  });
}
