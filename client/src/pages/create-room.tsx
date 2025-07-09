import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import type { GetRoomsAPIResponse } from "@/types/GetRoomsAPIResponse";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3333/rooms");
        const data: GetRoomsAPIResponse = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error) {
          return "Falha ao carregar salas. Por favor, tente novamente.";
        }
      }
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <section className="inline-flex items-center gap-2">
      <Button className="text-center">Criar Sala</Button>
      {isLoading && <Spinner />}
      {data && data.length > 0 && (
        <>
          {typeof data === "string" ? (
            <span className="text-shadow-red-400">{data}</span>
          ) : (
            data.map((room) => <pre key={room.id}>{room.name}</pre>)
          )}
        </>
      )}
      <Link to="/sala" className="underline">
        Acessar Sala
      </Link>
    </section>
  );
}
