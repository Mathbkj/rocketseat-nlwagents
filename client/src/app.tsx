import { CreateRoom } from "@/pages/create-room";
import { Room } from "@/pages/room";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecordRoomAudio } from "./pages/record-room-audio";
<<<<<<< HEAD
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: 1,
            },
            mutations: {
              throwOnError: false,
              onSettled: async (data, error, vars, _ctx) => {
                if (vars && typeof vars === "object" && "question" in vars) {
                  toast.dismiss();
                }

                const promise = () =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(data);
                      }
                    }, 2000);
                  });
                toast.promise(promise, {
                  loading: "Carregando...",
                  success: () => "Data criada com sucesso!",
                  error: (err) => `Erro: ${err.message}`,
                });
              },
            },
          },
        })
      }
    >
      <Toaster
        richColors
        position="top-right"
        closeButton
        toastOptions={{ duration: 2000 }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateRoom />} />
          <Route path="/:roomId" element={<Room />} />
          <Route path="/:roomId/:audio" element={<RecordRoomAudio />} />
=======
export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route path="/salas" element={<CreateRoom />} />
          <Route path="/salas/:roomId" element={<Room />} />
          <Route path="/salas/:roomId/:audio" element={<RecordRoomAudio />} />
>>>>>>> 5f1a0ac (Initial commit)
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
