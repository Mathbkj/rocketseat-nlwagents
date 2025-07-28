import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QuestionRequest } from "@/types/QuestionRequest";
import type { QuestionResponse } from "@/types/QuestionResponse";
import type { GetRoomsQuestionsResponse } from "@/types/GetRoomsQuestionsResponse";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ question }: QuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/salas/${roomId}/perguntas`,
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

    // Executa após a mutação ser concluída com sucesso e atualiza a página automaticamente
    onSuccess: (data, _args, context) => {
      queryClient.setQueryData<GetRoomsQuestionsResponse>(
        ["get-questions", roomId],
        (questions) => {
          if (!questions) return [];
          if (!context.questions) return questions;

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

    onError: (_error, _args, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomsQuestionsResponse>(
          ["get-questions", roomId],
          [...context.questions]
        );
      }
    },
  });
}
