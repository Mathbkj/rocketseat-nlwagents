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
              to={`/${room.id}`}
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
