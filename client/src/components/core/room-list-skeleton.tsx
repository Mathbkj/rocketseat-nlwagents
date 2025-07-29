import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

/*Componente Fallback(Renderizar enquanto a lista de salas carrega)*/
export function RoomListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-2/3 mb-2" />
        </CardDescription>
        <Skeleton className="h-10 w-full" /> {/* Input skeleton */}
      </CardHeader>
      <CardContent className="flex flex-col-reverse gap-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex justify-between px-3 py-2 rounded-lg border bg-muted/50"
          >
            <div className="flex flex-col gap-1 items-start w-full">
              <Skeleton className="h-5 w-32 mb-2" /> {/* Room name */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" /> {/* Date badge */}
                <Skeleton className="h-4 w-24" /> {/* Questions badge */}
              </div>
            </div>
            <Skeleton className="h-5 w-16" /> {/* Entrar button skeleton */}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
