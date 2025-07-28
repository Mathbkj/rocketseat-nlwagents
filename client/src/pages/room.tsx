import { lazy, Suspense } from "react";
import { delay } from "@/lib/utils/delay";
import { SidebarAudios } from "@/components/sidebar-audios";
const FormPreview = lazy(() => delay(import("@/components/question-form")));
import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { RoomParams } from "@/types/RoomParams";
import { ArrowLeft, Radio } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QuestionFormSkeleton } from "@/components/question-form";

export function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams<RoomParams>();

  useEffect(() => {
    // Debug Purposes

    setTimeout(() => {
      if (!roomId) {
        navigate("/salas");
      }
    }, 1000);

    // Debug Purposes
    return () => console.log("Exit a room: client");
  }, [roomId]);

  return (
    <SidebarProvider>
      <SidebarAudios roomId={roomId as string} />
      <SidebarTrigger />
      <div className="mx-auto self-center bg-zinc-950">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <Link to="/salas">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 size-4" />
                  Voltar ao Início
                </Button>
              </Link>
              <Link to={`/salas/${roomId}/audio`}>
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
            <Suspense fallback={<QuestionFormSkeleton />}>
              <FormPreview roomId={roomId as string} />
            </Suspense>
          </div>

          <QuestionList roomId={roomId as string} />
        </div>
      </div>
    </SidebarProvider>
  );
}
