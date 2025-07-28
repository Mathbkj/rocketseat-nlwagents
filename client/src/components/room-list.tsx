import { formatDate } from "@/lib/utils/format-relative-date";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, MailSearch } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import { useEffect, useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

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

export default function RoomList() {
  // This is a hook that allows the input component to dynamically search for rooms
  const [search, setSearch] = useState("");

  const { data, isFetching } = useRooms(search.trim());

  useEffect(() => {
    console.log("Searching for rooms with:", search);
  }, [search]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas mais recentes</CardTitle>
        <CardDescription>
          Acesso rápido às salas criadas recentemente.
        </CardDescription>
        <Input
          placeholder="Buscar salas..."
          value={search}
          onChange={(ev) => {
            setSearch(ev.target.value);
          }}
        />
      </CardHeader>

      <CardContent className="flex flex-col-reverse gap-2">
        {isFetching && (
          <span className="flex items-center text-sm self-center gap-1">
            Carregando... <Loader2 className="animate-spin" size={16}/>
          </span>
        )}
        {data && data.length === 0 && (
          <span className="flex flex-col-reverse items-center gap-2">
            Nenhuma sala encontrada
            <MailSearch />
          </span>
        )}
        {data &&
          typeof data !== "string" &&
          data.map((room) => (
            <Link
              to={`/salas/${room.id}`}
              key={room.id}
              className="flex justify-between px-3 py-2 rounded-lg border hover:bg-accent/50 transition-all"
            >
              <div className="flex flex-col gap-1 items-start">
                <h3 className="font-medium mx-1">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {formatDate(new Date(room.createdAt))}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} pergunta(s)
                  </Badge>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
}
