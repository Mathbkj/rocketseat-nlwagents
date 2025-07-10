import { formatDate } from "@/lib/utils/format-relative-date";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import Spinner from "./ui/spinner";
import { useEffect } from "react";
import { useRooms } from "@/hooks/useRooms";
export function RoomList() {
  const { data, isLoading } = useRooms();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas mais recentes</CardTitle>
        <CardDescription>
          Acesso rápido ás salas criadas recentemente.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <>
            <Spinner />
            <span className="text-muted-foreground text-sm">
              Carregando salas...
            </span>
          </>
        )}
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
                    {room.questionsCount}pergunta(s)
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
