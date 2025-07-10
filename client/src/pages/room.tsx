import { QuestionForm } from "@/components/question-form";
import { QuestionItem } from "@/components/question-item";
import { Button } from "@/components/ui/button";
import type { RoomParams } from "@/types/RoomParams";
import { ArrowLeft, Radio } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams<RoomParams>();

  useEffect(() => {
    // Debug Purposes
    console.log("Joined a room: client");
    setTimeout(() => {
      if (!roomId) {
        navigate("/salas");
      }
    }, 1000);
    // Debug Purposes
    return () => console.log("Exit a room: client");
  }, [roomId]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/salas">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to={`/room/${roomId}/audio`}>
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Gravar Áudio
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Sala de Perguntas
          </h1>
          <p className="text-muted-foreground">
            Faça perguntas e receba respostas com IA
          </p>
        </div>

        <div className="mb-8">
          <QuestionForm roomId={roomId as string} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl text-foreground">
              Perguntas & Respostas
            </h2>
          </div>

          <QuestionItem
            question={{
              id: "1",
              question: "Pergunta 1",
              createdAt: new Date().toISOString(),
            }}
          />

          <QuestionItem
            question={{
              id: "1",
              question: "Pergunta 2",
              answer: "Resposta 2",
              createdAt: new Date().toISOString(),
            }}
          />
        </div>
      </div>
    </div>
  );
}
