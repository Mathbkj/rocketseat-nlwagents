import type { GetRoomAudioResponse } from "@/types/GetRoomAudioResponse";
import { useQuery } from "@tanstack/react-query";

export function useAudios(roomId: string) {
  return useQuery({
    queryKey: ["get-rooms", roomId, "audios"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_API_URL || '/api'}/salas/${roomId}/audios`
        );
        const data: GetRoomAudioResponse = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error) {
          return "Falha ao carregar salas. Por favor, tente novamente.";
        }
      }
    },
  });
}
