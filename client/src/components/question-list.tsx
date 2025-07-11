import { useRoomQuestions } from "@/hooks/useRoomQuestions";
import { QuestionItem } from "./question-item";

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
          <QuestionItem key={question.id} question={question} />
        ))}
    </div>
  );
}
