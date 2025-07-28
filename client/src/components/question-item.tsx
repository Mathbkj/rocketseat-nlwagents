import { Bot, Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/format-relative-date";
import { Skeleton } from "@/components/ui/skeleton";

interface Question {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  isGeneratingAnswer?: boolean;
}

interface QuestionItemProps {
  question: Question;
}

export function QuestionItemSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Question skeleton */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Skeleton className="size-8 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>

          {/* Answer skeleton */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Skeleton className="size-8 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>

          {/* Date skeleton */}
          <div className="flex justify-end">
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function QuestionItem({ question }: QuestionItemProps) {
  const { isGeneratingAnswer } = question;

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Question */}
          {!question.answer && !question.isGeneratingAnswer && <></>}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Pergunta</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <Bot className="size-4 text-secondary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Resposta da IA</p>
              <div className="text-muted-foreground">
                {isGeneratingAnswer ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="size-4 animate-spin text-primary" />
                    <span className="text-primary text-sm italic">
                      Gerando resposta...
                    </span>
                  </div>
                ) : (
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {question.answer}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {formatDate(new Date(question.createdAt))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
