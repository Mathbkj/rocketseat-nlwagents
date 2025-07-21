import type { GetRoomsQuestionsResponse } from "@/types/GetRoomsQuestionsResponse";
import { useQuery } from "@tanstack/react-query";

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      try {
        const response = await fetch(
<<<<<<< HEAD
          `${import.meta.env.VITE_API_URL}/salas/${roomId}/perguntas`
=======
          `http://localhost:3333/salas/${roomId}/perguntas`
>>>>>>> 5f1a0ac (Initial commit)
        );
        const data: GetRoomsQuestionsResponse = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error) {
          return "Falha ao carregar perguntas. Por favor, tente novamente.";
        }
      }
    },
  });
}
