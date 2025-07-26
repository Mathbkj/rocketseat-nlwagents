import { Bot } from "lucide-react";
import { Suspense } from "react";

export default function ServerError() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <section className="flex flex-col gap-4 place-items-center place-content-center translate-y-1/4 min-h-[calc(100vh-50vh)]">
        <Bot size={40} />
        <span className="text-2xl">Erro 500</span>
        <span className="text-lg">
          Ocorreu um erro inesperado no servidor. Recarregue a página ou tente
          novamente mais tarde.
        </span>
      </section>
    </Suspense>
  );
}
