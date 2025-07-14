import { formatDate } from "@/lib/utils/format-relative-date";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import { useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import { Input } from "./ui/input";

export function RoomList() {
  // This is a hook that allows the input component to dynamically search for rooms
  const [search, setSearch] = useState("");

  const { data, isRefetching, isLoading, isLoadingError } = useRooms(search);

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

      <CardContent className="flex self-center flex-col gap-3">
        {isRefetching || (isLoading && <Loader2 className="animate-spin" />)}
        {isLoadingError && <span>Falha ao carregar salas</span>}
        {data &&
          typeof data !== "string" &&
          data.map((room) => (
            <Link
              to={`/salas/${room.id}`}
              key={room.id}
              className="flex justify-between p-3 rounded-lg border hover:bg-accent/50"
            >
              <div className="flex-1 items-start gap-1">
                <h3 className="font-medium">{room.name}</h3>
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
