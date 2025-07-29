import { lazy, Suspense } from "react";
import { useRoomQuestions } from "@/hooks/useRoomQuestions";
import { delay } from "@/lib/utils/delay";
import { QuestionItemSkeleton } from "@/components/core/question-item-skeleton";
const QuestionItem = lazy(() => delay(import("../components/question-item.tsx")));

interface QuestionListProps {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
  const { data } = useRoomQuestions(roomId);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>
      {data &&
        typeof data !== "string" &&
        data.map((question) => (
          <Suspense fallback={<QuestionItemSkeleton />}>
            <QuestionItem key={question.id} question={question} />
          </Suspense>
        ))}
    </div>
  );
}
