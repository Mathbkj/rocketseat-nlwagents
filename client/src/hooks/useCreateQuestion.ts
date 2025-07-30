import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QuestionRequest } from "@/types/QuestionRequest";
import type { QuestionResponse } from "@/types/QuestionResponse";
import type { GetRoomsQuestionsResponse } from "@/types/GetRoomsQuestionsResponse";
import type { GetRoomAudioResponse } from "@/types/GetRoomAudioResponse";
import { toast } from "sonner";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();
  const audios = queryClient.getQueryData<GetRoomAudioResponse>([
    "get-rooms",
    roomId,
    "audios",
  ]);
  return useMutation({
    mutationFn: async ({ question }: QuestionRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/salas/${roomId}/perguntas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );
      const result: QuestionResponse = await response.json();
      return result;
    },
    // Executa no momento da chamada p/ API e recebe o corpo da requisição como argumento
    onMutate: ({ question }) => {
      if (!audios || audios.length === 0) {
        throw new Error(
          "Não há áudios disponíveis para um embasamento ao responder à pergunta."
        );
      }
      const questions = queryClient.getQueryData<GetRoomsQuestionsResponse>([
        "get-questions",
        roomId,
      ]);
      const previousQuestions = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };
      queryClient.setQueryData<GetRoomsQuestionsResponse>(
        ["get-questions", roomId],
        [newQuestion, ...previousQuestions]
      );
      return { newQuestion, questions };
    },
    onSettled: (data, error, _vars, context) => {
      if (error) {
        toast.warning(error.message);
      }
      if (!data || !context) return;

      queryClient.setQueryData<GetRoomsQuestionsResponse>(
        ["get-questions", roomId],
        (questions) => {
          if (!questions) return [];
          if (!context?.questions) return questions;

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              };
            }
            return question;
          });
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["get-questions", roomId],
      });
    },
  });
}
