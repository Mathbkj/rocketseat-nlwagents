import { CreateRoom } from "@/pages/create-room";
import { Room } from "@/pages/room";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecordRoomAudio } from "./pages/record-room-audio";
export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route path="/salas" element={<CreateRoom />} />
          <Route path="/salas/:roomId" element={<Room />} />
          <Route path="/salas/:roomId/:audio" element={<RecordRoomAudio />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
