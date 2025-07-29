import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

/*Componente Fallback(Renderizar enquanto a lista de perguntas carrega)*/
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
