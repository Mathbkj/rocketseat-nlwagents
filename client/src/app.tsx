import { CreateRoom } from "@/pages/create-room";
import { Room } from "@/pages/room";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route path="/sala" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
